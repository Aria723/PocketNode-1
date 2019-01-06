const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

const BinaryStream = pocketnode("network/minecraft/NetworkBinaryStream");
const Utils = pocketnode("utils/Utils");

const Skin = pocketnode("entity/Skin");

const Base64 = pocketnode("utils/Base64");
const Isset = pocketnode("utils/methods/Isset");

class LoginPacket extends DataPacket {
	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.LOGIN_PACKET;
	}

	initVars(){
		this.username = "";
		this.protocol = 0;
		this.clientUUID = "";
		this.clientId = 0;
		this.xuid = "";
		this.identityPublicKey = "";
		this.serverAddress = "";
		this.locale = "";
		this.skin = null;

		this.chainData = [];
		this.clientDataJwt = "";
		this.clientData = [];
	}

	canBeSentBeforeLogin(){
		return true;
	}

	mayHaveUnreadBytes(){
		return this.protocol !== 0 && this.protocol !== MinecraftInfo.PROTOCOL;
	}

	_decodePayload(){
		this.protocol = this.readInt();

		let stream = new BinaryStream(this.read(this.readUnsignedVarInt()));
		this.chainData = JSON.parse(stream.read(stream.readLInt()).toString());

		this.chainData.chain.forEach(chain => {
			let webtoken = Utils.decodeJWT(chain);
			if(Isset(webtoken.extraData)){
				if(Isset(webtoken.extraData.displayName)){
					this.username = webtoken.extraData.displayName;
				}
				if(Isset(webtoken.extraData.identity)){
					this.clientUUID = webtoken.extraData.identity;
				}
				if(Isset(webtoken.extraData.XUID)){
					this.xuid = webtoken.extraData.XUID;
				}

				if(Isset(webtoken.identityPublicKey)){
					this.identityPublicKey = webtoken.identityPublicKey;
				}
			}
		});

		this.clientDataJwt = stream.read(stream.readLInt()).toString();
		this.clientData = Utils.decodeJWT(this.clientDataJwt);

		this.clientId = Isset(this.clientData.ClientRandomId) ? this.clientData.ClientRandomId : null;
		this.serverAddress = Isset(this.clientData.ServerAddress) ? this.clientData.ServerAddress : null;

		this.locale = this.clientData.languageCode;

		this.skin = new Skin(
			this.clientData.SkinId,
			Base64.decode(this.clientData.SkinData ? this.clientData.SkinData : ""),
			Base64.decode(this.clientData.CapeData ? this.clientData.CapeData : ""),
			(this.clientData.SkinGeometryName ? this.clientData.SkinGeometryName : ""),
			Base64.decode(this.clientData.SkinGeometry ? this.clientData.SkinGeometry : "")
		);
	}

	handle(session){
		return session.handleLogin(this);
	}
}

module.exports = LoginPacket;