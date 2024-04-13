import { flags, scanDirectives, filterSchema, walkThroughHandler } from './lib/engine.js';

const SyntaxeIO = new Object();

SyntaxeIO.init = (config = null) => {
	if (!config || !config.app)
		throw new Error('No app detected.');

	new SyntaxeRequestGate(config);
};

const SyntaxeRequestGate = class {
	constructor(config = null){
		config.app.set('syntaxeEnabledStatus', config.enabled);
		config.app.use(this.#request);
	}

	async #request(req, res, next) {
		const { resolve, schema, client } = scanDirectives(req, res);

		const enabledStatus = req.app.get('syntaxeEnabledStatus');
		
		res.set('Syntaxe-Enabled', enabledStatus);

		if (enabledStatus && resolve) {
			res.syntaxeSchema = await filterSchema(schema);
			if (res.syntaxeSchema.status)
				new SyntaxeResponseGate(res);
			else {
				res.set('Syntaxe-Schema-Resolved', false);
				res.set('Syntaxe-Schema-Resolved-Error', 'Query failed. Check your schema and try again.');
			}
		}

		next();
	}
}

const SyntaxeResponseGate = class {
	#response; #data; #send;

	constructor(response) {
		this.#response = response;

		this.#send = this.#response.send;
		this.#response.send = this.#delegate();
	}

	#delegate() {
		return async(data) => {
			this.#data = await walkThroughHandler({ data, res: this.#response }) ?? data;
			this.#respond();
		}
	}

	#respond() {
		this.#send.call(this.#response, this.#data);
	}
}

export default SyntaxeIO;