const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ResourcePacksInfoPacket extends DataPacket {
	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.RESOURCE_PACKS_INFO_PACKET;
	}

	initVars(){
		this.mustAccept = false;
		this.behaviorPackEntries = [];
		this.resourcePackEntries = [];
	}

	_decodePayload(){
		this.mustAccept = this.readBool();
		let behaviourPackCount = this.readLShort();
		while(behaviourPackCount-- > 0){
			this.readString();
			this.readString();
			this.readLLong();
			this.readString();
			this.readString();
			this.readString();
		}
		let resourcePackCount = this.readLShort();
		while(resourcePackCount-- > 0){
			this.readString();
			this.readString();
			this.readLLong();
			this.readString();
			this.readString();
			this.readString();
		}
	}

	_encodePayload(){
		this.writeBool(this.mustAccept);
		this.writeLShort(this.behaviorPackEntries.length);
		for(let i = 0; i < this.behaviorPackEntries.length; ++i){
			let entry = this.behaviorPackEntries[i];
			this.writeString(entry.getPackId());
			this.writeString(entry.getPackVersion());
			this.writeLLong(entry.getPackSize());
			this.writeString("");
			this.writeString("");
			this.writeString("");
		}
		this.writeLShort(this.resourcePackEntries.length);
		for(let i = 0; i < this.resourcePackEntries.length; ++i){
			let entry = this.resourcePackEntries[i];
			this.writeString(entry.getPackId());
			this.writeString(entry.getPackVersion());
			this.writeLLong(entry.getPackSize());
			this.writeString("");
			this.writeString("");
			this.writeString("");
		}
	}
}

module.exports = ResourcePacksInfoPacket;