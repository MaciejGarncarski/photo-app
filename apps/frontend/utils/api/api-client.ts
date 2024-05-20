import { Fetcher } from "@qdrant/openapi-typescript-fetch";
import type { z } from "zod";

import { clientEnv } from "@/utils/env";

import type { paths } from "@/types";

type ApiClientArguments<S> = {
  url: keyof paths;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  schema?: S;
  body?: Record<string, unknown> | FormData;
  cache?: RequestCache;
  headers?: Record<string, unknown>;
};

export const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: clientEnv.NEXT_PUBLIC_API_ROOT || "http://localhost:3001",
  init: {
    credentials: "include",
  },
});

export const apiClient = async <S extends z.ZodTypeAny>({
  url,
  body,
  method = "GET",
  schema,
  cache = "default",
  headers,
}: ApiClientArguments<S>): Promise<z.infer<S>> => {
  const isBodyFormData = body instanceof FormData;

  const formDataOptions: RequestInit = {
    cache,
    body: isBodyFormData ? body : undefined,
    method,
    credentials: "include",
  };

  const options: RequestInit = {
    cache,
    body: body ? JSON.stringify(body) : null,
    method,
    credentials: "include",
    headers: {
      "Content-Type": body ? "application/json" : "text/plain",
      ...headers,
    },
  };

  const apiResponse = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_ROOT}${url}`,
    isBodyFormData ? formDataOptions : options
  );

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json();
    if (errorData) {
      throw new Error(`Something went wrong. Error: ${errorData.message}`);
    }

    throw new Error("Something went wrong.");
  }

  const contentType = apiResponse.headers.get("content-type");
  if (!contentType) {
    return null;
  }

  const convertedResponse = await apiResponse.json();
  const responseData = convertedResponse.data;

  if (apiResponse.status !== 200) {
    return responseData;
  }

  if (!schema) {
    return responseData;
  }

  const parsedResponse = schema.safeParse(responseData);
  if (!parsedResponse.success) {
    throw new Error(`Parsing error: ${parsedResponse.error.message}`);
  }

  return parsedResponse.data;
};
