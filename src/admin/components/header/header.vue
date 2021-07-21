<template>
    <div class="header-component">
        <headline title="Панель администрирования">
            <user />
        </headline>
        <navigation />
    </div>
</template>

<script>
import headline from "../headline/headline.vue";
import user from "../user/user.vue";
import Navigation from "../navigation/navigation.vue";
export default {
    components: {
        headline,
        user,
        Navigation,
    },
    data() {
        return {};
    },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../../../styles/mixins.pcss";
@import "../../../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped></style>
