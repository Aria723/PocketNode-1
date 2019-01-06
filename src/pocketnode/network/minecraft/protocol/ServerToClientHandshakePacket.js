const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ServerToClientHandshakePacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.SERVER_TO_CLIENT_HANDSHAKE_PACKET;
	}

	canBeSentBeforeLogin(){
		return true;
	}

	initVars(){
		this.jwt = "";
	}

	_decodePayload(){
		this.jwt = this.readString();
	}

	_encodePayload(){
		this.writeString(this.jwt);
	}

	handle(session){
		return session.handleServerToClientHandshake(this);
	}
}

module.exports = ServerToClientHandshakePacket;