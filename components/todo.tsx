import React from 'react';
import { Checkbox, Container, IconButton, TextField } from '@mui/material';
import CloseButton from '@mui/icons-material/Close';

interface TodoProps {
    index: number;
    text: string;
    removeField: (index: number) => void;
    updateField: (index: number, value: string) => void;
}

export default function Todo({ index, text, removeField, updateField }: TodoProps) {
    return (
        <Container sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Checkbox
                checked={false}
                sx={{ left: -20 }}
            />
            <TextField
                hiddenLabel
                variant='outlined'
                onChange={(e) => updateField(index, e.target.value)}
                placeholder='Add a task...'
                value={text}
                fullWidth
            />
            <IconButton onClick={() => removeField(index)}>
                <CloseButton />
            </IconButton>
        </Container>
    );
}