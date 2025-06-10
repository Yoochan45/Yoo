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
            logo.style.fontSize = '1.6em';
        } else {
            // Kembalikan ke style awal
            header.style.backgroundColor = '';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            logo.style.fontSize = '2em';
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
        this.style.textShadow = '2px 2px 8px rgba(178, 237, 180, 0.8)';
    });
    
    logo.addEventListener('mouseout', function() {
        this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.2)';
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