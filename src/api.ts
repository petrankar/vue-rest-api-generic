const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getRequest<T>(path: string, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'GET request failed');
  }

  return res.json() as Promise<T>;
}

export async function postRequest<T>(path: string, body: any, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'POST request failed');
  }

  return res.json() as Promise<T>;
}

export async function putRequest<T>(path: string, body: any, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'PUT request failed');
  }

  return res.json() as Promise<T>;
}

export async function patchRequest<T>(path: string, body: any, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'PATCH request failed');
  }

  return res.json() as Promise<T>;
}


