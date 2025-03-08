document.addEventListener('DOMContentLoaded', () => {
    const voiceCommandBtn = document.querySelector('.btn-voice-command');
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'voice-tooltip';
    
    // Create tooltip content
    const tooltipContent = `
        <div class="voice-tooltip-header">
            <img src="images/sesli-asistan.svg" alt="Sesli Asistan">
            <span>Merhaba ben Latte</span>
        </div>
        <div class="voice-tooltip-content">
            <span>İşlemlerinizi konuşarak da yapababilirsiniz.</span>
            <span>Simgeye tıklayın ya da CTRL+K sonrası konuşun.</span><br/>
            <span>Yapabileceğiniz işlemler:</span>
            <ul class="voice-commands-list">
                <li title="Bilgisardaki dosyanızı açın"><i class="fas fa-microphone"></i>"Dosya yükle"</li>
                <li title="URL adresi ile liste yükleyin"><i class="fas fa-microphone"></i>"URL yükle"</li>
                <li title="Yeni liste oluşturun"><i class="fas fa-microphone"></i>"Yeni liste"</li>
                <li title="Yeni kanal ekleyin"><i class="fas fa-microphone"></i>"Kanal Ekle"</li>
                <li title="Elle düzenleme yapın"><i class="fas fa-microphone"></i>"Editör"</li>
                <li title="Aktif listeyi indirin"><i class="fas fa-microphone"></i>"İndir"</li>
                <li title="Favori kanallarınızı görün"><i class="fas fa-microphone"></i>"Favoriler"</li>
                <li title="Temayı değiştirin. Açık/Koyu"><i class="fas fa-microphone"></i>"Tema"</li>
            </ul>
        </div>
    `;
    
    tooltip.innerHTML = tooltipContent;
    
    // Add tooltip to voice command button
    voiceCommandBtn.appendChild(tooltip);
});
