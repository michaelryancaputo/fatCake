import { ActivityIndicator, AppPageContainer } from '../components';
import { Body, Left, List, ListItem, Right, Text, Thumbnail } from 'native-base';

import React from "react";
import _ from 'lodash';
import getLeaderboard from '../api/firebase/getLeaderboard';
import getUserList from '../api/firebase/getUserList';

const transformLeaderboard = (photoList, userList) => {
  return _.reduce(photoList, (acc, item) => {
    const key = item.uid;
    const user = userList[ key ];

    return {
      ...acc,
      [ key ]: {
        ...user,
        count: _.has(acc[ key ], 'count') ? ++acc[ key ].count : 1,
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
      {Object.keys(leaderboardList).map(key => {
        const { photoUrl, count, displayName } = leaderboardList[ key ];
        return <ListItem avatar={!!photoUrl} key={displayName}>
          {!!photoUrl ? <Left>
            {photoUrl && <Thumbnail small source={{ uri: photoUrl }} />}
          </Left> : null}
          <Body>
            <Text>{displayName}</Text>
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
