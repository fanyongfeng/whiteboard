import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Line extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.PEN;
    this.cxt.on('path:created', (object) => {
      this.renderPath(object.path, true);
    });
  }

  set selected(selected) {
    this.toolActive = selected;
    this.cxt.isDrawingMode = false;
  }

  onMouseDragHandle(event) {
    if (!this.isSelected) {
      this.cxt.isDrawingMode = true;
    }
  }

}

export default Line;