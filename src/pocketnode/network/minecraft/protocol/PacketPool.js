const LoginPacket = pocketnode("network/minecraft/protocol/LoginPacket");
const PlayStatusPacket = pocketnode("network/minecraft/protocol/PlayStatusPacket");
const DisconnectPacket = pocketnode("network/minecraft/protocol/DisconnectPacket");
const ResourcePacksInfoPacket = pocketnode("network/minecraft/protocol/ResourcePacksInfoPacket");
const ResourcePackClientResponsePacket = pocketnode("network/minecraft/protocol/ResourcePackClientResponsePacket");
const ResourcePackChunkRequestPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkRequestPacket");
const RequestChunkRadiusPacket = pocketnode("network/minecraft/protocol/RequestChunkRadiusPacket");
const TextPacket = pocketnode("network/minecraft/protocol/TextPacket");
const RemoveObjectivePacket = pocketnode("network/minecraft/protocol/RemoveObjectivePacket");
const SetLocalPlayerAsInitializedPacket = pocketnode("network/minecraft/protocol/SetLocalPlayerAsInitializedPacket");
const SetDisplayObjectivePacket = pocketnode("network/minecraft/protocol/SetDisplayObjectivePacket");
const SetScorePacket = pocketnode("network/minecraft/protocol/SetScorePacket");
const LabTablePacket = pocketnode("network/minecraft/protocol/LabTablePacket");
const UpdateBlockSyncedPacket = pocketnode("network/minecraft/protocol/UpdateBlockSyncedPacket");
const MoveEntityAbsolutePacket = pocketnode("network/minecraft/protocol/MoveEntityAbsolutePacket");
const MoveEntityDeltaPacket = pocketnode("network/minecraft/protocol/MoveEntityDeltaPacket");

class PacketPool {
    constructor(){
        this.packetPool = new Map();
        this.registerPackets();
    }

    registerPacket(packet){
        this.packetPool.set(packet.getId(), packet);
    }

    getPacket(id){
        return this.packetPool.has(id) ? new (this.packetPool.get(id))() : null;
    }

    isRegistered(id){
        return this.packetPool.has(id);
    }

    registerPackets(){
        this.registerPacket(LoginPacket);
        this.registerPacket(PlayStatusPacket);
        //serverclienthandshake
        //viseversa
        this.registerPacket(DisconnectPacket);
        this.registerPacket(ResourcePacksInfoPacket);
        this.registerPacket(ResourcePackClientResponsePacket);
        this.registerPacket(ResourcePackChunkRequestPacket);
        this.registerPacket(RequestChunkRadiusPacket);
        this.registerPacket(TextPacket);
        this.registerPacket(RemoveObjectivePacket);
		this.registerPacket(SetDisplayObjectivePacket);
		this.registerPacket(SetScorePacket);
		this.registerPacket(LabTablePacket);
		this.registerPacket(UpdateBlockSyncedPacket);
		this.registerPacket(SetLocalPlayerAsInitializedPacket);
		this.registerPacket(MoveEntityAbsolutePacket);
		this.registerPacket(MoveEntityDeltaPacket);
    }
}

module.exports = PacketPool;
