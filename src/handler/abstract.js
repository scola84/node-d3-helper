export default class AbstractHandler {
  constructor() {
    this._client = null;
    this._model = null;
    this._state = null;
    this._string = null;
    this._subscribe = true;

    this._handleAuth = (v) => this._auth(v);
    this._handleError = (e) => this._error(e);
    this._handlePublish = (d) => this._publish(d);
    this._handleSelect = (d) => this._select(d);
    this._handleSet = (e) => this._set(e);
  }

  client(value = null) {
    if (value === null) {
      return this._client;
    }

    this._client = value;
    return this;
  }

  model(value = null) {
    if (value === null) {
      return this._model;
    }

    this._model = value;
    return this;
  }

  subscribe(value = null) {
    if (value === null) {
      return this._subscribe;
    }

    this._subscribe = value;
    return this;
  }

  state(value = null) {
    if (value === null) {
      return this._state;
    }

    this._state = value;
    this._bindState();

    return this;
  }

  string(value = null) {
    if (value === null) {
      return this._string;
    }

    this._string = value;
    return this;
  }

  start() {
    this._bindClient();
    this._bindModel();

    this._state
      .clear()
      .set('auth', this._client.state('auth'));

    return this;
  }

  stop() {
    this._unbindClient();
    this._unbindModel();

    return this;
  }

  _bindClient() {
    if (this._client) {
      this._client.setMaxListeners(this._client.getMaxListeners() + 1);
      this._client.on('auth', this._handleAuth);
    }
  }

  _unbindClient() {
    if (this._client) {
      this._client.setMaxListeners(this._client.getMaxListeners() - 1);
      this._client.removeListener('auth', this._handleAuth);
    }
  }

  _bindModel() {
    if (this._model) {
      this._model.setMaxListeners(this._model.getMaxListeners() + 1);
      this._model.on('error', this._handleError);
      this._model.on('publish', this._handlePublish);
      this._model.on('select', this._handleSelect);
      this._model.on('set', this._handleSet);
    }
  }

  _unbindModel() {
    if (this._model) {
      this._model.setMaxListeners(this._model.getMaxListeners() - 1);
      this._model.removeListener('error', this._handleError);
      this._model.removeListener('publish', this._handlePublish);
      this._model.removeListener('select', this._handleSelect);
      this._model.removeListener('set', this._handleSet);
    }
  }

  _auth(value) {
    this._state.set('auth', value);
  }

  _publish() {
    if (this._subscribe === true) {
      this._model.select();
    }
  }

  _bindState() {}

  _error() {}

  _select() {}

  _set() {}
}
