import { ActivityIndicator, AppPageContainer } from '../components';
import { Body, Left, List, ListItem, Right, Text, Thumbnail } from 'native-base';

import React from "react";
import _ from 'lodash';
import getLeaderboard from '../api/firebase/getUserList';
import getUserList from '../api/firebase/getUserList';

const transformLeaderboard = (photoList, userList) => {
  return _.reduce(photoList, (acc, item, key) => {
    const user = userList[ key ];
    return {
      ...acc,
      [ user.displayName ]: {
        count: acc[ key ] ? acc[ key ] + 1 : 1,
        photoUrl: _.has(user, 'photoUrl') ? user.photoUrl : null
      }
    };
  }, {});
};

const Leaderboard = (props) => {
  const [ userList, userListLoading, userListError ] = getUserList();
  const [ photoList, photoListLoading, photoListError ] = getLeaderboard(true);

  if (photoListError || userListError) {
    return <AppPageContainer {...props} heading={`Leaderboard`}>
      <ListText>There was an error!</ListText>
    </AppPageContainer>;
  }

  if (userListLoading || photoListLoading) {
    return <ActivityIndicator />;
  }

  const leaderboardList = transformLeaderboard(photoList, userList);

  return <AppPageContainer {...props} heading={`Leaderboard`}>
    <List>
      {Object.keys(leaderboardList).map(name => {
        const { photoUrl, count } = leaderboardList[ name ];
        return <ListItem avatar={!!photoUrl} key={name}>
          {!!photoUrl ? <Left>
            {photoUrl && <Thumbnail small source={{ uri: photoUrl }} />}
          </Left> : null}
          <Body>
            <Text>{name}</Text>
            <Text note>...</Text>
          </Body>
          <Right>
            <Text>{count}</Text>
          </Right>
        </ListItem>;
      })}
    </List>
  </AppPageContainer>;
};

export default Leaderboard;
