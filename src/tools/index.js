import Circle from './Circle';

class Tools {
  constructor(canvas, style) {
    this.cxt = canvas;
    this.style = Object.assign({}, {
      fill: 'transparent', 
    }, style);
    this.initTools();
  }

  initTools() {
    this.toolList = [new Circle(this.cxt, this.style)];
  }

  get tools () {
    return this.toolList;
  }
}



export default Tools;