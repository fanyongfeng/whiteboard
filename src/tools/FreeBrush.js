import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class FreeBrush extends ToolBase {
  constructor(cxt, style, callback) {
    super(cxt, style); // need refactor
    this.cxt.on('path:created', (object) => {
      if (this.toolActive) {
        callback && callback(object.path)
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

export default FreeBrush;