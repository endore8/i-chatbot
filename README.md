<p align="center">
    <img src="https://raw.githubusercontent.com/endore8/i-chatbot/master/assets/icon.png" max-width="90%" alt="Marathon" />
</p>
<h1 align="center">i-chatbot</h1>
<p align="center">
Simple and elegant component for building conversational interfaces on React. 🤖💯✨
</p>
<p align="center">
    <a href="https://travis-ci.org/Endore8/i-chatbot">
        <img src="https://img.shields.io/travis/Endore8/i-chatbot.svg?branch=master" alt="build" />
    </a>
    <a href="https://www.npmjs.org/package/i-chatbot">
        <img src="https://badge.fury.io/js/i-chatbot.svg" alt="npm" />
    </a>
    <a href="https://codecov.io/gh/Endore8/i-chatbot/branch/master/graph/badge.svg">
        <img src="https://codecov.io/gh/Endore8/i-chatbot/branch/master/graph/badge.svg" alt="coverage" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license" />
    </a>
</p>

## Getting Started 🚀

### Installation

```
npm i i-chatbot --save
```

### Basic Usage

Import component

```
import ChatBot, { ChatBotUtil } from 'i-chatbot'
```

Create methods that will handle postback events from a chatbot.
It should return an array of message objects to reply on user's action with a callback.

```
  getStarted () {
    return [
      ChatBotUtil.textMessage(['Hi!', 'Hey there!'].any()),
      ChatBotUtil.textMessage(['How is life?', 'What\'s up?'].any(),
        ChatBotUtil.makeReplyButton('Great!', this.intro))
    ]
  }

  intro () {
    return [
      ChatBotUtil.textMessage('That\'s good to hear!')
    ]
  }
```

Render ChatBot with a get started callback method and a start button.

```
<ChatBot onGetStarted={this.getStarted}
         getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')} />
```

### ChatBot

### *Props*

| Prop               | Default       | Type   | Description |
| ------------------ |:-------------:| :-----:| -----------|
| onGetStarted       | -             | func   | Inital callback method to return first messages |
| getStartedButton   | -             | object | Start button parameters |

### *Methods*

#### startOver (message)

Resets a state of chat and adds a message object if no get started button set.

### ChatBotUtil

### *Methods*

#### textMessage (text, ...actions)

Create a text message object.

Parameters:

| Name    | Type      | Description |
| ------- |:---------:| ------------|
| text    | string    | Message text |
| actions | object(s) | Quick reply button(s) object |

#### userTextMessage (text)

Create a user's text message object.

Parameters:

| Name    | Type      | Description |
| ------- |:---------:| ------------|
| text    | string    | Message text |

#### makeReplyButton (title)

Create a get started button.

Parameters:

| Name     | Type   | Description |
| -------- |:------:| ------------|
| title    | string | Title |

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

### Style

As CSS pre-processor is used [LESS](http://lesscss.org). Copy and modify styles from `demo/src/i-chatbot.less` and then import in your app.

## Built with `i-chatbot` 🤘

- Personal [website](http://olehst.com) of Oleh Stasula
- Landing [page](http://meetjustin.online/) of Justin Case

Have you built something cool with `i-chatbot`? Submit a pull-request and add it to this list! 😉

## To-do 🛠

- Bottom-up chat direction
- Better input validation
- Avatar placeholder

## Contribution 💪

Your contribution is welcomed, no matter how big or small!

Please have a look at the [contribution guide](CONTRIBUTING.md) for details about project structure, development environment, test suite, code style, etc.
All the version updates are mentioned in the [changelog](CHANGELOG.md).

## License 🔖

The library is available as open source under the terms of the [MIT License](LICENSE).
