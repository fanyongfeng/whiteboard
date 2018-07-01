import ToolBase from './ToolBase';
import {
  fabric
} from 'fabric';
import toolTypes from '../constants/tools';

class Eraser extends ToolBase {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.SELECTOR;
  }

  set selected(selected) {
    this.toolActive = selected;
    this.cxt.selection = true;
  }

}

export default Eraser;