/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserCredentials {
  email: string;
  password: string;
  role: string;
}

export interface EmailResetPasswordCredential {
  email: string;
}

export interface ResetPasswordCredential {
  access_token: string;
  password: string;
}

export interface CrategoryWhereUniqueInput {
  id: string;
}

export interface ProductCreateInput {
  name?: string;
  price?: number;
  category?: CrategoryWhereUniqueInput;
}

export interface Product {
  id: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
  name?: string;
  price?: number;
  category?: Crategory;
}

export interface Crategory {
  id: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
  name?: string;
  type?: string;
  ref?: string;
  products?: Product[];
}

export interface ForbiddenException {
  statusCode: number;
  message: string;
}

export interface StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: "Default" | "Insensitive";
  not?: string;
}

export interface StringNullableFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: "Default" | "Insensitive";
  not?: string;
}

export interface FloatNullableFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export interface ProductWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
  price?: FloatNullableFilter;
  category?: CrategoryWhereUniqueInput;
}

export interface ProductOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
  price?: "Asc" | "Desc";
  categoryId?: "Asc" | "Desc";
}

export interface GetListProductDto {
  paginatedResult: Product[];
  totalCount: number;
}

export interface NotFoundException {
  statusCode: number;
  message: string;
}

export interface ProductUpdateInput {
  name?: string;
  price?: number;
  category?: CrategoryWhereUniqueInput;
}

export interface CrategoryCreateInput {
  name?: string;
  type?: string;
  ref?: string;
}

export interface CrategoryWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
  type?: StringNullableFilter;
  ref?: StringNullableFilter;
}

export interface CrategoryOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
  type?: "Asc" | "Desc";
  ref?: "Asc" | "Desc";
}

export interface GetListCrategoryDto {
  paginatedResult: Crategory[];
  totalCount: number;
}

export interface CrategoryUpdateInput {
  name?: string;
  type?: string;
  ref?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public setBaseApiParams = (data: RequestParams) => {
    this.baseApiParams = this.mergeRequestParams(data);
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My app
 * @version 3q661ara
 * @contact
 *
 *
 *
 * ## Congratulations! Your application is ready.
 *
 *     Please note that all endpoints are secured with JWT Bearer authentication.Use the authentification service of supabase to authenticate.
 *     (https://supabase.com/docs/gotrue/server/about#put-user)
 *     Learn more in [our docs](https://docs.amplication.com)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignUp
     * @request POST:/api/sign_up
     */
    authControllerSignUp: (data: UserCredentials, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sign_up`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSendEmailResetPassword
     * @request POST:/api/send_email_reset_password
     */
    authControllerSendEmailResetPassword: (data: EmailResetPasswordCredential, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/send_email_reset_password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResetPassword
     * @request POST:/api/reset_password
     */
    authControllerResetPassword: (data: ResetPasswordCredential, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/reset_password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductControllerCreate
     * @request POST:/api/products
     * @secure
     */
    productControllerCreate: (data: ProductCreateInput, params: RequestParams = {}) =>
      this.request<Product, ForbiddenException>({
        path: `/api/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductControllerFindMany
     * @request GET:/api/products
     * @secure
     */
    productControllerFindMany: (
      query?: { where?: ProductWhereInput; orderBy?: ProductOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListProductDto, void>({
        path: `/api/products`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductControllerFindOne
     * @request GET:/api/products/{id}
     * @secure
     */
    productControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Product, ForbiddenException | NotFoundException>({
        path: `/api/products/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductControllerUpdate
     * @request PATCH:/api/products/{id}
     * @secure
     */
    productControllerUpdate: (id: string, data: ProductUpdateInput, params: RequestParams = {}) =>
      this.request<Product, ForbiddenException | NotFoundException>({
        path: `/api/products/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductControllerDelete
     * @request DELETE:/api/products/{id}
     * @secure
     */
    productControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Product, ForbiddenException | NotFoundException>({
        path: `/api/products/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerCreate
     * @request POST:/api/crategories
     * @secure
     */
    crategoryControllerCreate: (data: CrategoryCreateInput, params: RequestParams = {}) =>
      this.request<Crategory, ForbiddenException>({
        path: `/api/crategories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerFindMany
     * @request GET:/api/crategories
     * @secure
     */
    crategoryControllerFindMany: (
      query?: { where?: CrategoryWhereInput; orderBy?: CrategoryOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCrategoryDto, void>({
        path: `/api/crategories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerFindOne
     * @request GET:/api/crategories/{id}
     * @secure
     */
    crategoryControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Crategory, ForbiddenException | NotFoundException>({
        path: `/api/crategories/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerUpdate
     * @request PATCH:/api/crategories/{id}
     * @secure
     */
    crategoryControllerUpdate: (id: string, data: CrategoryUpdateInput, params: RequestParams = {}) =>
      this.request<Crategory, ForbiddenException | NotFoundException>({
        path: `/api/crategories/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerDelete
     * @request DELETE:/api/crategories/{id}
     * @secure
     */
    crategoryControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Crategory, ForbiddenException | NotFoundException>({
        path: `/api/crategories/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerFindManyProducts
     * @request GET:/api/crategories/{id}/products
     * @secure
     */
    crategoryControllerFindManyProducts: (
      id: string,
      query?: {
        id?: StringFilter;
        name?: StringNullableFilter;
        price?: FloatNullableFilter;
        category?: CrategoryWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/crategories/${id}/products`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerCreateProducts
     * @request POST:/api/crategories/{id}/products
     * @secure
     */
    crategoryControllerCreateProducts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/crategories/${id}/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerUpdateProducts
     * @request PATCH:/api/crategories/{id}/products
     * @secure
     */
    crategoryControllerUpdateProducts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/crategories/${id}/products`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags crategories
     * @name CrategoryControllerDeleteProducts
     * @request DELETE:/api/crategories/{id}/products
     * @secure
     */
    crategoryControllerDeleteProducts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/crategories/${id}/products`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name HealthControllerHealthLive
     * @request GET:/api/_health/live
     */
    healthControllerHealthLive: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/_health/live`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name HealthControllerHealthReady
     * @request GET:/api/_health/ready
     */
    healthControllerHealthReady: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/_health/ready`,
        method: "GET",
        ...params,
      }),
  };
}
