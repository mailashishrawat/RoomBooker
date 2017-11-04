<template>
  <div class="hello">
    <h2>Book room on {{dateclickedformatted}}</h2>
  <div class="container">
    <label>Reason</label>
    <textarea placeholder="Enter booking details" name="desc"  v-model="newEvent.title"></textarea><br>
    All Day <input  v-on:click="onalldayclick" type="checkbox" v-model="newEvent.allDay"> <br>
    <label v-if="!newEvent.allDay">From  </label>
  <vue-timepicker v-if="!newEvent.allDay" :format="config.timeformat" :minute-interval="config.leastcount" v-model="newEvent.newStartTime"></vue-timepicker><br>
    <label v-if="!newEvent.allDay"> To </label>
    <vue-timepicker  v-if="!newEvent.allDay" :format="config.timeformat" :minute-interval="config.leastcount" v-model="newEvent.newEndTime"></vue-timepicker><br>
    <button  v-on:click="createnewevent" type="submit">Book Room</button>
  </div>
  </div>
</template>

<script>
// import
import VueTimepicker from "vue2-timepicker";
import moment from "moment";
window.moment = moment;
export default {
  name: "create-event",
  components: { VueTimepicker },
  data() {
    return {
      config: {
        timeformat: "hh:mm A",
        leastcount: 15
      },

      newEvent: {
        title: "new Booking",
        allDay: false,
        selecteddate: this.dateclickedformatted,
        newStartTime: {
         
          hh: moment().format("hh"),
          mm: moment().format("mm") - moment().format("mm") % 15,
          A: moment().format("A")
        },
        newEndTime: {
          hh: moment()
            .add(30, "minute")
            .format("hh"),
          mm:
            moment()
              .add(30, "minute")
              .format("mm") -
            moment().format("mm") % 15,
          A: moment().format("A")
        }
      }
    };
  },
  props: ["dateclicked"],
  computed: {
    dateclickedformatted: function() {
      return new moment(this.dateclicked).format("DD MMM YYYY");
    }
  },
  methods: {
    createnewevent: function() {

      this.newEvent.selecteddate=this.dateclickedformatted;
this.$emit("ondonebuttonclicked", this.newEvent);
    },
    onalldayclick(event) {
      console.log(event.data);
    },
    greet() {
      alert(this.dateclicked);
    }
  },
  watch: {
    newStartTime: function(newStartTime) {
      console.log("hi");
    }
  }
};
//# sourceURL=settings.vue
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
button {
  margin-top: 20px;
  color: blue;
  height: 35px;
  border: lavender;
}
input,
vue-timepicker {
  align: left;
  height: 35px;
  margin-top: 10px;
}
</style>
