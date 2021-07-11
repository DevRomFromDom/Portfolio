import Vue from "vue"
import ReviewsContainer from "../app/reviews/ReviewsContainer.vue"

new Vue({
  el:"#reviews-container",
  template: "<ReviewsContainer/>",
  components: { ReviewsContainer }
})