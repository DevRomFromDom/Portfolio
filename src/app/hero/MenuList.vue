<template lang="pug">
    nav.menu  
        ul.menu__list
            li.menu__item(v-for="linkObj in menulinks")
                a(:href="'#' + linkObj.link").menu__link.link  {{linkObj.title}} 
 </template>

<script>
export default {
    props: ["menulinks"],
    data() {
        return {};
    },
};
</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
</style>
