const OneChatMessage = (props) => {
  const { chatSpeaker, chat } = props;
  return (
    <div>
      <strong>{chatSpeaker}:</strong> {chat}
    </div>
  );
};

export default OneChatMessage;
