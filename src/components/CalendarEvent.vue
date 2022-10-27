<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div v-if="!event.edit">
      <span class="has-text-centered details">{{ event.details }}</span> 
      <div class="has-text-centered icons">
        <i class="fa fa-pencil-square edit-icon"
          @click.stop="editEvent(day.id, event.details)"></i> 
        <i class="fa fa-trash-o delete-icon"
          @click.stop="deleteEvent(day.id, event.details)"></i>
      </div>
    </div>
    <div v-if="event.edit">
      <input type="text" :placeholder="event.details" v-model="newEventDetails"/>
      <div class="has-text-centered icons" @click="updateEvent(day.id, event.details, newEventDetails)">
        <i class="fa fa-check"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  
  import { ref, computed } from 'vue'
  import { useCalendarStore } from '../../stores/calendarStore'

  const calendarStore = useCalendarStore()

  const newEventDetails = ref<string>('')

  const props = defineProps(['event', 'day'])

  const getEventBackgroundColor = computed<string>(() => {
    const colors = ['#FF9999', '#85D6FF', '#99FF99', '#CAB4CF']
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    return `background-color: ${randomColor}`
  })

  const editEvent = (dayId: number, eventDetails: string) => {
    calendarStore.editEvent(dayId, eventDetails)
  }

  const updateEvent = (dayId: number, originalEventDetails: string, updatedEventDetails: string) => {
    if (updatedEventDetails === '') updatedEventDetails = originalEventDetails
    calendarStore.updateEvent(dayId, originalEventDetails, updatedEventDetails)
    newEventDetails.value = '' // clear user input upon submit
  }

  const deleteEvent = (dayId: number, eventDetails: string) => {
    calendarStore.deleteEvent(dayId, eventDetails)
  }

</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #FFF;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
