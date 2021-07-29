import editLine from "./editLine.vue"
import {mount} from "@vue/test-utils"
import { expect } from "@jest/globals"




it("EditLine has been mounted", async ()=>{
    const wrapper = mount(editLine)
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.find(".edit").trigger("click")
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find(".buttons").exists()).toBe(true)
    await wrapper.find(".noChange").trigger("click")
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find(".icons").exists()).toBe(true)

})