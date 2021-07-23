import projectCart from "./projectCart.vue";

export default {
    title: "projectCart",
    components: { projectCart },
};

export const defaultView = () => ({
    components: { projectCart },
    data() {
        return {
            project: {
                techs: "HTML, CSS, Javascript",
                title: "Title",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque quae, dolor voluptates doloremperspiciatis soluta sunt nobis, magnam aspernaturlaboriosam eveniet!",
                link: "http://link.ru",
            },
        };
    },
    template: `
        <project-cart :project="project">
            
        </project-cart>
    `,
});
