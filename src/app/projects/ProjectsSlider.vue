<template lang="pug">
    .projects__content-slider
        .slider__preview(:data-preview="sliderIndex")
            ul.list-slider 
                li.preview-slider
                    img(:src="item.photo" v-for="(item, index) in arrS" :key="item.index" :class="['preview_img',{prev: prev},{next:next}]")
            .slider__miniature
                .miniature__item(
                    :data-slide="slide.id" 
                    v-for="(slide,index) in miniArr" :key="slide.index"
                    :class="{active: index === 0}"
                )
                    img(:src="slide.photo").preview
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
        prev: false,
        next: false,
    },
    data() {
        return {
            arrS: [],
            block: false,
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
                    this.block = false;
                    
                }, 1200);
            } else {
                this.prev = true;
                this.block = true;
                setTimeout(() => {
                    const a = this.arrS.pop();
                    this.arrS = [a,...this.arrS].flat();
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
        miniArr() {
            const a = [...this.arrS];
            a.push(a[0]);
            a.shift();
            return a;
        },
    },
};
</script>

<style></style>
