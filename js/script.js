// Tema değiştirme fonksiyonu
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    const themeBtn = document.querySelector('.btn-theme span');
    
    if (isDark) {
        themeBtn.className = 'koyu-tema-ay';
    } else {
        themeBtn.className = 'gunesli-gunler';
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Varsayılan logo URL'sini değiştirelim
const DEFAULT_LOGO = 'images/default-channel.png';  // Görüntüleme için
const FALLBACK_LOGO = 'images/default-channel.png'; // Kaydetme için

// Hazır User Agent listesi
const PREDEFINED_USER_AGENTS = {
    'Chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Firefox': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    'Safari': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    'Android': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'iOS': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
};

// Metni temizleme fonksiyonu
function cleanQuotedText(text) {
    // Tırnak işaretleri arasındaki metni bul
    const matches = text.match(/"([^"]*)"/g);
    if (!matches) return text;
    
    return text.replace(/"([^"]*)"/g, (match, content) => {
        // İç boşlukları koru, baş ve sondaki boşlukları temizle
        return `"${content.trim()}"`;
    });
}

// Rastgele renk üretme fonksiyonu
function getRandomColor() {
    const letters = '456789ABCDEF'; // Daha soft renkler için 0-3 rakamlarını çıkardık
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Grup simgesi ve rengi belirleme
function getGroupInfo(groupTitle) {
    if (!groupTitle) {
        return { icon: "fas fa-question", color: "#CCCCCC" }; // Varsayılan değer
    }

    const groupTitle_lower = groupTitle.toLowerCase();
    
    // Grup adı içerik kontrolü
    const groupMatches = {
        'haber': { icon: "fas fa-newspaper", color: "#FF5733" },
        'müzik': { icon: "fas fa-music", color: "#33FF57" },
        'spor': { icon: "fas fa-futbol", color: "#3357FF" },
        'film': { icon: "fas fa-film", color: "#FF33A1" },
        'çocuk': { icon: "fas fa-child", color: "#FFB733" },
        'belgesel': { icon: "fas fa-photo-video", color: "#33FFE9" },
        'dizi': { icon: "fas fa-tv", color: "#D433FF" },
        'sinema': { icon: "fas fa-film", color: "#FF33A1" },
        'eğlence': { icon: "fas fa-smile", color: "#33FF57" },
        'yaşam': { icon: "fas fa-heart", color: "#FF3333" },
        'doğa': { icon: "fas fa-leaf", color: "#33FF33" },
        'bilim': { icon: "fas fa-flask", color: "#3333FF" },
        'teknoloji': { icon: "fas fa-microchip", color: "#33FFFF" },
        'eğitim': { icon: "fas fa-graduation-cap", color: "#FF33FF" },
        'dini': { icon: "fas fa-pray", color: "#FFFF33" },
        'yerel': { icon: "fas fa-city", color: "#FF9933" }
    };

    // Grup adında eşleşme ara
    for (const [key, value] of Object.entries(groupMatches)) {
        if (groupTitle_lower.includes(key)) {
            return value;
        }
    }

    // Eşleşme yoksa varsayılan simge ve kaydedilmiş rastgele renk
    return {
        icon: "fas fa-tv",
        color: getRandomColor() // Rastgele renk
    };
}

// Kanal kartı oluşturma
function createChannelCard(channel, index, filteredChannels = null) {
    const displayLogo = channel.tvgLogo || DEFAULT_LOGO;
    const realIndex = channels.findIndex(ch => 
        (ch.tvgId && ch.tvgId === channel.tvgId) || 
        (ch.tvgName === channel.tvgName && ch.channelUrl === channel.channelUrl)
    );
    
    // Grup simgesi ve rengi
    const groupInfo = getGroupInfo(channel.groupTitle);

    // Favori kontrolü - URL'ye göre kontrol et
    const isFavorite = localStorage.getItem(`favorite_${encodeURIComponent(channel.channelUrl)}`) !== null;
    const favoriteIconClass = isFavorite ? 'fas fa-heart' : 'far fa-heart';

    // Custom headers göstergesi
    const hasCustomHeaders = channel.customHeaders && Object.keys(channel.customHeaders).length > 0;

    return `
        <div class="channel-card" data-id="${index}">
            <span class="order-number">${index + 1}</span>
            <div class="channel-header">
                <img src="${displayLogo}" 
                     alt="${channel.tvgName}" 
                     class="channel-logo"
                     onerror="this.src='${DEFAULT_LOGO}'">
                <div class="channel-info">
                    <h3>${channel.tvgName}</h3>
                    <div class="channel-group">
                        <i class="${groupInfo.icon}" style="color: ${groupInfo.color};"></i> ${channel.groupTitle}
                    </div>
                </div>
            </div>
            <div class="channel-actions">
                <button class="move-up" data-index="${index}">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="move-down" data-index="${index}">
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button data-action="play" data-url="${channel.channelUrl}" data-name="${channel.tvgName}">
                    <i class="fas fa-play"></i> 
                </button>
                <button class="favorite-button" onclick="toggleFavorite('${encodeURIComponent(channel.channelUrl)}', event)">
                    <i class="${favoriteIconClass}"></i>
                </button>
                <button data-action="edit" data-index="${realIndex}" onclick="editChannel(${realIndex})">
                    <i class="fas fa-edit"></i>
                </button>
                <button data-action="delete" data-index="${realIndex}" onclick="deleteChannel(${realIndex})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Kanal listesini güncelleme
const CHANNELS_PER_PAGE = 100; // Her sayfada gösterilecek kanal sayısı
let currentPage = 0;
let totalPages = 0;
let currentChannels = [];

function updateChannelList(filteredChannels = null, page = null) {
    const channelList = document.getElementById('channelList');
    const groupList = document.getElementById('groupList');
    const emptyState = document.getElementById('emptyState');
    const sortFilter = document.getElementById('sortFilter');
    const groupFilter = document.getElementById('groupFilter');
    const paginationContainer = document.getElementById('channelPagination');

    // Use current page if no specific page is provided
    const targetPage = page !== null ? page : currentPage;

    // Reset both group and channel list displays
    if (groupList) {
        groupList.style.display = 'none';
    }

    if (!channelList) {
        console.error('Kanal listesi bulunamadı');
        return;
    }

    // Determine which channels to display based on current filters
    let displayChannels;
    if (filteredChannels !== null) {
        displayChannels = [...filteredChannels];
    } else {
        // Apply group filter if no specific filtered channels provided
        const selectedGroup = groupFilter ? groupFilter.value : '';
        if (selectedGroup && selectedGroup !== 'all') {
            displayChannels = channels.filter(ch => ch.groupTitle === selectedGroup);
        } else {
            displayChannels = [...channels];
        }
    }

    // Update current channels and apply favorites
    currentChannels = displayChannels.map(channel => ({
        ...channel,
        isFavorite: localStorage.getItem(`favorite_${encodeURIComponent(channel.channelUrl)}`) !== null
    }));

    // Apply sorting
    const sortType = sortFilter ? sortFilter.value : 'default';
    currentChannels = sortChannels(currentChannels, sortType);
    
    // Update pagination state
    totalPages = Math.ceil(currentChannels.length / CHANNELS_PER_PAGE);
    currentPage = Math.min(targetPage, Math.max(0, totalPages - 1));

    if (currentChannels.length > 0) {
        emptyState.style.display = 'none';
        channelList.style.display = 'grid';

        if (paginationContainer) {
            paginationContainer.style.display = 'flex';
        }

        // Calculate visible channels for current page
        const startIndex = currentPage * CHANNELS_PER_PAGE;
        const endIndex = Math.min(startIndex + CHANNELS_PER_PAGE, currentChannels.length);
        const visibleChannels = currentChannels.slice(startIndex, endIndex);

        // Update pagination controls
        updatePagination();

        // Render visible channels
        channelList.innerHTML = visibleChannels.map((channel, index) => 
            createChannelCard(channel, startIndex + index, currentChannels)
        ).join('');

        // Update UI elements
        updateGroupFilter();
        document.querySelector('.section-buttons').style.display = 'flex';
        attachEventListenersToVisibleChannels(startIndex);
    } else {
        // Handle empty state
        emptyState.style.display = 'block';
        channelList.style.display = 'none';
        document.querySelector('.section-buttons').style.display = 'none';
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
    }

    // Update UI state
    reattachEventListeners();
    updateStats();
    updateControlsVisibility();
    
    if (channels.length > 0) {
        updateUnsavedChanges(true);
    }
}

function updatePagination() {
    let paginationContainer = document.getElementById('channelPagination');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'channelPagination';
        paginationContainer.className = 'pagination';
        document.getElementById('channelList').parentNode.insertBefore(
            paginationContainer,
            document.getElementById('channelList')
        );
    }

    const maxVisiblePages = 5;
    let paginationHTML = '';

    // Önceki sayfa butonu
    paginationHTML += `<button class="page-btn" ${currentPage === 0 ? 'disabled' : ''} onclick="updateChannelList(currentChannels, ${currentPage - 1})">«</button>`;

    // Sayfa numaraları
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="updateChannelList(currentChannels, ${i})">${i + 1}</button>`;
    }

    // Sonraki sayfa butonu
    paginationHTML += `<button class="page-btn" ${currentPage >= totalPages - 1 ? 'disabled' : ''} onclick="updateChannelList(currentChannels, ${currentPage + 1})">»</button>`;


    paginationContainer.innerHTML = paginationHTML;
}

function attachEventListenersToVisibleChannels(startIndex) {
    document.querySelectorAll('.move-up').forEach((button, index) => {
        button.addEventListener('click', () => {
            moveChannelUp(startIndex + index);
            updateChannelList(null, currentPage);
        });
    });

    document.querySelectorAll('.move-down').forEach((button, index) => {
        button.addEventListener('click', () => {
            moveChannelDown(startIndex + index);
            updateChannelList(null, currentPage);
        });
    });
}


// Video oynatıcı modalı
function previewStream(url, channelName) {
    const modal = document.createElement('div');
    modal.className = 'modal stream-preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${channelName}</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-container">
                <div class="resolution-info">
                    <span></span>
                </div>
                <video id="player" controls crossorigin="anonymous" playsinline></video>
            </div>
            <div class="player-actions">
                <button class="btn-proxy-player" onclick="switchToProxyPlayer('${url}', this)">
                    <span class="btn-proxy-look"></span> Proxy Desteğiyle Oynat
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    const video = modal.querySelector('video');
    const resolutionInfo = modal.querySelector('.resolution-info span');
    
    // Plyr player'ı başlat
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
    });

    // HLS.js ile video oynatıcıyı başlat
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        // Çözünürlük bilgisini göster
        video.addEventListener('loadedmetadata', () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            if (width && height) {
                let quality = '';
                if (height >= 4320) quality = 'UHD2-8K';
                else if (height >= 2160) quality = 'UHD-4K';
                else if (height >= 1440) quality = 'FHD-2K';
                else if (height >= 1080) quality = 'FullHD';
                else if (height >= 720) quality = 'HD';
                else quality = 'SD';
                
                resolutionInfo.innerHTML = `
                    <div class="quality-badge ${quality.toLowerCase().replace(' ', '-')}">
                        <span class="quality-label">${quality}</span>
                        <span class="quality-resolution">${height}p</span>
                    </div>
                `;
            }
        });
    }

    // Modal kapatma
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        player.destroy();
        modal.remove();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            player.destroy();
            modal.remove();
        }
    };
}

// Proxy player'a geçiş fonksiyonu
function switchToProxyPlayer(url, button) {
    const modalContent = button.closest('.modal-content');
    const videoContainer = modalContent.querySelector('.video-container');
    
    // Mevcut player'ı temizle
    const player = new Plyr('#player');
    if (player) {
        player.destroy();
    }
    
    // Video player'ı iframe ile değiştir
    videoContainer.innerHTML = `
        <iframe 
            src="https://gitlatte.github.io/videotest/?url=${encodeURIComponent(url)}" 
            frameborder="0" 
            style="width: 100%; height: 500px;"
            allowfullscreen>
        </iframe>
    `;
    
    // Butonu gizle
    button.style.display = 'none';
}

// Arama ve filtreleme
function filterChannels(searchTerm) {
    const filteredChannels = channels.filter(channel => 
        channel.tvgName.toLowerCase().includes(searchTerm) ||
        channel.groupTitle.toLowerCase().includes(searchTerm)
    );
    updateChannelList(filteredChannels);
}

document.querySelector('.search-bar input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    filterChannels(searchTerm);
});

// Quick Actions ve Yeni Kanal butonunun görünürlüğünü kontrol etme
function updateControlsVisibility() {
    const hasChannels = document.querySelector('#channelList').children.length > 0;
    const filterContainer = document.querySelector('.filter-container');
    const searchBar = document.querySelector('.search-bar');
    const addButton = document.querySelector('.btn-add');

    if (hasChannels) {
        filterContainer.style.display = 'block';
        searchBar.style.display = 'block';
        addButton.style.display = 'block';
    } else {
        filterContainer.style.display = 'none';
        searchBar.style.display = 'none';
        addButton.style.display = 'none';
    }
}

// Editor Tutorial Implementation
function showEditorTutorial() {
    if (!window.currentEditor) return;
    const editor = window.currentEditor;
    const tutorialSteps = [
        {
            title: 'M3U Dosya Yapısı',
            content: '#EXTM3U satırı ile başlayalım. Bu satır, dosyanın bir M3U listesi olduğunu belirtir.',
            action: () => {
                editor.setValue('#EXTM3U\n');
                editor.setPosition({ lineNumber: 2, column: 1 });
            }
        },
        {
            title: 'Kanal Bilgisi Ekleme',
            content: 'Her kanal için #EXTINF:-1 ile başlayan bir satır eklememiz gerekiyor. Bu satırda kanalın adı, logosu, grubu gibi bilgiler yer alır.',
            action: () => {
                editor.setValue(editor.getValue() + '#EXTINF:-1 tvg-name="Örnek Kanal" tvg-id="" tvg-logo="" group-title="Genel",Örnek Kanal\n');
                editor.setPosition({ lineNumber: 3, column: 1 });
            }
        },
        {
            title: 'Kanal URL Ekleme',
            content: 'Kanal bilgisinden sonraki satıra kanalın yayın URL\'ini ekliyoruz.',
            action: () => {
                editor.setValue(editor.getValue() + 'http://example.com/live/stream.m3u8\n');
                editor.setPosition({ lineNumber: 4, column: 1 });
            }
        },
        {
            title: 'Tamamlandı!',
            content: 'Tebrikler! Artık M3U dosya yapısını öğrendiniz. Bu şablonu kullanarak kendi kanallarınızı ekleyebilirsiniz.',
            action: null
        }
    ];

    let currentStep = 0;

    function showTutorialStep() {
        const step = tutorialSteps[currentStep];
        const tutorialBox = document.createElement('div');
        tutorialBox.className = 'editor-tutorial-box';
        tutorialBox.innerHTML = `
            <h3>${step.title}</h3>
            <p>${step.content}</p>
            <div class="tutorial-navigation">
                ${currentStep > 0 ? '<button class="prev-step">Önceki</button>' : ''}
                ${currentStep < tutorialSteps.length - 1 ? '<button class="next-step">Sonraki</button>' : '<button class="finish-tutorial">Bitir</button>'}
            </div>
        `;

        // Remove existing tutorial box if any
        const existingBox = document.querySelector('.editor-tutorial-box');
        if (existingBox) existingBox.remove();

        document.querySelector('.modal-content').appendChild(tutorialBox);

        if (step.action) step.action();

        // Event listeners
        const prevBtn = tutorialBox.querySelector('.prev-step');
        const nextBtn = tutorialBox.querySelector('.next-step');
        const finishBtn = tutorialBox.querySelector('.finish-tutorial');

        if (prevBtn) prevBtn.onclick = () => {
            currentStep--;
            showTutorialStep();
        };

        if (nextBtn) nextBtn.onclick = () => {
            currentStep++;
            showTutorialStep();
        };

        if (finishBtn) finishBtn.onclick = () => {
            tutorialBox.remove();
        };
    }

    showTutorialStep();
}

// Tema kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.btn-theme span');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.className = 'gunesli-gunler';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        themeBtn.className = 'koyu-tema-ay';
    } else {
        // Varsayılan tema (light)
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark-theme');
        themeBtn.className = 'koyu-tema-ay';
    }
});

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (!dropdown.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    });
});

// Önce tüm stil tanımlamalarını en üste alalım
const editorStyles = `
.error-line {
    background: rgba(255, 0, 0, 0.1);
    border-left: 3px solid red;
}

.warning-line {
    background: rgba(255, 255, 0, 0.1);
    border-left: 3px solid yellow;
}

.error-glyph {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="red"/><path d="M8 3v7m0 2v1" stroke="white" stroke-width="2"/></svg>') center center no-repeat;
    background-size: 12px;
}

.warning-glyph {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 1L1 15h14L8 1zm0 4v6m0 1v1" stroke="yellow" fill="none" stroke-width="2"/></svg>') center center no-repeat;
    background-size: 12px;
}
`;

