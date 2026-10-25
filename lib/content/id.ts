import type { ContentPage } from './pages';

const sleepSources = [
  {
    title: 'NHLBI · Fase dan tahapan tidur',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · Kebiasaan tidur sehat',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · Tentang tidur',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource = {
  title: 'NHLBI · Berapa lama tidur yang cukup?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource = {
  title: 'MaatWork · Situs publik',
  url: 'https://maat.work',
};

export const idPages: ContentPage[] = [
  {
    path: '/id',
    locale: 'id',
    kind: 'tool',
    key: 'home',
    title: 'Kalkulator Siklus Tidur: Tentukan Jam Tidur',
    description: 'Pilih jam bangun dan bandingkan perkiraan jam tidur berdasarkan siklus tidur. Privat dan edukatif; bukan nasihat medis.',
    heading: 'Kalkulator Siklus Tidur',
    intro: 'Masukkan jam bangun yang Anda perlukan dan gunakan perkiraannya untuk memilih jam tidur yang realistis.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Mulai dari waktu yang tidak bisa diubah',
        paragraphs: [
          'Jam bangun yang tetap memberikan titik acuan yang berguna bagi perhitungan. Alat ini menghitung mundur dari waktu tersebut dengan perkiraan siklus tidur, sambil menyisihkan jeda singkat untuk tertidur. Anda dapat menggunakan hasilnya saat merencanakan hari kerja, perjalanan, atau janji pada pagi hari.',
          'Berapa lama Anda tidur dari 02:45 hingga 07:33? Rentangnya adalah 4 jam 48 menit. Jika itu adalah waktu Anda berada di tempat tidur, kurangi waktu terjaga: dengan jeda bawaan 15 menit untuk tertidur dan tanpa terbangun, perkiraan waktu tidur tersisa adalah 4 jam 33 menit. Jeda tersebut adalah asumsi perencanaan, bukan pengukuran; kalkulator tidak dapat mengetahui berapa lama Anda benar-benar tidur.',
        ],
      },
      {
        id: 'seven-am-example',
        heading: 'Contoh: bangun pukul 07:00',
        paragraphs: [
          'NHLBI merekomendasikan tidur selama 7 hingga 9 jam setiap malam bagi orang dewasa. Utamakan waktu tidur yang cukup sebelum mencoba menyesuaikan jam bangun dengan perkiraan batas siklus.',
          'Waktu mulai berbaring pada malam sebelumnya ini menggunakan asumsi siklus 90 menit untuk perencanaan, jeda 15 menit untuk tertidur, dan malam tanpa perubahan jam. Asumsi ini bukan pengukuran tahapan tidur Anda atau waktu yang Anda perlukan untuk tertidur.',
        ],
        table: {
          headers: ['Mulai berbaring', 'Siklus perencanaan', 'Perkiraan durasi tidur'],
          rows: [
            ['21:45', '6', '9 jam'],
            ['23:15', '5', '7 jam 30 menit'],
          ],
        },
      },
      {
        id: 'estimated-options',
        heading: 'Baca pilihan sebagai rentang kemungkinan',
        paragraphs: [
          'Siklus tidur sering digambarkan berlangsung sekitar 90 menit, tetapi siklus yang sebenarnya berbeda antarorang dan antarmalam. Hasil yang tepat berada di batas perkiraan siklus pun dapat terasa berbeda dari satu malam ke malam berikutnya. Pilihan ini membantu Anda membandingkan waktu yang tersedia di tempat tidur; bukan memprediksi tahapan tidur yang akan Anda alami.',
          'Utamakan pilihan yang menyediakan waktu tidur yang cukup dan sesuai dengan keseharian Anda. Pilihan yang lebih larut mungkin realistis pada malam yang sibuk, sedangkan pilihan yang lebih awal memberi lebih banyak waktu saat Anda bisa mulai bersantai lebih cepat.',
        ],
        bullets: [
          'Gunakan saran yang lebih awal jika Anda dapat menyediakan waktu tidur malam yang lebih panjang.',
          'Pertahankan jam bangun yang sama bila memungkinkan agar rutinitas memiliki acuan yang stabil.',
          'Jika suatu pilihan menyisakan waktu tidur yang terlalu sedikit, anggap itu rencana yang dibatasi keadaan, bukan sasaran.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Jadikan satu perkiraan sebagai rutinitas',
        paragraphs: [
          'Pilih jam tidur yang dapat Anda pertahankan, lalu mulai transisi yang tenang sebelumnya. Redupkan cahaya terang, selesaikan tugas yang menuntut perhatian, dan siapkan keperluan pagi agar perkiraan lebih mudah diikuti. Kalkulator dapat mengatur waktu; rutinitas dan kesempatan Anda untuk tidur tetap berperan penting.',
          'Halaman ini ditujukan untuk perencanaan istirahat yang bersifat edukatif. Tidur bervariasi, dan kesulitan tidur yang menetap, kantuk berlebihan pada siang hari, mendengkur keras, terengah-engah, atau jeda napas merupakan alasan untuk berkonsultasi dengan tenaga kesehatan yang berkualifikasi.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/id/waktu-tidur', '/id/kalkulator-tidur-siang', '/id/siklus-tidur', '/id/berapa-jam-tidur'],
    updated: '2026-10-25',
  },
  {
    path: '/id/waktu-tidur',
    locale: 'id',
    kind: 'tool',
    key: 'bedtime',
    title: 'Kalkulator Jam Tidur',
    description: 'Cari perkiraan jam tidur dari target jam bangun, dengan jeda untuk waktu yang diperlukan agar tertidur.',
    heading: 'Tentukan jam tidur Anda',
    intro: 'Pilih jam bangun yang Anda perlukan, lalu bandingkan perkiraan jam tidur yang sesuai untuk malam Anda.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Hitung mundur dari pagi Anda',
        paragraphs: [
          'Jika jadwal pagi sudah tetap, jam tidur perlu direncanakan dengan menghitung mundur. Kalkulator ini mengurangi beberapa perkiraan siklus 90 menit, lalu menambahkan jeda 15 menit untuk waktu yang mungkin diperlukan agar tertidur. Waktu yang ditampilkan adalah saat mulai berbaring di tempat tidur, bukan janji kapan Anda akan tertidur.',
          'Misalnya, jam bangun pukul 07:00 dengan lima perkiraan siklus menghasilkan durasi tidur 7 jam 30 menit. Dengan jeda perencanaan, waktu mulai berbaring yang disarankan adalah sekitar 23:15. Pada malam lain, Anda mungkin memerlukan pilihan yang lebih awal jika membutuhkan lebih banyak waktu di tempat tidur.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Pilih waktu yang benar-benar bisa Anda sisihkan',
        paragraphs: [
          'Hasil yang paling awal tidak otomatis menjadi pilihan yang tepat. Cari waktu yang memungkinkan Anda menyelesaikan kegiatan malam tanpa terburu-buru dan tetap menyediakan kesempatan tidur yang wajar. Jika waktu Anda sudah terbatas, alat ini dapat memperjelas perhitungannya, tetapi tidak dapat mengubah malam yang singkat menjadi malam dengan tidur yang cukup.',
          'Siklus tidur umumnya digambarkan sekitar 90 menit, sedangkan NHLBI menjelaskan bahwa siklus dapat berulang setiap 80 hingga 100 menit. Rentang itulah yang membuat hasil ini berupa perkiraan. Gunakan waktunya untuk mengatur jadwal, lalu perhatikan bagaimana tidur dan energi Anda pada pagi hari merespons.',
        ],
        bullets: [
          'Utamakan pilihan yang lebih awal jika sesuai tanpa mengurangi waktu untuk bersantai sebelum tidur.',
          'Gunakan target jam bangun yang sama pada sebagian besar hari jika jadwal memungkinkan.',
          'Tinggalkan kalkulator setelah menemukan rencana yang bisa dijalankan; terus mengamati jam dapat menambah tekanan.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Permudah satu jam terakhir sebelum tidur',
        paragraphs: [
          'Gunakan satu jam sebelum tidur untuk kegiatan yang tidak terlalu merangsang: siapkan tas, pilih pakaian, redupkan lampu, dan tunda perencanaan yang berat hingga besok. Kamar yang sejuk, tenang, dan nyaman serta lebih sedikit gangguan perangkat elektronik dapat membuat transisi yang direncanakan lebih realistis.',
          'Kalkulator ini adalah alat bantu edukatif untuk merencanakan istirahat, bukan nasihat medis. Jika kesulitan tertidur terus berulang, atau Anda khawatir tentang kantuk siang hari, mendengkur, terengah-engah, atau jeda napas, mintalah panduan tenaga medis yang berkualifikasi.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/id', '/id/kalkulator-tidur-siang', '/id/waktu-untuk-tertidur', '/id/jadwal-tidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/kalkulator-tidur-siang',
    locale: 'id',
    kind: 'tool',
    key: 'nap',
    title: 'Kalkulator Tidur Siang',
    description: 'Rencanakan tidur siang singkat atau satu siklus penuh dengan perkiraan lokal sederhana dan penjelasan batas siklus tidur.',
    heading: 'Luangkan waktu untuk tidur siang',
    intro: 'Pilih tidur siang singkat atau satu siklus penuh, lalu gunakan perkiraan untuk menjaga jadwal sore dan malam Anda.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Pilih bentuk tidur siang Anda',
        paragraphs: [
          'Tidur siang singkat memberi jeda sebentar tanpa merencanakan satu siklus tidur penuh. Pilihan satu siklus penuh memberi lebih banyak waktu, tetapi juga membutuhkan jeda yang lebih panjang dalam hari Anda dan mungkin membuat Anda kurang siap untuk tidur malam. Kalkulator menyajikan keduanya sebagai pilihan perencanaan, bukan jaminan tentang perasaan Anda saat bangun.',
          'Untuk orang dewasa, NHLBI menyebut tidur siang paling lama 20 menit sebagai salah satu pilihan ketika tidur siang bermanfaat. Jika memilih tidur siang yang lebih panjang, sisihkan waktu tambahan setelahnya untuk duduk, minum air, dan kembali beraktivitas sebelum mengemudi atau melakukan hal yang memerlukan perhatian penuh.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Hitung juga waktu di sekitar tidur siang',
        paragraphs: [
          'Waktu untuk menenangkan diri juga penting. Jika merencanakan tidur siang 20 menit pada pukul 14:00, sisihkan sedikit lebih dari 20 menit untuk transisi dan bangun kembali. Tempat yang tenang, redup, dan nyaman dapat membuat rencana lebih mudah diikuti, sedangkan tidur siang yang terlalu sore mungkin menyulitkan tidur malam bagi sebagian orang.',
          'Durasi tidur siang hanyalah satu bagian dari keputusan. Pertimbangkan kapan Anda perlu kembali waspada, sudah seberapa sore, dan apakah tidur siang digunakan untuk mengganti pola tidur malam yang terlalu sedikit.',
        ],
        bullets: [
          'Pilih tidur siang singkat jika membutuhkan jeda sebentar dan masih memiliki jam tidur malam yang biasa.',
          'Sisihkan jeda setelah bangun sebelum mengemudi, berolahraga, atau mengambil keputusan penting.',
          'Jika tidur siang berulang kali menggantikan tidur malam, tinjau jadwal Anda dan diskusikan masalah yang berlanjut dengan tenaga profesional.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Tetap pertimbangkan tidur malam',
        paragraphs: [
          'Tidur siang dapat menjadi bagian dari rutinitas sehat, tetapi tidak menggantikan kesempatan tidur teratur yang dibutuhkan kebanyakan orang dewasa. Panduan CDC menyatakan bahwa orang dewasa usia 18 hingga 60 tahun umumnya perlu tidur setidaknya tujuh jam per hari. Kebutuhan dan kualitas tidur Anda dapat berbeda, jadi gunakan hasilnya sebagai cara sederhana untuk merencanakan waktu.',
          'Halaman ini hanya untuk perencanaan istirahat yang bersifat edukatif. Halaman ini tidak mendiagnosis atau mengobati masalah tidur. Berkonsultasilah dengan tenaga kesehatan yang berkualifikasi jika Anda mengalami kesulitan tidur yang menetap, kantuk siang hari yang sangat kuat, atau gejala gangguan pernapasan saat tidur.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/id', '/id/waktu-tidur', '/id/jadwal-tidur', '/id/waktu-untuk-tertidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/siklus-tidur',
    locale: 'id',
    kind: 'guide',
    key: 'cycles',
    title: 'Siklus Tidur: Arti Perkiraan 90 Menit',
    description: 'Pahami cara kerja siklus tidur, mengapa 90 menit hanya perkiraan, dan cara merencanakan tidur tanpa menganggapnya sebagai janji.',
    heading: 'Siklus tidur adalah pola, bukan pengatur waktu',
    intro: 'Perkiraan siklus sederhana dapat membantu mengatur jam tidur atau alarm, asalkan Anda memberi ruang bagi variasi yang wajar.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'Apa yang dijelaskan oleh siklus tidur',
        paragraphs: [
          'Selama tidur malam, otak dan tubuh melewati fase non-REM dan REM. NHLBI menjelaskan bahwa siklus berulang kira-kira setiap 80 hingga 100 menit, dan empat hingga enam siklus lazim terjadi dalam semalam. Angka ini menjelaskan pola umum yang diamati dalam studi tidur; bukan pengatur waktu pribadi yang berbunyi pada menit yang sama setiap malam.',
          'Perbandingan tahapan berubah sepanjang malam. Tidur non-REM dalam cenderung lebih banyak terjadi pada bagian awal, sedangkan tidur REM biasanya mengambil porsi lebih besar kemudian. Bangun mendekati batas perkiraan siklus mungkin terasa berbeda dari bangun di tengah suatu tahap, tetapi perhitungan waktu tidak dapat mengetahui tahap yang sedang Anda alami atau menjamin perasaan tertentu pada pagi hari.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'Tahapan tidur dalam bahasa sederhana',
        paragraphs: [
          'Tidur non-REM mencakup transisi menuju tidur, tahap ketika Anda sudah tertidur, dan tidur gelombang lambat yang lebih dalam. Tidur REM mencakup aktivitas otak yang aktif, gerakan mata cepat, dan relaksasi otot sementara. Tahapan ini membentuk urutan berulang, tetapi urutannya tidak identik pada setiap orang atau setiap malam.',
        ],
        bullets: [
          'Tahap 1 adalah transisi singkat dari terjaga menuju tidur.',
          'Tahap 2 adalah tahap tidur stabil yang biasanya mengambil porsi besar dalam semalam.',
          'Tahap 3 adalah tidur gelombang lambat yang lebih dalam, sering kali lebih banyak pada awal malam.',
          'REM adalah fase tersendiri yang umumnya lebih banyak terjadi pada bagian akhir malam.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Mengapa kalkulator menggunakan 90 menit',
        paragraphs: [
          'Sembilan puluh menit adalah titik tengah yang praktis untuk perhitungan dalam rentang 80–100 menit yang lebih luas. Situs ini menggunakannya sebagai rata-rata praktis agar hasilnya cepat dipahami. Angka tersebut lebih tepat dibaca sebagai interval perencanaan, bukan klaim tentang susunan tidur Anda yang persis.',
          'Misalnya, jika ingin bangun pukul 07:00, mengurangi lima interval 90 menit menghasilkan perkiraan awal tidur pukul 23:30. Menambahkan jeda 15 menit untuk tertidur memajukan waktu mulai berbaring yang disarankan menjadi sekitar 23:15. Jam tidur yang lebih larut pun dapat memberi hasil berbeda pada malam ketika siklus Anda sebenarnya lebih pendek atau lebih panjang.',
        ],
        table: {
          headers: ['Perkiraan siklus', 'Durasi tidur', 'Jika bangun pukul 07:00'],
          rows: [
            ['4', '6 jam', 'Mulai berbaring 00:45 dengan 15 menit untuk tertidur'],
            ['5', '7 jam 30 menit', 'Mulai berbaring 23:15 dengan 15 menit untuk tertidur'],
            ['6', '9 jam', 'Mulai berbaring 21:45 dengan 15 menit untuk tertidur'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'Apa yang dapat mengubah pola',
        paragraphs: [
          'Waktu tidur dipengaruhi lebih dari sekadar perhitungan jam tidur. Jadwal tidur dan bangun, paparan cahaya, stres, penyakit, alkohol, kafein, olahraga, serta gangguan dapat memengaruhi kapan Anda tertidur dan bagaimana malam terasa. Usia juga mengubah komposisi tahapan tidur. Perkiraan siklus tidak dapat menyesuaikan semua faktor ini.',
          'Gunakan angkanya sebagai alat bantu perencanaan yang tidak membebani. Jika hasilnya bertentangan dengan waktu yang Anda butuhkan, utamakan kesempatan tidur yang lebih panjang. Perhitungan bukan alasan untuk mempersingkat malam hanya demi mencocokkan kelipatan yang rapi.',
        ],
        bullets: [
          'Sediakan cukup waktu di tempat tidur untuk kebutuhan tidur Anda yang biasa, termasuk waktu untuk menenangkan diri.',
          'Bandingkan bagaimana jadwal yang konsisten terasa selama beberapa hari, bukan menilai satu kali alarm.',
          'Anggap malam yang sulit sebagai informasi tentang rutinitas, bukan kegagalan perhitungan.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'Cara praktis menggunakan panduan ini',
        paragraphs: [
          'Mulailah dengan jam bangun yang dapat Anda pertahankan, pilih perkiraan jam tidur yang memberi kesempatan tidur cukup, dan siapkan transisi yang tenang. Lalu berhenti menghitung dan biarkan malam berjalan. Jika Anda sering tidak bisa tidur, sangat mengantuk pada siang hari, atau mengalami mendengkur keras, terengah-engah, atau jeda napas, berkonsultasilah dengan tenaga kesehatan yang berkualifikasi. Panduan edukatif ini bukan nasihat medis.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/id', '/id/waktu-tidur', '/id/berapa-jam-tidur', '/id/waktu-untuk-tertidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/berapa-jam-tidur',
    locale: 'id',
    kind: 'guide',
    key: 'duration',
    title: 'Berapa Jam Tidur yang Dibutuhkan Orang Dewasa?',
    description: 'Panduan praktis tentang durasi dan kualitas tidur orang dewasa, serta cara memilih jadwal yang menyediakan cukup waktu untuk istirahat.',
    heading: 'Berapa lama tidur yang perlu direncanakan orang dewasa?',
    intro: 'Mulailah dengan waktu tidur yang cukup, lalu gunakan energi, jadwal, dan kualitas tidur Anda untuk menyempurnakan rencana.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Gunakan rekomendasi sebagai titik awal',
        paragraphs: [
          'Panduan CDC menyatakan bahwa orang dewasa usia 18 hingga 60 tahun umumnya perlu tidur 7 jam atau lebih per hari. NHLBI biasanya menyebut rentang 7 hingga 9 jam untuk orang dewasa. Angka ini adalah panduan bagi populasi, bukan nilai yang harus Anda capai dengan sempurna setiap malam. Kebutuhan individu, kesehatan, usia, jadwal, dan kualitas tidur berbeda-beda.',
          'Pertanyaan yang berguna bukan hanya “Jam berapa saya harus tidur?”, tetapi juga “Berapa banyak waktu yang bisa saya sisihkan untuk tidur sebelum memulai hari?”. Jika bangun pukul 06:30 dan ingin tidur delapan jam, titik awal perhitungannya adalah mulai tertidur pukul 22:30. Jika biasanya memerlukan 15 menit untuk tertidur, mulai berbaring sekitar pukul 22:15 memberi ruang dalam rencana.',
        ],
        table: {
          headers: ['Kelompok dewasa', 'Acuan umum', 'Catatan perencanaan'],
          rows: [
            ['Usia 18–60 tahun', '7 jam atau lebih', 'Sediakan kesempatan tidur yang teratur dan perhatikan kemampuan Anda beraktivitas.'],
            ['Usia 61–64 tahun', '7–9 jam', 'Rentang dapat berguna ketika kebutuhan dan rutinitas berubah seiring usia.'],
            ['Usia 65 tahun ke atas', '7–8 jam', 'Gunakan rentang sebagai konteks, bukan diagnosis pribadi.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'Durasi penting, kualitas juga penting',
        paragraphs: [
          'Tujuh jam di tempat tidur tidak selalu sama dengan tujuh jam tertidur. Sering terbangun, waktu yang lama untuk tertidur, atau bangun tanpa merasa segar dapat mengurangi istirahat yang bermanfaat sepanjang malam. CDC menggambarkan tidur berkualitas sebagai tidur yang tidak terputus dan menyegarkan, sehingga target durasi perlu disertai pertanyaan tentang bagaimana malam sebenarnya berlangsung.',
          'Kalkulator dapat menunjukkan rentang waktu, tetapi tidak dapat mengukur kualitas tidur. Amati pola selama beberapa hari: jam tidur, jam bangun, terbangun saat malam, tidur siang, kafein, alkohol, olahraga, dan tingkat kewaspadaan Anda. Catatan singkat dapat membantu melihat apakah masalahnya adalah kesempatan tidur yang terlalu sedikit, jadwal yang tidak teratur, atau masalah tidur berulang yang memerlukan perhatian profesional.',
        ],
        bullets: [
          'Pertahankan jam bangun yang konsisten sebelum mengoptimalkan beberapa menit dalam perhitungan jam tidur.',
          'Buat kamar tidur tenang, nyaman, dan cukup sejuk agar Anda dapat menenangkan diri.',
          'Kurangi layar terang dan tugas yang menuntut perhatian menjelang akhir malam.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Terapkan perhitungan dalam minggu yang nyata',
        paragraphs: [
          'Misalkan alarm hari kerja Anda berbunyi pukul 06:45. Rencana tidur 7 jam 30 menit mengarah pada perkiraan awal tidur pukul 23:15. Jika perlu sekitar 15 menit untuk tertidur, mulailah bersiap sekitar pukul 23:00. Anda mungkin memilih waktu mulai berbaring yang lebih awal pada malam setelah tidur larut, tetapi pertahankan acuan pagi yang realistis.',
          'Akhir pekan dapat menggoda Anda untuk menggeser seluruh jadwal. Perubahan kecil mungkin lebih mudah dijalani daripada pergeseran besar. NHLBI dan CDC sama-sama menekankan waktu yang teratur sebagai kebiasaan tidur yang bermanfaat. Gunakan tabel untuk menyesuaikan rencana dengan kalender, bukan sebagai aturan yang mengesampingkan pekerjaan, tugas merawat orang lain, perjalanan, atau perasaan Anda.',
        ],
        table: {
          headers: ['Sasaran', 'Contoh waktu', 'Manfaatnya'],
          rows: [
            ['Bangun', '06:45', 'Menjadi acuan pagi dan mempermudah perhitungan jam tidur.'],
            ['Mulai berbaring', '23:00', 'Menyediakan jeda singkat untuk tertidur sebelum awal tidur yang direncanakan.'],
            ['Kesempatan tidur', '7 jam 45 menit', 'Mencakup jeda 15 menit, bukan menghitungnya sebagai tidur.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Ketahui kapan kalkulator tidak cukup',
        paragraphs: [
          'Kesulitan tertidur yang menetap, sering terbangun, kantuk siang hari yang kuat, mendengkur keras, terengah-engah, atau jeda napas memerlukan penilaian tenaga kesehatan yang berkualifikasi. Catatan tidur dapat membantu Anda menjelaskan polanya: catat kapan mulai berbaring, kapan bangun, tidur siang, olahraga, kafein atau alkohol, obat-obatan, dan seberapa segar perasaan Anda.',
          'Panduan ini adalah konten edukatif tentang istirahat dan kesejahteraan. Panduan ini tidak mendiagnosis atau mengobati kondisi tertentu, dan durasi yang lebih panjang tidak otomatis lebih baik bagi setiap orang. Gunakan rekomendasi dewasa sebagai titik awal, buat rutinitas yang bisa dijalankan, dan mintalah panduan pribadi jika pola tersebut terus mengganggu kehidupan sehari-hari.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/id', '/id/siklus-tidur', '/id/jadwal-tidur', '/id/waktu-untuk-tertidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/waktu-untuk-tertidur',
    locale: 'id',
    kind: 'guide',
    key: 'latency',
    title: 'Berapa Lama Waktu untuk Tertidur?',
    description: 'Pahami latensi tidur, gunakan jeda perencanaan sederhana, dan ketahui kapan kesulitan berulang memerlukan bantuan profesional.',
    heading: 'Rencanakan waktu antara berbaring dan tertidur',
    intro: 'Proses tertidur adalah bagian dari malam. Sertakan transisi itu, alih-alih menganggap jam tidur sebagai tombol yang langsung membuat Anda tertidur.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'Latensi tidur adalah transisi yang wajar',
        paragraphs: [
          'Latensi tidur adalah waktu antara mencoba tidur dan benar-benar tertidur. Durasinya berubah dari satu malam ke malam berikutnya. Anda mungkin cepat tertidur setelah hari yang melelahkan, memerlukan waktu lebih lama ketika pikiran sibuk, atau lebih lama terjaga ketika jadwal tidak teratur. Satu perkiraan tidak dapat menentukan apakah ada masalah.',
          'Untuk perencanaan, kalkulator ini menggunakan jeda bawaan 15 menit. Angka tersebut membuat perhitungan sederhana dan memberi kelonggaran pada hasil jam tidur. Angka itu bukan target, janji, atau pengukuran dari studi tidur. Jika pola pribadi Anda berbeda, gunakan hasilnya sebagai pengingat untuk memulai rutinitas lebih awal atau menyediakan lebih banyak waktu di tempat tidur.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'Lihat apa yang berubah karena jeda',
        paragraphs: [
          'Misalkan Anda perlu sudah tertidur sekitar pukul 23:00. Jika biasanya perlu 15 menit untuk tertidur, mulai berbaring pukul 22:45 memberi jeda yang wajar dalam perhitungan. Jika durasi tidur yang direncanakan adalah 7 jam 30 menit dan jam bangun pukul 07:00, perhitungan yang sama menempatkan waktu mulai berbaring pada pukul 23:15 untuk perkiraan lima siklus: 07:00 dikurangi 7 jam 30 menit dikurangi 15 menit.',
          'Hasil ini membantu memisahkan dua pertanyaan: berapa lama Anda ingin tidur, dan berapa banyak waktu yang Anda perlukan untuk bersiap tertidur. Memisahkan keduanya dapat mengurangi tekanan untuk langsung tertidur begitu kepala menyentuh bantal.',
        ],
        table: {
          headers: ['Rencana awal tidur', 'Jeda', 'Mulai berbaring'],
          rows: [
            ['22:30', '15 menit', '22:15'],
            ['23:00', '30 menit', '22:30'],
            ['23:15', '15 menit', '23:00'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Permudah transisi menuju tidur',
        paragraphs: [
          'Gunakan bagian akhir malam untuk mengurangi hambatan: selesaikan tugas praktis, redupkan cahaya terang, jauhkan ponsel jika membuat Anda tetap terjaga, serta jaga kamar tetap tenang dan nyaman. Urutan yang dapat diulang lebih penting daripada rutinitas yang rumit. Usahakan tidak menjadikan jam sebagai ujian yang bisa Anda lulus atau gagal.',
          'Kafein, nikotin, alkohol, makan berat terlalu malam, olahraga intens menjelang tidur, stres, dan jadwal yang tidak konsisten dapat memengaruhi transisi ini. Anda tidak perlu mengubah semuanya sekaligus. Pilih satu penyesuaian kecil, ulangi selama beberapa malam, dan amati polanya alih-alih menilai satu hasil saja.',
        ],
        bullets: [
          'Mulai bersantai sebelum waktu mulai berbaring yang dihitung.',
          'Catat jam tidur, jam bangun, tidur siang, dan hal yang mungkin mengubah suasana malam.',
          'Jika Anda terjaga dan semakin frustrasi, lakukan kegiatan yang tenang hingga kembali mengantuk.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'Ketika kesulitan berulang perlu dibicarakan lebih lanjut',
        paragraphs: [
          'Jika kesulitan tertidur menetap, memengaruhi aktivitas siang hari, atau disertai sering terbangun, kantuk berlebihan, mendengkur keras, terengah-engah, atau jeda napas, mintalah penilaian tenaga kesehatan yang berkualifikasi. Catatan tidur dapat memberi rincian berguna untuk pembicaraan itu tanpa memerlukan alat pelacak atau mikrofon.',
          'Panduan ini adalah konten edukatif tentang istirahat, bukan nasihat medis. Kalkulator dapat menyisihkan waktu untuk transisi, tetapi tidak dapat mendiagnosis gangguan tidur atau menggantikan perawatan pribadi. Tujuan Anda adalah kesempatan tidur yang bisa dipertahankan, bukan angka dengan waktu yang sempurna.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/id/waktu-tidur', '/id', '/id/jadwal-tidur', '/id/berapa-jam-tidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/jadwal-tidur',
    locale: 'id',
    kind: 'guide',
    key: 'schedule',
    title: 'Cara Menyusun Jadwal Tidur',
    description: 'Buat jadwal tidur dewasa yang realistis dengan jam bangun tetap, kesempatan tidur yang cukup, dan ruang untuk kehidupan sehari-hari.',
    heading: 'Susun jadwal tidur yang dapat Anda pertahankan',
    intro: 'Acuan yang konsisten dan waktu tidur yang cukup adalah titik awal yang lebih kuat daripada perhitungan jam tidur yang sempurna.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Pilih acuan pagi terlebih dahulu',
        paragraphs: [
          'Mulailah dari jam bangun yang Anda perlukan pada sebagian besar hari. Hitung mundur untuk menyisihkan setidaknya durasi tidur yang direkomendasikan bagi usia dan keadaan Anda. Untuk orang dewasa usia 18 hingga 60 tahun, panduan CDC adalah 7 jam atau lebih per hari. NHLBI juga menekankan tidur dan bangun pada jam yang sama setiap hari sebagai kebiasaan yang membantu.',
          'Jam bangun sebagai acuan membuat bagian lain dari rencana terlihat jelas. Jika alarm pukul 06:30 dan Anda ingin tidur 8 jam, rencanakan awal tidur sekitar pukul 22:30. Jika biasanya perlu 15 menit untuk tertidur, mulailah berbaring sekitar pukul 22:15. Transisi tambahan itu termasuk dalam jadwal walaupun bukan waktu tidur.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Buat rencana mingguan yang konkret',
        paragraphs: [
          'Tuliskan rencana di samping kewajiban yang membentuk malam Anda. Tujuannya adalah melihat apakah jam tidur yang diusulkan realistis, bukan menambah alasan untuk merasa tertinggal. Jika rapat larut atau tugas merawat orang lain mengubah satu malam, kembali ke acuan saat memungkinkan dan sesuaikan malam berikutnya tanpa mencoba menggantinya dengan perhitungan rumit.',
          'Perbedaan kecil antara hari kerja dan akhir pekan mungkin lebih mudah dikelola daripada pergeseran besar. NHLBI menyarankan menjaga perbedaan sekitar satu jam jika memungkinkan. Pekerjaan, keluarga, perjalanan, dan kesehatan Anda mungkin memerlukan pola lain; gunakan tabel sebagai contoh perencanaan, bukan jadwal yang kaku.',
        ],
        table: {
          headers: ['Hari', 'Target jam bangun', 'Mulai berbaring', 'Kesempatan tidur'],
          rows: [
            ['Senin–Kamis', '06:30', '22:15', '8 jam 15 menit termasuk waktu untuk tertidur'],
            ['Jumat', '06:30', '22:30', '8 jam'],
            ['Sabtu', '07:15', '23:00', '8 jam'],
            ['Minggu', '06:30', '22:15', '8 jam 15 menit termasuk waktu untuk tertidur'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Buat jadwal lebih mudah diikuti',
        paragraphs: [
          'Gunakan satu jam terakhir untuk kegiatan yang sudah dikenal dan tidak terlalu merangsang. Siapkan pakaian atau makanan, kurangi cahaya terang, serta jaga kamar tidur tetap tenang, sejuk, dan nyaman. CDC juga menyarankan menghindari makan besar dan alkohol sebelum tidur serta membatasi kafein pada sore atau malam hari. Pilih perubahan yang sesuai dengan keseharian Anda daripada menyalin daftar panjang yang akhirnya ditinggalkan.',
          'Jadwal lebih mudah dijalankan jika pagi hari turut mendukungnya. Lakukan aktivitas rutin pada siang hari dan luangkan waktu di luar ruangan jika memungkinkan. Tampilkan jam bangun dalam kalender, serta gunakan alarm atau pengingat yang tidak memerlukan akun. Perhitungan dapat memberi arah; pengulangan membuat arah itu bermakna.',
        ],
        bullets: [
          'Utamakan kesempatan tidur sebelum memangkas rencana untuk memasukkan lebih banyak tugas.',
          'Pertahankan urutan singkat untuk bersantai dengan susunan yang sama pada sebagian besar malam.',
          'Tinjau pola setelah beberapa hari, bukan mengubahnya setelah satu malam yang sulit.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Sesuaikan tanpa mengejar angka sempurna',
        paragraphs: [
          'Perjalanan, perubahan jam, kerja sif, penyakit, stres, dan rencana sosial dapat menggeser jadwal. Pada hari seperti itu, gunakan prinsip yang sama: sediakan waktu tidur yang cukup, pertahankan satu acuan jika memungkinkan, dan beri diri Anda transisi yang tenang. Perkiraan siklus 90 menit dapat membantu membandingkan pilihan, tetapi siklus sebenarnya bervariasi dan tidak seharusnya mengalahkan kesempatan tidur yang lebih panjang.',
          'Jika Anda sering tidak dapat mempertahankan jadwal karena tidak bisa tertidur, atau mengalami kantuk berlebihan pada siang hari, mendengkur keras, terengah-engah, atau jeda napas, berkonsultasilah dengan tenaga kesehatan yang berkualifikasi. Panduan ini adalah konten edukatif tentang istirahat, bukan nasihat medis.',
        ],
      },
      {
        id: 'night-shift',
        heading: 'Sif malam dan kerja sif bergilir',
        paragraphs: [
          'Jika Anda bekerja sif malam atau sif bergilir, jadwal siang hari di atas bukan petunjuk pribadi. Pelatihan NIOSH untuk perawat menyarankan menyisihkan waktu tidur setelah tiba di rumah alih-alih menggunakannya untuk pekerjaan rumah, serta menjaga kamar tidur gelap, tenang, dan bebas gangguan. Mintalah orang yang tinggal bersama Anda untuk menghormati waktu tidur tersebut.',
          'Kalkulator hanya membandingkan waktu: kalkulator tidak dapat menyesuaikan ritme sirkadian Anda atau menjamin kewaspadaan. Jangan mengemudi saat mengantuk. Jika kantuk memengaruhi keselamatan di tempat kerja atau saat mengemudi, konsultasikan keadaan Anda dengan tenaga medis yang berkualifikasi dan layanan kesehatan kerja. Ini adalah edukasi, bukan nasihat medis pribadi.',
        ],
      },
    ],
    sources: [...sleepSources, {
      title: 'CDC/NIOSH · Tidur setelah sif malam (arsip pelatihan; diakses 22/10/2026)',
      url: 'https://archive.cdc.gov/www_cdc_gov/niosh/work-hour-training-for-nurses/longhours/mod9/05.html',
    }],
    related: ['/id', '/id/waktu-tidur', '/id/berapa-jam-tidur', '/id/waktu-untuk-tertidur'],
    updated: '2026-10-23',
  },
  {
    path: '/id/tentang',
    locale: 'id',
    kind: 'legal',
    key: 'about',
    title: 'Tentang SleepLike',
    description: 'Kenali penerbit SleepLike, tujuan kalkulator, dan cara konten edukatifnya dikelola.',
    heading: 'Tentang SleepLike / Maat Work',
    intro: 'SleepLike adalah proyek edukasi kecil tentang istirahat dan kesejahteraan dari tim editorial SleepLike / Maat Work.',
    sections: [
      {
        id: 'purpose',
        heading: 'Alat perencanaan sederhana',
        paragraphs: [
          'SleepLike membantu orang dewasa mengatur jam tidur, jam bangun, tidur siang, atau rentang waktu tidur yang tersedia dengan perhitungan lokal sederhana. Alat ini tidak memerlukan akun atau mikrofon, dan perhitungan utamanya dirancang berjalan di peramban tanpa mengirim jam tidur ke server.',
          'Perkiraan menggunakan asumsi perencanaan tidur yang umum dan menjelaskan batasnya. Tidur berbeda antarorang dan antarmalam, sehingga alat ini ditujukan untuk perencanaan istirahat yang bersifat edukatif, bukan nasihat medis, perangkat medis, atau cara mendiagnosis kondisi tidur.',
        ],
        bullets: [
          'SleepLike / Maat Work adalah nama editorial institusional proyek ini.',
          'Kalkulator tidak mengukur tahapan tidur atau memprediksi apa yang akan terjadi sepanjang malam.',
          'Pertanyaan tentang gejala atau perawatan pribadi perlu dibahas dengan tenaga kesehatan yang berkualifikasi.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'Cara konten dikelola',
        paragraphs: [
          'Tim editorial menulis penjelasan praktis berdasarkan sumber kesehatan primer yang tersedia untuk publik, menyatakan asumsi kalkulator, dan mencatat tanggal pembaruan pada setiap halaman. Halaman ditulis untuk edukasi umum orang dewasa dan tidak menampilkan tim sebagai tenaga medis atau mengklaim adanya tinjauan medis.',
          'Proyek dapat berubah ketika produk, sumber, atau konfigurasi privasi berubah. Halaman metodologi menjelaskan perhitungan serta batas perkiraan agar Anda dapat memutuskan apakah suatu hasil berguna bagi keadaan Anda.',
        ],
      },
      {
        id: 'contact',
        heading: 'Hubungi tim',
        paragraphs: [
          'Untuk pertanyaan tentang produk, aksesibilitas, privasi, atau konten, kunjungi halaman kontak publik MaatWork di https://maat.work. Jangan mengirim riwayat medis terperinci melalui formulir kontak produk yang bersifat umum. Jika memiliki kekhawatiran tentang tidur, tanyakan kepada tenaga kesehatan yang berkualifikasi.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/id/kontak', '/id/privasi', '/id/ketentuan', '/id/metodologi'],
    updated: '2026-10-23',
  },
  {
    path: '/id/kontak',
    locale: 'id',
    kind: 'legal',
    key: 'contact',
    title: 'Hubungi SleepLike',
    description: 'Temukan saluran kontak publik MaatWork untuk pertanyaan tentang SleepLike, privasi, aksesibilitas, atau konten.',
    heading: 'Hubungi SleepLike',
    intro: 'Gunakan saluran kontak publik MaatWork untuk pertanyaan tentang produk, privasi, aksesibilitas, atau konten.',
    sections: [
      {
        id: 'public-contact',
        heading: 'Tempat mengirim pertanyaan',
        paragraphs: [
          'Saluran kontak publik tersedia di https://maat.work. Situs MaatWork mencantumkan alamat email bisnis maatwork.comercial@gmail.com untuk pertanyaan umum. Gunakan saluran yang paling nyaman dan sebutkan SleepLike agar pertanyaan memiliki konteks.',
          'SleepLike adalah alat edukatif tentang istirahat dan kesejahteraan. Tim dapat menerima pertanyaan tentang situs, konten, aksesibilitas, atau konfigurasi privasi, tetapi tidak memberikan nasihat medis pribadi atau menafsirkan gejala.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'Informasi yang membantu penelusuran',
        paragraphs: [
          'Untuk pertanyaan tentang produk, sertakan jalur halaman, peramban, bahasa, dan penjelasan singkat tentang apa yang Anda harapkan terjadi. Hindari mengirim catatan tidur, rekam medis, atau riwayat kesehatan lain melalui saluran kontak umum; tenaga kesehatan yang berkualifikasi adalah pihak yang tepat untuk panduan tidur pribadi.',
          'Untuk pertanyaan privasi, jelaskan pengaturan atau pilihan persetujuan yang ingin Anda tanyakan. Halaman privasi menjelaskan apa yang disimpan alat lokal ini dan bagaimana integrasi pihak ketiga opsional dijelaskan saat diaktifkan.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'Tujuan saluran ini',
        paragraphs: [
          'Saluran ini untuk pertanyaan tentang layanan dan kontennya. Ini bukan layanan darurat. Jika ada masalah kesehatan atau keselamatan yang mendesak, hubungi layanan darurat atau kesehatan setempat yang sesuai.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/id/tentang', '/id/privasi', '/id/ketentuan', '/id/metodologi'],
    updated: '2026-10-23',
  },
  {
    path: '/id/privasi',
    locale: 'id',
    kind: 'legal',
    key: 'privacy',
    title: 'Privasi SleepLike',
    description: 'Baca cara SleepLike menangani kalkulator lokal, preferensi peramban, analitik opsional, pilihan persetujuan, dan integrasi iklan yang disiapkan.',
    heading: 'Privasi di SleepLike',
    intro: 'Kalkulator dirancang untuk penggunaan lokal, preferensi peramban yang terbatas, dan pilihan yang jelas tentang layanan opsional.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'Kalkulator berjalan secara lokal',
        paragraphs: [
          'Kalkulator utama dirancang berjalan di peramban Anda. Alat ini tidak memerlukan akun atau mikrofon, dan tidak dirancang menyimpan riwayat kesehatan, catatan tidur, riwayat jam tidur, riwayat jam bangun, atau masukan perhitungan di server SleepLike. Hasil dibuat dari nilai yang Anda masukkan dan informasi waktu setempat yang diperlukan untuk perhitungan.',
          'Peramban dapat menyimpan preferensi terbatas, seperti bahasa, format waktu, atau pilihan persetujuan. Penyimpanan peramban ini hanya untuk preferensi dan pengaturan persetujuan; bukan untuk menyimpan riwayat pribadi tentang tidur atau kesehatan.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Integrasi yang disiapkan dan pengoperasiannya',
        paragraphs: [
          'Integrasi pihak ketiga dapat disiapkan dalam kode tanpa diaktifkan pada setiap versi situs yang diterbitkan. Vercel Analytics hanya tersedia setelah Anda menyetujuinya melalui kontrol Preferensi privasi di bagian bawah halaman; saat diaktifkan, layanan ini digunakan secara agregat untuk mengukur aktivitas jalur halaman. Layanan ini tidak ditujukan untuk menerima jam tidur yang tepat, jam bangun yang tepat, waktu tidur siang, atau nilai yang dimasukkan ke kalkulator.',
          'Ketersediaan dan konfigurasi layanan opsional dapat berubah pada tiap penerbitan situs. Layanan yang disebut telah disiapkan di sini tidak boleh dianggap sebagai bukti bahwa layanan itu berjalan saat Anda berkunjung; antarmuka persetujuan dan aktivitas jaringan peramban merupakan petunjuk praktis untuk sesi tersebut.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Iklan bersyarat',
        paragraphs: [
          'Jika iklan diaktifkan, iklan hanya dimuat setelah integrasi Google CMP dan AdSense yang terkait diaktifkan dan disetujui. Iklan tetap nonaktif sampai syarat tersebut terpenuhi. Antarmuka persetujuan dirancang agar Anda dapat menerima, menolak, berhenti berpartisipasi, atau mengubah pilihan. SleepLike meminta iklan nonpersonalisasi hanya setelah persetujuan Anda. Iklan ini tetap dapat menggunakan cookie dan memproses informasi seperti alamat IP atau rincian perangkat Anda. Menolak persetujuan membuat kalkulator tetap tersedia tanpa iklan.',
          'Iklan bersifat opsional dalam konfigurasi produk dan tidak diperlukan untuk perhitungan lokal. Tidak ada iklan yang dimaksudkan untuk tampil pada halaman kebijakan ini. Teks ini menjelaskan konfigurasi yang mungkin digunakan; bukan pernyataan bahwa iklan sedang berjalan ketika Anda membacanya.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'Kontrol dan pertanyaan Anda',
        paragraphs: [
          'Gunakan kontrol Preferensi privasi di bagian bawah halaman untuk berhenti berpartisipasi atau mencabut pilihan sebelumnya. Peramban Anda dapat menyimpan preferensi yang diperlukan untuk mengingat keputusan itu. Menghapus data situs dapat menghapus preferensi tersebut dan mungkin mengharuskan Anda memilih lagi. Situs tidak menggunakan penyimpanan itu untuk menyimpan riwayat kesehatan.',
          'Untuk pertanyaan privasi, kunjungi https://maat.work atau gunakan kontak bisnis publik yang tercantum pada halaman kontak. Halaman ini adalah informasi umum tentang produk dan bukan janji mengenai layanan yang dinonaktifkan pada versi situs Anda.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/id/tentang', '/id/kontak', '/id/ketentuan', '/id/metodologi'],
    updated: '2026-10-23',
  },
  {
    path: '/id/ketentuan',
    locale: 'id',
    kind: 'legal',
    key: 'terms',
    title: 'Ketentuan SleepLike',
    description: 'Ketentuan umum penggunaan SleepLike sebagai alat edukatif untuk merencanakan tidur.',
    heading: 'Ketentuan penggunaan SleepLike',
    intro: 'Ketentuan umum ini menjelaskan tujuan penggunaan serta batas situs dan kalkulator SleepLike.',
    sections: [
      {
        id: 'educational-service',
        heading: 'Apa yang disediakan layanan',
        paragraphs: [
          'SleepLike menyediakan halaman edukatif statis dan kalkulator lokal untuk merencanakan perkiraan jam tidur dan jam bangun. Layanan ini ditujukan bagi orang dewasa yang mencari informasi umum tentang kesejahteraan. Layanan tidak memberikan nasihat medis, diagnosis, pengobatan, bantuan darurat, atau pengukuran tahapan tidur.',
          'Perhitungan menggunakan asumsi yang dinyatakan, termasuk perkiraan interval siklus dan jeda untuk tertidur. Hasil adalah perkiraan untuk perencanaan. Tidur berbeda antarorang dan antarmalam, sehingga Anda tetap bertanggung jawab memutuskan apakah waktu yang disarankan sesuai dengan keadaan Anda.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Menggunakan halaman',
        paragraphs: [
          'Gunakan halaman untuk keperluan informasi pribadi yang sah dan jangan menganggap perkiraan sebagai jaminan. Jangan gunakan kalkulator sebagai satu-satunya dasar keputusan yang berkaitan dengan keselamatan, terutama saat sangat mengantuk atau perlu mengemudi, mengoperasikan peralatan, atau melakukan tugas lain yang memerlukan kewaspadaan.',
          'Konten, perhitungan, tautan, dan integrasi opsional dapat diperbarui, dihapus, atau diubah seiring perkembangan proyek. Tanggal pembaruan pada halaman membantu mengenali versi konten edukatif yang Anda baca. Situs eksternal memiliki konten dan praktiknya sendiri.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Pertanyaan kesehatan dan kontak',
        paragraphs: [
          'Jika Anda mengalami kesulitan tidur yang menetap, kantuk berlebihan pada siang hari, mendengkur keras, terengah-engah, jeda napas, atau masalah kesehatan lain, berkonsultasilah dengan tenaga kesehatan yang berkualifikasi. Untuk pertanyaan produk, privasi, aksesibilitas, atau konten, gunakan https://maat.work. Jangan mengirim riwayat kesehatan sensitif melalui saluran kontak produk yang bersifat umum.',
          'Ketentuan ini menjelaskan layanan dengan bahasa sederhana. Ketentuan ini tidak menambahkan janji bahwa kalkulator sesuai bagi orang, jadwal, kondisi kesehatan, atau hasil tertentu.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/id/tentang', '/id/kontak', '/id/privasi', '/id/metodologi'],
    updated: '2026-10-23',
  },
  {
    path: '/id/metodologi',
    locale: 'id',
    kind: 'legal',
    key: 'methodology',
    title: 'Metodologi SleepLike',
    description: 'Lihat empat mode kalkulator, asumsi perhitungan, penggunaan waktu setempat, penanganan tanggal, dan batas perkiraan SleepLike.',
    heading: 'Cara kerja perkiraan SleepLike',
    intro: 'SleepLike menggunakan perhitungan waktu yang transparan untuk empat mode perencanaan; bukan memprediksi tahapan tidur.',
    sections: [
      {
        id: 'four-modes',
        heading: 'Empat mode perencanaan',
        paragraphs: [
          'Setiap mode menjawab pertanyaan waktu yang berbeda. Alat ini menggunakan tanggal dan waktu setempat yang tersedia di peramban serta menghasilkan beberapa perkiraan yang mudah dibaca. Hasilnya adalah alat bantu perencanaan, bukan pengukuran sensor atau penilaian klinis.',
        ],
        table: {
          headers: ['Mode', 'Titik awal', 'Perhitungan'],
          rows: [
            ['Bangun', 'Target jam bangun', 'Kurangi perkiraan durasi tidur dan jeda untuk tertidur.'],
            ['Tidur sekarang', 'Catatan waktu setempat saat ini', 'Tambahkan jeda dan satu atau beberapa perkiraan interval siklus.'],
            ['Tidur siang', 'Waktu mulai tidur siang', 'Tambahkan pilihan singkat sekitar 20 menit atau pilihan lebih panjang sekitar 90 menit.'],
            ['Rentang waktu', 'Interval tersedia yang tetap', 'Bandingkan jumlah perkiraan siklus yang muat dalam waktu tersedia.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'Asumsi di balik perhitungan',
        paragraphs: [
          'Interval siklus bawaan adalah 90 menit. NHLBI menjelaskan bahwa siklus tidur berulang kira-kira setiap 80 hingga 100 menit, sehingga 90 digunakan sebagai titik tengah yang praktis, bukan durasi biologis yang persis. Jeda bawaan untuk tertidur adalah 15 menit, sebuah masukan praktis untuk perencanaan yang tidak mewakili hasil pengukuran latensi tidur Anda.',
          'Sebagai konteks bagi orang dewasa, panduan CDC menyatakan bahwa usia 18 hingga 60 tahun umumnya perlu tidur setidaknya 7 jam per hari. Kalkulator tidak memaksa setiap hasil memenuhi satu kebutuhan tidur pribadi; alat ini menunjukkan perhitungan agar Anda dapat mengutamakan pilihan yang menyediakan waktu istirahat yang cukup bagi diri sendiri.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Tanggal, tengah malam, dan perubahan jam',
        paragraphs: [
          'Ketika pengurangan melewati tengah malam, tanggal ikut berubah. Hasil setelah pukul 00:00 termasuk tanggal kalender berikutnya, sedangkan hasil sebelum tengah malam termasuk tanggal sebelumnya saat menghitung mundur dari target pagi. Jam yang ditampilkan menggunakan konteks waktu setempat di peramban.',
          'Di sekitar perubahan waktu musim panas, perhitungan waktu setempat mengikuti aturan tanggal dan waktu dari peramban. Rentang waktu pada jam dapat tampak lebih pendek atau lebih panjang ketika jam berubah. SleepLike tidak mengarang zona waktu, tidak diam-diam mengubah hasil ke lokasi lain, dan tidak memprediksi tahapan tidur mendatang.',
        ],
      },
      {
        id: 'limits',
        heading: 'Apa yang tidak dilakukan alat ini',
        paragraphs: [
          'Kalkulator tidak menggunakan mikrofon, perangkat yang dikenakan di tubuh, akun, atau sensor tidur. Alat ini tidak mengenali REM, tidur dalam, terbangun, atau gangguan tidur, dan tidak menjanjikan perasaan tertentu saat bangun pada jam yang ditampilkan. Stres, cahaya, penyakit, zat tertentu, perubahan jadwal, dan variasi wajar antarmalam dapat mengubah hasil yang Anda alami.',
          'Jika masalah tidur menetap atau Anda mengalami kantuk berlebihan pada siang hari, mendengkur keras, terengah-engah, atau jeda napas, berkonsultasilah dengan tenaga kesehatan yang berkualifikasi. Metodologi ini menjelaskan perhitungan edukatif sederhana dan bukan nasihat medis.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/id/tentang', '/id/privasi', '/id/ketentuan', '/id/siklus-tidur'],
    updated: '2026-10-23',
  },
];
