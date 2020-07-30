<template>
  <div class="form-group">
    <label :for="id">{{ title }}:</label>
    <input
      :id="id"
      :placeholder="placeholder"
      :readonly="readonly"
      v-model="syncedValue"
      @input="updateValue"
      :class="[readonly ? 'form-control-plaintext' : 'form-control']"
      type="text"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from "vue-property-decorator";

@Component
export default class MyInput extends Vue {
  @Prop(String) readonly title: string | undefined;
  @Prop(String) readonly id: string | undefined;
  @Prop(String) readonly placeholder!: string | undefined;
  @Prop({ type: Boolean, default: false }) readonly readonly!:
    | boolean
    | undefined;
  @PropSync("childValue", { type: String })
  syncedValue: string | undefined;

  @Emit()
  updateValue(e: any) {
    return e.target.value;
  }
}
</script>

<style scoped></style>
