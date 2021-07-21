<template>
    <div class="page-content">
        <div class="header">
            <div class="title">Блок "Обо мне"</div>
            <iconed-btn
                v-if="emptyCatIsAdded === false"
                type="iconed"
                @click="showNewCategoryModal"
                title="Добавить группу"
            />
        </div>
        <div class="skills-component">
            <ul class="skills">
                <li class="item" v-if="emptyCatIsAdded">
                    <category
                        @removeCategory="closeEmptyCegory"
                        @approveTitle="approveTitle($event)"
                        empty
                    />
                </li>
                <li
                    class="item"
                    v-for="category in categories"
                    :key="category.id"
                >
                    <category
                        :id="category.id"
                        :title="category.category"
                        :skills="category.skills"
                        :empty="category.id !== undefined ? false : true"
                        @removeCategory="removeCategory($event)"
                        @edit-skill="editSkill($event)"
                        @addNewSkill="addNewSkill($event)"
                        @remove-skill="removeSkill($event)"
                        @approveTitle="approveTitle($event)"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import IconedBtn from "../../components/button/types/iconedBtn";
import category from "../../components/category/category.vue";
import { mapActions, mapState } from "vuex";
export default {
    components: {
        IconedBtn,
        category,
    },
    data() {
        return {
            emptyCatIsAdded: false,
        };
    },
    computed: {
        ...mapState("categories", {
            categories: (state) => state.data,
        }),
    },
    beforeCreate(){
        const token = localStorage.getItem("token") || "";
        if(!token){
            this.$router.replace("/login");
        }
    },
    created() {
        this.getCategoriesAction();
    },
    methods: {
        ...mapActions({
            getCategoriesAction: "categories/getCategories",
            createCategoryAction: "categories/createCategory",
            removeCategoryAction: "categories/removeCategory",
            editCatigoryTitleAction: "categories/editCatigoryTitle",
            createNewSkillAction: "categories/addSkill",
            removeSkillAction: "categories/removeSkill",
            editSkillAction: "categories/editSkill",
        }),
        showNewCategoryModal() {
            this.emptyCatIsAdded = !this.emptyCatIsAdded;
        },
        approveTitle([title, categoryId]) {
            if (categoryId === undefined) {
                this.createCategoryAction(title);
                this.emptyCatIsAdded = !this.emptyCatIsAdded;
            } else {
                this.editCatigoryTitleAction({ title, categoryId });
                this.emptyCatIsAdded = false;
            }
        },
        removeCategory(id) {
            this.removeCategoryAction(id);
        },
        closeEmptyCegory() {
            this.emptyCatIsAdded = !this.emptyCatIsAdded;
        },

        removeSkill([skillId, categoryId]) {
            this.removeSkillAction({ skillId, categoryId });
        },
        addNewSkill([skill, categoryId]) {
            this.createNewSkillAction({
                title: skill.title,
                percent: Number(skill.percent),
                category: Number(categoryId),
            });
        },
        editSkill(event) {
            this.editSkillAction(event);
        },
    },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../../../styles/mixins.pcss";
@import "../../../styles/layout/base.pcss";
</style>
<style lang="postcss" scoped src="./about.pcss"></style>>
