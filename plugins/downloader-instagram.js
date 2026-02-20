import axios from 'axios'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan link instagram!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
const {data} = await axios.get('https://api.nexray.web.id/downloader/v2/instagram', {params: {url: text}})
if (!data.status) {
return m.reply('Gagal mengambil data!')
}
const res = data.result
const caption = `*🎀 INSTAGRAM DOWNLOAD*

✦ Judul: ${res.title}
✦ Author: ${res.username}`
if (res.media && res.media.length > 0) {
for (let media of res.media) {
if (media.type === 'mp4') {
await conn.sendMessage(m.chat, {video: {url: media.url}, caption}, {quoted: m})
}
else {
await conn.sendMessage(m.chat, {image: {url: media.url}, caption}, {quoted: m})
}
}
} else {
m.reply('Media tidak ditemukan!')
}
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.error(err)
m.reply('Terjadi kesalahan saat mengambil data!')
}
}
handler.command = /^(ig|instagram|igdl)$/i
handler.tags = ['downloader']
handler.help = ['ig <link>']
export default handler