const OneChatMessage = (props) => {
  const { chatSpeaker, chat } = props;
  return (
    <div className="board-list-items">
      <strong>{chatSpeaker}:</strong> {chat}
    </div>
  );
};

export default OneChatMessage;
