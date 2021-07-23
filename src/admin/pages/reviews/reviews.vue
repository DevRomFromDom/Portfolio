<template>
    <div class="page-content">
        <div class="header">
            <div class="title">Блок «Отзывы»</div>
        </div>
        <div class="reviews__content-container">
            <create-new-review
                v-if="reviewModal"
                :editData="editData"
                :modalTitle="modalTitle"
                @closeModal="closeModal"
                @reset="resetModal"
            />
            <div class="create-reviews" v-if="!reviewModal">
                <square-btn
                    type="square"
                    title="Добавить работу"
                    @click="showReviewModal"
                /> 
            </div>
            <review-cart
                v-for="item in reviews"
                :key="item.id"
                :review="item"
                @remove="removeReview($event)"
                @editReview="editReview($event)"
                :modalOpen="reviewModal"
                :editPreview="editData.id === item.id"
            />
        </div>
    </div>
</template>

<script>
import reviewCart from "../../components/reviewCart";
import squareBtn from "../../components/button";
import CreateNewReview from "../../components/CreateNewReview";
import { mapActions, mapState } from "vuex";
export default {
    created() {
        this.getReviewsAction();
    },
    computed: {
        ...mapState("reviews", { reviews: (state) => state.data }),
    },
    data() {
        return {
            editData: {},
            modalTitle: "Новый отзыв",
            reviewModal: false,
        };
    },
    components: {
        reviewCart,
        squareBtn,
        CreateNewReview,
    },
    methods: {
        async showReviewModal() {
            this.modalTitle = "Новый отзыв";
            this.editData = {};
            this.reviewModal = true;
        },
        ...mapActions({
            getReviewsAction: "reviews/getAllReviews",
            removeReviewsAction: "reviews/deleteReview",
        }),
        closeModal() {
            this.reviewModal = false;
            this.editData = {};
        },
        removeReview(id) {
            if (this.reviewModal !== false) return;
            this.removeReviewsAction(id);
        },
        editReview(review) {
            if (this.reviewModal !== false) return;
            this.editData = review;
            this.modalTitle = "Редактирование отзыва";
            this.reviewModal = true;
        },
        resetModal() {
            this.editData = {};
            this.reviewModal = false;
        },
    },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>
