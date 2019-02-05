const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SetDisplayObjectivePacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.SET_DISPLAY_OBJECTIVE_PACKET;
	}

	initVars(){
		this.displaySlot = "";
        this.objectiveName = "";
        this.displayName = "";
        this.criteriaName = "";
        this.sortOrder = -1;
	}

	_decodePayload(){
		this.displaySlot = this.readString();
		this.objectiveName = this.readString();
		this.displayName = this.readString();
		this.criteriaName = this.readString();
		this.sortOrder = this.readVarInt();
	}

	_encodePayload(){
        this.writeString(this.displaySlot);
        this.writeString(this.objectiveName);
        this.writeString(this.displayName);
        this.writeString(this.criteriaName);
        this.writeVarInt(this.sortOrder);
	}
}

module.exports = SetDisplayObjectivePacket;