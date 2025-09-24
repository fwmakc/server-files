import { Request, Response } from 'express';

export class Cookie {
  constructor(
    private request: Request,
    private response: Response,
  ) {}

  set(name: string, data: string | number): void {
    this.response.cookie(name, data, {
      httpOnly: true,
      path: '/',
      secure: false,
    });
  }

  setJson(name: string, data: any): void {
    this.response.cookie(name, JSON.stringify(data), {
      httpOnly: true,
      path: '/',
      secure: false,
    });
  }

  get(name: string): string {
    const cookies = this.request.cookies as object;
    return String(cookies?.[name]) || '';
  }

  getJson(name: string): any {
    const cookies = this.request.cookies as object;
    const value = String(cookies?.[name]) || 'null';
    return JSON.parse(value);
  }

  reset(name: string): void {
    this.response.clearCookie(name);
  }
}
