<template>
  <div class="hello">
    <cancel-dialog ref="canceldialog" v-if="showModal" @cancel="removeEvent" @close="showModal = false" :eventData=selectedevent> Show Modal </cancel-dialog>
  <full-calendar id='calendar' @day-click="dayclick" @testevent="alertValue" ref="calendar" :events="events" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"  :defaultView="config.defaultView"></full-calendar>
  <div id="sidepane">
    Second pane
    <ul id="calevents">
         <li v-for="item of events">
      {{ item.title }} :  {{ formateddate(item)}}
    </li>
      </ul>
  <div  id="createBookingevent">   
<create-event ref="newevent" @ondonebuttonclicked="addnewevent"  :dateclicked="dateclicked"> </create-event>

  </div>
  </div>
  </div>
</template>

<script>
window.jQuery = window.$ = require("jquery");

var path = require("path");
import moment from "moment";
import fullCalendar from "fullcalendar/dist/fullcalendar.js";
import CancelDialog from "./CancelDialog";
import CreateEvent from "./CreateEvent";

export default {
  name: "RoomCalendar",
  components: { CreateEvent, CancelDialog },
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
      showbooking: false,
      showModal: false,
      dateclicked: moment(),
      msg: "Welcome to Calendar",
      selectedevent:"",
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
        weekends: false, // will hide Saturdays and Sundays
        defaultView: "month",
        lang: "en",
        height: "auto",
        width: "100%",
        allDaySlot: false,
        slotEventOverlap: false,
        timeFormat: "HH:mm",
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        }
        /*  eventClick: (event) => {
          this.selected = event;
        },*/
      }
    };
  },
  methods: {
    dayclick(date, jsEvent, view) {
      this.showbooking = !this.showbooking;
      this.dateclicked = date;
    },
    cancelevent()
    {this.events.re},
    formateddate(item) {
      return (
        "Booked on " +
        moment(item.start).format("DD MMM") +
        " from " +
        moment(item.start).format("hh:mm") +
        " to " +
        moment(item.end).format("hh:mm")
      );
      //return `$item.start to $item.end.format("hh:mm:")`;
    },
    refreshEvents() {
      this.$refs.calendar.$emit("refetch-events");
    },
    addnewevent(value) {
    
      var childcreate = this.$refs.newevent;
      var temp = {
        id: this.events.length + 1,
        title: value.title,
        start: moment(
          value.selecteddate +
            " " +
            value.newStartTime.hh +
            ":" +
            value.newStartTime.mm +
            " " +
            value.newStartTime.A
        ),
        end: moment(
          value.selecteddate +
            " " +
            value.newEndTime.hh +
            ":" +
            value.newEndTime.mm +
            " " +
            value.newEndTime.A
        ),
        allDay: value.allDay
      };

      this.events.push(temp);
    },
    removeEvent() {
      this.events.splice(this.selectedevent.id-1,1);
      this.showModal = false;
      
    },

    eventSelected(event, jsEvent, view) {
      //   this.selected = event;
    
      this.selectedevent=event;
      this.showModal = true;
    },

    eventCreated(...test) {
      console.log(test);
    },
    alertValue(value) {
      alert("on parent : " + value);
    }
  },
  mounted: function() {
    /*self.cal = $(self.$el);
    var args = {
      lang: 'en',
      header: {
        left:   'prev,next today',
        center: 'title',
        right:  'month,agendaWeek,agendaDay'
      },
      height: "auto",
      allDaySlot: false,
      slotEventOverlap: false,
      timeFormat: 'HH:mm',
    }*/
    // self.cal.fullCalendar(args);
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
//# sourceURL=settings.vue
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
  border: solid;
  border-color: royalblue;
}
#calendar {
  width: 63%;
  height: 80vh;
  float: left;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-left: 0;
  padding: 10px;
}

a {
  color: #42b983;
}
div {
  background-color: lightblue;
  height: 100%;
  width: 100%;
}
</style>
