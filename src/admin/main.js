import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueSimpleValidator from "simple-vue-validator";
import $axios from "./requests"
Vue.use(VueSimpleValidator, { mode: "manual" });

store.$axios = $axios;

new Vue({
    el: "#app-root",
    router,
    store,
    render: (h) => h(App),
});
