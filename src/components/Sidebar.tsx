import { useContext, useRef } from "react"
import { MessageContext, SidebarContext } from "../App"
import {
  AnimatePresence,
  motion
} from 'framer-motion'
import messagesModel from "../storage/message"

const Sidebar = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_messages, setMessages] = useContext(MessageContext)!
  const [expand, setExpand] = useContext(SidebarContext)!

  return (
    <AnimatePresence>
      {expand && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed w-screen h-screen top-0 right-0 bg-black/50 z-10 flex justify-end"
          onClick={e => {
            if (e.target === containerRef.current)
              setExpand(false)
          }}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
            transition={{ ease: 'easeInOut' }}
            className="background rounded-l-2xl border border-zinc-500/20 w-4/5 max-w-lg h-full p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-xl">Cat GPT</span>
              <button
                className='rounded-lg border border-zinc-500/20 hover:bg-zinc-500/10 p-2 flex justify-center items-center'
                onClick={() => setExpand(false)}
              >
                <span className="icon-[ph--x-bold]" />
              </button>
            </div>
            <button
              className="py-2 px-4 w-full border border-zinc-500/20 rounded-lg hover:bg-zinc-500/10 flex items-center mb-2"
              onClick={() => {
                messagesModel.clear()
                setMessages([])
                setExpand(false)
              }}
            >
              <span className="icon-[ph--broom-bold] text-xl mr-2" />
              <span>清除聊天记录</span>
            </button>
            <a href="https://github.com/Cha-Shao/cat-gpt">
              <button className="py-2 px-4 w-full border border-zinc-500/20 rounded-lg hover:bg-zinc-500/10 flex items-center mb-2">
                <span className="icon-[ph--github-logo-bold] text-xl mr-2" />
                <span>源代码</span>
              </button>
            </a>
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence >
  )
}

export default Sidebar
