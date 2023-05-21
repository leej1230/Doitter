import React from 'react';
import { Button, Box, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <>
            <Stack sx={{ position: 'sticky', top: 50 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} >
                    <Link href="/home">
                        <Image src="/logo.jpeg" alt={''} width={100} height={100}></Image>
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ minWidth: 200 }}
                        style={{ fontSize: 25 }}
                        href="/home"
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
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ minWidth: 200 }}
                        style={{ fontSize: 20 }}
                        startIcon={<AccountBoxIcon />}
                    >Profile</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ minWidth: 200 }}
                        style={{ fontSize: 20 }}
                        startIcon={<NotificationsIcon />}
                    >Notifications</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ minWidth: 200 }}
                        style={{ fontSize: 20 }}
                        href="/api/auth/logout"
                        startIcon={<LogoutIcon />}
                    >Logout</Button>
                </Box>
            </Stack >
        </>
    );
}