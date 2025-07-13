// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const acknowledgementSection = document.getElementById('acknowledgementSection');
    const acknowledgeCheckbox = document.getElementById('acknowledgeCheckbox');
    const acceptAcknowledgementButton = document.getElementById('acceptAcknowledgement');
    const mainContent = document.getElementById('mainContent');
    const tagsInput = document.getElementById('tagsInput');
    const saveButton = document.getElementById('saveTags');
    const messageDiv = document.getElementById('message');

    // Function to show the main content and hide acknowledgment
    function showMainContent() {
        acknowledgementSection.classList.add('hidden');
        mainContent.classList.remove('hidden');
        // Load saved tags when the main content is shown
        chrome.storage.sync.get('hiddenTags', (data) => {
            if (data.hiddenTags) {
                tagsInput.value = data.hiddenTags.join(', ');
            }
        });
    }

    // Check if acknowledgment has been accepted
    chrome.storage.sync.get('acknowledgementAccepted', (data) => {
        if (data.acknowledgementAccepted) {
            showMainContent();
        } else {
            acknowledgementSection.classList.remove('hidden');
            mainContent.classList.add('hidden');
        }
    });

    // Enable/disable the "Continue" button based on checkbox state
    acknowledgeCheckbox.addEventListener('change', () => {
        if (acknowledgeCheckbox.checked) {
            acceptAcknowledgementButton.disabled = false;
            acceptAcknowledgementButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            acceptAcknowledgementButton.disabled = true;
            acceptAcknowledgementButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });

    // Handle acknowledgment acceptance
    acceptAcknowledgementButton.addEventListener('click', () => {
        if (acknowledgeCheckbox.checked) {
            chrome.storage.sync.set({ acknowledgementAccepted: true }, () => {
                showMainContent();
            });
        }
    });

    // Save tags when the button is clicked (existing functionality)
    saveButton.addEventListener('click', () => {
        const tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        chrome.storage.sync.set({ hiddenTags: tags }, () => {
            messageDiv.textContent = 'Tags saved!';
            messageDiv.classList.remove('hidden');
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 2000); // Hide message after 2 seconds
        });
    });
});
