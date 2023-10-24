import {  Drawer, List, ListItem, ListItemButton, ListItemText, TextField,useTheme, useMediaQuery, Divider, ListItemAvatar, Avatar } from '@mui/material'
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

    console.log("filterEmployee",props.emp);
  return (
    <div>
        <Drawer open={props.open} onClose={handleClose} sx={{".MuiDrawer-paper": isXsScreen?{width:"33vw"}:null}}>

        {isXsScreen?null:<TextField type='search' placeholder='Search' size='small' 
        value={props.name} onChange={searchName} sx={{width:"19vw"}}
        />}
        {isXsScreen?
        <List sx={{paddingTop:'0px'}}>
  {props.emp?.map((text, index) => (
    <>
    <ListItem key={text}  

    disablePadding>
      <ListItemButton selected={selectedIndex==index} sx={{ bgcolor: '#383c8dd4',color:"black","&:hover":{color:"black"} }} onClick={()=>getempFromsearch(text.name)}>
      
      <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`http://localhost:4000/${text.image}`} /> 
                  
        </ListItemAvatar>
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
</ListItem><Divider />
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