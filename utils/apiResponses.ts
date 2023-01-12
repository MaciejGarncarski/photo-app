type ResponseNames =
  | 'badRequest'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'invalidMethod'
  | 'success'
  | 'resourceSuccess';

export const httpCodes = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  invalidMethod: 405,
  success: 200,
  resourceSuccess: 201,
} satisfies Record<ResponseNames, number>;

export const responseMessages = {
  badRequest: 'Bad request',
  forbidden: 'Forbidden',
  notFound: 'Not found',
  unauthorized: 'Unauthorized',
  invalidMethod: 'Wrong method',
  success: 'Success',
  resourceSuccess: 'Resource updated successfully',
  badPayload: 'Bad payload',
} satisfies Record<ResponseNames | 'badPayload', string>;
