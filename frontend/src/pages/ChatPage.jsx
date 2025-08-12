import { useParams } from "react-router"
import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
  Thread,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader.jsx";
import CallButton from "../components/CallButton.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  
  const [chatClient, SetChatClient] = useState(null); //destructure useState to SetChatClient
  const [channel, setChannel] = useState(null);// useState to manage channel state
  const [loading, setLoading] = useState(true);// useState to manage loading state

  const { authUser } = useAuthUser();

  const { data:tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // Only run this query if authUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if(!tokenData || !authUser) return;

      try{
        console.log("Initializing chat Client..");
        // Create a StreamChat client instance
        const client = StreamChat.getInstance(STREAM_API_KEY);
        // Connect the user to the chat client
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("__"); // Create a unique channel ID based on user IDs

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        // Set the chat client and channel in state
        await currChannel.watch();

        SetChatClient(client);
        setChannel(currChannel);

      }catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again later.");
      }finally {
        setLoading(false);
      }
    };
    initChat();// Call the function to initialize chat
  }, [tokenData, authUser, targetUserId]); // Dependencies to re-run the effect

  const handleVideoCall = () => {
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`; // Construct the call URL using the channel ID  

      channel.sendMessage({
        text:`I've started a video call. Click here to join me: ${callUrl}`,
      });
      toast.success("Video call link sent to the chat!");
    }
  };

  if( loading || !chatClient || !channel) {
    return <ChatLoader />;
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatPage;
