<template>
    <div class="tags-adder-component">
        <app-input
            title="Добавление тэга"
            v-model="currentTags"
            @input="$emit('change', currentTags)"
            :errorMessage="valError"
        />
        <ul class="tags">
            <li
                class="tag"
                v-for="(tag, index) in arrOfTags"
                :key="`${tag}${index}`"
            >
                <tag
                    interactive
                    :title="tag.trim()"
                    @click="removeTag(index, tag)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import appInput from "../input/input.vue";
import tag from "../tag/tag.vue";
export default {
    components: {
        appInput,
        tag,
    },
    data() {
        return {
            currentTags: this.tags,
        };
    },
    computed: {
        arrOfTags() {
            return this.currentTags
                .trim()
                .split(",")
                .filter((el) => el.trim().length > 0);
        },
    },
    methods: {
        removeTag(index) {
            const tags = [...this.arrOfTags];
            if (index) {
                console.log(tags, index);
                tags.splice(index, 1);
                this.currentTags = tags.join(", ");
                this.$emit("change", this.currentTags);
            }
        },
    },
    model: {
        prop: "tags",
        event: "change",
    },
    props: {
        tags: {
            type: String,
            default: "",
        },
        valError: String 
    },
};
</script>

<style lang="postcss" scoped>
.tags {
    display: flex;
    margin-top: 20px;
}
.tag {
    margin-right: 10px;
}
</style>
