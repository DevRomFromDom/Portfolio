<template lang="pug">
    .projects__content-slider
        .slider__preview(:data-preview="sliderIndex")
            ul.list-slider 
                li.preview-slider
                    img(:src="item.photo" v-for="(item, index) in viewArr" :key="item.index" :class="['preview_img',{prev: prev},{next:next}]")
            .slider-mini__container
                ul.slider__miniature
                    li( class="miniature__item")
                        img(:src="slide.photo" v-for="(slide,index) in viewArr" :key="slide.index" :class="['mini-img',{prev: prev},{next:next},{active: index === 1}]")
        .nav__container
            nav(:class="['slider__nav', {block: block}]")
                button.nav-button(@click="slide('next')")
                    .nav-arrow.next
                        button.slider-next
                button.nav-button(@click="slide('passed')")
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
    data() {
        return {
            arrS: [],
            block: false,
            prev: false,
            next: false,
        };
    },
    methods: {
        slide(direction) {
            if (direction === "next") {
                this.next = true;
                this.block = true;
                setTimeout(() => {
                    this.$emit("slide", direction);
                    const a = this.arrS.splice(0, 1);
                    this.arrS = [this.arrS, ...a].flat();
                    this.next = false;
                    this.block = false;
                }, 1200);
            } else {
                this.prev = true;
                this.block = true;
                setTimeout(() => {
                    const a = this.arrS.pop();
                    this.arrS = [a, ...this.arrS].flat();
                    this.prev = false;
                    this.block = false;
                    this.$emit("slide", direction);
                }, 1000);
            }
        },
    },
    created() {
        this.arrS = [...this.projects];
        const addImg = this.arrS[this.arrS.length - 1];
        this.arrS.pop();
        const arr = [addImg, this.arrS];
        this.arrS = arr.flat();
    },
    computed: {
        viewArr() {
            this.arrS = [...this.projects];
            const addImg = this.arrS[this.arrS.length - 1];
            this.arrS.pop();
            const arr = [addImg, this.arrS];
             
            return arr.flat();
        },
    },
};
</script>

<style></style>
