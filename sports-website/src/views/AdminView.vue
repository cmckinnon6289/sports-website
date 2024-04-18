<script>
import EventService from '../services/EventService'
import { ref, onMounted } from 'vue'

export default {
    
  setup() {
    const schools = ref(null);
    const perms = ref(null);

    onMounted(() => {
      EventService.getSchools()
        .then((response) => {
            schools.value = response.data;
        })
        .catch((error) => { 
            console.log(error)
        })
      /*EventService.getUserPerms()
        .then((response) => {
            perms.value = response.data;
        })
        .catch((error) => {
            console.log(error)
        })*/
    });

    return { schools, perms };
  },
  
  data() {
    return {
        formData: {
            type: '',
            homeTeam: '',
            awayTeam: '',
            date: '',
        }
    }
  },
  methods: {
    submitGame() {
        console.log("submitted! :)")
        const submission = JSON.stringify(this.formData);
        EventService.newEvent(submission);
    }
  }
}




</script>

<template>
    <div id="admin">
        <div class="columns">
            <div class="content column" id="new-game">
                <h2 class="title is-4">New game</h2>
                <form @submit.prevent="submitGame()">
                    <div class="field" id="game-location">
                        <label class="radio">
                        <input type="radio" name="game-location" id="home-game" v-model="formData.type" value="home" /> Home
                        </label>
                        <label class="radio">
                        <input type="radio" name="game-location" id="away-game" v-model="formData.type" value="away" /> Away
                        </label>
                    </div>

                    <div class="field" id="home-team">
                        <label class="label">Home team</label>
                        <div class="control">
                            <div class="select">
                                <select v-if="schools" v-model="formData.homeTeam">
                                    <option v-for="school in schools" :key="school._id">{{ school.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" id="away-team">
                            <label class="label">Away team</label>
                            <div class="control">
                                <div class="select">
                                <select v-if="schools" v-model="formData.awayTeam">
                                    <option v-for="school in schools" :key="school._id">{{ school.name }}</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    <div class="field" id="date">
                        <label class="label">Date and time</label>
                        <div class="control">
                            <input type="datetime-local" name="" id="" class="input" v-model="formData.date">
                        </div>
                    </div>
                    <button class="button is-primary" type="submit">Submit</button>
                </form>
            </div>
            <div class="content column" id="new-school">
                <h2 class="title is-4">New school</h2>
                <div class="control">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content column" id="new-league">
                <h2 class="title is-4">New league</h2>
            </div>
        </div>
    </div>
</template>