import { Model, model, Schema } from "mongoose";
import { BookDocument, Ibook } from "./ibook";

const bookSchema = new Schema<Ibook, Model<Ibook>, BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "This is not valid genre",
      },
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

// bookSchema.methods.updateCopies = async function(borrowedQty: number) {
// //     console.log(this)
// //     this.copies -= borrowedQty;
// //     if(this.copies <= 0){
// //         this.copies = 0;
// //         this.available = false;
// //     }
// //     await this.save();
// // };
bookSchema.method("updateCopies", async function (borrowedQty: number) {
  console.log(this);
  this.copies -= borrowedQty;
  if (this.copies <= 0) {
    this.copies = 0;
    this.available = false;
  }
  await this.save();
});
bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  }
  next();
});
bookSchema.post("save", function (doc) {
  console.log("book save successfully", doc);
});
export const Book = model("Book", bookSchema);
