import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

// Initialize Tag -> POST
// Get request
// Increment count based on tag -> PUT

/*
{
    "user_id": String,
    "name": String[],
    "cnt_used": Integer[],
    "cnt_done": Integer[],
}
*/

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  
  const {Tag} = await connect();

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS -> Endpoint that returns Todo information based on uid
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const queryResult = Tag.find({user_id: req.query.user_id});
        res.json(await queryResult);
    },

    // RESPONSE POST REQUESTS -> Initialize Tags
    // argument will be {userid: String}
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            console.log(req.query);

            const parsedQuery = Object.fromEntries(
                Object.entries(req.query).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return [key, value.map(item => JSON.parse(item))];
                    } else if (typeof value === 'string') {
                        return [key, (value)];
                    }
                    return [key, value];
                })
            );

            parsedQuery['name'] = ["Work", "School", "Personal", "Exercise", "Other"];
            parsedQuery['cnt_used'] = {
                "Work": 0,
                "School": 0,
                "Personal": 0,
                "Exercise": 0,
                "Other": 0
            };
            parsedQuery['cnt_done'] = {
                "Work": 0,
                "School": 0,
                "Personal": 0,
                "Exercise": 0,
                "Other": 0
            };

            const createdTodo = await Tag.create(parsedQuery); // create a new todo
            res.json(createdTodo); // send the created todo as the response
        } catch(e) {
            console.log(e);
            catcher(e);
        }
    },

    PUT:async (rep:NextApiRequest, res: NextApiResponse) => {
        
        // Check if the request json has field liked_post
        if (rep.query.increment_used_tag) {
            console.log(rep.query)
            try {
                const updateLikedList = await Tag.findOneAndUpdate(
                    { user_id: rep.query.user_id },
                    { $inc: { [`cnt_used.${req.query.increment_used_tag}`]: 1 } },
                    { new: true }
                  );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }
        } else if (rep.query.increment_done_tag) {

            try {
                const updateLikedList = await Tag.findOneAndUpdate(
                  { user_id: rep.query.user_id},
                    { $inc: { [`cnt_used.${req.query.increment_done_tag}`]: 1 } },
                  { new: true }
                );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }
        } else if (rep.query.decrement_used_tag) {

            try {
                const updateLikedList = await Tag.findOneAndUpdate(
                  { user_id: rep.query.user_id},
                  { $inc: { [`cnt_used.${req.query.decrement_used_tag}`]: -1 } },
                  { new: true }
                );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }

        } else if (rep.query.decrement_done_tag) {
            // Request for removing Liked Post for user
            try {
                const updateLikedList = await Tag.findOneAndUpdate(
                  { user_id: rep.query.user_id},
                  { $inc: { [`cnt_used.${req.query.decrement_done_tag}`]: -1 } },
                  { new: true }
                );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }
        }

    },

  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

