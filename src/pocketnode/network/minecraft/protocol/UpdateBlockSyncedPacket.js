const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class UpdateBlockSyncedPacket extends DataPacket {

    static getId(){
        return MinecraftInfo.UPDATE_BLOCK_SYNCED_PACKET;
    }

    initVars(){
        this.uvarint64_1 = 0;
        this.uvarint64_2 = 0;
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

module.exports = UpdateBlockSyncedPacket;