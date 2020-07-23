<template>
  <div>
    <h2>ペット一覧</h2>
    <!--  フィルター  -->
    <div>
      <input
        type="checkbox"
        id="available"
        value="available"
        v-model="checkedStatus"
      />
      <label for="available">available</label>

      <input
        type="checkbox"
        id="pending"
        value="pending"
        v-model="checkedStatus"
      />
      <label for="pending">pending</label>

      <input type="checkbox" id="sold" value="sold" v-model="checkedStatus" />
      <label for="sold">sold</label>
    </div>

    <!--  検索結果  -->
    <div v-if="isEmpty">検索結果は見つかりませんでした。</div>
    <ul v-else>
      <li v-for="pet in pets" :key="`${pet.id}-${createUUID()}`">
        <div>
          {{ pet }}
        </div>
        :
        <router-link :to="`/petDetail/${pet.id}`">詳細へ</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Pet, PetApi, Configuration } from "@/api-client";
import { createUUID } from "@/common/uuid";

type Status = Array<"available" | "pending" | "sold">;

@Component
export default class App extends Vue {
  private pets: Pet[] = [];
  private petApi: PetApi | null = null;
  private checkedStatus: Status = [];
  private isEmpty = false;

  async mounted() {
    this.petApi = new PetApi(
      new Configuration({
        apiKey: "special-key",
        basePath: process.env.VUE_APP_API_BASE_PATH
      })
    );

    const tmpStatus = this.$route.query.status;
    let status: Status;
    if (tmpStatus) {
      if (typeof tmpStatus === "string")
        status = tmpStatus.split(",") as Status;
      else status = ["available", "pending", "sold"];
    } else {
      status = ["available", "pending", "sold"];
    }
    const response = await this.petApi?.findPetsByStatus(status);

    this.pets.push(...response.data);
  }

  createUUID() {
    return createUUID();
  }

  @Watch("checkedStatus", { deep: true })
  async onCheckedStatusChanged(val: Status, oldVal: Status) {
    console.log("change", { val, oldVal });

    this.pets.splice(0);
    const response = await this.petApi?.findPetsByStatus(val);
    if (response) this.pets.push(...response.data);

    if (this.pets.length) this.isEmpty = false;
    else this.isEmpty = true;

    // URL直叩きされてもフィルター反映できるように、クエリパラメータを付与
    await this.$router.push({ query: { status: val.join(",") } });
  }
}
</script>

<style scoped></style>
