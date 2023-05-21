// Interface to defining our object of response functions

export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

// Interface to define our Todo model on the frontend
export interface Todo {
  _id?: number
  item: string
  completed: boolean
}

export interface Tag {
  _id?: number
  text: string;
  tag: string[];
}

export interface Tag {
  _id?: number
  name: string;
  cnt_used: number;
  cnt_done: number;
}

export interface Post {
  _id?: number
  post_id: string;
  title: string;
  content: string;
  author_id: string;
  user_id: string;
  todo_list: string[];
  liked_users: string[];
  checked: boolean[];
}

export interface User {
  _id?: number
  user_id: string;
  name: string;
  profile_img: string
  email: string;
  registered_date: Date;
  liked_posts: string[];
}