import { createStore } from 'vuex'
import ModuleUser from './user'

export default createStore({
  state: {  // 存储所有数据
  },
  getters: {  // 获取state中的内容，但要通过一些计算，放入getters里。只能读取state的信息
  },
  mutations: {  // 对state的修改操作
  },
  actions: {  // 定义对state的各种操作，不能对state进行修改
  },
  modules: {  // 将state进行分割
    user: ModuleUser,
  }
})
