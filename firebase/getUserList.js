import Firebase, { userCollectionName } from './index';

import _ from 'lodash';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const getUserList = () => {
  const [userList, userListLoading, userListError] = useCollectionData(
    Firebase.shared.firestore().collection(userCollectionName),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const output = _.reduce(userList, (acc, user) => {
    const { uid, ...rest } = user;
    if (uid) {
      return {
        ...acc,
        [uid]: rest
      }
    }
    return acc
  }, {})


  return [output, userListLoading, userListError]
}

export default getUserList;