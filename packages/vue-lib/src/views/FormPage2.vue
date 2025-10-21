<template>
  <div>
    <p>自动渲染表单示例</p>
    <FormRenderer 
      :formConfig="formConfig" 
      :initialData="initialData"
      @submit="handleSubmit"
      @reset="handleReset"
      @field-change="handleFieldChange"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import FormRenderer from './../form-render/FormRender.vue';

export default {
  components: { FormRenderer },
  setup() {
    const initialData = ref({
      username: '',
      email: '',
      gender: 'male',
      agreeTerms: false
    });
    
    const formConfig = {
      formConfig: {
        name: '用户注册',
        labelWidth: '120px',
        labelPosition: 'left',
        submitText: '注册',
        resetText: '清空'
      },
      fields: [
        {
          type: 'input',
          name: 'username',
          label: '用户名',
          required: true,
          placeholder: '请输入用户名',
          rules: [
            { type: 'required', message: '用户名不能为空' },
            { type: 'custom', validator: (val) => val.length >= 3, message: '用户名至少3个字符' }
          ]
        },
        {
          type: 'input',
          name: 'email',
          label: '邮箱',
          required: true,
          placeholder: '请输入邮箱',
          rules: [
            { type: 'required', message: '邮箱不能为空' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]
        },
        {
          type: 'radio',
          name: 'gender',
          label: '性别',
          defaultValue: 'male',
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '其他', value: 'other' }
            ]
        },
        {
          type: 'checkbox',
          name: 'agreeTerms',
          label: '同意条款',
          required: true,
          options: [
            { label: '同意条款', value: true }
          ],
          rules: [
            { type: 'required', message: '请同意用户条款' }
          ]
        }
      ]
    };
    
    const handleSubmit = (formData) => {
      console.log('表单提交数据:', formData);
      // 处理表单提交逻辑
    };
    
    const handleReset = (formData) => {
      console.log('表单已重置:', formData);
    };
    
    const handleFieldChange = ({ name, value, formData }) => {
      console.log(`字段 ${name} 变更为:`, value);
    };
    
    return {
      initialData,
      formConfig,
      handleSubmit,
      handleReset,
      handleFieldChange
    };
  }
};
</script>