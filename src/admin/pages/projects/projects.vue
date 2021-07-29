<template>
    <div class="page-content">
        <div class="header">
            <div class="title">Блок «Работы»</div>
        </div>
        <div class="projects__content-container">
            <create-new-project
                class="cnp"
                v-if="projectModalIsAcrive"
                :modalTitle="modalTitle"
                @closeModal="closeModal"
                :editData="editProjectData" 
                @reset="resetModal"
            />
            <div class="create-project" v-if="projectModalIsAcrive === false">
                <square-btn
                    class="create-button"
                    type="square"
                    title="Добавить работу"
                    @click="addNewProject"
                />
            </div> 
            <project-cart
                v-for="item in projects"
                :key="item.id"
                :project="item"
                @remove="removeProject($event)"
                @editProject="editProject($event)"
                :modalOpen="projectModalIsAcrive"
                :editCurProject="editProjectData.id === item.id"
            />
        </div>
    </div>
</template>

<script>
import projectCart from "../../components/projectCart";
import squareBtn from "../../components/button";
import CreateNewProject from "../../components/createNewProject/createNewProject.vue";
import { mapActions, mapState } from "vuex";
export default {
   
    computed: {
        ...mapState("projects", { projects: (state) => state.data }),
    },
    data() {
        return {
            projectModalIsAcrive: false,
            modalTitle: "Добавление работы",
            editProjectData: {},
        };
    },
    components: {
        projectCart,
        squareBtn,
        CreateNewProject,
    },
    methods: {
        ...mapActions({
            getProjectsAction: "projects/getAllProjects",
            removeProjectAction: "projects/deleteProject",
        }),
        closeModal() {
            this.projectModalIsAcrive = false;
        },
        addNewProject() {
            this.modalTitle = "Добавление работы";
            this.projectModalIsAcrive = true;
        },
        removeProject(id) {
            if (this.projectModalIsAcrive !== false) return;
            this.removeProjectAction(id);
        },
        editProject(project) {
            if (this.projectModalIsAcrive !== false) return;
            const editProj = project;
            this.editProjectData = editProj;
            this.modalTitle = "Редактирование работы";
            this.projectModalIsAcrive = true;
        },
        resetModal() {
            this.editProjectData = {};
            this.projectModalIsAcrive = false;
        },
    },
    created() {
        this.getProjectsAction();
    },
};
</script>

<style lang="postcss" scoped src="./projects.pcss"></style>
