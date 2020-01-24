import storage from 'good-storage'
// *保存搜索结果到localstorage的思路：
//* 1.使用第三方库`good-storage`操作localstorage
//* 2.将query传入 定义key值 storage的最大储存长度
//* 3.定义一个插入元素到数组的逻辑（如果之前没有query 就return 如果有 就删除index元素 插入到第一个  如果当前数组操过最大存储量就prop元素）

// ! storage用法
// import storage from 'good-storage'
//  // localStorage
//  storage.set(key,val)
//  storage.get(key, def)
//  // sessionStorage
//  storage.session.set(key, val)
//  storage.session.get(key, val)

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 8

const insertArray = (arr, val, compare, maxlen) => {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    // 删除之前的记录
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
export const saveSearch = (query) => {
  // 读数据 默认值[]
  let searches = storage.get(SEARCH_KEY, [])
  if (query === '') {
    return
  }
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 保证取到的第一个第一个history是从localstorage里面拿的 而不是写死的[]

export function localstorage () {
  return storage.get(SEARCH_KEY, [])
}

// 定义清空localstorage的方法
export const clearStorage = () => {
  storage.remove(SEARCH_KEY)
  return []
}
