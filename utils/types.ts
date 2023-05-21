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
  name: string;
  cnt_used: number;
  cnt_done: number;
}

export interface ToDo2 {
  todo_id: string;
  text: string;
  tag: string[];
}

export interface Post {
  post_id: string;
  title: string;
  content: string;
  author_id: string;
  todo_list: ToDo2[];
  liked_users: string[];
  checked: boolean[];
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  registered_date: Date;
  liked_posts: string[];
}