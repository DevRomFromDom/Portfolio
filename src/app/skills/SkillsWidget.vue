<template lang="pug">
.skills__widget
    .skills__widget-container 
        ul.skills__container(v-for="category in skills" :key="category.id")
            .skill__category
                .category-title {{category.category}}
            ul.skills__row
                li.skill__item(v-for="skill in category.skills" :key="category.skills.id")
                    skill-item(:skillObj="skill")
</template>

<script>
import $axios from "../../admin/requests";
import SkillItem from "./SkillItem.vue";
export default {
    data() {
        return { skills: [] };
    },
    async created() {
        try {
            const token = await localStorage.getItem("token");
            if (token) {
                const res = await $axios.get("/user");
                const {data} = await $axios.get(
                `/categories/${res.data.user.id}`
            );
            this.skills = data
                return
            }
            const {data} = await $axios.get(
                "https://webdev-api.loftschool.com/categories/486"
            );
            this.skills = data
        } catch (e) {
            throw new Error(e);
        }
    },
    components: {
        SkillItem,
    },
};
</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
</style>
