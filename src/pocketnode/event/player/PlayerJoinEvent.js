const PlayerEvent = pocketnode("event/PlayerEvent");
const Player = pocketnode("entity/Player");

/**
 * Called when a player joins the server, after sending all the spawn packets
 */
class PlayerJoinEvent extends PlayerEvent {
    /**
     * PlayerJoinEvent constructor.
     * @param {Player} player
     * @param {String} joinMessage
     */
    constructor(player, joinMessage){
        super(player);

        this._joinMessage = "";
    }

    /**
     * @param {String} joinMessage
     */
    setJoinMessage(joinMessage){
        this._joinMessage = joinMessage;
    }

    /**
     * @return {String}
     */
    getJoinMessage(){
        return this._joinMessage;
    }
}

module.exports = PlayerJoinEvent;