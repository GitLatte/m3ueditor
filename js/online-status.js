// Forumdan çevrimiçi durumunu kontrol etme fonksiyonu
async function checkOnlineStatus() {
    try {
        const targetUserId = '1668'; // Hedef kullanıcı ID'si
        let isOnline = false;
        let page = 1;
        
        while (!isOnline && page <= 5) {
            const forumUrl = `https://forum.sinetech.tr/cevrimici/?type=member&page=${page}`;
            const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(forumUrl);
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                throw new Error('Forum yanıt vermedi');
            }
            
            const data = await response.json();
            if (!data.contents) {
                throw new Error('Forum içeriği alınamadı');
            }
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            
            const userList = Array.from(doc.querySelectorAll('[data-user-id]'));
            
            if (userList.length === 0 && page >= 5) {
                break;
            }
            
            isOnline = userList.some(item => item.getAttribute('data-user-id') === targetUserId);
            
            if (!isOnline) {
                page++;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        updateOnlineIndicator(isOnline);

    } catch (error) {
        updateOnlineIndicator(false);
        const isNetworkError = error.message.includes('Forum yanıt vermedi') || error.message.includes('Failed to fetch');
        const retryDelay = Math.min(30000 * (isNetworkError ? 2 : 1), 300000);
        setTimeout(checkOnlineStatus, retryDelay);
    }
}

// Görsel göstergeyi güncelleme fonksiyonu
function updateOnlineIndicator(isOnline) {
    const footerLink = document.querySelector('.footer a');
    
    const existingIndicator = document.querySelector('.online-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (footerLink) {
        const indicator = document.createElement('span');
        indicator.className = 'online-indicator';
        indicator.title = isOnline ? 'Forumda Çevrimiçi' : 'Forumda Çevrimdışı';
        footerLink.insertBefore(indicator, footerLink.firstChild);
    }
}

// Çevrimiçi göstergesi için stil ekle
const style = document.createElement('style');
style.textContent = `
.online-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s ease;
}

.online-indicator[title="Forumda Çevrimiçi"] {
    background-color: #2ecc71;
    box-shadow: 0 0 4px rgba(46, 204, 113, 0.5);
}

.online-indicator[title="Forumda Çevrimdışı"] {
    background-color: #e74c3c;
    box-shadow: 0 0 4px rgba(231, 76, 60, 0.5);
}

.footer a {
    position: relative;
}
`;
document.head.appendChild(style);

// İlk kontrolü yap ve sonra her 60 saniyede bir kontrol et
checkOnlineStatus();
setInterval(checkOnlineStatus, 60000);
