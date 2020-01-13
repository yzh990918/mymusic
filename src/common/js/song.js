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

export default class Song {
    constructor({
        id,
        // mid,
        singer,
        name,
        album,
        // duration,
        image,
        mv,
        url
        // url
    }) {
        this.id = id
        // this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        // this.duration = duration
        this.image = image
        this.mv=mv,
        this.url =url
        // this.url = url
    }

    // getLyric() {
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
}

export function createSong(music) {
    return new Song({
      id:music.id,
      singer:filterSinger(music.ar),
      name:music.name,
      album:music.al.name,//专辑名
      image: music.al.picUrl,
      mv:music.mv,
      url:`http://neteasemusic.yangxiansheng.top/song/url?id=${music.id}`
    })
}
/**
 *
 *
 * @param {*} singer 歌手
 * @returns 如果出现一首歌曲多个人演唱的情况 map方法返回一个新数组 里面是处理好的name数组 用/隔开
 */
function filterSinger(singer) {
 let name=[]
 name=singer.map((item)=>{
   return item.name
 })
 return name.join('/')
}


export function createRecommendSong(music) {
  return new Song({
    id:music.id,
    singer:filterSinger(music.artists),
    name:music.name,
    album:music.album.name,//专辑名
    image: music.album.picUrl,
    mv:music.mvid,
    url:`http://neteasemusic.yangxiansheng.top/song/url?id=${music.id}`
  })
}
