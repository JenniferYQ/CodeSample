<template>
  <div class="select-field">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="field.disabled"
    >
      <option v-for="option in field.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <div v-if="errors" class="error-message">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  field: Object,
  modelValue: [String, Number, Array],
  errors: Array
});
</script>

<style scoped>
.select-field {
  margin-bottom: 1rem;
}
.select-field label {
  display: block;
  margin-bottom: 0.5rem;
}
.select-field select {
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