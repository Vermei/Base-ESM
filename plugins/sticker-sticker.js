import {downloadContentFromMessage} from '@whiskeysockets/baileys'
import {Sticker, StickerTypes} from 'wa-sticker-formatter'
async function downloadMedia(message, type) {
const stream = await downloadContentFromMessage(message, type)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
let handler = async (m, {conn, reply}) => {
try {
let message = m.message
let quoted = null
if (message?.extendedTextMessage?.contextInfo?.quotedMessage) {
quoted = message.extendedTextMessage.contextInfo.quotedMessage
}
let targetMessage = quoted || message
if (!targetMessage)
return reply('Kirim atau balas media dengan caption .s!')
let type = Object.keys(targetMessage)[0]
if (!['imageMessage', 'videoMessage'].includes(type))
return reply('Kirim atau balas media dengan caption .s!')
let mediaMessage = targetMessage[type]
if (type === 'videoMessage') {
let seconds = mediaMessage.seconds || 0
if (seconds > 10)
return reply('Video maksimal 10 detik!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
const buffer = await downloadMedia(mediaMessage, type === 'imageMessage' ? 'image' : 'video')
let stickerOptions = {pack: global.stickpack, author: global.stickauth, type: StickerTypes.FULL}
if (type === 'imageMessage') {
stickerOptions.quality = 70
} else {
stickerOptions.quality = 20
stickerOptions.fps = 8
}
const sticker = new Sticker(buffer, stickerOptions)
const stickerBuffer = await sticker.toBuffer()
await conn.sendMessage(m.chat, {sticker: stickerBuffer }, {quoted: m})
await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
} catch (err) {
console.log(err)
reply('Gagal membuat sticker!')
}
}
handler.command = /^(s|sticker)$/i
handler.tags = ['tools']
handler.help = ['s (reply/kirim gambar/video)']
export default handler