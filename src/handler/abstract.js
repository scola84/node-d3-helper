export default class AbstractHandler {
  constructor() {
    this._client = null;
    this._model = null;
    this._pubsub = true;
    this._state = null;
    this._string = null;

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

  pubsub(value = null) {
    if (value === null) {
      return this._pubsub;
    }

    this._pubsub = value;
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
    this._client.on('auth', this._handleAuth);
  }

  _unbindClient() {
    this._client.removeListener('auth', this._handleAuth);
  }

  _bindModel() {
    this._model.on('error', this._handleError);
    this._model.on('publish', this._handlePublish);
    this._model.on('select', this._handleSelect);
    this._model.on('set', this._handleSet);
  }

  _unbindModel() {
    this._model.removeListener('error', this._handleError);
    this._model.removeListener('publish', this._handlePublish);
    this._model.removeListener('select', this._handleSelect);
    this._model.removeListener('set', this._handleSet);
  }

  _auth(value) {
    this._state.set('auth', value);
  }

  _publish() {
    if (this._pubsub === true) {
      this._model.select();
    }
  }

  _bindState() {}

  _error() {}

  _select() {}

  _set() {}
}
