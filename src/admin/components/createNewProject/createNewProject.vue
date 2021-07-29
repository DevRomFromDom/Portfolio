<template>
    <div class="create-project-component">
        <card :title="modalTitle">
            <form
                slot="content"
                class="from-container"
                @submit.prevent="handleSubmit"
            >
                <div class="form-cols">
                    <div class="form-col">
                        <div class="image-load">
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
                                <div class="uploader-title" v-if="!editData.id">
                                    Перетащите или загрузите для загрузки
                                    изображения
                                </div>
                                <div class="uploader-btn" v-if="!editData.id">
                                    <app-button
                                        typeAttr="file"
                                        @change="handleChange"
                                        :title="
                                            preview === ''
                                                ? 'ЗАГРУЗИТЬ'
                                                : 'ИЗМЕНИТЬ'
                                        "
                                    />
                                </div>
                            </label>
                        </div>
                        <app-button
                            plain
                            class="edit-button"
                            v-if="editData.id"
                            typeAttr="file"
                            @change="handleChange"
                        />
                    </div>
                    <div class="form-col">
                        <div class="form-row">
                            <app-input
                                title="Название"
                                v-model="project.title"
                                :errorMessage="
                                    validation.firstError('project.title')
                                "
                                @input="validation.reset()"
                            />
                        </div>
                        <div class="form-row">
                            <app-input
                                title="Ссылка"
                                v-model="project.link"
                                :errorMessage="
                                    validation.firstError('project.link')
                                "
                                @input="validation.reset()"
                            />
                        </div>
                        <div class="form-row">
                            <app-input
                                field-type="textarea"
                                title="Описание"
                                v-model="project.description"
                                :errorMessage="
                                    validation.firstError('project.description')
                                "
                                @input="validation.reset()"
                            />
                        </div>
                        <div class="form-row">
                            <tags-adder
                                v-model="project.techs"
                                :valError="
                                    validation.firstError('project.techs')
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
        "project.title": (value) => {
            return Validator.value(value).required("Введите название работы");
        },
        "project.link": (value) => {
            return Validator.value(value).required("Укажите ссылку на работу");
        },
        "project.description": (value) => {
            return Validator.value(value).required("Введите описание работы");
        },
        "project.techs": (value) => {
            return Validator.value(value).required("Введите тэги");
        },
    },
    components: { card, appButton, TagsAdder, appInput },
    props: {
        modalTitle: String,
        editData: Object,
    },
    created() {
        if (this.editData.id !== undefined) {
            this.project = { ...this.editData };
        } else {
            this.project = {
                title: "",
                link: "",
                description: "",
                techs: "",
                photo: {},
            };
        }
    },
    data() {
        return {
            hovered: false,
            project: {},
            preview: "",
            noPhoto: "",
        };
    },
    methods: {
        ...mapActions({
            addNewProjectAction: "projects/addNewProject",
            editProjectAction: "projects/editProject",
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

            if (this.project.id === undefined) {
                this.addNewProjectAction({
                    title: this.project.title,
                    techs: this.project.techs,
                    photo: this.project.photo,
                    link: this.project.link,
                    description: this.project.description,
                });
            } else {
                this.editProjectAction(this.project);
            }
            this.$emit("closeModal");
        },
        handleChange(e) {
            e.preventDefault();
            const file = e.dataTransfer
                ? e.dataTransfer.files[0]
                : e.target.files[0];

            this.project.photo = file;

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
            if (typeof this.project.photo === "string") {
                this.preview = this.project.photo;
                return `https://webdev-api.loftschool.com/${this.project.photo}`;
            } else {
                return `${this.preview}`;
            }
        },
    },
};
</script>

<style lang="postcss" scoped src="./createNewProject.pcss"></style>
