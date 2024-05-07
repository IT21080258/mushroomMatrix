import React from 'react';
import { Drawer } from '@mui/material';
import { Typography } from '@mui/material';

import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from 'react-router-dom';

const DemandPredicitionLayout = ({ children }) => {

    const openLinkInSameTab = (url) => {
        window.open(url, "_self");
      };
   
     const menuItems = [
       {
           text: 'Damand Dashboard',
           icon: <GridViewOutlinedIcon color='secondary' />,
           path: '/demand-predicition-dashboard'
       },
   
       {
           text: 'Demand Profile',
           icon: <PersonOutlinedIcon color='secondary' />,
           path: '/demand-predicition-profile'
       }
   
     ]
   
     return (
       <div className='demand-predicition-layout-container'>
   
           <Drawer 
             variant='permanent'
             anchor='left'
           >
               
               <div>
                   <Typography variant='h5'>
                       Menu
                   </Typography>
               </div>
   
               <List>
                   {menuItems.map( item => (
                       <Link to={item.path} style={{ textDecoration: 'none' }}>
                       <ListItem
                           button
                           key={item.text}
                       >
                           <ListItemIcon>{item.icon}</ListItemIcon>
                           <ListItemText primary={item.text}/>
                       </ListItem>
                       </Link>
                   ))}
                   <ListItem
                       button
                       key='Log Out'
                       onClick={() => openLinkInSameTab('/sign-in')}
                   >
                       <ListItemIcon><LogoutOutlinedIcon  color='secondary' /></ListItemIcon>
                       <ListItemText primary='Log Out'/>
                   </ListItem>
               </List>
   
           </Drawer>
   
   
           <div>
               { children }
           </div>
       </div>
     )
   }

export default DemandPredicitionLayout;