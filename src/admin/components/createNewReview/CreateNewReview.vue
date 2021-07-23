<template>
    <div class="create-review-component">
        <card :title="modalTitle">
            <form
                slot="content"
                class="from-container"
                @submit.prevent="handleSubmit"
            >
                <div class="form-cols">
                    <div class="form-avatar">
                        <div class="avatar-load">
                            <label
                                :style="{
                                    backgroundImage: `url(${bgImage})`,
                                }"
                                :class="[
                                    'uploader',
                                    { active: preview },
                                    { hovered: hovered },
                                    { warn: noPhoto },
                                ]"
                                @dragover="handleDragOver"
                                @dragleave="hovered = false"
                                @drop="handleChange"
                            >
                            </label>
                        </div>
                        <app-button
                            @change="handleChange"
                            plain
                            class="edit-button"
                            typeAttr="file"
                            title="Добавить фото"
                        />
                    </div>
                    <div class="form-review">
                        <div class="form-row">
                            <div class="author-info">
                                <div class="author-name">
                                    <app-input
                                        title="Имя автора"
                                        v-model="review.author"
                                        :errorMessage="
                                            validation.firstError(
                                                'review.author'
                                            )
                                        "
                                        @input="validation.reset()"
                                    />
                                </div>
                                <div class="author-occ">
                                    <app-input
                                        title="Титул автора"
                                        v-model="review.occ"
                                        :errorMessage="
                                            validation.firstError('review.occ')
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <app-input
                                field-type="textarea"
                                title="Отзыв"
                                v-model="review.text"
                                :errorMessage="
                                    validation.firstError('review.text')
                                "
                                @input="validation.reset()"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-buttons">
                    <div class="btn" @click="resetChanges">
                        <app-button title="Отмена" plain />
                    </div>
                    <div class="btn">
                        <app-button title="Сохранить" />
                    </div>
                </div>
            </form>
        </card>
    </div>
</template>

<script>
import card from "../card/card.vue";
import appButton from "../button";
import TagsAdder from "../tagsAdder/tagsAdder.vue";
import appInput from "../input";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
export default {
    mixins: [ValidatorMixin],
    validators: {
        "review.author": (value) => {
            return Validator.value(value).required("Укажите автора");
        },
        "review.occ": (value) => {
            return Validator.value(value).required("Укажите титул автора");
        },
        "review.text": (value) => {
            return Validator.value(value).required("Укажите текст отзыва");
        },
    },
    components: { card, appButton, TagsAdder, appInput },
    props: {
        modalTitle: String,
        editData: Object,
    },
    created() {
        if (this.editData.id !== undefined) {
            this.review = { ...this.editData };
            this.preview = this.editData.photo;
        } else {
            this.review = {
                occ: "",
                author: "",
                text: "",
                photo: {},
            };
        }
    },
    data() {
        return {
            hovered: false,
            review: {},
            preview: "",
            noPhoto: "",
        };
    },
    methods: {
        ...mapActions({
            addNewReviewAction: "reviews/addNewReview",
            editReviewAction: "reviews/editReview",
        }),
        resetChanges(e) {
            e.preventDefault();
            this.$emit("reset");
        },
        handleDragOver(e) {
            e.preventDefault();
            this.hovered = true;
        },
        async handleSubmit(e) {
            e.preventDefault();

            if (
                (await this.$validate()) === false ||
                this.preview.length === 0
            ) {
                this.preview.length === 0
                    ? (this.noPhoto = true)
                    : (this.noPhoto = "");
                return;
            }

            if (this.review.id === undefined) {
                this.addNewReviewAction({
                    author: this.review.author,
                    text: this.review.text,
                    photo: this.review.photo,
                    occ: this.review.occ,
                });
            } else {
                this.editReviewAction({ ...this.review });
            }

            this.$emit("closeModal");
        },
        handleChange(e) {
            e.preventDefault();
            const file = e.dataTransfer
                ? e.dataTransfer.files[0]
                : e.target.files[0];

            this.review.photo = file;
            this.renderPhoto(file);
            this.hovered = false;
        },
        renderPhoto(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.noPhoto = false;
                this.preview = reader.result;
            };
        },
    },
    computed: {
        bgImage() {
            if (typeof this.review.photo === "string") {
                return `https://webdev-api.loftschool.com/${this.review.photo}`;
            } else {
                return `${this.preview}`;
            }
        },
    },
};
</script>

<style lang="postcss" scoped src="./CreateNewReview.pcss"></style>