const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    background: var(--dark-sidebar);
    color: var(--dark-text);
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.notification.show {
    transform: translateX(0);
}

.notification i {
    font-size: 1.2em;
}

.notification.success i {
    color: var(--success);
}

.notification.error i {
    color: var(--danger);
}
`;

// Sonra customStyles tanımlaması
const customStyles = `
${notificationStyles}
${editorStyles}

/* Ek stiller */
.test-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    z-index: 9999;
}
.glow-on-hover {
    border: none;
    outline: none;
    color: #fff;
    background: #4d9bd6;
    cursor: pointer;
    border-radius: 10px;
}


.btn-ogret {
    background-color: #5bc0de !important;   
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: #4d9bd6
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #4d9bd6;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}    
`;

// Tek bir style elementi kullan
if (!document.getElementById('customStyles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'customStyles';
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
}

// Temel değişkenler
let channels = [];
let currentFileName = 'playlist.m3u';
let editHistory = [];
window.hasUnsavedChanges = false;

// Yeni liste oluşturma
function createNewM3U() {
    // Sadece değişiklik varsa sor
    if (channels.length > 0 && window.hasUnsavedChanges) {
        if (!confirm('Kaydedilmemiş değişiklikleriniz olabilir. Yeni liste oluşturmak istediğinizden emin misiniz?')) {
            return;
        }
    }
    channels = [];
    updateChannelList();
    currentFileName = 'm3ulistem.m3u';
    showNotification('Yeni liste oluşturuldu. Lütfen en az bir kanal ekleyin.', 'info');
    clearNotifications(); // Bildirimleri temizle
    updateNotificationBadge(); // Bildirim sayacını güncelle
    updateUnsavedChanges(false); // Yeni boş liste için false
    
    // Yeni liste oluşturulduktan sonra kanal ekleme modalını aç
    showChannelModal();
}

// Butonun tıklama olayını dinle
document.querySelector('.yeni-olustur').addEventListener('click', createNewM3U);

// Liste yükleme
function loadM3U() {
    if (window.hasUnsavedChanges) {
        if (!confirm('Kaydedilmemiş değişiklikleriniz olabilir. Yeni liste yüklemek istediğinizden emin misiniz?')) {
            return;
        }
    }
    const fileInput = document.getElementById('fileInput');
    fileInput.accept = '.m3u,.txt';
    fileInput.value = '';
    fileInput.click();

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                if (parseM3U(content)) {
                    // Show controls
                    document.querySelector('.filter-container').style.display = 'block';
                    document.querySelector('.search-bar').style.display = 'block';
                    document.querySelector('.btn-add').style.display = 'block';
                    
                    // Reset pagination
                    currentPage = 0;
                    updateChannelList();
                    
                    if (channels.length === 0) {
                        showChannelModal();
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    clearNotifications();
    updateNotificationBadge();
}

// URL ile yükleme fonksiyonu
async function loadFromUrl() {
    showLoading(); // Yükleme animasyonunu göster
    if (window.hasUnsavedChanges) {
        if (!confirm('Kaydedilmemiş değişiklikleriniz olabilir. Yeni liste yüklemek istediğinizden emin misiniz?')) {
            return;
        }
    }

    const url = prompt('Lütfen liste URL adresini girin:');
    if (!url) return;

    showNotification('Liste yükleniyor...', 'info');

    try {
        const response = await fetch('https://appcors.gitlatte.workers.dev/?targetUrl=' + encodeURIComponent(url));
        if (!response.ok) throw new Error('Liste alınamadı');

        const content = await response.text();
        
        // M3U formatı kontrolü
        if (!isValidM3U(content)) {
            throw new Error('Geçersiz M3U formatı');
        }

        // Listeyi parse et ve göster
        if (parseM3U(content)) {
            // Kontrolleri göster
            document.querySelector('.filter-container').style.display = 'block';
            document.querySelector('.search-bar').style.display = 'block';
            document.querySelector('.btn-add').style.display = 'block';
            
            if (channels.length === 0) {
                showChannelModal(); // Boş liste için kanal ekleme modalını göster
            }
        }

        updateChannelList();
        showNotification('Liste başarıyla yüklendi', 'success');

        clearNotifications(); // Bildirimleri temizle
        updateNotificationBadge(); // Bildirim sayacını güncelle

    } catch (error) {
        console.error('Liste yükleme hatası:', error);
        showNotification('Liste yüklenemedi: ' + error.message, 'error');
        setTimeout(() => window.location.reload(), 2000);
    }
    hideLoading(); // Yükleme animasyonunu gizle
}

// M3U format kontrolü
function isValidM3U(content) {
    const lines = content.trim().split('\n');
    const firstLine = lines[0].trim();

    // Check if first line is exactly '#EXTM3U' or '#EXTM3U' with x-tvg-url
    const validFirstLine = firstLine === '#EXTM3U' || /^#EXTM3U x-tvg-url="[^"]+"$/.test(firstLine);
    if (!validFirstLine) return false;

    let hasValidEntries = false;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
            if (i + 1 < lines.length && lines[i + 1].trim().startsWith('http')) {
                hasValidEntries = true;
                break;
            }
        }
    }
    return hasValidEntries;
}

// M3U içeriğini parse etme
function parseM3U(content) {
    try {
        const lines = content.split('\n');
        const newChannels = [];
        let currentChannel = null;
        let httpReferrer = '';
        let userAgent = '';
        let epgUrl = '';
        let customHeaders = {};
        updateControlsVisibility();

        // Extract EPG URL if present
        const firstLine = lines[0].trim();
        const epgMatch = firstLine.match(/^#EXTM3U x-tvg-url="([^"]+)"/);        
        if (epgMatch) {
            epgUrl = epgMatch[1];
            window.epgUrl = epgUrl; // Store EPG URL globally
        } else {
            window.epgUrl = null; // Clear EPG URL if not present
        }

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('#EXTINF:')) {
                // EXTINF satırını temizle
                line = cleanQuotedText(line);
                currentChannel = {
                    tvgName: '',
                    tvgId: '',
                    tvgLogo: DEFAULT_LOGO,
                    groupTitle: '',
                    channelUrl: '',
                    httpReferrer: '',
                    userAgent: '',
                    customHeaders: {}
                };

                // EXTINF bilgilerini parse et
                const matches = {
                    tvgName: line.match(/tvg-name="([^"]+)"/),
                    tvgId: line.match(/tvg-id="([^"]+)"/),
                    tvgLogo: line.match(/tvg-logo="([^"]+)"/),
                    groupTitle: line.match(/group-title="([^"]+)"/)
                };

                Object.keys(matches).forEach(key => {
                    if (matches[key]) {
                        currentChannel[key] = matches[key][1].trim();
                    }
                });

                // Kanal adını al
                const channelName = line.split(',').pop().trim();
                if (channelName && !currentChannel.tvgName) {
                    currentChannel.tvgName = channelName;
                }
            } else if (line.startsWith('#EXTVLCOPT:http-referrer=')) {
                httpReferrer = line.replace('#EXTVLCOPT:http-referrer=', '');
                if (currentChannel) currentChannel.httpReferrer = httpReferrer;
            } else if (line.startsWith('#EXTVLCOPT:http-user-agent=')) {
                userAgent = line.replace('#EXTVLCOPT:http-user-agent=', '');
                if (currentChannel) currentChannel.userAgent = userAgent;
            } else if (line.startsWith('#EXTVLCOPT:http-custom-header=')) {
                const headerPart = line.replace('#EXTVLCOPT:http-custom-header=', '');
                const [name, value] = headerPart.split('=');
                if (currentChannel && name && value) {
                    currentChannel.customHeaders[name] = value;
                }
            } else if (line && currentChannel && !line.startsWith('#')) {
                currentChannel.channelUrl = line;
                currentChannel.httpReferrer = httpReferrer;
                currentChannel.userAgent = userAgent;
                // Ensure customHeaders are properly copied before resetting
                newChannels.push({...currentChannel, customHeaders: {...currentChannel.customHeaders}});
                currentChannel = null;
                httpReferrer = '';
                userAgent = '';
                customHeaders = {};
            }
        });

        channels = newChannels;
        updateChannelList();
        showNotification('Liste başarıyla yüklendi', 'success');
        return true;
    } catch (error) {
        console.error('Parse error:', error);
        showNotification('Liste yüklenirken hata oluştu', 'error');
        return false;
    }
}

// Dosya yükleme olayı
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!['m3u', 'txt'].includes(fileExt)) {
        showNotification('Geçersiz dosya formatı. Sadece .m3u ve .txt dosyaları desteklenir.', 'error');
        return;
    }

    showNotification('Liste yükleniyor...', 'info');

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        if (parseM3U(content)) {
            // Kontrolleri göster
            document.querySelector('.filter-container').style.display = 'block';
            document.querySelector('.search-bar').style.display = 'block';
            document.querySelector('.btn-add').style.display = 'block';
            
            if (channels.length === 0) {
                showChannelModal(); // Boş liste için kanal ekleme modalını göster
            }
        }
    };
    reader.readAsText(file);
});

// Bildirim gösterme
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                       type === 'error' ? 'fa-exclamation-circle' : 
                       'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 3000);
        }, 3000);
    }, 100);
}

// İstatistikleri güncelleme
function updateStats() {
    const totalChannels = channels.length;
    const uniqueGroups = new Set(channels.map(ch => ch.groupTitle)).size;
    const favorites = Object.keys(localStorage).filter(key => key.startsWith('favorite_')).length;

}

// Kaydetme fonksiyonu
function saveM3U() {
    // Remove file extension from currentFileName if it exists
    const baseFileName = currentFileName ? currentFileName.replace(/\.[^.]+$/, '') : '';
    
    const fileName = prompt('Lütfen dosya adını girin (uzantıyı eklemeyin, varsayılan olarak .m3u eklenecektir):', baseFileName);
    if (!fileName) return; // Kullanıcı iptal ederse

    // Remove any extension from user input and add .m3u
    const cleanFileName = fileName.replace(/\.[^.]+$/, '');
    const content = generateM3UContent(); // M3U içeriğini oluştur
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanFileName}.m3u`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // URL'yi serbest bırak
    showNotification('Liste başarıyla kaydedildi', 'success');
}


// M3U içeriği oluşturma
function generateM3UContent() {
    let content = window.epgUrl ? `#EXTM3U x-tvg-url="${window.epgUrl}"\n` : '#EXTM3U\n';

    return content + channels.map(channel => {
        // Logo kontrolü
        const saveLogo = channel.tvgLogo && channel.tvgLogo !== DEFAULT_LOGO ? 
            channel.tvgLogo : FALLBACK_LOGO;
            
        let content = `#EXTINF:-1 tvg-name="${channel.tvgName}" tvg-id="${channel.tvgId}" tvg-logo="${saveLogo}" group-title="${channel.groupTitle}",${channel.tvgName}\n`;
        
        // HTTP Referrer ve User-Agent bilgilerini ekle
        if (channel.httpReferrer) {
            content += `#EXTVLCOPT:http-referrer=${channel.httpReferrer}\n`;
        }
        if (channel.userAgent) {
            content += `#EXTVLCOPT:http-user-agent=${channel.userAgent}\n`;
        }
        if (channel.customHeaders) {
            for (const [name, value] of Object.entries(channel.customHeaders)) {
                content += `#EXTVLCOPT:http-custom-header=${name}=${value}\n`;
            }
        }
        
        content += `${channel.channelUrl}\n`;
        return content;
    }).join('');
}

// Değişiklik durumunu güncelleme
function updateUnsavedChanges(value) {
    window.hasUnsavedChanges = value;
    // Kaydet butonunu güncelle
    const saveBtn = document.querySelector('.action-card[onclick="saveM3U()"]');
    if (saveBtn) {
        saveBtn.classList.toggle('has-changes', value);
    }
}

// Mevcut fonksiyonları yeni arayüze uyarla
// (createNewM3U, loadM3U, saveM3U, addChannel, editChannel, deleteChannel vb.)

