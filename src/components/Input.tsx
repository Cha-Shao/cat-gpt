import classNames from 'classnames'
import {
  RefObject,
  useContext,
  useEffect,
  useState
} from 'react'
import { MessageContext } from '../App'
import messagesModel from '../storage/message'
import { Message } from '../types/message'
import shuffle from '../utils/shuffle'

const Input = ({
  scrollRef
}: {
  scrollRef: RefObject<HTMLDivElement>
  | null
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useContext(MessageContext)!
  const [content, setContent] = useState('')

  const sendMessage = async () => {
    if (!content) return

    const newMessage: Message = {
      id: messages.length
        ? messages[messages.length - 1].id + 1
        : 0,
      content,
      time: new Date().getTime(),
      self: true,
      loading: false
    }
    const newAIMessage: Message = {
      id: messages.length
        ? messages[messages.length - 1].id + 2
        : 1,
      content: (() => {
        let content = '喵'.repeat(
          Math.ceil(Math.random() * 25)
        )
        if (content.length > 20 && Math.random() < 0.1) {
          content += '瞄'
          content = shuffle(content)
        }
        if (content.length === 3)
          content += '？'
        return content
      })(),
      time: new Date().getTime(),
      self: false,
      loading: true
    }
    const newMessages = [...messages, newMessage, newAIMessage]
    await messagesModel.set(newMessage.id, newMessage)
    await messagesModel.set(newAIMessage.id, newAIMessage)
    setMessages(newMessages)
    setContent('')
  }

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [messages, scrollRef])

  return (
    <div className={classNames(
      'fixed bottom-0 w-screen px-2 py-4',
      'bg-gradient-to-t from-[#fafafd] to-transparent'
    )}>
      <div
        className={classNames(
          'relative',
          'mx-auto w-full max-w-2xl',
          'background border border-zinc-500/20 rounded-2xl',
        )}
      >
        <input
          type="text"
          name='content'
          placeholder='开始喵喵喵~'
          value={content}
          onChange={e => {
            const message = e.target.value
            setContent(message)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') sendMessage()
          }}
          className={classNames(
            'bg-transparent h-12 w-full outline-none p-2 pl-4 pr-12'
          )}
          maxLength={200}
        />
        <button
          className={classNames(
            'absolute bottom-2 right-2 background',
            'p-2 border border-zinc-500/20 rounded-lg'
          )}
          onClick={sendMessage}
        >
          <span className="icon-[ph--arrow-elbow-down-left-bold] block" />
        </button>
      </div>
    </div>
  )
}

export default Input
