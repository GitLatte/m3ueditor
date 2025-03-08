// Voice Command Handler for M3U Web Designer

class VoiceCommandHandler {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.activeSearchInput = null;
        this.commands = {
            'kanal ekle': () => document.querySelector('[data-action="add"]').click(),
            'yeni liste': () => document.querySelector('[data-action="new"]').click(),
            'dosya yükle': () => document.querySelector('[data-action="loadFile"]').click(),
            'url yükle': () => document.querySelector('[data-action="loadUrl"]').click(),
            'indir': () => document.querySelector('[data-action="save"]').click(),
            'editör': () => document.querySelector('[data-action="edit"]').click(),
            'favoriler': () => document.querySelector('.btn-favorites').click(),
            'tema': () => document.querySelector('[data-action="theme"]').click(),
        };
        this.searchPrefix = 'ara';
        this.searchCommand = new RegExp(`^${this.searchPrefix}\\s+(.+)$`);
        this.initializeSpeechRecognition();
        this.initializeKeyboardShortcut();
        this.initializeSearchVoice();
    }

    initializeKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Alt + K sesli komutu başlatalım
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.toggleListening();
            }
        });
    }

    initializeSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn('Bu tarayıcı sesli komut desteklemiyor.');
            return;
        }

        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'tr-TR';

        this.recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            this.handleCommand(command);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateMicrophoneStatus();
            this.hideListeningFeedback();
            this.showEndFeedback();
        };

        this.recognition.onerror = (event) => {
            console.error('Konuşma tanıma hatası:', event.error);
            this.isListening = false;
            this.activeSearchInput = null;
            this.updateSearchVoiceStatus(false);
            this.updateMicrophoneStatus();
            
            // Reset all microphone animations and states
            const elements = document.querySelectorAll('.search-voice-btn, .btn-voice-command');
            elements.forEach(el => {
                el.classList.remove('listening', 'active');
                el.style.animation = 'none';
                void el.offsetWidth;
            });
            
            this.hideListeningFeedback();
            if (event.error === 'not-allowed') {
                this.showFeedback('Mikrofon erişimi reddedildi');
            }
        };
    }

    initializeSearchVoice() {
        const searchBar = document.querySelector('.search-bar');
        if (!searchBar) return;

        const searchInput = searchBar.querySelector('input');
        const searchVoiceBtn = document.createElement('button');
        searchVoiceBtn.className = 'search-voice-btn';
        searchVoiceBtn.innerHTML = '<img src="images/mic-kapali.svg" class="sesli-arama-simgesi"></img>';
        searchVoiceBtn.title = 'Sesli arama';
        
        searchBar.style.position = 'relative';
        searchVoiceBtn.style.position = 'absolute';
        searchVoiceBtn.style.right = '10px';
        searchVoiceBtn.style.top = '50%';
        searchVoiceBtn.style.transform = 'translateY(-50%)';
        searchVoiceBtn.style.background = 'none';
        searchVoiceBtn.style.border = 'none';
        searchVoiceBtn.style.cursor = 'pointer';
        searchVoiceBtn.style.color = 'inherit';
        
        searchInput.style.paddingRight = '35px';
        
        searchBar.appendChild(searchVoiceBtn);

        searchVoiceBtn.addEventListener('click', () => {
            if (this.isListening && this.activeSearchInput === searchInput) {
                this.stopListening();
            } else {
                this.startSearchListening(searchInput);
            }
        });
    }

    startSearchListening(searchInput) {
        if (!this.recognition) {
            alert('Tarayıcınız sesli komutları desteklemiyor.');
            return;
        }

        this.activeSearchInput = searchInput;
        this.recognition.start();
        this.isListening = true;
        this.updateSearchVoiceStatus(true);
        this.showListeningFeedback();
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.activeSearchInput = null;
            this.updateSearchVoiceStatus(false);
            this.updateMicrophoneStatus();
            
            // Reset all microphone animations and states
            const elements = document.querySelectorAll('.search-voice-btn, .btn-voice-command');
            elements.forEach(el => {
                if (el.classList.contains('search-voice-btn')) {
                    el.src = 'images/mic-kapali.svg';
                }
                el.classList.remove('listening', 'active');
                el.style.animation = 'none';
                void el.offsetWidth;
            });

            // Show end feedback immediately when manually stopped
            this.showEndFeedback();
        }
    }

    showListeningFeedback() {
        this.hideListeningFeedback(); // Remove any existing feedback first
        const feedback = document.createElement('div');
        feedback.className = 'voice-listening-feedback active';
        
        // Create container for icon and text
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.alignItems = 'center';
        contentContainer.style.gap = '8px';
        
        // Create and setup icon
        const icon = document.createElement('img');
        icon.src = 'images/voice-assistant-icon.png';
        icon.style.width = '48px';
        icon.style.height = '48px';
        
        // Create text element
        const text = document.createElement('span');
        text.textContent = 'Sizi dinliyorum...';
        
        // Assemble the elements
        contentContainer.appendChild(icon);
        contentContainer.appendChild(text);
        feedback.appendChild(contentContainer);
        
        feedback.style.backgroundColor = '#4CAF50';
        document.body.appendChild(feedback);
    }

    hideListeningFeedback() {
        const feedback = document.querySelector('.voice-listening-feedback');
        if (feedback) {
            feedback.remove();
        }
    }

    showEndFeedback() {
        const existingFeedback = document.querySelector('.voice-listening-feedback');
        if (existingFeedback) {
            existingFeedback.style.backgroundColor = '#ff4444';
            existingFeedback.textContent = 'Sesli komut işlemi sona erdi';
            setTimeout(() => {
                existingFeedback.classList.add('fade-out');
                setTimeout(() => existingFeedback.remove(), 500);
            }, 1000);
        } else {
            // Create new feedback if none exists
            const feedback = document.createElement('div');
            feedback.className = 'voice-listening-feedback';
            feedback.style.backgroundColor = '#ff4444';
            feedback.textContent = 'Sesli komut işlemi sona erdi';
            document.body.appendChild(feedback);
            setTimeout(() => {
                feedback.classList.add('fade-out');
                setTimeout(() => feedback.remove(), 500);
            }, 1000);
        }
    }

    updateSearchVoiceStatus(isListening) {
        const searchVoiceBtn = document.querySelector('.search-voice-btn'); // Butonu seç
        const searchVoiceBtnImg = searchVoiceBtn.querySelector('img'); // İçindeki img öğesini seç
    
        if (searchVoiceBtn) {
            // Sınıfları güncelle
            searchVoiceBtn.classList.toggle('listening', isListening);
            searchVoiceBtn.classList.toggle('active', isListening);
    
            // Görseli güncelle
            if (searchVoiceBtnImg) {
                if (isListening) {
                    searchVoiceBtnImg.src = 'images/mic-acik.svg'; // Yeni görsel (Listening)
                } else {
                    searchVoiceBtnImg.src = 'images/mic-kapali.svg'; // Eski görsel (Normal durum)
                }
            }
        }
    }    

    handleCommand(command) {
        console.log('Alınan komut:', command);
        
        if (this.activeSearchInput) {
            this.activeSearchInput.value = command;
            this.activeSearchInput.dispatchEvent(new Event('input'));
            this.showFeedback(`"${command}" için arama yapılıyor`);
            this.stopListening();
            return;
        }

        // Check if it's a search command
        const searchMatch = command.match(this.searchCommand);
        if (searchMatch) {
            const searchTerm = searchMatch[1];
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.value = searchTerm;
                searchInput.dispatchEvent(new Event('input'));
                this.showFeedback(`"${searchTerm}" için arama yapılıyor`);
                return;
            }
        }

        // Handle other commands
        for (const [key, action] of Object.entries(this.commands)) {
            if (command.includes(key)) {
                action();
                this.showFeedback(`"${key}" komutu çalıştırıldı`);
                return;
            }
        }
        
        this.showFeedback('Komut anlaşılamadı');
    }

    toggleListening() {
        if (!this.recognition) {
            alert('Tarayıcınız sesli komutları desteklemiyor.');
            return;
        }

        if (this.isListening) {
            this.stopListening();
        } else {
            this.recognition.start();
            this.isListening = true;
            this.updateMicrophoneStatus();
            this.showListeningFeedback();
            const micButton = document.querySelector('.btn-voice-command');
            if (micButton) {
                micButton.classList.add('listening');
            }
        }
    }

    updateMicrophoneStatus() {
        const micButton = document.querySelector('.btn-voice-command');
        if (micButton) {
            micButton.classList.toggle('listening', this.isListening);
        }
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'voice-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 500);
        }, 2000);
    }
}

// Initialize voice commands when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const voiceHandler = new VoiceCommandHandler();
    
    // Create and add the microphone button if it doesn't exist

    // Add click event listener to the microphone button
    const micButton = document.querySelector('.btn-voice-command');
    if (micButton) {
        micButton.addEventListener('click', () => voiceHandler.toggleListening());
    }
});