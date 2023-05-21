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
          console.log(req.body);
      
          const parsedQuery = Object.fromEntries(
            Object.entries(req.body).map(([key, value]) => {
              try {
                if (Array.isArray(value)) {
                  return [key, value.map(item => JSON.parse(item))];
                } else if (typeof value === 'string') {
                  return [key, JSON.parse(value)];
                }
                return [key, value];
              } catch (error) {
                console.log(`Error parsing ${key}: ${error}`);
                return [key, value];
              }
            })
          );

          parsedQuery["created"] = Date.now();
      
          const createdPost = await Post.create(parsedQuery);
          res.json(createdPost);
        } catch (e) {
          console.log(e);
          catcher(e);
        }
      },
      

    PUT:async (rep:NextApiRequest, res: NextApiResponse) => {
        
        // Check if the request json has field liked_user
        if (rep.query.liked_user) {
            // Request for updating Liked_users of the post
            try {
                const updateLikedList = await Post.findByIdAndUpdate(
                  rep.query._id,
                  { $push: { liked_users: rep.query.liked_user } },
                  { new: true }
                );
                res.json(updateLikedList)
            } catch (e) {
                catcher(e)
            }

        } else {

            // Request for updating check mark
            try {
                const updateChecked = await Post.findOneAndUpdate(
                    {_id:rep.query._id},
                    {$set: {[`checked.${rep.query.index}`]: rep.query.newValue}},
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

