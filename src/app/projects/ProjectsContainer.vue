<template lang="pug">
    .projects__content 
        projects-slider(@slide="slide")(:projects="projects" :currentIndex="currentIndex")
        projects-info(:currentProject ="projects[currentIndex]")
</template>

<script>
import ProjectsSlider from "./ProjectsSlider.vue";
import ProjectsInfo from "./ProjectsInfo.vue";
export default {
    data() {
        return {
            projects: [],
            currentIndex: 0,
        };
    },

    components: {
        ProjectsSlider,
        ProjectsInfo,
    },
    methods: {
        requireImagesToArray(data) {
            return data.map((item) => {
                const requiredImage = require(`../../images/content/${item.photo}`)
                    .default;
                item.photo = requiredImage;
                return item;
            });
        },
        slide(direction) {
            switch (direction) {
                case "next":
                    this.projects.push(this.projects[0])
                    this.projects.shift();
                    break;
                case "passed":
                    this.projects.unshift(this.projects[this.projects.length -1])
                    this.projects.pop();
                    break;
            }
        },
    },
    created() {
        const data = require("../../data/projects.json");
        this.projects = this.requireImagesToArray(data);
    },
    computed: {
        currentProject() {
            return this.projects[this.currentIndex];
        },
    },
};
</script>

<style></style>
