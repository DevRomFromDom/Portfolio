<template>
    <div class="app-container">
        <headline title="Панель администрирования">
            <user />
        </headline>
        <navigation />
        <div class="page-content">
            <div class="header">
                <div class="title">Блок "Обо мне"</div>
                <iconed-btn
                    v-if="emptyCatIsAdded === false"
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
                        :categoryid="category.id"
                        :title="category.category"
                        :skills="category.skills"
                        :empty="category.id !== undefined ? false : true"
                        @approveTitle="approveTitle([$event,categoryid])"
                        @removeCategory="removeCategory($event)"
                        @edit-skill="editSkill($event)"
                        @addNewSkill="addNewSkill($event)"
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
        return {
            categories: [],
            emptyCatIsAdded: false,
        };
    },
    created() {
        this.categories = require("./data/categories.json");
    },
    methods: {
        addNewCategory() {
            (this.categories = [{}, ...this.categories]),
                (this.emptyCatIsAdded = !this.emptyCatIsAdded);
        },
        approveTitle([event, id]) {
            console.log(event, id);
            if (id === undefined) {
                this.categories.splice(0, 1);
                this.categories = [
                    ...this.categories,
                    {
                        id: this.categories.length + 1,
                        category: `${event}`,
                        skills: [],
                    },
                ];
                this.emptyCatIsAdded = false;
            } else {
                this.categories = this.categories.map((cat) => {
                    if (cat.id !== id) {
                        return cat;
                    } else {
                        return { ...cat, category: event };
                    }
                });
            }
        },
        removeCategory(id) {
            console.log(id)
            this.categories = this.categories.filter(el=> el.id !== id);
        },
        editSkill([event, categoryId]) {
            this.categories = this.categories.map((cat) => {
                if (cat.id === categoryId) {
                    const newcatSkills = cat.skills.map((skill) => {
                        if (skill.id === event.id) {
                            return {
                                id: event.id,
                                title: event.title,
                                percent: event.percent,
                            };
                        } else {
                            return skill;
                        }
                    });
                    return { ...cat, skills: newcatSkills };
                } else {
                    return cat;
                }
            });
        },
        addNewSkill([newSkill, categoryid]){
            this.categories = this.categories.map(cat=>{
                if(cat.id === categoryid){
                   const newSkills= cat.skills = [...cat.skills, {id: cat.skills.length + 1, ...newSkill }]
                   return {...cat,skills: newSkills}
                } else { return cat}

            })
        }
    },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>
<style lang="postcss" scoped src="./app.pcss"></style>
