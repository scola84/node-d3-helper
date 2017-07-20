import AbstractHandler from './abstract';

export default class ListHandler extends AbstractHandler {
  constructor() {
    super();
    this._add = null;
    this._list = null;
  }

  add(value = null) {
    if (value === null) {
      return this._add;
    }

    this._add = value;
    return this;
  }

  list(value = null) {
    if (value === null) {
      return this._list;
    }

    this._list = value;
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
      .prefix('string', 'scola.error.short')
      .toString(this._string));
  }

  _select(data) {
    this._list.clear();

    if (data.length === 0) {
      this._empty();
    } else {
      this._list.render(data);
    }

    const item = this._add !== null ?
      this._add() : null;

    if (item !== null) {
      this._list.append(item);
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
