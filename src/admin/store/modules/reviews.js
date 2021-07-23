export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW: (state, data) => state.data.push(data),
        GET_REVIEWS: (state, data) => (state.data = data),
        DELETE_REVIEW: (state, id) =>
            (state.data = state.data.filter((el) => el.id !== id)),
        EDIT_REVIEW: (state, review) =>
            (state.data = state.data.map((el) =>
                el.id === review.id ? review : el
            )),
    },
    actions: {
        async getAllReviews({ commit,dispatch }) {
            try {
                const userRes = await this.$axios.get("/user");
                const { data } = await this.$axios.get(
                    `/reviews/${userRes.data.user.id}`
                );
                commit("GET_REVIEWS", data);
            } catch (error) {
                dispatch(
                    "tooltips/show",
                    {
                        text: error.response.data.error,
                        type: "error",
                    },
                    { root: true }
                );
            }
        },
        async addNewReview({ commit, dispatch }, review) {
            try {
                const formData = new FormData();
                await Object.keys(review).forEach((item) => {
                    formData.append(item, review[item]);
                });
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Добавлен новый проект",
                        type: "Succsess",
                    },
                    { root: true }
                );

            } catch (error) {
                dispatch(
                    "tooltips/show",
                    {
                        text: error.response.data.error,
                        type: "error",
                    },
                    { root: true }
                );
            }
        },
        async deleteReview({ commit, dispatch }, id) {
            try {
                const { data } = await this.$axios.delete(`/reviews/${id}`);
                commit("DELETE_REVIEW", id);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Проект успешно удален",
                        type: "Succsess",
                    },
                    { root: true }
                );
            } catch (error) {
                dispatch(
                    "tooltips/show",
                    {
                        text: error.response.data.error,
                        type: "error",
                    },
                    { root: true }
                );
            }
        },
        async editReview({ commit, dispatch }, review) {
            try {
                const formData = new FormData();
                await Object.keys(review).forEach((item) => {
                    formData.append(item, review[item]);
                });
                const { data } = await this.$axios.post(
                    `/reviews/${review.id}`,
                    formData
                );
                commit("EDIT_REVIEW", data.review);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Проект успешно изменен",
                        type: "Succsess",
                    },
                    { root: true }
                );
            } catch (error) {
                dispatch(
                    "tooltips/show",
                    {
                        text: error.response.data.error,
                        type: "error",
                    },
                    { root: true }
                );
            }
        },
    },
};
