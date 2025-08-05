class HttpRequest {
  private getUrl(url: string) {
    return url;
  }

  async get<T>(url: string, options?: RequestInit) {
    const response = await fetch(this.getUrl(url), options);
    const data = (await response.json()) as T;

    return {
      status: response.status,
      Headers: response.headers,
      body: data,
    };
  }
}

export const EposRequests = new HttpRequest();
