import {
  findDom
} from './utils/dom';
import log from './utils/error';
import {
  fabric
} from 'fabric';
import toolTypes from './constants/tools';
import Tools from './tools';
import Store from './Store';

import forEach from 'lodash/forEach';

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
      id,
      width = 1000,
      height = 700
    } = props;
    this.props = props;
    this.originCanvas = findDom(`#${id}`);
    this.canvas = new fabric.Canvas(id, {
      width,
      height,
      selection: false
    });
    this.store = new Store({
      cxt: this.canvas
    });
    window.cxt = this.canvas; // need delete
    window.store = this.store;

    this.toolGroup = new Tools(this.canvas, {
      borderColor: '#00B8FC',
      cornerColor: '#FF4B59',
      cornerSize: 6,
      strokeWidth: 1,
      stroke: '#000000',
      hasControls: false,
      fontSize: 20,
      transparentCorners: true,
      color: 'rgba(26, 209, 255, .7)',
      width: 10
    });
    this.currentTool = this.toolGroup.tools[3];
    window.drawbyjson = () => this.currentTool.drawJSON(this.store.items[0]);
    this.bindListener();
    this.checkParams();
  }

  set currentToolInfo(toolInfo) {
    const {
      tool
    } = toolInfo;
    forEach(this.toolGroup.tools, (itemTool) => {
      if (tool === itemTool.toolType) {
        this.currentTool = itemTool;
        itemTool.selected = true;
      } else {
        itemTool.selected = false;
      }
    });
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
    this.canvas.on('path:created', (object) => {
      const {
        path
      } = object;
      const {
        id,
        toolType
      } = path;
      this.store.add(Object.assign(path.toJSON(), {
        id,
        toolType
      }));
    });
    this.canvas.on('selection:created', (path) => {})
    this.canvas.on('object:moving', (path) => {});
    this.canvas.on('object:rotating', (path) => {});
    this.canvas.on('object:skewing', (path) => {})
  }

  checkParams() {
    if (!this.props.id) {
      log.error('need whiteboard ID')
    }
  }

}

export default whiteboard;