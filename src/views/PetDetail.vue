<template>
  <div>
    <div v-if="pet">
      <h2>{{ pet.name }}</h2>

      <!--   ペット追加フォーム   -->
      <FormTextBox
        :childValue.sync="pet.name"
        title="名前"
        id="name"
        :readonly="true"
      ></FormTextBox>
      <FormTextBox
        :childValue.sync="pet.photoUrls.join(',')"
        title="写真URL"
        id="photoURL"
        :readonly="true"
      ></FormTextBox>
      <FormTextBox
        :childValue.sync="pet.category.name"
        title="カテゴリ"
        id="category"
        :readonly="true"
      ></FormTextBox>
      <FormTextBox
        :childValue.sync="pet.tags.map(tag => tag.name).join(',')"
        title="タグ"
        id="tag"
        :readonly="true"
      ></FormTextBox>
      <FormTextBox
        :childValue.sync="pet.status"
        title="ステータス"
        id="status"
        :readonly="true"
      ></FormTextBox>
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

@Component({
  components: { FormTextBox }
})
export default class PetDetail extends Vue {
  get pet() {
    return petModule.pet;
  }

  async created() {
    try {
      await petModule.getPetById(Number.parseInt(this.$route.params["id"]));
    } catch (e) {
      alert("ペットの取得に失敗しました。");
    }
  }
}
</script>

<style scoped></style>
