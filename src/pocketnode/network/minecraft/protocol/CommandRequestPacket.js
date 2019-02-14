const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class CommandRequestPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.COMMAND_REQUEST_PACKET;
    }

    initVars(){
        this.command = "";
	    this.originData; //CommandOriginData class
	    this.isInternal;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.command = this.readString();
		this.originData = this.readCommandOriginData();
		this.isInternal = this.readBool();
    }

    _encodePayload(){
        this.writeString(this.command);
		this.writeCommandOriginData(this.originData);
		this.writeBool(this.isInternal);
    }

    handle(session){
        return session.handleCommandRequest(this);
    }
}

module.exports = CommandRequestPacket;