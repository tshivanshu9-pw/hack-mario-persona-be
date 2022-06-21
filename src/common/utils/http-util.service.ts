import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class HttpUtilService {
  constructor(private httpService: HttpService) {}

  request<T = any>(config: AxiosRequestConfig<any>) {
    return new Promise((resolve, reject) => {
      this.httpService.request(config).subscribe({
        next(res) {
          resolve(res.data);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  get(url, params, headers) {
    const options: AxiosRequestConfig = {
      url: url,
      params,
      headers,
    };

    return new Promise((resolve, reject) => {
      this.httpService
        .get(url, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data.data),
          error: (error) => {
            if (error.response && error.response.data) {
              if (error.response.data?.message) {
                const err = error.response.data;
                reject(
                  new HttpException(new Error(err?.message), err?.statusCode),
                );
              }
              const { error: err } = error.response.data;
              reject(new HttpException(new Error(err.message), err.status));
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  post(url, data, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return new Promise((resolve, reject) => {
      this.httpService
        .post(url, data, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data.data),
          error: (error) => {
            if (error.response && error.response.data) {
              const { error: err } = error.response.data;
              if (error.response.data?.message) {
                const err = error.response.data;
                reject(
                  new HttpException(new Error(err?.message), err?.statusCode),
                );
              }
              reject(new HttpException(new Error(err.message), err.status));
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  put(url, data, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return new Promise((resolve, reject) => {
      this.httpService
        .put(url, data, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data.data),
          error: (error) => {
            if (error.response && error.response.data) {
              if (error.response.data?.message) {
                const err = error.response.data;
                reject(
                  new HttpException(new Error(err?.message), err?.statusCode),
                );
              }
              const { error: err } = error.response.data;
              reject(new HttpException(new Error(err?.message), err?.status));
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  delete(url, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };

    return new Promise((resolve, reject) => {
      this.httpService
        .delete(url, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data.data),
          error: (error) => {
            if (error.response && error.response.data) {
              if (error.response.data?.message) {
                const err = error.response.data;
                reject(
                  new HttpException(new Error(err?.message), err?.statusCode),
                );
              }
              const { error: err } = error.response.data;
              reject(new HttpException(new Error(err.message), err.status));
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }
}
