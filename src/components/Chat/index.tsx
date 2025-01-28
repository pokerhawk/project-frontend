import { useEffect, useState } from 'react';
import * as S from './style'
import Input from '../Input';
import Button from '../Button';
import socket from '../../socket';
import { useParams } from 'react-router-dom';

type MessageProps = {
  sender: string;
  message: string;
}


const ChatComponent = () => {
  const { id, type } = useParams();
  const [text, setText] = useState('');
  const [history, setHistory] = useState<Array<MessageProps>>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const input = document.getElementsByTagName('input');

  const handleSubmitMessage = (message: string) =>{
    socket.emit('message', { sender: id, type, message: message })
    input[3].value = '';
    setText('');
  }

  useEffect(()=>{
    socket.on('message', (data: MessageProps) => {
      console.log(`recebendo mensagem: ${data.message}`)
      setText(data.message)
      setHistory([...history, {sender: data.sender, message: data.message}])
    })

    return () => {
      socket.off('connect', );
      socket.off('disconnect', );
      socket.off('foo', );
    };
  }, [])

  return (
    <S.Wrapper>
      <S.Fieldset>
        <legend><h1>Chat Logs</h1></legend>
        <S.Textarea
          rows={8}
          cols={60}
          autoFocus
        ></S.Textarea>
        <S.BottomDiv>
          <Input
            placeholder="Send a message..."
            onChange={(e)=>{setText(e.target.value)}}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                handleSubmitMessage(text)
              }
            }}
          />
          <Button commomButton onClick={()=>handleSubmitMessage(text)}>Send</Button>
          <Button commomButton onClick={()=>{
            socket.connect();
            setIsConnected(true);
          }}>Connect</Button>
          <Button logoutButton onClick={()=>{
            socket.disconnect();
            setIsConnected(false);
          }}>Close</Button>
        </S.BottomDiv>
        <p>Connected: {`${isConnected}`}</p>
      </S.Fieldset>
    </S.Wrapper>
  );
}

export default ChatComponent;
