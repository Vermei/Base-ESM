import axios from 'axios'
import {Sticker, StickerTypes} from 'wa-sticker-formatter'
let handler = async (m, {conn, text, reply}) => {
try {
let teks = ''
let sender = m.sender
let name = m.pushName || 'Anonim'
if (m.quoted) {
teks = m.quoted.text || m.quoted.caption || ''
sender = m.quoted.sender
name = m.quoted.pushName || 'Anonim'
}
else if (text) {
teks = text
}
if (!teks)
return reply('Masukan teks!')
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
let ppUrl
try {
ppUrl = await conn.profilePictureUrl(sender, 'image')
} catch {
ppUrl = 'https://i.ibb.co/3Fh9V6p/avatar.png'
}
const body = {type: "quote", format: "png", backgroundColor: "#FFFFFF", width: 512, height: 768, scale: 2, messages: [{entities: [], avatar: true, from: {id: 1, name: name, photo: {url: ppUrl}}, text: teks, replyMessage: {}}]}
const res = await axios.post("https://bot.lyo.su/quote/generate", body)
if (!res.data?.result?.image)
throw new Error('Invalid API response')
const buffer = Buffer.from(res.data.result.image, 'base64')
const sticker = new Sticker(buffer, {pack: global.stickpack, author: global.stickauth, type: StickerTypes.FULL, quality: 70})
const stickerBuffer = await sticker.toBuffer()
await conn.sendMessage(m.chat, {sticker: stickerBuffer}, {quoted: m})
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.log(err)
reply('Gagal membuat sticker!')
}
}
handler.command = /^qc$/i
handler.tags = ['sticker']
handler.help = ['qc']
export default handler