const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class MoveEntityDeltaPacket extends DataPacket {

    static getId(){
        return MinecraftInfo.MOVE_ENTITY_DELTA_PACKET;
    }

	static get FLAG_HAS_X() {return 0x01};
	static get FLAG_HAS_Y() {return 0x02};
	static get FLAG_HAS_Z() {return 0x04};
	static get FLAG_HAS_ROT_X() {return 0x08};
	static get FLAG_HAS_ROT_Y() {return 0x10};
	static get FLAG_HAS_ROT_Z() {return 0x20};

    initVars(){
        this.flags = 0;
		this.xDiff = 0;
		this.yDiff = 0;
		this.zDiff = 0;
		this.xRot = 0.0;
		this.yRot = 0.0;
		this.zRot = 0.0;
    }

    constructor(){
        super();
        this.initVars();
    }
	
	maybeReadCoord(flag){
		//todo
	}
 	
	maybeReadRotation(flag){
		//todo
	}
 	
	maybeWriteCoord(flag, val){
		//todo
	}
 	
	maybeWriteRotation(flag, val){
		//todo
	}

    _decodePayload(){
        //todo
    }

    _encodePayload(){
        //todo
    }
}

module.exports = MoveEntityDeltaPacket;
