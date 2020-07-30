<template>
  <div>
    <h2>ペット追加</h2>

    <!--   バリデーション   -->
    <div v-if="errors.length">
      <b>入力誤りがあります:</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <!--   ペット追加フォーム   -->
    <FormTextBox
      :childValue.sync="name"
      title="名前"
      id="name"
      placeholder="aaa"
    ></FormTextBox>
    <FormTextBox
      :childValue.sync="photoURLs"
      title="写真URL"
      id="photoURL"
      placeholder="aaa,bbb"
    ></FormTextBox>
    <FormTextBox
      :childValue.sync="category"
      title="カテゴリ"
      id="category"
      placeholder="aaa"
    ></FormTextBox>
    <FormTextBox
      :childValue.sync="tags"
      title="タグ"
      id="tag"
      placeholder="aaa,bbb"
    ></FormTextBox>
    <div class="form-group">
      <label for="status">ステータス</label>
      <select class="form-control" id="status" v-model="status">
        <option
          v-for="(option, index) in options"
          v-bind:value="option"
          v-bind:key="index"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <button @click="checkForm" class="btn btn-primary">決定</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import petModule from "@/store/modules/pet";
import FormTextBox from "@/components/FormTextBox.vue";
import { Pet, PetStatusEnum, Tag } from "@/api-client";

type Status = typeof PetStatusEnum[keyof typeof PetStatusEnum];

@Component({
  components: { FormTextBox }
})
export default class PetAdd extends Vue {
  private photoURLs = "";
  private name = "";
  private category = "";
  private tags = "";
  private status: Status | null = null;
  private errors: Array<string> = [];
  private options: Status[] = [
    PetStatusEnum.Available,
    PetStatusEnum.Pending,
    PetStatusEnum.Sold
  ];

  async checkForm(e: any) {
    if (
      this.photoURLs &&
      this.name &&
      this.category &&
      this.tags &&
      this.status
    ) {
      try {
        const tags: Array<Tag> = this.tags.split(",").map(tag => {
          return { name: tag };
        });
        const petObj: Pet = {
          name: this.name,
          photoUrls: this.photoURLs.split(","),
          category: { name: this.category },
          tags: tags,
          status: this.status
        };

        await petModule.addPet(petObj);

        alert("ペット追加に成功しました。");

        this.photoURLs = "";
        this.name = "";
        this.category = "";
        this.tags = "";
        this.status = null;
      } catch (e) {
        alert("ペットの追加に失敗しました。");
      }
    }

    this.errors = [];

    if (!this.name) {
      this.errors.push("名前 は必須です。");
    }
    if (!this.photoURLs) {
      this.errors.push("写真URL は必須です。");
    }
    if (!this.category) {
      this.errors.push("カテゴリ は必須です。");
    }
    if (!this.tags) {
      this.errors.push("タグ は必須です。");
    }
    if (!this.status) {
      this.errors.push("ステータス は必須です。");
    }

    e.preventDefault();
  }
}
</script>

<style scoped></style>
