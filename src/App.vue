<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/">ホーム</router-link> |
      <router-link to="/pet/list">ペット一覧</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style></style>
