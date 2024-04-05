<script setup>
import EventService from '@/services/EventService'
import { ref, onMounted } from 'vue'
import GoogleMap from '../components/GoogleMap.vue';


const props = defineProps({
  id: { required: true }
})
 
const school = ref(null)
 
onMounted(() => {
  EventService.getSchool(props.id)
    .then((response) => {
      school.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
    <div v-if="school" class="content">
        <div class="columns">
            <div class="column">
                <h1 class="title">{{ school.name }}</h1>
                <p>{{ school.description }}</p>
                <p><b>Address: </b>{{ school.location }}</p>
            </div>
            <div class="column">
                <GoogleMap />
            </div>
        </div>
    </div>
    <p v-else>Loading...</p>
</template>