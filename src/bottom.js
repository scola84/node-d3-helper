import { selection } from 'd3';

selection.prototype.bottom = function bottom(style = false) {
  let value = NaN;

  if (style === true) {
    value = this.style('bottom');
    value = value.match('px') === null ? NaN : value;
  } else {
    value = window
      .getComputedStyle(this.node(), null)
      .getPropertyValue('bottom');
  }

  return parseFloat(value);
};
