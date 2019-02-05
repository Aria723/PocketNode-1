const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class StartGamePacket extends DataPacket {
    static getId(){
        return MinecraftInfo.START_GAME_PACKET;
    }

    initVars(){
        this.entityUniqueId = 0;
        this.entityRuntimeId = 0;
        this.playerGamemode = 0;

        this.playerPosition = null;

        this.pitch = 0.0;
        this.yaw = 0.0;

        this.seed = 0;
        this.dimension = 0;
        this.generator = 2; //default infinite - 0 old, 1 infinite, 2 flat
        this.worldGamemode = 0;
        this.difficulty = 0;
        this.spawnX = 0;
        this.spawnY = 0;
        this.spawnZ = 0;
        this.hasAchievementsDisabled = true;
        this.time = -1;
        this.eduMode = false;
        this.hasEduFeaturesEnabled = false;

        this.rainLevel = 0.0;
        this.lightningLevel = 0.0;
        this.isMultiplayerGame = true;
        this.hasLANBroadcast = true;
        this.hasXboxLiveBroadcast = false;
        this.commandsEnabled = true;
        this.isTexturePacksRequired = true;

        this.gameRules = []; //TODO: implement this
        this.hasBonusChestEnabled = false;
        this.hasStartWithMapEnabled = false;
        this.hasTrustPlayersEnabled = false;
        this.defaultPlayerPermission = 1;//PlayerPermissions::MEMBER; //TODO
        this.xboxLiveBroadcastMode = 0; //TODO: find values
        this.serverChunkTickRadius = 4;

        this.hasPlatformBroadcast = false;
        this.platformBroadcastMode = 0;
        this.xboxLiveBroadcastIntent = false;
        this.hasLockedBehaviorPack = false;
        this.hasLockedResourcePack = false;
        this.isFromLockedWorldTemplate = false;

        this.levelId = ""; //base64 string, usually the same as world folder name in vanilla

        this.worldName = "";

        this.premiumWorldTemplateId = "";
        this.isTrial = false;
        this.currentTick = 0;
        this.enchantmentSeed = 0;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.entityUniqueId = this.getEntityUniqueId();
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.playerGamemode = this.readVarInt();

        this.playerPosition = this.getVector3Obj();

        this.pitch = this.readLFloat();
        this.yaw = this.readLFloat();

        //Level settings
        this.seed = this.readVarInt();
        this.dimension = this.readVarInt();
        this.generator = this.readVarInt();
        this.worldGamemode = this.readVarInt();
        this.difficulty = this.readVarInt();
        [this.spawnX, this.spawnY, this.spawnZ] = this.getBlockPosition();
        this.hasAchievementsDisabled = this.readBool();
        this.time = this.readVarInt();
        this.eduMode = this.readBool();
        this.hasEduFeaturesEnabled = this.readBool();
        this.rainLevel = this.readLFloat();
        this.lightningLevel = this.readLFloat();
        this.isMultiplayerGame = this.readBool();
        this.hasLANBroadcast = this.readBool();
        this.hasXboxLiveBroadcast = this.readBool();
        this.commandsEnabled = this.readBool();
        this.isTexturePacksRequired = this.readBool();
        this.gameRules = this.getGameRules();
        this.hasBonusChestEnabled = this.readBool();
        this.hasStartWithMapEnabled = this.readBool();
        this.hasTrustPlayersEnabled = this.readBool();
        this.defaultPlayerPermission = this.readVarInt();
        this.xboxLiveBroadcastMode = this.readVarInt();
        this.serverChunkTickRadius = this.readLInt();

        this.hasPlatformBroadcast = this.readBool();
        this.platformBroadcastMode = this.readVarInt();
        this.xboxLiveBroadcastIntent = this.readBool();
        this.hasLockedBehaviorPack = this.readBool();
        this.hasLockedResourcePack = this.readBool();
        this.isFromLockedWorldTemplate = this.readBool();

        this.levelId = this.readString();
        this.worldName = this.readString();
        this.premiumWorldTemplateId = this.readString();
        this.isTrial = this.readBool();
        this.currentTick = this.readLLong();

        this.enchantmentSeed = this.readVarInt();
    }

    _encodePayload(){
        this.writeEntityUniqueId(this.entityUniqueId);
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeVarInt(this.playerGamemode);

        this.writeVector3Obj(this.playerPosition);

        this.writeLFloat(this.pitch)
            .writeLFloat(this.yaw);

        this.writeVarInt(this.seed)
            .writeVarInt(this.dimension)
            .writeVarInt(this.generator)
            .writeVarInt(this.worldGamemode)
            .writeVarInt(this.difficulty)
            .writeBlockPosition(this.spawnX, this.spawnY, this.spawnZ)
            .writeBool(this.hasAchievementsDisabled)
            .writeVarInt(this.time)
            .writeBool(this.eduMode)
            .writeBool(this.hasEduFeaturesEnabled)
            .writeLFloat(this.rainLevel)
            .writeLFloat(this.lightningLevel)
            .writeBool(this.isMultiplayerGame)
            .writeBool(this.hasLANBroadcast)
            .writeBool(this.hasXboxLiveBroadcast)
            .writeBool(this.commandsEnabled)
            .writeBool(this.isTexturePacksRequired)
            .writeGameRules(this.gameRules)
            .writeBool(this.hasBonusChestEnabled)
            .writeBool(this.hasStartWithMapEnabled)
            .writeBool(this.hasTrustPlayersEnabled)
            .writeVarInt(this.defaultPlayerPermission)
            .writeVarInt(this.xboxLiveBroadcastMode)
            .writeLInt(this.serverChunkTickRadius);

        this.writeBool(this.hasPlatformBroadcast)
            .writeVarInt(this.platformBroadcastMode)
            .writeBool(this.xboxLiveBroadcastIntent)
            .writeBool(this.hasLockedBehaviorPack)
            .writeBool(this.hasLockedResourcePack)
            .writeBool(this.isFromLockedWorldTemplate);

        this.writeString(this.levelId)
            .writeString(this.worldName)
            .writeString(this.premiumWorldTemplateId)
            .writeBool(this.isTrial)
            .writeLLong(this.currentTick);

        this.writeVarInt(this.enchantmentSeed);
    }
}

module.exports = StartGamePacket;