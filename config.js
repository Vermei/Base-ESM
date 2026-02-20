import {watchFile, unwatchFile} from 'fs'
import chalk from 'chalk'
import {fileURLToPath} from 'url'
global.namebot = 'Astro - Bot'
global.owner = ['6287759156219','48817252646949']
global.prefix = ['.','/','!']
global.stickpack = '「 Astro - Bot 」\n\nPowered by'
global.stickauth ='© Ryzenn ~'
global.premium = ['6287759156219']
global.mess = {wait: '_Tunggu sebentar.._', owner: 'Perintah ini hanya dapat digunakan oleh owner!', admin: 'Perintah ini hanya dapat digunakan oleh admin!', premium: 'Perintah ini hanya untuk user premium!', group: 'Perintah ini hanya dapat digunakan dalam group!', private: 'Perintah ini hanya dapat digunakan di private!'}
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright('Update config.js'))
import(`${file}?update=${Date.now()}`)
})