<template lang="pug">
    .reviews__container 
        .reviews__header 
            .reviews-title Что обо мне говорят
            nav.reviews__nav
                button.review__nav-item(@click="slide('prev')" :class="{dis:sliderActiveIndex === 0}") 
                    .review-arrow
                        .review-passed.arrow-review
                button.review__nav-item(@click="slide('next')" :class="{dis: sliderIsEnd || disNextButton}") 
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
                                    img(:src="review.photo").review-avatar-item
                                .review-author__info 
                                        .review-author-name {{review.author}}
                                        .review-author-job {{review.occ}}
</template>

<script>
import $axios from "../../admin/requests";
import { SwiperSlide, Swiper } from "vue-awesome-swiper";
export default {
    components: {
        SwiperSlide,
        Swiper,
    },

    data() {
        return {
            reviews: [],
            sliderIsEnd: false,
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
            this.sliderIsEnd = this.getMySwiper.isEnd;
        },
    },
    async created() {
        const token = await localStorage.getItem("token");
        if (token) {
            try {
                const res = await $axios.get("/user");
                const { data } = await $axios.get(
                    `/reviews/${res.data.user.id}`
                );
                this.reviews = await data.map((item) => {
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
                    return item;
                });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            try {
                const { data } = await $axios.get(
                    "https://webdev-api.loftschool.com/reviews/486"
                );
                this.reviews = await data.map((item) => {
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;
                    return item;
                });
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    computed: {
        reviewsLength() {
            return this.reviews.length;
        },
        getMySwiper() {
            return this.$refs.mySlider.$swiper;
        },
        windWidth() {
            return window.innerWidth;
        },
        disNextButton() {
           if(this.reviews.length <= 2 && window.innerWidth > 480){
               return true
           }
           if(this.reviews.length <= 1 & window.innerWidth <= 480){
               return true
           }
           return false
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
