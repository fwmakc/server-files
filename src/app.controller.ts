import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Secure, SimpleSecure } from './common/common.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  hello(): string {
    return this.appService.hello();
  }

  @Get('test')
  @Header('Content-Type', 'application/json')
  test() {
    return { status: 'ok' };
  }

  @Secure()
  @Get('test/secure')
  @Header('Content-Type', 'application/json')
  secure() {
    return { status: 'ok', secure: 'ok' };
  }

  @SimpleSecure()
  @Get('test/simple_secure')
  @Header('Content-Type', 'application/json')
  testSimpleSecure() {
    return JSON.stringify({
      status: 'ok',
      secure: 'simple',
      dir: join(__dirname),
      prefix: process.env.PREFIX,
      uploadsPath: process.env.UPLOADS_PATH,
      uploadsAllowTypes: process.env.UPLOADS_ALLOW_TYPES,
      uploadsMaxSize: process.env.UPLOADS_MAX_SIZE,
      uploadsImageMaxWidth: process.env.UPLOADS_IMAGE_MAX_WIDTH,
      uploadsImageMaxHeight: process.env.UPLOADS_IMAGE_MAX_HEIGHT,
    });
  }
}
