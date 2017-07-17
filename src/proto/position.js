import { selection } from 'd3';

selection.prototype.position = function position() {
  return {
    bottom: this.computedStyle('bottom'),
    left: this.computedStyle('left'),
    right: this.computedStyle('right'),
    top: this.computedStyle('top')
  };
};
