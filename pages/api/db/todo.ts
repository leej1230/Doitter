import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

// Updating text, tag
// GET request

/*
{
    "todo_id": String,
    "text": String,
    "tag": String[],
}
*/

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  
  const {Todo} = await connect();

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS -> Endpoint that returns Todo information based on uid
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const queryResult = Todo.find({_id: req.query.uid});
        res.json(await queryResult);
    },

    // RESPONSE POST REQUESTS -> Submit new todo to database
    // argument will be {text: String, tags: [String]}
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            console.log(req.query);

            const parsedQuery = Object.fromEntries(
                Object.entries(req.query).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return [key, value.map(item => JSON.parse(item))];
                    } else if (typeof value === 'string') {
                        return [key, JSON.parse(value)];
                    }
                    return [key, value];
                })
            );

            console.log(parsedQuery);

            const createdTodo = await Todo.create(parsedQuery); // create a new todo
            res.json(createdTodo); // send the created todo as the response
        } catch(e) {
            console.log(e);
            // catcher(e);
        }
    },

  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

