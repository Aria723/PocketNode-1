const Chunk = pocketnode("level/chunk/Chunk");

class Generator {
	/**
	 * Generator Options
	 * @constructor
	 * @param options
	 */
	constructor(options = {}){
		this._options = options;
	}

	/**
	 * Generator Name
	 * @return {string}
	 */
	getName(){
		return "unknown";
	}

	/**
	 * Generate Chunk
	 * @param chunkX {Number}
	 * @param chunkZ {Number}
	 * @param level {Level}
	 *
	 * @return {Boolean|Chunk}
	 */
	generateChunk(chunkX, chunkZ, level = null){
	}
}

module.exports = Generator;