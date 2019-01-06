const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class NetworkStackLatencyPacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.NETWORK_STACK_LATENCY_PACKET;
	}

	initVars(){
		this.timestamp = 0;
	}

	_decodePayload(){
		this.timestamp = this.readLLong();
	}

	_encodePayload(){
		this.writeLLong(this.timestamp);
	}

	handle(session){
		return session.handleNetworkStackLatency(this);
	}
}

module.exports = NetworkStackLatencyPacket;