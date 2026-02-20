let handler = async (m, {conn, prefix}) => {
let readMore = String.fromCharCode(8206).repeat(4001)
let menu = `◤────── ❲ *BOT INFO* ❳
⊜ Name: ${global.namebot}
⊜ Mode: Public
⊜ Prefix: [ . ]
⊜ Platform: Linux
◣───────────··
${readMore}
◤──────「 *OWNER* 」
│ • .restart
│ • .self
│ • .autoblock
│ • .delsesi
│ • .backup
│ • .setppbot
│ • .addplugins
│ • .delplugins
│ • .restart
│ • .enable
│ • .disable
│ • .get
│ • .delppbot
│ • .join <url>
◣────────··✦
◤──────「 *DOWNLOAD* 」
│ • .tiktok
│ • .facebook
│ • .instagram
│ • .play
│ • .mediafire
│ • .spotify
│ • .capcut
│ • .sfile
│ • .pinterest
│ • .ytmp3
│ • .ytmp4
│ • .threads
◣────────··✦
◤──────「 *STICKER* 」
│ • .attp
│ • .brat
│ • .bratvid
│ • .smeme
│ • .sticker
│ • .qc
│ • .wm
│ • .emojimix
◣────────··✦
◤──────「 *TOOLS* 」
│ • .blurface
│ • .hd
│ • .hdvid
│ • .cekresi
│ • .iqc
│ • .ssweb
│ • .ping
│ • .runtime
│ • .removebg
│ • .remini
◣────────··✦`
await conn.sendMessage(m.chat, {text: menu, contextInfo: {externalAdReply: {title: global.namebot, body: '© Simple Bot', thumbnailUrl: 'https://cdn.nekohime.site/file/9d943e76.jpeg', sourceUrl: '', mediaType: 1, renderLargerThumbnail: true}}}, {quoted: m})
}
handler.command = /^(menu|help)$/i
handler.tags = ['main']
handler.help = ['menu', 'help']
export default handler