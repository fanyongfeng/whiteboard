import FreeBrush from './FreeBrush';

import toolTypes from '../constants/tools';

class MarkPen extends FreeBrush {
  constructor(...arg) {
    super(...arg);
    this.toolType = toolTypes.MARKPEN;
  }

}

export default MarkPen;