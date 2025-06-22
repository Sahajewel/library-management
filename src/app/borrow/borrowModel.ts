import { model, Schema } from "mongoose";
import { Iborrowed } from "./iborrow";

const borrowSchema = new Schema<Iborrowed>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be positive"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model<Iborrowed>("Borrow", borrowSchema);
