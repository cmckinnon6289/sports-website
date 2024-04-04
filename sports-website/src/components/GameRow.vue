<script setup>
defineProps({
    game: Object
})
</script>

<template>
    <tr>
        <td>{{ game.homeTeam }}</td>
        <td>{{ game.awayTeam }}</td>
        <td>{{ game.date.getTime() }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.notes }}</td>
    </tr>
</template>

<style>
</style>