import Firebase, { eventCollectionName, userCollectionName } from "../config/Firebase";

import { AppPageContainer } from '../components';
import React from "react";
import _ from 'lodash';
import styled from 'styled-components/native';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ListItem = styled.View`
  padding: 10px;
`;

const ListText = styled.Text`
  color: black;
`;


const getUserList = () => {
  const [userList, userListLoading, userListError] = useCollectionData(
    Firebase.shared.firestore().collection(userCollectionName),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const output = _.reduce(userList, (acc, user) => {
    return {
      ...acc,
      [user.uid]: { ...user }
    }
  })


  return [output, userListLoading, userListError]
}

const transformLeaderboard = (photoList, userList) => {
  return _.reduce(photoList, (acc, item) => {
    if (userList[item.user.uid]) {
      return {
        ...acc,
        [userList[item.user.uid].displayName]: acc[item.user.uid] ? acc[item.user.uid] + 1 : 1
      }
    }
    return acc;
  }, {})
}

const Leaderboard = (props) => {
  const [userList, userListLoading, userListError, userListCount] = getUserList();
  const [photoList, photoListLoading, photoListError] = useCollectionData(
    Firebase.shared.firestore().collection(eventCollectionName).where('proximity', '>', '0'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  if (photoListLoading || photoListError || userListLoading || userListError) return null;

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