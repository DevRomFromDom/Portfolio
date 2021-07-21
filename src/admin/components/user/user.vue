<template>
  <div class="user-component">
      <avatar :size="size" :src="getUserAvatar" />
      <div class="username">Каменских Роман</div>
  </div>
</template>

<script>
import avatar from "../avatar";
export default {
    data(){
        return {
            size : '2.7'
        }
    },
    components:{
        avatar
    },
    computed:{
        getUserAvatar(){
            return require("../../../../src/images/content/user.jpg").default
        }
    },
    created(){
        if(window.innerWidth <= 480){
            this.size = '3.4'

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
    @media screen and (max-width: 480px ) {
      font-size:16px;
      line-height: 22px;
      padding-bottom: 10%;
    }
}
</style>