import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, IconButton, TextField } from '@mui/material';
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
        <Box sx={{ border: 1, p: 3 }}>
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
            >
                Add Field</Button>
        </Box>
    );
};

export default TextFieldList;