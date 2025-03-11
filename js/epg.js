// EPG List data
const epgList = [
    {
        name: 'Türkiye EPG (Kanal Logoları) - Kendi hazırladığım kanal logoları için olan EPG listesi',
        url: 'https://gitlatte.github.io/m3ueditor/epg-listeleri/turkey.xml',
        icon: 'fas fa-images'
    },
    {
        name: 'Türkiye EPG 1 (146 kanal)',
        url: 'https://www.open-epg.com/files/turkey1.xml',
        icon: 'fas fa-external-link-alt'
    },
    {
        name: 'Türkiye EPG 2 (149 kanal)',
        url: 'https://www.open-epg.com/files/turkey2.xml',
        icon: 'fas fa-external-link-alt'
    },
    {
        name: 'Türkiye EPG 3 (144 kanal)',
        url: 'https://www.open-epg.com/files/turkey3.xml',
        icon: 'fas fa-external-link-alt'
    },
    {
        name: 'Türkiye EPG 4 (172 kanal)',
        url: 'https://www.open-epg.com/files/turkey4.xml',
        icon: 'fas fa-external-link-alt'
    }
];

// Show EPG list modal
function showEpgList() {
    const epgListContent = epgList.map(epg => `
        <div class="epg-list-item" onclick="copyEpgUrl('${epg.url}')" title="Tıklayarak EPG URL'sini kopyalayın">
            <i class="${epg.icon}"></i>
            <span>${epg.name}</span>
        </div>
    `).join('');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-tv"></i> EPG Listeleri</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="epg-list">
                    ${epgListContent}
                </div>
                <div class="epg-help">
                    <button class="btn-help" onclick="showEpgInstructions()">
                        <i class="fas fa-question-circle"></i> Nasıl Eklenir?
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();

    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Copy EPG URL to clipboard and format it for M3U
function copyEpgUrl(url) {
    const epgAttribute = `x-tvg-url="${url}"`;
    navigator.clipboard.writeText(epgAttribute).then(() => {
        showNotification('EPG URL kopyalandı! Metin Editörü\'nde #EXTM3U satırının yanına bir boşluk bırakarak yapıştırabilirsiniz.', 'success');
    }).catch(err => {
        showNotification('EPG URL kopyalanırken bir hata oluştu.', 'error');
        console.error('EPG URL kopyalama hatası:', err);
    });
}

// Show EPG integration instructions
function showEpgInstructions() {
    const instructions = `
        <div class="epg-instructions">
            <h3>EPG (Elektronik Program Rehberi) Nasıl Eklenir?</h3>
            <ol>
                <p>EPG yani kanal rehberi, kanalın yayınladığı programları içeren bir dosyadır.\n Doğru kanal adları ve id'leri ekliyse uygulama ekranında kanal fihristini görebilirsiniz.
                Eklemek için:</p>
                <li>EPG Listeleri menüsünden istediğiniz EPG listesine tıklayın.</li>
                <li>EPG URL'si otomatik olarak kopyalanacaktır.</li>
                <li>"Metin Editörü" butonuna tıklayarak editörü açın.</li>
                <li>Kopyalanan EPG URL'sini #EXTM3U satırının yanına bir boşluk bırakarak yapıştırın.</li>
                <li>Örnek: #EXTM3U x-tvg-url="https://..."</li>
                <li>Editör üzerindeki "Kaydet" butonuna basın.</li>
            </ol>
            <p><strong>Not:</strong> EPG entegrasyonu sonrası IPTV oynatıcınızda program rehberi görünür olacaktır.</p>
        </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-question-circle"></i> EPG Rehberi</h3>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                ${instructions}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    
    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}
