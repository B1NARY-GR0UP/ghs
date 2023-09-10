chrome.contextMenus.create({
    id: "ghsContextMenu",
    title: "GitHub Searcher",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "ghsCurrentTab",
    title: "Search in Current Tab",
    parentId: "ghsContextMenu",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "ghsNewTab",
    title: "Search in New Tab",
    parentId: "ghsContextMenu",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "ghsCurrentTab") {
        search(info.selectionText, false);
    } else if (info.menuItemId === "ghsNewTab") {
        search(info.selectionText, true);
    }
});

function search(selectedText, newTab) {
    const searchUrl = `https://github.com/search?q=${encodeURIComponent(selectedText)}&type=repositories`;
    if (newTab) {
        chrome.tabs.create({ url: searchUrl });
    } else {
        chrome.tabs.update({ url: searchUrl });
    }
}
