const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class MovePlayerPacket extends DataPacket {

    static getId(){
        return MinecraftInfo.MOVE_PLAYER_PACKET;
	}
	
	static MODE_NORMAL(){
		return 0
	}
	static MODE_RESET(){
		return 1
	}
	static MODE_TELEPORT(){
		return 2
	}
	static MODE_PITCH(){
		return 3
	}

    initVars(){
        this.entityRuntimeId;
		this.position;
		this.pitch;
		this.yaw;
		this.headYaw;
		this.mode = this.MODE_NORMAL;
		this.onGround = false;
		this.ridingEid = 0;
		this.teleportCause = 0;
		this.teleportItem = 0;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.entityRuntimeId = this.getEntityRuntimeId();
		this.position = this.getVector3();
		this.pitch = this.readLFloat();
		this.yaw = this.readLFloat();
		this.headYaw = this.readLFloat();
		this.mode = this.readByte();
		this.onGround = this.readBool();
		this.ridingEid = this.getEntityRuntimeId();
		if(this.mode === this.MODE_TELEPORT){
			this.teleportCause = this.readLInt();
			this.teleportItem = this.readLInt();
		}
    }

    _encodePayload(){
        this.putEntityRuntimeId(this.entityRuntimeId);
		this.putVector3(this.position);
		this.putLFloat(this.pitch);
		this.putLFloat(this.yaw);
		this.putLFloat(this.headYaw); //TODO
		this.putByte(this.mode);
		this.putBool(this.onGround);
		this.putEntityRuntimeId(this.ridingEid);
		if(this.mode === this.MODE_TELEPORT){
			this.putLInt(this.teleportCause);
			this.putLInt(this.teleportItem);
		}
	}
	
	handle(session){
        return session.handleMovePlayer(this);
    }
}

module.exports = MovePlayerPacket;
