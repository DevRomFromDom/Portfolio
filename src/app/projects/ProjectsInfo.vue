<template lang="pug">
  .projects__content-info
    ul.projects-info__tags
        li.project-tag__item(v-for="tag in tags" :key="tags.indexOf(tag)") 
          .tag-text {{tag}}
    .projects-info__text 
      .project__text-title Сайт школы образования
      .project__text-content Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!
    .projects-info__link
      a(:href="currentProject.link").project__link-icon 
      .project__link-text Посмотреть сайт
</template>

<script>
export default {
    props: ["currentProject"],
    computed: {
        tags() {
            return this.currentProject.skills.split(", ")
        },
    },
};
</script>

<style></style>
