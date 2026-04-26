import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./types";
dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI || "");

export const collection = client.db("team-project").collection<User>("users");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export function getDB() {
  return client.db("team-project");
}

export async function connect() {
  try {
    await client.connect();

    console.log("Connected to database");
    await insertAdmin();
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error);
  }
}

export async function insertAdmin() {
  if ((await collection.countDocuments()) > 0) {
    return;
  }
  let username: string | undefined = process.env.ADMIN_1;
  let password: string | undefined = process.env.PASS_1;
  if (username === undefined || password === undefined) {
    throw new Error("Please fill the env files!");
  }
  await collection.insertOne({
    username: username,
    password: await bcrypt.hash(password, 10),
    role: "ADMIN",
  });
}

export async function login(username: string, password: string) {
  if (username === "" || password === "") {
    throw new Error("Username and password required");
  }
  let user: User | null = await collection.findOne<User>({
    username: username,
  });
  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password incorrect");
    }
  } else {
    throw new Error("User not found");
  }
}
