import reviewCart from "./reviewCart.vue";

export default {
    title: "reviewCart",
    components: { reviewCart },
};

export const defaultView = () => ({
    components: { reviewCart },
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
        <reviewCart :project="project">
            
        </reviewCart>
    `,
});
