<template lang="pug">
    .header__menu(@click="changeShowModal")
        menu-list(:menulinks="menuLinks")
        NavMenuModal(v-if="showModal" @closeModalMenu="closeModal")
 </template>

<script>
import MenuList from "./MenuList.vue";
import NavMenuModal from "./NavMenuModal.vue";

export default {
    components: {
        MenuList,
        NavMenuModal,
    },
    data() {
        return {
            menuLinks: [
                { title: "Обо мне", link: "about" },
                { title: "Навыки", link: "skills" },
                { title: "Работы ", link: "projects" },
                { title: "Отзывы", link: "reviews" },
            ],
            showModal: false,
        };
    },
    methods: {
        changeShowModal() {
            if (window.innerWidth <= 768 && this.showModal !== true) {
                this.showModal = !this.showModal;
            }
        },
        closeModal(discripton) {
            this.showModal = discripton;
        },
    },
};
</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
</style>
