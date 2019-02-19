<template>
    <div class="Fundrais">
        <project-info
            :admin="admin"
            v-if="false"
            :projectData="fundraisInfo"
            @data="updateProjectData"
        />
        <list-of-participants
            v-if="true"
            :list="listOfParticipants"
            @list="updateListOfParticipants"
        />
        <list-of-products
            :admin="admin"
            v-if="true"
            :list="listOfProducts"
            @list="updateListOfProducts"
        />
        <list-of-propositions
            :admin="admin"
            v-if="true"
            :list="listOfPropositions"
            @list="updateListOfPropositions"
        />
        <p
            v-if="fundraisInfo.ended == true && fundraisInfo.accountNumber.length>0"
        >Send all to this number: {{fundraisInfo.accountNumber}}</p>
        <button @click="updateDoc" v-if="admin">Save all</button>
    </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from "@/views/Fundrais/info.vue";
import InfoAdmin from "@/views/Fundrais/admin.vue";
import ListOfParticipants from "@/views/Fundrais/Participants/list.vue";
import ParticipantsAdmin from "@/views/Fundrais/Participants/item.admin.vue";
import ListOfProducts from "@/views/Fundrais/Products/list.vue";
import ProductsAdmin from "@/views/Fundrais/Products/admin.vue";
import ListOfPropositions from "@/views/Fundrais/Propositions/list.vue";
import PropositionsAdmin from "@/views/Fundrais/Propositions/admin.vue";
import firebase from "firebase";

export default {
    data() {
        return {
            docID: "",
            admin: false,
            db: firebase.firestore().collection("Zrzuty"),
            //ProjectInfo elements
            fundraisInfo: {},
            //TODO ListOfParticipants should be a proper arr of obj with Name, Comment, paid, accepted
            listOfParticipants: [],
            listOfProducts: [],
            listOfPropositions: []
        };
    },
    methods: {
        updateProjectData(event) {
            this.fundraisData = { ...event };
            console.log(this.title);
            console.log(this.description);
            console.log(this.endDate);
        },
        updateListOfParticipants(list) {
            this.listOfParticipants = list;
        },
        updateListOfProducts(list) {
            this.listOfProducts = list;
        },
        updateListOfPropositions(list) {
            this.listOfPropositions = list;
            let accept = this.acceptProposition;
            this.listOfPropositions.forEach(item => accept(item));
        },
        acceptProposition(item) {
            if (item.accepted) {
                delete item.creator;
                delete item.likes;
                delete item.dislikes;
                delete item.accepted;
                this.listOfProducts.push(item);
            }
        },
        async getDoc() {
            let tmpDoc = await this.db.get({ source: "default" });
            this.fundraisInfo = tmpDoc.data().fundraisInfo;
            this.listOfParticipants = tmpDoc.data().listOfParticipants;
            this.listOfProducts = tmpDoc.data().listOfProducts;
            this.listOfPropositions = tmpDoc.data().listOfPropositions;
        },
        updateDoc() {
            this.db.set({
                fundraisInfo: this.fundraisInfo,
                listOfParticipants: this.listOfParticipants,
                listOfProducts: this.listOfProducts,
                listOfPropositions: this.listOfPropositions
            });
        },
        authenticate() {}
    },
    mounted() {
        this.docID = this.$route.params.id;
        this.db = this.db.doc(this.docID);
        this.getDoc();
        this.admin = this.fundraisInfo.creator == localStorage.getItem("login");
    },
    components: {
        ProjectInfo,
        ListOfParticipants,
        ListOfProducts,
        ListOfPropositions
    }
};
</script>
<style scoped>
.Fundrais {
    padding-top: 80px;
}
</style>