// Kanal ekleme/düzenleme modalı
function showChannelModal(channel = null) {
    const isEditing = !!channel;
    const modal = document.createElement('div');
    modal.className = 'modal channel-modal';
    updateControlsVisibility();
    
    // Initialize customHeaders if not present
    if (channel && !channel.customHeaders) {
        channel.customHeaders = {};
    }

    // Prepare existing headers for display
    const existingHeaders = channel ? Object.entries(channel.customHeaders || {}) : [];

    // URL'den referrer ve user-agent bilgilerini ayıkla
    let referrer = '', userAgent = '';
    if (channel) {
        if (channel.httpReferrer) referrer = channel.httpReferrer;
        if (channel.userAgent) userAgent = channel.userAgent;
    }
    
    // Mevcut grupları al (sadece kullanıcının eklediği gruplar)
    const existingGroups = Array.from(new Set(channels.map(ch => ch.groupTitle)))
        .filter(group => group && group !== 'Genel - Kategorisiz')
        // Tekrarlanan grupları filtrele
        .filter((group, index, self) => self.indexOf(group) === index)
        .sort();
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>
                    <i class="fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'}"></i>
                    ${isEditing ? 'Kanalı Düzenle' : 'Yeni Kanal'}
                </h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="channelForm">
                    <div class="form-group">
                        <label>Kanal Adı (<i class="fa fa-asterisk" aria-hidden="true" title="Zorunlu Alan" style="font-size: 8px;color:red;"></i>)</label>
                        <input type="text" name="tvgName" value="${channel?.tvgName || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>
                            Kanal ID
                            <i class="fas fa-info-circle" 
                               title="EPG (TV Rehberi) verisi için kullanılır"></i>
                        </label>
                        <div class="id-input-group">
                            <input type="text" name="tvgId" value="${channel?.tvgId || ''}">
                            <button type="button" class="btn-copy-name" title="Kanal adından kopyala">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Logo URL</label>
                        <div class="logo-input-group">
                            <input type="url" name="tvgLogo" value="${channel?.tvgLogo || ''}">
                            <button type="button" class="btn-suggest-logo" title="Logo önerilerini göster">
                                <i class="fas fa-lightbulb"></i>
                            </button>
                        </div>
                        <div class="logo-preview">
                            <img src="${channel?.tvgLogo || DEFAULT_LOGO}" 
                                 onerror="this.src='${DEFAULT_LOGO}'">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Grup</label>
                        <select name="groupTitle">
                            <option value="Genel - Kategorisiz">Grup Seçin...</option>
                            ${existingGroups.map(group => `
                                <option value="${group}" ${channel?.groupTitle === group ? 'selected' : ''}>
                                    ${group}
                                </option>
                            `).join('')}
                            <option value="new">+ Yeni Grup</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Yayın URL Adresi (<i class="fa fa-asterisk" aria-hidden="true" title="Zorunlu Alan" style="font-size: 8px;color:red;"></i>)
                        </button></label>  
                        <input type="url" name="channelUrl" placeholder="Örn: https://iptsevenler.com/playlist.m3u8" value="${channel?.channelUrl || ''}" required>
                        <button type="button" class="btn-test" onclick="testChannelUrl(this.previousElementSibling.value)">
                            <i class="fab fa-youtube fa-xl"></i> Anında İzle
                        
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn-extras" onclick="toggleExtras(this)">
                            <i class="fas fa-chevron-right"></i>
                            Ekstralar
                        </button>
                        <div class="extras-content hidden">
                            <div class="form-group">
                                <label>HTTP Header Ekleme Alanı</label>
                                <div class="http-headers-container">
                                    ${existingHeaders.map(([name, value]) => `
                                        <div class="header-pair">
                                            <input type="text" name="httpHeaderName[]" value="${name}" placeholder="http-..." class="header-name" onchange="validateHeaderName(this)">
                                            <input type="text" name="httpHeaderValue[]" value="${value}" placeholder="header değeri" class="header-value">
                                            <button type="button" class="btn-remove-header" onclick="removeHeaderPair(this)">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    `).join('')}
                                    ${existingHeaders.length === 0 ? `
                                        <div class="header-pair">
                                            <input type="text" name="httpHeaderName[]" placeholder="http-..." class="header-name" onchange="validateHeaderName(this)">
                                            <input type="text" name="httpHeaderValue[]" placeholder="header değeri" class="header-value">
                                            <button type="button" class="btn-remove-header" onclick="removeHeaderPair(this)">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                                <button type="button" class="btn-add-header" onclick="addHeaderPair()">
                                    <i class="fas fa-plus"></i> Yeni Header
                                </button>
                            </div>
                            <div class="form-group">
                                <label>HTTP Referrer</label>
                                <input type="text" name="httpReferrer" value="${referrer}" 
                                       placeholder="Örn: https://iptvsevenler.com">
                            </div>
                            <div class="form-group">
                                <label>User Agent</label>
                                <div class="user-agent-container">
                                    <select name="userAgentPreset" class="user-agent-select">
                                        <option value="">Hazır User Agent Seç</option>
                                        ${Object.entries(PREDEFINED_USER_AGENTS).map(([name, agent]) => `
                                            <option value="${agent}" ${userAgent === agent ? 'selected' : ''}>
                                                ${name}
                                            </option>
                                        `).join('')}
                                    </select>
                                    <input type="text" name="userAgent" 
                                           class="custom-user-agent ${Object.values(PREDEFINED_USER_AGENTS).includes(userAgent) ? 'hidden' : ''}"
                                           value="${userAgent}" 
                                           placeholder="Özel User Agent girin...">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-save" onclick="saveChannel(${isEditing ? channels.indexOf(channel) : -1})">
                    <i class="fas fa-save"></i> Kaydet
                </button>
                <button class="btn-cancel" onclick="closeModal()">
                    <i class="fas fa-times"></i> İptal
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Grup seçimi olayı
    const groupSelect = modal.querySelector('select[name="groupTitle"]');
    groupSelect.addEventListener('change', function() {
        if (this.value === 'new') {
            const newGroup = prompt('Yeni grup adı girin:');
            if (newGroup && newGroup.trim()) {
                const option = document.createElement('option');
                option.value = option.textContent = newGroup.trim();
                option.selected = true;
                // Yeni grubu "Yeni Grup" seçeneğinden önce ekle
                this.insertBefore(option, this.querySelector('option[value="new"]'));
            } else {
                // İptal edilirse veya boş girilirse varsayılan seçeneğe dön
                this.value = 'Genel - Kategorisiz';
            }
        }
    });

    // User Agent seçimi olayı
    const userAgentSelect = modal.querySelector('.user-agent-select');
    const customUserAgent = modal.querySelector('.custom-user-agent');
    
    userAgentSelect.addEventListener('change', function() {
        if (!this.value) {
            customUserAgent.classList.remove('hidden');
            customUserAgent.value = '';
            customUserAgent.focus();
        } else {
            customUserAgent.classList.add('hidden');
            customUserAgent.value = this.value;
        }
    });

    // Logo önizleme ve öneri sistemi
    const logoInput = modal.querySelector('input[name="tvgLogo"]');
    const logoPreview = modal.querySelector('.logo-preview img');
    const suggestButton = modal.querySelector('.btn-suggest-logo');
    const channelNameInput = modal.querySelector('input[name="tvgName"]');

    // Kanal adı değiştiğinde logo önerilerini güncelle
    channelNameInput.addEventListener('input', function() {
        const matches = findMatchingLogos(this.value.trim());
        suggestButton.classList.toggle('has-suggestions', matches.length > 0);
    });

// Global olarak tanımlandı
window.findMatchingLogos = function(channelName) {
    // HD ve benzeri ekleri kaldır
    const cleanName = channelName.toLowerCase()
        .replace(/\s*(hd|fhd|uhd|4k|\+)\b/gi, '')
        .trim();

    const normalizedName = cleanName
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-');

    // Türkçe karakterleri değiştir
    const turkishMap = {'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'İ': 'i'};
    const searchName = normalizedName
        .split('')
        .map(char => turkishMap[char] || char)
        .join('');

    // Sabit logo listesi
    const logoFiles = [
        '24-tr.png', '360-tr.png', '4-eylul-tr.png', 'a-haber-tr.png', 'a-news-tr.png', 'a-para-tr.png',
        'a-spor-tr.png', 'a2-tr.png', 'ada-tv-tr.png', 'agro-tv-tr.png', 'akit-tv-tr.png', 'aksu-tv-tr.png',
        'altas-tv-tr.png', 'anadolu-dernek-tr.png', 'atv-avrupa-tr.png', 'atv-tr.png', 'bahar-turk-tr.png',
        'bbn-turk-tr.png', 'bein-box-office-1-hz-tr.png', 'bein-box-office-1-tr.png', 'bein-box-office-2-hz-tr.png',
        'bein-box-office-2-tr.png', 'bein-box-office-3-hz-tr.png', 'bein-box-office-3-tr.png', 'bein-gurme-hd-hz-tr.png',
        'bein-gurme-hd-tr.png', 'bein-h-and-e-hd-hz-tr.png', 'bein-h-and-e-hd-tr.png', 'bein-hd-tr.png',
        'bein-iz-hd-hz-tr.png', 'bein-iz-hd-tr.png', 'bein-movies-action-2-hd-hz-tr.png', 'bein-movies-action-2-hd-tr.png',
        'bein-movies-action-hd-hz-tr.png', 'bein-movies-action-hd-tr.png', 'bein-movies-family-hd-hz-tr.png',
        'bein-movies-family-hd-tr.png', 'bein-movies-premiere-2-hd-hz-tr.png', 'bein-movies-premiere-2-hd-tr.png',
        'bein-movies-premiere-hd-hz-tr.png', 'bein-movies-premiere-hd-tr.png', 'bein-movies-stars-hd-hz-tr.png',
        'bein-movies-stars-hd-tr.png', 'bein-movies-turk-hd-hz-tr.png', 'bein-movies-turk-hd-tr.png',
        'bein-series-comedy-hd-hz-tr.png', 'bein-series-comedy-hd-tr.png', 'bein-series-drama-hd-hz-tr.png',
        'bein-series-drama-hd-tr.png', 'bein-series-sci-fi-hd-hz-tr.png', 'bein-series-sci-fi-hd-tr.png',
        'bein-series-vice-hd-hz-tr.png', 'bein-series-vice-hd-tr.png', 'bein-sports-haber-hz-tr.png',
        'bein-sports-haber-tr.png', 'bengu-turk-tr.png', 'berat-tv-tr.png', 'beyaz-tv-tr.png', 'beykent-tv-tr.png',
        'bein-sport-1-hd.png', 'bein-sport-2-hd.png', 'bein-sport-3-hd.png', 'bein-sport-4-hd.png', 'bein-sport-5-hd.png',
        'bizimev-tv-tr.png', 'bloomberg-ht-tr.png', 'brt-1-hd-tr.png', 'brt-1-tr.png', 'brt-2-hd-tr.png', 'brt-2-tr.png',
        'brt-3-tr.png', 'brtv-tr.png', 'bursaspor-tv-tr.png', 'cay-tv-tr.png', 'cem-tv-tr.png', 'ciftci-tv-tr.png',
        'cnn-turk-tr.png', 'cocuk-smart-hd-tr.png', 'cocuk-smart-tr.png', 'disney-channel-tr.png', 'diyanet-tv-tr.png',
        'diyar-tv-tr.png', 'dizi-smart-max-hd-tr.png', 'dizi-smart-max-tr.png', 'dizi-smart-premium-hd-tr.png',
        'dizi-smart-premium-tr.png', 'dost-tv-tr.png', 'dream-turk-tr.png', 'drt-denizli-tr.png', 'eba-tv-ilkokul-tr.png',
        'eba-tv-lise-tr.png', 'eba-tv-ortaokul-tr.png', 'edessa-tv-tr.png', 'ege-tv-tr.png', 'ekin-tv-turk-tr.png',
        'ekoturk-tr.png', 'es-tv-tr.png', 'euro-d-tr.png', 'euro-star-tr.png', 'fashion-one-tv-tr.png',
        'fenerbahce-tv-tr.png', 'filmbox-hd-tr.png', 'filmbox-tr.png', 'flash-tv-tr.png', 'fm-tv-tr.png',
        'fox-crime-tr.png', 'fox-tr.png', 'fx-tr.png', 'galatasaray-tv-tr.png', 'gaziantep-olay-tv-tr.png',
        'guneydogu-tv-tr.png', 'haber-global-tr.png', 'haberturk-tr.png', 'halk-tv-tr.png', 'hrt-akdeniz-tr.png',
        'ht-hayat-tr.png', 'kadirga-tr.png', 'kanal-15-tr.png', 'kanal-16-tr.png', 'kanal-23-tr.png', 'kanal-26-tr.png',
        'kanal-33-tr.png', 'kanal-42-tr.png', 'kanal-58-tr.png', 'kanal-7-avrupa-tr.png', 'kanal-7-tr.png',
        'kanal-avrupa-tr.png', 'kanal-b-tr.png', 'kanal-d-tr.png', 'kanal-ege-tr.png', 'kanal-firat-tr.png',
        'kanal-sim-tr.png', 'kanal-t-tr.png', 'kanal-urfa-tr.png', 'kanal-v-tr.png', 'kanal-z-tr.png',
        'kanal3-tr.png', 'kardelen-tv-tr.png', 'kent-turk-tr.png', 'kocaeli-tv-tr.png',
        'kon-tv-hd-tr.png', 'kon-tv-tr.png', 'koy-tv-tr.png', 'koza-tv-tr.png', 'kral-pop-tr.png',
        'kral-tv-hd-tr.png', 'kral-tv-tr.png', 'krt-tr.png', 'lalegul-tv-tr.png', 'line-tv-tr.png',
        'manisa-tv-tr.png', 'mavi-karadeniz-tr.png', 'mercan-tv-tr.png', 'milyon-tv-tr.png', 'minika-cocuk-tr.png',
        'minika-go-tr.png', 'movie-smart-action-hd-tr.png', 'movie-smart-action-tr.png', 'movie-smart-classic-hd-tr.png',
        'movie-smart-classic-tr.png', 'movie-smart-family-hd-tr.png', 'movie-smart-family-tr.png',
        'movie-smart-fest-hd-tr.png', 'movie-smart-fest-tr.png', 'movie-smart-gold-hd-tr.png', 'movie-smart-gold-tr.png',
        'movie-smart-platin-hd-tr.png', 'movie-smart-platin-tr.png', 'movie-smart-platin2-hd-tr.png',
        'movie-smart-platin2-tr.png', 'movie-smart-premium-hd-tr.png', 'movie-smart-premium-tr.png',
        'movie-smart-premium2-hd-tr.png', 'movie-smart-premium2-tr.png', 'movie-smart-turk-hd-tr.png',
        'movie-smart-turk-tr.png', 'now-tr.png', 'nr1-ask-hd-tr.png', 'nr1-ask-tr.png', 'nr1-damar-hd-tr.png',
        'nr1-damar-tr.png', 'nr1-dance-hd-tr.png', 'nr1-dance-tr.png', 'nr1-hd-tr.png', 'nr1-tr.png',
        'nr1-turk-hd-tr.png', 'nr1-turk-tr.png', 'ntv-tr.png', 'on4-tv-tr.png', 'pamukkale-tv-tr.png',
        'planet-cocuk-tr.png', 'planet-pembe-tr.png', 'planet-sinema-tr.png', 'planet-turk-tr.png', 'planet-tv-tr.png',
        'power-tv-hd-tr.png', 'power-tv-tr.png', 'powerturk-tr.png', 'rehber-tv-tr.png', 'rumeli-tv-tr.png',
        's-sport-2-tr.png', 's-sport-plus-tr.png', 's-sport-tr.png', 'sat7-turk-tr.png', 'semerkand-tv-tr.png',
        'show-max-tr.png', 'show-tr.png', 'show-turk-tr.png', 'sinema-1001-hz-tr.png', 'sinema-1001-tr.png',
        'sinema-1002-hz-tr.png', 'sinema-1002-tr.png', 'sinema-aile-hz-tr.png', 'sinema-aile-tr.png',
        'sinema-aile2-hz-tr.png', 'sinema-aile2-tr.png', 'sinema-aksiyon-hz-tr.png', 'sinema-aksiyon-tr.png',
        'sinema-aksiyon2-hz-tr.png', 'sinema-aksiyon2-tr.png', 'sinema-komedi-hz-tr.png', 'sinema-komedi-tr.png',
        'sinema-komedi2-hz-tr.png', 'sinema-komedi2-tr.png', 'sinema-tv-hz-tr.png', 'sinema-tv-tr.png',
        'sinema-tv2-hz-tr.png', 'sinema-tv2-tr.png', 'sinema-yerli-hz-tr.png', 'sinema-yerli-tr.png',
        'sinema-yerli2-hz-tr.png', 'sinema-yerli2-tr.png', 'spor-smart-hd-tr.png', 'sports-tv-tr.png',
        'star-tv-tr.png', 'stingray-ambiance-4k-tr.png', 'stingray-ambiance-tr.png', 'tarim-turk-tr.png',
        'tarim-tv-tr.png', 'tatlises-tv-tr.png', 'tay-tv-tr.png', 'tbmm-tv-tr.png', 'tek-rumeli-tr.png',
        'tele1-tr.png', 'tempo-tv-tr.png', 'teve2-tr.png', 'tgrt-belgesel-tr.png', 'tgrt-eu-tr.png',
        'tgrt-haber-tr.png', 'tivi6-tr.png', 'tjk-tv-tr.png', 'tmb-tr.png', 'toprak-tv-tr.png', 'tr-35-tr.png',
        'trt-1-hd-tr.png', 'trt-1-tr.png', 'trt-2-tr.png', 'trt-3-spor-tr.png', 'trt-3-tr.png', 'trt-4k-tr.png',
        'trt-arabi-tr.png', 'trt-avaz-tr.png', 'trt-belgesel-tr.png', 'trt-cocuk-tr.png', 'trt-haber-hd-tr.png',
        'trt-haber-tr.png', 'trt-kurdi-tr.png', 'trt-muzik-tr.png', 'trt-spor-2-tr.png', 'trt-spor-hd-tr.png',
        'trt-spor-tr.png', 'trt-spor-yildiz-tr.png', 'trt-turk-tr.png', 'trt-world-hd-tr.png', 'trt-world-tr.png',
        'turk-haber-tr.png', 'tv-35-tr.png', 'tv-den-tr.png', 'tv-kayseri-tr.png', 'tv1-tr.png', 'tv100-tr.png',
        'tv264-tr.png', 'tv4-tr.png', 'tv5-tr.png', 'tv52-tr.png', 'tv8-int-tr.png', 'tv8-tr.png', 'tv85-tr.png'
    ];

    // Daha hassas eşleştirme için logo adını temizle
    return logoFiles.filter(file => {
        const logoName = file.toLowerCase()
            .replace('.png', '')
            .replace('-tr', '')
            .replace(/(hd|fhd|uhd|4k|\+)\b/gi, '')  // HD ve benzeri ekleri kaldır
            .replace(/[^a-z0-9-]/g, '');

        // Ana kanal adını al (örn: "trt-1" -> "trt")
        const mainChannelName = searchName.split('-')[0];
        const mainLogoName = logoName.split('-')[0];

        // Tam eşleşme kontrolü
        const exactMatch = logoName === searchName;

        // Ana kanal adı eşleşmesi (örn: trt-1 için trt-2, trt-spor gibi öneriler)
        const mainNameMatch = mainChannelName === mainLogoName;

        // Kısmi eşleşme kontrolü
        const partialMatch = searchName.includes(mainLogoName) || logoName.includes(mainChannelName);

        return exactMatch || (mainNameMatch && partialMatch);
    });
};

    function showLogoSuggestions(matchingLogos) {
        const suggestionModal = document.createElement('div');
        suggestionModal.className = 'modal logo-suggestion-modal';
        suggestionModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-images"></i> Logo Önerileri</h3>
                    <button class="close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="logo-grid">
                        ${matchingLogos.map(logo => `
                            <div class="logo-option">
                                <img src="images/kanal-gorselleri/turkiye/${logo}" 
                                     alt="${logo}"
                                     onclick="selectLogo('images/kanal-gorselleri/turkiye/${logo}')"
                                     onerror="this.src='${DEFAULT_LOGO}'">
                            </div>
                        `).join('')}
                    </div>
                    ${matchingLogos.length === 0 ? '<p class="no-suggestions">Bu kanal için öneri bulunamadı.</p>' : ''}
                </div>
            </div>
        `;

        document.body.appendChild(suggestionModal);

        // Modal kapatma
        const closeBtn = suggestionModal.querySelector('.close');
        closeBtn.onclick = () => suggestionModal.remove();
        suggestionModal.onclick = e => {
            if (e.target === suggestionModal) suggestionModal.remove();
        };
    }

    // Logo seçme fonksiyonu
    window.selectLogo = function(logoUrl) {
        logoInput.value = logoUrl;
        logoPreview.src = logoUrl;
        document.querySelector('.logo-suggestion-modal').remove();
    };

    // Logo önerisi butonuna tıklama olayı
    suggestButton.addEventListener('click', () => {
        const channelName = channelNameInput.value.trim();
        if (!channelName) {
            showNotification('Önce kanal adı giriniz', 'warning');
            return;
        }
        const matchingLogos = findMatchingLogos(channelName);
        showLogoSuggestions(matchingLogos);
    });

    // Kanal adı değiştiğinde öneri butonunu güncelle
    channelNameInput.addEventListener('input', function() {
        const hasMatches = findMatchingLogos(this.value.trim()).length > 0;
        suggestButton.classList.toggle('has-suggestions', hasMatches);
    });

    logoInput.addEventListener('input', function() {
        logoPreview.src = this.value || DEFAULT_LOGO;
    });

    // Kanal adından ID kopyalama
    const copyButton = modal.querySelector('.btn-copy-name');
    const tvgNameInput = modal.querySelector('input[name="tvgName"]');
    const tvgIdInput = modal.querySelector('input[name="tvgId"]');

    copyButton.onclick = () => {
        const channelName = tvgNameInput.value.trim();
        if (!channelName) {
            showNotification('Önce kanal adı giriniz', 'error');
            return;
        }

        if (confirm('Kanal ID\'sine ".tr" uzantısı eklensin mi?')) {
            tvgIdInput.value = channelName + '.tr';
        } else {
            tvgIdInput.value = channelName;
        }
    };

    // Modal kapatma
    modal.querySelector('.close').onclick = closeModal;
    modal.onclick = e => {
        if (e.target === modal) closeModal();
    };
}

