import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import database from './database'

const adapter = new LocalStorage('el-data')
const db = low(adapter)

db
  .defaults(database)
  .write()

export default db
