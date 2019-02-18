<template>
    <div class="fundraises">
        <div id="fundList">
            <div id="hardTitles">
                <h1>Lista aktywnych zbiórek:</h1>
            </div>
            <div v-for="infokey in listInfo" :key="infokey">
                <p>{{infokey.description}}</p>
                <p>Utworzył: {{infokey.madeBy}}</p>
                <p>Stan: {{infokey.paymentStatus}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            listInfo: [
                {
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu leo velit. Etiam sollicitudin arcu turpis, sed placerat mi tincidunt a. Vivamus in lorem pulvinar,ultricies nibh nec, volutpat sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed hendrerit mi non elementum laoreet. Etiam at urna id libero rhoncus semper at quis est. Ut molestie gravida turpis a venenatis. Praesent viverra consectetur ante id efficitur. Sed placerat ex vel neque maximus, at tristique urna egestas. Suspendisse placerat, arcu non tincidunt finibus, augue velit vehicula lacus, id dapibus leo nisi a justo. ",
                    madeBy: "Bartek",
                    paymentStatus: "zapłacone"
                },
                {
                    description: "coscoscos",
                    madeBy: "Adam",
                    paymentStatus: "niezapłacone"
                }
            ]
        };
    },
    methods: {}
};
</script>
<style scoped>
</style>