let handler = async (m, {conn}) => {
let metadata = await conn.groupMetadata(m.chat)
let members = metadata.participants.map(v => v.id)
if (members.length < 2) {
return m.reply('Member tidak cukup!')
}
let user1 = members[Math.floor(Math.random() * members.length)]
let user2 = members[Math.floor(Math.random() * members.length)]
while (user1 === user2) {
user2 = members[Math.floor(Math.random() * members.length)]
}
let teks = `@${user1.split('@')[0]} ❤️ @${user2.split('@')[0]}

Ciee cocok nih 🥳`
await conn.sendMessage(m.chat, {text: teks,mentions: [user1,user2]}, {quoted:m})
}
handler.command = /^jadian$/i
handler.tags = ['fun']
handler.help = ['jadian']
handler.group = true
export default handler