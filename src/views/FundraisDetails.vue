<template>
    <div class="SecondPage">
        <project-info v-if="false" :projectData="fundraisData" @data="updateProjectData($event)"/>
        <list-of-participants
            v-if="false"
            :list="listOfParticipants"
            @list="updateListOfParticipants($event)"
        />
        <list-of-products v-if="true" :list="listOfProducts" @list="updateListOfProducts"/>
        <list-of-propositions
            v-if="true"
            :list="listOfPropositions"
            @list="updateListOfPropositions($event)"
        />
    </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from "@/components/secondpage/Fundraising.info.vue";
import ListOfParticipants from "@/components/secondpage/Participants.list.vue";
import ListOfProducts from "@/components/secondpage/Products.list.vue";
import ListOfPropositions from "@/components/secondpage/Propositions.list.vue";

export default {
    data() {
        return {
            //ProjectInfo elements
            fundraisData: {
                creator: "Kordian",
                title: "title",
                description: "Poor project",
                creationDate: new Date("December 17, 1995 03:24:00"),
                endDate: new Date("December 17, 1995 03:24:00")
            },
            //TODO ListOfParticipants should be a proper arr of obj with Name, Comment, paid, accepted
            listOfParticipants: [
                {
                    name: "Kordian",
                    comment: "Typical poorly written comment about nothing",
                    accepted: false,
                    paid: false
                }
            ],
            listOfProducts: [
                {
                    number: 1,
                    name: "Pizza",
                    price: 12.4
                }
            ],
            listOfPropositions: [
                {
                    creator: "Kordian",
                    accepted: false,
                    number: 1,
                    name: "Pizza",
                    price: 12.4,
                    likes: ["Adam"],
                    dislikes: ["James"]
                }
            ]
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
        }
    },
    components: {
        ProjectInfo,
        ListOfParticipants,
        ListOfProducts,
        ListOfPropositions
    }
};
</script>
