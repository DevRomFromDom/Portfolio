import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

import categories from "./modules/categories"
import tooltips from "./modules/tooltips"
export default new Vuex.Store({
    modules:{
        categories,
        tooltips
    }
})