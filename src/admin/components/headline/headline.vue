<template>
  <div class="headline-component">
      <div class="container headline-container">
          <slot />
          <div class="title">{{title}}</div>
          <div class="buttons">
              <button type="button" class="btn" @click="logout">Выйти</button>
          </div>
      </div>
  </div>
</template>

<script>
import $axios from "../../requests"
export default {
    props:{
        title: String,
        default: "Панель администрирования"
    },
    methods:{
        async logout(){
            try {
                await $axios.post("/logout")
                this.$router.replace("/login");
                localStorage.removeItem("token")
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

</script>

<style lang="postcss" scoped>
@import "./headline.pcss"
</style>