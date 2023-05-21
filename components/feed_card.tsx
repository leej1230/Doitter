import React from "react";
// https://www.bootdey.com/snippets/view/twitter-feeds#css

import Image from "next/image";
import { ToDo2 } from "@/utils/types";
import { Checkbox } from "@mui/material";
import styles from "../components/feed_card.module.css";

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
              <Image src="/avatar1.png" alt="..." width={50} height={50} />
              <i></i>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{user_id}</h4>
            <ul>
              {todo_list.map((todo, index) => (
                <li key={index}>
                  <Checkbox checked={checked[index]} />
                  <span>{todo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </>
  );
}
