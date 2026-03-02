/**
 * Anime Streaming Website - Unified JavaScript Framework
 * Author: Web Development Team
 * Version: 1.0.0
 * Description: Interactive features and utilities for anime streaming website
 */

// Global Configuration
const SITE_CONFIG = {
  name: 'StreamingHub',
  version: '1.0.0',
  apiUrl: '/api',
  debug: true,
  
  // Feature flags
  features: {
    darkMode: true,
    lazyLoading: true,
    infiniteScroll: true,
    notifications: true,
    analytics: true
  },
  
  // NSFW Keywords Detection
  nsfwKeywords: ['yaoi', 'bl', 'gl', 'bxb', 'gxg', 'hentai', 'ecchi', 'adult'],
  
  // Anti-copy protection
  antiCopy: {
    enabled: true,
    message: 'Konten ini dilindungi hak cipta'
  },
  
  // Watermark settings
  watermark: {
    enabled: true,
    text: 'StreamingHub',
    opacity: 0.7,
    position: 'bottom-right'
  }
};

// Utility Functions
const Utils = {
  // Logging utility
  log: (...args) => {
    if (SITE_CONFIG.debug) {
      console.log(`[${SITE_CONFIG.name}]`, ...args);
    }
  },
  
  // Error logging
  error: (...args) => {
    console.error(`[${SITE_CONFIG.name} ERROR]`, ...args);
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Get cookie value
  getCookie: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },
  
  // Set cookie
  setCookie: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  
  // Delete cookie
  deleteCookie: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
  
  // Format number with commas
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  // Format date
  formatDate: (date, format = 'DD MMM YYYY') => {
    const d = new Date(date);
    const options = {
      DD: d.getDate().toString().padStart(2, '0'),
      MM: (d.getMonth() + 1).toString().padStart(2, '0'),
      YYYY: d.getFullYear(),
      MMM: d.toLocaleString('id-ID', { month: 'short' }),
      MMMM: d.toLocaleString('id-ID', { month: 'long' })
    };
    
    return format.replace(/DD|MM|YYYY|MMM|MMMM/g, (match) => options[match]);
  },
  
  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  // Copy to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      Utils.error('Failed to copy text:', err);
      return false;
    }
  },
  
  // Sanitize HTML
  sanitizeHTML: (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
};

// Loading Manager
const LoadingManager = {
  show: (message = 'Loading...') => {
    const loadingHTML = `
      <div id="global-loading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p class="loading-text">${message}</p>
        </div>
      </div>
    `;
    
    if (!document.getElementById('global-loading')) {
      document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }
  },
  
  hide: () => {
    const loading = document.getElementById('global-loading');
    if (loading) {
      loading.remove();
    }
  }
};

// Notification System
const NotificationSystem = {
  show: (message, type = 'info', duration = 3000) => {
    const notificationHTML = `
      <div class="notification notification-${type}" id="notification-${Date.now()}">
        <div class="notification-icon">
          <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        </div>
        <div class="notification-content">
          <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    const container = document.getElementById('notification-container') || document.body;
    container.insertAdjacentHTML('beforeend', notificationHTML);
    
    const notification = document.getElementById(`notification-${Date.now()}`);
    
    // Auto remove after duration
    setTimeout(() => {
      if (notification && notification.parentElement) {
        notification.remove();
      }
    }, duration);
    
    Utils.log('Notification shown:', message, type);
  },
  
  success: (message, duration) => {
    NotificationSystem.show(message, 'success', duration);
  },
  
  error: (message, duration) => {
    NotificationSystem.show(message, 'error', duration);
  },
  
  warning: (message, duration) => {
    NotificationSystem.show(message, 'warning', duration);
  },
  
  info: (message, duration) => {
    NotificationSystem.show(message, 'info', duration);
  }
};

// NSFW Content Manager
const NSFWManager = {
  checkContent: (title, tags = []) => {
    const content = [title, ...tags].join(' ').toLowerCase();
    return SITE_CONFIG.nsfwKeywords.some(keyword => content.includes(keyword));
  },
  
  showWarning: (title, callback) => {
    const modalHTML = `
      <div class="modal show" id="nsfw-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Peringatan Konten Dewasa</h3>
            <button class="close-btn" onclick="NSFWManager.closeWarning()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning">
              <strong><i class="fas fa-exclamation-triangle"></i> PERINGATAN:</strong>
              <p>Konten "${title}" mengandung materi yang tidak cocok untuk semua umur.</p>
              <p>Pastikan Anda berusia di atas 18 tahun sebelum melanjutkan.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="NSFWManager.closeWarning()">Kembali</button>
            <button class="btn btn-primary" onclick="NSFWManager.proceedWarning()">Lanjutkan</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    window.nsfwCallback = callback;
  },
  
  closeWarning: () => {
    const modal = document.getElementById('nsfw-modal');
    if (modal) modal.remove();
  },
  
  proceedWarning: () => {
    NSFWManager.closeWarning();
    if (window.nsfwCallback) {
      window.nsfwCallback();
    }
  }
};

// Anti-Copy Protection
const AntiCopy = {
  init: () => {
    if (!SITE_CONFIG.antiCopy.enabled) return;
    
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      NotificationSystem.warning(SITE_CONFIG.antiCopy.message);
    });
    
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
    });
    
    document.addEventListener('copy', (e) => {
      e.preventDefault();
      NotificationSystem.warning(SITE_CONFIG.antiCopy.message);
    });
    
    // Disable F12, Ctrl+Shift+I, etc.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        NotificationSystem.warning('Fungsi ini dinonaktifkan untuk perlindungan konten.');
      }
    });
    
    Utils.log('Anti-copy protection enabled');
  }
};

