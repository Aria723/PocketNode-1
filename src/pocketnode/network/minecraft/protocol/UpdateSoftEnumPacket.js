const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class UpdateSoftEnumPacket extends DataPacket {

	static getId(){
		return MinecraftInfo.UPDATE_SOFT_ENUM_PACKET;
	}

	initVars(){
		this.enumName = "";
		this.values = [];
		this.type = 0;
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.enumName = this.readString();
		let count = this.readUnsignedVarInt();
		for(let i = 0; i < count; i++){
			this.values.push(this.readString());
		}
		this.type = this.readByte();
	}

	_encodePayload(){
		this.writeString(this.enumName);
		for(let i = 0; i < this.values.length; i++){
			this.writeString(this.values[i]);
		}
		this.writeByte(this.type);
	}

	handle(session){
		return session.handleUpdateSoftEnum(this);
	}
}

module.exports = UpdateSoftEnumPacket;