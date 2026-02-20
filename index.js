import './config.js'
import chalk from 'chalk'
import{makeWASocket,useMultiFileAuthState,makeCacheableSignalKeyStore,DisconnectReason}from '@whiskeysockets/baileys'
import pino from 'pino'
import{Boom}from '@hapi/boom'
import readline from 'readline'
import{handler}from './handler.js'
const rl=readline.createInterface({input:process.stdin,output:process.stdout})
const question=(text)=>new Promise(resolve=>rl.question(text,resolve))
async function startBot(){const{state,saveCreds}=await useMultiFileAuthState('session')
const sock=makeWASocket({logger:pino({level:'silent'}),auth:{creds:state.creds,keys:makeCacheableSignalKeyStore(state.keys,pino({level:'silent'}))},browser:['Ubuntu','Chrome','20.0.04']})
if(!sock.authState.creds.registered){const phoneNumber=await question('Masukkan nomor WhatsApp (contoh: 628xxx): ')
const code=await sock.requestPairingCode(phoneNumber.trim())
console.log('Kode Pairing:',code)}
sock.ev.on('messages.upsert',async(chatUpdate)=>{const m=chatUpdate.messages[0]
if(!m)return
await handler(sock,m)})
sock.ev.on('connection.update',(update)=>{const{connection,lastDisconnect}=update
if(connection==='close'){const reason=new Boom(lastDisconnect?.error)?.output.statusCode
if(reason!==DisconnectReason.loggedOut)startBot()}
if(connection==='open'){console.log(chalk.green('Menunggu pesan baru...'))}})
sock.ev.on('creds.update',saveCreds)}
startBot()