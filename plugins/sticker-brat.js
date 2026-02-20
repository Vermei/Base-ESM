import axios from 'axios'
import {Sticker} from 'wa-sticker-formatter'
let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply('Masukan teks!')
}
await conn.sendMessage(m.chat, {react: {text: '🕒', key:m.key}})
try {
const url = `https://api.hamsoffc.my.id/tools/brat?apikey=HAMS-8959557e8691&text=${encodeURIComponent(text)}`
const res = await axios.get(url, {responseType:'arraybuffer'})
const sticker = new Sticker(res.data, {pack: global.stickpack, author: global.stickauth, quality: 70, type: 'full'})
const buffer = await sticker.toBuffer()
await conn.sendMessage(m.chat, {sticker: buffer}, {quoted:m})
await conn.sendMessage(m.chat, {react: {text: '✅', key:m.key}})
} catch (err) {
console.error (err)
m.reply('Gagal membuat sticker!')
}
}
handler.command = /^(brat)$/i
handler.tags = ['tools']
handler.help = ['brat <teks>']
export default handler