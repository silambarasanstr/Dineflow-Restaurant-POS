// import mongoose from "mongoose";
// import dns from "dns";

// // Set the DNS server to use for resolving hostnames
// dns.setServers(["8.8.8.8"]);

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI);

//     console.log(
//       `✅ MongoDB Connected: ${connection.connection.host}`
//     );
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed");
//     console.error(error.message);

//     process.exit(1);
//   }
// };

// export default connectDB;




import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🍃 MongoDB Connected : ${process.env.MONGO_URI}");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;