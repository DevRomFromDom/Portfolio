<template lang="pug">
    .projects__content-slider
        .slider__preview(:data-preview="sliderIndex")
            img(:src="projects[0].photo").preview
            .slider__miniature
                .miniature__item(
                    :data-slide="slide.id" 
                    v-for="slide in projects" :key="slide.id"
                    :class="{active: slide.id === projects[currentIndex].id}"
                )
                    img(:src="slide.photo").preview
        .nav__container
            nav.slider__nav
                button.nav-button(@click="$emit('slide', 'next')")
                    .nav-arrow.next
                        button.slider-next
                button.nav-button(@click="$emit('slide', 'passed')")
                    .nav-arrow.passed
                        button.slider-passed
</template>

<script>
export default {
    props: {
        projects: Array,
        currentIndex: Number,
        sliderIndex: Number,
    },
    methods: {
        slide(direction) {
            this.$emit("slide", direction);
        },
    },
};
</script>

<style></style>
