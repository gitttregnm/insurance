import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/css.scss";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引用基础组件
import "@/components";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");