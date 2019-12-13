import Firebase, { eventCollectionName } from "../config/Firebase";

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


const transformLeaderboard = (array) => {
  return _.reduce(array, (acc, item) => {
    return {
      ...acc,
      [item.user.uid]: acc[item.user.uid] ? acc[item.user.uid] + 1 : 1
    }
  }, {})
}

const Leaderboard = (props) => {
  const [photoList, photoListLoading, photoListError] = useCollectionData(
    Firebase.shared.firestore().collection(eventCollectionName).where('proximity', '>', '0'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading || error) return null;

  const leaderboardList = transformLeaderboard(photoList);

  return <AppPageContainer {...props} heading="Leaderboard">
    {Object.keys(leaderboardList).map(key => {
      const value = leaderboardList[key];
      return <ListItem key={key}>
        <ListText>{key} - {value}</ListText>
      </ListItem>
    })}
  </AppPageContainer>
}

export default Leaderboard;