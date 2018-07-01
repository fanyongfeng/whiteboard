/**
 * props [renderPath = add path on cancas func, ]
 */
import filter from 'lodash/filter';
import {
  fabric
} from 'fabric';
class Store {
  constructor(props) {
    const {
      renderPath
    } = props;
    this.cxt = props.cxt;
    this.items = [];
    this.redos = [];
    this.undos = [];
  }

  add(pathInfo) {
    this.items.push(pathInfo);
  }

  drawPath(ptah) {
    this.cxt.add(path);
  }

  delete(id) {
    let paths = []
    if (!id) { //delete selected
      paths = filter(this.items, (item) => item.hasControls);
    };
    paths = filter(this.items, (item) => item.id === id);
    this.items = filter(this.items, (item) => item.id !== id);
    paths.map((path) => this.cxt.remove(path));
  }

  clearAll() {
    this.items = [];
    this.cxt.clear();
  }

  redo() {
    debugger
    if (this.redos.length > 0) {
      const length = this.redos.length;
      const redoPath = this.redos[length - 1];
      this.cxt.add(redoPath);
      this.add(redoPath);
      this.redos = filter(this.redos, (item) => item.id !== redoPath.id);
    }
  }

  undo() {
    debugger
    const length = this.items.length;
    if (length === 0) return;
    const undoPath = this.items[length - 1];
    this.redos = [...this.redos, undoPath];
    this.delete(undoPath.id);
  }
}

export default Store;