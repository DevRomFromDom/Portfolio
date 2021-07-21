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
                    :errorMessage="errorText"
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
export default {
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
        onApprove() {
            if (
                this.title.trim() === this.value.trim() &&
                this.value.trim() !== ""
            ) {
                this.editmode = false;
            } else {
                if (this.value.trim() !== "") {
                    this.$emit("approve", this.value);
                    this.title = this.value
                    this.editmode = false;
                } else {
                    this.$emit("approve", this.value);
                }
            }
        },
        noChange(){
            this.editmode = false;
            this.title = this.value
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
