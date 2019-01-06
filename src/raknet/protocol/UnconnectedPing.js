const OfflineMessage = raknet("protocol/OfflineMessage");
const MessageIdentifiers = raknet("protocol/MessageIdentifiers");

class UnconnectedPing extends OfflineMessage {
	constructor(stream){
		super(stream);
		this.initVars();
	}

	static getId(){
		return MessageIdentifiers.ID_UNCONNECTED_PING;
	}

	initVars(){
		this.pingId = -1;
	}

	decodePayload(){
		this.pingId = this.getStream().readLong();
		this.readMagic();
	}
}

module.exports = UnconnectedPing;