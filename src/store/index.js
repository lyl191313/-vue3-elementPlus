import { createStore } from 'vuex'

export default createStore({
  state: {
    isCollapse:false,
  },
  mutations: {
    // 菜单栏的折叠
    changeCollapse(state,data){
      state.isCollapse = !state.isCollapse
    },
    
  },
  actions: {
  },
  modules: {
  },
  getters:{
   
  },
  
})
