<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import store from '@/stores/index.js';
import EventService from '@/services/EventService.js';

function handleNavbarModal() {
  const navbar = document.getElementById('navbar-menu')
  const burger = document.getElementById('burger');
  const arr = [navbar,burger]
  arr.forEach((elem) => {
    elem.classList.toggle('is-active');
  })
}

async function logout() {
  try {
    // await this.loginUser({ email: this.email, password: this.password });
    await store.dispatch('logoutUser');

    // If login successful, redirect to dashboard or desired page
    document.location.href="/";
  } catch (error) {
    console.log(error);
  }
}

const perms = ref(null);
if(store.getters.isLoggedIn) {
  EventService.getUserPerms(store.getters.currentUser._id)
  .then((response) => {
    perms.value = response.data;
    console.log(perms.value);
  })
  .catch((error) => {
    console.log(error);
  })
}
</script>

<template>
  <div class="layout">
    <nav class="navbar">
      <div class="navbar-brand">
        <RouterLink class="navbar-item link" to="/"><b>CISAA Sports Database</b></RouterLink>
        <a role="button" class="navbar-burger" id="burger" aria-label="menu" aria-expanded="false" @click="handleNavbarModal()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-start">
          <span class="navbar-item">
            <RouterLink class="navbar-item link" :to="{name: 'schedule'}">Schedule</RouterLink>
          </span>
          <span class="navbar-item">
            <RouterLink class="navbar-item link" :to="{name: 'admin-view'}" v-if="perms >= 1">Administration</RouterLink>
          </span>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            <RouterLink class="navbar-item button" :to="{name: 'login'}" v-if="!$store.state.user.isLoggedIn">Login</RouterLink>
          </span>
          <span class="navbar-item">
            <button class="navbar-item button is-danger" @click="logout" v-if="$store.state.user.isLoggedIn">Logout</button>
          </span>
        </div>
      </div>
    </nav>
    <div class="wrapper">
      <RouterView />
    </div>
    <!-- <footer class="footer">
      <p>Copyright 2024. All rights reserved.</p>
    </footer> -->
  </div>
</template>

<style>
nav {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  padding: 16px;
  margin-bottom: 25px;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
}

.link {
  display: inline-flex;
  align-items: center;
  color: black;
}

.wrapper {
  padding: 1%;
}

.footer {
  background-color: black;
  color: white;
  width: 100%;
}
</style>
