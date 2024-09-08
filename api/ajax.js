export class Ajax {
  constructor() {
    this.baseUrl = undefined;
    this.headers = undefined;
    this.config = undefined;
  }

  create(options) {
    const { baseUrl, headers, config } = options || {};

    this.baseUrl = baseUrl;
    this.headers = headers;
    this.config = config;
  }

  async get(url, options) {
    try {
      const res = await fetch(processedUrl);

      const data = res.json();

      return data;
    } catch (err) {
      throw Error(`Error: ${err}`);
    }
  }

  async post(url, body) {
    const requestBody = typeof body === "object" ? JSON.stringify(body) : body;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          ...this.options,
        },
        body: requestBody,
      });

      const data = res.json();

      return data;
    } catch (err) {
      throw Error(`Error: ${err}`);
    }
  }
}

function processRequest({ url, options, method, body }) {
  const processedUrl = this.baseUrl ? `${this.baseUrl}${url}` : url;
  const headers = {
    "Content-type": "application/json",
  };

  if (this.options) Object.assign(headers, this.options);

  const options = {
    method,
    headers,
  };

  if (body) Object.assign(options, { body });

  return {
    url: processedUrl,
    method,
    options,
  };
}

async function fetchFacade(url, {}) {
  const config = processRequest({ url, method: "GET", options });

  const res = await fetch(url, {});
}
