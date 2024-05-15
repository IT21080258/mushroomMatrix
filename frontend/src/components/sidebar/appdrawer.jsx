import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const AppDrawer = ({ children }) => {
  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Add Users', path: '/user/adduser' },
    { text: 'List Users', path: '/user/listuser' },
    { text: 'Add Growshed', path: '/grow/addgrowshed' },
    { text: 'Manage Growsheds', path: '/grow/growsheds' },
    { text: 'Yield', path: '/grow/yield' },
    { text: 'Contamination', path: '/grow/contamination' }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Drawer variant="permanent" anchor="left" style={{ width: drawerWidth }}>
          <div style={{ padding: '10px 10px 2px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5">MushroomMatrix</Typography>
          </div>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default AppDrawer;
