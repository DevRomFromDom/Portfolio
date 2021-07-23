import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about";
import login from "./pages/login";
import header from "./components/header";
import projects from "./pages/projects";
import reviews from "./pages/reviews";

const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: header,
        },
    },
    {
        path: "/login",
        component: login,
    },
    {
        path: "/projects",
        components: {
            default: projects,
            header: header,
        },
    },
    {
        path:'/reviews',
        components:{
            default: reviews,
            header: header
        }
    }
];

export default new VueRouter({ routes });