// Ekstralar panelini aç/kapat
function toggleExtras(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    content.classList.toggle('hidden');
    if (content.classList.contains('hidden')) {
        icon.className = 'fas fa-chevron-right';
    } else {
        icon.className = 'fas fa-chevron-down';
    }
}

// Kanal kaydetme
function saveChannel(index) {
    const form = document.getElementById('channelForm');
    const headerPairs = Array.from(form.querySelectorAll('.header-pair')).map(pair => ({
        name: pair.querySelector('.header-name').value.trim().toLowerCase(),
        value: pair.querySelector('.header-value').value.trim()
    }));
    
    const customHeaders = {};
    headerPairs.forEach(({name, value}) => {
        if (name && value && name.startsWith('http-') && name.match(/^http-[a-z0-9-]+$/)) {
            customHeaders[name] = value;
        }
    });

    const channelData = {
        tvgName: form.querySelector('[name="tvgName"]').value.trim(),
        tvgId: form.querySelector('[name="tvgId"]').value.trim(),
        tvgLogo: form.querySelector('[name="tvgLogo"]').value.trim() || DEFAULT_LOGO,
        groupTitle: form.querySelector('[name="groupTitle"]').value,
        channelUrl: form.querySelector('[name="channelUrl"]').value.trim(),
        httpReferrer: form.querySelector('[name="httpReferrer"]').value.trim(),
        userAgent: form.querySelector('[name="userAgent"]').value.trim(),
        customHeaders: customHeaders
    };
    
    if (!channelData.tvgName || !channelData.channelUrl) {
        showNotification('Lütfen gerekli alanları doldurun', 'error');
        return;
    }
    
    let notifications = []; // Bildirimleri saklamak için bir dizi oluştur

    if (index >= 0) {
        const oldChannel = channels[index]; // Eski kanal bilgilerini al
        channels[index] = {
            ...oldChannel,
            ...channelData,
            customHeaders: channelData.customHeaders // Explicitly set customHeaders
        }; // Kanalı güncelle
        showNotification('Kanal güncellendi', 'success');
        
        // Değişiklikleri kontrol et ve bildirim ekle
        if (oldChannel.tvgName !== channelData.tvgName) {
            notifications.push(`<br/><span class="bildirim-baslik">İsim Değişikliği:</span>`, `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının adı "<span class="bildirim-yeni-deger">${channelData.tvgName}</span>" olarak değiştirildi`);
        }
        if (oldChannel.tvgId !== channelData.tvgId) {
            if (!oldChannel.tvgId && channelData.tvgId) {
                notifications.push('<br/><span class="bildirim-baslik">TVG-ID Eklendi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının yeni TVG-ID değeri: <span class="bildirim-yeni-deger">${channelData.tvgId}</span>`);
            } else if (oldChannel.tvgId && !channelData.tvgId) {
                notifications.push('<span class="bildirim-baslik">TVG-ID Silindi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının TVG-ID değeri silindi`);
            } else {
                notifications.push('<br/><span class="bildirim-baslik">TVG-ID Değiştirildi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının TVG-ID değeri "${oldChannel.tvgId}" -> "<span class="bildirim-yeni-deger">${channelData.tvgId}</span>" olarak değiştirildi`);
            }
        } 
        if (oldChannel.groupTitle !== channelData.groupTitle) {
            if (!oldChannel.groupTitle && channelData.groupTitle) {
                notifications.push('<br/><span class="bildirim-baslik">Kanal grubu eklendi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalına "<span class="bildirim-yeni-deger">${channelData.groupTitle}</span>" kanal grubu eklendi`);
            } else if (oldChannel.tvgId && !channelData.tvgId) {
                notifications.push('<br/><span class="bildirim-baslik">Kanal grubu silindi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının Kanal grubu silindi`);
            } else {
                notifications.push('<br/><span class="bildirim-baslik">Kanal grubu eklendi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının yeni kanal grubu "<span class="bildirim-yeni-deger">${channelData.groupTitle}</span>" olarak değiştirildi`);
            }
        }
        if (oldChannel.tvgLogo !== channelData.tvgLogo) {
            if (!oldChannel.tvgLogo && channelData.tvgLogo) {
                notifications.push('<br/><span class="bildirim-baslik">Logo Eklendi:</span>', `"<span class="bildirim-yeni-deger">${channelData.tvgLogo}</span>"`);
            } else if (oldChannel.tvgId && !channelData.tvgId) {
                notifications.push('<br/><span class="bildirim-baslik">Logo Silindi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının logo değeri silindi`);
            } else {
                notifications.push('<br/><span class="bildirim-baslik">Logo Değiştirildi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının logo adresi değiştirildi`);
            }
        }
        if (oldChannel.channelURL !== channelData.channelURL) {
            notifications.push('<br/><span class="bildirim-baslik">Kanal URL Değiştirildi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının URL adresi değiştirildi`);
        }
        if (oldChannel.httpReferrer !== channelData.httpReferrer) {
            if (!oldChannel.httpReferrer && channelData.httpReferrer) {
                notifications.push('<br/><span class="bildirim-baslik">Http-Referrer Eklendi:</span>', `"${oldChannel.tvgName}" kanalına "<span class="bildirim-yeni-deger">${channelData.httpReferrer}</span>" Http-Referrer değeri eklendi`);
            } else if (oldChannel.httpReferrer && !channelData.tvgId) {
                
                notifications.push('<br/><span class="bildirim-baslik">Http-Referrer Silindi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının Http-Referrer değeri silindi`);
            } else {
                
                notifications.push('<br/><span class="bildirim-baslik">Http-Referrer Değiştirildi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının Http-Referrer değeri -> "<span class="bildirim-yeni-deger">${channelData.httpReferrer}</span>" olarak değiştirildi`);
            }
        }
        if (oldChannel.userAgent !== channelData.userAgent) {
            if (!oldChannel.userAgent && channelData.userAgent) {
                
                notifications.push('<br/><span class="bildirim-baslik">User-Agent Eklendi:</span>', `"${oldChannel.tvgName}" kanalına "<span class="bildirim-yeni-deger">${channelData.userAgent}</span>" User-Agent değeri eklendi`);
            } else if (oldChannel.userAgent && !channelData.userAgent) {
                
                notifications.push('<br/><span class="bildirim-baslik">User-Agent Silindi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının User-Agent değeri silindi`);
            } else {
                
                notifications.push('<br/><span class="bildirim-baslik">User-Agent Değiştirildi:</span>', `<span class="bildirim-kanaladi">${oldChannel.tvgName}</span> kanalının User-Agent değeri -> "<span class="bildirim-yeni-deger">${channelData.userAgent}</span>" olarak değiştirildi`);
            }
        }

    } else {
        channels.push(channelData);
        showNotification('Yeni kanal eklendi', 'success');
        notifications.push(`"${channelData.tvgName}" kanalı eklendi`);
    }
    
    // Tüm bildirimleri tek bir işlem geçmişi olarak ekle
    if (notifications.length > 0) {
        addNotification('Kanal Güncellemesi<br/>', notifications.join('<br/> '));
    }

    updateChannelList();
    updateUnsavedChanges(true);
    updateCounts();
    closeModal();
}

// Kanal silme
function deleteChannel(index) {
    if (confirm('Bu kanalı silmek istediğinizden emin misiniz?')) {
        const removedChannel = channels[index]; // Silinen kanal bilgilerini al
        channels.splice(index, 1); // Kanalı sil
        updateChannelList();
        updateUnsavedChanges(true);
        showNotification('Kanal silindi', 'success');
        
        // Kanal silindiğinde
        addNotification('<br>Kanal Silindi', `<span class="bildirim-kanaladi">${removedChannel.tvgName}</span> kanalı silindi`); // Silinen kanalın adını kullan
    }
}

// Kanal URL test
function testChannelUrl(url) {
    if (!url) {
        showNotification('Lütfen bir URL girin', 'error');
        return;
    }
    previewStream(url, 'Test');
}

// Modal kapatma
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Favoriler modalı
function showFavoritesModal() {
    const modal = document.createElement('div');
    modal.className = 'modal favorites-modal';
    
    const favoriteChannels = channels.filter(ch => ch.isFavorite);
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-heart"></i> Favori Kanallar</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                ${favoriteChannels.length ? `
                    <div class="favorites-grid">
                        ${favoriteChannels.map(channel => `
                            <div class="favorite-card">
                                <img src="${channel.tvgLogo || DEFAULT_LOGO}" 
                                     alt="${channel.tvgName}"
                                     onerror="this.src='${DEFAULT_LOGO}'">
                                <div class="favorite-info">
                                    <h4>${channel.tvgName}</h4>
                                    <span>${channel.groupTitle}</span>
                                </div>
                                <div class="favorite-actions">
                                    <button onclick="previewStream('${channel.channelUrl}', '${channel.tvgName}')">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button onclick="toggleFavorite(${channels.indexOf(channel)})">
                                        <i class="fas fa-heart-broken"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <i class="fas fa-heart-broken"></i>
                        <p>Henüz favori kanal eklenmemiş</p>
                    </div>
                `}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').onclick = closeModal;
    modal.onclick = e => {
        if (e.target === modal) closeModal();
    };
}

// Favori işlemleri
function toggleFavorite(tvgId) {
    const channel = channels.find(ch => ch.tvgId === tvgId);
    if (!channel) return; // Kanal bulunamadıysa işlem yapma

    const favoriteKey = `favorite_${encodeURIComponent(channel.channelUrl)}`;
    const isFavorite = localStorage.getItem(favoriteKey);
    
    if (isFavorite) {
        localStorage.removeItem(favoriteKey);
        showNotification('Kanal favorilerden çıkarıldı.', 'info');
        addNotification('Favori Kanal Çıkarma', `${channel.tvgName} favorilerden çıkarıldı.`);
    } else {
        const favoriteData = {
            ...channel,
            favoriteDate: new Date().toLocaleString()
        };
        localStorage.setItem(favoriteKey, JSON.stringify(favoriteData));
        showNotification('Kanal favorilere eklendi.', 'success');
        addNotification('Favori Kanal Ekleme', `${channel.tvgName} favorilere eklendi.`);
    }

    // Sadece ilgili kanalın favori durumunu güncelle
    const favoriteButton = document.querySelector(`.channel-card[data-id="${tvgId}"] .favorite-button i`);
    if (favoriteButton) {
        favoriteButton.className = isFavorite ? 'far fa-heart' : 'fas fa-heart';
    }

    // Eğer favori modalı açıksa, onu güncelle
    if (currentFavoriteModal) {
        showFavorites();
    }
}

// Grup yönetimi modalı
function showGroupManager() {
    const modal = document.createElement('div');
    modal.className = 'modal group-modal';
    
    const groups = Array.from(new Set(channels.map(ch => ch.groupTitle)));
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-layer-group"></i> Grup Yönetimi</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="group-list">
                    ${groups.map(group => `
                        <div class="group-card">
                            <div class="group-info">
                                <h4>${group}</h4>
                                <span>${channels.filter(ch => ch.groupTitle === group).length} kanal</span>
                            </div>
                            <div class="group-actions">
                                <button onclick="renameGroup('${group}')" class="btn-rename">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteGroup('${group}')" class="btn-delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').onclick = closeModal;
    modal.onclick = e => {
        if (e.target === modal) closeModal();
    };
}

// Grup yeniden adlandırma
function renameGroup(oldName) {
    const newName = prompt('Yeni grup adı:', oldName);
    if (newName && newName !== oldName) {
        channels.forEach(channel => {
            if (channel.groupTitle === oldName) {
                channel.groupTitle = newName;
            }
        });
        
        updateChannelList();
        updateUnsavedChanges(true);
        showNotification('Grup adı değiştirildi', 'success');
        updateCounts();
        
        // Grup yöneticisini yenile
        const modal = document.querySelector('.group-modal');
        if (modal) {
            modal.remove();
            showGroupManager();
        }

        // Grup düzenlendiğinde
        addNotification('Grup Düzenlendi', `"${oldName}" grubu "${newName}" olarak değiştirildi`);
    }
}

// Grup silme
function deleteGroup(groupTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal delete-group-modal';
    
    const channelsInGroup = channels.filter(ch => ch.groupTitle === groupTitle).length;
    const groupList = [...new Set(channels.map(ch => ch.groupTitle))].filter(g => g !== groupTitle);
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-trash"></i> Kanal Grubu Sil</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>${groupTitle}</strong> grubunu silmek istediğinizden emin misiniz?</p>
                <p>Bu grupta ${channelsInGroup} kanal bulunuyor.</p>
                
                <div class="delete-options">
                    <div class="option">
                        <input type="radio" name="deleteOption" id="deleteAll" value="all" checked>
                        <label for="deleteAll">Grubu ve tüm kanalları sil</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="deleteOption" id="keepChannels" value="keep">
                        <label for="keepChannels">Sadece grubu sil, kanalları sakla</label>
                    </div>
                </div>
                
                <div class="move-channels-option" style="display: none;">
                    <p>Kanalları taşımak istediğiniz grubu seçin:</p>
                    <select id="targetGroup" class="form-control">
                        <option value="">Grupsuz Bırak</option>
                        ${groupList.map(group => `<option value="${group}">${group}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel">İptal</button>
                <button class="btn-delete">Sil</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event Listeners
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const deleteBtn = modal.querySelector('.btn-delete');
    const keepChannelsRadio = modal.querySelector('#keepChannels');
    const moveChannelsOption = modal.querySelector('.move-channels-option');
    
    keepChannelsRadio.onchange = () => {
        moveChannelsOption.style.display = keepChannelsRadio.checked ? 'block' : 'none';
    };
    
    closeBtn.onclick = () => modal.remove();
    cancelBtn.onclick = () => modal.remove();
    modal.onclick = e => {
        if (e.target === modal) modal.remove();
    };
    
    deleteBtn.onclick = () => {
        const deleteOption = modal.querySelector('input[name="deleteOption"]:checked').value;
        const targetGroup = modal.querySelector('#targetGroup').value;
        
        if (deleteOption === 'all') {
            channels = channels.filter(ch => ch.groupTitle !== groupTitle);
            showNotification(`${groupTitle} grubu ve tüm kanallar silindi.`, 'success');
        } else {
            channels.forEach(ch => {
                if (ch.groupTitle === groupTitle) {
                    ch.groupTitle = targetGroup;
                }
            });
            showNotification(`${groupTitle} grubu silindi, kanallar ${targetGroup || 'grupsuz olarak'} kaydedildi.`, 'success');
        }
        
        addNotification('Kanal Grubu Silme', `${groupTitle} grubu silindi.`);
        listChannelGroups(); // Kanal grupları listesini güncelle
        modal.remove();
    };
}

// İstatistik paneli
function showStatistics() {
    const modal = document.createElement('div');
    modal.className = 'modal stats-modal';
    
    // İstatistikleri hesapla
    const stats = {
        totalChannels: channels.length,
        totalGroups: new Set(channels.map(ch => ch.groupTitle)).size,
        noGroupChannels: channels.filter(ch => !ch.groupTitle).length
    };

    // Grup istatistiklerini hesapla
    const groupCounts = {};
    channels.forEach(channel => {
        const group = channel.groupTitle || 'Genel Kategoriler';
        groupCounts[group] = (groupCounts[group] || 0) + 1;
    });
    
    const largestGroup = Object.entries(groupCounts)
        .reduce((prev, current) => (prev[1] > current[1] ? prev : current), ['', 0]);
    
    const smallestGroup = Object.entries(groupCounts)
        .reduce((prev, current) => (prev[1] < current[1] ? prev : current), ['', Infinity]);

    // Get list source name based on how it was loaded
    let listSourceName = 'Henüz bir liste yüklenmedi';
    if (currentFileName) {
        listSourceName = currentFileName;
    } else if (window.lastLoadedUrl) {
        listSourceName = 'URL: ' + window.lastLoadedUrl;
    } else if (channels.length > 0) {
        listSourceName = 'Oluşturulan Liste';
    }

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="header-content">
                    <h3><i class="fas fa-chart-bar"></i> İstatistikler</h3>
                    <div class="current-file">
                        <i class="fas fa-file-alt"></i>
                        <span>${listSourceName}</span>
                    </div>
                </div>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="stats-grid">
                    <div class="stat-card highlight">
                        <i class="fas fa-tv"></i>
                        <div class="stat-info">
                            <span class="stat-value">${stats.totalChannels}</span>
                            <span class="stat-label">Toplam Kanal</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-layer-group"></i>
                        <div class="stat-info">
                            <span class="stat-value">${stats.totalGroups}</span>
                            <span class="stat-label">Grup Sayısı</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-users-slash"></i>
                        <div class="stat-info">
                            <span class="stat-value">${stats.noGroupChannels}</span>
                            <span class="stat-label">Grubu Olmayan Kanallar</span>
                        </div>
                    </div>
                    <div class="stat-card large">
                        <i class="fas fa-users"></i>
                        <div class="stat-info">
                            <span class="stat-value">${largestGroup[0]}</span>
                            <span class="stat-label">En Büyük Grup</span>
                            <span class="stat-sublabel">${largestGroup[1]} kanal</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <div class="stat-info">
                            <span class="stat-value">${smallestGroup[0]}</span>
                            <span class="stat-label">En Az Kanala Sahip Grup</span>
                            <span class="stat-sublabel">${smallestGroup[1]} kanal</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').onclick = closeModal;
    modal.onclick = e => {
        if (e.target === modal) closeModal();
    };
}

// Seçim modunu kapat
function disableSelectionMode() {
    const channelCards = document.querySelectorAll('.channel-card');
    channelCards.forEach(card => {
        card.classList.remove('selectable', 'selected');
        card.onclick = null;
    });
    
    const bar = document.querySelector('.bulk-action-bar');
    if (bar) bar.remove();
}

// Toplu grup değiştirme
function bulkChangeGroup() {
    const selectedCards = document.querySelectorAll('.channel-card.selected');
    if (!selectedCards.length) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal bulk-group-modal';
    
    const groups = Array.from(new Set(channels.map(ch => ch.groupTitle)));
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-layer-group"></i> Grup Değiştir</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${selectedCards.length} kanal seçildi</p>
                <select id="bulkGroupSelect">
                    <option value="">Grup Seçin...</option>
                    ${groups.map(group => `
                        <option value="${group}">${group}</option>
                    `).join('')}
                    <option value="new">+ Yeni Grup</option>
                </select>
            </div>
            <div class="modal-footer">
                <button onclick="applyBulkGroupChange()">Uygula</button>
                <button onclick="closeModal()">İptal</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Yeni grup seçeneği
    const groupSelect = modal.querySelector('#bulkGroupSelect');
    groupSelect.addEventListener('change', function() {
        if (this.value === 'new') {
            const newGroup = prompt('Yeni grup adı:');
            if (newGroup) {
                const option = document.createElement('option');
                option.value = option.textContent = newGroup;
                option.selected = true;
                this.insertBefore(option, this.lastElementChild);
            } else {
                this.value = '';
            }
        }
    });
}

// Toplu grup değişikliğini uygula
function applyBulkGroupChange() {
    const newGroup = document.getElementById('bulkGroupSelect').value;
    if (!newGroup) {
        showNotification('Lütfen bir grup seçin', 'error');
        return;
    }
    
    const selectedCards = document.querySelectorAll('.channel-card.selected');
    selectedCards.forEach(card => {
        const index = channels.findIndex(ch => ch.tvgId === card.dataset.id);
        if (index !== -1) {
            channels[index].groupTitle = newGroup;
        }
    });
    
    updateChannelList();
    updateUnsavedChanges(true);
    closeModal();
    disableSelectionMode();
    showNotification(`${selectedCards.length} kanal "${newGroup}" grubuna taşındı`, 'success');
    updateCounts();
}

// Toplu silme
function bulkDelete() {
    const selectedCards = document.querySelectorAll('.channel-card.selected');
    if (!selectedCards.length) return;
    
    if (confirm(`${selectedCards.length} kanalı silmek istediğinizden emin misiniz?`)) {
        selectedCards.forEach(card => {
            const index = channels.findIndex(ch => ch.tvgId === card.dataset.id);
            if (index !== -1) {
                channels.splice(index, 1);
            }
        });
        
        updateChannelList();
        updateUnsavedChanges(true);
        disableSelectionMode();
        showNotification(`${selectedCards.length} kanal silindi`, 'success');
        updateCounts();
    }
}

// Toplu favori işlemi
function bulkFavorite() {
    const selectedCards = document.querySelectorAll('.channel-card.selected');
    if (!selectedCards.length) return;
    
    selectedCards.forEach(card => {
        const index = channels.findIndex(ch => ch.tvgId === card.dataset.id);
        if (index !== -1) {
            channels[index].isFavorite = true;
        }
    });
    
    updateChannelList();
    updateUnsavedChanges(true);
    disableSelectionMode();
    showNotification(`${selectedCards.length} kanal favorilere eklendi`, 'success');
    updateCounts();
}

function setupMonacoEditor(editor) {
    // Add keyboard shortcut handlers
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        
        editor.trigger('keyboard', 'actions.find', null);
        
        if (selectedText) {
            setTimeout(() => {
                const findInput = document.querySelector('.monaco-editor .find-widget .input');
                if (findInput) {
                    findInput.value = selectedText;
                    findInput.dispatchEvent(new Event('input'));
                }
            }, 100);
        }
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        
        editor.trigger('keyboard', 'editor.action.startFindReplaceAction', null);
        
        if (selectedText) {
            setTimeout(() => {
                const findInput = document.querySelector('.monaco-editor .find-widget .input');
                if (findInput) {
                    findInput.value = selectedText;
                    findInput.dispatchEvent(new Event('input'));
                }
            }, 100);
        }
    });
}

function showTextEditor(content) {
    // Check if the list has 5000 or more channels
    const channelCount = (content.match(/#EXTINF/g) || []).length;
    if (channelCount >= 5000) {
        if (!confirm('5000 veya üzeri kanal olan listeleri metin editörü ile kullanırken tarayıcınız zorlanabilir. O yüzden bu tip listeleri hiç zorlanmadan ve kolayca düzenlemek için site arayüzündeki uygulama sistemi ile düzenlemenizi öneririm. Yine de;\n\nDevam etmek istiyor musunuz?')) {
            return;
        }
    }

    const modal = document.createElement('div');
    modal.className = 'modal editor-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="editor-actions">
                    <button class="btn-search" onclick="editorSearch()">
                        <i class="fas fa-search-plus"></i> Bul
                    </button>
                    <button class="btn-search" onclick="editorSearchReplace()">
                        <i class="fas fa-exchange"></i> Bul ve Değiştir
                    </button>
                    <button class="btn-validate" onclick="validateEditorContent()">
                        <i class="fas fa-check-circle"></i> Doğrula
                    </button>
                    <button class="btn-download" onclick="downloadEditorContent()">
                        <i class="fas fa-download"></i> İndir
                    </button>
                    <button class="btn-ogret btn-tutorial glow-on-hover" onclick="showEditorTutorial()">
                        <i class="fas fa-graduation-cap" style="color: #6b1e1e;"></i> M3U Listesi nasıl yazılır? Öğret!
                    </button>
                </div>
                <button class="close" onclick="closeTextEditor()">&times;</button>
            </div>
            <div id="editor-container"></div>
            <div class="modal-footer">
                <div class="editor-stats">
                    <div class="stat-item">
                        <i class="fas fa-file-alt"></i>
                        <span class="file-name">${currentFileName || 'Yeni Liste'}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-tv"></i>
                        <span class="channel-count">0 Kanal</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-layer-group"></i>
                        <span class="group-count">0 Grup</span>
                    </div>
                </div>
                <div class="editor-actions">
                    <button class="btn-save" onclick="saveEditorContent()">
                        <i class="fas fa-save"></i> Kaydet
                    </button>
                    <button class="btn-cancel" onclick="closeTextEditor()">
                        <i class="fas fa-times"></i> İptal
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        // Define custom theme for M3U syntax highlighting
        monaco.editor.defineTheme('m3u-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
                { token: 'attribute.name', foreground: 'bcb9b9' },
                { token: 'attribute2.name', foreground: 'dd0c0c80' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'string.link', foreground: '4EC9B0' },
                { token: 'variable.name', foreground: 'DCDCAA' },
                { token: 'comment', foreground: 'cccccc' },
                { token: 'header.name', foreground: 'cbdd18' },
                { token: 'header.value', foreground: 'c92828' }
            ],
            colors: {
                'editor.foreground': '#D4D4D4',
                'editor.background': '#1E1E1E',
                'editor.selectionBackground': '#264F78',
                'editor.lineHighlightBackground': '#2D2D2D',
                'editorCursor.foreground': '#FFFFFF',
                'editorWhitespace.foreground': '#404040'
            }
        });

        // M3U için özel dil tanımlaması
        monaco.languages.register({ id: 'm3u' });
        monaco.languages.setMonarchTokensProvider('m3u', {
            defaultToken: '',
            tokenizer: {
                root: [
                    // Main tags
                    [/#EXTM3U/, 'keyword'],
                    [/(x-tvg-url=)(["'][^"']*["'])/, ['attribute2.name', 'string']],
                    [/#EXTINF:-1/, 'keyword'],
                    
                    // TVG attributes with name-value separation
                    [/(tvg-id=)(["'][^"']*["'])/, ['attribute.name', 'string']],
                    [/(tvg-name=)(["'][^"']*["'])/, ['attribute.name', 'string']],
                    [/(tvg-logo=)(["'][^"']*["'])/, ['attribute.name', 'string']],
                    [/(group-title=)(["'][^"']*["'])/, ['attribute.name', 'string']],
                    
                    // EXTVLCOPT attributes
                    [/(#EXTVLCOPT:)(http-[^=]+=)(.*)$/, ['keyword', 'header.name', 'header.value']],
                    
                    // URLs
                    [/https?:\/\/[^\s]+/, 'string.link'],
                    
                    // Channel names after comma
                    [/,[^\n]+/, 'variable.name']
                ]
            }
        });

        // Create editor with custom theme
        const editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: content || '',
            language: 'm3u',
            theme: 'm3u-dark',
            automaticLayout: true,
            minimap: { enabled: true },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            renderWhitespace: 'selection',
            accessibilitySupport: 'on',
            ariaLabel: 'M3U Kod Düzenleyici',
            find: {
                addExtraSpaceOnTop: false,
                autoFindInSelection: 'never',
                seedSearchStringFromSelection: 'never'
            },
            suggest: {
                snippetsPreventQuickSuggestions: false,
                showWords: false,
                showIcons: true
            }
        });

        // Check if completion provider is already registered
        if (!window.m3uCompletionProviderRegistered) {
            monaco.languages.registerCompletionItemProvider('m3u', {
                provideCompletionItems: function(model, position) {
                    const suggestions = [
                        {
                            label: '#EXTINF:-1 (Boş değerlerle kanal ekle)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EXTINF:-1 tvg-name="" tvg-id="" tvg-logo="" group-title="" ,Kanal-Adı-Buraya\nİÇERİĞE-AİT-URL-ADRESİ-BURAYA\n',
                            documentation: 'Kanal bilgisi ve URL ekler',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        },
                        {
                            label: '#EXTVLCOPT:http-referrer (URL Referansı)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '#XTVLCOPT:http-referrer=',
                            documentation: 'Bazı url adresleri referans gerektirir.',
                        },
                        
                        {
                            label: '#EXTVLCOPT:http-user-agent (URL User-Agent)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EXTVLCOPT:http-user-agent=',
                            documentation: 'Bazı url adreslerleri user-agent gerektirir.',
                        },
                        {
                            label: '#EXTVLCOPT:http-... (HTTP Header referansları)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EXTVLCOPT:http-',
                            documentation: 'Bazı adresler ek http header gereksinimleri taşır.',
                        },
                        {
                            label: 'tvg-id (EPG için kullanışlı)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'tvg-id="" ',
                            documentation: 'Kanal ID değeri. EPG için kullanışlıdır.',
                        },
                        {
                            label: 'tvg-name (Kanala isim verin)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'tvg-name="" ',
                            documentation: 'Kanal adı'
                        },
                        {
                            label: 'tvg-logo (Kanal görseli için)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'tvg-logo="" ',
                            documentation: 'Kanal görseli için logo URL adresi'
                        },
                        {
                            label: 'x-tvg-url (EPG adresi eklemek için)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'x-tvg-url=""',
                            documentation: 'EPG adresi eklemek için URL adresi'
                        },
                        {
                            label: 'group-title (Kanala bir grup ekleyin)',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'group-title="" ',
                            documentation: 'Kanal grubu adı'
                        }
                    ];
                    return { suggestions: suggestions };
                },
                triggerCharacters: ['#', '-', 't', 'g']
            });
            window.m3uCompletionProviderRegistered = true;
        }

        editor.onDidFocusEditorWidget(() => {
            const findWidget = document.querySelector('.editor-widget.find-widget');
            if (findWidget && findWidget.classList.contains('visible')) {
                updateFindWidget();
            }
        });

        // Monitor for find widget visibility changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('find-widget')) {
                    const findWidget = mutation.target;
                    if (findWidget.classList.contains('visible')) {
                        findWidget.removeAttribute('aria-hidden');
                        findWidget.querySelectorAll('[aria-hidden]').forEach(el => {
                            el.removeAttribute('aria-hidden');
                        });
                    }
                }
            });
        });

        // Start observing the editor container for find widget changes
        const editorContainer = document.getElementById('editor-container');
        observer.observe(editorContainer, {
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });


        // Setup keyboard shortcuts
        setupMonacoEditor(editor);

        // Global olarak editör nesnesini sakla
        window.currentEditor = editor;

        // İstatistikleri güncelle
        updateEditorStats(content);
        updateChannelList();
        updateCounts();

        // İçerik değiştiğinde istatistikleri güncelle
        editor.onDidChangeModelContent(() => {
            window.hasEditorChanges = true;
            updateEditorStats(editor.getValue());
        });
    });
}

// Editör istatistiklerini güncelle
function updateEditorStats(content) {
    const lines = content.split('\n');
    let channelCount = 0;
    const groups = new Set();

    lines.forEach(line => {
        if (line.startsWith('#EXTINF:')) {
            channelCount++;
            const groupMatch = line.match(/group-title="([^"]*)"/);
            if (groupMatch && groupMatch[1]) {
                groups.add(groupMatch[1]);
            }
        }
    });

    const channelCountEl = document.querySelector('.channel-count');
    const groupCountEl = document.querySelector('.group-count');

    if (channelCountEl) channelCountEl.textContent = `${channelCount} Kanal`;
    if (groupCountEl) groupCountEl.textContent = `${groups.size} Grup`;
}

// Editör kapatma fonksiyonu
function closeTextEditor() {
    if (window.hasEditorChanges) {
        if (!confirm('Kaydedilmemiş değişiklikler olabilir. Çıkmak istediğinizden emin misiniz?')) {
            return;
        }
    }
    
    const modal = document.querySelector('.editor-modal');
    if (modal) {
        if (window.currentEditor) {
            window.currentEditor.dispose();
            window.currentEditor = null;
        }
        modal.remove();
    }
}

// Editör içeriğini kaydet
function saveEditorContent() {
    if (!window.currentEditor) return;
    const content = window.currentEditor.getValue();
    if (parseM3U(content)) {
        showNotification('İçerik başarıyla kaydedildi', 'success');
        document.querySelector('.editor-modal').remove();
        window.currentEditor = null;
    }
}

// Editör içeriğini indir
function downloadEditorContent() {
    if (!window.currentEditor) return;
    
    // Get base filename without extension
    const baseFileName = currentFileName ? currentFileName.replace(/\.[^.]+$/, '') : 'playlist';
    
    // Prompt for filename with current name as default
    const fileName = prompt('Dosya adını giriniz:', baseFileName);
    if (!fileName) return; // Exit if cancelled
    
    // Remove any extension from user input and add .m3u
    const cleanFileName = fileName.replace(/\.[^.]+$/, '');
    const content = window.currentEditor.getValue();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanFileName}.m3u`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Editör temasını değiştir
function toggleEditorTheme() {
    if (!window.currentEditor) return;
    const currentTheme = window.currentEditor.getOption(monaco.editor.EditorOption.theme);
    window.currentEditor.updateOptions({
        theme: currentTheme === 'vs-dark' ? 'vs-light' : 'vs-dark'
    });
}

// Editör içeriğini doğrula
function validateEditorContent() {
    if (!window.currentEditor) return;
    
    // Always clear existing decorations first
    window.currentEditor.deltaDecorations(window.currentEditor.getModel().getAllDecorations().map(d => d.id), []);
    
    // Check if validation panel exists and close it if it does
    const existingPanel = document.querySelector('.validation-panel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }
    
    validateM3U(window.currentEditor);
}

// Editör arama fonksiyonu
function editorSearch() {
    if (!window.currentEditor) return;
    
    const selection = window.currentEditor.getSelection();
    const selectedText = selection && !selection.isEmpty() ? 
        window.currentEditor.getModel().getValueInRange(selection) : '';
    
    window.currentEditor.trigger('keyboard', 'actions.find', null);
    
    if (selectedText) {
        const trySetSearchText = (attempts = 0) => {
            if (attempts > 10) return; // Give up after 10 attempts
            
            const findInput = document.querySelector('.monaco-editor .find-widget .input');
            if (findInput) {
                findInput.value = selectedText;
                findInput.dispatchEvent(new Event('input'));
            } else {
                setTimeout(() => trySetSearchText(attempts + 1), 50);
            }
        };
        
        trySetSearchText();
    }
}

// Editör arama/değiştirme fonksiyonu
function editorSearchReplace() {
    if (!window.currentEditor) return;
    
    const selection = window.currentEditor.getSelection();
    const selectedText = selection && !selection.isEmpty() ? 
        window.currentEditor.getModel().getValueInRange(selection) : '';
    
    window.currentEditor.trigger('keyboard', 'editor.action.startFindReplaceAction', null);
    
    if (selectedText) {
        const trySetSearchText = (attempts = 0) => {
            if (attempts > 10) return; // Give up after 10 attempts
            
            const findInput = document.querySelector('.monaco-editor .find-widget .input');
            if (findInput) {
                findInput.value = selectedText;
                findInput.dispatchEvent(new Event('input'));
            } else {
                setTimeout(() => trySetSearchText(attempts + 1), 50);
            }
        };
        
        trySetSearchText();
    }
}

// Event listener'ları güncelle
function attachEventListeners() {
    // Ana Sayfa butonu
    const homeButton = document.querySelector('.sidebar a[href="#"]');
    if (homeButton) {
        homeButton.onclick = (e) => {
            e.preventDefault();
            resetToHome();
        };
    }

    // Mevcut event listener'lar...

    // Yeni kanal butonu
    const addButton = document.querySelector('.btn-add');
    if (addButton) {
        addButton.onclick = addChannel;
    }

    // Quick action kartları
    document.querySelectorAll('.action-card').forEach(card => {
        card.onclick = (e) => {
            const action = card.getAttribute('data-action');
            switch(action) {
                case 'load': loadM3U(); break;
                case 'edit': showTextEditor(generateM3UContent()); break;
                case 'save': saveM3U(); break;
                case 'favorites': showFavoritesModal(); break;
            }
        };
    });

    // Üst bar butonları
    document.querySelectorAll('.top-actions button').forEach(button => {
        button.onclick = (e) => {
            const action = button.getAttribute('data-action');
            switch(action) {
                case 'new': createNewM3U(); break;
                case 'theme': toggleTheme(); break;
            }
        };
    });

    // Arama kutusu
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.oninput = (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterChannels(searchTerm);
        };
    }

    // Grup filtresi
    const groupFilter = document.getElementById('groupFilter');
    if (groupFilter) {
        groupFilter.onchange = (e) => {
            filterByGroup(e.target.value);
        };
    }
}

// Ana Sayfa fonksiyonu
function resetToHome() {
    // Kaydedilmemiş değişiklikleri kontrol et
    if (window.hasUnsavedChanges || (window.currentEditor && window.hasEditorChanges)) {
        if (!confirm('Kaydedilmemiş değişiklikleriniz olabilir. Ana sayfaya dönmek istediğinizden emin misiniz?')) {
            return;
        }
    }
    
    // Kanal listesini temizle
    channels = [];
    updateChannelList();
    
    // Grup filtresini sıfırla
    const groupFilter = document.getElementById('groupFilter');
    if (groupFilter) {
        groupFilter.value = '';
        groupFilter.innerHTML = '<option value="">Tüm Gruplar</option>';
    }
    
    // Arama kutusunu temizle
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Dosya input'unu temizle
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
    
    // Açık modalları kapat
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.remove());
    
    // Değişiklik bayraklarını sıfırla
    updateUnsavedChanges(false);
    if (window.currentEditor) {
        window.hasEditorChanges = false;
    }
    window.currentFileName = null;
    
    // Bildirim göster
    clearNotifications(); // Bildirimleri temizle
    notifications = []; // Bildirimleri sıfırla
    updateNotificationBadge(); // Bildirim sayacını güncelle
}

// Sayfa yüklendiğinde çalışacak ana fonksiyonu güncelle
document.addEventListener('DOMContentLoaded', function() {
    
    // Temel değişkenleri başlat
    window.channels = window.channels || [];
    window.currentFileName = window.currentFileName || 'playlist.m3u';
    window.editHistory = window.editHistory || [];
    window.hasUnsavedChanges = false;

    // Tüm butonları bağla
    attachEventListeners();
    
    // Test butonu ekle
    addTestButton();
    
    // Tema kontrolü
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.btn-theme span').className = 'koyu-tema-ay';
    }

    // İlk kanal listesi güncellemesi
    updateChannelList(channels);

    // Sıralama açılır menüsü için event listener
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            const groupFilter = document.getElementById('groupFilter');
            const selectedGroup = groupFilter.value;
            const filteredChannels = selectedGroup 
                ? channels.filter(ch => ch.groupTitle === selectedGroup)
                : [...channels];
            // Hide no-results state and show filtered channels
        window.noResultsManager.hide();
        updateChannelList(filteredChannels);
        // Show empty state if no channels are available
        if (filteredChannels.length === 0) {
            document.getElementById('emptyState').style.display = 'flex';
        }
        });
    }

    setupSearch(); // Arama işlevselliğini kur
});

// Kanal filtreleme
function filterChannels(searchTerm) {
    const filteredChannels = channels.filter(channel => 
        channel.tvgName.toLowerCase().includes(searchTerm) ||
        channel.groupTitle.toLowerCase().includes(searchTerm)
    );
    
    updateChannelList(filteredChannels);
}

// Grup filtreleme
function filterByGroup(groupName) {
    if (!groupName) {
        updateChannelList(channels);
        return;
    }
    
    const filteredChannels = channels.filter(channel => 
        channel.groupTitle === groupName
    );
    
    updateChannelList(filteredChannels);
}

// Test butonunu ekle
function addTestButton() {
    const testButton = document.createElement('button');
    testButton.className = 'test-button glow-on-hover';
    testButton.innerHTML = '<i class="fa-solid fa-list-ol"></i> Hızlı Liste';
    testButton.onclick = () => {
        if (channels.length > 0 && window.hasUnsavedChanges) {
            if (!confirm('Mevcut liste silinecek. Devam etmek istiyor musunuz?')) {
                return;
            }
        }
        loadTestData();
        showNotification('Örnek kanallar yüklendi', 'success');
        updateChannelList();
        updateCounts();
    };
    document.body.appendChild(testButton);
}

// Test verilerini güncelle
function loadTestData() {
    channels = [
        {
            tvgName: "TRT 1",
            tvgId: "trt1",
            tvgLogo: DEFAULT_LOGO,
            groupTitle: "Ulusal",
            channelUrl: "https://tv-trt1.medya.trt.com.tr/master.m3u8",
            httpReferrer: "",
            userAgent: ""
        },
        {
            tvgName: "Show TV",
            tvgId: "show",
            tvgLogo: DEFAULT_LOGO,
            groupTitle: "Ulusal",
            channelUrl: "https://ciner-live.daioncdn.net/showtv/showtv_1080p.m3u8",
            httpReferrer: "",
            userAgent: ""
        },
        {
            tvgName: "TLC",
            tvgId: "tlc",
            tvgLogo: DEFAULT_LOGO,
            groupTitle: "Belgesel",
            channelUrl: "https://dogus-live.daioncdn.net/tlc/tlc_720p.m3u8",
            httpReferrer: "",
            userAgent: ""
        }
    ];
    updateChannelList();
    updateUnsavedChanges(true);
    updateCounts();
}

// reattachEventListeners fonksiyonunu ekleyin
function reattachEventListeners() {
    // Kanal kartları için olay dinleyicileri
    document.querySelectorAll('.channel-card').forEach(card => {
        const buttons = card.querySelectorAll('button');
        buttons.forEach(button => {
            const action = button.getAttribute('data-action');
            if (action) {
                button.onclick = (e) => {
                    e.stopPropagation();
                    switch(action) {
                        case 'play':
                            const url = button.getAttribute('data-url');
                            const name = button.getAttribute('data-name');
                            previewStream(url, name);
                            break;
                        case 'edit':
                            const index = parseInt(button.getAttribute('data-index'));
                            editChannel(index);
                            break;
                        case 'delete':
                            const delIndex = parseInt(button.getAttribute('data-index'));
                            deleteChannel(delIndex);
                            break;
                    }
                };
            }
        });
    });
}

// Kanal düzenleme fonksiyonu
function editChannel(index) {
    const channel = channels[index];
    if (!channel) {
        showNotification('Kanal bulunamadı', 'error');
        return;
    }
    
    // Get the current group filter value
    const groupFilter = document.getElementById('groupFilter');
    const currentGroup = groupFilter ? groupFilter.value : '';
    
    showChannelModal(channel);
    
    // Logo önerilerini göster
    const logoInput = document.querySelector('input[name="tvgLogo"]');
    const suggestButton = document.querySelector('.btn-suggest-logo');
    if (logoInput && suggestButton) {
        const matches = findMatchingLogos(channel.tvgName);
        suggestButton.classList.toggle('has-suggestions', matches.length > 0);
    }
    
    updateCounts();
}

// Yeni kanal ekleme fonksiyonu
function addChannel() {
    const newChannel = {
        tvgName: '',
        tvgId: '',
        tvgLogo: DEFAULT_LOGO,
        groupTitle: 'Genel Kategoriler',
        channelUrl: '',
        httpReferrer: '',
        userAgent: ''
    };
    
    showChannelModal(null); // Boş kanal modalını aç
    updateChannelList();
    updateCounts();
}

// M3U içeriğini doğrula
function validateM3U(editor) {
    const model = editor.getModel();
    const content = model.getValue();
    const lines = content.split('\n');
    const errors = [];
    const warnings = [];
    let currentLine = 0;
    let expectingUrl = false;

    lines.forEach((line, index) => {
        line = line.trim();
        currentLine = index + 1;

        if (line.startsWith('#EXTINF:')) {
            if (expectingUrl) {
                errors.push({
                    line: currentLine,
                    message: 'URL eksik: Önceki kanal için URL bulunamadı'
                });
            }

            // EXTINF format kontrolü
            if (!line.match(/^#EXTINF:-1\s/)) {
                warnings.push({
                    line: currentLine,
                    message: 'Format uyarısı: Her bir kanal eklenirken satırın "#EXTINF:-1" şeklinde başlaması daha doğru olacaktır'
                });
            }

            // Zorunlu etiketleri kontrol et
            const requiredTags = ['tvg-name', 'tvg-id', 'group-title'];
            requiredTags.forEach(tag => {
                if (!line.includes(tag + '="')) {
                    warnings.push({
                        line: currentLine,
                        message: `Eksik etiket: "${tag}" önerilen bir etikettir`
                    });
                }
            });

            // Boş etiket değerlerini kontrol et
            const emptyTags = line.match(/[a-zA-Z-]+=""/g);
            if (emptyTags) {
                emptyTags.forEach(tag => {
                    warnings.push({
                        line: currentLine,
                        message: `Boş etiket: "${tag.replace(/="/g, '')}" değeri boş.`
                    });
                });
            }

            expectingUrl = true;
        } else if (line.startsWith('http')) {
            // URL formatını kontrol et
            if (!line.match(/^https?:\/\/.+/)) {
                errors.push({
                    line: currentLine,
                    message: 'Geçersiz URL formatı'
                });
            }
            expectingUrl = false;
        } else if (line && !line.startsWith('#')) {
            errors.push({
                line: currentLine,
                message: 'Tanınmayan satır formatı'
            });
        }
    });

    // Son kanal için URL kontrolü
    if (expectingUrl) {
        errors.push({
            line: currentLine,
            message: 'URL eksik: Son kanal için URL bulunamadı'
        });
    }

    // Hata ve uyarıları göster
    showValidationResults(editor, errors, warnings);
}

