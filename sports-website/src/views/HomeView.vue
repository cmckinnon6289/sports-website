<script setup>
import EventService from '@/services/EventService'
import GameRow  from '@/components/GameRow.vue'

import { ref, onMounted } from 'vue';

defineProps({
  division: String
})

let games = false;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const date = new Date()
const dateString = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`

const todaysEvents = ref(null)

onMounted(() => {
  EventService.todaysEvents()
  .then((response) => {
    todaysEvents.value = response.data;
    games = true;
  })
  .catch((error) => {
    console.log(error);
  })
})
</script>

<template>
  <main class="content">
    <h1 class="title">Welcome to the CISAA Sports Database!</h1>
    <p>The Conference of Independent Schools of Ontario Athletic Association, or CISAA, is a sports conference for various private schools located primarily in the southern part of the province of Ontario. The CISAA grew out of the Little Big Four conference (Upper Canada College; St. Andrew's College; Ridley College; and Trinity College School (TCS)). Teams for the 37 schools currently in the CISAA regularly compete in numerous sports against public high schools in the Ontario Federation of Schools Athletic Association (OFSAA) provincial championships.</p>
    <hr>
    <div class="upcoming">
      <h2 class="title is-4">Upcoming games for {{ dateString }}</h2>
      <div id="today-games">
        <table class="table">
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
        <i v-if="!games">No games to display.</i>
      </div>
    </div>
    
  </main>
</template>

<style>
.upcoming {
  text-align: center;
}

.content {
  margin: 1%;
}

#today-games {
  border: 1px solid black;
}
</style>