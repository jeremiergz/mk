type FetchOptions = Omit<RequestInit, 'body'> & { body?: any };

/**
 * HTTP fetch function configured to communicate with the API.
 *
 * @param url the URL to fetch
 * @param options the fetch options
 */
async function apiFetch(url: string, options: FetchOptions = {}) {
  const opts = {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, opts);
  if (res.status >= 400) {
    throw new Error(`${res.status} ${res.statusText}`);
  } else if (res.headers.get('Content-Type').includes('application/json')) {
    return res.json();
  } else {
    return res.text();
  }
}

export { apiFetch };
