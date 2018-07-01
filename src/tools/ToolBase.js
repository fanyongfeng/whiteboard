import uniqueId from 'lodash/uniqueId';
import {
  fabric
} from 'fabric';

const pathEvents = [{
  origin: 'moving',
  instance: 'onMovingHandle'
}, {
  origin: 'scaling',
  instance: 'onScalingHandle'
}, {
  origin: 'rotating',
  instance: 'onRotatingHandle'
}]

class ToolBase {
  constructor(canvas, style) {
    this.cxt = canvas;
    this.style = style;
    this.isMouseDown = false;
    this.hasSelected = false;
    this.bindEvent();
  }

  set selected(selected) {
    this.toolActive = selected;
  }

  bindEvent() {
    // this.cxt.on('text:changed', ({
    //   target
    // }) => {
    //   console.log(target.text);
    // });
  }

  onMousedownHandle(event) {
    this.isMouseDown = true;
  }

  onMouseupHandle(event) {
    this.isMouseDown = false;
  }

  onMousemoveHandle(event) {
    const {
      movementX,
      movementY
    } = event[0].e;
    if (movementX < 0 && movementY < 0) {
      this.direction = 'leftTop';
    } else if (movementX < 0 && movementY > 0) {
      this.direction = 'leftBottom';
    } else if (movementX > 0 && movementY < 0) {
      this.direction = 'rightTop';
    } else if (movementX > 0 && movementY > 0) {
      this.direction = 'rightBottom';
    }
    if (this.isMouseDown) {
      this.onMouseDragHandle(event);
    }
  }

  onMouseDragHandle(event) {

  }

  onMovingHandle(e) {}
  onRotatingHandle(e) {}
  onScalingHandle(e) {}

  renderPath(path, ignoreRender = false) {
    if (!path) return;
    path.id = uniqueId('wbPath');
    path.toolType = this.toolType;
    !ignoreRender && this.cxt.add(path);
    this.bindEvent(path);
  }

  bindEvent(path) {
    if (!path) return;
    pathEvents.forEach(event => {
      path.on(event.origin, this[event.instance]);
    });
    path.on('selected', (e) => {
      this.hasSelected = true;
      console.log(path)
      path.hasControls = true;
    });
    path.on('deselected', (e) => {
      this.hasSelected = false;
      path.hasControls = false;
    });
  }
};

export default ToolBase;