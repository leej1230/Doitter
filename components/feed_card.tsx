import React from 'react';
// https://www.bootdey.com/snippets/view/twitter-feeds#css

import Image from 'next/image';
import { ToDo2 } from '@/utils/types';
import styles from '../app/page.module.css'

interface CardProps {
    user_id: string;
    todo_list: ToDo2[];
    checked: boolean[];
}

export default function Card({ user_id, todo_list, checked }: CardProps) {
    return (
        <>
            <li className={styles.list_group_item}>
                <div className={styles.media}>
                    <div className={styles.media}>
                        <a className="avatar avatar-online" href="javascript:void(0)">
                            <Image src="/avatar1.png" alt="..." width={50} height={50} />
                            <i></i>
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{user_id}</h4>
                        <ul>
                            {todo_list.map((todo, index) => (
                                <li key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={`flexCheckDefault${index}`} // Use a unique ID for each checkbox
                                        checked={checked[index]} // Set the checked state based on the 'checked' property of each todo item
                                    />
                                    <label className="form-check-label" htmlFor={`flexCheckDefault${index}`}>
                                        {todo.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        </>

    );
}