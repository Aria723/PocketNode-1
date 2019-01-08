const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");
const NetworkBinaryStream = pocketnode("network/minecraft/NetworkBinaryStream");
const PermissionLevel = pocketnode("permission/PermissionLevel");
const SFS = pocketnode("utils/SimpleFileSystem");

class StartGamePacket extends DataPacket {
	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.START_GAME_PACKET;
	}

	initVars(){
		this.runtimeIdTable = null;

		this.entityUniqueId = 0;
		this.entityRuntimeId = 0;
		this.playerGamemode = 0;

		this.playerPosition = null;

		this.pitch = 0.0;
		this.yaw = 0.0;

		this.seed = 0;
		this.dimension = 0;
		this.generator = 1; //default infinite - 0 old, 1 infinite, 2 flat
		this.worldGamemode = 0;
		this.difficulty = 0;
		this.spawnX = 0;
		this.spawnY = 0;
		this.spawnZ = 0;
		this.hasAchievementsDisabled = true;
		this.time = 0;
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
		this.defaultPlayerPermission = PermissionLevel.MEMBER;
		this.xboxLiveBroadcastMode = 0; //TODO: find values
		this.serverChunkTickRadius = 4;
		this.hasPlatformBroadcast = false;
		this.platformBroadcastMode = 0;
		this.xboxLiveBroadcastIntent = false;
		this.hasLockedBehaviorPack = false;
		this.hasLockedResourcePack = false;
		this.isFromLockedWorldTemplate = false;
		this.useMsaGamertagsOnly = false;
		this.isFromWorldTemplate = false;
		this.isWorldTemplateOptionLocked = false;

		this.levelId = ""; //base64 string, usually the same as world folder name in vanilla
		this.worldName = "";
		this.premiumWorldTemplateId = "";
		this.isTrial = false;
		this.currentTick = 0;
		this.enchantmentSeed = 0;
		this.multiplayerCorrelationId = "";
	}

	_decodePayload(){
		this.entityUniqueId = this.readEntityUniqueId();
		this.entityRuntimeId = this.readEntityRuntimeId();
		this.playerGamemode = this.readVarInt();

		this.playerPosition = this.readVector3Obj();

		this.pitch = this.readLFloat();
		this.yaw = this.readLFloat();

		//Level settings
		this.seed = this.readVarInt();
		this.dimension = this.readVarInt();
		this.generator = this.readVarInt();
		this.worldGamemode = this.readVarInt();
		this.difficulty = this.readVarInt();
		[this.spawnX, this.spawnY, this.spawnZ] = this.readBlockPosition();
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
		this.gameRules = this.readGameRules();
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
		this.useMsaGamertagsOnly = this.readBool();
		this.isFromWorldTemplate = this.readBool();
		this.isWorldTemplateOptionLocked = this.readBool();

		this.levelId = this.readString();
		this.worldName = this.readString();
		this.premiumWorldTemplateId = this.readString();
		this.isTrial = this.readBool();
		this.currentTick = this.readLLong();

		this.enchantmentSeed = this.readVarInt();

		let count = this.readUnsignedVarInt();
		for(let i = 0; I < count; i++){
			this.readString();
			this.readLShort();
		}

		this.multiplayerCorrelationId = this.readString();
	}

	_encodePayload(){
		this.writeEntityUniqueId(this.entityUniqueId);
		this.writeEntityRuntimeId(this.entityRuntimeId);
		this.writeVarInt(this.playerGamemode);

		this.writeVector3Obj(this.playerPosition);

		this.writeLFloat(this.pitch);
		this.writeLFloat(this.yaw);

		this.writeVarInt(this.seed);
		this.writeVarInt(this.dimension);
		this.writeVarInt(this.generator);
		this.writeVarInt(this.worldGamemode);
		this.writeVarInt(this.difficulty);
		this.writeBlockPosition(this.spawnX, this.spawnY, this.spawnZ);
		this.writeBool(this.hasAchievementsDisabled);
		this.writeVarInt(this.time);
		this.writeBool(this.eduMode);
		this.writeBool(this.hasEduFeaturesEnabled);
		this.writeLFloat(this.rainLevel);
		this.writeLFloat(this.lightningLevel);
		this.writeBool(this.isMultiplayerGame);
		this.writeBool(this.hasLANBroadcast);
		this.writeBool(this.hasXboxLiveBroadcast);
		this.writeBool(this.commandsEnabled);
		this.writeBool(this.isTexturePacksRequired);
		this.writeGameRules(this.gameRules);
		this.writeBool(this.hasBonusChestEnabled);
		this.writeBool(this.hasStartWithMapEnabled);
		this.writeBool(this.hasTrustPlayersEnabled);
		this.writeVarInt(this.defaultPlayerPermission);
		this.writeVarInt(this.xboxLiveBroadcastMode);
		this.writeLInt(this.serverChunkTickRadius);
		this.writeBool(this.hasPlatformBroadcast);
		this.writeVarInt(this.platformBroadcastMode);
		this.writeVarInt(this.xboxLiveBroadcastIntent);
		this.writeVarInt(this.hasLockedBehaviorPack);
		this.writeVarInt(this.hasLockedResourcePack);
		this.writeVarInt(this.isFromLockedWorldTemplate);
		this.writeBool(this.useMsaGamertagsOnly);
		this.writeBool(this.isFromWorldTemplate);
		this.writeBool(this.isWorldTemplateOptionLocked);

		this.writeString(this.levelId);
		this.writeString(this.worldName);
		this.writeString(this.premiumWorldTemplateId);
		this.writeBool(this.isTrial);
		this.writeLLong(this.currentTick);

		this.writeVarInt(this.enchantmentSeed);

		if(this.runtimeIdTable === null){
			let stream = new NetworkBinaryStream();
			let data = pocketnode("resources/runtimeid_table.json");
			stream.writeUnsignedVarInt(data.length);
			for(let i = 0; i < data.length; ++i){
				let v = data[i];
				stream.writeString(v.name);
				stream.writeLShort(v.data);
			}
			console.log(1);
			this.runtimeIdTable = stream.getBuffer();
		}
		this.append(this.runtimeIdTable);

		this.writeString(this.multiplayerCorrelationId);
	}
}

module.exports = StartGamePacket;