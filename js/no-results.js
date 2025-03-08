// No Results State Management
const noResultsState = document.getElementById('noResultsState');
const channelList = document.getElementById('channelList');
const groupList = document.getElementById('groupList');
const emptyState = document.getElementById('emptyState');

// Function to show no results message
function showNoResults() {
    if (noResultsState && channelList && groupList && emptyState) {
        noResultsState.style.display = 'flex';
        channelList.style.display = 'none';
        groupList.style.display = 'none';
        emptyState.style.display = 'none';
    }
}

// Function to hide no results message
function hideNoResults() {
    if (noResultsState) {
        noResultsState.style.display = 'none';
    }
}

// Function to check and update search results visibility
function updateSearchResultsVisibility(searchResults, isGroupView = false) {
    if (!searchResults || searchResults.length === 0) {
        showNoResults();
        return false;
    } else {
        hideNoResults();
        if (isGroupView) {
            groupList.style.display = 'grid';
            channelList.style.display = 'none';
        } else {
            channelList.style.display = 'grid';
            groupList.style.display = 'none';
        }
        emptyState.style.display = 'none';
        return true;
    }
}

// Export functions for use in other files
window.noResultsManager = {
    show: showNoResults,
    hide: hideNoResults,
    updateVisibility: updateSearchResultsVisibility
};