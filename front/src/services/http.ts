export const AUTH_TOKEN_KEY = "food-epos-auth-token";

export class HttpError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

class HttpRequest {
  private _URL: URL | null;

  constructor() {
    this._URL = null;
  }

  private setUrl(url: string, base = window.location.origin) {
    try {
      this._URL = new URL(url, base);
    } catch (error) {
      console.log(error);
    }
  }

  private setSearchParams(searchParams: Record<string, string>) {
    for (const key in searchParams) {
      this._URL?.searchParams.set(key, searchParams[key]);
    }
  }

  private buildHeaders(hasBody: boolean, options?: RequestInit): Headers {
    const headers = new Headers(options?.headers);
    if (hasBody && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return headers;
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    searchParams?: Record<string, string>,
    options?: RequestInit
  ) {
    this.setUrl(url);
    if (!this._URL) throw new Error(`Invalid URL: ${url}`);
    if (searchParams) this.setSearchParams(searchParams);

    const response = await fetch(this._URL, {
      ...options,
      method,
      headers: this.buildHeaders(body !== undefined, options),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/login";
      throw new HttpError(401, null);
    }

    const text = await response.text();
    const data = (text ? JSON.parse(text) : null) as T;

    if (!response.ok) {
      throw new HttpError(response.status, data);
    }

    return {
      status: response.status,
      headers: response.headers,
      body: data,
    };
  }

  get<T>(url: string, searchParams?: Record<string, string>, options?: RequestInit) {
    return this.request<T>("GET", url, undefined, searchParams, options);
  }

  post<T>(url: string, body?: unknown, options?: RequestInit) {
    return this.request<T>("POST", url, body, undefined, options);
  }

  put<T>(url: string, body?: unknown, options?: RequestInit) {
    return this.request<T>("PUT", url, body, undefined, options);
  }

  patch<T>(url: string, body?: unknown, options?: RequestInit) {
    return this.request<T>("PATCH", url, body, undefined, options);
  }

  delete<T>(url: string, options?: RequestInit) {
    return this.request<T>("DELETE", url, undefined, undefined, options);
  }
}

export const EposRequests = new HttpRequest();
