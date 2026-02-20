let handler = async (m, {reply, command}) => {
if (command === 'self') {
global.selfmode = true
reply('sukses mengubah bot menjadi mode self')
} else if (command === 'public') {
global.selfmode = false
reply('sukses mengubah bot menjadi mode public')
}
}
handler.command = /^(self|public)$/i
handler.owner = true
handler.tags = ['owner']
handler.help = ['self', 'public']
export default handler    