const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ScriptCustomEventPacket extends DataPacket {

	static getId(){
		return MinecraftInfo.SCRIPT_CUSTOM_EVENT_PACKET;
	}

	initVars(){
		this.eventName = "";
		this.eventData = "";
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.eventName = this.readString();
		this.eventData = this.readString();
	}

	_encodePayload(){
		this.writeString(this.eventName);
		this.writeString(this.eventData);
	}

	handle(session){
		return session.handleScriptCustomEvent(this);
	}
}

module.exports = ScriptCustomEventPacket;