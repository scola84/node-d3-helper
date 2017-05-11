import { selection } from 'd3';

selection.prototype.height = function height(style = false) {
  if (style === true) {
    const value = this.style('height');
    return value.match('px') === null ?
      NaN : parseFloat(value);
  }

  return this
    .node()
    .getBoundingClientRect()
    .height;
};
