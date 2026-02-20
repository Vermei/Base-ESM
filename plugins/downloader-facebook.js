import axios from 'axios'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan link facebook!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
const {data} = await axios.get('https://api.nexray.web.id/downloader/facebook', {params: {url: text}})
if (!data.status) {
return m.reply('Gagal mengambil data!')
}
const res = data.result
const caption = `*🔖 FACEBOOK DOWNLOAD*

✦ Judul: ${res.title || '-'}`
const videoUrl = res.video_hd || res.video_sd
if (videoUrl) {
await conn.sendMessage(m.chat, {video: {url: videoUrl}, caption}, {quoted: m})
} else {
m.reply('Video tidak ditemukan!')
}
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.error(err)
m.reply('Terjadi kesalahan saat mengambil data!')
}
}
handler.command = /^(fb|facebook|fbdl)$/i
handler.tags = ['downloader']
handler.help = ['fb <link>']
export default handler