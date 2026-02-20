import axios from 'axios'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan judul lagu!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
const {data} = await axios.get('https://api.ootaizumi.web.id/downloader/youtube/play', {params: {query: text}})
if (!data.status) {
return m.reply('Gagal mengambil data!')
}
const res = data.result
const caption = `*🎵 YOUTUBE PLAY*

✦ Judul: ${res.title}
✦ Author: ${res.author.name}
✦ Durasi: ${res.timestamp}

> Mengirim audio..`
await conn.sendMessage(m.chat, {image: {url: res.thumbnail}, caption}, {quoted: m})
await conn.sendMessage(m.chat, {audio: {url: res.download}, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`}, {quoted: m})
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.error(err)
m.reply('Terjadi kesalahan saat mengambil data!')
}
}
handler.command = /^(play|ytplay)$/i
handler.tags = ['downloader']
handler.help = ['play <judul lagu>']
export default handler