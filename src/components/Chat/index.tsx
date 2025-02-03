import { useEffect, useRef, useState } from 'react';
import * as S from './style'
import Input from '../Input';
import Button from '../Button';
import { useParams } from 'react-router-dom';
import socket from '../../socket';
import SwitchOption from '../SwitchOption';

type MessageProps = {
  sender: string;
  senderClientId: string;
  message: string;
}

type ListOfUsersProps = {
  clientName: string;
  clientId: string;
}

const ChatComponent = () => {
  let clientId: string;
  const { id, type } = useParams();
  const chatHistory:Array<MessageProps> = [];
  const [isPrivate, setIsPrivate] = useState(false);
  const [listOfUsers, setListOfUsers] = useState<Array<ListOfUsersProps>>([]);
  const [userToPrivate, setUserToPrivate] = useState('');
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
      socket.emit('users');
    });

    socket.on('disconnect', (data)=> {
      textareaRef.current!.value += data;
      setIsConnected(socket.connected)
    });

    socket.on('users', (data)=> {
      setListOfUsers((prevState)=>[
        ...prevState,
        data
      ])
      console.log(data);
    })

    socket.on('private_message', (data: MessageProps) => {
      const user = data.sender;
      data.senderClientId === clientId?
      textareaRef.current!.value += `You (private): ${data.message}\n`:
      textareaRef.current!.value += `${user} (private): ${data.message}\n`;
      textareaRef.current!.scrollTop = textareaRef.current!.scrollHeight;
      chatHistory.push({sender: data.sender, senderClientId: data.senderClientId, message: data.message});
    })

    socket.on('message', (data: MessageProps) => {
      const user = data.sender;
      data.senderClientId === clientId?
      textareaRef.current!.value += `You: ${data.message}\n`:
      textareaRef.current!.value += `${user}: ${data.message}\n`;
      textareaRef.current!.scrollTop = textareaRef.current!.scrollHeight;
      chatHistory.push({sender: data.sender, senderClientId: data.senderClientId, message: data.message});
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, [])

  return (
    <S.Wrapper>
      <S.Fieldset>
        <legend><h1>Chat Logs</h1></legend>
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
      </S.Fieldset>
    </S.Wrapper>
  );
}

export default ChatComponent;
