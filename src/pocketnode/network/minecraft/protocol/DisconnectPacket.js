const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class DisconnectPacket extends DataPacket {
	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.DISCONNECT_PACKET;
	}

	initVars(){
		this.hideDisconnectionScreen = false;
		this.message = "";
	}

	canBeSentBeforeLogin(){
		return true;
	}

	_decodePayload(){
		this.hideDisconnectionScreen = this.readBool();
		this.message = this.readString();
	}

	_encodePayload(){
		this.writeBool(this.hideDisconnectionScreen);
		if(!this.hideDisconnectionScreen){
			this.writeString(this.message);
		}
	}
}

module.exports = DisconnectPacket;