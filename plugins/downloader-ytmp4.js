import {ytdl} from '../lib/ytdl.js'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan link youtube!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
const args = text.split(' ')
const url = args[0]
const quality = args[1] || '720p'
try {
const res = await ytdl(url, 'mp4', quality)
const caption = `*▶️ YOUTUBE DOWNLOAD*

✦ Judul: ${res.title}
✦ Author: ${res.author}
✦ Durasi: ${res.duration}s`
await conn.sendMessage(m.chat, {video: {url: res.downloadUrl}, caption}, {quoted: m})
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.error(err)
m.reply('Gagal download video!')
}
}
handler.command = /^(ytmp4|ytdl)$/i
handler.tags = ['downloader']
handler.help = ['ytmp4 <link> [quality]']
export default handler