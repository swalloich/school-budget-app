function loadPartial(name, selector) {
    const region = document.querySelector(selector);
    getFileContents(`../partials/${name}.html`)
        .then(response => {
            region.innerHTML = response;
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Get the contents of a file. Should be used with then.
 * @param {string} filename the path to the file that should be opened.
 * @returns a promise that accesses the file's contents.
 */
function getFileContents(filename) {
    return fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }
            return response.text();
        });
}

export { loadPartial, getFileContents };