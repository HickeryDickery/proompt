import mongoose from "mongoose";

let isConected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
