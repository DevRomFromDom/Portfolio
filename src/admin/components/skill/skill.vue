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
                :errorMessage="validation.firstError('currentSkill.title')"
                @input="validation.reset()"
            />
        </div>
        <div class="percent">
            <app-input
                v-model="currentSkill.percent"
                type="number"
                min="0"
                max="100"
                maxlength="3"
                :errorMessage="validation.firstError('currentSkill.percent')"
                @input="validation.reset()"
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
import icon from "../icon/icon.vue";
import appInput from "../input/input.vue";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
export default {
    mixins:[ValidatorMixin],
    validators:{
        "currentSkill.title":(value)=>{
            return Validator.value(value).required("Заполните поле")
        },
        "currentSkill.percent":(value)=>{
            return Validator.value(value).lessThanOrEqualTo(100,"Не может быть больше 100%").required("Заполните поле")
        },
    },
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
                percent: Number(this.skill.percent),
                category: this.skill.category
            },
            errorInputTitle: "",
            errorInputPersent: "",
        };
    },
    components: {
        icon,
        appInput,
    },
    methods: {
        changeEditMode() {
            this.editMode = !this.editMode;
        },
        async approveSkill(curskill) {
            const title = curskill.title.trim();
            const percent = curskill.percent;
            if(( await this.$validate()) === false) return;
            if (
                title === this.skill.title.trim() &&
                percent === this.skill.percent
            ) {
                this.editMode = false;
                return;
            } 
            this.$emit("approve", curskill);
            this.editMode = false;
            }
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
