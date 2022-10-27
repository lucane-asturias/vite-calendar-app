import { defineStore } from 'pinia'
import { seedData } from '../utils/seed.ts'

export const useCalendarStore = defineStore('calendarStore', {
  state: () => ({
    data: seedData 
  }),
  actions: {
    setActiveDay(dayId) {
      // set the intended day’s active property to true and every other day to false
      this.data.map((dayObj) => {
        dayObj.id === dayId ? dayObj.active = true : dayObj.active = false
      })
    },
    submitEvent(eventDetails) {
      const activeDay = this.getActiveDay
      activeDay.events.push({ "details": eventDetails, "edit": false })
    },
    editEvent(dayId, eventDetails) {
      this.resetEditOfAllEvents() // reset all events to the non-edit state prior to toggling the targeted event
      const eventObj = this.getEventObj(dayId, eventDetails)
      eventObj.edit = true
    },
    updateEvent(dayId, originalEventDetails, newEventDetails) {
      const eventObj = this.getEventObj(dayId, originalEventDetails)
      eventObj.details = newEventDetails // assign the new details
      eventObj.edit = false // and revert the display out of the ‘edit’ UI element
    },
    deleteEvent (dayId, eventDetails) {
      const dayObj = this.data.find(
        day => day.id === dayId
      )
      // index of the event to be deleted, based on its event.details
      const eventIndexToRemove = dayObj.events.findIndex(
        event => event.details === eventDetails
      )
      dayObj.events.splice(eventIndexToRemove, 1)
    },
    resetEditOfAllEvents() { // fc to allow editing a single event at a time
      this.data.map((dayObj) => {
        dayObj.events.map((event) => {
          event.edit = false
        })
      })
    }
  },
  getters: {
    getActiveDay: (state) => {
      return state.data.find((day) => day.active)
    },
    getEventObj: (state) => {
      return (dayId: number, eventDetails: string): object => {
        // Filter state data, based on day.id, to get the day the event is being edited
        const dayObj = state.data.find(
          day => day.id === dayId // Find day object
        )
        // Filter the events array of the targeted day, based on event.details, to get the targeted event
        return dayObj.events.find(
          event => event.details === eventDetails // Find the specific event
        )
      }
    } 
  }
})