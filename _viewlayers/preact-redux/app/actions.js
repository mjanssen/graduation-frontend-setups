export const addItem = text => ({
  type: 'ADD_ITEM',
  text,
});

export const removeItem = item => ({
  type: 'REMOVE_ITEM',
  item,
});
