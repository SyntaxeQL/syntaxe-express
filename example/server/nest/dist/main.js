"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const index_js_1 = require("../../../../dist/cjs/index.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    index_js_1.SyntaxeIO.init({
        enabled: true,
        app: app
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map