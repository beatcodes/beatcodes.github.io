import { Button, Cascader, Col, Row, Select } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Cascader);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
