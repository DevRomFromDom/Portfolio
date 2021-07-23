import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

import categories from "./modules/categories"
import tooltips from "./modules/tooltips"
import projects from "./modules/projects"
import reviews from "./modules/reviews"
export default new Vuex.Store({
    modules:{
        categories,
        tooltips,
        projects,
        reviews
    }
})