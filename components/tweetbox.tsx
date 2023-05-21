import React, { useState } from 'react';
import { Paper, Button, Checkbox, Container, IconButton, TextField, Typography } from '@mui/material';
import CloseButton from '@mui/icons-material/Close';

const TextFieldList = () => {
    const [fields, setFields] = useState(['']); // State variable to store the list of text fields

    const addField = () => {
        setFields([...fields, '']); // Add a new empty field to the list
    };

    const removeField = (index: number) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1); // Remove the field at the specified index
        setFields(updatedFields);
    };

    const updateField = (index: number, value: string) => {
        const updatedFields = [...fields];
        updatedFields[index] = value; // Update the field at the specified index
        setFields(updatedFields);
    };

    return (
        <Paper
            sx={{ border: 1, p: 2, mt: 1 }}
            elevation={4}
        >
            <Typography
                variant='h4'
                sx={{ p: 2 }}
            >
                Do It!
            </Typography>
            {fields.map((field, index) => (
                <Container sx={{ display: 'flex', alignItems: 'center', p: 1 }} key={index}>
                    <Checkbox
                        checked={false}
                        sx={{ left: -20 }}
                    />
                    <TextField
                        hiddenLabel
                        id={`outlined-basic-${index}`}
                        variant="outlined"
                        onChange={(e) => updateField(index, e.target.value)}
                        placeholder='Add a task...'
                        fullWidth
                    />
                    <IconButton onClick={() => removeField(index)}>
                        <CloseButton />
                    </IconButton>
                </Container>
            ))}
            <Button
                onClick={addField}
                variant="contained"
                sx={{ mt: 1.5 }}
            >
                Add Field</Button>
        </Paper >
    );
};

export default TextFieldList;