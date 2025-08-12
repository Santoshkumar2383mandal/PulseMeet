import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuthUser from '../hooks/useAuthUser.js';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api.js';

import { 
  CallingState,
  StreamCall, 
  StreamVideo, 
  StreamVideoClient, 
  CallControls,
  SpeakerLayout,
  StreamTheme, 
  useCallStateHooks, 
  } from '@stream-io/video-react-sdk';

import "@stream-io/video-react-sdk/dist/css/styles.css";
import PageLoader from '../components/PageLoader.jsx';
import toast from 'react-hot-toast';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const {data: tokenData} = useQuery({
    queryKey: ['streamCallToken'],
    queryFn: getStreamToken,
    enabled: !!authUser, // Only run this query if authUser is available  
  });

  useEffect(() => {

    const initCall = async () => {
      if(!tokenData || !authUser) return;
      
      try{
        console.log("Initializing call client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new  StreamVideoClient({
          apiKey : STREAM_API_KEY,
          user,
          token: tokenData.token,
        })

        const callInstance = videoClient.call("default",callId);

        await callInstance.join({create: true}); // if call doesn't exist, create it

        console.log("join call successfully:", callInstance);
        setClient(videoClient);
        setCall(callInstance);

      }catch(error) {
        console.error("Error initializing call:", error);
        toast.error("Failed to initialize call. Please try again later.");
      }finally {
        setIsConnected(false);
      }
    };

    initCall();// Call the function to initialize call
  }, [tokenData, authUser, callId]);

  if(isLoading || isConnected) return  <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const CallContent = () =>{
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if(callingState === CallingState.LEFT)  return navigate("/"); // Redirect to home if call is left

  return(
    <StreamTheme>
      <SpeakerLayout/>
        <CallControls/>   
    </StreamTheme>
  )
}

export default CallPage;
