import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
} from 'react-native';
import CodePush from 'react-native-code-push';
import { useCodePush } from './CodePushProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SplashScreenProps {
  children: React.ReactElement;
  loadingText?: string;
  errorText?: string;
  LoadingComponent?: React.ReactElement;
  ErrorComponent?: React.ReactElement;
  continueOnError?: boolean;
  timeout?: number;
}

interface SplashViewProps {
  label?: string;
  labelStyle?: TextStyle;
  logoSource?: ImageSourcePropType;
  logoStyle?: ImageStyle;
}

const SplashView = ({
  label,
  labelStyle,
  logoSource,
  logoStyle,
}: SplashViewProps) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
      {logoSource ? <Image source={logoSource} style={logoStyle} /> : null}
    </View>
    <View style={styles.labelContainer}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  </SafeAreaView>
);

const CodePushSplashScreen = ({
  children,
  LoadingComponent,
  ErrorComponent,
  loadingText = 'Checking for updates...',
  errorText = 'There was an error when checking for updates.',
  continueOnError = true,
  timeout,
}: SplashScreenProps) => {
  const { status } = useCodePush();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (timeout && timeout > 0) {
      const timerId = setTimeout(() => {
        setTimedOut(true);
      }, timeout);
      return () => clearTimeout(timerId);
    }

    return;
  }, [timeout]);

  // continue on timeout
  if (timedOut) {
    return children;
  }

  switch (status) {
    case CodePush.SyncStatus.UP_TO_DATE: // The app is fully up-to-date with the configured deployment.
    case CodePush.SyncStatus.UPDATE_INSTALLED: // An available update has been installed and will be run either immediately after the syncStatusChangedCallback function returns or the next time the app resumes/restarts, depending on the InstallMode specified in SyncOptions.
    case CodePush.SyncStatus.UPDATE_IGNORED: // The app has an optional update, which the end user chose to ignore. (This is only applicable when the updateDialog is used)
      setTimedOut(true);
      break;
    case CodePush.SyncStatus.UNKNOWN_ERROR: // The sync operation encountered an unknown error.
      if (continueOnError) {
        return children;
      }
      return ErrorComponent ?? <SplashView label={errorText} />;
    case CodePush.SyncStatus.SYNC_IN_PROGRESS: // There is an ongoing sync operation running which prevents the current call from being executed.
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE: // The CodePush server is being queried for an update.
    case CodePush.SyncStatus.AWAITING_USER_ACTION: // An update is available, and a confirmation dialog was shown to the end user. (This is only applicable when the updateDialog is used)
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE: // An available update is being downloaded from the CodePush server.
    case CodePush.SyncStatus.INSTALLING_UPDATE: // An available update was downloaded and is about to be installed.
      return LoadingComponent ?? <SplashView label={loadingText} />;
  }

  // by default show splash without any CodePush status messages
  return LoadingComponent ?? <SplashView />;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    padding: 12,
  },
  label: {
    textAlign: 'center',
  },
});

export default CodePushSplashScreen;
