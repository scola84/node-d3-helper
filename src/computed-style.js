import { selection } from 'd3';

selection.prototype.computedStyle = function computedStyle(name, parse = true) {
  const value = window
    .getComputedStyle(this.node(), null)
    .getPropertyValue(name);

  return parse === true ? parseFloat(value) : value;
};
