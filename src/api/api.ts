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

export interface User {
  /** @format int64 */
  id?: number;
  role?: string;
  username?: string;
  password?: string;
  name?: string;
  gender?: string;
  jobNum?: string;
  studentClass?: string;
  title?: string;
  major?: string;
  email?: string;
  resume?: string;
}

export interface Topic {
  /** @format int64 */
  id?: number;

  /** @format int64 */
  teacherId?: number;

  /** @format int64 */
  studentId?: number;
  title?: string;
  difficulty?: string;
  description?: string;
  requirement?: string;
  createTime?: string;
  updateTime?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title 高等软件工程团队大作业项目API规范
 * @version 1.5.0
 * @baseUrl /
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * @description This can only be done by administrator
     *
     * @tags user
     * @name CreateUser
     * @summary Create a user
     * @request POST:/user
     */
    createUser: (body: User, params: RequestParams = {}) =>
      this.request<number, void>({
        path: `/user`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUser
     * @summary Get a user
     * @request GET:/user/{userId}
     */
    getUser: (userId: number, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/user/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateUser
     * @summary Update a user
     * @request PUT:/user/{userId}
     */
    updateUser: (userId: number, body: User, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/${userId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by administrator
     *
     * @tags user
     * @name DeleteUser
     * @summary Delete a user
     * @request DELETE:/user/{userId}
     */
    deleteUser: (userId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/${userId}`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description If user id array is empty, return all user
     *
     * @tags user
     * @name GetUsers
     * @summary Get users
     * @request GET:/user/list
     */
    getUsers: (body: number[], params: RequestParams = {}) =>
      this.request<User[], void>({
        path: `/user/list`,
        method: "GET",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This can only be done by administrator
     *
     * @tags user
     * @name DeleteUsers
     * @summary Delete users
     * @request DELETE:/user/list
     */
    deleteUsers: (body: number[], params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/list`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name SignIn
     * @summary User signin the system
     * @request GET:/user/signin
     */
    signIn: (query: { username: string; password: string }, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/user/signin`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name SignOut
     * @summary User signout the system
     * @request GET:/user/signout
     */
    signOut: (query: { username: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/signout`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdatePassword
     * @summary User update password
     * @request POST:/user/password
     */
    updatePassword: (body: { userId: number; oldPwd: string; newPwd: string }, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/password`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
  topic = {
    /**
     * No description
     *
     * @tags topic
     * @name CreateTopic
     * @summary Create a topic
     * @request POST:/topic
     */
    createTopic: (body: Topic, params: RequestParams = {}) =>
      this.request<number, void>({
        path: `/topic`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags topic
     * @name GetTopic
     * @summary Get a topic
     * @request GET:/topic/{topicId}
     */
    getTopic: (topicId: number, params: RequestParams = {}) =>
      this.request<Topic, void>({
        path: `/topic/${topicId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags topic
     * @name UpdateTopic
     * @summary Update a topic
     * @request PUT:/topic/{topicId}
     */
    updateTopic: (topicId: number, body: Topic, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/topic/${topicId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by administrator
     *
     * @tags topic
     * @name DeleteTopic
     * @summary Delete a topic
     * @request DELETE:/topic/{topicId}
     */
    deleteTopic: (topicId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/topic/${topicId}`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description If topic id array is empty, return all topic
     *
     * @tags topic
     * @name GetTopics
     * @summary Get topics
     * @request GET:/topic/list
     */
    getTopics: (body: number[], params: RequestParams = {}) =>
      this.request<Topic[], void>({
        path: `/topic/list`,
        method: "GET",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This can only be done by administrator
     *
     * @tags topic
     * @name DeleteTopics
     * @summary Delete topics
     * @request DELETE:/topic/list
     */
    deleteTopics: (body: number[], params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/topic/list`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by student
     *
     * @tags topic
     * @name GetChosenTopic
     * @summary Get chosen topic
     * @request GET:/topic/choose
     */
    getChosenTopic: (query: { userId: number }, params: RequestParams = {}) =>
      this.request<Topic, void>({
        path: `/topic/choose`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This can only be done by student
     *
     * @tags topic
     * @name SetChosenTopic
     * @summary Choose a topic
     * @request POST:/topic/choose
     */
    setChosenTopic: (body: { userId: number; topicId: number }, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/topic/choose`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can only be done by teacher
     *
     * @tags topic
     * @name GetPublishedTopic
     * @summary Get published topic
     * @request GET:/topic/publish
     */
    getPublishedTopic: (query: { userId: number }, params: RequestParams = {}) =>
      this.request<Topic, void>({
        path: `/topic/publish`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
