import Firebase, { eventCollectionName } from './index';

import _ from 'lodash';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const getLeaderboard = (filterProximity = false) => {
  let query = Firebase.shared.firestore().collection(eventCollectionName);

  if (filterProximity) {
    query = query.where('proximity', '>', '0');
  }

  const [ photoList, photoListLoading, photoListError ] = useCollectionData(
    query,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return [ photoList, photoListLoading, photoListError ];

};

export default getLeaderboard;