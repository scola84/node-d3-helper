import AbstractHandler from './abstract';

export default class TableHandler extends AbstractHandler {
  constructor() {
    super();
    this._table = null;
  }

  table(value = null) {
    if (value === null) {
      return this._table;
    }

    this._table = value;
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
      .if('l.off').number()
      .if('l.cnt').number()
      .then(() => {
        this._table.message(false);
        this._model.select();
      });
  }

  _empty() {
    this._table.message(this._string
      .format('scola.error.short.invalid_data'));
  }

  _error(error) {
    this._table.message(error
      .prefix('string', 'scola.error.short')
      .toString(this._string));
  }

  _select(data) {
    if (data.length === 0) {
      this._empty();
      return;
    }

    this._table.render(data);
  }

  _set(setEvent) {
    if (setEvent.changed === true) {
      this._state.set(setEvent.name, setEvent.value);
    }
  }
}
