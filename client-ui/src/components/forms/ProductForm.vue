<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="price" prop="price">
      <el-input-number :min="0" :max="100000" v-model="form.price" />
    </el-form-item>
    <div class="d-flex justify-content-end">
      <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)"
        >Create</el-button
      >
    </div>
  </el-form>
  <button @click="getProducts()">GetApi</button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/useProductModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useCrategoryStore } from "@/store/useCrategoryModule";
import axios from 'axios';

export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    const { product, error } = storeToRefs(useProductStore());
    const { getProductById, createProduct, editProduct , fetchProducts} = useProductStore();
    const  {fetchCrategories} = useCrategoryStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { name: "", price: 0 };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const data = () =>{
      return {
        info : null
      }
    }

    const rules = reactive({
      name: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      price: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      category: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
    });

    const handleSubmitForm = async () => {
      if (props.isEdit) {
        const id = route?.params?.id as string;
        return await editProduct({ data: form, id });
      } else await createProduct(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-product" });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const getProducts = async () =>{
    // const  res = await fetchCrategories(0,3);
    //   console.log({...res});
    }
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      Object.assign(form, initialState);
      formEl.resetFields();
    };
    const getCurrentProduct = async (id: string) => {
      if (props.isEdit) {
        await getProductById(id);
      }
    };
    onMounted(async () => {
      const id = route.params.id as string;
      await getCurrentProduct(id);
      if (!!product.value && props.isEdit) {
        ["name", "price", "category"].forEach((item) => {
          form[item] = product.value[item];
        });
      }
      
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      getProducts
    };
  },
});
</script>
