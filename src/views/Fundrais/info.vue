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
            {{info.endDate}}
        </p>
        {{endDate}}
        <br>
        {{endTime}}
        <br>
        isEnded: {{info.ended}}
    </div>
</template>
<script>
export default {
    props: {
        info: Object
    }
};
</script>