//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    text: String,
    tag: [String],
  })

  // TAG SCHEMA
  const TagSchema = new mongoose.Schema({
    name: String,
    cnt_used: Number,
    cnt_done: Number,
  })

  // POST SCHEMA
  const PostSchema = new mongoose.Schema({
    post_id: String,
    user_id: String,
    created: Date,
    todo_list: [String],
    liked_users: [String],
    checked: [Boolean],
  })

  // USER SCHEMA
  const UserSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    registered_date: Date,
    liked_posts: [String],
  })

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
  const Tag = mongoose.models.Tag || mongoose.model("Tag", TagSchema)
  const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)
  const User = mongoose.models.User || mongoose.model("User", UserSchema)

  return { conn, Todo, Tag, Post, User }
}