/**
 * props [renderPath = add path on cancas func, ]
 */
class Store {
  constructor(props) {
    const { renderPath } = props;
    this.items = [];
  }

  add(pathInfo) {
    this.items.push(pathInfo);
  }

  clearAll() {
    this.items = [];
  }
}