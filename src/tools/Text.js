import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Text extends ToolBase {

  constructor(...arg) {
    super(...arg);
    this.bindLintener();
    this.toolType = toolTypes.TEXT;
  }

  onMousedownHandle(event) {
    super.onMousedownHandle(event);
    if (!this.isSelected) {
      this.text = new fabric.Textbox(' ', {
        left: event[0].pointer.x,
        top: event[0].pointer.y,
        width: 100,
        lineHeight: 0.9,
        height: 40
      });
    }
  }

  bindLintener() {
    this.cxt.on('text:changed', ({
      target
    }) => {
      debugger
      console.log(target);
    });
  }

  onMouseupHandle(event) {
    super.onMouseupHandle(event);
    this.renderPath(this.text);
    this.text.enterEditing(event);
  }

}

export default Text;