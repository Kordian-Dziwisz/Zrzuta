<template>
    <div class="ListOfParticipants">
        <p v-if="admin">Add a new Participant:</p>
        <input v-if="admin" type="text" v-model="newItem.name" @keypress.enter="addNewItem()">
        <!-- displaying a list of Participant, create new component to Item bind -->
        <ul>
            <p v-if="list.length==0">List is empty</p>
            <li v-for="(item, index) in list" :key="index">
                <item
                    v-if="!admin"
                    :item="{index: index, ...item}"
                    :you="isYour(item.name)"
                    @comment="setComment"
                    @paid="setPaid"
                    @accepted="setAccepted"
                    @remove="removeItem"
                />
                <item-admin
                    v-else
                    :item="{index: index, ...item}"
                    @comment="setComment"
                    @paid="setPaid"
                    @accepted="setAccepted"
                    @remove="removeItem"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import Item from "@/views/Fundrais/Participants/item.vue";
import ItemAdmin from "@/views/Fundrais/Participants/item.admin.vue";

export default {
    props: {
        list: Array,
        admin: Boolean
    },
    data() {
        return {
            //just Object template
            newItem: {
                name: "",
                comment: "",
                accepted: false,
                paid: false
            }
        };
    },
    watch: {
        list() {
            this.$emit("list", this.list);
        }
    },
    methods: {
        addNewItem() {
            if (this.newItem.name.length == 0) {
                alert("name field can't be empty");
            } else {
                this.list.push({ ...this.newItem });
                //reset template, only name is changing
                this.newItem.name = "";
            }
        },
        setComment(index) {
            this.list[index].comment = prompt("set comment!");
        },
        setPaid(index) {
            this.list[index].paid = !this.list[index].paid;
        },
        setAccepted(index) {
            this.list[index].accepted = !this.list[index].accepted;
        },
        removeItem(index) {
            this.list.splice(index, 1);
        },
        isYour(login) {
            return login == localStorage.getItem("login");
        }
    },
    components: {
        Item,
        ItemAdmin
    }
};
</script>
