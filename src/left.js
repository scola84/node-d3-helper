import { selection } from 'd3';

selection.prototype.left = function left(style = false) {
  let value = NaN;

  if (style === true) {
    value = this.style('left');
    value = value.match('px') === null ? NaN : value;
  } else {
    value = window
      .getComputedStyle(this.node(), null)
      .getPropertyValue('left');
  }

  return parseFloat(value);
};
