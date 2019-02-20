<template>
    <div class="ProjectInfo">
        <p>Created by: {{info.creator}}</p>
        <p>
            Title:
            {{info.title}}
        </p>
        <p>Desc:
            <br>
            {{info.description}}
        </p>
        <p>
            endDate:
            {{returnEndDate}}
        </p>
        <br>
        isEnded: {{info.ended}}
    </div>
</template>
<script>
export default {
    props: {
        info: Object
    },
    computed: {
        returnEndDate() {
            return new Date(this.info.endDate.seconds * 1000);
        }
    }
};
</script>