import * as types from './mutations-type'
// ! import * as types 这里是定义一个types 通过数组的方式取出定义常量作为函数名  关联mutation就是mutations-type的作用
const mutations = {
  // *标准写法
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}
export default mutations
