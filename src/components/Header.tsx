import classNames from 'classnames'
import { useContext } from 'react'
import { SidebarContext } from '../App'

const Header = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_expand, setExpand] = useContext(SidebarContext)!

  return (
    <header
      className={classNames(
        'fixed top-0 w-screen',
        'background border-b border-zinc-500/20',
        'flex justify-between items-center h-16 px-4'
      )}
    >
      <span className='font-bold text-xl'>Cat GPT</span>
      <button
        className='rounded-lg border border-zinc-500/20 p-2 flex justify-center items-center'
        onClick={() => setExpand(true)}
      >
        <span className="icon-[ph--list-bold]" />
      </button>
    </header>
  )
}

export default Header
