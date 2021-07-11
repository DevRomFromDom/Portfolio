import Vue from "vue"
import ProjectsContainer from "../app/projects/ProjectsContainer.vue"

new Vue({
  el:"#projects-container",
  template: "<ProjectsContainer/>",
  components: { ProjectsContainer }
})