<template lang="pug">
  div.route-stop
    div.route-stop-name {{ stop_title }}
    div.route-stop-times
      span.time(
        v-for="t in schedule"
        :key="t.time"
        :style="{'color': t.style.color, 'border': t.style.border}"
      ) {{t.label}}
</template>

<script>
let interval = null;
export default {
  name: 'RouteStopElement',
  data() {
    return {
      schedule: [],
    };
  },
  props: {
    stop_title: {
      type: String,
      required: true,
    },
    times: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    let length = 0;
    interval = setInterval(() => {
      if (this.times !== undefined) {
        const now = Date.now();
        const newSchedule = [];
        for (let i = 0; i < this.times.length; i += 1) {
          if (newSchedule.length === 3) break;
          const difference = this.times[i] - now;
          const minutes = Math.floor(difference / 60000);
          if (minutes >= 1 && minutes <= 5) {
            newSchedule.push({
              label: `${minutes}`,
              style: {
                color: '#2DC15F',
                border: '1px solid #2DC15F',
                background: '#2DC15F',
                fontWeight: 'bold',
              },
            });
          }
          if (minutes === 0) {
            newSchedule.push({
              label: '<1',
              style: {
                color: '#EE4D11',
                border: '1px solid #EE4D11',
                background: '#EE4D11',
                fontWeight: 'bold',
              },
            });
          }
          if (minutes > 5) {
            newSchedule.push({
              label: `${minutes}`,
              style: {
                color: '#527BD7',
                border: '1px solid #527BD7',
                fontWeight: 'bold',
                opacity: '.8',
              },
            });
          }
        }
        this.schedule = newSchedule;
        length = 1000;
      }
    }, length);
  },
  destroyed() {
    clearInterval(interval);
  },
};
</script>

<style lang="sass" scoped>
.route-stop-element
  padding: 5px 10px 5px 30px
  height: 40px
  position: relative

  &:hover
    background: #F0F0F0

.route-stop-name
  display: inline-block
  line-height: 40px
  height: 40px
  width: 240px
  overflow: hidden

.route-stop-times
  display: inline-block
  width: 102px
  float: right
  right: 20px
  margin-top: 6px

$time-size: 24px
.time
  display: inline-block
  height: $time-size
  width: $time-size
  text-align: center
  line-height: $time-size
  border-radius: 50%
  font-weight: bold
  font-size: .8rem
  margin: 0 4px
  float: right
  border: 1px solid black

</style>
