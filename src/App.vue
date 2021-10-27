<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div id="nav">
    <nav class="navbar navbar-expand">
          <router-link to="/" class="nav-link pl-7">
            Home
          </router-link>
      <ul v-if="!GStore.currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
             Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
             Login
          </router-link>
        </li>
      </ul>
      <ul v-if="GStore.currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            
            {{ GStore.currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">
             LogOut
          </a>
        </li>
      </ul>
    </nav>

    <!-- <router-link :to="{ name: 'EventList' }">Home</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link> |
    <span v-if="isAdmin"> |
      <router-link  :to="{ name: 'AddEvent' }">New Event</router-link>
    </span> -->
  </div>

  <!-- new element -->
  <router-view />
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default{
  inject: ['GStore'], // <----
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin(){
      return AuthService.hasRoles('ROLE_ADMIN')
    }

  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.go()
    }
  }
}
</script>


<style>
body {
  width: 100%;
  margin: 0;
  overflow-x: hidden;
  background-color: red;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-left: 30px;
  padding-right: 30px;
}



#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h4 {
  font-size: 20px;
}
</style>
