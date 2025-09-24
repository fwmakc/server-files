import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.env.UPLOADS_PATH,
      serveRoot: process.env.UPLOADS_PATH,
    }),
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
