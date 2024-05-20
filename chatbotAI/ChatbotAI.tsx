"use client";
import "@sendbird/chat-ai-widget/dist/style.css";
import { ChatAiWidget } from "@sendbird/chat-ai-widget";

export default function ChatbotAI (){

  
  const customConstants = {
    applicationId: process.env.NEXT_PUBLIC_CHAT_BOT_AI_APP as string, // Your Sendbird application ID
    botId: process.env.NEXT_PUBLIC_CHAT_BOT_AI_ID as string, // Your Sendbird bot ID
    botNickName: 'KLTN 052024',
    userNickName: 'User',
    betaMark: false,
    suggestedMessageContent: {
      replyContents: [
        {
          title: 'Yes, it was helpful! 👍',
          text: 'Thanks for your feedback! You can also build your own AI chatbot in Sendbird.',
          buttonText: 'Try free trial',
          link: 'https://dashboard.sendbird.com/auth/signup',
        },
        {
          title: 'No, I need more help. 💬',
          text: "I'm sorry, we couldn't help you. Let us know how we can improve by talking to one of our teammates.",
          buttonText: 'Talk to an expert',
          link: 'https://sendbird.com/contact-sales',
        },
      ],
      messageFilterList: [
        'Can you please clarify?',
        'How can I assist you',
        'How can I help you',
        'Can you clarify',
        "That's not a question I can answer unfortunately",
        'Try again',
        "I couldn't find the answer to your question",
        'Can you try again?',
        'I apologize for any confusion',
        "I'm sorry, I couldn't understand your question",
        "That's not a valid question",
        'Is there a specific question you have',
        "I'm here to help you with any questions you have",
      ],
    },
    firstMessageData: [
      {
        data: [
          {
            suggested_replies: [
              'What can I learn from Pre-K 8th grade?',
              'Tell me about Math',
            ],
          },
        ],
        message: "Hi~ I'm KLTN 052024 Support ChatBot. Ask me anything!",
      },
    ],
    createGroupChannelParams: {
      name: 'KLTN 052024 Support Bot',
      coverUrl:
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ix' +
        'lib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    replacementTextList: [['the Text extracts', 'ChatBot Knowledge Base']],
    enableSourceMessage: false,
    enableEmojiFeedback: true,
    enableMention: true,
    enableMobileView: true,
    autoOpen: false,
  };

  return (
    <div>
     <ChatAiWidget
      applicationId={customConstants.applicationId}
      botId={customConstants.botId}
      botNickName={customConstants.botNickName}
      userNickName={customConstants.userNickName}
      betaMark={customConstants.betaMark}
      // customBetaMarkText={customConstants.customBetaMarkText}
      suggestedMessageContent={customConstants.suggestedMessageContent}
      // firstMessageData={customConstants.firstMessageData}
      createGroupChannelParams={customConstants.createGroupChannelParams}
      // chatBottomContent={customConstants.chatBottomContent}
      // messageBottomContent={customConstants.messageBottomContent}
      // replacementTextList={customConstants.replacementTextList}
      enableSourceMessage={customConstants.enableSourceMessage}
      enableEmojiFeedback={customConstants.enableEmojiFeedback}
      enableMention={customConstants.enableMention}
      enableMobileView={customConstants.enableMobileView}
      autoOpen={customConstants.autoOpen}
    />
    </div>
  );
};
