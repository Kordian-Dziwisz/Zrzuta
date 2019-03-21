<template>
  <div class="container">
    <b-row class="row">
      <b-col class="lg-5 align-self-center text-center">{{item.name}}</b-col>
      <b-col class="lg-5 align-self-center text-center">{{item.number}}</b-col>
      <b-col class="lg-3 align-self-center text-right">{{item.price + " zł"}}</b-col>
      <b-col
        class="lg-3 align-self-center text-right"
      >{{item.price.toFixed(2) * item.number + " zł"}}</b-col>
      <!-- <td>
              <b-button size="sm" @click="name">Nazwa</b-button>
            </td>
            <td>
              <b-button size="sm" @click="number">Ilość</b-button>
            </td>
      <b-button size="sm" @click="price">Cena</b-button>-->
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
  // showModal() {
  //   this.$refs.editModal.show();
  // },
  // hideModal() {
  //   this.$refs.editModal.hide();
  // }
  // number(index) {
  //   let tmp = 0;
  //   do {
  //     tmp = parseInt(prompt("Ustaw nową ilość"));
  //   } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
  //   if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
  //     this.list[index].number = tmp;
  //   }
  // },
  // name(index) {
  //   let tmp = "";
  //   do {
  //     tmp = prompt("Ustaw nową nazwę");
  //   } while (tmp == null);
  //   if (tmp != null) {
  //     this.list[index].name = tmp;
  //   }
  // },
  // price(index) {
  //   let tmp = 0;
  //   do {
  //     tmp = parseFloat(prompt("Ustaw nową cenę"));
  //   } while (typeof tmp != "number" || tmp <= 0 || isNaN(tmp));
  //   if (typeof tmp == "number" && tmp > 0 && !isNaN(tmp)) {
  //     this.list[index].price = tmp;
  //   }
  // }
};
</script>
