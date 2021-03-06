const Command = pocketnode("command/Command");

class StopCommand extends Command {
    constructor(){
        super("stop", "Stops the server.", "pocketnode.command.stop", ["shutdown"]);
    }

    execute(sender, args){
        sender.sendMessage("§cServer shutting down.")
        sender.getServer().shutdown();
    }
}

module.exports = StopCommand;