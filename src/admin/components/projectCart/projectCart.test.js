import projectCart from "./projectCart.vue"
import {shallowMount} from '@vue/test-utils'



const wrapper = shallowMount(projectCart, {
    propsData:{
        project:{
            techs: "String",
            title: "String",
            description: "String",
            link: "String",
            photo: {},
            id: 123,
        }
    }
})

it("Active class on project cart", async ()=>{
    await wrapper.setProps({
        editCurProject: true
    })
    expect(wrapper.find(".project-component").classes("active")).toBe(true)
}),
it("Grayscale on buttons then it edit", async()=>{
    await wrapper.setProps({
        modalOpen: true
    })
    expect(wrapper.find(".edit-icon").attributes("grayscale")).toBe('true')
    expect(wrapper.find(".delete-icon").attributes("grayscale")).toBe('true')
})