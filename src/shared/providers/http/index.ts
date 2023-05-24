export type HttpProviderOptions = {
  baseUrl?: string;
  config?: any;
};

export namespace HttpGet {
  export type Input = {
    url?: string;
    params?: any;
    headers?: Record<string, any>;
    responseType?:
      | 'arraybuffer'
      | 'blob'
      | 'document'
      | 'json'
      | 'text'
      | 'stream';
  };

  export type Output<T> = Promise<{
    statusCode: number;
    data: T;
    headers: Record<string, any>;
  }>;
}

export namespace HttpPost {
  export type Input = {
    url?: string;
    data?: any;
    params?: any;
    headers?: Record<string, any>;
  };

  export type Output<T> = Promise<{ statusCode: number; data: T }>;
}

export namespace HttpPatch {
  export type Input = {
    url?: string;
    data?: any;
    params?: any;
    headers?: Record<string, any>;
  };

  export type Output<T> = Promise<{ statusCode: number; data: T }>;
}

export namespace HttpPut {
  export type Input = {
    url?: string;
    data?: any;
    params?: any;
    headers?: Record<string, any>;
  };

  export type Output<T> = Promise<{ statusCode: number; data: T }>;
}

export namespace HttpDelete {
  export type Input = {
    url?: string;
    params?: any;
    headers?: Record<string, any>;
  };

  export type Output<T> = Promise<{ statusCode: number; data: T }>;
}

export abstract class HttpProvider {
  protected baseUrl?: string;
  protected config: Record<string, unknown>;

  constructor({ config, baseUrl }: HttpProviderOptions) {
    this.baseUrl = baseUrl;
    this.config = config;
  }

  abstract get<T = any>(input: HttpGet.Input): HttpGet.Output<T>;
  abstract post<T = any>(input: HttpPost.Input): HttpPost.Output<T>;
  abstract patch?<T = any>(input: HttpPatch.Input): HttpPatch.Output<T>;
  abstract put?<T = any>(input: HttpPut.Input): HttpPut.Output<T>;
  abstract delete?<T = any>(input: HttpDelete.Input): HttpDelete.Output<T>;
}
