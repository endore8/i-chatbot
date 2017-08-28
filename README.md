<p align="center">
    <img src="https://raw.githubusercontent.com/endore8/i-chatbot/master/assets/icon.png" max-width="90%" alt="Marathon" />
</p>
<h1 align="center">i-chatbot</h1>
<p align="center">
Simple and elegant component for building conversational interfaces on React.
</p>

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![License: MIT][mit-badge]][mit]

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

Create methods that will handle postback events from a chatbot. 
It should return an array of message objects to reply on user's action identified by postback.

```
onQuickReplyAction (postback) {
    switch (postback) {
      case 'GET-STARTED':
        return [
          ChatBotUtil.textMessage(['Hi!', 'Hey there!'].any()),
          ChatBotUtil.textMessage(['How is life?', 'What\'s up?'].any(),
            ChatBotUtil.makeReplyButton('Great!', 'INTRO'))
        ]

      case 'INTRO':
        return [
          ChatBotUtil.textMessage('That\'s good to hear!'),
          ChatBotUtil.textMessage('Want to know more about me?',
            ChatBotUtil.makeReplyButton('Sure!', 'ABOUT'),
            ChatBotUtil.makeReplyButton('Nope', 'END'))
        ]

      case 'ABOUT':
        return [
          ChatBotUtil.textMessage('I\'m a chatbot! 🤖'),
          ChatBotUtil.textMessage('And u?',
            ChatBotUtil.makeTextInputField('Send', 'Your name', 'USER-NAME'))
        ]

      case 'END':
        return [
          ChatBotUtil.textMessage('Ok, that\'s it for today'),
          ChatBotUtil.textMessage('Come back later! 😉',
            ChatBotUtil.makeReplyButton('Bye', 'BYE'))
        ]
    }
  }

 onTextInputSubmit (value, postback) {
    switch (postback) {
      case 'USER-NAME':
        return [
          ChatBotUtil.textMessage(`Welcome ${value}!`,
            ChatBotUtil.makeReplyButton('Nice!', 'END')
          )
        ]
    }
  }
```

Render ChatBot with the callback method and the start button object.

```
<ChatBot onQuickReplyAction={this.onQuickReplyAction}
         onTextInputSubmit={this.onTextInputSubmit}
         startButton={ChatBotUtil.makeReplyButton('Get Started', 'GET-STARTED')} />
```

### ChatBot

### *Props*

| Prop               | Default       | Type   | Description |
| ------------------ |:-------------:| :------:| -----------|
| onQuickReplyAction | -             | func   | Callback method on user's action on a quick reply button |
| onTextInputSubmit  | -             | func   | Callback method on user's submit of text input |
| startButton        | -             | object | Start button parameters |
| isTypingEnabled    | true          | bool   | Typing delay |

### *Methods*

#### simulate (text, action)

Simulate user action (postback).

Parameters:

| Name    | Type      | Description |
| ------- |:---------:| ------------|
| text    | string    | Message text |
| action  | string    | Postback action event |

### ChatBotUtil

### *Methods*

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

#### makeTextInputField (title, postback)

Create a text input field.

Parameters:

| Name        | Type   | Description |
| ----------- |:------:| ------------|
| send        | string | Title of the submit button |
| placeholder | string | Placeholder for input field |
| postback    | string | Postback value |

## Contribution

Your contribution is welcomed, no matter how big or small! 

Please have a look at the [contribution guide](CONTRIBUTING.md) for details about project structure, development environment, test suite, code style, etc. 
All the version updates are mentioned in the [changelog](CHANGELOG.md).

## License

The library is available as open source under the terms of the [MIT License](LICENSE).
