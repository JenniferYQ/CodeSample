<template>
  <div class="radio-field">
    <div v-for="option in field.options" :key="option.value" class="radio-option">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
        :disabled="field.disabled"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
    <div v-if="errors" class="error-message">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  field: Object,
  modelValue: [String, Number],
  errors: Array
});
</script>

<style scoped>
.radio-field {
  margin-bottom: 1rem;
}
.radio-field label {
  display: block;
  margin-bottom: 0.5rem;
}
.radio-option {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}
.radio-option input {
  margin-right: 0.5rem;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>