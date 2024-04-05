import React, { createContext, useContext, useMemo } from "react";
import { io, Socket } from 'socket.io-client';

// Define the type of SocketContext value
interface SocketContextType extends Socket {}


const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = (): SocketContextType => {
    const socket = useContext(SocketContext)!; 
    return socket;
};


interface SocketProviderProps {
    children: React.ReactNode;
}


export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
    // Initialize the socket using useMemo to ensure it's only created once
    const socket = useMemo(() => io('http://localhost:3000'), []);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
