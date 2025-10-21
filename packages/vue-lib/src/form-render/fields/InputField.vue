<template>
  <div class="input-field">
   <input
      :type="field.type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="field.placeholder || placeholder"
      :disabled="field.disabled || disabled"
    />
    <div v-if="errors" class="error-message">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  field: Object,
  modelValue: [String, Number],
  errors: Array,
  label: String,
  required: Boolean,
  placeholder: String,
  disabled: Boolean,
  type: String,
});

onMounted(() => {
  // 调试：在控制台打印所有入参
//   console.log('InputField mounted with props:', props);
});
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
}
.input-field label {
  display: block;
  margin-bottom: 0.5rem;
}
.input-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>