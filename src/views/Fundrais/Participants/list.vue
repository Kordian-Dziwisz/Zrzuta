<template>
  <div class="ListOfParticipants">
    <label>Dodaj nowego uczestnika:</label>
    <form @submit.prevent="addNewItem()">
      <b-input
        type="text"
        name="participant"
        placeholder="Nazwa/Imię/Ksywka"
        v-model="newItem.name"
      />
      <b-button type="submit">Dodaj</b-button>
    </form>
    <!-- displaying a list of Participant, create new component to Item bind -->
    <ul>
      <p v-if="list.length==0">Lista jest pusta!</p>
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
      this.list[index].comment = prompt(
        "Edytuj komentarz",
        this.list[index].comment || ""
      );
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
