import createNewProject from "./createNewProject.vue";

export default {
    title: "createNewProject",
    components: { createNewProject },
};

export const defaultView = () => ({
    components: { createNewProject },
    props: {
        editData: {
            id: 3434,
            title: "title",
            link: "link",
            techs: "fgfg, fgfg, dfgffg",
            photo: {},
        },
    },
    template: `
        <createNewProject :editData="editData">
        </createNewProject>
    `,
});
