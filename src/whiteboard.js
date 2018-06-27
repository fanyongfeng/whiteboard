import {
  findDom
} from './utils/dom';
import log from './utils/error';

const defaultProps = {
  id: 'whiteboard'
}

class whiteboard {
  constructor(props) {
    const {
      id
    } = props;
    this.props = props;
    this.canvas = findDom(`#${id}`);
    this.checkParams();
  }

  checkParams() {
    if (!this.props.id) {
      log.error('need whiteboard ID')
    }
  }

}

export default whiteboard;