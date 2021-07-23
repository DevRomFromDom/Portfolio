<template>
    <nav class="navigation-container">
        <div class="container">
            <ul class="list">
                <li
                    v-for="link in links"
                    :class="['item', { active: route === link.alias}]"
                    :key="link.id"
                >
                    <a @click="changePage(link.alias)" class="link">
                        {{ link.title }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { id: 0, title: "Обо мне", alias: "/", active: false },
                { id: 1, title: "Работы", alias: "/projects", active: false },
                { id: 2, title: "Отзывы", alias: "/reviews", active: false },
            ],
            currentLink: "/",
          
        };
    },
    methods: {
        changePage(curlink) {
            if(this.route === curlink) return;
            this.$router.replace(`${curlink}`);
        },
    },
    computed:{
        route(){
            return this.$route.path
        }
    }
};
</script>

<style lang="postcss" scoped>
.list {
    display: flex;
}
.item {
    .link {
        padding: 30px;
        font-size: 16px;
        font-weight: 600;
        display: block;
        text-decoration: none;

        &:hover {
            color: #383bcf;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: #383bcf;
            }
        }
    }
    &.active {
        .link {
            color: #383bcf;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: #383bcf;
            }
        }
    }
}
</style>
