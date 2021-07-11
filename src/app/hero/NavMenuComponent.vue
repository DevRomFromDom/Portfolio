<template lang="pug">
    nav.menu  
        ul.menu__list
            li.menu__item(v-for="linkName in menuLinks")
                a(href="#").menu__link.link  {{linkName}} 
</template>

<script>
export default {
    data(){
        return {
            menuLinks:["Обо мне","Навыки","Работы","Отзывы"]
        }
    }

}
</script>
