// Tap Bio Mobile Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the mobile dashboard
    initMobileDashboard();
    
    function initMobileDashboard() {
        setupEventListeners();
        setupTouchGestures();
        setupSettingsModal();
        console.log('Tap Bio Mobile Dashboard initialized');
    }
    
    function setupEventListeners() {
        // User button - opens settings modal
        const userBtn = document.getElementById('userBtn');
        if (userBtn) {
            userBtn.addEventListener('click', openSettingsModal);
        }
        
        // Close settings button
        const closeSettingsBtn = document.getElementById('closeSettingsBtn');
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', closeSettingsModal);
        }
        
        // Edit profile button
        const editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', handleEditProfile);
        }
        
        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', handleShare);
        }
        
        // Back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', handleBack);
        }
        
        // Settings menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', handleMenuClick);
        });
        
        // Card items
        const cardItems = document.querySelectorAll('.card-item');
        cardItems.forEach(item => {
            item.addEventListener('click', handleCardClick);
        });
    }
    
    function setupTouchGestures() {
        const settingsModal = document.getElementById('settingsModal');
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        // Touch start
        settingsModal.addEventListener('touchstart', function(e) {
            if (!settingsModal.classList.contains('active')) return;
            
            startX = e.touches[0].clientX;
            isDragging = true;
            settingsModal.style.transition = 'none';
        }, { passive: true });
        
        // Touch move
        settingsModal.addEventListener('touchmove', function(e) {
            if (!isDragging || !settingsModal.classList.contains('active')) return;
            
            currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            
            // Only allow right swipe (positive deltaX)
            if (deltaX > 0) {
                const progress = Math.min(deltaX / window.innerWidth, 1);
                settingsModal.style.transform = `translateX(${deltaX}px)`;
                settingsModal.style.opacity = 1 - (progress * 0.3);
            }
        }, { passive: true });
        
        // Touch end
        settingsModal.addEventListener('touchend', function(e) {
            if (!isDragging || !settingsModal.classList.contains('active')) return;
            
            const deltaX = currentX - startX;
            const threshold = window.innerWidth * 0.3; // 30% of screen width
            
            settingsModal.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
            
            if (deltaX > threshold) {
                // Close modal
                closeSettingsModal();
            } else {
                // Snap back
                settingsModal.style.transform = 'translateX(0)';
                settingsModal.style.opacity = '1';
            }
            
            isDragging = false;
            startX = 0;
            currentX = 0;
        }, { passive: true });
    }
    
    function setupSettingsModal() {
        const settingsModal = document.getElementById('settingsModal');
        
        // Prevent body scroll when modal is open
        const preventScroll = (e) => {
            if (settingsModal.classList.contains('active')) {
                e.preventDefault();
            }
        };
        
        document.addEventListener('touchmove', preventScroll, { passive: false });
        
        // Close modal when clicking outside (for desktop)
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                closeSettingsModal();
            }
        });
    }
    
    function openSettingsModal() {
        const settingsModal = document.getElementById('settingsModal');
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add haptic feedback on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        showToast('Settings opened', 'info');
    }
    
    function closeSettingsModal() {
        const settingsModal = document.getElementById('settingsModal');
        settingsModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset any transform from swipe gesture
        setTimeout(() => {
            settingsModal.style.transform = '';
            settingsModal.style.opacity = '';
            settingsModal.style.transition = '';
        }, 300);
    }
    
    function handleEditProfile() {
        showToast('Edit Profile - Coming Soon!', 'info');
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    }
    
    function handleShare() {
        const profileUrl = 'https://tap.bio/medmed';
        
        if (navigator.share) {
            // Use native share API if available
            navigator.share({
                title: 'medmed - Tap Bio',
                text: 'Check out my Tap Bio profile',
                url: profileUrl
            }).then(() => {
                showToast('Shared successfully!', 'success');
            }).catch(() => {
                fallbackShare(profileUrl);
            });
        } else {
            fallbackShare(profileUrl);
        }
    }
    
    function fallbackShare(url) {
        // Copy to clipboard as fallback
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                showToast('Profile link copied!', 'success');
            }).catch(() => {
                showToast('Could not share', 'error');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast('Profile link copied!', 'success');
            } catch (err) {
                showToast('Could not share', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    function handleBack() {
        // In a real app, this would navigate back
        showToast('Back button pressed', 'info');
    }
    
    function handleMenuClick(e) {
        e.preventDefault();
        
        const item = e.currentTarget;
        const page = item.dataset.page;
        const action = item.dataset.action;
        
        // Add visual feedback
        item.style.backgroundColor = '#f0f0f0';
        setTimeout(() => {
            item.style.backgroundColor = '';
        }, 150);
        
        // Handle different menu items
        if (page) {
            handlePageNavigation(page, item);
        } else if (action) {
            handleSpecialAction(action, item);
        }
    }
    
    function handlePageNavigation(page, element) {
        console.log(`Navigating to: ${page}`);
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        switch (page) {
            case 'cards':
                showToast('Opening Your Cards...', 'info');
                break;
            case 'switch':
                showToast('Switch Accounts', 'info');
                break;
            case 'access':
                showToast('Account Access', 'info');
                break;
            case 'notifications':
                showToast('Account Notifications', 'info');
                break;
            case 'profile':
                showToast('Edit Profile', 'info');
                break;
            case 'username':
                showToast('Change Username', 'info');
                break;
            case 'plan':
                showToast('Your Plan - Gold (trial)', 'info');
                break;
            case 'privacy':
                showToast('Privacy Policy', 'info');
                break;
            case 'terms':
                showToast('Terms of Service', 'info');
                break;
        }
    }
    
    function handleSpecialAction(action, element) {
        console.log(`Performing action: ${action}`);
        
        switch (action) {
            case 'follower-view':
                showToast('Opening Follower View...', 'info');
                break;
                
            case 'copy-link':
                copyProfileLink();
                break;
                
            case 'logout':
                handleLogout();
                break;
        }
    }
    
    function copyProfileLink() {
        const profileUrl = 'https://tap.bio/medmed';
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(profileUrl).then(() => {
                showToast('Profile link copied!', 'success');
                
                // Add haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate([10, 50, 10]);
                }
            }).catch(() => {
                fallbackCopyTextToClipboard(profileUrl);
            });
        } else {
            fallbackCopyTextToClipboard(profileUrl);
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Profile link copied!', 'success');
        } catch (err) {
            showToast('Could not copy link', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    function handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            showToast('Logging out...', 'info');
            
            setTimeout(() => {
                showToast('Logged out successfully', 'success');
                closeSettingsModal();
            }, 1000);
        }
    }
    
    function handleCardClick(e) {
        const card = e.currentTarget;
        const cardTitle = card.querySelector('h3').textContent;
        
        // Add visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(15);
        }
        
        showToast(`Opening ${cardTitle}...`, 'info');
    }
    
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        // Remove existing classes
        toast.classList.remove('show', 'success', 'error');
        
        // Set message and type
        toastMessage.textContent = message;
        if (type !== 'info') {
            toast.classList.add(type);
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Hide after delay
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate dimensions after orientation change
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    // Set initial viewport height for mobile
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Handle keyboard appearance on mobile
    if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', () => {
            const vh = window.visualViewport.height * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Export functions for potential use in other modules
    window.TapBioMobile = {
        openSettings: openSettingsModal,
        closeSettings: closeSettingsModal,
        showToast: showToast
    };
    
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}