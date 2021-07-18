import category from "./category.vue";
import { action } from "@storybook/addon-actions";

const methods = {
    onRemove: action("onRemove"),
    onRemoveSkill: action("onRemoveSkill"),
    onEditSkill: action("onEditSkill"),
};

export default {
    title: "category",
    components: { category },
};

const skills = [
    { id: 0, title: "Css", percent: 80 },
    { id: 1, title: "HTML", percent: 70 },
];
export const defaultView = () => ({
    components: { category },
    data() {
        return {
            title: "Front-end",
            skills,
        };
    },
    template: `
        <category 
        :title="title" 
        :skills="skills" 
        @remove="onRemove" 
        @remove-skill="onRemoveSkill"
        @edit-skill="onEditSkill"
        />
    `,
    methods,
});
