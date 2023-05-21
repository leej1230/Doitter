import React from 'react';
// https://www.bootdey.com/snippets/view/twitter-feeds#css

import Image from 'next/image';
import { ToDo2 } from '@/utils/types';
import { Paper, Typography, Checkbox, Avatar } from '@mui/material';

interface CardProps {
    user_id: string;
    todo_list: ToDo2[];
    checked: boolean[];
}

export default function Card({ user_id, todo_list, checked }: CardProps) {
    return (
        <>
            <Paper
                elevation={3}
                sx={{ p: 1, my: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/avatar1.png" sx={{ marginRight: '0.5rem' }}></Avatar>
                    <Typography variant="h6">{user_id}</Typography>
                </div>
                {todo_list.map((todo, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            checked={checked[index]}
                            disableRipple={true}
                            disableFocusRipple={true}></Checkbox>
                        <Typography variant="body1">{todo.text}</Typography>
                    </li>
                ))}
            </Paper >
        </>
    );
}