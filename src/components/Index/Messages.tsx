import { Message as MessageProps } from "../../types/message"
import Message from "../Message"

const Messages = ({
  messages
}: {
  messages: MessageProps[]
}) => {
  return (<>
    {messages.map((message, i) => (
      <Message key={i} {...message} />
    ))}
  </>)
}

export default Messages