// Watermark System
const Watermark = {
  add: (containerId, text = SITE_CONFIG.watermark.text) => {
    if (!SITE_CONFIG.watermark.enabled) return;
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const watermarkHTML = `
      <div class="watermark" style="
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 10;
        opacity: ${SITE_CONFIG.watermark.opacity};
        pointer-events: none;
      ">
        ${text}
      </div>
    `;
    
    container.style.position = 'relative';
    container.insertAdjacentHTML('afterbegin', watermarkHTML);
  }
};

// Lazy Loading Manager
const LazyLoading = {
  init: () => {
    if (!SITE_CONFIG.features.lazyLoading) return;
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    Utils.log('Lazy loading initialized');
  }
};

// Infinite Scroll Manager
const InfiniteScroll = {
  init: (callback, threshold = 100) => {
    if (!SITE_CONFIG.features.infiniteScroll) return;
    
    let isLoading = false;
    
    const handleScroll = Utils.throttle(() => {
      if (isLoading) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - threshold) {
        isLoading = true;
        LoadingManager.show('Memuat konten lebih banyak...');
        
        callback().then(() => {
          isLoading = false;
          LoadingManager.hide();
        }).catch(err => {
          isLoading = false;
          LoadingManager.hide();
          Utils.error('Infinite scroll error:', err);
        });
      }
    }, 200);
    
    window.addEventListener('scroll', handleScroll);
    
    Utils.log('Infinite scroll initialized');
  }
};

// Search Manager
const SearchManager = {
  init: (searchInputId, resultsCallback) => {
    const searchInput = document.getElementById(searchInputId);
    if (!searchInput) return;
    
    const debouncedSearch = Utils.debounce((query) => {
      if (query.length < 2) {
        resultsCallback([]);
        return;
      }
      
      LoadingManager.show('Mencari...');
      
      // Simulate search API call
      setTimeout(() => {
        LoadingManager.hide();
        resultsCallback(query);
      }, 500);
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });
    
    Utils.log('Search manager initialized');
  }
};

// Dark Mode Manager
const DarkModeManager = {
  init: () => {
    if (!SITE_CONFIG.features.darkMode) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    DarkModeManager.setTheme(savedTheme);
    
    // Add theme toggle button if exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        DarkModeManager.setTheme(newTheme);
      });
    }
    
    Utils.log('Dark mode manager initialized');
  },
  
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
  }
};

// Analytics Manager
const AnalyticsManager = {
  init: () => {
    if (!SITE_CONFIG.features.analytics) return;
    
    // Track page views
    AnalyticsManager.trackPageView();
    
    // Track clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-track]')) {
        AnalyticsManager.trackEvent('click', e.target.dataset.track);
      }
    });
    
    Utils.log('Analytics manager initialized');
  },
  
  trackPageView: (page = window.location.pathname) => {
    // Simulate analytics tracking
    Utils.log('Page view tracked:', page);
    
    // In real implementation, send to analytics service
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //   page_path: page,
    // });
  },
  
  trackEvent: (action, category, label = '') => {
    Utils.log('Event tracked:', action, category, label);
    
    // In real implementation, send to analytics service
    // gtag('event', action, {
    //   event_category: category,
    //   event_label: label,
    // });
  }
};

// Main Application
const App = {
  init: () => {
    Utils.log('Initializing app...');
    
    // Initialize managers
    DarkModeManager.init();
    AntiCopy.init();
    LazyLoading.init();
    AnalyticsManager.init();
    
    // Add event listeners
    document.addEventListener('DOMContentLoaded', () => {
      Utils.log('DOM loaded, initializing components...');
      
      // Initialize any component-specific functionality
      App.initComponents();
    });
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        AnalyticsManager.trackPageView();
      }
    });
    
    // Handle online/offline events
    window.addEventListener('online', () => {
      NotificationSystem.success('Koneksi internet tersedia');
    });
    
    window.addEventListener('offline', () => {
      NotificationSystem.warning('Koneksi internet terputus');
    });
    
    Utils.log('App initialized successfully');
  },
  
  initComponents: () => {
    // Initialize any component-specific functionality here
    
    // Example: Initialize search if search input exists
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      SearchManager.init('search-input', (query) => {
        Utils.log('Search query:', query);
        // Implement search results display
      });
    }
    
    // Initialize infinite scroll if container exists
    const infiniteContainer = document.getElementById('infinite-container');
    if (infiniteContainer) {
      InfiniteScroll.init(() => {
        return new Promise((resolve) => {
          // Simulate loading more content
          setTimeout(() => {
            Utils.log('Loading more content...');
            resolve();
          }, 1000);
        });
      });
    }
  }
};

// Global functions
window.showNotification = NotificationSystem.show;
window.showSuccess = NotificationSystem.success;
window.showError = NotificationSystem.error;
window.showWarning = NotificationSystem.warning;
window.showInfo = NotificationSystem.info;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

// Export for use in other scripts
window.SITE_CONFIG = SITE_CONFIG;
window.Utils = Utils;
window.LoadingManager = LoadingManager;
window.NotificationSystem = NotificationSystem;
window.NSFWManager = NSFWManager;
window.AntiCopy = AntiCopy;
window.Watermark = Watermark;
window.LazyLoading = LazyLoading;
window.InfiniteScroll = InfiniteScroll;
window.SearchManager = SearchManager;
window.DarkModeManager = DarkModeManager;
window.AnalyticsManager = AnalyticsManager;
window.App = App;