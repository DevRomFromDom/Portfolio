<template>
    <div :class="['skillAddLine-comonent', {blocked: blocked}]">
        <div class="title"><app-input noSidePaddings placeholder="   Новый навык" /></div>
        <div class="percent">
            <app-input type="number" min="0" max="100" maxlength="3" />
        </div>
        <div class="button"><round-button type="round" /></div>
    </div>
</template>

<script>
import appInput from "../input/input.vue";
import roundButton from "../button/button.vue";

export default {
    props:{
        blocked: Boolean
    },
    data() {
        return {
           
        }
    },
    components:{
        appInput,
        roundButton
    }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss">

</style>
