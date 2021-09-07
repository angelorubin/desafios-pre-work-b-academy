const request = (url: string, options?: object) =>
  fetch(url, options)
    .then((r) => r.json())
    .catch((e) => ({ error: true, message: e.message }));

const createRequest = (method: string) => (url: string, data: object) =>
  request(url, {
    method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const get = (url: string) => request(url);
export const post = createRequest("POST");
export const del = createRequest("DELETE");
