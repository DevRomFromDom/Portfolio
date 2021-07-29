import category from "./category.vue"
import {shallowMount} from "@vue/test-utils"





it("Cayegory has been mounted", async ()=>{
    const wrapper = shallowMount(category, {propsData:{
        id: 1,
        title: "title",
        skills:[{id:1, title: "skill-Title", percent: 25},{id:2, title: "skill-Title", percent: 65},{id:3, title: "skill-Title", percent: 35},]
    }})
    expect(wrapper.element).toMatchSnapshot();
})