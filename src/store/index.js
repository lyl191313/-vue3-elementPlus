import { createStore } from 'vuex'

export default createStore({
  state: {
    isCollapse:false,
    breadCrumb:[{ name: "Dashboard", path: "/index" },{ name: "工作台", path: "/workbench" }],
  },
  mutations: {
    // 菜单栏的折叠
    changeCollapse(state,data){
      state.isCollapse = !state.isCollapse
    },
    // 用于面包屑导航
    setBreadCrumb(state,data){
      console.log(1111,data);
      state.breadCrumb = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    test: (state) => {
      return state.test;
  },
  }
})
