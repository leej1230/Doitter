import React from 'react';
{/* 
<li class="list-group-item">
    <div class="media">
        <div class="media-left">
            <a class="avatar avatar-online" href="javascript:void(0)">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="...">
            <i></i>
            </a>
        </div>
        <div class="media-body">
            <small class="text-muted pull-right">Just now</small>
            <h4 class="media-heading">@Ramon Dunn</h4>
            <div>Lorem ipsum Veniam aliquip culpa laboris minim tempor labore
            commodo officia veniam non in in in.</div>
        </div>
    </div>
</li>
*/}

import Image from 'next/image';

interface CardProps {
    user_id: string;
    todo_list: number[];
    checked: boolean[];
}

export default function Card(: CardProps) {
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
                        <h4 className="media-heading">@Ramon Dunn</h4>
                        <div></div>
                    </div>
                </div>
            </li>
        </>

    );
}