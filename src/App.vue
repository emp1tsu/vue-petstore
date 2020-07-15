<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <button @click="showPets()">show pets</button>
      {{ pets }}
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Pet, PetApi, Configuration } from "@/api-client";

@Component
export default class App extends Vue {
  private pets: Pet[] = [];
  private petApi: PetApi | null = null;

  mounted() {
    this.petApi = new PetApi(
      new Configuration({
        apiKey: "special-key",
        basePath: process.env.VUE_APP_API_BASE_PATH
      })
    );
  }

  async showPets() {
    const response = await this.petApi?.getPetById(1);
    this.$set(this.pets, 0, response?.data);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