// Doğrulama sonuçlarını göster
function showValidationResults(editor, errors, warnings) {
    // Önceki işaretlemeleri temizle
    editor.deltaDecorations([], []);
    
    // Hata ve uyarıları işaretle
    const decorations = [
        ...errors.map(error => ({
            range: new monaco.Range(error.line, 1, error.line, 1),
            options: {
                isWholeLine: true,
                className: 'error-line',
                glyphMarginClassName: 'error-glyph',
                hoverMessage: { value: `Hata: ${error.message}` }
            }
        })),
        ...warnings.map(warning => ({
            range: new monaco.Range(warning.line, 1, warning.line, 1),
            options: {
                isWholeLine: true,
                className: 'warning-line',
                glyphMarginClassName: 'warning-glyph',
                hoverMessage: { value: `Uyarı: ${warning.message}` }
            }
        }))
    ];

    editor.deltaDecorations([], decorations);
    
    // Doğrulama panelini göster
    showValidationPanel(editor, errors, warnings);
}

// Doğrulama paneli
function showValidationPanel(editor, errors, warnings) {
    // Varsa eski paneli kaldır
    const oldPanel = document.querySelector('.validation-panel');
    if (oldPanel) oldPanel.remove();

    const panel = document.createElement('div');
    panel.className = 'validation-panel';
    panel.innerHTML = `
        <div class="validation-header">
            <h3>Doğrulama Sonuçları</h3>
            <div class="validation-stats">
                <span class="error-count">${errors.length} Hata</span>
                <span class="warning-count">${warnings.length} Uyarı</span>
            </div>
            <button class="close-panel" title="Kapat"></button>
        </div>
        <div class="validation-content">
            ${errors.length > 0 ? `
                <div class="error-section">
                    <h4>Hatalar:</h4>
                    <ul>
                        ${errors.map(error => `
                            <li class="error-item" data-line="${error.line}" title="Bu satıra gitmek için tıklayın">
                                <span>Satır ${error.line}: ${error.message}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            ${warnings.length > 0 ? `
                <div class="warning-section">
                    <h4>Uyarılar:</h4>
                    <ul>
                        ${warnings.map(warning => `
                            <li class="warning-item" data-line="${warning.line}" title="Bu satıra gitmek için tıklayın">
                                <span>Satır ${warning.line}: ${warning.message}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;

    document.querySelector('.editor-modal .modal-content').appendChild(panel);

    // Hata/uyarı satırına tıklandığında o satıra git
    panel.querySelectorAll('.error-item, .warning-item').forEach(item => {
        item.onclick = () => {
            const line = parseInt(item.dataset.line);
            editor.revealLineInCenter(line);
            editor.setPosition({lineNumber: line, column: 1});
            editor.focus();
        };
    });

    // Panel kapatma
    panel.querySelector('.close-panel').onclick = () => panel.remove();
}

// Araçlar menüsü için yeni fonksiyonlar
function patr0nListeleri() {
    const modal = document.createElement('div');
    modal.className = 'modal video-test-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; max-height: 800px">
            <div class="modal-header">
                <h3><i class="fas fa-tv"></i> patr0n'a teşekkürler...</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-test-container">
                <iframe 
                    src="https://gitlatte.github.io/patr0n/pages/patron-ozel/patronozel-m3u.html" 
                    frameborder="0" 
                    style="width: 100%; height: 100%;">
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
}
function patr0nLinkTest() {
    const modal = document.createElement('div');
    modal.className = 'modal video-test-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 625px; max-height: 800px">
            <div class="modal-header">
                <h3><i class="fa-regular fa-star"></i> Linkleri Topla - URL Geçerlilik Kontrolü</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-test-container">
                <iframe 
                    src="https://gitlatte.github.io/patr0n/pages/patron-ozel/test-m3u.html" 
                    frameborder="0" 
                    style="width: 100%; max-height: 100%;">
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Ana konuya git fonksiyonu
function anaKonuyaGit() {
    window.open('https://www.sinetech.tr/konu/m3u-web-designer-m3u-duzenleyici.1/', '_blank');
}

// Patr0n linkleri toplama sayfasına git fonksiyonu
function patr0nLinkleriTopla() {
    window.open('https://gitlatte.github.io/patr0n/', '_blank');
}

function patr0nHazirListeler() {
    const modal = document.createElement('div');
    modal.className = 'modal hazir-listeler-modal';
    modal.innerHTML = `
        <div class="modal-content" style="width: 100%; height: 100%;">
            <div class="modal-header">
                <h3><i class="fa-regular fa-star"></i> Linkleri Topla - Hazır Listeler</h3>
                <button class="close">&times;</button>
            </div>
            <div class="hazir-listeler-container">
                <iframe 
                    src="https://gitlatte.github.io/patr0n/pages/patron-ozel/hazir-listeler.html" 
                    frameborder="0" 
                    style="width: 100%; height: 100%;">
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function openVideoTester() {
    const modal = document.createElement('div');
    modal.className = 'modal video-test-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-video"></i> Video Test Et</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-test-container">
                <iframe 
                    src="https://gitlatte.github.io/videotest/" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Modal kapatma
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Video alt menüsünü aç/kapat
function toggleVideoSubmenu(event) {
    event.preventDefault();
    const parent = event.currentTarget.parentElement;
    parent.classList.toggle('active');
}

// Yerleşik player ile video test fonksiyonunu güncelleyelim
function openVideoUrlTest() {
    const url = prompt('Test edilecek video URL adresini girin\n\nNot: VPN ve Proxy ihtiyacı olan bir adresi test ediyorsanız lütfen Video URL Proxy bağlantısını kullanın.');
    if (!url) return;

    const modal = document.createElement('div');
    modal.className = 'modal stream-preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-play-circle"></i> Video Test</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-container">
                <div class="resolution-info">
                    <span></span>
                </div>
                <video id="player" controls crossorigin="anonymous" playsinline></video>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const video = modal.querySelector('video');
    const resolutionInfo = modal.querySelector('.resolution-info span');
    
    // Plyr player'ı başlat
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
    });

    // HLS.js ile video oynatıcıyı başlat
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        // Çözünürlük bilgisini göster
        video.addEventListener('loadedmetadata', () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            if (width && height) {
                let quality = '';
                if (height >= 2160) quality = 'UHD 4K';
                else if (height >= 1080) quality = 'FHD';
                else if (height >= 720) quality = 'HD';
                else quality = 'SD';
                
                resolutionInfo.innerHTML = `
                    <div class="quality-badge ${quality.toLowerCase().replace(' ', '-')}">
                        <span class="quality-label">${quality}</span>
                        <span class="quality-resolution">${height}p</span>
                    </div>
                `;
            }
        });

        // Hata durumunda
        hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS hatası:', data);
            showNotification('Video yüklenirken bir hata oluştu', 'error');
        });
    }

    // Modal kapatma
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        player.destroy();
        modal.remove();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            player.destroy();
            modal.remove();
        }
    };
}

