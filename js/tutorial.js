// Tutorial steps configuration with mascot
const tutorialSteps = [
    {
        title: "M3U Düzenleyiciye Hoş Geldiniz",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Merhaba! Ben Latte, size M3U listesi oluşturmayı ve düzenlemeyi adım adım göstereceğim.</p>
                    <p>Şu anda bir liste açık değilse daha iyi anlayabilmek için lütfen sağ alttaki <b>Hızlı Liste</b> butonuyla hazır bir liste yükleyin ve başlamak için 'Sonraki' butonuna tıklayın.</p>
                </div>
            </div>
        `,
        element: null
    },
    {
        title: "Liste Oluşturma",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Yeni bir M3U listesi oluşturmak için 'Liste Oluştur' butonunu kullanabilirsiniz. Size üç seçenek sunuyorum:</p>
                    <ul>
                        <li>Sıfırdan yeni bir liste oluşturma</li>
                        <li>Var olan bir M3U dosyasını yükleme</li>
                        <li>URL üzerinden liste içe aktarma</li>
                    </ul>
                    <p>Başlamak için en kolay yol, sağ alttaki 'Hızlı Liste' butonunu kullanmaktır!</p>
                </div>
            </div>
        `,
        element: ".action-card.yeni-olustur",
        position: "bottom"
    },
    {
        title: "Liste Yükleme ve İçe Aktarma",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Var olan listeleri kolayca içe aktarabilirsiniz! Size iki pratik seçenek sunuyorum:</p>
                    <ul>
                        <li>'Dosyadan Yükle': Bilgisayarınızdaki M3U dosyalarını açar</li>
                        <li>'URL ile Yükle': İnternet üzerindeki M3U listelerini direkt olarak içe aktarır</li>
                    </ul>
                    <p>İpucu: URL ile yükleme yaparken, bağlantının doğrudan M3U dosyasına yönlendiğinden emin olun!</p>
                </div>
            </div>
        `,
        element: ".action-card.load-options",
        position: "bottom"
    },
    {
        title: "Kanal Ekleme",
        content: "Yeni bir kanal eklemek için 'Yeni Kanal' butonunu kullanın. Buradan kanal adı, logo, grup ve stream URL'si gibi bilgileri girebilirsiniz.",
        element: ".btn-add",
        position: "left"
    },
    {
        title: "Kanal Kartı İşlemleri",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Her kanal kartında beş temel işlem bulunur. Size bunları tek tek anlatayım:</p>
                    <ul>
                        <li><b>Sıralama:</b> Kanalları kartlar üzerindeki oklarla istediğiniz sıraya dizebilirsiniz. Bu özellik sayesinde M3U dosyasını manuel düzenlemeye gerek kalmadan sıralamaları değiştirebilirsiniz.</li>
                        <li><b>Oynatma:</b> Kanalı hemen test edebilirsiniz.</li>
                        <li><b>Düzenleme:</b> Kanal bilgilerini güncelleyebilirsiniz.</li>
                        <li><b>Silme:</b> Kanalı listeden kaldırabilirsiniz.</li>
                        <li><b>Favoriler:</b> Sık kullandığınız kanalları favorilere ekleyebilirsiniz.</li>
                    </ul>
                    <p>İpucu: Sıralama değişiklikleriniz, listeyi kaydettiğinizde otomatik olarak uygulanır!</p>
                    <p>İpucu: Kanala ait logonuz yoksa veya bulumadıysanız otomatik bir logo görseli tanımlarım.\nEğer kanal adı düzgün yazıldıysa logo url'si yanındaki öneriler <i class="fas fa-lightbulb has-suggestions" style="color: var(--primary);text-shadow: 0 0 10px rgba(46, 204, 113, 0.6);"></i> sembolü renkli şekilde sallanıyorsa orada size kesin çözümlerim var demektir ;)</p>
                </div>
            </div>
        `,
        element: ".channel-grid",
        position: "bottom"
    },
    {
        title: "Favoriler",
        content: "Bir kanalı favorilere eklemek ve istediğiniz zaman kullanabilmek için kanal kartındaki kalp ikonuna tıklayın.\n Favoriler listesine hızlı erişim için üst menüdeki Favoriler butonunu kullanabilirsiniz.<br/>İpucu: Favorilerinize farklı listelerden farklı kanallar ekleyebilirsiniz. Buradaki amaç başka bir listedeki kanalı mevcut listenize ya da farklı bir listeye ekleyebilmek için basit bir editör düzenlemesi yerine direkt olarak ekleyebilmektir. Eklenen her kanal isim, kategori ve zaman bilgisiyle eklenir. <br/>İpucu: Favoriler kartı içerisindeki kanalları tek tek ya da tümünü ekle ile mevcut listenize ekleyebilirsiniz. Aynı şekilde kaldırabilrisiniz de! Eğer benzer bilgilerle aynı kanallar varsa onları eklemeyecek ve sizi bilgilendirme ile uyaracağız.<br/><b><u>Yeni başlayanlar için bilgi:</b></u> Sitedeki birçok özellik gibi bu favoriler özelliği normal bir m3u düzenlemesinde yoktur. Sadece siteyi hazırlarken işleri kolaylaştırma amacıyla proje ettiğim bir özelliktir.",
        element: ".btn-favorites",
        position: "bottom"
    },
    {
        title: "Kanal Filtreleme ve Sıralama",
        content: "Kanallarınızı gruplara göre filtreleyebilir ve farklı kriterlere göre sıralayabilirsiniz.\n<p>İpucu: Favori kanallar eklediyseniz başa alarak sıralayabilirsiniz.</p>",
        element: ".filter-container",
        position: "bottom"
    },
    {
        title: "Kanal Grupları",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Kanal Grupları' sekmesinden kanallarınızı gruplar halinde görüntüleyebilir ve yönetebilirsiniz.</p>
                    <ul>
                        <li>Kanal grupları sayesinde kanalları kategorilere ayırabilir ve daha düzenli bir görünüm elde edebilirsiniz.</li>
                        <li><b>Düzenleme:</b> Kanal grubu kartları üzerinden isim değiştirebilir.</li>
                        <li>Grupları silip kanalları tamamen silebilir ya da saklayabilirsiniz.</li>
                        <p><img src="images/gruplari-sil.png" style="width: 350px; height: auto;"></img></p>
                    </ul>
                </div>
            </div>
        `,
        element: "#groupHeader",
        position: "bottom"
    },
    {
        title: "İstatistikler",
        content: "İstatistikler bölümünde liste hakkında detaylı bilgileri görebilirsiniz: toplam kanal sayısı, grup sayısı, en çok ve en az kanala sahip gruplar ile birlikte grubu olmayan kanal sayısını da görebilirsiniz.",
        element: "h2:has(i.fas.fa-chart-bar)",
        position: "bottom"
    },
    {
        title: "Metin Editörü",
        content: "Gelişmiş düzenlemeler için 'Metin Editörü'nü kullanabilirsiniz. Burada M3U dosyanızı doğrudan düzenleyebilirsiniz.<br /><br/><b>Dikkat:</b>5000 kanaldan fazla listeler için metin editörünü kullanmamanızı tavsiye ederim. \n<p>Normal arayüz fazlasıyla işinizi görecektir.</p>\n<p>İpucu: Metin Editörü içerisindeki diğer yardımcıyla editör ile kod yazarak nasıl m3u listesi hazırlayacağınızı da öğrenebilirsiniz.</p>\n<p>İpucu: Eğer bir liste yüklediyseniz ve kanallar sıralandıysa fakat 'Sayfa yenilensin mi' uyarısı geliyorsa ekrana iptal tuşuna basın. Sebebi düzensiz bir liste yüklediğiniz içindir.</p>\n<p>İptal edip metin editörüne girdiğinizde listenizi çoktan temizleyip düzelttiğimi görebilirsiniz;)</p>",
        element: "[data-action='edit']",
        position: "bottom"
    },
    {
        title: "Kaydetme",
        content: "Yaptığınız değişiklikleri kaydetmek için 'Kaydet' butonunu kullanın. Listenizi .m3u formatında bilgisayarınıza kaydedebilirsiniz.\n<p>İpucu: .txt veya .m3u formatında dosyalardan liste yüklemiş de olsanız kaydederken .m3u olarak kaydededilip bilgisayarınıza o şekilde inecektir.</p>",
        element: "[data-action='save']",
        position: "bottom"
    },
    {
        title: "Üst Bar İşlemleri",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Üst bardaki önemli butonları size tanıtayım:</p>
                    <ul>
                        <li><b>Sesli Arama:</b> Sitedeki temel işlemleri sesle kontrol ederek yapabilirsiniz.</li>
                        <p>Bir sonraki panelde ne işe yaradığını öğreneceksiniz.</p>    
                        <li><b>İşlem Geçmişi:</b> Yaptığınız tüm değişiklikleri görüntüleyebilirsiniz.</li>
                        <li><b>Tema Değiştirici:</b> Açık/koyu tema arasında geçiş yapabilirsiniz.</li>
                        <p>Ay ve Güneş simgeleriyle seçtiğiniz tema siz değiştirene kadar değişmez.</p>
                        <li><b>Bildirimler:</b> Önemli güncellemeleri ve bildirimleri takip edebilirsiniz.</li>
                        <p>Yaptığınız işlemler gözünüzden kaçmasın diye bildirim olarak da sağ üstte görünürler.</p>
                    </ul>
                </div>
            </div>
        `,
        element: ".btn-history",
        position: "bottom"
    },
    {
        title: "Sesli Asistan",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Sesli komutlar ile işlerinizi daha hızlı halledebilirsiniz! İşte bazı örnekler:</p>
                    <ul>
                        <li>"Yeni liste, kanal ekle, dosya yükle"</li>
                        <li>"Url yükle, düzenle, indir"</li>
                        <li>"Favoriler, tema değiştir"</li>
                        <li>"Kanal ara [kanal adı] ya da kanal grubu ara."</li>
                        <p>İpucu: İki adet mikrofon vardır. Arama alanındaki mikrofona basıp kanal ya da grup adını söylemeniz yeterli;)</p>
                    </ul>
                    <p>Mikrofon butonuna tıklayarak sesli komutları kullanmaya başlayabilirsiniz!</p>
                    <p>Sesli işlemler yapılıyorken veya sona erdiğinde sayfa altında bildirim görürsünüz.</p>
                </div>
            </div>
        `,
        element: ".voice-command-button",
        position: "bottom"
    },
    {
        title: "Sol Menü Özellikleri",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Sol menüde bulunan özellikler:</p>
                    <ul>
                        <li><b>Special One:</b></li> 
                        <p>patr0n kardeşimizin neredeyse günlük paylaşığı listeleri bulabilir,</p>
                        geliştirip forumda paylaştığı uygulamalara ulaşabilirsiniz.
                        <li><b>Forum Spesiyal:</b></li>
                        <p>Sinetech.tr forumundaki arkadaşlarımızın faydalı konu ve paylaşımlarına ulaşabilirsiniz.</p>
                        <li><b>Latte'nin Araçları:</b> Çok uğraştım bunlar için ;))</li> 
                        m3u/m3u8 bağlantı ve detay için link kontrolü yapabilir,
                        sitemdeki dahili veya proxy video oynatıcısı ile vidoeları oynatabilir,
                        forumda listelerini sürekli güncelleyen arkadaşlarımızın listelerine erişebilir,
                        benim sadece logolar için yaptığım ya da open-egg'in kanal bilgileri için sunduğu EPG adreslerine erişebilirsiniz.
                        <li><b>Alt kısım:</b> forumda çevrimiçiysem menünün altındaki Latte'nin üstünde yeşil yanar ;)</li>
                    </ul>
                </div>
            </div>
        `,
        element: ".sidebar",
        position: "right"
    },
    {
        title: "Tebrikler!",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/maskot.png" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Harika! Artık neredeyse web uygulamamın tüm özelliklerini öğrendiniz. Kendi M3U listenizi oluşturmaya ve düzenlemeye hazırsınız!</p>
                    <p>İhtiyaç duyduğunuzda bu eğitimi tekrar görüntüleyebilirsiniz. Forumdan bana ulaşmaya çekinmeyin.</p>
                </div>
            </div>
        `,
        element: null
    }
];

let currentStep = 0;
let tutorialActive = false;

function startTutorial() {
    tutorialActive = true;
    currentStep = 0;
    const overlay = document.querySelector('.tutorial-overlay');
    const tutorialBox = document.querySelector('.tutorial-box');
    
    if (overlay && tutorialBox) {
        overlay.style.display = 'block';
        tutorialBox.style.display = 'block';
        updateTutorialProgress();
        showCurrentStep();
    }
}

function updateTutorialProgress() {
    const progressContainer = document.querySelector('.tutorial-progress');
    progressContainer.innerHTML = '';
    
    tutorialSteps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `tutorial-dot ${index === currentStep ? 'active' : ''}`;
        progressContainer.appendChild(dot);
    });
}

function showCurrentStep() {
    const step = tutorialSteps[currentStep];
    const tutorialBox = document.querySelector('.tutorial-box');
    const content = tutorialBox.querySelector('.tutorial-content');
    const prevBtn = tutorialBox.querySelector('.prev');
    const nextBtn = tutorialBox.querySelector('.next');

    // Remove previous highlight
    const previousHighlight = document.querySelector('.tutorial-highlight');
    if (previousHighlight) {
        previousHighlight.classList.remove('tutorial-highlight');
    }

    // Update content
    content.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.content}</p>
    `;

    // Update buttons
    prevBtn.style.display = currentStep === 0 ? 'none' : 'block';
    nextBtn.textContent = currentStep === tutorialSteps.length - 1 ? 'Bitir' : 'Sonraki';

    // Highlight current element if exists
    if (step.element) {
        const element = document.querySelector(step.element);
        if (element) {
            element.classList.add('tutorial-highlight');
            positionTutorialBox(element, step.position);
        }
    } else {
        // Center the tutorial box if no element to highlight
        tutorialBox.style.top = '50%';
        tutorialBox.style.left = '50%';
        tutorialBox.style.transform = 'translate(-50%, -50%)';
    }

    updateTutorialProgress();
}

