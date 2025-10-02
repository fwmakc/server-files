import { UnauthorizedException } from '@nestjs/common';
import { md5 } from 'lib-hash';

export function tokenValidate(token: string): boolean {
  if (!token) {
    throw new UnauthorizedException('Token is missing');
  }

  const [tokenHashed, tokenTimestamp] = token.split('.');

  const expires = Number(process.env.SECURE_EXPIRES);
  const string = `${process.env.SECURE_SECRET}.${tokenTimestamp}`;
  const hashed = md5(string);

  if (hashed !== tokenHashed) {
    throw new UnauthorizedException('Token is invalid');
  }

  const timestamp = Date.now() / 1000;
  const expired = Number(timestamp) - Number(tokenTimestamp);

  if (expired < 0) {
    throw new UnauthorizedException('Token is fake');
  }

  if (expires && expired > expires) {
    throw new UnauthorizedException('Token is expired');
  }

  return true;
}

export function tokenValidateSimple(token: string): boolean {
  if (!token) {
    throw new UnauthorizedException('Token is missing');
  }

  const word = process.env.SECURE_SIMPLE;

  if (!word) {
    throw new UnauthorizedException('Token not set on server');
  }

  return token === word;
}
