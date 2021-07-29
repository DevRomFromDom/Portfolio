import createNewProject from "./createNewProject.vue";
import { mount } from "@vue/test-utils";


it("CreateNewProject has been mounted", async () => {
    const wrapper = mount(createNewProject, {propsData: {editData: {
        title: "Title",
        link: "link",
        description: "dec",
        techs: "fgf, fgfg, fgfg",
        photo: {},
        id: 123,
    }}});
    expect(wrapper.element).toMatchSnapshot();
});
