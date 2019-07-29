import Dexie from 'dexie'

const db = new Dexie('chattyploo')
db.version(1).stores({
    messages: '++id, receivingUser, sendingUser, messageText',
})

export default db
