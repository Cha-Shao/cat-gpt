import { Message as MessageProps } from '../types/message'
import {
  useContext,
  useEffect,
} from 'react'
import messagesModel from '../storage/message'
import { MessageContext } from '../App'

const MessageSelf = (message: MessageProps) => {
  return (
    <div className="py-2 flex gap-2 items-start flex-row-reverse">
      <div className='rounded-lg px-3 py-2 overflow-hidden bg-[#39c78a] rounded-tr-none text-white'>
        <p className='break-words'>{message.content}</p>
      </div>
      <div className="w-16" />
    </div>
  )
}

const MessageAI = (message: MessageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMessages] = useContext(MessageContext)!

  useEffect(() => {
    if (message.loading) {
      const delayTime = Math.random() * 3e3
      setTimeout(() => {
        const newAIMessage: MessageProps = {
          ...message,
          loading: false
        }
        messagesModel.set(message.id, newAIMessage)
        setMessages(prevMessages =>
          prevMessages.map(thisMessage =>
            thisMessage.id === message.id
              ? newAIMessage
              : thisMessage)
        )
      }, delayTime)
    }
  }, [message, setMessages])

  return (
    <div className="py-2 flex gap-2 items-start">
      <div className='rounded-lg px-3 py-2 overflow-hidden background rounded-tl-none'>
        {message.loading ? (
          <div className='opacity-50'>
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className='w-1.5 h-1.5 bg-black rounded-full inline-block mx-1 animate-pulse' />
            ))}
          </div>
        ) : (
          <p className='break-words'>{message.content}</p>
        )}
      </div>
      <div className="w-16" />
    </div>
  )
}

const Message = (message: MessageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMessages] = useContext(MessageContext)!

  useEffect(() => {
    console.debug('delayTime')
    if (!message.self && message.loading) {
      const delayTime = Math.random() * 4e3
      console.debug(delayTime)
      setTimeout(() => {
        const newAIMessage: MessageProps = {
          ...message,
          loading: false
        }
        messagesModel.set(message.id, newAIMessage)
        setMessages(prevMessages =>
          prevMessages.map(thisMessage =>
            thisMessage.id === message.id
              ? newAIMessage
              : thisMessage)
        )
      }, delayTime);
    }
  }, [message, setMessages])

  return message.self
    ? <MessageSelf {...message} />
    : <MessageAI {...message} />
}

export default Message
