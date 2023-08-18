import { z } from 'zod';

const datelike = z.union([z.number(), z.string(), z.date()]);
export const datelikeToDate = datelike.pipe(z.coerce.date());
