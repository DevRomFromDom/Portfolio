import projects from "./projects.vue";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { state, mutations } from "../../store/modules/projects";

const localVue = createLocalVue();
localVue.use(Vuex);

let store, actions;

beforeEach(() => {
    actions = {
        getProjectsAction: jest.fn(),
        removeProjectAction: jest.fn(),
    };

    store = new Vuex.Store({
        namespaced: true,
        state: { ...state },
        mutations: { ...mutations },
        actions,
    });
});
afterEach(() => {
    store = {};
});

it("Component has been mounted", async () => {
    const wrapper = shallowMount(
        projects,
        { store, localVue },
        {
            propsData: {
                projectModalIsAcrive: false,
                modalTitle: "Добавление работы",
                editProjectData: {},
            },
        }
    );
    expect(wrapper.element).toMatchSnapshot();
});
