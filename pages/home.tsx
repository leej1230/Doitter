import React, { useEffect, useState } from "react";
import Feed_Card from "../components/feed_card";
import { Post, Todo } from "../utils/types";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/sidebar";
import TweetBox from "../components/tweetbox";
import { Typography, Container, Link, Paper, Grid } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

// const dummyPosts: Post[] = [
//     {
//         post_id: '1',
//         title: 'First post',
//         content: 'This is the first post.',
//         author_id: 'user1',
//         todo_list: [
//             {
//                 todo_id: 'taskA',
//                 text: 'taskA',
//                 tag: []
//             },
//             {
//                 todo_id: 'taskB',
//                 text: 'taskB',
//                 tag: []
//             },
//             {
//                 todo_id: 'taskC',
//                 text: 'taskC',
//                 tag: []
//             }
//         ],
//         liked_users: ['user2', 'user3'],
//         checked: [false, true, false],
//     },
//     {
//         post_id: '2',
//         title: 'Second post',
//         content: 'This is the second post.',
//         author_id: 'user2',
//         todo_list: [
//             {
//                 todo_id: 'taskD',
//                 text: 'taskD',
//                 tag: []
//             },
//         ],
//         liked_users: ['user1', 'user3'],
//         checked: [true],
//     },
// ];

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) {
    // Handle loading state if needed
    return <div>Loading...</div>;
  }

  if (!user) {
    // User is not logged in, redirect to a different page
    router.push("/login");
    return null; // Render nothing while redirecting
  }

  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/db/post");
      const json = await response.json();
      setFeedPosts(json);
    } catch (e) {
      console.error("Error happened: ", e);
    }
  };

  const uploadUsers = async () => {
    const postData = { user_id: user.nickname, profile_img: user.picture };
    console.log(postData);

    await fetch("/api/db/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    uploadUsers();
  }, []);

  return (
    <>
      <Grid container spacing={0.2}>
        <Grid item xs>
          <Sidebar />
        </Grid>
        <Grid item xs={5.5}>
          <TweetBox />
          <Paper sx={{ border: 1, p: 2, mt: 2, minHeight: 800 }} elevation={4}>
            <Typography variant="h4" sx={{ p: 1 }}>
              Feed
            </Typography>
            {feedPosts ? (
              feedPosts.map((post) => (
                <Feed_Card
                  key={post._id}
                  user_id={post.user_id}
                  todo_list={post.todo_list}
                  checked={post.checked}
                />
              ))
            ) : (
              <h3>No feed!</h3>
            )}
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Container sx={{ justifyContent: "center", display: "flex", mt: 3 }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          Do It&apos;er created by{" "}
        </Typography>
        <Link
          variant="h6"
          sx={{ m: 1, ml: 0, mr: 0 }}
          href="https://github.com/leej1230"
        >
          Jaewoo Lee
        </Link>
        <Typography variant="h6" sx={{ m: 1 }}>
          and
        </Typography>
        <Link
          variant="h6"
          sx={{ m: 1, ml: 0, mr: 0 }}
          href="https://github.com/takeuchi-masaki"
        >
          Masaki Takeuchi
        </Link>
        <Typography variant="h6" sx={{ m: 1 }}>
          for HackDavis 2023
        </Typography>
      </Container>
    </>
  );
}
