import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { SecureGuard } from './guard/secure.guard';
import { SimpleSecureGuard } from './guard/simple.secure.guard';

export const Data = createParamDecorator(
  (arg = '', context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    const { body, query } = request;
    const data = { ...query, ...body };
    let result = arg ? data[arg] : data;

    if (typeof result === 'string') {
      try {
        result = JSON.parse(result);
      } catch (e) {
        console.log(e);
      }
    }

    return result;
  },
);

export const Secure = () => {
  return applyDecorators(UseGuards(SecureGuard));
};

export const SimpleSecure = () => {
  return applyDecorators(UseGuards(SimpleSecureGuard));
};
