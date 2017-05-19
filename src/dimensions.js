import { selection } from 'd3';

selection.prototype.dimensions = function dimensions() {
  return {
    height: this.boundingRect('height'),
    width: this.boundingRect('width')
  };
};
