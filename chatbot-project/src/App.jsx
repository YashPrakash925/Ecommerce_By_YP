import { useState, useRef, useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import './App.css'
import Robot from './assets/robot.webp'
import user from './assets/user.webp'

function ChatInput({chatMessages,setChatMessages}){
            const [inputText, setInputText]=useState("");
            const [isLoading,setIsLoading]=useState(false);

            function saveInputText(event){ 
                setInputText(event.target.value);
            }

            async function sendMessage(){
                if(isLoading || inputText===""){
                    return;
                }
                setIsLoading(true);
                setInputText("");   
                const newChatMessages=[...chatMessages,
                    {
                        message:inputText,
                        sender:"user",
                        id:crypto.randomUUID
                    }
                ];
                setChatMessages(newChatMessages);
                setChatMessages([...newChatMessages,
                    {
                        message:"Loading...",
                        sender:"robot",
                        id:crypto.randomUUID
                    }
                ])
                const response= await Chatbot.getResponseAsync(inputText);
                setChatMessages([...newChatMessages,
                    {
                        message:response,
                        sender:"robot",
                        id:crypto.randomUUID
                    }
                ]);
                setInputText("");
                setIsLoading(false);
            }
            function handleKeyDown(event){
                if(event.key==="Enter"){
                    sendMessage();
                }
                if(event.key==="Escape"){
                    setInputText("");
                }
            }
            return(
                <div className="div">
                    <input 
                        placeholder="Send a message to ChatBot" 
                        size="30"
                        onChange={saveInputText}
                        value={inputText} 
                        onKeyDown={handleKeyDown}
                        className="input"
                    >
                    </input>
                    <button 
                        onClick={sendMessage} 
                        className="sendButton"
                    >Send</button>
                </div>
            );
        }
        function ChatMessage({message,sender}){
            //const message=props.message;
            //const sender=props.sender;
            //const {message,sender}=props;
            /*
            if(sender==="robot"){
                return(
                    <div>
                        <img src="robot.webp" width="50" ></img>
                        {message}
                </div>
                );
            }
            */
            return (
                <div  className={sender==="user"?"user":"robot"}>
                    {sender==="robot" && <img src={Robot} className="robotimg"/>}
                    <div className="message">
                        {message}
                    </div>
                    {sender==="user" && <img src={user} className="userimg"/>}
                </div>
            );
        }
function ChatMessages({chatMessages}){
            const chatMessagesRef=useAutoScroll([chatMessages]);
            return(
                <div className="chatmessage" ref={chatMessagesRef}>
                    {chatMessages.map((chatMessage)=>{
                        return(
                            <ChatMessage 
                                message={chatMessage.message} 
                                sender={chatMessage.sender} 
                                key={chatMessage.id}
                            />
                        );
                    })}
                </div>
            );
        }
        function Welcome({chatMessages}){
            if(chatMessages.length===0){
                return(
                    <p className="p">Welcome to the chatbot project! Send a message in the textbox below</p>
                );
            }
        }
        function useAutoScroll(dependencies){
            const containerRef=useRef(null);
            useEffect(()=>{
                const containerElem=containerRef.current;
                if(containerElem){
                    containerElem.scrollTop=containerElem.scrollHeight;
                }
            },dependencies);
            return containerRef;
        }
function App() {
  const [chatMessages, setChatMessages]=useState([]);
            //const [chatMessages, setChatMessages]=array;
            //const chatMessages=array[0];
            //const setChatMessages=array[1]; 
            return(
                <div className="app">
                    <Welcome chatMessages={chatMessages}/>
                    <ChatMessages 
                        chatMessages={chatMessages}
                    />
                    <ChatInput 
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}    
                    />
                </div>
            );
}

export default App
