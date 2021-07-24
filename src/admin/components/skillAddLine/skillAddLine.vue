<template>
    <div :class="['skillAddLine-comonent', { blocked: blocked }]">
        <div class="title">
            <app-input
                noSidePaddings
                placeholder="   Новый навык"
                v-model="curTitle"
                :errorMessage="validation.firstError('curTitle')"
                @input="validation.reset()"
            />
        </div>
        <div class="percent">
            <app-input
                type="number"
                min="0"
                max="100"
                maxlength="3"
                v-model="curPercent"
                :errorMessage="validation.firstError('curPercent')"
                @input="validation.reset()"
            />
        </div>
        <div class="button">
            <round-btn
                type="round"
                @click="addNewSkill(curTitle, curPercent)"
            />
        </div>
    </div>
</template>

<script>
import appInput from "../input/input.vue";
import roundBtn  from "../button/types/roundBtn/roundBtn.vue";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
    mixins:[ValidatorMixin],
    validators:{
        "curTitle": (value)=>{
            return Validator.value(value).required("Заполните поле");
        },
        "curPercent": (value)=>{
            return Validator.value(value)
            .integer("Должно быть числом")
            .between(0,100, "Не корректное значение")
            .required("Заполните поле")
        }
    },
    props: {
        blocked: Boolean,
    },
    data() {
        return {
            curTitle: "",
            curPercent: "",
        };
    },
    components: {
        appInput,
        roundBtn,
    },
    methods: {
        async addNewSkill(title, percent) {
            if(await this.$validate()=== false) return;
                this.$emit("addNewSkill", { title, percent });
                this.curPercent = "";
                this.curTitle = "";
            }
       
    },
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
