<script setup>
import EventService from '@/services/EventService'

const props = defineProps({
    id: {
        required: true
    }
})

const school = EventService.getSchool(props.id);
</script>

<template>
    <div class="content">
        <h1 class="title">{{ school.name }}</h1>
        <p>{{ school.description }}</p>
    </div>
</template>
  
<style>
.content {
    margin: 1%;
}
</style>