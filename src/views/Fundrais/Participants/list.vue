<template>
  <div class="ListOfParticipants">
    <form @submit.prevent="addNewItem()" class="container" v-if="!this.ended">
      <h3>Dodaj nowego uczestnika:</h3>
      <b-form-row>
        <b-col>
          <b-input
            lg="5"
            type="text"
            name="participant"
            placeholder="Nazwa/Imię/Ksywka"
            v-model="newItem.name"
          />
        </b-col>
        <b-button type="submit" class="btn-outline-success btn-light">Dodaj</b-button>
      </b-form-row>
    </form>
    <!-- displaying a list of Participant, create new component to Item bind -->
    <ul class="overflow-auto px-3">
      <p v-if="list.length==0">Jak dotąd nie zapisano żadnego uczestnika, dopisz go w polu powyżej</p>
      <li class="border-bottom w-auto" v-for="(item, index) in list" :key="index">
        <item
          v-if="!admin"
          :item="{index: index, ...item}"
          :you="authenticate(item.name)"
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
    admin: Boolean,
    ended: Boolean
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
  methods: {
    addNewItem() {
      if (this.newItem.name.length == 0) {
        alert("name field can't be empty");
      } else {
        this.list.push({ ...this.newItem });
        //reset template, only name is changing
        this.newItem.name = "";
      }
      this.$emit("list", this.list);
    },
    setComment(index) {
      this.list[index].comment = prompt("Edytuj komentarz", this.list[index].comment || "");
      this.$emit("list", this.list);
    },
    setPaid(index) {
      this.list[index].paid = !this.list[index].paid;
      this.$emit("list", this.list);
    },
    setAccepted(index) {
      this.list[index].accepted = !this.list[index].accepted;
      this.$emit("list", this.list);
    },
    removeItem(index) {
      this.list.splice(index, 1);
      this.$emit("list", this.list);
    },
    authenticate(login) {
      return login == localStorage.getItem("login");
    }
  },
  components: {
    Item,
    ItemAdmin
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  max-height: 15.9rem;
  margin-top: 10px;
  -webkit-overflow-scrolling: touch;
  border-color: #ced4da;
}
</style>
