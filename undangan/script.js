
function openInvitation() {
  const opening = document.getElementById('opening');
  const hero = document.querySelector('.hero-inner');
  const music = document.getElementById('music');

  // Tambah animasi fade-out
  opening.classList.add('fade-out');

  // Setelah animasi selesai → hide opening, show hero
  setTimeout(() => {
    opening.style.display = 'none';
    document.body.classList.remove('lock-scroll');

    // Tampilkan section pertama dengan animasi fade-in
    hero.classList.add('show');

    // Play music
    music.play();
  }, 600); // sesuai durasi CSS fade-out
}


function toggleMusic() {
  const music = document.getElementById('music');
  const musicBtn = document.getElementById('musicBtn');
  const musicIcon = document.getElementById('musicIcon');

  if (music.paused) {
    music.play();
    musicIcon.innerText = "🎵";
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicIcon.innerText = "🔇";
    musicBtn.classList.remove('playing');
  }
}

// Pastikan variabel ini ada di bagian paling atas atau dalam setInterval
const targetDate = new Date("January 18, 2026 10:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;
  const countdownElement = document.getElementById("countdown");

  if (!countdownElement) return; // Mencegah error jika ID tidak ketemu

  if (diff < 0) {
    countdownElement.innerHTML = "<div class='happy-day'>Hari Bahagia Telah Tiba! 💍</div>";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdownElement.innerHTML = `
    <div class="timer">${d}<span>Hari</span></div>
    <div class="timer">${h}<span>Jam</span></div>
    <div class="timer">${m}<span>Menit</span></div>
    <div class="timer">${s}<span>Detik</span></div>
  `;
}, 1000);

// Ambil nama tamu dari URL (?to=)
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  document.getElementById("guestName").innerText =
    decodeURIComponent(guest.replace(/\+/g, " "));
}

// Fungsi membuat kelopak bunga
function createPetal() {
  const container = document.getElementById('petal-container');
  if (!container) return;

  const petal = document.createElement('div');
  petal.classList.add('petal');

  // Pengaturan Acak
  const size = Math.random() * 15 + 10 + 'px'; // Ukuran 10-25px
  const left = Math.random() * 100 + 'vw';     // Posisi horizontal
  const duration = Math.random() * 5 + 5 + 's'; // Kecepatan jatuh 5-10 detik
  const delay = Math.random() * 5 + 's';        // Delay muncul

  petal.style.width = size;
  petal.style.height = size;
  petal.style.left = left;
  petal.style.animationDuration = duration;
  petal.style.animationDelay = delay;

  container.appendChild(petal);

  // Hapus elemen setelah animasi selesai agar tidak membebani memori
  setTimeout(() => {
    petal.remove();
  }, 10000);
}

// Jalankan pembuat kelopak setiap 500ms
setInterval(createPetal, 500);

function copyToClipboard(elementId, btn) {
  const text = document.getElementById(elementId).innerText;
  
  // Buat element temporary untuk menyalin
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  // Efek Feedback Tombol
  const originalText = btn.innerHTML;
  btn.innerHTML = "<span>✅</span> Berhasil Disalin";
  btn.classList.add('copied');

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove('copied');
  }, 2000);
}

// Tambahkan ini jika belum ada
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000, // Durasi animasi 1 detik
    once: true,     // Animasi hanya jalan sekali saat di-scroll
  });
});

function kirimKeWA() {
  const nama = document.getElementById('nama-guest').value;
  const pesan = document.getElementById('pesan-guest').value;
  // const nomorWA = "6282386883145"; 
  const nomorWA = "6282374694215"; 

  if (nama && pesan) {
    const formatPesan = `Halo Febi & Riska, Saya *${nama}* mengucapkan: \n\n"${pesan}"`;
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(formatPesan)}`;
    window.open(url, '_blank');
  } else {
    alert("Mohon isi nama dan ucapan Anda terlebih dahulu.");
  }
}

function buatLink() {
    const nama = document.getElementById('inputNamaTamu').value;
    const hasilDiv = document.getElementById('hasilLink');
    const copyArea = document.getElementById('copyLink');
    const waBtn = document.getElementById('shareWA');

    if (nama === "") {
        alert("Masukkan nama tamu dulu ya!");
        return;
    }

    // Ambil URL dasar website kamu (nanti ganti dengan domain aslimu)
    const baseUrl = window.location.href.split('?')[0]; 
    
    // Buat link dengan parameter ?to=Nama+Tamu
    const linkUndangan = `${baseUrl}?to=${encodeURIComponent(nama)}`;
    
    // Pesan WhatsApp
    const pesanWA = `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *${nama}* untuk hadir di acara pernikahan kami.\n\nDetail Undangan: ${linkUndangan}\n\nTerima kasih.`;

    // Tampilkan hasil
    hasilDiv.style.display = "block";
    copyArea.value = linkUndangan;
    waBtn.href = `https://wa.me/?text=${encodeURIComponent(pesanWA)}`;
}

// FUNGSI OTOMATIS TAMPILKAN NAMA DI COVER
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    const displayNama = document.getElementById('guestName');

    if (namaTamu) {
        const namaRapi = namaTamu.split(' ')
            .map(word => {
                // 1. Jika kata mengandung titik (seperti S.T. atau S.Kom), biarkan sesuai aslinya
                if (word.includes('.')) {
                    return word; 
                }
                
                // 2. Jika kata adalah simbol atau kata sambung, buat jadi huruf kecil
                if (word.toLowerCase() === '&' || word.toLowerCase() === 'dan') {
                    return word.toLowerCase();
                }

                // 3. Sisanya, buat format Title Case (Huruf Besar di Awal)
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ');
            
        displayNama.innerText = namaRapi;
    } else {
        displayNama.innerText = "Nama Tamu";
    }
});