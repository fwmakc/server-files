import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (
  ConfigService: ConfigService,
): JwtModuleOptions => ({
  secret: ConfigService.get('JWT_SECRET'),
});
