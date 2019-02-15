class CommandData{
    constructor(){
        this.commandName;
		this.commandDescription;
		this.flags;
		this.permission;
		this.aliases;
		this.overloads = {};
    }
}

module.exports = CommandData;