<template>
    <div :class="['skillAddLine-comonent', { blocked: blocked }]">
        <div class="title">
            <app-input
                noSidePaddings
                placeholder="   Новый навык"
                v-model="curTitle"
                :errorMessage="errorInputTitle"
                @input="titleChange"
            />
        </div>
        <div class="percent">
            <app-input
                type="number"
                min="0"
                max="100"
                maxlength="3"
                v-model="curPercent"
                :errorMessage="errorInputPersent"
                @input="percentChange"
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

export default {
    props: {
        blocked: Boolean,
    },
    data() {
        return {
            curTitle: "",
            curPercent: "",
            errorInputTitle: "",
            errorInputPersent: "",
        };
    },
    components: {
        appInput,
        roundBtn,
    },
    methods: {
        addNewSkill(title, percent) {
            if (title === "" || percent === "") {
                if (percent === "") {
                    this.errorInputPersent = "Заполните поле";
                }
                if (title === "") {
                    this.errorInputTitle = "Заполните поле";
                }
            } else {
                this.$emit("addNewSkill", { title, percent });
                this.curPercent = "";
                this.curTitle = "";
            }
        },
        titleChange() {
            this.errorInputTitle = "";
        },
        percentChange() {
            this.errorInputPersent = "";
        },
    },
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
