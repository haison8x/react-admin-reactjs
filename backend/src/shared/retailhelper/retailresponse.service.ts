import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class RetailResponseService {
  public includeContentRange(res: Response, content: string, range: number[], count: number): Response {
    if (!range || range.length < 2) {
      return res;
    }
    const headerValue = `${content} ${range[0]}-${range[1]}/${count}`;
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range', headerValue);

    return res;
  }
}
