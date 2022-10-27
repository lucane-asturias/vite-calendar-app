<template>
  <div id="calendar-week" class="container">
    <div class="columns is-mobile">
      <CalendarDay v-for="day in sharedState.data"
        :key="day.id"
        :day="day" />
    </div>
  </div>
</template>

<script lang="ts" setup>
    
  import { ref } from 'vue'
  import { useCalendarStore } from '../../stores/calendarStore'
  import CalendarDay from './CalendarDay.vue';

  const calendarStore = useCalendarStore()
  
  const sharedState = ref<object>(calendarStore)

</script>

<style lang="scss" scoped>
#calendar-week {
  margin-bottom: 50px;
  .column {
    padding: 0 0 0 0;
  }
}
</style>