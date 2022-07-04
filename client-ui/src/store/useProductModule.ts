import { ProductUpdateInput, ProductCreateInput, Product } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useProductStore = defineStore("product-store", {
  state: () => {
    return {
      productList: [] as Array<Product>,
      isLoading: false,
      error: null as Object | any,
      product: null as Product | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchProducts(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.productControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.productList = data.paginatedResult;

        this.productList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object") {
              element[key] = Object.values(value);
            }
          }
        });
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.productList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProduct(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.productControllerDelete(payload);
        this.productList = this.productList.filter(
          (product) => product.id !== data.id
        );
        this.pagination.total--;
        this.isLoading = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async editProduct(payload: { data: ProductUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.productControllerUpdate(
          payload.id,
          payload.data
        );
        this.productList = this.productList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async getProductById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.productControllerFindOne(payload);
        this.product = data;
        this.error = null;
      } catch (err: any) {
        this.product = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createProduct(payload: ProductCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.productControllerCreate(payload);
        this.productList = [...this.productList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
