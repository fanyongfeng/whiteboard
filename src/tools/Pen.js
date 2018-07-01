import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Pen extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.PEN;
    this.cxt.on('path:created', (object) => {
      if (this.toolActive) {
        this.renderPath(object.path, true);
      }
    });
  }

  set selected(selected) {
    this.toolActive = selected;
    this.cxt.isDrawingMode = selected;
  }

  set style(style) {
    this.cxt.freeDrawingBrush.color = style.color;
    this.cxt.freeDrawingBrush.width = style.width;
  }
}

export default Pen;