const Listener = pocketnode("event/Listener");
const Plugin = pocketnode("plugin/Plugin");
const RegisteredListener = pocketnode("plugin/RegisteredListener");

class EventManager {
	constructor(){
		this.initVars();
	}

	initVars(){
		this._listeners = [];
	}

	registerListener(listener, plugin){
		if(listener instanceof Listener && plugin instanceof Plugin){
			this._listeners.push(new RegisteredListener(listener, plugin));
			return true;
		}else{
			throw new Error("Must provide instances of a listener and plugin.");
		}
	}

	callEvent(name, event){
		this._listeners.forEach(listener => listener.callEvent(name, event));
	}
}

module.exports = EventManager;