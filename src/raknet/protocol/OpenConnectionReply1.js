const OfflineMessage = raknet("protocol/OfflineMessage");
const MessageIdentifiers = raknet("protocol/MessageIdentifiers");

class OpenConnectionReply1 extends OfflineMessage {
    static getId(){
        return MessageIdentifiers.ID_OPEN_CONNECTION_REPLY_1;
    }

    initVars(){
        this.serverId = -1;
        this.serverSecurity = false;
        this.mtuSize = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    encodePayload(){
        this.writeMagic();
        this.getStream()
            .writeLong(this.serverId)
            .writeBool(this.serverSecurity)
            .writeShort(this.mtuSize);
    }
}

module.exports = OpenConnectionReply1;