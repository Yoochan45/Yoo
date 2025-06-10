/**
 * Script untuk membuat header interaktif
 * Dibuat untuk Yoo's Shop
 */

// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Variabel untuk menyimpan elemen-elemen yang akan dimanipulasi
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
});