<template>
    <card slim>
        <edit-line
            slot="title"
            v-model="categoryTitle"
            :editModeByDefault="empty"
            @remove="$emit('removeCategory', id)"
            :errorText="onTitleError"
            @approve="approveTitle([$event, id])"
            @input="changeInput($event)"
        />
        <template slot="content">
            <ul class="skills" v-if="empty === false">
                <li class="item" v-for="item in skills" :key="item.id">
                    <skill
                        :skill="item"
                        @remove="$emit('remove-skill', [$event, id])"
                        @approve="$emit('edit-skill', $event)"
                    />
                </li>
            </ul>
            <div class="buttom-line">
                <skill-add-line
                    :blocked="empty"
                    @addNewSkill="$emit('addNewSkill', [$event, id])"
                    @remove="$emit('removeSkill',[$event,id])"
                />
            </div>
        </template>
    </card>
</template>

<script>
import card from "../card/card.vue";
import EditLine from "../editLine/editLine.vue";
import skill from "../skill/skill.vue";
import skillAddLine from "../skillAddLine/skillAddLine.vue";

export default {
    props: {
        empty: Boolean,
        id: { type: Number },
        title: { type: String, default: "" },
        skills: { type: Array, default: () => [] },
    },
    components: { card, EditLine, skill, skillAddLine },
    data() {
        return {
            categoryTitle: this.title,
            onTitleError: "",
        };
    },
    methods: {
        approveTitle([event, id]) {
            if (event === "") {
                this.onTitleError = "Заполните поле";
            } else {
                this.$emit("approveTitle", [event, id]);
            }
        },
        changeInput(event) {
            this.onTitleError = "";
        },
    },
};
</script>

<style lang="postcss" scoped>
.skills {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.item {
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
}
.buttom-line {
    padding-top: 70px;
    margin-top: auto;
    padding-left: 25%;
}
</style>
