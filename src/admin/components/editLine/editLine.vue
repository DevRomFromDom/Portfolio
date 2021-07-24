<template>
    <div class="edit-line-component" :class="{ blocked: blocked }">
        <div class="title" v-if="editmode === false">
            <div class="text">{{ value }}</div>
            <div class="icons">
                <icon symbol="pencil" grayscale @click="editmode = true"></icon>
                <icon grayscale symbol="trash"  @click="$emit('removeCategory')"/>
            </div>
        </div>
        <div v-else class="title">
            <div class="input">
                <app-input
                    placeholder="Название новой группы"
                    :value="value"
                    :errorMessage="validation.firstError('value')"
                    @input="$emit('input', $event)"
                    @keydown.native.enter="onApprove"
                    autofocus="autofocus"
                    no-side-paddings="no-side-paddings"
                ></app-input>
            </div>
            <div class="buttons">
                <div class="button-icon">
                    <icon symbol="tick" @click="onApprove"></icon>
                </div>
                <div class="button-icon">
                    <icon symbol="cross" @click="noChange"></icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
export default {
    mixins:[ValidatorMixin],
    validators:{
        "value": (value)=>{
            return Validator.value(value).required("Поле обязательно для заполнения")
        }
    },
    props: {
        value: {
            type: String,
            default: "",
        },
        errorText: {
            type: String,
            default: "",
        },
        editModeByDefault: Boolean,
        blocked: Boolean,
    },
    data() {
        return {
            editmode: this.editModeByDefault,
            title: this.value,
        };
    },
    methods: {
        async onApprove() {
            if((await this.$validate()) === false) return;
            if (
                this.title.trim() === this.value.trim() &&
                this.value.trim() !== ""
            ) {
                this.editmode = false;
            } else {
                console.log('fgfgfg')
                if (this.value.trim() !== "") {
                    this.$emit("approve", this.value);
                    this.title = this.value
                    this.editmode = false;
                }
            }
        },
        noChange(){
            this.editmode = false;
            this.value = this.title
            this.$emit("noChange")
        }
    },
    components: {
        icon: () => import("components/icon"),
        appInput: () => import("components/input"),
    },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss">

</style>
