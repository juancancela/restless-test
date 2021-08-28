class HttpForbidden {
  constructor(message, stack = null) {
    this.code = 403;
    this.message = message;
    this.stack = stack;
  }
}

class HttpServiceUnavailable {
  constructor(message, stack = null) {
    this.code = 503;
    this.message = message;
    this.stack = stack;
  }
}

module.exports = {
  HttpForbidden,
  HttpServiceUnavailable,
};
