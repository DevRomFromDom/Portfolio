import tagsAdder from "./tagsAdder.vue";


export default {
    title: "tagsAdder",
    components: { tagsAdder },
};

export const defaultView = () => ({
    components: { tagsAdder },
    data() {
        return {
            tags:"One, Two, Three"
        };
    },
    template: `
        <div>   
        <pre>{{tags}}</pre>
        <tagsAdder v-model="tags"/>
        </div>
        
    `,
});
