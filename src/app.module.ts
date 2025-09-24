import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AppImports from './app.imports';

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot(), ...AppImports],
  providers: [AppService],
})
export class AppModule {}
