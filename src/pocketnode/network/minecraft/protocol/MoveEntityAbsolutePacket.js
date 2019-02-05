const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class MoveEntityAbsolutePacket extends DataPacket {

    static getId(){
        return MinecraftInfo.MOVE_ENTITY_ABSOLUTE_PACKET;
    }

    static get FLAG_GROUND() {return 0x01};
	static get FLAG_TELEPORT() {return 0x02};

    initVars(){
        this.entityRuntimeId = -1;
		this.flags = 0;
		this.position = []; //vector3
		this.xRot = -1;
		this.yRot = -1;
		this.zRot = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        //todo
    }

    _encodePayload(){
        //todo
    }
}

module.exports = MoveEntityAbsolutePacket;
