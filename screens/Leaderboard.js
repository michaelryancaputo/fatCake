import { ActivityIndicator, AppPageContainer } from '../components';

import React from "react";
import _ from 'lodash';
import getLeaderboard from '../firebase/getUserList';
import getUserList from '../firebase/getUserList';
import styled from 'styled-components/native';

const ListItem = styled.View`
  padding: 10px;
`;

const ListText = styled.Text`
  color: black;
`;

const transformLeaderboard = (photoList, userList) => {
  return _.reduce(photoList, (acc, item, key) => {
    return {
      ...acc,
      [userList[key].displayName]: acc[key] ? acc[key] + 1 : 1
    }
  }, {})
}

const Leaderboard = (props) => {
  const [userList, userListLoading, userListError] = getUserList();
  const [photoList, photoListLoading, photoListError] = getLeaderboard(true);

  if (photoListError || userListError) {
    return <AppPageContainer {...props} heading={`Leaderboard`}>
      <ListText>There was an error!</ListText>
    </AppPageContainer>
  }

  if (userListLoading || photoListLoading) {
    return <ActivityIndicator />
  }

  const leaderboardList = transformLeaderboard(photoList, userList);

  return <AppPageContainer {...props} heading={`Leaderboard`}>
    {Object.keys(leaderboardList).map(key => {
      const value = leaderboardList[key];
      return <ListItem key={key}>
        <ListText>{key} - {value}</ListText>
      </ListItem>
    })}
  </AppPageContainer>
}

export default Leaderboard;