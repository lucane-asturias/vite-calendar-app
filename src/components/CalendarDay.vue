<template>
  <div class="day column" @click="setActiveDay(day.id)">
    <div class="day-banner has-text-centered">{{ day.abbvTitle }}</div>
    <div class="day-details">
      <div class="day-number">{{ day.id }}</div>
      <CalendarEvent v-for="(event, index) in day.events" 
        :key="index" 
        :event="event" 
        :day="day"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  
  import CalendarEvent from './CalendarEvent.vue';
  import { useCalendarStore } from '../../stores/calendarStore'
  
  const calendarStore = useCalendarStore()

  const props = defineProps({
    day: {
      type: Object,
      required: true
    }
  })

  const setActiveDay = (dayId) => {
    calendarStore.setActiveDay(dayId)
  }

</script>

<style lang="scss" scoped>
.day {
  background-color: #4A4A4A;
  color: #FFF;
  border-left: 1px solid #8F8F8F;
  border-bottom: 1px solid #8F8F8F;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: darken(#4A4A4A,3%);
  }

  .day-banner {
    background-color: #333333;
    color: #FFF;
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: 600;
  }

  .day-details {
    padding: 10px;
  }

  &:last-child {
    border-right: 1px solid #8F8F8F;
  }
}
</style>