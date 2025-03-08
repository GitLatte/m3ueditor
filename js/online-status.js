// Function to check online status from the forum
async function checkOnlineStatus() {
    try {
        const proxyUrl = 'https://cors.gitlatte.workers.dev/?url=';
        const forumUrl = 'https://forum.sinetech.tr';
        
        const response = await fetch(proxyUrl + encodeURIComponent(forumUrl));
        const html = await response.text();
        
        // Check if 'Latte' is in the online users list
        const isOnline = html.toLowerCase().includes('latte');
        
        // Update the visual indicator
        updateOnlineIndicator(isOnline);
    } catch (error) {
        console.error('Error checking online status:', error);
        // In case of error, don't show the indicator
        updateOnlineIndicator(false);
    }
}

// Function to update the visual indicator
function updateOnlineIndicator(isOnline) {
    const footerLink = document.querySelector('.footer a');
    
    // Remove existing indicator if any
    const existingIndicator = document.querySelector('.online-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (isOnline && footerLink) {
        const indicator = document.createElement('span');
        indicator.className = 'online-indicator';
        indicator.title = 'Forumda Çevrimiçi';
        footerLink.insertBefore(indicator, footerLink.firstChild);
    }
}

// Add styles for the online indicator
const style = document.createElement('style');
style.textContent = `
.online-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #2ecc71;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 4px rgba(46, 204, 113, 0.5);
}

.footer a {
    position: relative;
}
`;
document.head.appendChild(style);

// Check status initially and then every 60 seconds
checkOnlineStatus();
setInterval(checkOnlineStatus, 60000);