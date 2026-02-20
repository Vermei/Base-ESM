import axios from "axios"
const CONFIG={audio:{ext:["mp3","m4a","wav","opus","flac"],q:["best","320k","128k"]},video:{ext:["mp4"],q:["144p","240p","360p","480p","720p","1080p"]}}
const headers={accept:"application/json","content-type":"application/json","user-agent":"Mozilla/5.0 (Android)",referer:"https://ytmp3.gg/"}
const delay=ms=>new Promise(r=>setTimeout(r,ms))
const poll=async(url)=>{const{data}=await axios.get(url,{headers})
if(data.status==="completed")return data
if(data.status==="failed")throw "Convert gagal"
await delay(1500)
return poll(url)}
export async function ytdl(url,format="mp4",quality="720p"){const type=Object.keys(CONFIG).find(k=>CONFIG[k].ext.includes(format))
if(!type)throw "Format tidak didukung"
if(!CONFIG[type].q.includes(quality))throw "Quality tidak valid"
const{data:meta}=await axios.get("https://www.youtube.com/oembed",{params:{url,format:"json"}})
const payload={url,os:"android",output:{type,format,...(type==="video"&&{quality})},...(type==="audio"&&{audio:{bitrate:quality}})}
const req=host=>axios.post(`https://${host}.ytconvert.org/api/download`,payload,{headers})
const{data}=await req("hub").catch(()=>req("api"))
const result=await poll(data.statusUrl)
return{title:meta.title,author:meta.author_name,duration:result.duration,type,format,quality,thumbnail:`https://i.ytimg.com/vi/${meta.thumbnail_url?.split('/vi/')[1]?.split('/')[0]}/hqdefault.jpg`,downloadUrl:result.downloadUrl}}