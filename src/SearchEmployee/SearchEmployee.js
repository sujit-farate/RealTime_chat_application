import {  Drawer, List, ListItem, ListItemButton, ListItemText, TextField,useTheme, useMediaQuery, Divider } from '@mui/material'
import React, { useState } from 'react'


const SearchEmployee = (props) => {
    const[localvalue,setLocalvalue]=useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const theme = useTheme();

    const isXsScreen = useMediaQuery(theme.breakpoints.down('md'));
    console.log(isXsScreen);

    const handleClose=()=>{
        props.setOpen(false)
        props.setName("")
    }

    const searchName=(e)=>{
        props.setName(e.target.value)
    }
    const getempFromsearch=(name)=>{
        props.setLocalvalue(name)
        props.setOpen(false)
// console.log(name)
    }

    const getEmpId=(id,name,index)=>{
        setSelectedIndex(index)
        console.log("click on id ",id);
        // localStorage.setItem("userid",name)
        // setLocalvalue(localStorage.getItem("userid"))
        setLocalvalue(name)
        // console.log("click on id ",id);
        // console.log(localStorage.getItem("userid"));
      
      }

    console.log("filterEmployee",props.filterEmployee);
  return (
    <div>
        <Drawer open={props.open} onClose={handleClose}>

        <TextField type='search' placeholder='Search' size='small' 
        value={props.name} onChange={searchName} 
        />
        {isXsScreen?
        <List sx={{paddingTop:'0px'}}>
  {props.emp?.map((text, index) => (
    <>
    <ListItem key={text}  

    disablePadding>
      <ListItemButton selected={selectedIndex==index} sx={{ bgcolor: '#383c8dd4',color:"black","&:hover":{color:"black"} }} onClick={()=>getempFromsearch(text.name)}>
        {/* <ListItemIcon>
          {index % 2 === 0 ? <AccountCircleIcon  /> : <AccountCircleIcon  />}
        </ListItemIcon> */}

                {/* <ListItemAvatar>
                  {index % 2 === 0?<Avatar alt="Remy Sharp" src="/images/profile1.jpg" />: <Avatar alt="Remy Sharp" src="/images/profile.JPG" /> }
         
        </ListItemAvatar> */}

        <ListItemText  primary={text.name}  
        sx={selectedIndex==index?{color:"black"}:{color:"white","&:hover":{color:"black"}}}
        // sx={{color:"white","&:hover":{color:"black"}}}
        // secondary={text.name=="sujit"&&lastmsg.message} 
        />
      </ListItemButton>
    </ListItem> <Divider />
    </>
  ))}
</List>: <List>{

props.filterEmployee?props.filterEmployee.map(item=>{
    return(<>
        <ListItem><ListItemButton onClick={()=>getempFromsearch(item.name)}>
    <ListItemText primary={item.name}/>
    </ListItemButton>
</ListItem>
</>)
}):null
}

</List>}

{/* {props.name?<List>{

props.filterEmployee?props.filterEmployee.map(item=>{
    return(<>
        <ListItem><ListItemButton onClick={()=>getempFromsearch(item.name)}>
    <ListItemText primary={item.name}/>
    </ListItemButton>
</ListItem>
</>)
}):null
}

</List>:
 <List sx={{paddingTop:'0px'}}>
  {props.emp?.map((text, index) => (
    <>
    <ListItem key={text}  

    disablePadding>
      <ListItemButton selected={selectedIndex==index} sx={{ bgcolor: '#383c8dd4',color:"black","&:hover":{color:"black"} }} onClick={()=>getempFromsearch(text.name)}>
       

        <ListItemText  primary={text.name}  
        sx={selectedIndex==index?{color:"black"}:{color:"white","&:hover":{color:"black"}}}
       
        />
      </ListItemButton>
    </ListItem> <Divider />
    </>
  ))}
</List>} */}
       
        </Drawer>
    </div>
  )
}

export default SearchEmployee