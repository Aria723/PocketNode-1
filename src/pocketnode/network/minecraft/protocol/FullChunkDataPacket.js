const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class FullChunkDataPacket extends DataPacket {
	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.FULL_CHUNK_DATA_PACKET;
	}

	initVars(){
		this.chunkX = 0;
		this.chunkZ = 0;
		this.data = "";
	}

	_decodePayload(){
		this.chunkX = this.readVarInt();
		this.chunkZ = this.readVarInt();
		this.data = this.readString();
	}

	_encodePayload(){
		this.writeVarInt(this.chunkX);
		this.writeVarInt(this.chunkZ);
		this.writeString(this.data);
	}
}

module.exports = FullChunkDataPacket;