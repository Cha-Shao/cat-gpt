import {
  set as dbSet,
  get as dbGet,
  update as dbUpdate,
  del as dbDel,
  clear as dbClear,
  entries,
  createStore,
} from 'idb-keyval'
import { Message } from '../types/message'

const messageStore = createStore('CatGPT', 'messages')

const set = async (key: number, message: Message) =>
  await dbSet(key, message, messageStore)

const get = async (key: number) =>
  await dbGet<Message>(key, messageStore)

const update = async (key: number, message: Message) =>
  await dbUpdate(key, () => message, messageStore)

const del = async (key: number) =>
  await dbDel(key, messageStore)

const listAll = async () => {
  const entiresMessage = await entries<number, Message>(messageStore)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return entiresMessage.map(([_key, value]) => value)
}

const clear = async () => {
  await dbClear(messageStore)
}

const messagesModel = {
  set,
  get,
  update,
  del,
  clear,
  listAll
}

export default messagesModel
