import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./interfaces/interface";
import { hash } from "node:crypto";
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
  let email: string = process.env.ADMIN_1 ?? "";
  let fname: string = process.env.ADMIN_FNAME ?? "";
  let lname: string = process.env.ADMIN_LNAME ?? "";
  let password: string = process.env.PASS_1 ?? "";
  if (email === undefined || password === undefined) {
    throw new Error("Please fill the env files!");
  }
  await collection.insertOne({
    fname: fname,
    lname: lname,
    email: email,
    password: await bcrypt.hash(password, 10),
    role: "ADMIN",
  });
}

export async function login(email: string, password: string) {
  if (email === "" || password === "") {
    throw new Error("Username and password required");
  }
  let user: User | null = await collection.findOne<User>({
    email: email,
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

export async function register(user: User) {
  const email = user.email.trim().toLowerCase();
  const lname = user.lname.trim();
  const fname = user.fname.trim();
  const password = user.password;

  if (!email || !lname || !fname || !password) {
    throw new Error("Please fill all fields!");
  }

  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    throw new Error("Email bestaat al!");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const result = await collection.insertOne({
    fname,
    lname,
    email,
    password: hashedPass,
    role: "USER",
  });

  return result.acknowledged;
}
