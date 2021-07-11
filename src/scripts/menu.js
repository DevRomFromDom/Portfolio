import Vue from "vue"
import NavMenuComponent from "../app/hero/NavMenuComponent.vue"

new Vue({
  el:"#hero-menu",
  template: "<NavMenuComponent/>",
  components: { NavMenuComponent }
})