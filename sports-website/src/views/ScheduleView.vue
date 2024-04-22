<template>
<div class="upcoming">
      <h2 class="title is-4">Schedule of Games</h2>
      <div class="columns" id="filters">
        <div class="column">
          <div class="select">
            <option value="" disabled selected>Select your option</option>
          </div>
        </div>
      </div>
      <div id="today-games">
        <table v-if="games === 0" class="table">
          <tbody>
            <tr>
              <th>Home</th>
              <th>Away</th>
              <th>Time</th>
              <th>Location</th>
              <th>Notes</th>
            </tr>
            <GameRow v-for="event in todaysEvents" :key="event.id" :game="event"/>
          </tbody>
        </table>
        <i v-else-if="games === -1">No games to display.</i>
        <i v-else-if="games === 1">Loading games... (if this takes longer than 30 seconds, reload the page)</i>
        <mark v-else>Error loading games.</mark>
      </div>
      <b>All times are in 24 hour time.</b>
    </div>
</template>

<script setup>
import EventService from '@/services/EventService'
import GameRow  from '@/components/GameRow.vue'

import { ref, onMounted } from 'vue';

defineProps({
  division: String
})

let games = 1;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const date = new Date()

const todaysEvents = ref(null)
const schools = ref(null);

onMounted(() => {
  EventService.todayAndBeyond()
  .then((response) => {
    if (response.data.code === 'ERR_BAD_REQUEST') {
      games = -1;
    } else {
      todaysEvents.value = response.data;
      games = 0;
    }
  })
  .catch((error) => {
    console.log(error);
    games = -1;
  }),
  EventService.getSchools()
  .then((response) => {
    schools.value = response.data
  })
  .catch((error) => {
    console.log(error);
  })
})
</script>

<style>
.upcoming {
  text-align: center;
}

#today-games {
  border: 1px solid black;
}
</style>