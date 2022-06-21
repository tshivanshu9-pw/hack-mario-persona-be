import { Types } from 'mongoose';

/** It extends document fields to schema defnition*/
export type Document<T> = T & {
  _id: Types.ObjectId;
  created_at: Types.ObjectId;
  updated_at: Types.ObjectId;
};

// //override document fields with U object
// export type PopulatedDocument<T, U> = Omit<Document<T>, keyof U> & U;

// //drop or select fields
// export type ProjectedDocument<T, U = {}> = U extends { omit: object }
//   ? Omit<Document<T>, keyof U['omit']>
//   : U extends { pick: object }
//   ? Pick<Document<T>, keyof U['pick']>
//   : Document<T>;
