
// Error는 JavaScript의 내장 객체

export class HTTPError extends Error {
    statusCode: number;
    code?: string;
    data? : any;
  
    constructor(statusCode: number, message?: string, code?: string, data?: any) {
      super(message);
  
      this.name = 'HTTPError';
      this.statusCode = statusCode;
      this.code = code;
      this.data = data;
  
      Object.setPrototypeOf(this, HTTPError.prototype); // 왜 있는거지?
    }
  }