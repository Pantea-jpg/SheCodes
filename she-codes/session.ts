// const mongoStore = MongoStore.create({
//   mongoUrl: MONGO_URI,
//   dbName: "project",
//   collectionName: "sessions",
// });

// mongoStore.on("error", (error) => {
//   console.log(error);
// });

// declare module "express-session" {
//   export interface SessionData {
//     user?: User;
//     message: {
//       text: string;
//       success: boolean;
//     };
//   }
// }

// export default session({
//     secret: process.env.SESSION_SECRET ?? "my-project-secret",
//     store: mongoStore,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// });
