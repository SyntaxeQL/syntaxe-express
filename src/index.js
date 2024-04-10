import { flags, scanDirectives, filterSchema, walkThroughHandler } from './lib/engine.js';

const SyntaxeIO = new Object();

SyntaxeIO.apply = (config = null) => {
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
		const { resolve, schema, client } = scanDirectives(req);

		const enabledStatus = req.app.get('syntaxeEnabledStatus');
		
		res.set('Syntaxe-Enabled', enabledStatus);

		if (enabledStatus && resolve) {
			res.syntaxeSchema = await filterSchema(schema);
			new SyntaxeResponseGate(res);
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