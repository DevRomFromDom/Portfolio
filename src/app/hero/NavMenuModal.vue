<template lang="pug">
    .menu__modal-container
        .menu__modal-block
            .menu__modal-logo
                .modal-logo РК
            .menu-modal
                nav.menu-modal-cross
                    button.cross(@click="$emit('closeModalMenu','false')")
                       a(href="#hero").cross-link
                .menu-modal-links
                    ul.modal-links__menu
                        li.modal__links(v-for="linkObj in menuLinks" @click="$emit('closeModalMenu','false')")
                            a(:href="'#'+linkObj.link").modal-link {{linkObj.title}}
                .menu-modal-socials
                    .insta-icon.modal__social-link
                        a(href="#")
                    .vk-icon.modal__social-link
                        a(href="#")
                    .gihub-icon.modal__social-link
                        a(href="#")
                    .envelope-icon.modal__social-link
                        a(href="#")

</template>

<script>
export default {
    data() {
        return {
            menuLinks: [
                { title: "Главная", link: "hero" },
                { title: "Обо мне", link: "about" },
                { title: "Навыки", link: "skills" },
                { title: "Работы", link: "projects" },
                { title: "Отзывы", link: "reviews" },
            ],
        };
    },
};
</script>

<style></style>
