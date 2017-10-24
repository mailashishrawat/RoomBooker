<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
 
  <div id='calendar'>Calendar </div>
  <div id="sidepane">
    Second pane
    <ul id="calevents">
         <li v-for="item of events">
      {{ item.title }} :  {{ formateddate(item)}}
    </li>
      </ul>

  <div id="createBookingevent">
Create a new event from
<create-event> </create-event>
<span> Start date</span>

  </div>
  </div>
  </div>
</template>

<script>
import $ from "jquery";

var path = require("path");
import moment from "moment";
import fullCalendar from "fullcalendar/dist/fullcalendar.js";
import CreateEvent from "./CreateEvent";

export default {
  name: "RoomCalendar",
  components: { CreateEvent },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    },

    droppable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      msg: "Welcome to Calendar",
  
      items: [
        {
          title: "first event"
        },
        {
          title: "Second event"
        }
      ],
      events: [
        {
          id: 1,
          title: "event1",
          start: moment()
            .hours(12)
            .minutes(0)
        },
        {
          id: 2,
          title: "event2",
          start: moment().add(-1, "days"),
          end: moment().add(1, "days"),
          allDay: true
        },
        {
          id: 3,
          title: "event3",
          start: moment().add(2, "days"),
          end: moment()
            .add(2, "days")
            .add(6, "hours"),
          allDay: false
        }
      ],
      config: {
        eventClick: event => {
          this.selected = event;
        }
      }
    };
  },
  methods: {
    formateddate(item)
    {
      return 'Booked from '+ moment(item.start).format("DD MMM")+ ' from '+moment(item.start).format("hh:mm")+ ' to '+ moment(item.end).format("hh:mm");
      //return `$item.start to $item.end.format("hh:mm:")`;
    },
    refreshEvents() {
      this.$refs.calendar.$emit("refetch-events");
    },

    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },

    eventSelected(event) {
      this.selected = event;
    },

    eventCreated(...test) {
      console.log(test);
    }
  },
  mounted: function() {
    $("#calendar").fullCalendar({
      weekends: false, // will hide Saturdays and Sundays

      lang: "en",
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      height: "auto",
      width: "100%",
      allDaySlot: false,
      slotEventOverlap: false,
      timeFormat: "HH:mm",
      events: this.events,
     dayClick: function(date, jsEvent, view) {
     alert('Clicked on: ' + date.format());
     }
    });
  },
  computed: {
    eventSources() {
      const self = this;
      return [
        {
          events(start, end, timezone, callback) {
            setTimeout(() => {
              callback(self.events.filter(() => Math.random() > 0.5));
            }, 1000);
          }
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~fullcalendar/dist/fullcalendar.css";
h1,
h2 {
  font-weight: normal;
}
#sidepane {
  width: 35%;
  float: right;
  height: 80vh;
overflow: auto;
  border:solid;
  border-color: royalblue
}
#calendar {
  width: 63%;
  height:80vh;
  float:left;
}
ul {
  list-style-type: none;
  padding: 0;
}

li{
  margin-left: 0;
  padding: 10px;
}

a {
  color: #42b983;
}
div{
  background-color: lightblue; 
  height: 100%;
  width: 100%;

}
</style>
