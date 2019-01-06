const LoginPacket = pocketnode("network/minecraft/protocol/LoginPacket");
const PlayStatusPacket = pocketnode("network/minecraft/protocol/PlayStatusPacket");
const ServerToClientHandshakePacket = pocketnode("network/minecraft/protocol/ServerToClientHandshakePacket");
const ClientToServerHandshakePacket = pocketnode("network/minecraft/protocol/ClientToServerHandshakePacket");
const DisconnectPacket = pocketnode("network/minecraft/protocol/DisconnectPacket");
const ResourcePacksInfoPacket = pocketnode("network/minecraft/protocol/ResourcePacksInfoPacket");
const ResourcePackClientResponsePacket = pocketnode("network/minecraft/protocol/ResourcePackClientResponsePacket");
const ResourcePackChunkRequestPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkRequestPacket");
const RequestChunkRadiusPacket = pocketnode("network/minecraft/protocol/RequestChunkRadiusPacket");
const TextPacket = pocketnode("network/minecraft/protocol/TextPacket");
const ScriptCustomEventPacket = pocketnode("network/minecraft/protocol/ScriptCustomEventPacket");
const SetScoreboardIdentityPacket = pocketnode("network/minecraft/protocol/SetScoreboardIdentityPacket");
const SetScorePacket = pocketnode("network/minecraft/protocol/SetScorePacket");
const SpawnParticleEffectPacket = pocketnode("network/minecraft/protocol/SpawnParticleEffectPacket");
const UpdateSoftEnumPacket = pocketnode("network/minecraft/protocol/UpdateSoftEnumPacket");
const NetworkStackLatencyPacket = pocketnode("network/minecraft/protocol/NetworkStackLatencyPacket");
const InteractPacket = pocketnode("network/minecraft/protocol/InteractPacket");
const MovePlayerPacket = pocketnode("network/minecraft/protocol/MovePlayerPacket");

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
        this.registerPacket(ServerToClientHandshakePacket);
        this.registerPacket(ClientToServerHandshakePacket);
        this.registerPacket(DisconnectPacket);
        this.registerPacket(ResourcePacksInfoPacket);
        this.registerPacket(ResourcePackClientResponsePacket);
        this.registerPacket(ResourcePackChunkRequestPacket);
        this.registerPacket(RequestChunkRadiusPacket);
        this.registerPacket(TextPacket);
        this.registerPacket(ScriptCustomEventPacket);
        this.registerPacket(SetScoreboardIdentityPacket);
        this.registerPacket(SetScorePacket);
        this.registerPacket(SpawnParticleEffectPacket);
        this.registerPacket(UpdateSoftEnumPacket);
        this.registerPacket(NetworkStackLatencyPacket);
        this.registerPacket(InteractPacket);
        this.registerPacket(MovePlayerPacket);
    }
}

module.exports = PacketPool;