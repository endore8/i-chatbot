import { ChatBotUtil } from '../../src'

class Logic {
  static getStarted () {
    return [
      ChatBotUtil.textMessage(['Hi!', 'Hey there!'].any()),
      ChatBotUtil.textMessage(['How is life?', 'What\'s up?'].any(),
        ChatBotUtil.makeReplyButton('Great!', Logic.intro))
    ]
  }

  static intro () {
    return [
      ChatBotUtil.textMessage('That\'s good to hear!'),
      ChatBotUtil.textMessage('Want to know more about me?',
        ChatBotUtil.makeReplyButton('Sure!', Logic.about),
        ChatBotUtil.makeReplyButton('Nope', Logic.end))
    ]
  }

  static about () {
    return [
      ChatBotUtil.textMessage('I\'m a chatbot! 🤖'),
      ChatBotUtil.textMessage('And u?',
        ChatBotUtil.makeTextInputField('Send', 'Your name', Logic.entersName))
    ]
  }

  static entersName (value) {
    return [
      ChatBotUtil.textMessage(`Welcome ${value}!`,
        ChatBotUtil.makeReplyButton('Nice!', Logic.end)
      )
    ]
  }

  static end () {
    return [
      ChatBotUtil.textMessage('Ok, that\'s it for today'),
      ChatBotUtil.textMessage('Come back later! 😉',
        ChatBotUtil.makeReplyButton('Bye'))
    ]
  }
}

export default Logic
