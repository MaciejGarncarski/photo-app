type ResponseNames = 'Bad_request' | 'Unauthorized' | 'Forbidden' | 'Not_found' | 'Wrong_method' | 'Success';

export const httpCodes: Record<ResponseNames, number> = {
  Bad_request: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Not_found: 404,
  Wrong_method: 405,
  Success: 200,
};

export const responseMessages: Record<ResponseNames, string> = {
  Bad_request: 'Bad request',
  Forbidden: 'Forbidden',
  Not_found: 'Not found',
  Success: 'Success',
  Unauthorized: 'Unauthorized',
  Wrong_method: 'Wrong method',
};
