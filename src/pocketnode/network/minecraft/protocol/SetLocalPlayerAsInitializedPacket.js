const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SetLocalPlayerAsInitializedPacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.SET_LOCAL_PLAYER_AS_INITIALIZED_PACKET;
	}

	initVars(){
		this.entityRuntimeId = -1;
	}

	_decodePayload(){
		this.entityRuntimeId = this.getEntityRuntimeId();
	}

	_encodePayload(){
        this.writeEntityRuntimeId(this.entityRuntimeId);
	}
}

module.exports = SetLocalPlayerAsInitializedPacket;
