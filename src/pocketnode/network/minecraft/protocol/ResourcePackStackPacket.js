const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ResourcePackStackPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.RESOURCE_PACK_STACK_PACKET;
    }

    initVars(){
        this.mustAccept = false;

        this.behaviorPackStack = [];
        this.resourcePackStack = [];

        this.isExperimental = false;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.mustAccept = this.readBool();
        let behaviorPackCount  = this.readUnsignedVarInt();
        while(behaviorPackCount-- > 0){
            this.readString();
            this.readString();
            this.readString();
        }

        let resourcePackCount = this.readUnsignedVarInt();
        while(resourcePackCount-- > 0){
            this.readString();
            this.readString();
            this.readString();
        }

        this.isExperimental = this.readBool();
    }

    _encodePayload(){
        this.writeBool(this.mustAccept);
        this.writeUnsignedVarInt(this.behaviorPackStack.length);
        this.behaviorPackStack.forEach(entry => {
            this.writeString(entry.getPackId())
                .writeString(entry.getPackVersion())
                .writeString("");
        });

        this.writeUnsignedVarInt(this.resourcePackStack.length);
        this.resourcePackStack.forEach(entry => {
            this.writeString(entry.getPackId())
                .writeString(entry.getPackVersion())
                .writeString("");
        });

        this.writeBool(this.isExperimental);
    }

    handle(session){
        session.handleResourcePackStack(this);
    }
}

module.exports = ResourcePackStackPacket;