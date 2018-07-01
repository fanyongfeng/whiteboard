/**
 * props [renderPath = add path on cancas func, ]
 */
import filter from 'lodash/filter';

class Store {
  constructor(props) {
    const {
      renderPath
    } = props;
    this.cxt = props.cxt;
    this.items = [];
  }

  add(pathInfo) {
    this.items.push(pathInfo);
  }

  delete(id) {
    if (!id) return;
    this.items = filter(this.items, (item) => item.id !== id);
  }

  clearAll() {
    // this.items = [];
    this.cxt.clear();
  }
}

export default Store;