const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class RemoveObjectivePacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.REMOVE_OBJECTIVE_PACKET;
	}

	initVars(){
		this.objectiveName = "";
	}

	_decodePayload(){
		this.objectiveName = this.readString();
	}

	_encodePayload(){
        this.writeString(this.objectiveName);
	}
}

module.exports = RemoveObjectivePacket;