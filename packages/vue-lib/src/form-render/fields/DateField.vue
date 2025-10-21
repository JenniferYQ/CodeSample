<template>
  <div class="date-field">
    <input
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="field.placeholder"
      :disabled="field.disabled"
    />
    <div v-if="errors" class="error-message">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  field: Object,
  modelValue: String,
  errors: Array
});
</script>

<style scoped>
.date-field {
  margin-bottom: 1rem;
}
.date-field label {
  display: block;
  margin-bottom: 0.5rem;
}
.date-field input {
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