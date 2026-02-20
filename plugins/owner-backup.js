import fs from 'fs'
import {execSync} from 'child_process'
let handler = async (m, {conn, reply}) => {
const sampahDir = './sampah'
if (!fs.existsSync(sampahDir)) fs.mkdirSync(sampahDir)
await conn.sendMessage(m.chat, {react: {text: '🕒', key: m.key}})
try {
for (let f of fs.readdirSync(sampahDir)) {
fs.unlinkSync(`${sampahDir}/${f}`)
}
const zipName = 'backup.zip'
const zipPath = `${sampahDir}/${zipName}`
const exclude = ['node_modules', 'session', 'package-lock.json', 'yarn.lock', '.npm', '.cache']
const files = fs.readdirSync('.').filter(v => !exclude.includes(v))
if (!files.length) return reply('Tidak ada file yang bisa dibackup!')
execSync(`zip -r "${zipPath}" ${files.map(v => `"${v}"`).join(' ')}`)
await conn.sendMessage(m.chat, {document: fs.readFileSync(zipPath), fileName: zipName, mimetype: 'application/zip'}, {quoted: m})
fs.unlinkSync(zipPath)
} catch (e) {
console.error(e)
reply('Backup gagal')
}
}
handler.command = /^(backup|backupsc|bck)$/i
handler.tags = ['owner']
handler.help = ['backup']
handler.owner = true
export default handler