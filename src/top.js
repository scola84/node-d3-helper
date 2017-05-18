import { selection } from 'd3';

selection.prototype.top = function top(style = false) {
  let value = NaN;

  if (style === true) {
    value = this.style('top');
    value = value.match('px') === null ? NaN : value;
  } else {
    value = window
      .getComputedStyle(this.node(), null)
      .getPropertyValue('top');
  }

  return parseFloat(value);
};
