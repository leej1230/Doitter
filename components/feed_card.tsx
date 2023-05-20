import React from 'react';
// https://www.bootdey.com/snippets/view/twitter-feeds#css

import Image from 'next/image';

interface CardProps {
    user_id: string;
    todo_list: string[];
    checked: boolean[];
}

export default function Card({ user_id, todo_list, checked }: CardProps) {
    return (
        <>
            <li className="list-group-item">
                <div className="media">
                    <div className="media-left">
                        <a className="avatar avatar-online" href="javascript:void(0)">
                            <Image src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." />
                            <i></i>
                        </a>
                    </div>
                    <div className="media-body">
                        <small className="text-muted pull-right">Just now</small>
                        <h4 className="media-heading">{user_id}</h4>
                        <div></div>
                    </div>
                </div>
            </li>
        </>

    );
}