import axios from 'axios'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan emojinya!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
const {data} = await axios.get(`https://api.nexray.web.id/tools/emojigif?emoji=${encodeURIComponent(text)}`, {responseType: 'arraybuffer'})
await conn.sendMessage(m.chat, {sticker: data, packname: global.stickpack, author: global.stickauth}, {quoted: m})
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.error(err)
m.reply('Gagal membuat sticker emoji!')
}
}
handler.command = /^emojigif$/i
handler.tags = ['tools']
handler.help = ['emojigif 😭']
export default handler