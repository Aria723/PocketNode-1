const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");
const CommandData = pocketnode("network/minecraft/protocol/classes/CommandData");
const CommandParameter = pocketnode("network/minecraft/protocol/classes/CommandParameter");
const assert = require('assert');

class AvailableCommandsPacket extends DataPacket {

    static getId(){
        return MinecraftInfo.AVAILABLE_COMMANDS_PACKET;
    }

    static get ARG_FLAG_VALID(){ return 0x100000 };
	static get ARG_TYPE_INT(){ return 0x01 };
	static get ARG_TYPE_FLOAT(){ return 0x02 };
	static get ARG_TYPE_VALUE(){ return 0x03 };
	static get ARG_TYPE_WILDCARD_INT(){ return 0x04 };
	static get ARG_TYPE_TARGET(){ return 0x05 };
	static get ARG_TYPE_WILDCARD_TARGET(){ return 0x06 };
	static get ARG_TYPE_STRING(){ return 0x0f };
	static get ARG_TYPE_POSITION(){ return 0x10 };
	static get ARG_TYPE_MESSAGE(){ return 0x13 };
	static get ARG_TYPE_RAWTEXT(){ return 0x15 };
	static get ARG_TYPE_JSON(){ return 0x18 };
	static get ARG_TYPE_COMMAND(){ return 0x1f };
	static get ARG_FLAG_ENUM(){ return 0x200000 };
	static get ARG_FLAG_POSTFIX(){ return 0x1000000 };

    initVars(){
	    this.enumValues = [];
	    this.enumValuesCount = 0;
        this.postfixes = [];
	    this.enums = [];
	    this.enumMap = {};
        this.commandData = [];
    }

    constructor(){
        super();
        this.initVars();
    }

    getCommandData(){
		let retval = new CommandData();
		retval.commandName = this.readString();
		retval.commandDescription = this.readString();
		retval.flags = this.readByte();
        retval.permission = this.readByte();
        retval.aliases = this.enums[this.readLInt()] || null;
        let overloadCount = this.readUnsignedVarInt();
		for(let overloadIndex = 0; overloadIndex < overloadCount; overloadIndex += 1){
            let paramCount = this.readUnsignedVarInt();
			for(let paramIndex = 0; paramIndex < paramCount; paramIndex += 1){
				let parameter = new CommandParameter();
				parameter.paramName = this.readString();
				parameter.paramType = this.readLInt();
				parameter.isOptional = this.readBool();
				if(parameter.paramType & this.ARG_FLAG_ENUM){
					let index = (parameter.paramType & 0xffff);
					parameter.enum = this.enums[index] || null;
					assert(parameter.enum !== null, "expected enum at "+index+", but got none");
                }else{
                    if((parameter.paramType & this.ARG_FLAG_VALID) === 0){
                        let index = (parameter.paramType & 0xffff);
                        parameter.postfix = this.postfixes[index] || null;
                        assert(parameter.postfix !== null, "expected postfix at "+index+", but got none");
                    }
				}
				retval.overloads[overloadIndex][paramIndex] = parameter;
			}
		}
		return retval;
    }
    
	putCommandData(data){
		this.writeString(data.commandName);
		this.writeString(data.commandDescription);
		this.writeByte(data.flags);
		this.writeByte(data.permission);
		if(data.aliases !== null){
			this.writeLInt(this.enumMap[data.aliases.enumName] || -1);
		}else{
			this.writeLInt(-1);
		}
        this.writeUnsignedVarInt(data.overloads.length);
        for(let i = 0; i < data.overloads.length; i += 1){
            let overload = data.overloads[i];
            this.writeUnsignedVarInt(overload.length);
            for(let a = 0; a < overload.length; a += 1){
                let parameter = overload[a];
				this.writeString(parameter.paramName);
				if(parameter.enum !== null){
					let type = this.ARG_FLAG_ENUM | this.ARG_FLAG_VALID | (this.enumMap[parameter.enum.enumName] || -1);
				}else{
                    if(parameter.postfix !== null){
                        let key = this.postfixes.indexOf(parameter.postfix);
                        if(key === -1){
                            throw Error("Postfix '"+parameter.postfix+"' not in postfixes array");
                        }
                        let type = parameter.paramType << 24 | key;
                    }else{
                        let type = parameter.paramType;
                    }
				}
				this.writeLInt(type);
				this.writeBool(parameter.isOptional);
			}
		}
	}

