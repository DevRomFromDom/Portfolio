import CreateNewReview from "./CreateNewReview.vue";

export default {
    title: "createNewReviwe",
    components: { CreateNewReview },
};

export const defaultView = () => ({
    components: { CreateNewReview },
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
        <CreateNewReview :editData="editData">
        </CreateNewReview>
    `,
});
