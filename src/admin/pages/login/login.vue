<template>
    <div class="login-component">
        <div class="auth-container">
            <form class="form" @submit.prevent="handleSubmit">
                <a class="cross" :href="'./'"> </a>
                <div class="header">
                    <div class="title">Авторизация</div>
                </div>
                <div class="content">
                    <div class="inputs">
                        <div class="login">
                            <app-input
                                icon="user"
                                title="Логин"
                                v-model="user.name"
                                :errorMessage="
                                    validation.firstError('user.name')
                                "
                                placeholder="Введите имя пользователя"
                                @input="validation.reset()"
                            />
                        </div>
                        <div class="password">
                            <app-input
                                icon="key"
                                title="Пароль"
                                type="password"
                                v-model="user.password"
                                placeholder="Введите пароль"
                                :errorMessage="
                                    validation.firstError('user.password')
                                "
                                @input="validation.reset()"
                            />
                        </div>
                    </div>
                    <div class="submit-button">
                        <app-button
                            title="Отправить"
                            :disabled="isFormDisable"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import $axios from "../../requests";
import card from "../../components/card/card.vue";
import appInput from "../../components/input/input.vue";
import appButton from "../../components/button/types/defaultBtn";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import { mapActions } from "vuex";

export default {
    mixins: [ValidatorMixin],
    validators: {
        "user.name": (value) => {
            return Validator.value(value).required("Введите имя пользователя");
        },
        "user.password": (value) => {
            return Validator.value(value).required("Введите пароль");
        },
    },
    components: { card, appInput, appButton },
    data() {
        return {
            user: {
                name: "",
                password: "",
            },
            isFormDisable: false,
        };
    },
    methods: {
        ...mapActions({
            showTooltip: "tooltips/show",
        }),
        async handleSubmit() {
            if ((await this.$validate()) === false) return;
            try {
                this.isFormDisable = true;
                const res = await $axios.post("/login", this.user);
                localStorage.setItem("token", res.data.token);
                $axios.defaults.headers[
                    "Authorization"
                ] = `Bearer  ${res.data.token}`;
                this.$router.replace("/");
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error",
                });
            } finally {
                this.isFormDisable = false;
            }
        },
    },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
