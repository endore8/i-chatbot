# i-chatbot

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![License: MIT][mit-badge]][mit]

Chatbot component for React.

[build-badge]: https://img.shields.io/travis/Endore8/i-chatbot.svg?branch=master
[build]: https://travis-ci.org/Endore8/i-chatbot

[npm-badge]: https://badge.fury.io/js/i-chatbot.svg
[npm]: https://www.npmjs.org/package/i-chatbot

[coveralls-badge]: https://codecov.io/gh/Endore8/i-chatbot/branch/master/graph/badge.svg
[coveralls]: https://codecov.io/gh/Endore8/i-chatbot/branch/master/graph/badge.svg

[mit-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit]: https://opensource.org/licenses/MIT

## Getting Started

### Installation

```
npm i i-chatbot --save
```

### Basic Usage

Import component

```
import ChatBot from 'i-chatbot' 
```

Create a method that will handle postback events from a chatbot. 
It should return an array of message objects to reply on user's action identified by postback.

```
onQuickReplyAction (postback) { 
  switch (postback) {
    case 'GET-STARTED':
      return [
        ChatBot.textMessage('Hi!'),
        ChatBot.textMessage('How is life?',
          ChatBot.makeReplyButton('Great!', 'INTRO'))
      ]

    case 'INTRO':
      return [
        ChatBot.textMessage('That\'s good to hear!'),
        ChatBot.textMessage('Want to know more about me?',
          ChatBot.makeReplyButton('Sure!', 'ABOUT'),
          ChatBot.makeReplyButton('Nope', 'END'))
      ]
 
    case 'ABOUT':
      return [
        ChatBot.textMessage('I\'m a chatbot! 🤖',
          ChatBot.makeReplyButton('Hah', 'END'))
      ]

    case 'END':
      return [
        ChatBot.textMessage('Ok, that\'s it for today'),
        ChatBot.textMessage('Come back later! 😉',
          ChatBot.makeReplyButton('Bye', 'BYE'))
      ]
  }
}
```

Render ChatBot with the callback method and the start button object.

```
<ChatBot onQuickReplyAction={this.onQuickReplyAction}
         startButton={ChatBot.makeReplyButton('Get Started', 'GET-STARTED')} />
```

### Props

| Prop               | Default       | Type   | Description |
| ------------------ |:-------------:| :------:| -----------|
| onQuickReplyAction | -             | func   | Callback method on user's action on a quick reply button |
| startButton        | -             | object | Start button parameters |
| isTypingEnabled    | true          | bool   | Typing delay |

### Methods

#### textMessage (text, ...actions)

Create a text message object.

Parameters:

| Name    | Type      | Description |
| ------- |:---------:| ------------|
| text    | string    | Message text |
| actions | object(s) | Quick reply button(s) object |

#### makeReplyButton (title, postback)

Create a quick reply button.

Parameters:

| Name     | Type   | Description |
| -------- |:------:| ------------|
| title    | string | Title |
| postback | string | Postback value |

## Contribution

Your contribution is welcomed, no matter how big or small! 

Please have a look at the [contribution guide](CONTRIBUTING.md) for details about project structure, development environment, test suite, code style, etc. 
All the version updates are mentioned in the [changelog](CHANGELOG.md).

## License

The library is available as open source under the terms of the [MIT License](LICENSE).