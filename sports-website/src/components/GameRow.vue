<script setup>
const props = defineProps({
    game: Object
})

let game = props.game;
game.date = new Date(props.game.date);
const timeString = `${game.date.getHours()}:${game.date.getMinutes()}`
</script>

<template>
    <tr>
        <td>{{ game.homeTeam.name }}</td>
        <td>{{ game.awayTeam.name }}</td>
        <td>{{ timeString }}</td>
        <td>{{ game.location }}</td>
        <td><RouterLink :to="{name: 'game-view', params: {id: game._id}}">View more details</RouterLink></td>
    </tr>
</template>

<style>
</style>