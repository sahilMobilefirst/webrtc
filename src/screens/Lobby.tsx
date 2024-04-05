import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSocket } from '../context/SocketProvider'; // Assuming this file is unchanged


const LobbyScreen = ({navigation}:any) => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const socket = useSocket();

    const handleSubmitForm = useCallback(() => {
        socket.emit('room:join', { email, room });
    }, [email, room, socket]);

    const handleJoinRoom = useCallback((data:any) => {
        const { email, room } = data;
        navigation.navigate('Lobby')
    }, []);

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off('room:join', handleJoinRoom);
        }
    }, [socket, handleJoinRoom]);

    return (
        <View>
            <Text style={{ color: "black", fontSize: 24 }}>Lobby</Text>
            <TextInput
                placeholder="Email Id"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{ borderBottomWidth: 1, borderColor: 'black', marginBottom: 10 }}
            />
            <TextInput
                placeholder="Room no."
                value={room}
                onChangeText={setRoom}
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, borderColor: 'black', marginBottom: 10 }}
            />
            <Button title="Join" onPress={handleSubmitForm} />
        </View>
    );
}

export default LobbyScreen;
