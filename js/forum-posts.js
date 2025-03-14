// Modal yapısını oluştur
function createForumPostsModal() {
    const modalHTML = `
        <div id="forumPostsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="header-top">
                        <h3><i class="fas fa-comments"></i> Forumdan Paylaşımlar</h3>
                    </div>
                    <div class="header-actions">
                        <button id="authorListBtn" class="author-list-btn">
                            <i class="fas fa-users"></i> Yazar Listesi
                        </button>
                        <div id="authorListDropdown" class="author-list-dropdown">
                            <!-- Yazarlar buraya dinamik olarak eklenecek -->
                        </div>
                    </div>
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
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">dehakan7</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Forumun en hızlı rütbe alanı. Paylaşım canavar ve müdavimi. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106889/?t=thread&c[content]=thread&c[users]=dehakan7&o=date" target="_blank" class="post-link">
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
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Baron66</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Çoklu liste ve uygulama paylaşımları. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106868/?t=thread&c[content]=thread&c[users]=Baron66&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Adnan K.</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Uygulama ve konu anlatımları sahibi. Forum moderatörü. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106866/?t=thread&c[content]=thread&c[users]=Adnan+K.&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">LAperdesi</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Uygulama ve konu anlatımları sahibi. Forum moderatörü. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106853/?t=thread&c[content]=thread&c[users]=LAperdesi&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">theperfectstrom</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Uygulama ve konu anlatımları sahibi. Çok cana yakın. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106865/?t=thread&c[content]=thread&c[users]=theperfectstrom&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">diziproo</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">1 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">💡Öneri Dizipro Guncelledi..</h5>
                            <p class="post-excerpt">UYGULMA GÜNCELEDİ..</p>
                            <a href="https://forum.sinetech.tr/konu/dizipro-guncelledi.1700/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">tekkan</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Çoklu liste ve uygulama paylaşımları. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106867/?t=thread&c[content]=thread&c[users]=tekkan&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">ycanerler</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Çoklu liste paylaşımları. Görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106853/?t=thread&c[content]=thread&c[users]=ycanerler&o=datee" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">burakhd</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">-</span>
                            </div>
                            <h5 class="post-title">💡Birden fazla konu sahibi</h5>
                            <p class="post-excerpt">Liste, uygulama, kullanım önerileri. Hepsini görmek için tıklayın.</p>
                            <a href="https://forum.sinetech.tr/arama/106852/?t=thread&c[content]=thread&c[users]=burakhd&o=date" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">pun</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">30 Kasım 2024</span>
                            </div>
                            <h5 class="post-title">💡YENI PUU TV GELDİ !!!</h5>
                            <p class="post-excerpt">Selam arkadaşlar yeni uygulama ekliyorum sadece canlı tv kanallari var...</p>
                            <a href="https://forum.sinetech.tr/konu/yeni-puu-tv-geldi.865/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">diziproo</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">06 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">💡KONFLİX Güncelledi.....</h5>
                            <p class="post-excerpt">Yavas yavaş icerikler gelir ..</p>
                            <a href="https://forum.sinetech.tr/konu/konflix-guncelledi.1814/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">umitM0D</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">19 Şubat 2025</span>
                            </div>
                            <h5 class="post-title">💡Öneri ÜMİT TV çıktı</h5>
                            <p class="post-excerpt">Merhaba dostlar yeni projem ile karşınızdayım. Baya Bi uğraştırdı ama yaptım.</p>
                            <a href="https://forum.sinetech.tr/konu/umit-tv-cikti.2837/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">cine10tv</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">18 Ocak 2025</span>
                            </div>
                            <h5 class="post-title">💡Öneri ❤️ CINE10 İPTV ❤️ | DESTEK İÇİN LÜTFEN OKUYUN</h5>
                            <p class="post-excerpt">GÜNCELLEME GELDİ : V-5.6,7 ÇIKKI</p>
                            <a href="https://forum.sinetech.tr/konu/cine10-iptv-destek-icin-lutfen-okuyun.2158/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">Knowking54</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">30 Aralık 2024</span>
                            </div>
                            <h5 class="post-title">💡Öneri Fan TV Yeni Uygulama</h5>
                            <p class="post-excerpt">Merhaba Sinetech Ailesi Fan TV Uygulamamız Farklı Bir Uygulamaya Geçiş Yaptı...</p>
                            <a href="https://forum.sinetech.tr/konu/fan-tv-yeni-uygulama.1658/" target="_blank" class="post-link">
                                <i class="fa-brands fa-wpforms"></i> Konuya Git
                            </a>
                        </div>
                        <div class="forum-post-item">
                            <div class="post-header">
                                <h4><i class="fas fa-user"></i> Yazar: <span class="author">parstv</span></h4>
                                <h4>Adres: <a href="https://forum.sinetech.tr/" target="_blank">Sinetech.tr</a></h4>
                                <span class="post-date">28 Kasım 2024</span>
                            </div>
                            <h5 class="post-title">💡Öneri ROKET TV</h5>
                            <p class="post-excerpt">spor şifresi soket iyi seyirler.. apk guncellendi</p>
                            <a href="https://forum.sinetech.tr/konu/roket-tv.815/" target="_blank" class="post-link">
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
    const authorListBtn = modal.querySelector('#authorListBtn');
    const authorListDropdown = modal.querySelector('#authorListDropdown');
    const forumPosts = modal.querySelectorAll('.forum-post-item');

    // Benzersiz yazarları topla ve listeyi oluştur
    const authors = new Set();
    forumPosts.forEach(post => {
        const author = post.querySelector('.author').textContent;
        authors.add(author);
    });

    // Yazar listesini oluştur
    authors.forEach(author => {
        const authorElement = document.createElement('div');
        authorElement.className = 'author-list-item';
        authorElement.textContent = author;
        authorElement.onclick = () => {
            // Seçilen yazara göre gönderileri filtrele
            forumPosts.forEach(post => {
                const postAuthor = post.querySelector('.author').textContent;
                post.style.display = postAuthor === author ? '' : 'none';
            });
            authorListDropdown.style.display = 'none';
        };
        authorListDropdown.appendChild(authorElement);
    });

    // Yazar listesi butonuna tıklama işlevi
    authorListBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        authorListDropdown.style.display = authorListDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Dropdown dışına tıklandığında kapat
    document.addEventListener('click', function(event) {
        if (!authorListBtn.contains(event.target) && !authorListDropdown.contains(event.target)) {
            authorListDropdown.style.display = 'none';
        }
    });



    // Kapatma düğmesi işlevi
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        // Filtreyi sıfırla
        authorFilter.value = '';
        forumPosts.forEach(post => post.style.display = '');
    }

    // Modal dışına tıklama ile kapatma
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            // Filtreyi sıfırla
            authorFilter.value = '';
            forumPosts.forEach(post => post.style.display = '');
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
