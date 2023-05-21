import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

// API that returns all the list of posts, sort by time: GET
// POST the given post inform: POST
// UPDATE like: PUT
// UPDATE Checked or not: PUT

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  
  const {Post} = await connect();

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS -> API that returns all the list of posts, sort by time
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const queryResult = Post.find({}).sort({created: -1});
        res.json(await queryResult);
    },

    // RESPONSE POST REQUESTS -> POST new post 
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const postData = JSON.parse(req.body); // parse the request body
            const createdPost = await Post.create(postData); // create a new todo
            res.json(createdPost); // send the created todo as the response
        } catch(e) {
            catcher(e);
        }
    },

    PUT:async (rep:NextApiRequest, res: NextApiResponse) => {
        
        // Check if the request json has field liked_user
        if (rep.body.liked_user) {
            // Request for updating Liked_users of the post
            try {
                await Post.findByIdAndUpdate(
                  rep.body._id,
                  { $push: { liked_users: rep.body.liked_user } },
                  { new: true }
                );
            } catch (e) {
                catcher(e)
            }

        } else {

            // Request for updating check mark
            try {
                await Post.findOneAndUpdate(
                    {_id:rep.body._id},
                    {$set: {[`checked.${rep.body.index}`]: rep.body.newValue}},
                    {new: true}
                )
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