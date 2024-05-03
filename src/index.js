import { flags, SyntaxeEngine } from './lib/engine.js';

const SyntaxeIO = new Object();

SyntaxeIO.init = (config = null) => {
	if (!config || !config.app)
		throw new Error('No app detected.');

	new SyntaxeRequestGate(config);
};

const SyntaxeRequestGate = class {
	constructor(config = null) {
		this.#configureForAdapter(config);
	}

	#configureForAdapter(config) {
		try {
			if (config.app && typeof config.app.getHttpAdapter == "function") {
				const fastifyEnabled = Object.getOwnPropertySymbols(config.app.getHttpAdapter().getInstance())
					.find(s => s.toString() == 'Symbol(fastify.state)');
				if (fastifyEnabled && config.enabled)
					this.#adjustToAdapterInstance(config);
			}

			const syntaxeProcessor = (config.enabled ? this.#syntaxeEnabled : this.#syntaxeDisabled);

			config.app.use(syntaxeProcessor);
		} catch(err) {
			console.error(err);
		}
	}

	#adjustToAdapterInstance(config) {
		try {
		  const instance = config.app.getHttpAdapter().getInstance();
		  instance.addHook('onRequest', (request, reply, done) => {
		    reply.setHeader = function (key, value) {
		      return this.raw.setHeader(key, value);
		    };

		    reply.end = function () {
		      this.raw.end();
		    };

		    request.res = reply;

		    done();
		  });
		  instance.addHook('onSend', (request, reply, data, done) => {
		  	try {
			  	reply.syntaxeSchema = request.raw.syntaxeSchema;
			  	const syntaxeEngineState = request.raw.syntaxeEngineState;
			  	const syntaxeEngine = new SyntaxeEngine(syntaxeEngineState);

			  	syntaxeEngine.walkThroughHandler({ data, res: reply })
				  	.then(result => {
				  		done(null, result);
				  	}).catch(e => done(null, data));
			  } catch(err) {}
		  });
		} catch(err) {
			console.error(err);
		}
	}

	async #syntaxeEnabled(req, res, next) {
		try {
			const syntaxeEngine = new SyntaxeEngine();

			const { resolve, schema, client } = syntaxeEngine.scanDirectives(req, res);

			res.setHeader('Syntaxe-Enabled', true);

			if (resolve) {
				res.syntaxeSchema = req.syntaxeSchema = await syntaxeEngine.filterSchema(schema);
				res.syntaxeEngineInstance = syntaxeEngine;
				req.syntaxeEngineState = syntaxeEngine.getEngineState();

				if (res.syntaxeSchema.status)
					new SyntaxeResponseGate(res);
				else {
					res.setHeader('Syntaxe-Schema-Resolved', false);
					res.setHeader('Syntaxe-Schema-Resolved-Error', 'Query failed. Check your schema and try again.');
				}
			}
		} catch(err) {
			console.error(err);
		}

		next();
	}

	async #syntaxeDisabled(req, res, next) {
		res.setHeader('Syntaxe-Enabled', false);
		next();
	}
};

const SyntaxeResponseGate = class {
	#response; #data; #send;

	constructor(response) {
		this.#response = response;

		this.#send = this.#response.send;
		this.#response.send = this.#delegate();
	}

	#delegate() {
		return async(data) => {
			const syntaxeEngine = this.#response.syntaxeEngineInstance;
			this.#data = await syntaxeEngine.walkThroughHandler({ data, res: this.#response }) ?? data;
			this.#respond();
		}
	}

	#respond() {
		this.#send.call(this.#response, this.#data);
	}
};

export default SyntaxeIO;