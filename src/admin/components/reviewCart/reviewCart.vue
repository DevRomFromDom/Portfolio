<template>
    <div :class="['review-component', {active: editPreview}]">
        <div class="review-container">
            <card>
                <div class="review-header" slot="title">
                    <div class="review_author-info">
                        <avatar :src="bgImage" class="avatar"/>
                        <div class="author-info">
                            <div class="author_name">{{review.author}}</div>
                            <div class="author_occ">{{review.occ}}</div>
                        </div>
                    </div>
                </div>
                <div class="review-content" slot="content">
                    <div class="main-content" >
                        <div class="content-text">
                           {{review.text}}
                        </div>
                    </div>
    
                    <div :class="['review-buttons', { blocked: modalOpen }]">
                        <div
                            class="edit"
                            @click="$emit('editReview', review)"
                        >
                            <icon title="Править" :grayscale="modalOpen" />
                        </div>
                        <div
                            class="delete"
                            @click="$emit('remove', review.id)"
                        >
                            <icon
                                title="Удалить"
                                symbol="cross"
                                :grayscale="modalOpen"
                            />
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import Avatar from "../avatar";
import Card from "../card/card.vue";
import icon from "../icon";
import tag from "../tag";
export default {
    props: {
        review: {
            text: String,
            occ: String,
            photo: File,
            id: Number,
            author: String
        },
        modalOpen: Boolean,
        editPreview: Boolean
    },
    data() {
        return {
        };
    },
    components: {
        icon,
        tag,
        Card,
        Avatar,
    },
    computed: {
        bgImage() {
            return `https://webdev-api.loftschool.com/${this.review.photo}`;
        },
    },
};
</script>

<style lang="postcss" scoped src="./reviewCart.pcss"></style>
