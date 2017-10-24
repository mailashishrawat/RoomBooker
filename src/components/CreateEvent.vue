<template>
  <div class="hello">
    <h1>{{msg}} </h1>
    <h2>Booking Details</h2>
  <div class="container">
    <label>Reason</label>
    <textarea placeholder="Enter booking details" name="desc"  v-model="newEvent.title"></textarea><br>
    All Day <input type="checkbox" v-model="newEvent.allday"> <br>
    <label v-if="!newEvent.allday"> Start Time</label>
    <vue-timepicker v-if="!newEvent.allday" :time-value.sync="newEvent.newStartTime" :minute-interval="30"></vue-timepicker><br>
    <label v-if="!newEvent.allday"> End Time</label>
    <vue-timepicker v-if="!newEvent.allday" :time-value.sync="newEvent.newEndTime" :minute-interval="30"></vue-timepicker><br>
    <button  v-on:click="createnewevent" type="submit">Book Room</button>
  </div>
  </div>
</template>

<script>
// import
import VueTimepicker from "vue2-timepicker";
import moment from "moment";
export default {
  name: "create-event",
  components: { VueTimepicker },
  data() {
    return {
      newEvent: {
        title: "new Booking",
        allday:true,
        newStartTime: moment(),
        newEndTime: moment().add(30, "minute")
      }
    };
  },
  methods: {
      createnewevent: function()
      {
          alert("hi");
      }
  }
};
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
input,vue-timepicker {
  align: left;
  height: 35px;
  margin-top: 10px;
}
</style>
