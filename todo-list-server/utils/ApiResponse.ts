import { NextApiResponse } from 'next';

class ApiResponse {
  status: number;
  message: string;
  data: any;

  constructor(status: number, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(data: any = null, message: string = 'Success'): ApiResponse {
    return new ApiResponse(200, message, data);
  }

  static error(message: string = 'Internal Server Error'): ApiResponse {
    return new ApiResponse(500, message);
  }

  send(res: NextApiResponse): void {

    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源。如果需要限制来源，请更改为特定的域名，例如 'http://example.com'
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.status(this.status).json({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }
}

export default ApiResponse;
