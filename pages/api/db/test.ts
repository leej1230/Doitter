// https://dev.to/alexmercedcoder/building-a-full-stack-todo-list-with-mongodb-nextjs-typescript-2f75

import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(await Todo.find({}).catch(catcher))
    },

    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect(); // connect to the database
      try {
        const todoData = JSON.parse(req.body); // parse the request body
        const createdTodo = await Todo.create(todoData); // create a new todo
        res.json(createdTodo); // send the created todo as the response
      } catch (e) {
        catcher(e); // handle the error
      }
    },
    
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler