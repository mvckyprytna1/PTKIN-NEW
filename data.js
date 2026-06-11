const materials = [
  {
    id: "al-quran-hadits",
    title: "Al-Qur'an dan Hadits",
    description: "Materi dasar tentang Al-Qur'an, Hadits, sanad, matan, dan ilmu tafsir.",
    readTime: "15 menit",
    category: "Keislaman",
    chapters: [
      {
        id: "pengertian-quran",
        title: "Pengertian & Sejarah Al-Qur'an",
        content: "<p class='mb-3'>Secara bahasa, Al-Qur'an berarti 'bacaan'. Secara istilah, kalam Allah yang diturunkan kepada Nabi Muhammad SAW melalui perantara Malaikat Jibril, bernilai ibadah bagi yang membacanya.</p><p class='mb-3'>Al-Qur'an diturunkan secara berangsur-angsur selama kurang lebih 23 tahun (22 tahun, 2 bulan, 22 hari).</p>",
        keyPoints: ["Diturunkan di Mekkah (Makkiyah) dan Madinah (Madaniyah)", "Terdiri dari 114 Surah dan 30 Juz"],
        mustRemember: ["Makkiyah: Ayat pendek, tauhid, surga/neraka.", "Madaniyah: Ayat panjang, hukum, muamalah."],
        traps: ["Sering tertukar antara pengertian Sanad (jalur perawi) dan Matan (isi hadits)."],
        examples: [
          {
            question: "Ayat yang tergolong Madaniyah umumnya membahas tentang...",
            answer: "Hukum syariat dan muamalah.",
            explanation: "Fase Madinah adalah fase pembentukan masyarakat Islam, sehingga ayat yang turun berfokus pada hukum."
          }
        ]
      },
      {
        id: "ilmu-hadits",
        title: "Ilmu Hadits & Pembagiannya",
        content: "<p class='mb-3'>Hadits adalah segala perkataan, perbuatan, dan ketetapan (taqrir) Nabi Muhammad SAW. Hadits berfungsi sebagai bayan (penjelas) dari ayat-ayat Al-Qur'an yang masih mujmal (global).</p>",
        keyPoints: ["Mutawatir: Diriwayatkan banyak orang, mustahil dusta.", "Ahad: Diriwayatkan sedikit orang, terbagi jadi Shahih, Hasan, Dhaif."],
        mustRemember: ["Sanad: Rantai perawi.", "Matan: Teks/isi hadits.", "Mukharrij: Orang yang membukukan hadits (misal: Bukhari)."],
        traps: ["Dhaif (lemah) bukan berarti palsu (Maudhu'). Hadits palsu sama sekali tidak boleh dipakai."],
        examples: []
      }
    ]
  },
  {
    id: "sejarah-islam",
    title: "Sejarah Kebudayaan Islam",
    description: "Perkembangan Islam dari masa Kenabian, Khulafaur Rasyidin, hingga Bani Umayyah & Abbasiyah.",
    readTime: "25 menit",
    category: "Sejarah",
    chapters: [
      {
        id: "khulafaur-rasyidin",
        title: "Masa Khulafaur Rasyidin",
        content: "<p class='mb-3'>Masa kepemimpinan empat sahabat nabi setelah Rasulullah wafat: Abu Bakar, Umar bin Khattab, Utsman bin Affan, dan Ali bin Abi Thalib.</p>",
        keyPoints: ["Abu Bakar: Memberantas nabi palsu, pengumpulan mushaf.", "Umar: Perluasan wilayah, kalender Hijriah.", "Utsman: Kodifikasi Al-Qur'an (Mushaf Utsmani).", "Ali: Memindahkan ibu kota ke Kufah."],
        mustRemember: ["Perang Riddah terjadi pada masa Abu Bakar untuk melawan orang murtad."],
        traps: ["Pengumpulan Al-Qur'an dimulai zaman Abu Bakar, tapi diseragamkan (kodifikasi) zaman Utsman."],
        examples: []
      }
    ]
  }
];

const ujianBesokData = {
  tips: [
    "Fokus eliminasi 2 jawaban yang paling tidak logis pada soal Bahasa Indonesia/Inggris.",
    "Hafalkan perbedaan Makkiyah (Tauhid/Kiamat) dan Madaniyah (Hukum/Perang).",
    "Pahami letak kerajaan Islam di Nusantara (Samudra Pasai = Aceh, Demak = Jawa)."
  ],
  istilah: [
    { term: "Sanad", definition: "Jalur/Rantai perawi hadits." },
    { term: "Matan", definition: "Isi/teks dari hadits." },
    { term: "Qiyas", definition: "Menetapkan hukum suatu kejadian yang tidak ada nash-nya dengan kejadian yang ada nash-nya." }
  ]
};
