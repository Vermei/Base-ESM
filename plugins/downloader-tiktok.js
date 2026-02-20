import axios from 'axios'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan link tiktok!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
const {data} = await axios.get('https://api.nexray.web.id/downloader/tiktok', {params: {url: text}})
if (!data.status) {
return m.reply('Gagal mengambil data!')
}
const res = data.result
const capt = `*🎥 TIKTOK DOWNLOAD*

✦ Judul: ${res.title}
✦ Author: ${res.author.nickname}
✦ Durasi: ${res.duration}`
if (typeof res.data === 'string') {
const videoUrl = res.data
await conn.sendMessage(m.chat, {video: {url: videoUrl}, caption: capt}, {quoted: m})
}
else if (Array.isArray(res.data)) {
for (let img of res.data) {
await conn.sendMessage(m.chat, {image: {url: img}}, {quoted: m})
}
}
else {
m.reply('Media tidak ditemukan!')
}
} catch (err) {
console.error(err)
m.reply('Terjadi kesalahan saat mengambil data!')
}
}
handler.command = /^(tt|tiktok|ttdl)$/i
handler.tags = ['downloader']
handler.help = ['tt <link>']
export default handler