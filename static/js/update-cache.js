
function checkVersion(currentVer) {
    var version = localStorage.getItem("version_cached");
    if(version != currentVer) {
        // cache outdated. update version in storage and update cache.
        console.log("version outdated. updating cache...")
        localStorage.setItem("version_cached", currentVer);
        window.location.reload(true);
    } else {
        console.log("version " + currentVer + " up to date. cache remaining.")
    }
}