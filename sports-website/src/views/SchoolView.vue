<script setup>
import EventService from '@/services/EventService'
import { ref, onMounted } from 'vue'

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

/*function myMap() {
var mapProp= {
  center:new google.maps.LatLng(43.75913,-79.35225),
  zoom:15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}*/
</script>

<template>
    <div v-if="school" class="content">
        <h1 class="title">{{ school.name }}</h1>
        <p>{{ school.description }}</p>
        <p><b>Address: </b>{{ school.location }}</p>
    </div>
    <p v-else>hello!</p>
</template>