    getEnumValueIndex(){
		if(this.enumValuesCount < 256){
			return this.readByte();
		}else{
            if(this.enumValuesCount < 65536){
                return this.readLShort();
            }
            else{
                return this.readLInt();
            }
		}
	}
    
    putEnumValueIndex(index){
		if(this.enumValuesCount < 256){
			this.writeByte(index);
		}else{
            if(this.enumValuesCount < 65536){
			    this.writeLShort(index);
		    }else{
			    this.writeLInt(index);
            }
        }
	}

    getEnum(){
		let retval = new CommandEnum();
        retval.enumName = this.readString();
        let count = this.readUnsignedVarInt()
		for(let i = 0; i < count; i += 1){
			retval.enumValues.push(this.enumValues[this.getEnumValueIndex()]);
		}
		return retval;
    }
    
	putEnum(Enum){
		this.writeString(Enum.enumName);
        this.writeUnsignedVarInt(Enum.enumValues.length);
        for(let i = 0; i < Enum.enumValues.length; i += 1){
            let value = Enum.enumValues[i];
			let index = this.enumValues.indexOf(value)
			if(index === -1){
				throw Error("Enum value "+value+" not found");
			}
			this.putEnumValueIndex(index);
		}
	}

    _decodePayload(){
        this.enumValuesCount = this.readUnsignedVarInt();
        for(let i = 0;  i < this.enumValuesCount; i += 1){
			this.enumValues.push(this.readString());
		}
		for(let i = 0, count = this.readUnsignedVarInt(); i < count; i += 1){
			this.postfixes.push(this.readString());
		}
		for(let i = 0, count = this.readUnsignedVarInt(); i < count; i += 1){
			this.enums.push(this.getEnum());
		}
		for(let i = 0, count = this.readUnsignedVarInt(); i < count; i += 1){
			this.commandData.push(this.getCommandData());
		}
    }

    _encodePayload(){
        let enumValuesMap = {};
		let postfixesMap = {};
        let enumMap = {};
        for(let i = 0; i < this.commandData.length; i += 1){
            let commandData = this.commandData[i];
            if(commandData.aliases !== null){
                enumMap[commandData.aliases.enumName] = commandData.aliases;
                for(let a = 0; a < commandData.aliases.enumValues.length; a += 1){
                    let str = commandData.aliases.enumValues[i];
                    enumValuesMap[str] = true;
				}
            }
            for(let b = 0; b < commandData.overloads.length; i += 1){
                let overload = commandData.overloads[i];
                for(let c = 0; c < overload.length; c += 1){
                    let parameter = overload[c];
                    if(parameter.enum !== null){
                        enumMap[parameter.enum.enumName] = parameter.enum;
                        for(let d = 0; d < parameter.enum.enumValues.length; d += 1){
                            let str = parameter.enum.enumValues[d];
							enumValuesMap[str] = true;
						}
					}
					if(parameter.postfix !== null){
						postfixesMap[parameter.postfix] = true;
					}
				}
			}
        }
        this.enumValues = Object.keys(enumValuesMap);
        this.enumValuesCount = this.enumValues.length;
        this.writeUnsignedVarInt(this.enumValuesCount);
        for(let e = 0; e < this.enumValues.length; e += 1){
			this.writeString(this.enumValues[e]);
		}
		this.postfixes = Object.keys(postfixesMap);
        this.writeUnsignedVarInt(this.postfixes.length);
        for(let f = 0; f < this.postfixes.length; f += 1){
            this.writeString(this.postfixes[f]);
        }
		this.enums = Object.values(enumMap);
		this.enumMap = flipArray(Object.keys(enumMap));
        this.writeUnsignedVarInt(this.enums.length);
        for(let g = 0; g < this.enums; g += 1){
            this.putEnum(this.enums[g]);
        }
        this.writeUnsignedVarInt(this.commandData.length);
        for(let h = 0; h < this.commandData.length; h += 1){
            this.putCommandData(this.commandData[h]);
        }
    }

    handle(session){
        return session.handleAvailableCommands(this);
    }
}

module.exports = AvailableCommandsPacket;