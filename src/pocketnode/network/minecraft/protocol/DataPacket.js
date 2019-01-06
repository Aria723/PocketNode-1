const assert = require("assert");

const BinaryStream = pocketnode("network/minecraft/NetworkBinaryStream");
const Vector3 = pocketnode("math/Vector3");

class DataPacket extends BinaryStream {
	constructor(){
		super();

		this.isEncoded = false;
		this.extraByte1 = 0;
		this.extraByte2 = 0;
	}

	static getId(){
		return 0;
	}

	getId(){
		return this.constructor.getId();
	}

	getName(){
		return this.constructor.name;
	}

	canBeBatched(){
		return true;
	}

	canBeSentBeforeLogin(){
		return false;
	}

	mayHaveUnreadBytes(){
		return false;
	}

	decode(){
		this.offset = 0;
		this._decodeHeader();
		this._decodePayload();
	}

	_decodeHeader(){
		let packetId = this.readUnsignedVarInt();
		assert(packetId === this.getId());
	}

	_decodePayload(){
	}

	encode(){
		this.reset();
		this._encodeHeader();
		this._encodePayload();
		this.isEncoded = true;
	}

	_encodeHeader(){
		this.writeUnsignedVarInt(this.getId());
	}

	_encodePayload(){
	}

	getBuffer(){
		return this.buffer;
	}

	readEntityUniqueId(){
		return this.readVarLong();
	}

	writeEntityUniqueId(eid){
		this.writeVarLong(eid);
		return this;
	}

	readEntityRuntimeId(){
		return this.readUnsignedVarLong();
	}

	writeEntityRuntimeId(eid){
		this.writeUnsignedVarLong(eid);
		return this;
	}

	readVector3Obj(){
		return new Vector3(
			this.readRoundedLFloat(4),
			this.readRoundedLFloat(4),
			this.readRoundedLFloat(4)
		);
	}

	writeVector3Obj(vector){
		this.writeLFloat(vector.x);
		this.writeLFloat(vector.y);
		this.writeLFloat(vector.z);
	}

	readBlockPosition(){
		return [
			this.readVarInt(),
			this.readUnsignedVarInt(),
			this.readVarInt()
		];
	}

	writeBlockPosition(x, y, z){
		this.writeVarInt(x)
			.writeUnsignedVarInt(y)
			.writeVarInt(z);
		return this;
	}

	readGameRules(){
		let count = this.readUnsignedVarInt();
		let rules = [];
		for(let i = 0; i < count; ++i){
			let name = this.readString();
			let type = this.readUnsignedVarInt();
			let value = null;
			switch(type){
				case 1:
					value = this.readBool();
					break;
				case 2:
					value = this.readUnsignedVarInt();
					break;
				case 3:
					value = this.readLFloat();
					break;
			}

			rules[name] = [type, value];
		}

		return rules;
	}

	writeGameRules(rules){
		this.writeUnsignedVarInt(rules.length);
		rules.forEach(rule => {
			this.writeString(rule.getName());
			if(typeof rule.getValue() === "boolean"){
				this.writeByte(1);
				this.writeBool(rule.getValue());
			}else if(Number.isInteger(rule.getValue())){
				this.writeByte(2);
				this.writeUnsignedVarInt(rule.getValue());
			}else if(typeof rule.getValue() === "number" && !Number.isInteger(rule.getValue())){
				this.writeByte(3);
				this.writeLFloat(rule.getValue());
			}
		});

		return this;
	}

	handle(session){
		return false;
	}
}

module.exports = DataPacket;