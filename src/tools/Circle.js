import ToolBase from './ToolBase';
import { fabric } from 'fabric';
import toolTypes from '../constants/tools';

class Circle extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.CIRCLE;
  }

  onMouseDragHandle(event) {
    const { x, y } = event[0].pointer;
    if (this.circle) this.cxt.remove(this.circle);
    const options = Object.assign({}, this.style, {
      radius: 20, 
      left: x, 
      top: y, 
    });
    this.circle = new fabric.Circle(options);
  }

  onMouseupHandle(e) {
    super.onMouseupHandle(e);
    this.renderPath(this.circle);
    this.circle = null;
  }
}

export default Circle;