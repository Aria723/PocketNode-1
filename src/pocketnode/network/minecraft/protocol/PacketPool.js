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
const MovePlayerPacket = pocketnode("network/minecraft/protocol/MovePlayerPacket");
const ChunkRadiusUpdatedPacket = pocketnode("network/minecraft/protocol/ChunkRadiusUpdatedPacket");
const CommandOutputPacket = pocketnode("network/minecraft/protocol/CommandOutputPacket");
const CommandRequestPacket = pocketnode("network/minecraft/protocol/CommandRequestPacket");
const FullChunkDataPacket = pocketnode("network/minecraft/protocol/FullChunkDataPacket");
const ResourcePackChunkDataPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkDataPacket");
const ResourcePackDataInfoPacket = pocketnode("network/minecraft/protocol/ResourcePackDataInfoPacket");
const ResourcePackStackPacket = pocketnode("network/minecraft/protocol/ResourcePackStackPacket");
const StartGamePacket = pocketnode("network/minecraft/protocol/StartGamePacket");
const AvailableCommandsPacket = pocketnode("network/minecraft/protocol/AvailableCommandsPacket");

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
        this.registerPacket(MovePlayerPacket);
        this.registerPacket(ChunkRadiusUpdatedPacket);
        this.registerPacket(CommandOutputPacket);
        this.registerPacket(CommandRequestPacket);
        this.registerPacket(FullChunkDataPacket);
        this.registerPacket(ResourcePackChunkDataPacket);
        this.registerPacket(ResourcePackDataInfoPacket);
        this.registerPacket(ResourcePackStackPacket);
        this.registerPacket(StartGamePacket);
        this.registerPacket(AvailableCommandsPacket);
    }
}

module.exports = PacketPool;
