# DoItter
## Find Inspiration in Everyday Successes
## Inspiration
Sometimes we need a reminder to celebrate our small successes in life.  
Although social media is often used to glamorize our long-term goals, it's even more important to enjoy life every small step of the way.
## What it does
DoItter allows users to share their To-Do lists and celebrate checking-off tasks along with your friends. Simply login with your Google account, add some items that you want to track, then share! You can see your friends' to-do lists in a Twitter-like feed.

## How we built it
First, we brainstormed ideas and drew rough design diagrams for our end-product.  
Then, we split the tasks up into steps and organized them on a Trello board.  
For the Front-End we utilized React Next.js and the Material UI Framework.  
In the Back-End, we used Auth0 for OAuth authentication, MongoDB to save To-Do lists and user-ids, and Vercel to deploy the web application.

## Challenges we ran into
In the Front-End, the Text-field used to create To-Do lists was very tricky to implement. We wanted the functionality to automatically show new to-do items as the user filled out more to-dos but also be able to delete to-do items. The copying and deleting ended up creating a lot of unexpected behaviors. In the end, a solution was found where the app keeps adding new to-dos to an array, but a separate boolean array marks whether that to-do item will be rendered.

## Accomplishments that we're proud of
In the Front-End, I (Masaki) had never done any Front-End development before and really struggled in creating anything in the beginning hours of the Hackathon. However by the end of the Hackathon, I felt much more comfortable with using the technologies and am really proud to have been able to create a nice-looking product.

In the Back-End, the project required to have complex but flexible manipulation data. So the process of creating the data schema was tough challenge for us. However, as soon as we got clear idea for data schema, MongoDB made us easy to accomplish what we were imagining in our head.

## What we learned
Throughout this project, we learned a fundamental skill of pair programming. We helped each other and overcome technical challenges. On top of that, we realized the significance of using version control when programming with multiple people. Using a version control system allowed us to smoothly work on independently but able to collaborate on our tasks.

## What's next for DoItter
Even though we aimed to make a platform like Twitter, due to the limit of human resources and time, we weren't able to implement several crucial fuctionalities. For example, there is no 'like' functionality which is important for people to motivate to work on todo list, there is no functionalities to check the list. Since the API to make the change on backend is already developed, we would like to continue our work and implement those functionalities.  
We also want to add optional tags that can be added to To-Do items. Tags will be re-used so that users can keep track of their accomplishments.  
For example, a 'Gym' or 'Exercise' tag could be added to To-Do items. On your profile page, you could then see how many times you have successfully checked-off exercise!