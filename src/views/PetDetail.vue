<template>
  <div>id: {{ $route.params.id }} の詳細ページ</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Pet, PetApi, Configuration } from "@/api-client";
import { createUUID } from "@/common/uuid";

type Status = Array<"available" | "pending" | "sold">;

@Component
export default class App extends Vue {}
</script>

<style scoped></style>
