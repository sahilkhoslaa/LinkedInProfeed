// content.js
let hiddenTags = [];

//let querySelector = '.feed-shared-update-v2, .feed-shared-update, .scaffold-finite-scroll__content, .relative > div[data-urn*="urn:li:activity"]';
let querySelector = '.absolute, .align-items-center, .align-items-flex-start, .artdeco-button__text, .artdeco-card, .artdeco-dropdown, .artdeco-dropdown--is-dropdown-element, .artdeco-dropdown--justification-right, .artdeco-dropdown--placement-bottom, .artdeco-dropdown__content, .artdeco-dropdown__content--arrow-right, .artdeco-dropdown__content--has-arrow, .artdeco-dropdown__content--justification-right, .artdeco-dropdown__content--placement-bottom, .base-video-s-loader, .break-words, .comment-options-trigger, .comment-social-activity, .comment-social-activity--is-reply, .comments-comment-item__inline-show-more-text, .comments-comment-list__container, .comments-comment-list__load-more-container, .comments-comment-meta__actor, .comments-comment-meta__container, .comments-comment-meta__container--parent, .comments-comment-meta__description-subtitle, .comments-comment-meta__info, .comments-comment-meta__options, .comments-comment-social-bar--cr, .comments-comment-social-bar__action-group--cr, .comments-comment-social-bar__vertical-divider, .comments-comments-list, .comments-comments-list--cr, .comments-highlighted-comment-item__show-more-text, .comments-replies-list, .comments-see-translation-button__wrapper, .comments-thread-entity, .comments-thread-item, .comments-thread-line, .comments-thread-spacing__default, .comments-thread-spacing__small, .content-admin-identity-toggle-button__image-and-caret-wrapper, .display-flex, .dropdown-options, .ember-view, .feed-shared-control-menu, .feed-shared-control-menu__content, .feed-shared-inline-show-more-text, .feed-shared-inline-show-more-text--2-lines, .feed-shared-inline-show-more-text--3-lines, .feed-shared-inline-show-more-text--minimal-padding, .feed-shared-social-action-bar, .feed-shared-social-action-bar--full-width, .feed-shared-social-action-bar--has-identity-toggle, .feed-shared-social-action-bar--has-social-counts, .feed-shared-social-action-bar--new-padding, .feed-shared-social-action-bar__action-button, .feed-shared-update-v2, .feed-shared-update-v2--e2e, .feed-shared-update-v2--minimal-padding, .feed-shared-update-v2--with-carousel-fix, .feed-shared-update-v2--with-hide-post, .feed-shared-update-v2__comments-container, .feed-shared-update-v2__content, .feed-shared-update-v2__control-menu, .feed-shared-update-v2__control-menu-container, .feed-shared-update-v2__description, .fie-impression-container, .flex-column, .flex-grow-1, .flex-wrap, .full-height, .full-width, .ivm-image-view-model, .ivm-view-attr__img-wrapper, .justify-center, .media-player, .media-player--use-mercado, .media-player__player, .mr2, .pr4, .pt2, .relative, .social-details-social-counts, .social-details-social-counts--no-vertical-padding, .social-reshare-button__share-dropdown-content, .t-12, .t-14, .t-black, .t-black--light, .t-bold, .t-normal, .text-align-right, .text-heading-small, .update-components-actor--with-control-menu, .update-components-actor__avatar, .update-components-actor__container, .update-components-actor__meta, .update-components-article--with-large-image, .update-components-article__description-container, .update-components-article__link-container, .update-components-article__title, .update-components-header, .update-components-header--with-control-menu, .update-components-header--with-control-menu-and-hide-post, .update-components-header--with-divider, .update-components-header--with-image, .update-components-header__image, .update-components-header__text-wrapper, .update-components-image, .update-components-image--single-image, .update-components-image__container, .update-components-image__container-wrapper, .update-components-linkedin-video, .update-components-linkedin-video__container, .update-components-linkedin-video__description-headline, .update-components-linkedin-video__sponsored-description, .update-components-linkedin-video__sponsored-description-container, .update-components-text, .update-components-update-v2__commentary, .update-v2-social-activity, .video-js, .video-s-loader, .video-s-loader--video-loading, .video-s-loader__video-container, .video-s-loader__video-container--immersive-player-controls, .visually-hidden, .vjs-button, .vjs-control, .vjs-control-bar, .vjs-control-bar--inline, .vjs-control-bar--tier, .vjs-controls-enabled, .vjs-current-time, .vjs-custom-control-spacer, .vjs-duration, .vjs-error-display, .vjs-fluid, .vjs-has-started, .vjs-hidden, .vjs-layout-medium, .vjs-live-control, .vjs-live-display, .vjs-load-progress, .vjs-loading-spinner, .vjs-menu, .vjs-menu-button, .vjs-menu-button-popup, .vjs-modal-dialog, .vjs-modal-dialog-content, .vjs-mouse-display, .vjs-paused, .vjs-play-progress, .vjs-playback-rate, .vjs-playback-rate-value, .vjs-poster, .vjs-poster-background, .vjs-progress-control, .vjs-progress-holder, .vjs-remaining-time, .vjs-slider, .vjs-slider-bar, .vjs-slider-horizontal, .vjs-slider-vertical, .vjs-spacer, .vjs-text-track-display, .vjs-time-control, .vjs-time-display, .vjs-time-divider, .vjs-time-tooltip, .vjs-tooltip, .vjs-tooltip-container, .vjs-tooltip-left, .vjs-tooltip-right, .vjs-user-active, .vjs-user-inactive, .vjs-v7, .vjs-volume-bar, .vjs-volume-control, .vjs-volume-level, .vjs-volume-panel, .vjs-volume-panel-vertical, .vjs-volume-tooltip, .vjs-volume-vertical, .vjs-workinghover';

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