import AbstractHandler from './abstract';

export default class ObjectHandler extends AbstractHandler {
  constructor() {
    super();
    this._panel = null;
  }

  panel(value = null) {
    if (value === null) {
      return this._panel;
    }

    this._panel = value;
    return this;
  }

  disable(message) {
    this._panel.disabled(true);
    this._panel.message(message);

    return this;
  }

  enable() {
    this._panel.disabled(false);
    this._panel.message(false);

    return this;
  }

  _bindState() {
    this._state
      .if('auth').equal('valid')
      .if('id').number()
      .then(() => {
        this.enable();
        this._model.select();
      });
  }

  _error(error) {
    if (error.status !== 404) {
      return;
    }

    this.disable(error
      .prefix('string', 'scola.error.short')
      .toString(this._string));
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
