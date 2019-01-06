const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class InteractPacket extends DataPacket {

	static getId(){
		return MinecraftInfo.INTERACT_PACKET;
	}

	static ACTION_LEAVE_VEHICLE(){return 3;}
	static ACTION_MOUSEOVER(){return 4;}
	static ACTION_OPEN_INVENTORY(){return 6;}

	initVars(){
		this.action = 0;
		this.target = 0;

		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	constructor(){
		super();
		this.initVars();
	}

	_decodePayload(){
		this.action = this.readByte();
		this.target = this.getEntityRuntimeId();

		if(this.action === InteractPacket.ACTION_MOUSEOVER()){
			this.x = this.readLFloat();
			this.y = this.readLFloat();
			this.z = this.readLFloat();
		}
	}

	_encodePayload(){
		this.writeByte(this.action);
		this.writeEntityRuntimeId(this.target);

		if(this.action === InteractPacket.ACTION_MOUSEOVER()){
			this.writeLFloat(this.x);
			this.writeLFloat(this.y);
			this.writeLFloat(this.z);
		}
	}

	handle(session){
		return session.handleInteract(this);
	}
}

module.exports = InteractPacket;