// Proxy ile video test
function openVideoUrlProxy() {
    const url = prompt('Test edilecek video URL adresini girin\n\nNot: Burada test edeceğiniz videolar proxy ile oynatılacağı için açılmayabilirler. O yüzden VPN gereksinimi olan bağlantı adresleri için kullanmanızı öneririm.');
    if (!url) return;

    const modal = document.createElement('div');
    modal.className = 'modal video-test-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-globe"></i> Video Test (Proxy)</h3>
                <button class="close">&times;</button>
            </div>
            <div class="video-test-container">
                <iframe 
                    src="https://gitlatte.github.io/videotest/?url=${encodeURIComponent(url)}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Event listener'ları ekleyelim
document.addEventListener('DOMContentLoaded', () => {
    // Dosyadan yükleme butonu
    const loadFileBtn = document.querySelector('[data-action="loadFile"]');
    if (loadFileBtn) {
        loadFileBtn.addEventListener('click', loadM3U);
    }
    
    // URL ile yükleme butonu
    const loadUrlBtn = document.querySelector('[data-action="loadUrl"]');
    if (loadUrlBtn) {
        loadUrlBtn.addEventListener('click', loadFromUrl);
    }

    // Dosya input event listener'ı
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop().toLowerCase();
            if (!['m3u', 'txt'].includes(fileExt)) {
                showNotification('Geçersiz dosya formatı. Sadece .m3u ve .txt dosyaları desteklenir.', 'error');
                setTimeout(() => window.location.reload(), 2000);
                return;
            }

            // Update currentFileName when loading a file
            currentFileName = file.name;

            showNotification('Liste yükleniyor...', 'info');

            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                if (!isValidM3U(content)) {
                    showNotification('Geçersiz M3U formatı', 'error');
                    setTimeout(() => window.location.reload(), 2000);
                    return;
                }
                parseM3U(content);
                updateChannelList();
                showNotification('Liste başarıyla yüklendi', 'success');
            };
            reader.readAsText(file);
        });
    }
});

