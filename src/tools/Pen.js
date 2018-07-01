import FreeBrush from './FreeBrush';
import toolTypes from '../constants/tools';

class Pen extends FreeBrush {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.PEN;
  }
}

export default Pen;