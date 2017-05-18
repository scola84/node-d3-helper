import { selection } from 'd3';

selection.prototype.dimensions = function dimensions(style = false) {
  return {
    height: this.height(style),
    width: this.width(style)
  };
};
