/**
 * Script untuk membuat header interaktif dan slider
 * Dibuat untuk Yoo's Shop
 */

// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Variabel untuk menyimpan elemen-elemen header yang akan dimanipulasi
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo');
    const searchInput = document.getElementById('search-input');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Efek scroll - mengubah header saat di-scroll
    window.addEventListener('scroll', function() {
        // Jika halaman di-scroll lebih dari 50px
        if (window.scrollY > 50) {
            // Tambahkan class 'scrolled' ke header
            header.style.backgroundColor = '#334b34';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            // Perkecil logo saat scroll
            const logoImg = logo.querySelector('.logo-img');
            if (logoImg) {
                logoImg.style.height = '100px';
                logoImg.style.transform = 'scale(1.2)';
            }
        } else {
            // Kembalikan ke style awal
            header.style.backgroundColor = '';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            // Kembalikan ukuran logo
            const logoImg = logo.querySelector('.logo-img');
            if (logoImg) {
                logoImg.style.height = '120px';
                logoImg.style.transform = 'scale(1.2)';
            }
        }
    });
    
    // Efek focus pada search input
    searchInput.addEventListener('focus', function() {
        // Animasi saat input difokuskan
        this.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        // Kembalikan ke ukuran normal saat tidak fokus
        this.style.transform = 'scale(1)';
    });
    
    // Toggle menu mobile
    mobileMenuToggle.addEventListener('click', function() {
        // Toggle class 'active' pada menu navigasi
        navMenu.classList.toggle('active');
        
        // Ubah ikon menu
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Menambahkan efek klik pada item navigasi
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Hapus class 'active' dari semua item
            navItems.forEach(i => i.classList.remove('active'));
            
            // Tambahkan class 'active' ke item yang diklik
            this.classList.add('active');
        });
    });
    
    // Animasi logo saat di-hover
    logo.addEventListener('mouseover', function() {
        // Efek hover pada logo gambar
        const logoImg = this.querySelector('.logo-img');
        if (logoImg) {
            logoImg.style.filter = 'drop-shadow(0 0 5px rgba(178, 237, 180, 0.8))';
        }
    });
    
    logo.addEventListener('mouseout', function() {
        // Kembalikan efek saat mouse keluar
        const logoImg = this.querySelector('.logo-img');
        if (logoImg) {
            logoImg.style.filter = '';
        }
    });
    
    // ===== KODE SLIDER =====
    
    // Variabel untuk menyimpan elemen-elemen slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Variabel untuk menyimpan indeks slide aktif
    let currentSlide = 0;
    let slideInterval; // Untuk menyimpan interval otomatis
    
    // Fungsi untuk menampilkan slide dengan indeks tertentu
    function showSlide(index) {
        // Pastikan indeks berada dalam rentang yang valid
        if (index < 0) {
            index = slides.length - 1; // Kembali ke slide terakhir jika di awal
        } else if (index >= slides.length) {
            index = 0; // Kembali ke slide pertama jika di akhir
        }
        
        // Simpan indeks slide aktif
        currentSlide = index;
        
        // Hapus class 'active' dari semua slide dan indikator
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));
        
        // Tambahkan class 'active' ke slide dan indikator yang sesuai
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Update timer untuk slide pertama jika aktif
        if (currentSlide === 0) {
            updateCountdown();
        }
    }
    
    // Fungsi untuk update countdown timer
    function updateCountdown() {
        const timerElement = document.querySelector('.timer');
        if (!timerElement) return;
        
        // Set waktu countdown (48 jam dari sekarang)
        const now = new Date();
        const end = new Date(now.getTime() + 48 * 60 * 60 * 1000);
        
        // Update timer setiap detik
        const countdownInterval = setInterval(() => {
            const now = new Date();
            const diff = end - now;
            
            if (diff <= 0) {
                clearInterval(countdownInterval);
                timerElement.textContent = "00:00:00";
                return;
            }
            
            // Hitung jam, menit, detik
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Format waktu
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            
            // Update elemen timer
            timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            
            // Hentikan interval jika slide tidak lagi aktif
            if (currentSlide !== 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
    
    // Event listener untuk tombol navigasi
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // Reset interval otomatis saat pengguna mengklik tombol
            clearInterval(slideInterval);
            // Tampilkan slide sebelumnya
            showSlide(currentSlide - 1);
            // Mulai interval otomatis lagi
            startSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Reset interval otomatis saat pengguna mengklik tombol
            clearInterval(slideInterval);
            // Tampilkan slide berikutnya
            showSlide(currentSlide + 1);
            // Mulai interval otomatis lagi
            startSlideInterval();
        });
    }
    
    // Event listener untuk indikator slide (dots)
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Reset interval otomatis saat pengguna mengklik indikator
            clearInterval(slideInterval);
            // Tampilkan slide yang sesuai dengan indikator yang diklik
            showSlide(index);
            // Mulai interval otomatis lagi
            startSlideInterval();
        });
    });
    
    // Fungsi untuk memulai interval otomatis
    function startSlideInterval() {
        // Bersihkan interval yang mungkin sudah berjalan
        clearInterval(slideInterval);
        // Buat interval baru untuk mengganti slide setiap 5 detik
        slideInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000); // 5000ms = 5 detik
    }
    
    // Mulai slider otomatis
    startSlideInterval();
    
    // Mulai countdown timer jika slide pertama aktif
    if (currentSlide === 0) {
        updateCountdown();
    }
    
    // Product Slider Navigation
    const productSlider = document.querySelector('.product-slider');
    const prevProductBtn = document.querySelector('.prev-product');
    const nextProductBtn = document.querySelector('.next-product');
    
    // Featured Slider Navigation
    const featuredSlider = document.querySelector('.featured-slider');
    const prevFeaturedBtn = document.querySelector('.prev-featured');
    const nextFeaturedBtn = document.querySelector('.next-featured');
    
    if (productSlider && prevProductBtn && nextProductBtn) {
        // Scroll amount for product slider
        const scrollAmount = 270; // Width of product card + gap
        
        // Previous product button click
        prevProductBtn.addEventListener('click', function() {
            productSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next product button click
        nextProductBtn.addEventListener('click', function() {
            productSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Featured products slider navigation
    if (featuredSlider && prevFeaturedBtn && nextFeaturedBtn) {
        // Scroll amount for featured slider
        const featuredScrollAmount = 300; // Width of featured card + gap
        
        // Previous featured button click
        prevFeaturedBtn.addEventListener('click', function() {
            featuredSlider.scrollBy({
                left: -featuredScrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next featured button click
        nextFeaturedBtn.addEventListener('click', function() {
            featuredSlider.scrollBy({
                left: featuredScrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Change icon when active
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Save original text
            const originalText = this.innerHTML;
            
            // Change text and disable button
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = '#4CAF50';
            this.disabled = true;
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Tambahkan event listener untuk menghentikan interval saat pengguna mengarahkan kursor ke slider
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            // Hentikan interval otomatis saat kursor di atas slider
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            // Mulai interval otomatis lagi saat kursor meninggalkan slider
            startSlideInterval();
        });
    }
    
    // Tambahkan dukungan untuk swipe pada perangkat mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        // Event listener untuk mendeteksi awal sentuhan
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        // Event listener untuk mendeteksi akhir sentuhan
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    // Fungsi untuk menangani swipe
    function handleSwipe() {
        // Tentukan jarak minimum untuk dianggap sebagai swipe
        const swipeThreshold = 50;
        
        // Jika swipe ke kiri (touchEndX < touchStartX)
        if (touchEndX < touchStartX - swipeThreshold) {
            showSlide(currentSlide + 1); // Tampilkan slide berikutnya
            clearInterval(slideInterval);
            startSlideInterval();
        }
        
        // Jika swipe ke kanan (touchEndX > touchStartX)
        if (touchEndX > touchStartX + swipeThreshold) {
            showSlide(currentSlide - 1); // Tampilkan slide sebelumnya
            clearInterval(slideInterval);
            startSlideInterval();
        }
    }
});