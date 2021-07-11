<template lang="pug">
    .reviews__container 
        .reviews__header 
            .reviews-title Что обо мне говорят
            nav.reviews__nav
                button.review__nav-item(@click="slide('prev')" :class="{dis: sliderViews === slidesChangeOnSlide }") 
                    .review-arrow
                        .review-passed.arrow-review
                button.review__nav-item(@click="slide('next')" :class="{dis: sliderViews >= reviewsLength}") 
                    .review-arrow.next-review
                        .review-next.arrow-revive
        .reviews__content
           swiper(ref="slider" :options="sliderOptions" @slideNextTransitionEnd ="slideNext" @slidePrevTransitionEnd ="slidePrev")    
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
            slidesChangeOnSlide: 2,
            sliderViews: 2,
            sliderOptions: {
                slidesPerView: 2,
                slidesPerGroup: 2   
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
            const slider = this.$refs["slider"].$swiper;
            switch (direction) {
                case "next":
                        slider.slideNext(); 
                    break;
                case "prev":
                        slider.slidePrev();
                    break;
            }
        },
        slideNext(){
            this.sliderViews += this.slidesChangeOnSlide
        },
        slidePrev(){
            this.sliderViews -= this.slidesChangeOnSlide
        }

    },
    created() {
        const reviewsData = require("../../data/previews.json");
        this.reviews = this.requireImgToArray(reviewsData);
        if(window.innerWidth <= 480){
            this.sliderOptions.slidesPerView = 1;
            this.sliderOptions.slidesPerGroup = 1;
            this.slidesChangeOnSlide = 1;
            this.sliderViews = 1;
        } 
    
    },
    computed:{
        reviewsLength(){
            return this.reviews.length
        }
        
    }
};
</script>

<style>
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
@import "swiper/swiper.scss";
</style>