// Sıra numarasını güncelle
function updateChannelOrder() {
    const channelCards = document.querySelectorAll('.channel-card');
    channelCards.forEach((card, index) => {
        const orderNumber = card.querySelector('.order-number');
        if (orderNumber) {
            orderNumber.textContent = index + 1; // 1'den başlat
        }
    });
}

// Kanal sırasını değiştirme fonksiyonu
function changeChannelOrder(oldIndex, newIndex) {
    const channel = channels[oldIndex];
    channels.splice(oldIndex, 1);
    channels.splice(newIndex, 0, channel);
    // Calculate which page the channel will be on after moving
    const targetPage = Math.floor(newIndex / CHANNELS_PER_PAGE);
    updateChannelList(null, targetPage); // Update list and maintain the correct page
    updateUnsavedChanges(true);
}

// Yukarı taşıma fonksiyonu
function moveChannelUp(index) {
    if (index > 0) {
        changeChannelOrder(index, index - 1);
    }
}

// Aşağı taşıma fonksiyonu
function moveChannelDown(index) {
    if (index < channels.length - 1) {
        changeChannelOrder(index, index + 1);
    }
}

// Butonların event listener'larını ekleyelim
document.querySelectorAll('.channel-card .move-up').forEach((button, index) => {
    button.addEventListener('click', () => moveChannelUp(index));
});

document.querySelectorAll('.channel-card .move-down').forEach((button, index) => {
    button.addEventListener('click', () => moveChannelDown(index));
});

// Yükleme animasyonunu göster
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Yükleme animasyonunu gizle
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Grup filtresini güncelle
function updateGroupFilter() {
    const groupFilter = document.getElementById('groupFilter');
    if (!groupFilter) return;

    // Eski event listener'ı kaldır
    const oldListener = groupFilter._changeListener;
    if (oldListener) {
        groupFilter.removeEventListener('change', oldListener);
    }

    // Mevcut grupları temizle
    groupFilter.innerHTML = '<option value="">Gruba Göre Filtrele</option>';
    groupFilter.innerHTML += '<option value="all">Tüm Gruplar</option>';

    // Benzersiz grupları al
    const uniqueGroups = [...new Set(channels.map(ch => ch.groupTitle))].sort();

    // Grupları filtreye ekle
    uniqueGroups.forEach(group => {
        if (group && group.trim()) {
            const option = document.createElement('option');
            option.value = group;
            option.textContent = group;

            // Grup simgesi ve rengi
            const groupInfo = getGroupInfo(group);
            option.style.color = groupInfo.color; // Rengi ayarla

            groupFilter.appendChild(option);
        }
    });

    // Yeni event listener ekle ve referansını sakla
    const newListener = function() {
        const selectedGroup = this.value;
        let filteredChannels;
        
        if (selectedGroup === 'all') {
            filteredChannels = [...channels];
        } else if (selectedGroup === '') {
            return; // Başlık seçildiğinde hiçbir şey yapma
        } else {
            filteredChannels = [...channels].filter(ch => ch.groupTitle === selectedGroup);
        }
        
        // Hide no-results state and show filtered channels
        window.noResultsManager.hide();
        updateChannelList(filteredChannels);
        // Show empty state if no channels are available
        if (filteredChannels.length === 0) {
            document.getElementById('emptyState').style.display = 'flex';
        }
        
        // Seçili değeri güncelle
        groupFilter.value = selectedGroup; // Seçili grup adını güncelle
    };
    
    groupFilter._changeListener = newListener;
    groupFilter.addEventListener('change', newListener);
}

// Kanalları sıralama fonksiyonu
function sortChannels(channels, sortType) {
    const channelsCopy = [...channels]; // Orijinal diziyi değiştirmemek için kopya oluştur
    switch (sortType) {
        case 'favorites':
            return channelsCopy.sort((a, b) => {
                if (a.isFavorite && !b.isFavorite) return -1;
                if (!a.isFavorite && b.isFavorite) return 1;
                return 0;
            });
        case 'az':
            return channelsCopy.sort((a, b) => a.tvgName.localeCompare(b.tvgName));
        case 'za':
            return channelsCopy.sort((a, b) => b.tvgName.localeCompare(a.tvgName));
        case 'logo':
            return channelsCopy.sort((a, b) => {
                const aHasLogo = a.tvgLogo && a.tvgLogo !== DEFAULT_LOGO;
                const bHasLogo = b.tvgLogo && b.tvgLogo !== DEFAULT_LOGO;
                if (!aHasLogo && bHasLogo) return -1; // Logo problemi olanlar üste
                if (aHasLogo && !bHasLogo) return 1;
                return 0;
            });
        default:
            return channelsCopy;
    }
}

// Arama işlevselliği
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-bar i');
    let currentFiltered = null; // Mevcut filtrelenmiş kanalları sakla

    // Arama simgesini güncelle
    function updateSearchIcon(hasValue) {
        if (hasValue) {
            searchIcon.classList.remove('fa-search');
            searchIcon.classList.add('fa-times');
            searchIcon.style.pointerEvents = 'all';
            searchIcon.style.cursor = 'pointer';
        } else {
            searchIcon.classList.remove('fa-times');
            searchIcon.classList.add('fa-search');
            searchIcon.style.pointerEvents = 'none';
            searchIcon.style.cursor = 'default';
        }
    }

    // Aramayı temizle
    function clearSearch() {
        searchInput.value = '';
        updateSearchIcon(false);
        // Grup filtresine göre listeyi güncelle
        const groupFilter = document.getElementById('groupFilter');
        const selectedGroup = groupFilter.value;
        let filteredChannels;
        
        if (selectedGroup === 'all' || !selectedGroup) {
            filteredChannels = [...channels];
        } else {
            filteredChannels = [...channels].filter(ch => ch.groupTitle === selectedGroup);
        }
        // Hide no-results state and show filtered channels
        window.noResultsManager.hide();
        updateChannelList(filteredChannels);
        // Show empty state if no channels are available
        if (filteredChannels.length === 0) {
            document.getElementById('emptyState').style.display = 'flex';
        }
    }

    // Arama yap
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        updateSearchIcon(searchTerm.length > 0);

        if (searchTerm === '') {
            clearSearch();
            return;
        }

        // Mevcut grup filtresini al
        const groupFilter = document.getElementById('groupFilter');
        const selectedGroup = groupFilter.value;
        let searchPool = selectedGroup && selectedGroup !== 'all' 
            ? channels.filter(ch => ch.groupTitle === selectedGroup)
            : channels;

        // Arama yap
        const searchResults = searchPool.filter(channel => 
            channel.tvgName.toLowerCase().includes(searchTerm) ||
            channel.groupTitle.toLowerCase().includes(searchTerm)
        );

        // Update visibility based on search results
        window.noResultsManager.updateVisibility(searchResults);
        if (searchResults.length > 0) {
            updateChannelList(searchResults);
        }
    }

    // Event listener'ları ekle
    searchInput.addEventListener('input', performSearch);
    searchIcon.addEventListener('click', () => {
        if (searchInput.value) {
            clearSearch();
        }
    });
}

// DOMContentLoaded event listener'ına ekle
document.addEventListener('DOMContentLoaded', () => {
    // ... mevcut kodlar ...
    setupSearch(); // Arama işlevselliğini kur
});

// Kanal gruplarını listeleme
function listChannelGroups() {
    const groupList = document.getElementById('groupList');
    const paginationContainer = document.getElementById('channelPagination');
    const channelList = document.getElementById('channelList');

    // Hide channel list and show group list
    channelList.style.display = 'none';
    groupList.style.display = 'grid';
    if (paginationContainer) {
        paginationContainer.style.display = 'none';
    }

    const fragment = document.createDocumentFragment();

    // Grup sayılarını hesapla
    const groupCounts = channels.reduce((acc, ch) => {
        acc[ch.groupTitle] = (acc[ch.groupTitle] || 0) + 1;
        return acc;
    }, {});

    // Grupları sırala
    const uniqueGroups = Object.keys(groupCounts).sort();

    // Grup kartlarını fragment'a ekle
    uniqueGroups.forEach(group => {
        const groupCard = createGroupCard(group, groupCounts[group]);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = groupCard;
        fragment.appendChild(cardElement.children[0]);
    });

    // Tüm DOM manipülasyonlarını tek seferde yap
    groupList.innerHTML = '';
    groupList.appendChild(fragment);

    // Event delegation kullanarak tek bir event listener ekle
    groupList.addEventListener('click', (e) => {
        const viewButton = e.target.closest('.view-channels');
        if (viewButton) {
            const selectedGroup = viewButton.getAttribute('data-group');
            const filteredChannels = channels.filter(ch => ch.groupTitle === selectedGroup);
            
            // Switch back to channel list view
            groupList.style.display = 'none';
            channelList.style.display = 'grid';
            
            // Show pagination and update channel list
            if (paginationContainer) {
                paginationContainer.style.display = 'flex';
            }
            
            // Reset to first page when showing filtered channels
            updateChannelList(filteredChannels, 0);
        }
    });
}

// Kanal Grupları başlığına tıklama olayı
document.getElementById('groupHeader').addEventListener('click', () => {
    const groupList = document.getElementById('groupList');
    const channelList = document.getElementById('channelList');
    const channelListHeader = document.querySelector('.section-header:first-child');
    
    if (groupList.style.display === 'none') {
        // Grup listesini göster, kanal listesini gizle
        groupList.style.display = 'grid';
        channelList.style.display = 'none';
        channelListHeader.querySelector('h2').style.color = 'var(--text-muted)';
        document.getElementById('groupHeader').style.color = 'var(--primary)';
        listChannelGroups();
    } else {
        // Grup listesini gizle, kanal listesini göster
        groupList.style.display = 'none';
        channelList.style.display = 'grid';
        channelListHeader.querySelector('h2').style.color = 'var(--primary)';
        document.getElementById('groupHeader').style.color = 'var(--text-muted)';
        updateChannelList();
    }
});

// Kanallar başlığına tıklama olayı ekle
document.querySelector('.section-header:first-child h2').addEventListener('click', () => {
    const groupList = document.getElementById('groupList');
    const channelList = document.getElementById('channelList');
    const channelListHeader = document.querySelector('.section-header:first-child');
    
    groupList.style.display = 'none';
    channelList.style.display = 'grid';
    channelListHeader.querySelector('h2').style.color = 'var(--primary)';
    document.getElementById('groupHeader').style.color = 'var(--text-muted)';
    updateChannelList();
});

// Kanal grubu kartı oluşturma
function createGroupCard(group) {
    const groupInfo = getGroupInfo(group); // Grup simgesi ve rengi
    const channelCount = channels.filter(ch => ch.groupTitle === group).length;
    
    return `
        <div class="group-card" style="border-left: 5px solid ${groupInfo.color};">
            <h3>
                <i class="${groupInfo.icon}" style="color: ${groupInfo.color};"></i> ${group}
            </h3>
            <div class="group-actions">
                <button class="view-channels" data-group="${group}">
                    Görüntüle (${channelCount})
                </button>
                <button class="edit-group" data-group="${group}" onclick="editGroup('${group}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-group" data-group="${group}" onclick="deleteGroup('${group}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Bildirim yönetimi için global değişkenler
let notifications = [];
const MAX_NOTIFICATIONS = 50; // Maksimum bildirim sayısı

// Bildirim ekleme fonksiyonu
function addNotification(action, details) {
    const notification = {
        timestamp: new Date(),
        action: action,
        details: details
    };
    
    notifications.unshift(notification); // Yeni bildirimi başa ekle
    
    // Maksimum bildirim sayısını kontrol et
    if (notifications.length > MAX_NOTIFICATIONS) {
        notifications.pop(); // En eski bildirimi sil
    }
    
    // Bildirim sayacını güncelle
    updateNotificationBadge();
}

// Bildirim sayacını güncelleme
function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = notifications.length;
    }
}

// Bildirimleri görüntüleme
function showNotifications() {
    // Mevcut modal varsa kaldır
    let existingModal = document.querySelector('.notifications-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Yeni modal oluştur
    const modal = document.createElement('div');
    modal.className = 'notifications-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'notifications-content';
    
    // Başlık ve temizle butonu
    const header = document.createElement('div');
    header.className = 'notifications-header';
    header.innerHTML = `
        <h2>İşlem Geçmişi</h2>
        <button class="clear-notifications" onclick="clearNotifications()">
            <i class="fas fa-trash"></i> Temizle
        </button>
        <button class="close-modal" onclick="closeNotificationsModal()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Bildirim listesi
    const list = document.createElement('div');
    list.className = 'notifications-list';
    
    if (notifications.length === 0) {
        list.innerHTML = '<div class="no-notifications">Henüz işlem geçmişi yok</div>';
    } else {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            
            const date = new Date(notification.timestamp);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            
            notificationItem.innerHTML = `
                <div class="notification-time">${formattedDate}</div>
                <div class="notification-content">
                    <strong>${notification.action}</strong>
                    <p>${notification.details}</p>
                </div>
            `;
            
            list.appendChild(notificationItem);
        });
    }
    
    modalContent.appendChild(header);
    modalContent.appendChild(list);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    addNotificationsModalEventListeners();
}

