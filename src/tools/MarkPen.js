import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class MarkPen extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.MARKPEN;
    // this.cxt.freeDrawingBrush.color = 'rgba(26, 209, 255, .7)';
    // this.cxt.freeDrawingBrush.width = 10;
    this.cxt.on('path:created', (object) => {
      this.renderPath(object.path, true);
    });
  }

  set style(style) {
    this.cxt.freeDrawingBrush.color = style.color;
    this.cxt.freeDrawingBrush.width = style.width;
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

export default MarkPen;