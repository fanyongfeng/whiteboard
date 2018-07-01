import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Eraser extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.ERASER;
    this.cxt.on('path:created', (object) => {
      if (this.toolActive) {
        object.path.selectable = false;
        this.renderPath(object.path, true);
      }
    });
  }

  set selected(selected) {
    this.toolActive = selected;
    if (selected) {
      this.cxt.freeDrawingBrush.color = '#fff';
      this.cxt.isDrawingMode = true;
    }
  }

  set style(style) {
    this.cxt.freeDrawingBrush.width = style.width;
  }

}

export default Eraser;