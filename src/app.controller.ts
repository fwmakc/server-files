import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { join } from 'path';
import { Secure, SimpleSecure } from './common/common.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

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
      prefix: this.configService.get<string>('PREFIX'),
      uploadsPath: this.configService.get<string>('UPLOADS_PATH'),
      uploadsAllowTypes: this.configService.get<string>('UPLOADS_ALLOW_TYPES'),
      uploadsMaxSize: this.configService.get<string>('UPLOADS_MAX_SIZE'),
      uploadsImageMaxWidth: this.configService.get<string>(
        'UPLOADS_IMAGE_MAX_WIDTH',
      ),
      uploadsImageMaxHeight: this.configService.get<string>(
        'UPLOADS_IMAGE_MAX_HEIGHT',
      ),
    });
  }
}
