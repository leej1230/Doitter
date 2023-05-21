import React, { useEffect, useState } from "react";
// https://www.bootdey.com/snippets/view/twitter-feeds#css

import Image from "next/image";
import { Todo, User } from "@/utils/types";
import {
  Paper,
  Typography,
  Stack,
  Container,
  Checkbox,
  Avatar,
} from "@mui/material";

interface CardProps {
  user_id: string;
  todo_list: string[];
  checked: boolean[];
}

export default function Card({ user_id, todo_list, checked }: CardProps) {
  const [cardInfo, setCardInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCard = async () => {
    try {
      const response = await fetch(`/api/db/user?user_id=${user_id}`);
      const data = await response.json();
      console.log(data[0]);
      setCardInfo(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <>
      {isLoading ? (
        // Show loading indicator or placeholder text
        <Typography>Loading...</Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 1, mt: 1, mb: 1.5 }}>
          <Stack>
            <Container
              sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1 }}
            >
              <Avatar
                src={cardInfo?.profile_img}
                sx={{ marginRight: "0.5rem", left: -18 }}
              ></Avatar>
              {cardInfo && (
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {cardInfo.user_id}
                </Typography>
              )}
            </Container>
            <Stack>
              {todo_list.map((todo, index) => (
                <Container
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={checked[index]}
                    disableRipple={true}
                    disableFocusRipple={true}
                    sx={{ left: -20 }}
                  ></Checkbox>
                  <Typography variant="body1">{todo}</Typography>
                </Container>
              ))}
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  );
}
