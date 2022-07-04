<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Crategory</h3>
    <CrategoryForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CrategoryForm from "@/components/forms/CrategoryForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-crategory",
  components: {
    CrategoryForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create crategory", ["crategories"]);
    });
    return {};
  },
});
</script>
