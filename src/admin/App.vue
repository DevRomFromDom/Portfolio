<template>
    <div class="app-container">
        <headline title="Панель администрирования">
            <user />
        </headline>
        <navigation />
        <div class="page-content">
            <div class="header">
                <div class="title">Блок "Обо мне"</div>
                <iconed-btn v-if="emptyCatIsAdded === false"
                    type="iconed"
                    @click="addNewCategory"
                    title="Добавить группу"
                />
            </div>
            <ul class="skills">
                <li
                    class="item"
                    v-for="category in categories"
                    :key="category.id"
                >
                    <category
                        :id="category.id"
                        :title="category.category"
                        :skills="category.skills"
                        :empty="category.id !== undefined ? false : true"
                    />
                </li>
              
            </ul>
        </div>
    </div>
</template>

<script>
import IconedBtn from "./components/button/types/iconedBtn";
import headline from "./components/headline/headline.vue";
import Navigation from "./components/navigation/navigation.vue";
import user from "./components/user/user.vue";
import category from "./components/category/category.vue";
export default {
    components: {
        headline,
        user,
        Navigation,
        IconedBtn,
        category,
    },
    data() {
        return{
            categories: [],
            emptyCatIsAdded: false,
        }
    },
    created() {
        this.categories = require("./data/categories.json");
    },
    methods:{
        addNewCategory(){
            this.categories = [{},...this.categories],
            this.emptyCatIsAdded = !this.emptyCatIsAdded
        }
    }
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>
<style lang="postcss" scoped src="./app.pcss"></style>
