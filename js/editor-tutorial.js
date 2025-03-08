// Editor Tutorial Configuration
const editorTutorialSteps = [
    {
        title: "M3U Dosya Yapısı",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/ogretici.gif" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text typing-demo">
                    <p>M3U dosyası basit bir metin dosyasıdır ve belirli bir yapıya sahiptir:</p>
                    <pre>1. #EXTM3U
2. #EXTINF:-1 tvg-name="" tvg-id="" tvg-logo="" group-title="",Kanal Adı
3. Kanal URL Adresi'si
2. #EXTINF:-1 tvg-name="" tvg-id="" tvg-logo="" group-title="",Kanal Adı2
3. Kanal URL Adresi'si</pre>
                </div>
            </div>
        `
    },
    {
        title: "Temel Etiketler",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/ogretici.gif" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Her M3U dosyası #EXTM3U ile başlar ve şu etiketleri içerir:</p>
                    <ul>
                        <li><code>tvg-name</code>: Kanal adı</li>
                        <li><code>tvg-id</code>: Kanal kimliği (EPG için)</li>
                        <li><code>tvg-logo</code>: Kanal logosu URL'si</li>
                        <li><code>group-title</code>: Kanal grubu</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Otomatik Tamamlama",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/ogretici.gif" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Editörde '#' veya 'tvg-' yazmaya başladığınızda otomatik öneriler görünecektir. Bu öneriler:</p>
                    <ul>
                        <li>Kanal bilgisi ekleme</li>
                        <li>EPG URL'si ekleme</li>
                        <li>HTTP referrer ve user-agent ayarlama</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Sözdizimi Vurgulama",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/ogretici.gif" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>Editör, M3U sözdizimini renklendirir:</p>
                    <ul>
                        <li>Mavi: Ana etiketler (#EXTM3U, #EXTINF)</li>
                        <li>Gri: Özellik isimleri (tvg-name, group-title)</li>
                        <li>Turuncu: URL'ler ve değerler</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Doğrulama ve Hata Kontrolü",
        content: `
            <div class="tutorial-content-wrapper">
                <img src="images/ogretici.gif" alt="Latte Maskot" class="tutorial-mascot">
                <div class="tutorial-text">
                    <p>'Doğrula' butonunu kullanarak listenizi kontrol edebilirsiniz:</p>
                    <ul>
                        <li>Eksik veya hatalı etiketler</li>
                        <li>URL formatı kontrolleri</li>
                        <li>Kanal adı ve grup uyumlulukları</li>
                    </ul>
                </div>
            </div>
        `
    }
];

function showEditorTutorial() {
    let currentStep = 0;
    
    const modal = document.createElement('div');
    modal.className = 'modal tutorial-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>M3U Liste Yazma Rehberi</h3> <button class="show-example-btn">Örnek Göster ve Bitir</button>
                <button class="close" onclick="closeEditorTutorial()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="tutorial-content"></div>
                <div class="tutorial-navigation">
                    <button class="prev-btn" ${currentStep === 0 ? 'disabled' : ''}>Önceki</button>
                    <div class="tutorial-progress"></div>
                    <button class="next-btn">Sonraki</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    updateTutorialContent();
    updateProgressDots();

    function updateTutorialContent() {
        const step = editorTutorialSteps[currentStep];
        const content = modal.querySelector('.tutorial-content');
        content.innerHTML = `
            <h4>${step.title}</h4>
            ${step.content}
        `;

        const prevBtn = modal.querySelector('.prev-btn');
        const nextBtn = modal.querySelector('.next-btn');
        
        prevBtn.disabled = currentStep === 0;
        nextBtn.textContent = currentStep === editorTutorialSteps.length - 1 ? 'Bitir' : 'Sonraki';
    }

    function updateProgressDots() {
        const progress = modal.querySelector('.tutorial-progress');
        progress.innerHTML = editorTutorialSteps.map((_, index) => 
            `<span class="progress-dot ${index === currentStep ? 'active' : ''}"></span>`
        ).join('');
    }

    function showExample() {
        if (window.currentEditor) {
            const exampleContent = `#EXTM3U
#EXTINF:-1 tvg-name="TRT 1" tvg-id="trt1.tr" tvg-logo="images/kanal-gorselleri/turkiye/trt-1-tr.png" group-title="Ulusal",TRT 1
http://example.com/live/trt1.m3u8`;
            window.currentEditor.setValue(exampleContent);
        }
        closeEditorTutorial();
    }

    modal.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateTutorialContent();
            updateProgressDots();
        }
    });

    modal.querySelector('.next-btn').addEventListener('click', () => {
        if (currentStep < editorTutorialSteps.length - 1) {
            currentStep++;
            updateTutorialContent();
            updateProgressDots();
        } else {
            closeEditorTutorial();
        }
    });

    modal.querySelector('.show-example-btn').addEventListener('click', showExample);
}

function closeEditorTutorial() {
    const modal = document.querySelector('.tutorial-modal');
    if (modal) {
        modal.remove();
    }
}