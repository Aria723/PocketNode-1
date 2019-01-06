const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");
const ScorePacketEntry = pocketnode("network/minecraft/protocol/types/ScorePacketEntry");

class SetScorePacket extends DataPacket {

	static getId(){
		return MinecraftInfo.SET_SCORE_PACKET;
	}

	static TYPE_CHANGE(){return 0;}
	static TYPE_REMOVE(){return 1;}

	initVars(){

		this.type = 0;
		this.entries = [];
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.type = this.readByte();
		let count = this.readUnsignedVarInt();
		for(let i = 0; i < count; i++){
			let entry = new ScorePacketEntry();
			entry.scoreboardId = this.readVarLong();
			entry.objectiveName = this.readString();
			entry.score = this.readLInt();
			if(this.type === SetScorePacket.TYPE_CHANGE()){
				entry.type = this.readByte();
				switch(entry.type){
					case ScorePacketEntry.TYPE_PLAYER():
					case ScorePacketEntry.TYPE_ENTITY():
						entry.entityUniqueId = this.getEntityUniqueId();
						break;
					case ScorePacketEntry.TYPE_FAKE_PLAYER():
						entry.customName = this.readString();
						break;
					default:
						throw new Error("Unknown entry type " + this.type);
				}
			}
		}
	}

	_encodePayload(){
		this.writeByte(this.type);
		this.writeUnsignedVarInt(this.entries.length);
		for(let i = 0; i < this.entries.length; i++){
			let entry = this.entries[i];
			this.writeVarLong(entry.scoreboardId);
			this.writeString(entry.objectiveName);
			this.writeLInt(entry.score);
			if(this.type === SetScorePacket.TYPE_CHANGE()){
				this.writeByte(entry.type);
				switch(entry.type){
					case ScorePacketEntry.TYPE_PLAYER():
					case ScorePacketEntry.TYPE_ENTITY():
						this.writeEntityUniqueId(entry.entityUniqueId);
						break;
					case ScorePacketEntry.TYPE_FAKE_PLAYER():
						this.writeString(entry.customName);
						break;
					default:
						throw new Error("Unknown entry type " + this.type);
				}
			}
		}
	}

	handle(session){
		return session.handleSetScore(this);
	}
}

module.exports = SetScorePacket;