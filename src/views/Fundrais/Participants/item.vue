<template>
  <div class="ParticipantsListItem">
    <span>{{item.index + 1}}: {{item.name}} |</span>
    <span>{{item.comment}} |</span>
    <span v-if="item.paid && authenticate">Zapłacono</span>
    <span v-if="item.accepted && authenticate">Otrzymano</span>
    <div class="control">
      <b-button class="mx-1" @click="setComment" v-if="authenticate">
        <i class="far fa-comment"></i>Komentarz
      </b-button>
      <b-button class="mx-1" @click="setPaid" v-if="authenticate && !item.paid">Zapłaciłem</b-button>
      <b-button class="mx-1" @click="removeItem" v-if="authenticate">Usuń</b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    setComment() {
      this.$emit("comment", this.item.index);
    },
    setPaid() {
      if (this.item.accepted == false) {
        this.$emit("paid", this.item.index);
      }
    },
    removeItem() {
      this.$emit("remove", this.item.index);
    }
  },
  computed: {
    authenticate() {
      return this.item.guid == localStorage.getItem("guid");
    }
  }
};
</script>