function positionTutorialBox(element, position) {
    const tutorialBox = document.querySelector('.tutorial-box');
    const elementRect = element.getBoundingClientRect();
    const boxRect = tutorialBox.getBoundingClientRect();
    const margin = 20; // Margin between element and tutorial box

    let top, left;

    switch (position) {
        case 'top':
            top = elementRect.top - boxRect.height - margin;
            left = elementRect.left + (elementRect.width - boxRect.width) / 2;
            break;
        case 'bottom':
            top = elementRect.bottom + margin;
            left = elementRect.left + (elementRect.width - boxRect.width) / 2;
            break;
        case 'left':
            top = elementRect.top + (elementRect.height - boxRect.height) / 2;
            left = elementRect.left - boxRect.width - margin;
            break;
        case 'right':
            top = elementRect.top + (elementRect.height - boxRect.height) / 2;
            left = elementRect.right + margin;
            break;
        default:
            top = elementRect.bottom + margin;
            left = elementRect.left + (elementRect.width - boxRect.width) / 2;
    }

    // Ensure the box stays within viewport
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    top = Math.max(margin, Math.min(viewport.height - boxRect.height - margin, top));
    left = Math.max(margin, Math.min(viewport.width - boxRect.width - margin, left));

    tutorialBox.style.top = `${top}px`;
    tutorialBox.style.left = `${left}px`;
    tutorialBox.style.transform = 'none';
}

function nextStep() {
    if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        showCurrentStep();
    } else {
        endTutorial();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showCurrentStep();
    }
}

function endTutorial() {
    tutorialActive = false;
    document.querySelector('.tutorial-overlay').style.display = 'none';
    document.querySelector('.tutorial-box').style.display = 'none';
    const highlightedElement = document.querySelector('.tutorial-highlight');
    if (highlightedElement) {
        highlightedElement.classList.remove('tutorial-highlight');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.querySelector('.tutorial-btn.next');
    const prevBtn = document.querySelector('.tutorial-btn.prev');
    const skipBtn = document.querySelector('.tutorial-skip');

    if (nextBtn) nextBtn.addEventListener('click', nextStep);
    if (prevBtn) prevBtn.addEventListener('click', previousStep);
    if (skipBtn) skipBtn.addEventListener('click', endTutorial);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (tutorialActive) {
            showCurrentStep();
        }
    });
});