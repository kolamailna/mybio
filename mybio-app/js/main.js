// Main Application JavaScript
class TapBioApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.profileData = {
            name: 'medtass',
            title: '',
            bio: 'Tap to Add a Description about Yourself',
            website: '',
            email: 'medtass124@gmail.com',
            avatar: 'M'
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProfileData();
        this.showPage('dashboard');
    }

    bindEvents() {
        // Dashboard events
        const editBtn = document.getElementById('editBtn');
        const userBtn = document.getElementById('userBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        
        if (editBtn) {
            editBtn.addEventListener('click', () => this.showPage('edit-profile'));
        }
        
        if (userBtn) {
            userBtn.addEventListener('click', () => this.showPage('account-settings'));
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showPage('account-settings'));
        }

        // Edit Profile events
        const editBackBtn = document.getElementById('editBackBtn');
        const saveBtn = document.getElementById('saveBtn');
        const changePhotoBtn = document.getElementById('changePhotoBtn');
        const avatarUpload = document.getElementById('avatarUpload');
        
        if (editBackBtn) {
            editBackBtn.addEventListener('click', () => this.showPage('dashboard'));
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProfile());
        }
        
        if (changePhotoBtn) {
            changePhotoBtn.addEventListener('click', () => {
                if (avatarUpload) avatarUpload.click();
            });
        }
        
        if (avatarUpload) {
            avatarUpload.addEventListener('change', (e) => this.handleAvatarUpload(e));
        }

        // Account Settings events
        const settingsCloseBtn = document.getElementById('settingsCloseBtn');
        
        if (settingsCloseBtn) {
            settingsCloseBtn.addEventListener('click', () => this.showPage('dashboard'));
        }

        // Settings menu items
        const menuItems = document.querySelectorAll('.settings-menu .menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuClick(e));
        });

        // Avatar selection
        const avatarOptions = document.querySelectorAll('.avatar-option');
        avatarOptions.forEach(option => {
            option.addEventListener('click', (e) => this.selectAvatar(e));
        });

        // Form inputs
        this.bindFormInputs();
    }

    bindFormInputs() {
        const inputs = {
            nameInput: 'name',
            titleInput: 'title',
            bioInput: 'bio',
            websiteInput: 'website',
            emailInput: 'email'
        };

        Object.entries(inputs).forEach(([inputId, dataKey]) => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.profileData[dataKey] = e.target.value;
                });
            }
        });
    }

    showPage(pageName) {
        // Hide all pages
        const pages = ['dashboard', 'edit-profile', 'account-settings'];
        pages.forEach(page => {
            const pageElement = document.getElementById(page === 'dashboard' ? 'mainDashboard' : 
                                                     page === 'edit-profile' ? 'editProfilePage' : 
                                                     'accountSettingsPage');
            if (pageElement) {
                pageElement.style.display = 'none';
            }
        });

        // Show requested page
        const targetPage = document.getElementById(pageName === 'dashboard' ? 'mainDashboard' : 
                                                 pageName === 'edit-profile' ? 'editProfilePage' : 
                                                 'accountSettingsPage');
        if (targetPage) {
            targetPage.style.display = 'flex';
        }

        this.currentPage = pageName;

        // Load data for specific pages
        if (pageName === 'edit-profile') {
            this.loadEditProfileData();
        }
    }

    loadProfileData() {
        // Load saved profile data from localStorage
        const saved = localStorage.getItem('tapbio-profile');
        if (saved) {
            this.profileData = { ...this.profileData, ...JSON.parse(saved) };
        }
        
        this.updateDashboardDisplay();
    }

    loadEditProfileData() {
        // Populate edit form with current data
        const inputs = {
            nameInput: this.profileData.name,
            titleInput: this.profileData.title,
            bioInput: this.profileData.bio,
            websiteInput: this.profileData.website,
            emailInput: this.profileData.email
        };

        Object.entries(inputs).forEach(([inputId, value]) => {
            const input = document.getElementById(inputId);
            if (input) {
                input.value = value || '';
            }
        });
    }

    saveProfile() {
        // Save profile data
        localStorage.setItem('tapbio-profile', JSON.stringify(this.profileData));
        
        // Update dashboard display
        this.updateDashboardDisplay();
        
        // Show success message
        this.showToast('Profile saved successfully!');
        
        // Return to dashboard
        this.showPage('dashboard');
    }

    updateDashboardDisplay() {
        // Update profile name
        const nameElements = document.querySelectorAll('.profile-name');
        nameElements.forEach(el => {
            el.textContent = this.profileData.name || 'medtass';
        });

        // Update profile bio
        const bioElements = document.querySelectorAll('.profile-bio');
        bioElements.forEach(el => {
            el.textContent = this.profileData.bio || 'Tap to Add a Description about Yourself';
        });

        // Update avatar
        const avatarElements = document.querySelectorAll('.user-avatar span, .profile-avatar-large span');
        avatarElements.forEach(el => {
            el.textContent = this.profileData.avatar || 'M';
        });
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // In a real app, you'd upload this to a server
                // For now, we'll just show a message
                this.showToast('Avatar upload feature coming soon!');
            };
            reader.readAsDataURL(file);
        }
    }

    selectAvatar(event) {
        // Remove selected class from all options
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        event.currentTarget.classList.add('selected');

        // Update avatar data
        const avatarText = event.currentTarget.textContent.trim();
        if (avatarText) {
            this.profileData.avatar = avatarText;
        }
    }

    handleMenuClick(event) {
        const action = event.currentTarget.dataset.action;
        
        switch (action) {
            case 'edit-profile':
                this.showPage('edit-profile');
                break;
            case 'your-cards':
                this.showToast('Your Cards feature coming soon!');
                break;
            case 'switch-accounts':
                this.showToast('Switch Accounts feature coming soon!');
                break;
            case 'account-access':
                this.showToast('Account Access feature coming soon!');
                break;
            case 'notifications':
                this.showToast('Notifications feature coming soon!');
                break;
            case 'change-username':
                this.showToast('Change Username feature coming soon!');
                break;
            case 'your-plan':
                this.showToast('Your Plan feature coming soon!');
                break;
            case 'follower-view':
                this.showToast('Follower View feature coming soon!');
                break;
            case 'copy-link':
                this.copyProfileLink();
                break;
            case 'logout':
                this.logout();
                break;
            case 'privacy':
                this.showToast('Privacy Policy feature coming soon!');
                break;
            case 'terms':
                this.showToast('Terms of Service feature coming soon!');
                break;
            case 'support':
                this.showToast('Support feature coming soon!');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    copyProfileLink() {
        const profileUrl = `${window.location.origin}/profile/${this.profileData.name}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(profileUrl).then(() => {
                this.showToast('Profile link copied to clipboard!');
            }).catch(() => {
                this.showToast('Failed to copy link');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = profileUrl;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast('Profile link copied to clipboard!');
            } catch (err) {
                this.showToast('Failed to copy link');
            }
            document.body.removeChild(textArea);
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('tapbio-profile');
            this.showToast('Logged out successfully!');
            // In a real app, you'd redirect to login page
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tapBioApp = new TapBioApp();
});

// Handle back button
window.addEventListener('popstate', (event) => {
    if (window.tapBioApp) {
        window.tapBioApp.showPage('dashboard');
    }
});

// Handle touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (window.tapBioApp && window.tapBioApp.currentPage !== 'dashboard') {
            // Swipe right to go back
            if (diffX < 0) {
                window.tapBioApp.showPage('dashboard');
            }
        }
    }

    touchStartX = 0;
    touchStartY = 0;
});