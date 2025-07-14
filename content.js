// content.js
let hiddenTags = [];

let querySelector = '.feed-shared-update-v2, .feed-shared-update, .scaffold-finite-scroll__content, .relative > div[data-urn*="urn:li:activity"]';

// Function to load tags from storage
function loadTags() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('hiddenTags', (data) => {
            if (data.hiddenTags) {
                hiddenTags = data.hiddenTags.map(tag => tag.toLowerCase());
            } else {
                hiddenTags = [];
            }
            console.log('LinkedIn Post Hider: Loaded tags:', hiddenTags);
            resolve();
        });
    });
}

// Function to check if a post should be hidden
function shouldHidePost(postElement) {
    // LinkedIn posts typically have a main content area that contains text.
    // We'll look for text content within the post.
    const postTextContent = postElement.textContent.toLowerCase();

    // Check if any of the hidden tags are present in the post's text content
    for (const tag of hiddenTags) {
        if (postTextContent.includes(tag)) {
            return true; // Found a matching tag, hide the post
        }
    }
    return false; // No matching tags found
}

// Function to hide a post
function hidePost(postElement) {
    if (postElement) {
        postElement.style.display = 'none';
        console.log('LinkedIn Post Hider: Hidden a post.');
    }
}

// Function to process newly added posts
function processNewPosts(nodes) {
    nodes.forEach(node => {
        // Ensure the node is an element and not just text
        if (node.nodeType === 1) {
            // LinkedIn feed items are often within a specific class.
            // You might need to inspect LinkedIn's current DOM structure to find the most accurate selector.
            // Common selectors for feed posts include:
            // .feed-shared-update-v2
            // .feed-shared-update
            // .relative
            // .scaffold-finite-scroll__content > div
            // For robustness, we'll look for elements that are likely individual posts.
            // A common pattern is a div with a role of "article" or a specific data-urn.
            // Let's try a common class name for feed items.

            const postElements = node.querySelectorAll(querySelector);

            postElements.forEach(post => {
                if (shouldHidePost(post)) {
                    hidePost(post);
                }
            });
        }
    });
}

// MutationObserver to detect new posts loaded dynamically
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            processNewPosts(mutation.addedNodes);
        }
    });
});

// Start observing the document body for changes
// This will cover initial page load and dynamic content loading
loadTags().then(() => {
    // Initial scan of existing posts on page load
    const initialPosts = document.querySelectorAll(querySelector);
    initialPosts.forEach(post => {
        if (shouldHidePost(post)) {
            hidePost(post);
        }
    });

    // Observe the main content area for new posts
    // The main feed container might be a good target for the observer
    const feedContainer = document.querySelector('.scaffold-finite-scroll__content');
    if (feedContainer) {
        observer.observe(feedContainer, { childList: true, subtree: true });
        console.log('LinkedIn Post Hider: Observing feed container for new posts.');
    } else {
        // Fallback to observing the body if the specific container isn't found immediately
        observer.observe(document.body, { childList: true, subtree: true });
        console.log('LinkedIn Post Hider: Observing document body for new posts (fallback).');
    }
});

// Listen for changes in storage (e.g., if user updates tags in popup)
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.hiddenTags) {
        loadTags().then(() => {
            // Re-process all visible posts with new tags
            const allVisiblePosts = document.querySelectorAll(querySelector);
            allVisiblePosts.forEach(post => {
                // Ensure post is visible before attempting to hide it again
                if (post.style.display !== 'none') {
                    if (shouldHidePost(post)) {
                        hidePost(post);
                    }
                } else {
                    // If a post was previously hidden but no longer matches a tag, make it visible
                    // This is important for when tags are removed
                    if (!shouldHidePost(post)) {
                        post.style.display = ''; // Reset display to default
                    }
                }
            });
        });
    }
});