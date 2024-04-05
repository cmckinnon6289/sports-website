<script setup>
const props = defineProps({
    game: Object
})

let game = props.game;
game.date = new Date(props.game.date);
game.date = timezoneAdjust(game.date);
let timeString = `${game.date.getHours()}:${game.date.getMinutes()}`
if (game.date.getMinutes() < 10) timeString = `${game.date.getHours()}:0${game.date.getMinutes()}`

function timezoneAdjust(dateObj) {
    let timeMs = dateObj.getTime();
    let offset = dateObj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    timeMs += offset;
    const newDate = new Date(timeMs);
    return newDate;
}
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