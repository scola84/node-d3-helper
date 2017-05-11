import { selection } from 'd3';

selection.prototype.width = function width(style = false) {
  if (style === true) {
    const value = this.style('width');
    return value.match('px') === null ?
      NaN : parseFloat(value);
  }

  return this
    .node()
    .getBoundingClientRect()
    .width;
};
