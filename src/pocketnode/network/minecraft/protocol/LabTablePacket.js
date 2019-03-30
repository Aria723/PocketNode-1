const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class LabTablePacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.LAB_TABLE_PACKET;
	}

	initVars(){
		this.uselessByte = -1; //0 for client to server, 1 for server to client.
    	this.x = -1;
    	this.y = -1;
    	this.z = -1;
		this.reactionType = -1;
	}

	_decodePayload(){
		//todo
	}

	_encodePayload(){
		//todo
	}
}

module.exports = LabTablePacket;