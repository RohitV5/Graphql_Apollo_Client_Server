import React from 'react'
import { useParams } from 'react-router-dom';

const ChatScreen = () => {

const {id,name} = useParams();
  return (
    <>
    {id} {name}
    </>
  )
}

export default ChatScreen