import * as React from 'react';
import { View, Text } from 'react-native';
import CodePushProvider, {
  CodePushSplashScreen,
} from 'react-native-code-push-utils';

const Root = () => (
  <CodePushProvider>
    <CodePushSplashScreen>
      <View style={styles.container}>
        <Text>Hello, example</Text>
      </View>
    </CodePushSplashScreen>
  </CodePushProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Root;
