/**
 * Return a Concussion object to read and write headers values.
 * @param {object} headers
 * @returns {Concussion}
 */
function concussion(headers) {
    return {
        headers: headers,
        read: read.bind(null, headers),
        write: write.bind(null, headers),
        remove: remove.bind(null, remove)
    };
}

/**
 * Read a headers value.
 * @param {object} headers
 * @param {string} name
 * @returns {string}
 */
function read(headers, name) {
    var normal = name.toLowerCase();

    for (var prop in headers) {
        if (prop.toLowerCase() === normal) {
            return headers[prop];
        }
    }

    return undefined;
};

/**
 * Write a headers value.
 * @param {object} headers
 * @param {string} name
 * @param {string} value
 */
function write(headers, name, value) {
    var normal = name.toLowerCase();

    for (var prop in headers) {
        if (prop.toLowerCase() === normal) {
            headers[prop] = value;
            return;
        }
    }

    headers[name] = value;
};

/**
 * Remove a headers value.
 * @param {object} headers
 * @param {string} name
 */
function remove(headers, name) {
    var normal = name.toLowerCase();

    for (var prop in headers) {
        if (prop.toLowerCase() === normal) {
            delete headers[prop];
            return;
        }
    }
};

/** export decorated concussion function */
module.exports = concussion;
module.exports.read = read;
module.exports.write = write;
module.exports.remove = remove;


/** ADDITIONAL DEFS **/


/**
 * @typedef {object} Concussion
 */

/**
 * @name Concussion#write
 * @method
 * @param {string} name
 * @param {string} value
 */

/**
 * @name Concussion#read
 * @method
 * @param {string} name
 * @returns {string}
 */

/**
 * @name Concussion#remove
 * @method
 * @param {string} name
 */

