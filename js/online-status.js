// Forumdan çevrimiçi durumunu kontrol etme fonksiyonu
async function checkOnlineStatus() {
    try {
        const proxyUrl = 'https://cors.gitlatte.workers.dev/?url=';
        const forumUrl = 'https://forum.sinetech.tr';
        
        const response = await fetch(proxyUrl + encodeURIComponent(forumUrl));
        const html = await response.text();
        
        // 'Latte' çevrimiçi kullanıcılar listesinde mi kontrol et
        const isOnline = html.toLowerCase().includes('latte');
        
        // Görsel göstergeyi güncelle
        updateOnlineIndicator(isOnline);
    } catch (error) {
        console.error('Çevrimiçi durum kontrolünde hata:', error);
        // Hata durumunda göstergeyi gizle
        updateOnlineIndicator(false);
    }
}

// Görsel göstergeyi güncelleme fonksiyonu
function updateOnlineIndicator(isOnline) {
    const footerLink = document.querySelector('.footer a');
    
    // Varsa mevcut göstergeyi kaldır
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

// Çevrimiçi göstergesi için stil ekle
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

// İlk kontrolü yap ve sonra her 60 saniyede bir kontrol et
checkOnlineStatus();
setInterval(checkOnlineStatus, 60000);