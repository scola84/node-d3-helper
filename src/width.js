import { selection } from 'd3';

selection.prototype.width = function width() {
  return this.node().getBoundingClientRect().width;
};
