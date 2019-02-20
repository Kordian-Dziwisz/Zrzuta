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
            {{returnDate(info.endDate)}}
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
    data() {
        return {
            creationDateString: String,
            endDateString: String
        };
    },
    mounted() {
        this.creationDateString =
            "Zbiórka rozpoczęła się: " +
            this.returnDate(this.info.creationDate);
        this.endDateString =
            "Zbiórka kończy się: " + this.returnDate(this.info.endDate);
    },
    methods: {
        returnDate(timestamp) {
            let tmp = new Date(timestamp.seconds * 1000);
            return `${tmp.getDay}, ${tmp.getDate}-
            ${tmp.getMonth}-${
                tmp.getFullYear
            } o godzinie ${tmp.getHours()}:${tmp.getMinutes()} `;
        }
    }
};
</script>