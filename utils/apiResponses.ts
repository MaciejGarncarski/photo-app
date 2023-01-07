type ResponseNames =
  | 'badRequest'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'invalidMethod'
  | 'success'
  | 'resourceSuccess';

export const httpCodes: Record<ResponseNames, number> = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  invalidMethod: 405,
  success: 200,
  resourceSuccess: 201,
};

export const responseMessages: Record<ResponseNames, string> = {
  badRequest: 'Bad request',
  forbidden: 'Forbidden',
  notFound: 'Not found',
  unauthorized: 'Unauthorized',
  invalidMethod: 'Wrong method',
  success: 'Success',
  resourceSuccess: 'Resource updated successfully',
};
