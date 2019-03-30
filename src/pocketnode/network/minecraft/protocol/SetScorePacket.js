const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SetScorePacket extends DataPacket {

    static getId(){
        return MinecraftInfo.SET_SCORE_PACKET;
    }

    static get TYPE_MODIFY_SCORE() {return 0};
	static get TYPE_RESET_SCORE() {return 1};

    initVars(){
        this.type = -1;
        this.entries = []; //ScorePacketEntry[]
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

module.exports = SetScorePacket;