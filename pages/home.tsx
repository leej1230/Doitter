import React from 'react';
import Feed_Card from '../components/feed_card';
import Sidebar from '../components/sidebar';
import TweetBox from '../components/tweetbox';
import { Post } from '../utils/types';
import { Typography, Box, Container, Grid } from '@mui/material';

const dummyPosts: Post[] = [
    {
        post_id: '1',
        title: 'First post',
        content: 'This is the first post.',
        author_id: 'user1',
        todo_list: [
            {
                todo_id: 'taskA',
                text: 'taskA',
                tag: []
            },
            {
                todo_id: 'taskB',
                text: 'taskB',
                tag: []
            },
            {
                todo_id: 'taskC',
                text: 'taskC',
                tag: []
            }
        ],
        liked_users: ['user2', 'user3'],
        checked: [false, true, false],
    },
    {
        post_id: '2',
        title: 'Second post',
        content: 'This is the second post.',
        author_id: 'user2',
        todo_list: [
            {
                todo_id: 'taskD',
                text: 'taskD',
                tag: []
            },
        ],
        liked_users: ['user1', 'user3'],
        checked: [true],
    },
];

export default function Home() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs>
                    <Sidebar />
                </Grid>
                <Grid item xs={6}>
                    <TweetBox />
                    <Box sx={{ border: 1, p: 2, mt: 2 }}>
                        <Typography variant="h4" sx={{ p: 1 }}>Feed</Typography>

                        {dummyPosts.map((post) => (
                            <Feed_Card
                                key={post.post_id}
                                user_id={post.author_id}
                                todo_list={post.todo_list}
                                checked={post.checked}
                            />
                        ))}
                    </Box>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </>
    );
};
