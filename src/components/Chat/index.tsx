import { useEffect, useRef, useState } from 'react';
import * as S from './style'
import Input from '../Input';
import Button from '../Button';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

type MessageProps = {
  sender: string;
  senderClientId: string;
  message: string;
}


const ChatComponent = () => {
  let clientId: string;
  const { id, type } = useParams();
  const chatHistory:Array<MessageProps> = [];
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitMessage = (message: string) =>{
    if(message.length === 0)
      return;
    inputRef.current!.value = '';
    socket.emit('message', { sender: id, type, message });
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
    });

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
                handleSubmitMessage(inputRef.current!.value)
              }
            }}
          />
          <Button commomButton onClick={()=>handleSubmitMessage(inputRef.current!.value)}>Send</Button>
          <Button commomButton onClick={()=>socket.connect()}>Connect</Button>
          <Button logoutButton onClick={()=>socket.disconnect()}>Disconnect</Button>
        </S.BottomDiv>
        <p>Connected: {`${isConnected}`}</p>
      </S.Fieldset>
    </S.Wrapper>
  );
}

export default ChatComponent;
