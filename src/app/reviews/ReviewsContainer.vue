<template lang="pug">
    .reviews__container 
        .reviews__header 
            .reviews-title Что обо мне говорят
            nav.reviews__nav
                button.review__nav-item(@click="slide('prev')" :class="{dis:sliderActiveIndex === 0}") 
                    .review-arrow
                        .review-passed.arrow-review
                button.review__nav-item(@click="slide('next')" :class="{dis: sliderIsEnd}") 
                    .review-arrow.next-review
                        .review-next.arrow-revive
        .reviews__content
           swiper(ref="mySlider" :options="sliderOptions" @slideChange="onSlideChange")    
                swiper-slide(v-for="review in reviews" :key="review.id")
                    .review__block-container
                        .quote
                        .review-info
                            .review-text {{review.text}}
                            .review__author 
                                .review-author__avatar
                                    img(:src="review.pic").review-avatar-item
                                .review-author__info 
                                        .review-author-name {{review.name}}
                                        .review-author-job {{review.occ}}
</template>

<script>
import { SwiperSlide, Swiper } from "vue-awesome-swiper";
export default {
    components: {
        SwiperSlide,
        Swiper,
    },
    data() {
        return {
            reviews: [],
            sliderIsEnd:false,
            sliderActiveIndex: 0,
            sliderOptions: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                breakpoints: {
                    480: { 
                        slidesPerView: 2, 
                        slidesPerGroup: 2, 
                    },
                },
            },
        };
    },
    methods: {
        requireImgToArray(data) {
            return data.map((el) => {
                const reqireImage = require(`../../images/content/${el.pic}`)
                    .default;
                el.pic = reqireImage;
                return el;
            });
        },
        slide(direction) {

            switch (direction) {
                case "next":
                    this.getMySwiper.slideNext();
                    break;
                case "prev":
                    this.getMySwiper.slidePrev();
                    break;
            }
        },
        onSlideChange() {
            this.sliderActiveIndex = this.getMySwiper.activeIndex;
            this.sliderIsEnd = this.getMySwiper.isEnd
        },
    },
    created() {
        const reviewsData = require("../../data/previews.json");
        this.reviews = this.requireImgToArray(reviewsData);
    },
    computed: {
        reviewsLength() {
            return this.reviews.length;
        },
        getMySwiper() {
            return this.$refs.mySlider.$swiper;
        },
    },
};
</script>

<style>
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
@import "swiper/swiper.scss";
</style>
