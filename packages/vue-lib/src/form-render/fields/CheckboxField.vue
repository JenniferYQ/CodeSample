<template>
  <div class="checkbox-field">
    <div v-for="option in field.options" :key="option.value" class="checkbox-option">
      <input
        type="checkbox"
        :id="option.value"
        :value="option.value"
        :checked="modelValue?.includes(option.value)"
        @change="handleChange($event, option.value)"
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
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  field: Object,
  modelValue: Array,
  errors: Array
});

const emit = defineEmits(['update:modelValue']);

function handleChange(event, value) {
  const newValue = [...props.modelValue];
  if (event.target.checked) {
    if (!newValue.includes(value)) {
      newValue.push(value);
    }
  } else {
    const index = newValue.indexOf(value);
    if (index > -1) {
      newValue.splice(index, 1);
    }
  }
  emit('update:modelValue', newValue);
}
</script>

<style scoped>
.checkbox-field {
  margin-bottom: 1rem;
}
.checkbox-field label {
  display: block;
  margin-bottom: 0.5rem;
}
.checkbox-option {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}
.checkbox-option input {
  margin-right: 0.5rem;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>