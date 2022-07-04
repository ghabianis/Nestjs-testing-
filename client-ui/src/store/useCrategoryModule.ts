import {
  CrategoryUpdateInput,
  CrategoryCreateInput,
  Crategory,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useCrategoryStore = defineStore("crategory-store", {
  state: () => {
    return {
      crategoryList: [] as Array<Crategory>,
      isLoading: false,
      error: null as Object | any,
      crategory: null as Crategory | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchCrategories(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.crategoryControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.crategoryList = data.paginatedResult;

        this.crategoryList.forEach((element) => {
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
        this.crategoryList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCrategory(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.crategoryControllerDelete(payload);
        this.crategoryList = this.crategoryList.filter(
          (crategory) => crategory.id !== data.id
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
    async editCrategory(payload: { data: CrategoryUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.crategoryControllerUpdate(
          payload.id,
          payload.data
        );
        this.crategoryList = this.crategoryList.map((item) =>
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
    async getCrategoryById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.crategoryControllerFindOne(payload);
        this.crategory = data;
        this.error = null;
      } catch (err: any) {
        this.crategory = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createCrategory(payload: CrategoryCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.crategoryControllerCreate(payload);
        this.crategoryList = [...this.crategoryList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
