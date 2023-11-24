import { useContext, useEffect } from "react"
import { MessageContext } from "../../App"
import Messages from "./Messages"
import messagesModel from "../../storage/message"

const Index = () => {
  const [messages, setMessages] = useContext(MessageContext)!

  useEffect(() => {
    const getMessages = async () => {
      const messages = await messagesModel.listAll()
      setMessages(messages)
    }
    getMessages()

    return () => setMessages([])
  }, [setMessages])

  return messages.length ? (<>
    <Messages messages={messages} />
  </>) : (
    <div className='w-full max-w-[24rem] pt-64 mx-auto'>
      <div className="mx-6 background border border-zinc-500/20 rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4">欢迎使用Cat GPT</h1>
        <ul className="list-disc pl-4">
          <li>喵喵</li>
          <li>喵喵喵</li>
          <li>喵喵喵~</li>
        </ul>
      </div>
    </div>
  )
}

export default Index
