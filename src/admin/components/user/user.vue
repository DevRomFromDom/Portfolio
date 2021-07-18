<template>
  <div class="user-component">
      <avatar size="2.7" :src="getUserAvatar" />
      <div class="username">Каменских Роман</div>
  </div>
</template>

<script>
import avatar from "../avatar/avatar.vue";
export default {
    components:{
        avatar
    },
    computed:{
        getUserAvatar(){
            return require("../../../images/content/user.jpg").default
        }
    }

}
</script>

<style>
.user-component{
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 25px;
    color: #FFFFFF;
    

}
.username{
    margin-left: 18px;
}
</style>