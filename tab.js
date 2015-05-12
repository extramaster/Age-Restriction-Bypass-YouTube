/**
 * Tab action version
 */

// Add a little button to the YouTube watch page, regardless of age restricted status
chrome.tabs.onUpdated.addListener(function(tabID) {
    chrome.tabs.getSelected(null,function(tab){
        if (tab.url.search(/(.*?)\:\/\/(.*)\.youtube\.com\/watch(.*)/i) != -1) {
            chrome.pageAction.show(tabID);
        }
    });
});

// Perform an action when the button is clicked
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        // In this case, the code extracts the YouTube video's ID, and passes it onto the embeddable version.
        code: unescape("var%20QueryString%20%3D%20function%28%29%20%7Bvar%20query_string%20%3D%20%7B%7D%3Bvar%20query%20%3D%20window.location.search.substring%281%29%3Bvar%20vars%20%3D%20query.split%28%27%26%27%29%3Bfor%20%28var%20i%20%3D%200%3B%20i%20%3C%20vars.length%3B%20i++%29%20%7Bvar%20pair%20%3D%20vars%5Bi%5D.split%28%27%3D%27%29%3Bif%20%28typeof%20query_string%5Bpair%5B0%5D%5D%20%3D%3D%3D%20%27undefined%27%29%20%7Bquery_string%5Bpair%5B0%5D%5D%20%3D%20pair%5B1%5D%3B%7D%20else%20if%20%28typeof%20query_string%5Bpair%5B0%5D%5D%20%3D%3D%3D%20%27string%27%29%20%7Bvar%20arr%20%3D%20%5Bquery_string%5Bpair%5B0%5D%5D%2Cpair%5B1%5D%5D%3Bquery_string%5Bpair%5B0%5D%5D%20%3D%20arr%3B%7D%20else%20%7Bquery_string%5Bpair%5B0%5D%5D.push%28pair%5B1%5D%29%3B%7D%7Dreturn%20query_string%3B%7D%28%29%3Bself.location%20%3D%20%27https%3A//www.youtube.com/embed/%27%20+%20QueryString.v%20+%20%27%27%3B")
    });
});