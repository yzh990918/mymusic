/* eslint-disable */
// import {
//     getLyric
// } from 'api/song'
// import {
//     ERR_OK
// } from 'api/config'
// import {
//     Base64
// } from 'js-base64'

// export default class Song {
//     constructor({
//         id,
//         mid,
//         singer,
//         name,
//         album,
//         duration,
//         image,
//         url
//     }) {
//         this.id = id
//         this.mid = mid
//         this.singer = singer
//         this.name = name
//         this.album = album
//         this.duration = duration
//         this.image = image
//         this.url = url
//     }
export default class Song{
  constructor({
    id,
    mid,
    singer,
    name,
    album,//专辑
    duration,//播放时间
    image,
    url
  }){
    this.id= id
    this.mid =mid
    this.singer =singer
    this.name =name
    this.album =album
    this.duration =duration
    this.image =image
    this.url =url
  }
}
/**
 *
 *
 * @export song
 * @param {*} musicData 拿到的歌曲数据
 * @returns 工厂模式处理好的的song url image都是拼接好的字符串
 */
export function createSong(musicData){
  return new Song({
    id: musicData.songid,
    mid:musicData.songmid,
    singer:fillterSinger(musicData.singer),
    name:musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })

}
function fillterSinger(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((item)=>{
    ret.push(item.name)
  })
  return ret.join('/')
}
    // getLyric()  {
    //     if (this.lyric) {
    //         return Promise.resolve(this.lyric)
    //     }

    //     return new Promise((resolve, reject) => {
    //         getLyric(this.mid).then((res) => {
    //             if (res.retcode === ERR_OK) {
    //                 this.lyric = Base64.decode(res.lyric)
    //                 resolve(this.lyric)
    //             } else {
    //                 reject('no lyric')
    //             }
    //         })
    //     })
    // }


// export function createSong(musicData) {
//     return new Song({
//         id: musicData.songid,
//         mid: musicData.songmid,
//         singer: filterSinger(musicData.singer),
//         name: musicData.songname,
//         album: musicData.albumname,
//         duration: musicData.interval,
//         image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
//         url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
//     })
// }

// function filterSinger(singer) {
//     let ret = []
//     if (!singer) {
//         return ''
//     }
//     singer.forEach((s) => {
//         ret.push(s.name)
//     })
//     return ret.join('/')
// }
