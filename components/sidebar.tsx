import React from 'react';
import { Button, Box, Stack, TextField } from '@mui/material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SearchIcon from '@mui/icons-material/Search';

export default function Sidebar() {
    return (
        <>
            <Stack sx={{ position: 'sticky', top: 50 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ minWidth: 200 }}
                        style={{ fontSize: 25 }}
                        startIcon={<LibraryAddCheckIcon />}
                    >Home</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <TextField
                        variant="outlined"
                        color="primary"
                        sx={{ minWidth: '60%' }}
                        style={{ fontSize: 25 }}
                        InputProps={{
                            startAdornment:
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <SearchIcon />
                                </Box>
                        }}
                        placeholder='Search'
                    ></TextField>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }} style={{ fontSize: 20 }}>Profile</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }} style={{ fontSize: 20 }}>Notifications</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="text" color="primary" sx={{ minWidth: 200 }} style={{ fontSize: 20 }}>Button</Button>
                </Box>
            </Stack >
        </>
    );
}