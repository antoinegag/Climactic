export default class RequestHandler {
  static get(url) {
    return fetch(`/api/${url}`).then(res => res.json());
  }

  static delete(url) {
    return fetch(`/api/${url}`, { method: "DELETE" }).then(res => res.json());
  }

  static post(url, body) {
    return fetch(`/api/${url}`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(res => res.json());
  }

  static put(url, body) {
    return fetch(`/api/${url}`, {
      method: "PUT",
      body: JSON.stringify(body)
    }).then(res => res.json());
  }
}
