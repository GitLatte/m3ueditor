// Modal yapısını oluştur
function createPatronAppsModal() {
    const modalHTML = `
        <div id="patronAppsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-rocket"></i> patr0n Uygulamaları</h3>
                    <button class="close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="apps-list">
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> - Güncellendi - M3u Multi Panel Combo Tarayıcı v1.9 - Alfa</h4>
                            <p>...geliştirmiş olduğum bir program şu an beta aşamasında...</p>
                            <a href="https://forum.sinetech.tr/konu/guncellendi-m3u-multi-panel-combo-tarayici-v1-9-alfa.2629/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> __Combo Tools v1.3</h4>
                            <p>...bu programın amacı dün paylaşmış olduğum m3u kombo tarama...</p>
                            <a href="https://forum.sinetech.tr/konu/__combo-tools-v1-3.2563/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> M3u Kombo Tarama Programı</h4>
                            <p>M3u link taraması nasıl yapılır ? :) İlk olarak...</p>
                            <a href="https://forum.sinetech.tr/konu/m3u-kombo-tarama-programi.2495/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> DeepTv Pro Tarafımca Modlanmıştır</h4>
                            <p>...başlıktan görüldüğü üzere deeptv pro tarafımca modlandı.</p>
                            <a href="https://forum.sinetech.tr/konu/deeptv-pro-tarafimca-modlanmistir.1898/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> Warp (1.1.1.1) Tarafımca Modlanmıştır</h4>
                            <p>Uygulama tarafımca modlanmış olup ...</p>
                            <a href="https://forum.sinetech.tr/konu/warp-1-1-1-1-tarafimca-modlanmistir.1887/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> Bilgin Tv Tarafımca Modlanmıştır</h4>
                            <p>...bilgin tv yenilenecekmiş yenilenene kadar bilgin tv uygulamasını kullanmak isteyen...</p>
                            <a href="https://forum.sinetech.tr/konu/bilgin-tv-tarafimca-modlanmistir.1411/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> V1.2.0_Gpik Tv Tarafımca Modlanmıştır</h4>
                            <p>Uygulamayı dünden beri kullanıyorum hoşuma gitti  ...</p>
                            <a href="https://forum.sinetech.tr/konu/v1-2-0_gpik-tv-tarafimca-modlanmistir.1263/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> Dns Changer</h4>
                            <p>DNS değiştirme programım vardı bugün ihtiyacım olduğu için ...</p>
                            <a href="https://forum.sinetech.tr/konu/dns-changer.1087/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> Wifi_Reveal</h4>
                            <p>Bilgisayarda kayıtlı wifi şifrelerini görmenize yarıyor qr kodu vs ...</p>
                            <a href="https://forum.sinetech.tr/konu/wifi_reveal.941/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> patr0n | IpTv Tools Beta Yayında</h4>
                            <p>IpTv Tools uygulamamı beta olarak burada paylaşıyorum...</p>
                            <a href="https://forum.sinetech.tr/konu/patr0n-iptv-tools-beta-yayinda.597/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> patr0n | BasicTools v0.8</h4>
                            <p>IpTv Tools adlı programımın basit hali gibi düşünebilir...</p>
                            <a href="https://forum.sinetech.tr/konu/patr0n-basictools-v0-8.523/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
                            </a>
                        </div>
                        <div class="app-item">
                            <h4><i class="fa-brands fa-wpforms"></i> Güncellendi - Sinewix Film - Dizi Uygulaması</h4>
                            <p>Uygulama tarafımca tekrar modlanmıştır son sürüme güncellenmiştir.</p>
                            <a href="https://forum.sinetech.tr/konu/guncellendi-sinewix-film-dizi-uygulamasi.399/" target="_blank" class="app-link">
                                <i class="fas fa-external-link-alt"></i> Forumda Gör  (Sinetech.tr)
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
    const modal = document.getElementById('patronAppsModal');
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
function openPatronApps() {
    const modal = document.getElementById('patronAppsModal');
    if (!modal) {
        createPatronAppsModal();
        const newModal = document.getElementById('patronAppsModal');
        newModal.style.display = 'block';
    } else {
        modal.style.display = 'block';
    }
}