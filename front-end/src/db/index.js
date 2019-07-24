import Dexie from 'dexie'

const db = new Dexie('chattyhaha')
db.version(1).stores({
    messages: '++id, contact, message, user',
})

export default db
