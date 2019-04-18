import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication} from '@nestjs/platform-express';
import * as debug from  '../node_modules/debug';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000, function() {debug('listening') });
}
bootstrap();
