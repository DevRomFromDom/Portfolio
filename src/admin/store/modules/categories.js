export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        DELETE_CATEGORY: (state, id) =>
            (state.data = state.data.filter((el) => el.id !== id)),
        EDIT_CATEGORY: (state, { title, id }) =>
            (state.data = state.data.map((cat) => {
                if (cat.id === id) {
                    return { ...cat, title: title };
                }
                return cat;
            })),
        ADD_SKILL: (state, data) =>
            (state.data = state.data.map((el) => {
                if (el.id === data.category) {
                    el.skills.push(data);
                }
                return el;
            })),
        DELETE_SKILL: (state, { skillId, categoryId }) =>
            (state.data = state.data.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        skills: category.skills.filter(
                            (skill) => skill.id !== skillId
                        ),
                    };
                }
                return category;
            })),
        EDIT_SKILL: (state, skill) =>
            (state.data = state.data.map((category) => {
                if (category.id === skill.category) {
                    return {
                        ...category,
                        skills: category.skills.map((item) => {
                            if (item.id === skill.id) {
                                return {
                                    ...item,
                                    title: skill.title,
                                    percent: skill.percent,
                                };
                            }
                            return item;
                        }),
                    };
                }
                return category;
            })),
    },
    actions: {
        async getCategories({ commit,dispatch }) {
            try {
                const userData = await this.$axios.get("/user");
                const {data} = await this.$axios.get(
                    `/categories/${userData.data.user.id}`
                );
                commit("SET_CATEGORIES", data);
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
        async createCategory({ dispatch, commit }, title) {
            try {
                const { data } = await this.$axios.post("/categories", {
                    title,
                });
                commit("ADD_CATEGORY", data);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Добавлена новая категория",
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
        async removeCategory({ dispatch, commit }, id) {
            try {
                const res = await this.$axios.delete(`/categories/${id}`);
                console.log(res)
                commit("DELETE_CATEGORY", id);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Категория удалена",
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
        async editCatigoryTitle({ dispatch, commit }, event) {
            try {
                const res = await this.$axios.post(
                    `/categories/${event.categoryId}`,
                    event
                );
                commit("EDIT_CATEGORY", { event });
                dispatch(
                    "tooltips/show",
                    {
                        text: "Название категории изменено",
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
        async addSkill({ dispatch, commit }, skill) {
            try {
                const { data } = await this.$axios.post("/skills", skill);
                commit("ADD_SKILL", data);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Добавлено новое умение",
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
        async removeSkill({ dispatch, commit }, { skillId, categoryId }) {
            try {
                const res = await this.$axios.delete(`/skills/${skillId}`);
                commit("DELETE_SKILL", { skillId, categoryId });
                dispatch(
                    "tooltips/show",
                    {
                        text: "Умение удалено",
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
        async editSkill({ dispatch, commit }, skill) {
            try {
                const res = await this.$axios.post(`/skills/${skill.id}`, {
                    title: skill.title,
                    percent: Number(skill.percent),
                    category: skill.category,
                });
                commit("EDIT_SKILL", skill);
                dispatch(
                    "tooltips/show",
                    {
                        text: "Значения умения обновлены",
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
