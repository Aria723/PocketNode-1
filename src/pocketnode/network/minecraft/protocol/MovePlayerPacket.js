const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class MovePlayerPacket extends DataPacket {

	static getId(){
		return MinecraftInfo.MOVE_PLAYER_PACKET;
	}

	static MODE_NORMAL(){return 0;}
	static MODE_RESET(){return 1;}
	static MODE_TELEPORT(){return 2;}
	static MODE_PITCH(){return 3;}

	initVars(){
		this.entityRuntimeId = 0;
		this.position = null;
		this.pitch = 0;
		this.yaw = 0;
		this.headYaw = 0;
		this.mode = MovePlayerPacket.MODE_NORMAL();
		this.onGround = false;
		this.ridingEId = 0;
		this.teleportCause = 0;
		this.teleportItem = 0;
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.entityRuntimeId = this.getEntityRuntimeId();
		this.position = this.getVector3Obj();
		this.pitch = this.readLFloat();
		this.yaw = this.readLFloat();
		this.headYaw = this.readLFloat();
		this.mode = this.readByte();
		this.onGround = this.readBool();
		this.ridingEId = this.getEntityRuntimeId();
		if(this.mode === MovePlayerPacket.MODE_TELEPORT()){
			this.teleportCause = this.readLInt();
			this.teleportItem = this.readLInt();
		}
	}

	_encodePayload(){
		this.writeEntityRuntimeId(this.entityRuntimeId);
		this.writeVector3Obj(this.position);
		this.writeLFloat(this.pitch);
		this.writeLFloat(this.yaw);
		this.writeLFloat(this.headYaw);
		this.writeBool(this.onGround);
		this.writeEntityRuntimeId(this.ridingEId);
		if(this.mode === MovePlayerPacket.MODE_TELEPORT()){
			this.writeLInt(this.teleportCause);
			this.writeLInt(this.teleportItem);
		}
	}

	handle(session){
		return session.handleMovePlayer(this);
	}
}

module.exports = MovePlayerPacket;