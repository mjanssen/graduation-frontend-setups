import { h, Component } from 'preact';

export default class Item extends Component {
  shouldComponentUpdate({ item, onRemove }) {
    return item !== this.props.item || onRemove !== this.props.onRemove;
  }

  remove = () => {
    const { onRemove, item } = this.props;
    onRemove(item);
  };

  render({ item }) {
    return (
      <li>
        {item.text}
        <button onClick={this.remove}>&times;</button>
      </li>
    );
  }
}
