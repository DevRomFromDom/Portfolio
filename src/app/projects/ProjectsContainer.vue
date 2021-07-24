<template lang="pug">
    .projects__content 
        projects-slider(@slide="slide")(:projects="projects" :currentIndex="currentIndex" :sliderIndex="sliderIndex" v-if="projects[0]")
        projects-info(:currentProject ="projects[currentIndex]" v-if="currentProject")
</template>

<script>
import ProjectsSlider from "./ProjectsSlider.vue";
import ProjectsInfo from "./ProjectsInfo.vue";
import $axios from "../../admin/requests";
export default {
    data() {
        return {
            projects: [],
            currentIndex: 0,
            sliderIndex: 1,
        };
    },

    components: {
        ProjectsSlider,
        ProjectsInfo,
    },
    methods: {
        slide(direction) {
            switch (direction) {
                case "next":
                    this.projects.push(this.projects[0]);
                    this.projects.shift();
                    if (this.sliderIndex === this.projects.length) {
                        this.sliderIndex = 1;
                    } else {
                        this.sliderIndex += 1;
                    }

                    break;
                case "passed":
                    this.projects.unshift(
                        this.projects[this.projects.length - 1]
                    );
                    this.projects.pop();
                    if (this.sliderIndex === 1) {
                        this.sliderIndex = this.projects.length;
                    } else {
                        this.sliderIndex -= 1;
                    }

                    break;
            }
        },
    },
    async created() {
        try {
            const token = await localStorage.getItem("token");
            if (token) {
                const res = await $axios.get("/user");
                const { data } = await $axios.get(
                    `/works/${res.data.user.id}`
                );
                this.projects = await data.map((item) => {
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
                    return item;
                });
                return
            }
            const { data } = await $axios.get(
                "https://webdev-api.loftschool.com/works/486"
            );
            this.projects = await data.map((item) => {
                item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
                return item;
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    computed: {
        currentProject() {
            return this.projects[this.currentIndex];
        },
    },
};
</script>

<style></style>
