import uniqueId from 'lodash/uniqueId';
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
    this.isSelected = false;
    this.bindEvent();
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
    if (this.isMouseDown) {
      this.onMouseDragHandle(event);
    }
  }

  onMouseDragHandle(event) {

  }

  onMovingHandle(e) {}
  onRotatingHandle(e) {}
  onScalingHandle(e) {}

  renderPath(path) {
    if (!path) return;
    path.id = uniqueId('wbPath');
    this.cxt.add(path);
    debugger
    this.bindEvent(path);
  }

  bindEvent(path) {
    if (!path) return;
    pathEvents.forEach(event => {
      path.on(event.origin, this[event.instance]);
    });
    path.on('selected', (e) => {
      this.isSelected = true;
      path.hasControls = true;
    });
    path.on('deselected', (e) => {
      this.isSelected = false;
      path.hasControls = false;
    });
  }
};

export default ToolBase;