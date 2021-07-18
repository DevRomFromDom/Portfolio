import skillAddLine from "./skillAddLine.vue";
import {action} from "@storybook/addon-actions"

const methods ={
    
}

export default {
    title: "skillAddLine",
    components: { skillAddLine },
};

export const defaultView = () => ({
    components: { skillAddLine },
    data() {
        return {
    
        };
    },
    template: `
        <skillAddLine />
    `,
    methods
});
