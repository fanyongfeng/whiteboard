import {
  findDom
} from './utils/dom';
import log from './utils/error';
import { fabric } from 'fabric';

import Tools from './tools';

const defaultProps = {
  id: 'whiteboard'
}

const mouseEvents = [{
  origin: 'mouse:up',
  instance: 'onMouseupHandle'
}, {
  origin: 'mouse:down',
  instance: 'onMousedownHandle'
}, {
  origin: 'mouse:move',
  instance: 'onMousemoveHandle'
}]

class whiteboard {
  constructor(props) {
    const {
      id, width = 1000, height = 700
    } = props;
    this.props = props;
    this.originCanvas = findDom(`#${id}`);
    this.canvas = new fabric.Canvas(id, {
      width,
      height,
      selection: false
    });
    this.toolGroup = new Tools(this.canvas, {
      borderColor: '#00B8FC',
      cornerColor: '#FF4B59',
      cornerSize: 6,
      strokeWidth: 1,
      stroke: '#000000',
      hasControls: false,
      transparentCorners: true
    });
    this.currentTool = this.toolGroup.tools[0];
    this.bindListener();
    this.checkParams();
  }

  /**
   * 设置可选
   */
  set selection(selection) {
    this.canvas && (this.canvas.selection = selection);
  }

  bindListener() {
    mouseEvents.forEach(item => {
      this.canvas.on(item.origin, (...arg) => {
        this.currentTool && this.currentTool[item.instance] && this.currentTool[item.instance](arg);
      });
    })
    this.canvas.on('path:created', (path) => {
    });
    this.canvas.on('selection:created', (path) => {
    })
    this.canvas.on('object:moving', (path) => {
    });
    this.canvas.on('object:rotating', (path) => {
    });
    this.canvas.on('object:skewing', (path) => {
    })
  }

  checkParams() {
    if (!this.props.id) {
      log.error('need whiteboard ID')
    }
  }

}

export default whiteboard;