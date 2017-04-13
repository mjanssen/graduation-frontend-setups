import { createStore } from 'redux';
import { loadState, saveState } from './local';

const ACTIONS = {
  ADD_ITEM: ({ items, ...state }, { text }) => ({
    items: [...items, {
      id: Math.random().toString(36).substring(2),
      text,
    }],
    ...state,
  }),

  REMOVE_ITEM: ({ items, ...state }, { item }) => ({
    items: items.filter(i => i !== item),
    ...state,
  }),
};

const INITIAL = {
  items: loadState('items') || [],
};

const store = createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());

store.subscribe(() => {
  saveState({
    items: store.getState().items,
  });
});

export default store;

