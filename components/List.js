import Button from './Button';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import React from 'react';

const List = ({ onPressFooter, ...props }) => {
  return (
    <FlatList
      keyExtractor={item => item.key}
      ListFooterComponent={footerProps => (
        <Button {...footerProps} title="Load More..." onPress={onPressFooter} />
      )}
      renderItem={({ item }) => <ListItem {...item} />}
      {...props}
    />
  );
};

export default List;
