<script setup>
import {onMounted, ref} from 'vue'
import EventService from '../services/EventService'

const props = defineProps({
    id: {required: true}
})

const event = ref(null)
 
onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
    <main>
        <div id="game" v-if="event">
            <h1 class="title">{{event.awayTeam.name}}</h1>
        </div>
        <p v-else>Loading...</p>
    </main>
</template>

<style></style>