import { z } from 'zod';

import { clientEnv } from '@/src/utils/env';

type ApiClientArguments<S> = {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  schema?: S;
  body?: Record<string, unknown> | FormData;
  cache?: RequestCache;
  headers?: Record<string, unknown>;
  formData?: boolean;
};

export const apiClient = async <S extends z.ZodTypeAny>({
  url,
  body,
  method = 'GET',
  schema,
  cache = 'default',
  headers,
  formData,
}: ApiClientArguments<S>): Promise<z.infer<S>> => {
  const formDataOptions: RequestInit = {
    cache,
    body: body instanceof FormData ? body : undefined,
    method,
    credentials: 'include',
  };

  const options: RequestInit = {
    cache,
    body: body ? JSON.stringify(body) : null,
    method,
    credentials: 'include',

    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const apiResponse = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_ROOT}/api/${url}`,
    formData ? formDataOptions : options,
  );

  const jsonData = await apiResponse.json();

  if (!schema) {
    return jsonData;
  }

  const parseResponse = schema.safeParse(jsonData);

  if (!parseResponse.success) {
    // eslint-disable-next-line no-console
    console.error(`Parsing error: ${parseResponse.error.message}`);
    return null;
  }

  return parseResponse.data;
};
