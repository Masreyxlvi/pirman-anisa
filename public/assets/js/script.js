feather.replace();

AOS.init({
    duration: 1000,
    offset: 200,
    easing: "ease-in-out",
    delay: 0,
});

var popup = document.getElementById("myPopup");
var closeBtn = document.getElementsByClassName("close")[0];
var isAudioPlaying = true;

// Fungsi untuk menampilkan popup
function showPopup() {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(function () {
        popup.style.transform = "translateY(0)";
        popup.style.opacity = 1;
    }); // Tambahkan penundaan agar animasi berfungsi dengan baik
}

// Fungsi untuk menyembunyikan popup
function hidePopup() {
    var audio = document.getElementById("myAudio");
    audio.play(); // Menghentikan audio
    popup.style.transform = "translateY(-100%)";
    document.body.style.overflow = "auto";
    popup.style.opacity = 0;
    setTimeout(function () {
        popup.style.display = "none";
        popup.style.opacity = 1;
        popup.style.transform = "translateY(0)"; // Reset transformasi saat popup disembunyikan
    }, 5000); // Waktu yang sesuai dengan durasi transisi
}

// Tambahkan event listener pada tombol tutup
closeBtn.addEventListener("click", hidePopup);
// Tampilkan popup setelah halaman dimuat
window.onload = showPopup;

$(document).ready(function () {
    const navbar = $(".custom-navbar");
    let isScrolling = false;

    function debounce(func, wait = 20) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    }

    function checkScroll() {
        if ($(window).width() >= 1200) {
            const showNavbarY = 600;
            const scrollY = $(window).scrollTop();

            if (scrollY > showNavbarY) {
                navbar.addClass("show-navbar");
            } else {
                navbar.removeClass("show-navbar");
            }
        }
    }

    $(window).on("scroll", function () {
        if (!isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(() => {
                checkScroll();
                isScrolling = false;
            });
        }
    });

    // audio.play();

    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            let hash = this.hash;

            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

    const mobileNavbar = $(".mobile-navbar");
    const navToggle = $(".nav-toggle");
    const navMenu = $(".nav-menu");

    // Toggle the active class on the navbar elements
    navToggle.on("click", function () {
        console.log("clicked");
        mobileNavbar.toggleClass("active");
        navMenu.toggleClass("active");
        navToggle.toggleClass("active");
    });

    // Mengatur waktu akhir perhitungan mundur
    var countDownDate = new Date("Jul 16, 2023 10:00:00").getTime();

    // Memperbarui hitungan mundur setiap 1 detik
    var x = setInterval(function () {
        // Untuk mendapatkan tanggal dan waktu hari ini
        var now = new Date().getTime();

        // Temukan jarak antara sekarang dan tanggal hitung mundur
        var distance = countDownDate - now;

        // Perhitungan waktu untuk hari, jam, menit dan detik
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Keluarkan hasil dalam elemen dengan id = "demo"
        document.getElementById("hari").innerHTML = days;
        document.getElementById("jam").innerHTML = hours;
        document.getElementById("menit").innerHTML = minutes;
        document.getElementById("detik").innerHTML = seconds;

        // Jika hitungan mundur selesai, tulis beberapa teks
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
});
function salinNoRek() {
    var teks = document.getElementById("textSalin").textContent;
    var teksTanpaTanda = teks.replace(/-/g, "");

    var textarea = document.createElement("textarea");
    textarea.value = teksTanpaTanda;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toastr["success"]("No Dana Berhasil Disalin", "Success");
}
