<template>
  <div>
    <h2>ペット一覧</h2>
    <router-link class="btn btn-primary" to="/pet/add" tag="button"
      >ペット追加</router-link
    >

    <!--  検索結果  -->
    <div v-if="isEmpty">検索結果は見つかりませんでした。</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ペット名</th>
          <th>カテゴリ</th>
          <th>タグ</th>
          <th>ステータス</th>
          <th>詳細</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="`${pet.id}-${createUUID()}`">
          <td>{{ pet.id }}</td>
          <td>{{ pet.name }}</td>
          <td>{{ pet.category.name }}</td>
          <td>{{ formatTags(pet.tags) }}</td>
          <td>{{ pet.status }}</td>
          <td>
            <router-link :to="`/pet/detail/${pet.id}`">詳細</router-link>
          </td>
          <td>
            <router-link :to="`/pet/edit/${pet.id}`">編集</router-link>
          </td>
          <td>
            <button @click="deletePet(pet.id)" class="btn btn-danger">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PetStatusEnum, Tag } from "@/api-client";
import petModule from "@/store/modules/pet";
import { createUUID } from "@/common/uuid";

type Status = typeof PetStatusEnum[keyof typeof PetStatusEnum];

const allStatus: Array<Status> = [
  PetStatusEnum.Available,
  PetStatusEnum.Pending,
  PetStatusEnum.Sold
];

@Component
export default class App extends Vue {
  private isEmpty = false;

  get pets() {
    return petModule.allPet;
  }

  async created() {
    try {
      await this.fetchData(allStatus);
    } catch (e) {
      alert("一覧の表示に失敗しました。");
    }
  }

  async fetchData(status: Array<Status>) {
    await petModule.findPetsByStatus(status);
  }

  /**
   * [aa, bb]を"aa,bb"にフォーマット
   * textBoxにバインドするため。
   */
  formatTags(tags: Tag[]) {
    return tags.map(tag => tag.name).join(",");
  }

  createUUID() {
    return createUUID();
  }

  /**
   * ペットの削除と一覧の更新
   * @param id
   */
  async deletePet(id: number) {
    if (confirm("削除してもよいですか?")) {
      try {
        await petModule.deletePet(id);
      } catch (e) {
        alert("削除に失敗しました。");
      }

      alert("削除に成功しました。");

      try {
        // 削除後の一覧を再度取得して、一覧を更新
        await this.fetchData(allStatus);
      } catch (e) {
        alert("一覧の表示に失敗しました。");
      }
    }
  }
}
</script>

<style scoped></style>
