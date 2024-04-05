import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';

class PeerService {
    peer: RTCPeerConnection | undefined;

    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478"
                        ]
                    }
                ]
            });
        }
    }

    async getOffer(): Promise<RTCSessionDescription | undefined> {
        if (this.peer) {
            const offer = await this.peer.createOffer({});
            await this.peer.setLocalDescription(offer);
            return offer;
        }
    }

    async getAnswer(offer: RTCSessionDescription): Promise<RTCSessionDescription | undefined> {
        if (this.peer) {
            console.log("get ans offer ", offer);
            await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(ans);
            return ans;
        }
    }

    async setLocalDescription(ans: RTCSessionDescription): Promise<void> {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
}

export default new PeerService();
