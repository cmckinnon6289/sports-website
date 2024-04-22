<script>
import EventService from '../services/EventService'
import { ref, onMounted } from 'vue'

export default {
    
  setup() {
    const schools = ref(null);
    const leagues = ref(null);
    const perms = ref(null);

    onMounted(() => {
      EventService.getSchools()
        .then((response) => {
            schools.value = response.data;
        })
        .catch((error) => { 
            console.log(error)
        }),
      EventService.getLeagues()
        .then((response) => {
            leagues.value = response.data;
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
            league: '',
            homeTeam: '',
            awayTeam: '',
            date: '',
        },
        formDataSchool: {
            name: '',
            location: '',
            description: ''
        },
        formDataLeague: {
            name: ''
        }
    }
  },
  methods: {
    submitGame() {
        console.log("submitted event! :)")
        const submission = JSON.stringify(this.formData);
        EventService.newEvent(submission);
    },
    submitLeague() {
        console.log("submitted league! :)")
        const submission = JSON.stringify(this.formDataLeague);
        EventService.newLeague(submission);
    },
    submitSchool() {
        const submission = JSON.stringify(this.formDataSchool);
        console.log(submission);
        EventService.newSchool(submission);
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
                    <div class="field" id="event-league">
                        <label class="label">League</label>
                        <div class="control">
                            <div class="select" v-if="leagues">
                                <select v-model="formData.league" required>
                                    <option v-for="league in leagues" :key="league._id">{{ league.name }}</option>
                                </select>
                            </div>
                            <input type="text" class="input" v-else>
                        </div>
                    </div>
                    <div class="field" id="home-team">
                        <label class="label">Home team</label>
                        <div class="control">
                            <div class="select">
                                <select v-if="schools" v-model="formData.homeTeam" required>
                                    <option v-for="school in schools" :key="school._id">{{ school.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" id="away-team">
                            <label class="label">Away team</label>
                            <div class="control">
                                <div class="select">
                                    <select v-if="schools" v-model="formData.awayTeam" required>
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
                <form @submit.prevent="submitSchool()">
                    <div class="field" id="school-name">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" v-model="formDataSchool.name">
                        </div>
                    </div>
                    <div class="field" id="school-description">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Text input" v-model="formDataSchool.description"></textarea>
                        </div>
                    </div>
                    <div class="field" id="school-address">
                        <label class="label">Address</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="eg: 85 Moatfield Drive, Toronto, Ontario, M3B 3L6" v-model="formDataSchool.location">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="content column" id="new-league">
                <h2 class="title is-4">New league</h2>
                <form @submit.prevent="submitLeague()">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" v-model="formDataLeague.name">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>