import React, { createContext, useContext } from 'react';
import codePush from 'react-native-code-push';
import type { DownloadProgress } from 'react-native-code-push';

interface Context {
  status?: codePush.SyncStatus;
  progress?: DownloadProgress;
}

const CodePushContext = createContext<Context>({});

export const useCodePush = () => useContext<Context>(CodePushContext);

export class CodePushProvider extends React.Component<{}, Context> {
  state = {
    status: undefined,
    progress: undefined,
  };

  codePushStatusDidChange(status: codePush.SyncStatus) {
    this.setState({ status });
  }

  codePushDownloadDidProgress(progress: DownloadProgress) {
    this.setState({ progress });
  }

  render() {
    return (
      <CodePushContext.Provider
        value={{
          status: this.state.status,
          progress: this.state.progress,
        }}
      >
        {this.props.children}
      </CodePushContext.Provider>
    );
  }
}

// default codepush config
export default codePush()(CodePushProvider);
