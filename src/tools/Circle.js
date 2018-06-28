import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Circle extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.CIRCLE;
  }

  onMousedownHandle(event) {
    super.onMousedownHandle(event);
    this.downPointer = event[0].pointer;
  }

  onMouseDragHandle(event) {
    if (!this.isSelected) {
      const {
        x,
        y
      } = this.downPointer;
      if (this.circle) {
        this.cxt.remove(this.circle);
        this.circle = null;
      };
      const radius = event[0].pointer.y - this.downPointer.y;
      const options = Object.assign({}, this.style, {
        radius,
        left: x,
        top: y,
      });
      this.circle = new fabric.Circle(options);
      this.renderPath(this.circle);
    }
  }

  onMouseupHandle(e) {
    super.onMouseupHandle(e);
    if (!this.circle) return;
    this.renderPath(this.circle);
    this.circle = null;
    this.downPointer = null;
  }

  getLineLength(start, end) {
    return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
  }
}

export default Circle;