<template>
    <div :class="['project-component', {active: editCurProject}]">
        <div class="project-container">
            <div class="project-header">
                <div class="header-tags">
                    <tag
                        v-for="(tag, index) in curTechs"
                        :key="index"
                        :title="tag"
                        class="tag-item"
                    />
                </div>
                <img
                    :src="bgImage"
                    alt="Картинка работы"
                    class="project-image"
                />
            </div>
            <div class="project-content">
                <div class="main-content">
                    <div class="content-title">{{ project.title }}</div>
                    <div class="content-description">
                        {{ project.description }}
                    </div>
                </div>
                <div class="content-link">
                    <a :href="`${project.link}`" class="link">{{
                        project.link
                    }}</a>
                </div>
            </div>
            <div :class="['project-buttons', { blocked: modalOpen }]">
                <div class="edit" @click="$emit('editProject', project)">
                    <icon title="Править" :grayscale="modalOpen" />
                </div>
                <div class="delete" @click="$emit('remove', project.id)">
                    <icon
                        title="Удалить"
                        symbol="cross"
                        :grayscale="modalOpen"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import icon from "../icon";
import tag from "../tag";
export default {
    props: {
        project: {
            techs: String,
            title: String,
            description: String,
            link: String,
            photo: File,
            id: Number,
        },
        modalOpen: Boolean,
        editCurProject: Boolean
    },
    data() {
        return {
        };
    },
    components: {
        icon,
        tag,
    },
    computed: {
        curTechs() {
            return this.project.techs
                .trim()
                .split(",")
                .map((tag) => tag.trim());
        },
        bgImage() {
            return `https://webdev-api.loftschool.com/${this.project.photo}`;
        },
    },
};
</script>

<style lang="postcss" scoped src="./projectCart.pcss"></style>
