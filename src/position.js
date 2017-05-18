import { selection } from 'd3';

selection.prototype.position = function position(style = false) {
  return {
    bottom: this.bottom(style),
    left: this.left(style),
    right: this.right(style),
    top: this.top(style)
  };
};
