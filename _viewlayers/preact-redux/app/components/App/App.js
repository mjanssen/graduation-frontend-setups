import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import Item from './../Item/Item';

@connect(reduce, bindActions(actions))
export default class App extends Component {
  addItem = (e) => {
    e.preventDefault();
    if (this.input.value === '') return false;
    this.props.addItem(this.input.value);
    this.input.value = '';
    return false;
  };

  removeItem = (item) => {
    this.props.removeItem(item);
  };

  render({ items }, { text }) {
    return (
      <div id="app">
        <h1>Preact Redux 🚀</h1>
        <form onSubmit={this.addItem}>
          <input value={text} ref={(input) => { this.input = input; }} placeholder="New Item..." />
        </form>
        <ul>
          {items.map(item => (
            <Item key={item.id} item={item} onRemove={this.removeItem} />
          ))}
        </ul>
      </div>
    );
  }
}
