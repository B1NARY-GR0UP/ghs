/**
 * Copyright 2023 BINARY Members
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
