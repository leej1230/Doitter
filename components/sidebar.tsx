import React from 'react';
import { Button, Box, Container } from '@mui/material';

export default function Sidebar() {
    return (
        <>
            <Container sx={{ position: 'sticky', top: 50 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, mt: 3 }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }}>Home</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, mt: 2 }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }}>Button</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }}>Button</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }}>Button</Button>
                </Box>
            </Container>
        </>
    );
}