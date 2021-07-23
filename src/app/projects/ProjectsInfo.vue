<template lang="pug">
  .projects__content-info
    ul.projects-info__tags
        li.project-tag__item(v-for="tag in tags" :key="tags.indexOf(tag)") 
          .tag-text {{tag}}
    .projects-info__text 
      .project__text-title {{currentProject.title}}
      .project__text-content {{currentProject.description}}
    .projects-info__link
      a(:href="currentProject.link").project__link-icon 
      .project__link-text {{currentProject.link}}
</template>

<script>
export default {
    props: ["currentProject"],
    computed: {
        tags() {
            return this.currentProject.techs.split(", ");
        },
    },
};
</script>

<style></style>
