<template>
    <div class="skill-component" v-if="editMode === false">
        <div class="title">{{ skill.title }}</div>
        <div class="percent">{{ skill.percent }}</div>
        <div class="buttons">
            <icon
                grayscale
                symbol="pencil"
                class="btn"
                @click="changeEditMode"
            />
            <icon
                grayscale
                symbol="trash"
                class="btn"
                @click="$emit('remove', skill.id)"
            />
        </div>
    </div>
    <div class="skill-component" v-else>
        <div class="title">
            <app-input
                v-model="currentSkill.title"
                noSidePaddings
                :errorMessage="errorInputTitle"
                @input="changeTitle"
            />
        </div>
        <div class="percent">
            <app-input
                v-model="currentSkill.percent"
                type="number"
                min="0"
                max="100"
                maxlength="3"
                :errorMessage="errorInputPersent"
                @input="changePercent"
            />
        </div>
        <div class="buttons">
            <icon
                symbol="tick"
                class="btn"
                @click="approveSkill(currentSkill)"
            />
            <icon symbol="cross" class="btn" @click="changeEditMode" />
        </div>
    </div>
</template>

<script>
import input from "../input/input.vue";
import icon from "../icon/icon.vue";
import appInput from "../input/input.vue";

export default {
    props: {
        skill: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    data() {
        return {
            editMode: false,
            currentSkill: {
                id: this.skill.id,
                title: this.skill.title,
                percent: this.skill.percent,
            },
            errorInputTitle: "",
            errorInputPersent: "",
        };
    },
    components: {
        icon,
        input,
        appInput,
    },
    methods: {
        changeEditMode() {
            this.editMode = !this.editMode;
        },
        approveSkill(curskill) {
            const title = curskill.title.trim();
            const percent = curskill.percent;
            if (
                title === this.skill.title.trim() &&
                percent === this.skill.percent
            ) {
                this.editMode = false;
                return;
            } else {
                if (title === "") {
                    this.errorInputTitle = "Заполните поле";
                }
                if (percent === "") {
                    this.errorInputPersent = "Заполните поле";
                } else if (title !== "" && percent !== "") {
                    this.$emit("approve", curskill);
                    this.editMode = false;
                }
            }
        },
        changeTitle() {
            this.errorInputTitle = "";
        },
        changePercent() {
            this.errorInputPersent = "";
        },
    },
};
</script>

<style lang="postcss" scoped>
.skill-component {
    display: flex;
    width: 100%;
    align-items: center;
    color: $text-color;
}
.title {
    font-size: 16px;
    flex: 1;
}
.percent {
    margin: 0 30px;
}
.btn {
    margin-right: 22px;
    &:last-child {
        margin-right: 0;
    }
}
.buttons {
    display: flex;
    align-items: center;
}
</style>
