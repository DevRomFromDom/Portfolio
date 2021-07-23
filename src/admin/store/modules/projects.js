export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_PROJECT: (state, data) => state.data.push(data),
        GET_PROJECTS: (state, data) => (state.data = data),
        DELETE_PROJECT: (state, id) =>
            (state.data = state.data.filter((el) => el.id !== id)),
        EDIT_PROJECT: (state, project) =>
            (state.data = state.data.map((el) =>
                el.id === project.id ? project : el
            )),
    },
    actions: {
        async getAllProjects({ commit,dispatch }) {
            try {
                const userRes = await this.$axios.get("/user");
                const { data } = await this.$axios.get(
                    `/works/${userRes.data.user.id}`
                );
                commit("GET_PROJECTS", data);
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
        async addNewProject({ commit, dispatch }, project) {
            try {
                const formData = new FormData();
                await Object.keys(project).forEach((item) => {
                    formData.append(item, project[item]);
                });
                const { data } = await this.$axios.post("/works", formData);
                console.log(data);
                commit("ADD_PROJECT", data);
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
        async deleteProject({ commit, dispatch }, id) {
            try {
                const { data } = await this.$axios.delete(`/works/${id}`);
                commit("DELETE_PROJECT", id);
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
        async editProject({ commit, dispatch }, project) {
            try {
                const formData = new FormData();
                await Object.keys(project).forEach((item) => {
                    formData.append(item, project[item]);
                });
                const { data } = await this.$axios.post(
                    `/works/${project.id}`,
                    formData
                );
                commit("EDIT_PROJECT", data.work);
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
