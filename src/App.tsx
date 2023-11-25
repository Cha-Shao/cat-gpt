import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState
} from "react"
import Index from "./components/Index/Index"
import Header from './components/Header.tsx'
import Input from './components/Input.tsx'
import { Message } from "./types/message.ts"
import Sidebar from "./components/Sidebar.tsx"

export const MessageContext = createContext<[
  Message[],
  Dispatch<SetStateAction<Message[]>>
] | null>(null)
export const SidebarContext = createContext<[
  boolean,
  Dispatch<SetStateAction<boolean>>
] | null>(null)

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [])

  return (
    <MessageContext.Provider value={[messages, setMessages]}>
      <SidebarContext.Provider value={[expand, setExpand]}>
        <Header />
        <Sidebar />
      </SidebarContext.Provider>
      <main
        className='max-w-3xl mx-auto h-[calc(100vh-4rem)] overflow-y-scroll px-4 pr-2 mt-16'
      >
        <div ref={scrollRef} className="pb-16">
          <Index />
        </div>
      </main>
      <Input scrollRef={scrollRef} />
    </MessageContext.Provider>
  )
}

export default App
