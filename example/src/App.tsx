import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import CodePush from 'react-native-code-push';
import CodePushProvider, { useCodePush } from 'react-native-code-push-utils';

const App = () => {
  const { status } = useCodePush();

  const getStatus = (): string => {
    switch (status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        return 'Up-to-date.';
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        return 'Update installed.';
      case CodePush.SyncStatus.UPDATE_IGNORED:
        return 'Update ignored.';
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        return 'Unknown error.';
      case CodePush.SyncStatus.SYNC_IN_PROGRESS:
        return 'Sync in progress.';
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        return 'Checking for updates.';
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        return 'Awaiting user action.';
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        return 'Downloading package.';
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        return 'Installing update.';
      default:
        return 'Unknown status.';
    }
  };

  return (
    <View style={styles.container}>
      <Text>Status: {getStatus()}</Text>
    </View>
  );
};

const Root = () => (
  <CodePushProvider>
    <App />
  </CodePushProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default Root;
