import Vue from "vue"
import SkillsWidget from "../app/skills/SkillsWidget.vue"
import axios from "axios"

new Vue({
  el:"#skills-widget",
  template: "<SkillsWidget/>",
  components: { SkillsWidget }
})