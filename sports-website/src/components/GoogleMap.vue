<template>
    <div id="googleMap" style="height: 400px;"></div>
</template>
  
<script setup>

import { onMounted, ref } from 'vue';

const map = ref(null);
  
onMounted(() => {
    const mapProp = {
        center: new google.maps.LatLng(43.75913, -79.35225),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map.value = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    console.log(map.value)
});
</script>
  