<template>
  <div>
    <div v-if="pet">
      <h2>ペット編集</h2>

      <!--   バリデーション   -->
      <div v-if="errors.length">
        <b>入力誤りがあります:</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!--   ペット編集フォーム   -->
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
    <div v-else>
      存在しません。
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import petModule from "@/store/modules/pet";
import FormTextBox from "@/components/FormTextBox.vue";
import { Pet, PetStatusEnum, Tag, Category } from "@/api-client";

type Status = typeof PetStatusEnum[keyof typeof PetStatusEnum];

@Component({
  components: { FormTextBox }
})
export default class PetEdit extends Vue {
  private name = "";
  private photoURLs = "";
  private category = "";
  private tags = "";
  private status: Status | null = null;
  private errors: Array<string> = [];
  private options: Status[] = [
    PetStatusEnum.Available,
    PetStatusEnum.Pending,
    PetStatusEnum.Sold
  ];

  get pet() {
    return petModule.pet;
  }

  async created() {
    try {
      await petModule.getPetById(Number.parseInt(this.$route.params["id"]));

      // textBoxにバインドさせるためいろいろしてる
      if (this.pet) {
        this.name = this.pet.name;
        this.photoURLs = this.pet.photoUrls.join(",");

        if (this.pet.category) {
          if (typeof this.pet.category.name === "string") {
            this.category = this.pet.category.name;
          }
        }

        if (this.pet.tags) {
          this.tags = this.pet.tags.map(tag => tag.name).join(",");
        }

        if (this.pet.status) {
          this.status = this.pet.status;
        }
      }
    } catch (e) {
      alert("ペットの取得に失敗しました。");
      await this.$router.push("/pet/list");
    }
  }

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
          id: this.pet?.id,
          name: this.name,
          photoUrls: this.photoURLs.split(","),
          category: { name: this.category },
          tags: tags,
          status: this.status
        };

        await petModule.updatePet(petObj);

        alert("ペット編集に成功しました。");

        await this.$router.push("/pet/list");
      } catch (e) {
        alert("ペットの編集に失敗しました。");
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