// Bildirimleri temizleme
function clearNotifications() {
    notifications = [];
    updateNotificationBadge();
    showNotifications(); // Modalı güncelle
    const modal = document.querySelector('.notifications-modal');
    if (modal) {
        modal.remove();
    }
}

// Modal kapatma
function closeNotificationsModal() {
    const modal = document.querySelector('.notifications-modal');
    if (modal) {
        modal.remove();
    }
}

// Add event listeners for notifications modal when it's shown
function addNotificationsModalEventListeners() {
    const modal = document.querySelector('.notifications-modal');
    if (!modal) return;

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeNotificationsModal();
        }
    });

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeNotificationsModal();
        }
    });
}

// Bildirim butonuna tıklama olayı
document.querySelector('.btn-notification').addEventListener('click', showNotifications);

// Sayfa yenilendiğinde veya terk edildiğinde uyarı verme
window.addEventListener('beforeunload', function (event) {
    if (window.hasUnsavedChanges) {
        const confirmationMessage = 'Kaydedilmemiş değişiklikleriniz olabilir. Sayfayı terk etmek istediğinize emin misiniz?';
        event.returnValue = confirmationMessage; // Tarayıcıda varsayılan uyarıyı göster
        return confirmationMessage; // Bazı tarayıcılarda bu satır gereklidir
    }
});

// Sayaçları güncelleme fonksiyonu
function updateCounts() {
    const channelCountElement = document.getElementById('channelCount');
    const favoriteCountElement = document.getElementById('favoriteCount');
    
    if (channelCountElement) {
        channelCountElement.textContent = `(${channels.length})`;
    }
    
    if (favoriteCountElement) {
        const favoriteCount = Object.keys(localStorage).filter(key => key.startsWith('favorite_')).length;
        favoriteCountElement.textContent = `(${favoriteCount})`;
    }
}

function editGroup(groupTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal edit-group-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> Kanal Grubu Düzenle</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Grup Adı:</label>
                    <input type="text" id="newGroupTitle" value="${groupTitle}" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel">İptal</button>
                <button class="btn-save">Kaydet</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event Listeners
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const saveBtn = modal.querySelector('.btn-save');
    
    
    closeBtn.onclick = () => modal.remove();
    cancelBtn.onclick = () => modal.remove();
    modal.onclick = e => {
        if (e.target === modal) modal.remove();
    };
    
    saveBtn.onclick = () => {
        const newTitle = modal.querySelector('#newGroupTitle').value.trim();
        if (newTitle && newTitle !== groupTitle) {
            channels.forEach(ch => {
                if (ch.groupTitle === groupTitle) {
                    ch.groupTitle = newTitle;
                }
            });
            showNotification(`${groupTitle} grubu ${newTitle} olarak değiştirildi.`, 'success');
            addNotification('Kanal Grubu Düzenleme', `${groupTitle} grubu ${newTitle} olarak değiştirildi.`);
            listChannelGroups(); // Kanal grupları listesini güncelle
        }
        modal.remove();
    };
}

// Global modal referansı
let currentFavoriteModal = null;

function showFavorites() {
    if (currentFavoriteModal) {
        currentFavoriteModal.remove();
    }

    const favoritesList = getFavoriteChannels();
    const modal = document.createElement('div');
    modal.className = 'modal favorites-modal';
    currentFavoriteModal = modal;

    const totalFavorites = favoritesList.length;

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-heart"></i> Favori Kanallar</h3>
                <span class="favorite-count">Favori listenizde toplam ${totalFavorites} kanal var.</span>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                ${favoritesList.length > 0 ? favoritesList.map(channel => 
                    channel ? `
                        <div class="favorite-channel-card">
                            <img src="${channel.tvgLogo || DEFAULT_LOGO}" 
                                 alt="${channel.tvgName}" 
                                 class="channel-logo"
                                 onerror="this.src='${DEFAULT_LOGO}'">
                            <div class="channel-info">
                                <h4>${channel.tvgName}</h4>
                                <span class="group-name">
                                    <i class="${getGroupInfo(channel.groupTitle).icon}"></i> 
                                    ${channel.groupTitle}
                                </span>
                                <span class="added-date">Eklenme: ${channel.favoriteDate}</span>
                            </div>
                            <div class="channel-actions">
                                <button onclick="addFavoriteToList('${encodeURIComponent(channel.channelUrl)}')" class="btn-add">
                                    <i class="fas fa-plus"></i> Listene Ekle
                                </button>
                                <button onclick="removeFavorite('${encodeURIComponent(channel.channelUrl)}')" class="btn-remove">
                                    <i class="fas fa-trash"></i> Kaldır
                                </button>
                            </div>
                        </div>
                    ` : ''
                ).join('') : '<p>Favori kanal yok.</p>'}
            </div>
            <div class="modal-footer">
                <button class="btn-add-all" onclick="addAllFavoritesToList()">
                    <i class="fas fa-plus-circle"></i> Tümünü Ekle
                </button>
                <button class="btn-clear-all" onclick="removeAllFavorites()">
                    <i class="fas fa-trash-alt"></i> Favorileri Temizle
                </button>
                <button class="btn-cancel">Kapat</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-cancel');

    closeBtn.onclick = () => {
        modal.remove();
        currentFavoriteModal = null;
    };

    cancelBtn.onclick = () => {
        modal.remove();
        currentFavoriteModal = null;
    };
}

// Tek bir favori kanalı listeye ekleme
function addFavoriteToList(channelUrl) {
    const favoriteChannel = JSON.parse(localStorage.getItem(`favorite_${channelUrl}`));
    if (!favoriteChannel) return;

    // Kanalın listede olup olmadığını kontrol et
    const isChannelExists = channels.some(ch => ch.channelUrl === decodeURIComponent(channelUrl));
    
    if (isChannelExists) {
        showNotification('Bu kanal zaten listenizde yer alıyor.', 'warning');
        return;
    }

    // Kanalı listeye ekle
    channels.push(favoriteChannel);
    updateChannelList();
    showNotification('Kanal listeye eklendi.', 'success');
}

// Tüm favorileri listeye ekleme
function addAllFavoritesToList() {
    showConfirmation(
        'Tüm favori kanallarınızı şu anda düzenlediğiniz listeye eklemek istediğinize emin misiniz?',
        () => {
            const favoritesList = getFavoriteChannels();
            let addedCount = 0;

            favoritesList.forEach(favorite => {
                // Kanalın listede olup olmadığını kontrol et
                const isChannelExists = channels.some(ch => ch.tvgId === favorite.tvgId);
                
                if (!isChannelExists) {
                    channels.push(favorite);
                    addedCount++;
                }
            });

            updateChannelList();

            if (addedCount === 0) {
                showNotification('Tüm favori kanallarınız zaten listenizde bulunuyor.', 'info');
            } else if (addedCount === favoritesList.length) {
                showNotification('Tüm favori kanallarınız listeye eklendi.', 'success');
            } else {
                showNotification(`Listenizde olan kanallar dışında kalan ${addedCount} kanal listeye eklendi.`, 'success');
            }
        }
    );
}

function removeFavorite(channelUrl) {
    localStorage.removeItem(`favorite_${channelUrl}`);
    showNotification('Kanal favorilerden çıkarıldı.', 'info');
    addNotification('Favori Kanal Çıkarma', `Kanal favorilerden çıkarıldı.`);
    
    // Favori modalını güncelle
    if (currentFavoriteModal) {
        showFavorites();
    }

    // Kanal listesindeki tüm eşleşen kanalların favori ikonlarını güncelle
    const decodedUrl = decodeURIComponent(channelUrl);
    channels.forEach((channel, index) => {
        if (channel.channelUrl === decodedUrl) {
            const favoriteButton = document.querySelector(`.channel-card[data-id="${index}"] .favorite-button i`);
            if (favoriteButton) {
                favoriteButton.className = 'far fa-heart';
            }
        }
    });

    updateCounts(); // Favori sayısını güncelle
    updateChannelList(); // Kanal listesini güncelle
}

// Favori kanalları al
function getFavoriteChannels() {
    const favorites = [];
    const favoriteKeys = Object.keys(localStorage)
        .filter(key => key.startsWith('favorite_'));
    
    favoriteKeys.forEach(key => {
        try {
            const favoriteData = JSON.parse(localStorage.getItem(key));
            if (favoriteData && favoriteData.channelUrl && favoriteData.tvgName) {
                favorites.push(favoriteData);
            }
        } catch (error) {
            console.error('Favori kanal verisi okunamadı:', error);
            localStorage.removeItem(key); // Hatalı veriyi temizle
        }
    });
    
    return favorites;
}

// Favori ekleme/çıkarma işlevi
function toggleFavorite(channelIdentifier, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Find the channel using URL as identifier
    const channel = channels.find(ch => {
        const channelUrl = encodeURIComponent(ch.channelUrl);
        return channelUrl === channelIdentifier;
    });

    if (!channel) return; // Kanal bulunamadıysa işlem yapma
    
    // Use channel URL as the unique identifier
    const favoriteKey = `favorite_${encodeURIComponent(channel.channelUrl)}`;
    const isFavorite = localStorage.getItem(favoriteKey);
    
    if (isFavorite) {
        localStorage.removeItem(favoriteKey);
        showNotification('Kanal favorilerden çıkarıldı.', 'info');
        addNotification('Favori Kanal Çıkarma', `${channel.tvgName} favorilerden çıkarıldı.`);
    } else {
        const favoriteData = {
            ...channel,
            favoriteDate: new Date().toLocaleString()
        };
        localStorage.setItem(favoriteKey, JSON.stringify(favoriteData));
        showNotification('Kanal favorilere eklendi.', 'success');
        addNotification('Favori Kanal Ekleme', `${channel.tvgName} favorilere eklendi.`);
    }
    
    // Update the channel list while maintaining current page and filters
    updateChannelList(currentChannels, currentPage);
    
    // Eğer favori modalı açıksa, onu güncelle
    if (currentFavoriteModal) {
        showFavorites();
    }
}

// Sayfa yüklendiğinde event listener'ları ekle
document.addEventListener('DOMContentLoaded', function() {
    const favoritesButton = document.querySelector('.btn-favorites');
    if (favoritesButton) {
        favoritesButton.addEventListener('click', function() {
            console.log('Favoriler butonuna tıklandı'); // Debug için
            showFavorites();
        });
    } else {
        console.log('Favoriler butonu bulunamadı'); // Debug için
    }
});

function createListFromFavorites() {
    const favoriteChannels = getFavoriteChannels();
    // Yeni bir liste oluşturmak için bir modal açalım
    const modal = document.createElement('div');
    modal.className = 'modal create-list-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Favori Kanallardan Liste Oluştur</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Favori kanallardan yeni bir liste oluşturmak için aşağıdaki kanalları seçin:</p>
                <div class="favorite-channels-list">
                    ${favoriteChannels.map(channel => `
                        <div>
                            <input type="checkbox" id="${channel.tvgId}" />
                            <label for="${channel.tvgId}">${channel.tvgName}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-create-list">Liste Oluştur</button>
                <button class="btn-cancel">Kapat</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const createListBtn = modal.querySelector('.btn-create-list');

    closeBtn.onclick = () => modal.remove();
    cancelBtn.onclick = () => modal.remove();
    
    createListBtn.onclick = () => {
        const selectedChannels = favoriteChannels.filter(channel => {
            const checkbox = document.getElementById(channel.tvgId);
            return checkbox && checkbox.checked;
        });
        console.log('Seçilen Kanallar:', selectedChannels);
        modal.remove();
    };
}

function addSelectedFavoritesToCurrentList(selectedFavorites) {
    const currentList = getCurrentList(); // Mevcut listeyi al
    selectedFavorites.forEach(favorite => {
        if (!currentList.includes(favorite)) {
            currentList.push(favorite);
        }
    });
    updateCurrentList(currentList); // Mevcut listeyi güncelle
}

function addAllFavoritesToCurrentList() {
    const favoriteChannels = getFavoriteChannels();
    const currentList = getCurrentList();
    
    favoriteChannels.forEach(favorite => {
        if (!currentList.includes(favorite)) {
            currentList.push(favorite);
        }
    });
    updateCurrentList(currentList); // Mevcut listeyi güncelle
}

function removeAllFavorites() {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal confirmation-modal';
    confirmationModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Onay</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Tüm favori kanallarınızı silmek istediğinize emin misiniz?</p>
            </div>
            <div class="modal-footer">
                <button class="btn-confirm">Evet</button>
                <button class="btn-cancel">Hayır</button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmationModal);

    // Event Listeners
    const closeBtn = confirmationModal.querySelector('.close');
    const cancelBtn = confirmationModal.querySelector('.btn-cancel');
    const confirmBtn = confirmationModal.querySelector('.btn-confirm');

    const closeModal = () => {
        if (confirmationModal && confirmationModal.parentNode) {
            confirmationModal.remove();
        }
    };

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    confirmBtn.onclick = () => {
        // Get all favorite keys before clearing
        const favoriteKeys = Object.keys(localStorage).filter(key => key.startsWith('favorite_'));
        
        // Clear all favorites from localStorage
        favoriteKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Update favorite icons in the channel list
        const allFavoriteButtons = document.querySelectorAll('.favorite-button i');
        allFavoriteButtons.forEach(button => {
            button.className = 'far fa-heart';
        });
        
        showNotification('Tüm favori kanallar silindi.', 'success');
        
        // Close the confirmation modal first
        closeModal();
        
        // Then update the UI
        if (currentFavoriteModal) {
            showFavorites(); // Favori modalını yenile
        }
        
        updateCounts(); // Favori sayısını güncelle
        updateChannelList(); // Kanal listesini güncelle
    };
}

let favoriteGroups = {}; // Grupları saklamak için

function addGroup(groupName) {
    if (!favoriteGroups[groupName]) {
        favoriteGroups[groupName] = [];
    }
}

function addChannelToGroup(groupName, channel) {
    if (favoriteGroups[groupName]) {
        favoriteGroups[groupName].push(channel);
    }
}

function displayMostFavoritedChannels() {
    // Favori kanalları sayarak en çok eklenenleri bul
    // Bu kanalları listele
}

function exportFavorites() {
    const favorites = getFavoriteChannels();
    const json = JSON.stringify(favorites);
    // JSON'u bir dosya olarak indirin
}

function importFavorites(json) {
    const favorites = JSON.parse(json);
    favorites.forEach(favorite => {
        localStorage.setItem(`favorite_${favorite.tvgId}`, JSON.stringify(favorite));
    });
}

function filterFavorites(searchTerm) {
    const favoriteChannels = getFavoriteChannels();
    return favoriteChannels.filter(channel => channel.tvgName.includes(searchTerm));
}

function addNoteToFavorite(tvgId, note) {
    const favorite = JSON.parse(localStorage.getItem(`favorite_${tvgId}`));
    if (favorite) {
        favorite.note = note;
        localStorage.setItem(`favorite_${tvgId}`, JSON.stringify(favorite));
    }
}

function getCurrentList() {
    // Mevcut listeyi döndür
    return []; // Burada mevcut listeyi döndürmelisiniz
}

function showConfirmation(message, onConfirm) {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal confirmation-modal';

    confirmationModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Onay Gerekli</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn-confirm">Evet</button>
                <button class="btn-cancel">Hayır</button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmationModal);

    // Event Listeners
    confirmationModal.querySelector('.close').onclick = () => {
        confirmationModal.remove();
    };

    confirmationModal.querySelector('.btn-cancel').onclick = () => {
        confirmationModal.remove();
    };

    confirmationModal.querySelector('.btn-confirm').onclick = () => {
        onConfirm();
        confirmationModal.remove();
    };
}

function validateHeaderName(input) {
    const value = input.value.trim().toLowerCase();
    if (value && !value.startsWith('http-')) {
        input.value = 'http-' + value;
    }
    if (value && !value.match(/^http-[a-z0-9-]+$/)) {
        showNotification('Header adı "http-" ile başlamalıdır. Sadece küçük harf, rakam ve tire(-) içerebilir!', 'error');
        input.value = '';
        return false;
    }
    return true;
}

function addHeaderPair() {
    const container = document.querySelector('.http-headers-container');
    const headerPair = document.createElement('div');
    headerPair.className = 'header-pair';
    headerPair.innerHTML = `
        <input type="text" name="httpHeaderName[]" placeholder="http-..." class="header-name" onchange="validateHeaderName(this)">
        <input type="text" name="httpHeaderValue[]" placeholder="header değeri" class="header-value">
        <button type="button" class="btn-remove-header" onclick="removeHeaderPair(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(headerPair);
}

function removeHeaderPair(button) {
    button.closest('.header-pair').remove();
}