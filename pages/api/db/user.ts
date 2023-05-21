import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

// GET information: GET
// Update username: POST
// Update liked post: PUT
// Remove liked post: PUT

/*
{
    "user_id": String,
    "name": String,
    "profile_img": String
    "email": String,
    "registered_date": Date,
    "liked_posts": String[]
}
*/

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  
  const {User} = await connect();

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS -> Endpoint that returns username and list of id of liked posts
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const queryResult = User.find({user_id: req.query.user_id});
        res.json(await queryResult);
    },

    // RESPONSE POST REQUESTS -> Initialize username and blank liked post list
    // argument will be {user_id: String, name: String}
    // user_id is the id of the user given by Auth0, name is the username that user wants to use
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            console.log(req.body);

            const existingUser = await User.findOne({ user_id: req.body.user_id });

            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const parsedQuery = Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return [key, value.map(item => JSON.parse(item))];
                    } else if (typeof value === 'string') {
                        return [key, value];
                    }
                    return [key, value];
                })
            );

            console.log(parsedQuery);

            parsedQuery["liked_posts"] = [];
            parsedQuery["registered_date"] = Date.now();

            const createdPost = await User.create(parsedQuery); // create a new todo
            res.json(createdPost); // send the created todo as the response
        } catch(e) {
            console.log(e);
            catcher(e);
        }
    },

    PUT:async (rep:NextApiRequest, res: NextApiResponse) => {
        console.log(rep.query);
        // Check if the request json has field liked_post
        if (rep.query.liked_post) {
            // Request for updating Liked Post for user
            try {
                const updateLikedList = await User.findOneAndUpdate(
                  {user_id: rep.query.user_id},
                  { $addToSet: { liked_posts: rep.query.liked_post } },
                  { new: true }
                );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }

        } else if(rep.query.disliked_post) {

            // Request for removing Liked Post for user
            try {
                const updateChecked = await User.findOneAndUpdate(
                    {user_id: rep.query.user_id},
                    {$pull: {liked_posts: rep.query.disliked_post}},
                    {new: true}
                    )
                res.json(updateChecked);
            } catch (e) {
                catcher(e)
            }

        }

    } 

  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

