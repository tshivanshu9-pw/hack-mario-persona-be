import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

export class HttpUtilService {
  constructor(private httpService: HttpService) {}

  get(url, params, headers) {
    const options: AxiosRequestConfig = {
      url: url,
      params,
      headers,
    };
    return this.httpService
      .get(url, options)
      .pipe(map((response) => response.data));
  }

  post(url, data, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return this.httpService
      .post(url, data, options)
      .pipe(map((response) => response.data));
  }

  put(url, data, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return this.httpService
      .put(url, data, options)
      .pipe(map((response) => response.data));
  }

  delete(url, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return this.httpService
      .delete(url, options)
      .pipe(map((response) => response.data));
  }
}
