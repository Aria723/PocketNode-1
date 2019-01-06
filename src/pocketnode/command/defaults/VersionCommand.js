const Command = pocketnode("command/Command");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class VersionCommand extends Command {
	constructor(){
		super("version", "Check the server's current PocketNode version.", "pocketnode.command.version", ["ver"]);
	}

	execute(sender, args){
		sender.sendMessage("This server is running " + sender.getServer().getName() + " " + sender.getServer().getPocketNodeVersion() + " for Minecraft: Bedrock Edition " + sender.getServer().getVersion() + " (protocol version " + MinecraftInfo.PROTOCOL + ")");
	}
}

module.exports = VersionCommand;