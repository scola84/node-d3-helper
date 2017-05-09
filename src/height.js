import { selection } from 'd3';

selection.prototype.height = function height() {
  return this.node().getBoundingClientRect().height;
};
