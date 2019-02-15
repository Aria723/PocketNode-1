const Command = pocketnode("command/Command");

class VersionCommand extends Command {
    constructor(){
        super("version", "Shows server version..", "pocketnode.command.version", ["ver"]);
    }

    execute(sender, args){
        sender.sendMessage("§aThis server is running PocketNode "+sender.getServer().getPocketNodeVersion()+" for MinecraftPE "+sender.getServer().getVersion())
    }
}

module.exports = VersionCommand;