const OfflineMessage = raknet("protocol/OfflineMessage");
const MessageIdentifiers = raknet("protocol/MessageIdentifiers");

class OpenConnectionRequest1 extends OfflineMessage {
    static getId(){
        return MessageIdentifiers.ID_OPEN_CONNECTION_REQUEST_1;
    }

    initVars(){
        this.protocolVersion = -1;
        this.mtuSize = -1;
    }

    constructor(stream){
        super(stream);
        this.initVars();
    }

    decodePayload(){
        this.readMagic();
        this.protocolVersion = this.getStream().readByte();
        this.mtuSize = this.getBuffer().slice(this.getStream().getOffset()).length + 18;
    }
}

module.exports = OpenConnectionRequest1;