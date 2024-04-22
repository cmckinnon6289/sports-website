import axios from 'axios'
 
const apiClient = axios.create({
  baseURL: 'http://localhost:621', // CHANGE BACK
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
 
export default {
  allEvents() {
    return apiClient.get('/api/events/all-events');
  },
  todaysEvents() {
    const events = apiClient.get('/api/events/today');
    if (events.code === "ERR_BAD_REQUEST") {
      return -1;
    }
    else return events;
  },
  todayAndBeyond() {
    const events = apiClient.get('/api/events/today-and-beyond');
    if (events.code === "ERR_BAD_REQUEST") {
      return -1;
    }
    else return events;
  },
  todayAndBeyondWithFilters(filters) {
    const events = apiClient.get('/api/events/today-and-beyond', {
      params: filters
    });
    if (events.code === "ERR_BAD_REQUEST") {
      return -1;
    }
    else return events;
  },
  getEvent(id) {
    return apiClient.get(`/api/events/by-id/${id}`);
  },
  getSchool(id) {
    return apiClient.get(`/api/schools/by-id/${id}`);
  },
  getSchools() {
    return apiClient.get(`/api/schools/`);
  },
  newSchool(jsonData) {
    console.log("jsondata", jsonData)
    return apiClient.post('/api/schools/new-school', jsonData)
  },
  newEvent(jsonData) {
    console.log("jsondata events", jsonData)
    return apiClient.post('/api/events/new-event', jsonData)
  },
  getLeagues() {
    return apiClient.get('/api/leagues')
  },
  newLeague(jsonData) {
    console.log("jsondata leagues", jsonData)
    return apiClient.post('/api/leagues/new-league', jsonData)
  },
  getUserPerms(id) {
    return apiClient.get(`/api/users/get-perms/${id}`)
  }
}