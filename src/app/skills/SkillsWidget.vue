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
import SkillItem from "./SkillItem.vue";
export default {
    data() {
        return { skills: [] };
    },
    created() {
        this.skills = require("../../data/skills.json");
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
