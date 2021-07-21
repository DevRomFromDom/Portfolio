<template lang="pug">
    .skill-item__container
        .skill__circle-svg 
            svg(viewBox="0 0 100 100").skill__circle-shape
                circle(cx="50" cy="50" r="40").skill__circle.skill__circle_under
                circle(cx="50" cy="50" r="40" ref="colored-circle" stroke="url(#gradient)" transform='rotate(180 50 50)').skill__circle.skill__circle_above
                linearGradient(id="gradient" x1="0%" y1="0%" x2="100%" y2="0")
                    stop(offset="0%" stop-color="#243FE5")
                    stop(offset="100%" stop-color="#0788F2")
        .skill-title {{skillItem.title}}
</template>

<script>
export default {
    mounted(){
        const circle = this.$refs["colored-circle"];
        const dashArray = parseInt(
            getComputedStyle(circle).getPropertyValue("stroke-dasharray")
        
        );
        const percent = (dashArray/100)* (100-this.skillItem.percent);
        circle.style.strokeDashoffset = percent;
    },
    props:["skillObj"],
    data(){
        return {
            skillItem:this.skillObj
        }
    }

}
</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
@import "../../styles/layout/base.pcss";
@import "../../styles/**/*.pcss";
</style>