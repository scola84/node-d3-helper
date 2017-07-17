import './src/proto/bounding-rect';
import './src/proto/computed-style';
import './src/proto/dimensions';
import './src/proto/position';

import ListHandler from './src/handler/list';
import ObjectHandler from './src/handler/object';
import TableHandler from './src/handler/table';

function listHandler() {
  return new ListHandler();
}

function objectHandler() {
  return new ObjectHandler();
}

function tableHandler() {
  return new TableHandler();
}

export {
  listHandler,
  objectHandler,
  tableHandler
};
