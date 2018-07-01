import capitalize from 'lodash/capitalize';

import Circle from './Circle';
import Text from './Text';
import Pen from './Pen';
import MarkPen from './MarkPen';
import Eraser from './Eraser';
import Selector from './Selector';

class Tools {
  constructor(canvas, style) {
    this.cxt = canvas;
    this.style = Object.assign({}, {
      fill: 'transparent',
    }, style);
    this.initTools();
  }

  drawJSON = (data) => {
    const constructor = capitalize(data.type);
    fabric[constructor].fromObject(data, (path) => {
      this.cxt.add(path);
    });
  }

  initTools() {
    this.toolList = [
      new Circle(this.cxt, this.style),
      new Text(this.cxt, this.style),
      new Pen(this.cxt, this.style),
      new MarkPen(this.cxt, this.style),
      new Eraser(this.cxt, this.style),
      new Selector(this.cxt, this.style)
    ];
  }

  get tools() {
    return this.toolList;
  }
}

export default Tools;