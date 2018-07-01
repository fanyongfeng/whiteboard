import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class MarkPen extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.MARKPEN;
    this.cxt.on('path:created', (object) => {
      if (this.toolActive) {
        this.renderPath(object.path, true);
      }
    });
  }

  set selected(selected) {
    this.toolActive = selected;
    if (selected) {
      this.cxt.isDrawingMode = true;
    }
  }

  set style(style) {
    this.cxt.freeDrawingBrush.color = style.color;
    this.cxt.freeDrawingBrush.width = style.width;
  }

}

export default MarkPen;