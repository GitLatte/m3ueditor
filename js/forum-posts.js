// Modal yapısını oluştur
function createForumPostsModal() {
    const modalHTML = `
        <div id="forumPostsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-comments"></i> Forumdan Paylaşımlar</h3>
                    <button class="close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="forum-posts-list">
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">3 Şubat 2025</span>
                            </div>
                            <h5 class="post-title">🌐 Modemine USB Bellek Tak Kendi Yerel Bulut Sunucunu Kullan 🗄️</h5>
                            <p class="post-excerpt">...evinizdeki modem/router üzerinde bir USB bağlantı noktası varsa elinizdeki...</p>
                            <a href="https://forum.sinetech.tr/konu/modemine-usb-bellek-tak-kendi-yerel-bulut-sunucunu-kullan.2493/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">26 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">📺 Sadece Telefonuna Kur ve Cihazına Uygulama Yükle/Sil/Aktar ve Kontrol Et</h5>
                            <p class="post-excerpt">Bir kaç gün öncesinde dosya yöneticisi uygulaması ile nasıl ...</p>
                            <a href="https://forum.sinetech.tr/konu/sadece-telefonuna-kur-ve-cihazina-uygulama-yukle-sil-aktar-ve-kontrol-et.2340/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">18 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">Cihazlar Arası Dosya Paylaşımı Yöntemlerine Örnek</h5>
                            <p class="post-excerpt">Birçok kişi android telefon, tablet veya bilgisayarları ile android box cihazlarına erişip ...</p>
                            <a href="https://forum.sinetech.tr/konu/cihazlar-arasi-dosya-paylasimi-yontemlerine-ornek.2144/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">7 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">CloudStream ile M3U Listesi Kullanma</h5>
                            <p class="post-excerpt">CloudStream uygulamasıyla bir web hosting içerisinde yer alan...</p>
                            <a href="https://forum.sinetech.tr/konu/cloudstream-ile-m3u-listesi-kullanma.1850/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">6 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">EPG (TV Rehberi) Listeleri Hakkında</h5>
                            <p class="post-excerpt">...televizyon kanalları için de birer tv rehberi mevcut olabiliyor.</p>
                            <a href="https://forum.sinetech.tr/konu/epg-tv-rehberi-listeleri-hakkinda.1795/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">24 Aralık 2024</span>
                            </div>
                            <h5 class="post-title">Kendi M3U listesini hazırlayan veya hazırlamak isteyenlere özel bilgiler</h5>
                            <p class="post-excerpt">Forumdaki dostlarımız sayesinde veya başka yerlerden bularak kullandığımız pek çok...</p>
                            <a href="https://forum.sinetech.tr/konu/kendi-m3u-listesini-hazirlayan-veya-hazirlamak-isteyenlere-ozel-bilgiler.1433/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">7 Kasım 2024</span>
                            </div>
                            <h5 class="post-title">HDMI CEC Nedir, Nasıl Kullanılır - Kısa Anlatım</h5>
                            <p class="post-excerpt">Bu özellik kısaca hem televizyonunuzu hem de android tv box cihazınızı tek kumanda ile kontol etmenize yarıyor.</p>
                            <a href="https://forum.sinetech.tr/konu/hdmi-cec-nedir-nasil-kullanilir-kisa-anlatim.415/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Latte</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">7 Aralık 2024</span>
                            </div>
                            <h5 class="post-title">M3u Dosyasını Google Drive/OneDrive ile Kullanabilme</h5>
                            <p class="post-excerpt">Google Drive adresinize yükleyerek URL adresi şeklinde kullanabileceğiniz yöntemi anlatacağım.</p>
                            <a href="https://forum.sinetech.tr/konu/m3u-dosyasini-google-drive-onedrive-ile-kullanabilme.1008/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Modal'ı sayfaya ekle
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Modal işlevselliğini ekle
    const modal = document.getElementById('forumPostsModal');
    const closeBtn = modal.querySelector('.close');

    // Kapatma düğmesi işlevi
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Modal dışına tıklama ile kapatma
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Modal'ı aç
function openForumPosts() {
    const modal = document.getElementById('forumPostsModal');
    if (!modal) {
        createForumPostsModal();
        const newModal = document.getElementById('forumPostsModal');
        newModal.style.display = 'block';
    } else {
        modal.style.display = 'block';
    }
}