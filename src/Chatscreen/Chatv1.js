
import io from "socket.io-client"
import {
    Box,
    Typography,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Button,
    List,
    IconButton,
    ListItemAvatar,
    Avatar,
    useMediaQuery,useTheme
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./chat.css";
  import { datetime } from "../Common_funtions/common_function";
  import SendIcon from "@mui/icons-material/Send";
  
  let socket=io("http://localhost:4000")
const Chatv1 = (props) => {

const theme = useTheme();

const isXsScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [message, setMessage] = useState(null);
    const[inputMessage,setInputMessage]=useState("")
    const[isTyping,setIsTyping]=useState(false)
    const [typingTimeout, setTypingTimeout] = useState(null);
    const[selectChatid,setSelectChatid]=useState(null)

socket.on("getData",(msg)=>{
          console.log("msgs",msg)
          setMessage(msg)
        })

    useEffect(()=>{

     
      let msg = JSON.stringify({
        // key:`${props.email}+${props.localvalue}`
        Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
      });

        socket.emit("recieveMsg",msg)
      
       

        setInputMessage("")

    },[props.localvalue])


  
socket.on("checkTyping",(msg)=>{
  console.log("checkTyping",msg)
  setSelectChatid(msg.chatId)
  setIsTyping(msg.isTyping)
})
    

   

   
  




const handleMessage=(e)=>{

setInputMessage(e.target.value)
   
}


const handleKeyDown = () => {
  socket.emit("isTyping", JSON.stringify({
        
    Chat_Id1: `${props.username}_${props.localvalue}`,
    Chat_Id2: `${props.localvalue}_${props.username}`,
    isTyping:true
  }))
  clearTimeout(typingTimeout);
  setIsTyping(true);
 
};

const handleKeyUp = () => {
 
  clearTimeout(typingTimeout);
  setTypingTimeout(
    setTimeout(() => {

      setIsTyping(false);
      socket.emit("isTyping", JSON.stringify({
        
        Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
        isTyping:false
      }))
    }, 2000) // Adjust the duration as needed (in milliseconds)
  );

};

useEffect(() => {
  return () => {
    clearTimeout(typingTimeout);
  };
}, [typingTimeout]);






  
    const sendMessage = () => {
     
      // let message = document.getElementById("msg").value;
      if (inputMessage.trim() == "") {
        alert("please enter message to send");
      } 
      else {
        let data = JSON.stringify({
          from: props.username,
          to: props.localvalue,
          message: inputMessage,
        });

       socket.emit("storeData",data)
       
  
     
    }
  
     
      setInputMessage("")
      console.log("clicked button")
    };

    
  
   
    return (
      <div style={{ width: "-webkit-fill-available" }}>
        <Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // bgcolor: "background.default",
              backgroundColor:"#bcbcd9",
              p: 3,
              overflowY: "scroll",
              height: "90vh",
            }}
          >
            <Toolbar />
           
            <List>
              {message?.map((val) => {
                console.log("message", val.Chat_Id);
                return (
                  <>
                    <ListItem
                      sx={{
                        textAlign:
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? "right"
                            : "left",
                        display: "grid",
                        justifyContent:
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? "end"
                            : "flex-start",
                      }}
                    > 
                    {/* <ListItemAvatar> */}
                    {/* <Avatar alt="Remy Sharp" src="/images/profile.JPG" />  */}
          
         {/* </ListItemAvatar> */}
                      <ListItemText
                        primary={
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? `you: ${val.message}`
                            : `${props.localvalue} : ${val.message}`
                        }
                        secondary={datetime(val.datetime)}
                        sx={{
                          backgroundColor: val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"#3052c4a1":"white",
                          color:val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"white":"black",
                          border: "1px aqua",
                          borderRadius: "5px",
                          padding: "8px",
                        }}
                      />
                    </ListItem>
                  </>
                );
              })}
            </List>
            
            
            <div style={{position:"fixed",bottom:"9vh"}}>{isTyping?"Typing...":null}</div>
          </Box>

          <footer className="message">
          
            <input
              type="text"
              placeholder="Enter Message..."
              style={{
                minWidth: isXsScreen? "89%":"94%",
                // height: "5vh",
                padding:"18px",
                // borderRadius: "13px",
                border: "1px solid white" ,
              }}
              value={inputMessage}
              onChange={handleMessage}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              // id="msg"
            />
            
            <IconButton onClick={sendMessage} sx={{ backgroundColor: "#383c8dd4",margingLeft:"15px",'&:hover': {
          backgroundColor: '#383c8dd4', 
        }, }}>
              <SendIcon sx={{color:"white",   
              }}/>
            </IconButton>
            {/* <SendIcon/> */}
          </footer>
        </Box>
      </div>
    );
}

export default Chatv1