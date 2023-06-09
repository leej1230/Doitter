import React, { useState } from "react";
import { Alert, Button, Container, Snackbar, Paper, Typography } from "@mui/material";
import Todo from "../components/todo";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Field {
    idx: number;
    text: string;
    tag: string[];
}

const TweetBox = () => {
  const { user, isLoading } = useUser();
  const [fields, setFields] = useState<Field[]>([
    {
      idx: 0,
      text: "",
      tag: [],
    },
  ]);
  const [render, setRender] = useState<boolean[]>(
    // set boolean array of size 100 to false
    // set first element to true
    Array(100)
      .fill(false)
      .map((_, i) => i === 0)
  );
  const [idx, setIdx] = useState<number>(1);
  const [printing, setPrinting] = useState<number>(1);

    const addField = () => {
        if (printing >= 10 || idx >= 100) {
            return;
        }
        const newFields = [...fields];
        newFields.push({
            idx: idx,
            text: "",
            tag: [],
        });
        setFields(newFields);

        // set the render value for the current idx to true
        const newRender = [...render];
        newRender[idx] = true;
        setRender(newRender);
        setIdx(idx + 1);
        setPrinting(printing + 1);
    };

    const removeField = (index: number) => {
        if (printing == 1) {
            const newFields = [...fields];
            newFields[index].text = "";
            setFields(newFields);
            return;
        }
        const newRender = [...render];
        newRender[index] = false;
        setRender(newRender);
        setPrinting(printing - 1);
    };

    const updateField = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].text = value;
        setFields(newFields);
        // find the last render index that is not empty
        let lastRender = -1;
        for (let i = render.length; i >= 0; i--) {
            if (render[i]) {
                lastRender = i;
                break;
            }
        }
        if (index === lastRender) {
            addField();
        }
    };

    const finalizeTodoList = () => {
        // Get all the todos that are rendered based on fields & render
        // Make JSON and on field todo_list, store array of task names
        const todo_list = [];
        for (let i = 0; i < fields.length; i++) {
            if (render[i] && fields[i].text !== "") {
                todo_list.push(fields[i].text);
            }
        }
        return { todo_list: todo_list, user_id: user?.nickname, checked: Array(todo_list.length).fill(false) };
    }

    const [open, setOpen] = useState(false);
    const handleSubmit = async () => {
      console.log(fields);
      console.log(render);
  
      let req = finalizeTodoList();
      req.user_id = user?.nickname;
      req.checked = Array(req.todo_list.length).fill(false);

      console.log(req)

      await fetch("/api/db/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
  
    };

    const handleClick = () => {
        handleSubmit();
        setOpen(true);
        // clear fields
        setFields([
            {
                idx: 0,
                text: "",
                tag: [],
            },
        ]);
        // clear render
        setRender(
            Array(100).fill(false).map((_, i) => i === 0)
        );
        // clear idx
        setIdx(1);
        // clear printing
        setPrinting(1);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Paper sx={{ border: 1, p: 2, mt: 1 }} elevation={4}>
                <Typography variant="h4" sx={{ p: 2 }}>
                    What are your ToDos?
                </Typography>
                {/* if the field index is set to be rendered, render a todo */}
                {render.map((value, index) => {
                    if (value) {
                        return (
                            <Todo
                                key={index}
                                index={index}
                                text={fields[index]?.text}
                                removeField={removeField}
                                updateField={updateField}
                            />
                        );
                    }
                })}
                <Button onClick={handleClick} variant="contained" sx={{ bottom: 0, left: '80%', mt: 2 }}>
                    SHARE!
                </Button>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Posted your todo list!
                </Alert>
            </Snackbar>
        </>
    );
};

export default TweetBox;
