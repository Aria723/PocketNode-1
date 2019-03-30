const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class CommandOutputPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.COMMAND_OUTPUT_PACKET;
    }

    initVars(){
        this.originData; //CommandOriginData class
        this.outputType = -1;
	    this.successCount = -1;
        this.messages = []; //CommandOutputMessage array
        this.unknownString = "";
    }

    constructor(){
        super();
        this.initVars();
    }
    
    readCommandMessage(){
		let message = new CommandOutputMessage();
		message.isInternal = this.readBool();
		message.messageId = this.readString();
		for(let i = 0, size = this.readUnsignedVarInt(); i < size; i += 1){
			message.parameters.push(this.readString());
		}
		return message;
    }
    
    writeCommandMessage(message){
        this.writeBool(message.isInternal);
		this.writeString(message.messageId);
        this.writetUnsignedVarInt(message.parameters.length);
        for(let i = 0; i < message.parameters.length; i += 1){
            this.writeString(message.parameters[i]);
        }
    }

    _decodePayload(){
        this.originData = this.readCommandOriginData();
		this.outputType = this.readByte();
		this.successCount = this.readUnsignedVarInt();
        for(let i = 0, size = this.readUnsignedVarInt(); i < size; i += 1){
			this.messages.push(this.readCommandMessage());
		}
		if(this.outputType === 4){
			this.unknownString = this.readString();
		}
    }

    _encodePayload(){
        this.writeCommandOriginData(this.originData);
		this.writeByte(this.outputType);
		this.writeUnsignedVarInt(this.successCount);
        this.writeUnsignedVarInt(this.messages.length);
        for(let i = 0; i < this.messages.length; i++){
            this.writeCommandMessage(this.messages[i])
        }
		if(this.outputType === 4){
			this.writeString(this.unknownString);
		}
    }

    handle(session){
        return session.handleCommandOutput(this);
    }
}

module.exports = CommandOutputPacket;