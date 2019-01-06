const Packet = raknet("protocol/Packet");
const MessageIdentifiers = raknet("protocol/MessageIdentifiers");

class DisconnectionNotification extends Packet {
    static getId(){
        return MessageIdentifiers.ID_DISCONNECTION_NOTIFICATION;
    }
}

module.exports = DisconnectionNotification;