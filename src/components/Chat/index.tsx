import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style'
import { SimpleColumnWrapper, SimpleRowWrapper } from '../../styles/Global';
import Input from '../Input';
import Button from '../Button';
import socket from '../../socket';
import SwitchOption from '../SwitchOption';

type MessageProps = {
  sender: string;
  senderClientId: string;
  message: string;
  date: string;
}

type clientProps = Record<string, string>;

const ChatComponent = () => {
  let clientId: string;
  const { id, type } = useParams();
  const [isPrivate, setIsPrivate] = useState(false);
  // const [userToPrivate, setUserToPrivate] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<MessageProps>>([]);
  const [listOfClients, setListOfClients] = useState<Array<clientProps>>([]);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSwitchState = () => {
    setIsPrivate(!isPrivate);
  }

  const handleMessage = (message: string) =>{
    if(message.length === 0)
      return;
    inputRef.current!.value = '';

    if(isPrivate){
      socket.emit('private_message', { sender: id, to: '', type, message });
    } else {
      socket.emit('message', { sender: id, type, message });
    }
  }

  useEffect(()=>{
    socket.io.opts.query = {userId: id, type: type};

    socket.on('connect', ()=> {
      setIsConnected(socket.connected)
      clientId = socket.id!;
    });

    socket.on('disconnect', (data)=> {
      textareaRef.current!.value += data;
      setIsConnected(socket.connected)
      clientId = '';
    });

    socket.on('clients', (data)=> {
      const clients = Object.keys(data);
      const list:Array<clientProps> = [];
      for(let i in clients){
        const clientId = clients[i];
        list.push({clientId: clientId, userName: data[clientId].userName, userId: data[clientId].userId})
      }
      setListOfClients(()=> [...list])
    })

    socket.on('private_message', (data: MessageProps) => {
      const user = data.sender;
      data.senderClientId === clientId?
      textareaRef.current!.value += `You (private): ${data.message}\n`:
      textareaRef.current!.value += `${user} (private): ${data.message}\n`;
      textareaRef.current!.scrollTop = textareaRef.current!.scrollHeight;
      const list:Array<MessageProps> = chatHistory;
      list.push({sender: data.sender, senderClientId: data.senderClientId, message: data.message, date: data.date});
      setChatHistory(()=> [...list]);
    })

    socket.on('message', (data: MessageProps) => {
      const user = data.sender;
      data.senderClientId === clientId?
      textareaRef.current!.value += `You: ${data.message}\n`:
      textareaRef.current!.value += `${user}: ${data.message}\n`;
      textareaRef.current!.scrollTop = textareaRef.current!.scrollHeight;
      const list:Array<MessageProps> = chatHistory;
      list.push({sender: data.sender, senderClientId: data.senderClientId, message: data.message, date: data.date});
      setChatHistory(()=> [...list]);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      socket.off('private_message');
      socket.off('clients');
    };
  }, [])

  return (
    <S.Wrapper>
      <S.Fieldset>
        <legend><h1>Chat Logs</h1></legend>
        <SimpleRowWrapper>
          <SimpleColumnWrapper>
            <S.RefreshDiv>
              <Button commomButton onClick={()=>{socket.emit('clients')}}>Refresh</Button>
            </S.RefreshDiv>
            <S.Textarea
              id='logs'
              ref={textareaRef}
              rows={8}
              cols={60}
              readOnly
            ></S.Textarea>
            <S.BottomDiv>
              <Input
                ref={inputRef}
                placeholder="Send a message..."
                onKeyDown={(e)=>{
                  if(e.key === "Enter"){
                    handleMessage(inputRef.current!.value)
                  }
                }}
              />
              <Button commomButton onClick={()=>handleMessage(inputRef.current!.value)}>Send</Button>
              <Button commomButton onClick={()=>socket.connect()}>Connect</Button>
              <Button logoutButton onClick={()=>socket.disconnect()}>Disconnect</Button>
            </S.BottomDiv>
            <SwitchOption
              message='Private message'
              setSwitch={setSwitchState}
            />
            <br/>
            <p>Connected: {`${isConnected}`}</p>
          </SimpleColumnWrapper>
          <S.Aside>
            <h1>List of users</h1>
            <b>Online:</b>
            <ul>
              {listOfClients.map((user)=>{
                const id = user.clientId;
                const userName = user.userName;
                const userId = user.userId;
                if(clientId === id){
                  return;
                }
                return(
                  <li key={`${id}::${userId}`}>{userName}</li>
                )
              })}
            </ul>
          </S.Aside>
        </SimpleRowWrapper>
      </S.Fieldset>
    </S.Wrapper>
  );
}

export default ChatComponent;
