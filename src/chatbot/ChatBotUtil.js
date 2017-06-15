class ChatBotUtil {
  static textMessage (text, ...actions) {
    return {
      message: {
        text: (Array.isArray(text)) ? text[1] : text
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

export default ChatBotUtil
