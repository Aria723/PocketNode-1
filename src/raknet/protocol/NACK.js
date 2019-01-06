const AcknowledgementPacket = raknet("protocol/AcknowledgementPacket");

class NACK extends AcknowledgementPacket {
    static getId(){
        return 0xA0;
    }

    constructor(stream){
        super(stream);
    }
}

module.exports = NACK;