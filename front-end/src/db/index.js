import Dexie from 'dexie'

const db = new Dexie('chattest')
db.version(1).stores({
    messages: '++id, contact, message',
})

export default db
