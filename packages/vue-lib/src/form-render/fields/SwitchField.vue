<template>
  <div class="switch-field">
    <label class="switch">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :disabled="field.disabled"
      />
      <span class="slider"></span>
    </label>
    <span v-if="field.label" class="switch-label">{{ field.label }}</span>
    <div v-if="errors" class="error-message">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: Object,
    modelValue: Boolean,
    errors: Array
  }
};
</script>

<style scoped>
.switch-field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:checked + .slider:before {
  transform: translateX(26px);
}
.switch-label {
  margin-left: 10px;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>