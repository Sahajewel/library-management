import { Types } from "mongoose";

export interface Iborrowed {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}