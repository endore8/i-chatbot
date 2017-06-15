class ChatBotUtil {
  static textMessage (text, ...actions) {
    return {
      message: {
        text: text
      },
      actions: actions
    }
  }

  static makeReplyButton (text, postback) {
    return {
      title: text,
      postback: postback
    }
  }
}

Array.prototype.any = function () {
  return this[Math.floor((Math.random() * this.length))]
}

export default ChatBotUtil
