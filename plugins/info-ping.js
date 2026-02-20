import os from 'os'
import process from 'process'
let handler = async (m, {conn}) => {
let start = performance.now()
let end = performance.now()
let platform = os.platform()
let cpuModel = os.cpus()[0].model
let cores = os.cpus().length
let totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
let freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
let usedRam = (totalRam - freeRam).toFixed(2)
let uptime = process.uptime()
let hours = Math.floor(uptime / 3600)
let minutes = Math.floor((uptime % 3600) / 60)
let seconds = Math.floor(uptime % 60)
let caption = `*🚀 PING PERFORMANCE*
- Response Time: ${(end - start).toFixed(4)} ms
- Status: ⚡ Excellent

*💻 SERVER INFO*
- Platform: ${platform}
- Model: ${cpuModel}
- Memory: ${usedRam} GB / ${totalRam} GB
- Core: ${cores}

*🤖 BOT STATUS*
- Uptime: ${hours}h ${minutes}m ${seconds}s
- Performance: Optimal`
await m.reply(caption)
}
handler.command = /^(ping|speed|status)$/i
handler.tags = ['main']
handler.help = ['ping']
export default handler