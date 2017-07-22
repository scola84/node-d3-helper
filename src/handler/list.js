import AbstractHandler from './abstract';

export default class ListHandler extends AbstractHandler {
  constructor() {
    super();
    this._append = null;
    this._list = null;
    this._prepend = null;
  }

  append(value = null) {
    if (value === null) {
      return this._append;
    }

    this._append = value;
    return this;
  }

  list(value = null) {
    if (value === null) {
      return this._list;
    }

    this._list = value;
    return this;
  }

  prepend(value = null) {
    if (value === null) {
      return this._prepend;
    }

    this._prepend = value;
    return this;
  }

  start() {
    super.start();

    if (this._model.has('id')) {
      this._select(this._model.remote());
    }

    return this;
  }

  _bindState() {
    this._state
      .if('auth').equal('valid')
      .if('id').number()
      .then(() => {
        this._model.select();
      });
  }

  _empty() {
    this._list.message(this._string
      .format('scola.error.invalid_data'));
  }

  _error(error) {
    this._list.message(error
      .prefix('string', 'scola.error')
      .toString(this._string));
  }

  _select(data) {
    this._list.clear();

    const prepend = this._prepend !== null ?
      this._prepend() : null;

    if (prepend !== null) {
      this._list.append(prepend);
    }

    if (data.length === 0) {
      this._empty();
    } else {
      this._list.render(data);
    }

    const append = this._append !== null ?
      this._append() : null;

    if (append !== null) {
      this._list.append(append);
    }
  }

  _set(setEvent) {
    const cancel =
      setEvent.changed === false ||
      setEvent.name !== 'id';

    if (cancel) {
      return;
    }

    this._state.set('id', setEvent.value);
  }
}
