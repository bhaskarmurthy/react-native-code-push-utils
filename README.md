# react-native-code-push-utils

Utilities for CodePush

## Installation

```sh
npm install react-native-code-push-utils
```
or
```sh
yarn add react-native-code-push-utils
```

## Usage

### Default CodePush config
```js
import CodePushProvider from "react-native-code-push-utils";
import App from "./App";

export default function Root() {
    return (
        <CodePushProvider>
            <App />
        </CodePushProvider>
    )
}
```

### Custom CodePush config
```js
import codePush from "react-native-code-push";
import {CodePushProvider} from "react-native-code-push-utils";
import App from "./App";

function Root() {
    return (
        <CodePushProvider>
            <App />
        </CodePushProvider>
    )
}

const config = {...};
export default codePush(config)(Root);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
