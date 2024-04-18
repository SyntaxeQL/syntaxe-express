import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SyntaxeIO } from '../../../../dist/cjs/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ////////////////////////////
  // Add syntaxe middleware //
  ////////////////////////////
  SyntaxeIO.init({
    enabled: true,
    app: app
  });
  
  await app.listen(8000);
}
bootstrap();
