import { z } from 'zod';

import { clientEnv } from '@/src/utils/env';

type ApiClientArguments<S> = {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  schema?: S;
  body?: Record<string, unknown> | FormData;
  cache?: RequestCache;
  headers?: Record<string, unknown>;
};

export const apiClient = async <S extends z.ZodTypeAny>({
  url,
  body,
  method = 'GET',
  schema,
  cache = 'default',
  headers,
}: ApiClientArguments<S>): Promise<z.infer<S>> => {
  const isBodyFormData = body instanceof FormData;

  const formDataOptions: RequestInit = {
    cache,
    body: isBodyFormData ? body : undefined,
    method,
    credentials: 'include',
  };

  const options: RequestInit = {
    cache,
    body: body ? JSON.stringify(body) : null,
    method,
    credentials: 'include',
    headers: {
      'Content-Type': body ? 'application/json' : 'text/plain',
      ...headers,
    },
  };

  const apiResponse = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_ROOT}/api/${url}`,
    isBodyFormData ? formDataOptions : options,
  );

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json();

    if (errorData) {
      throw new Error(errorData.message);
    }

    throw new Error(`Cannot fetch data, status: , ${apiResponse.status}`);
  }

  const jsonData = await apiResponse.json();

  if (apiResponse.status !== 200) {
    return jsonData;
  }

  if (!schema) {
    return jsonData;
  }

  const parsedResponse = schema.safeParse(jsonData);

  if (!parsedResponse.success) {
    throw new Error(`Parsing error: ${parsedResponse.error.message}`);
  }

  return parsedResponse.data;
};
