import React from 'react';
import Feed_Card from '../components/feed_card';
import { Post, ToDo2 } from '../utils/types';
import styles from '../app/page.module.css';

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
            <h1>Dummy home page</h1>
            <ul className="list-group-item">
                {dummyPosts.map((post) => (
                    <Feed_Card
                        key={post.post_id}
                        user_id={post.author_id}
                        todo_list={post.todo_list}
                        checked={post.checked}
                    />
                ))}
            </ul>
        </>
    );
};
