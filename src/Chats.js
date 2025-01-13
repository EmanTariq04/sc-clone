import React from 'react'
import './Chats.css'
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Chats() {
  return (
    <div className='chats'>
      <div className='chats-header'>
        <Avatar className="chats-avatar" />
        <div className='chats-search'>
          <SearchIcon/>
          <input placeholder='Friends' type='text' />
        </div>
        <ChatBubbleIcon className='chats-chaticon'/>
      </div>
      <div className='chats-posts'>

      </div>
    </div>
  )
}

export default Chats