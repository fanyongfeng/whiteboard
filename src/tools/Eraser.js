import FreeBrush from './FreeBrush';

import toolTypes from '../constants/tools';

class Eraser extends FreeBrush {
  constructor(...arg) {
    super(...arg, (path) => path.selectable = false);
    this.toolType = toolTypes.ERASER;
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