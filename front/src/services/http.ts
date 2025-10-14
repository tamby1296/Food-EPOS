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

  async get<T>(
    url: string,
    searchParams?: Record<string, string>,
    options?: RequestInit
  ) {
    this.setUrl(url);
    if (!this._URL) return;
    if (searchParams) this.setSearchParams(searchParams);

    const response = await fetch(this._URL, options);
    const data = (await response.json()) as T;

    return {
      status: response.status,
      headers: response.headers,
      body: data,
    };
  }
}

export const EposRequests = new HttpRequest();
