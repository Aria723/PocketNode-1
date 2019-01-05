class ScorePacketEntry {

	initVars(){
		this.TYPE_PLAYER = 1;
		this.TYPE_ENTITY = 2;
		this.TYPE_FAKE_PLAYER = 3;

		this.scoreboardId = 0;
		this.objectiveName = "";
		this.score = 0;

		this.type = 0;

		this.entityUniqueId = null;
		this.customName = null;
	}

	constructor(){
		this.initVars();
	}
}