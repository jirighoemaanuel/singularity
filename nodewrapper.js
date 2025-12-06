class WrapperApp {
  constructor() {
    this.routes = [];
  }

  get(path, callback) {
    this.routes.push({
      method: 'GET',
      path: path,
      callback: callback,
    });
  }

  post(path, callback) {
    this.routes.push({
      method: 'POST',
      path: path,
      callback: callback,
    });
  }

  handleRequest(req, res) {
    const route = this.routes.find((r) => {
      return r.method === req.method && r.path === req.url; // Added 'return'
    });

    if (route) {
      // Fixed variable name, moved inside method
      route.callback(req, res);
    }
  }
}

export default WrapperApp;
