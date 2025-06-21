import { Model } from "mongoose";

export interface Ibook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}
export interface BookDocument extends Model<Ibook> {
  updateCopies(borrowesQty: number): Promise<void>;
}
