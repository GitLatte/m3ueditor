// Dropbox API integration
const DROPBOX_APP_KEY = 'kz3pysv4ut0zc5e'; // Replace with your Dropbox App Key
const DROPBOX_REDIRECT_URI = window.location.origin + '/index.html';

// Check if app key is configured
function isDropboxConfigured() {
    return DROPBOX_APP_KEY !== 'kz3pysv4ut0zc5e';
}

class DropboxIntegration {
    constructor() {
        this.accessToken = localStorage.getItem('dropbox_access_token');
        this.initDropboxAuth();
    }

    initDropboxAuth() {
        // Add Dropbox SDK script
        if (!document.getElementById('dropbox-sdk')) {
            const script = document.createElement('script');
            script.id = 'dropbox-sdk';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dropbox.js/10.34.0/Dropbox-sdk.min.js';
            script.onload = () => this.handleAuthRedirect();
            document.head.appendChild(script);
        }
    }

    handleAuthRedirect() {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        
        if (accessToken) {
            this.accessToken = accessToken;
            localStorage.setItem('dropbox_access_token', accessToken);
            window.location.hash = '';
        }
    }

    async authenticate() {
        if (!this.accessToken) {
            const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_APP_KEY}&response_type=token&redirect_uri=${encodeURIComponent(DROPBOX_REDIRECT_URI)}`;
            window.location.href = authUrl;
        }
        return this.accessToken;
    }

    async uploadFile(fileName, content) {
        try {
            if (!this.accessToken) {
                await this.authenticate();
                return;
            }

            const dbx = new Dropbox.Dropbox({ accessToken: this.accessToken });
            const response = await dbx.filesUpload({
                path: '/' + fileName,
                contents: content,
                mode: { '.tag': 'overwrite' }
            });

            showNotification('Dosya Dropbox\'a başarıyla yüklendi', 'success');
            return response;
        } catch (error) {
            console.error('Dropbox upload error:', error);
            showNotification('Dropbox yükleme hatası: ' + error.message, 'error');
            if (error.status === 401) {
                localStorage.removeItem('dropbox_access_token');
                this.accessToken = null;
            }
            throw error;
        }
    }
}

// Create singleton instance
const dropboxIntegration = new DropboxIntegration();

// Add Dropbox upload button to save modal
function addDropboxButton() {
    const saveButton = document.querySelector('.save-button');
    if (saveButton && !document.querySelector('.dropbox-upload-button')) {
        const dropboxButton = document.createElement('button');
        dropboxButton.className = 'dropbox-upload-button';
        dropboxButton.innerHTML = '<i class="fab fa-dropbox"></i> Dropbox\'a Kaydet';
        dropboxButton.onclick = uploadToDropbox;
        saveButton.parentNode.insertBefore(dropboxButton, saveButton.nextSibling);
    }
}

// Upload current M3U list to Dropbox
async function uploadToDropbox() {
    try {
        if (!isDropboxConfigured()) {
            showNotification('Dropbox API anahtarı yapılandırılmamış. Lütfen dropbox.js dosyasını düzenleyin.', 'error');
            return;
        }
        const fileName = prompt('Lütfen Dropbox\'a yüklenecek dosya adını girin:', 
            currentFileName || 'playlist.m3u');
        if (!fileName) return;

        const cleanFileName = fileName.replace(/\.[^.]+$/, '') + '.m3u';
        const content = generateM3UContent();
        
        await dropboxIntegration.uploadFile(cleanFileName, content);
    } catch (error) {
        console.error('Upload to Dropbox failed:', error);
    }
}

// Initialize Dropbox integration when document is ready
document.addEventListener('DOMContentLoaded', () => {
    addDropboxButton();
});