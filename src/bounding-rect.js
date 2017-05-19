import { selection } from 'd3';

selection.prototype.boundingRect = function boundingRect(name) {
  return this
    .node()
    .getBoundingClientRect()[name];
};
