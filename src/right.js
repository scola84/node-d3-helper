import { selection } from 'd3';

selection.prototype.right = function right(style = false) {
  let value = NaN;

  if (style === true) {
    value = this.style('right');
    value = value.match('px') === null ? NaN : value;
  } else {
    value = window
      .getComputedStyle(this.node(), null)
      .getPropertyValue('right');
  }

  return parseFloat(value);
};
