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
    window.changeTool = this.changeTool;
    this.changeTool(toolTypes.SELECTOR); // 初始画笔
    this.bindListener();
    this.checkParams();
  }

  redo() {
    this.store.redo();
  }

  undo() {
    this.store.undo();
  }

  /**
   * tool is one of toolTypes
   */
  changeTool = (tool) => {
    forEach(this.toolGroup.tools, (itemTool) => {
      if (tool === itemTool.toolType) {
        this.currentTool = itemTool;
        itemTool.selected = true;
      } else {
        itemTool.selected = false;
      }
    });
    return this.currentTool
  }
  /**
   * 
   * @param {JASON} data path instance json
   * draw receive data
   */
  drawJSON(data) {
    this.toolGroup.drawJSON(data);
  }

  deleteAll() {
    this.store.clearAll();
  }

  /**
   * param[id] path instance id
   */
  delete(id) {
    this.store.delete(id);
  }

  set currentToolInfo(toolInfo) {
    const {
      tool
    } = toolInfo;
    this.changeTool(tool);
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
      this.store.add(path);
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