import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import {
  HttpDelete,
  HttpGet,
  HttpPatch,
  HttpPost,
  HttpProvider,
  HttpProviderOptions,
  HttpPut,
} from '.';

export class AxiosAdapter extends HttpProvider {
  private axiosInstance: AxiosInstance;

  constructor({ baseUrl, config }: HttpProviderOptions) {
    super({ baseUrl, config });
    this.axiosInstance = axios.create({ baseURL: baseUrl });
  }

  async get<T = any>({
    params,
    url,
    headers,
    responseType,
  }: HttpGet.Input): HttpGet.Output<T> {
    const request = await this.axiosInstance.get<T>(url, {
      params,
      headers,
      responseType,
    });

    const response = {
      data: request.data,
      statusCode: request.status,
      headers: request.headers,
    };

    return response;
  }

  async post<T = any>({
    data,
    params,
    url,
    headers,
  }: HttpPost.Input): HttpPost.Output<T> {
    const request = await this.axiosInstance.post(url, data, {
      params,
      headers,
    });

    const response = {
      data: request.data,
      statusCode: request.status,
    };

    return response;
  }

  async delete<T = any>({
    params,
    url,
    headers,
  }: HttpDelete.Input): HttpDelete.Output<T> {
    const request = await this.axiosInstance.delete(url, {
      params,
      headers,
    });

    const response = {
      data: request.data,
      statusCode: request.status,
    };

    return response;
  }

  async patch<T = any>({
    data,
    params,
    url,
    headers,
  }: HttpPatch.Input): HttpPatch.Output<T> {
    const request = await this.axiosInstance.patch(url, data, {
      params,
      headers,
    });

    const response = {
      data: request.data,
      statusCode: request.status,
    };

    return response;
  }

  async put<T = any>({
    data,
    params,
    url,
    headers,
  }: HttpPut.Input): HttpPut.Output<T> {
    const request = await this.axiosInstance.put(url, data, {
      params,
      headers,
    });

    const response = {
      data: request.data,
      statusCode: request.status,
    };

    return response;
  }
}
