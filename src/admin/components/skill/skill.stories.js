import skill from "./skill.vue";
import {action} from "@storybook/addon-actions"

const methods ={
    onApprove: action("onApprove"),
    onRemove: action("onRemove")
}

export default {
    title: "skill",
    components: { skill },
};

export const defaultView = () => ({
    components: { skill },
    data() {
        return {
            skillItem: { id: 0, title: "HTML", percent: 85 },
        };
    },
    template: `
        <skill @approve="onApprove" @remove="onRemove":skill="skillItem"/>
    `,
    methods
});
