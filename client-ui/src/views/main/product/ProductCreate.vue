<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Product</h3>
    <ProductForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductForm from "@/components/forms/ProductForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-product",
  components: {
    ProductForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create product", ["products"]);
    });
    return {};
  },
});
</script>
