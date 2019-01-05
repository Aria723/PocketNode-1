const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const DimensionIds = pocketnode("network/minecraft/protocol/types/DimensionIds");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SpawnParticleEffectPacket extends DataPacket {
	static getId(){
		return MinecraftInfo.SPAWN_PARTICLE_EFFECT_PACKET;
	}

	initVars(){
		this.dimensionId = DimensionIds.OVERWORLD;
		this.position = null;
		this.particleName = "";
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.dimensionId = this.readByte();
		this.position = this.getVector3Obj();
		this.particleName = this.readString();
	}

	_encodePayload(){
		this.writeByte(this.dimensionId);
		this.writeVector3Obj(this.position);
		this.writeString(this.particleName);
	}

	handle(session){
		session.handleSpawnParticleEffect(this);
	}
}

module.exports = SpawnParticleEffectPacket;