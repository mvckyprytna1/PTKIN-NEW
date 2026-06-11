// Inisialisasi Icons
lucide.createIcons();

const app = {
  currentData: materials,
  currentMaterialId: null,
  currentChapterId: null,
  isFocusMode: false,

  init() {
    this.initDarkMode();
    this.renderDashboard(this.currentData);
    this.setupSearch();
    this.setupChecklist();
    
    // Setup Ujian Besok Data
    this.renderUjianBesok();
  },

  // --- Navigasi SPA ---
  navigate(viewId) {
    document.getElementById('view-dashboard').classList.add('hidden-view');
    document.getElementById('view-reading').classList.add('hidden-view');
    document.getElementById('view-quick').classList.add('hidden-view');
    
    // Reset focus mode if leaving reading
    if (viewId !== 'reading' && this.isFocusMode) {
      this.toggleFocusMode();
    }

    if (viewId === 'dashboard') {
      document.getElementById('view-dashboard').classList.remove('hidden-view');
      window.scrollTo(0,0);
    } else if (viewId === 'reading') {
      document.getElementById('view-reading').classList.remove('hidden-view');
      window.scrollTo(0,0);
    } else if (viewId === 'ujian-besok') {
      document.getElementById('view-quick').classList.remove('hidden-view');
      window.scrollTo(0,0);
    }
  },

  // --- Render Dashboard ---
  renderDashboard(data) {
    const container = document.getElementById('materiContainer');
    const emptyState = document.getElementById('emptyState');
    const statsTotal = document.getElementById('statsTotal');
    
    container.innerHTML = '';
    
    if (data.length === 0) {
      emptyState.classList.remove('hidden-view');
      statsTotal.textContent = "0 Materi ditemukan";
      return;
    }
    
    emptyState.classList.add('hidden-view');
    let totalBab = 0;

    data.forEach(materi => {
      totalBab += materi.chapters.length;
      const card = document.createElement('div');
      card.className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition duration-300 flex flex-col h-full";
      
      card.innerHTML = `
        <div class="mb-4 flex-grow">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2 block">${materi.category}</span>
          <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-white">${materi.title}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm line-clamp-3">${materi.description}</p>
        </div>
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <div class="flex space-x-3 text-xs text-slate-500">
            <span class="flex items-center"><i data-lucide="clock" class="w-3 h-3 mr-1"></i> ${materi.readTime}</span>
            <span class="flex items-center"><i data-lucide="layers" class="w-3 h-3 mr-1"></i> ${materi.chapters.length} Bab</span>
          </div>
          <button onclick="app.openMaterial('${materi.id}')" class="bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:bg-slate-700 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white transition px-4 py-2 rounded-lg font-medium text-sm">Baca</button>
        </div>
      `;
      container.appendChild(card);
    });

    statsTotal.textContent = `${data.length} Modul • ${totalBab} Bab Tersedia`;
    lucide.createIcons();
  },

  // --- Fitur Search ---
  setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = materials.filter(m => 
        m.title.toLowerCase().includes(query) || 
        m.description.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
      );
      this.renderDashboard(filtered);
    });
  },

  // --- Buka Materi & Render Bacaan ---
  openMaterial(materiId) {
    const materi = materials.find(m => m.id === materiId);
    if (!materi) return;
    
    this.currentMaterialId = materiId;
    document.getElementById('sidebarTitle').textContent = materi.title;
    
    const tocContainer = document.getElementById('sidebarTOC');
    tocContainer.innerHTML = '';
    
    materi.chapters.forEach((chap, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <button onclick="app.openChapter('${materiId}', '${chap.id}')" id="btn-chap-${chap.id}" class="w-full text-left px-3 py-2 rounded-lg transition text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 truncate block">
          ${index + 1}. ${chap.title}
        </button>
      `;
      tocContainer.appendChild(li);
    });

    this.navigate('reading');
    // Buka bab pertama otomatis
    if (materi.chapters.length > 0) {
      this.openChapter(materiId, materi.chapters[0].id);
    }
  },

  openChapter(materiId, chapterId) {
    this.currentChapterId = chapterId;
    const materi = materials.find(m => m.id === materiId);
    const chapter = materi.chapters.find(c => c.id === chapterId);
    
    // Update Active State di Sidebar
    document.querySelectorAll('[id^="btn-chap-"]').forEach(el => {
      el.classList.remove('bg-emerald-50', 'dark:bg-emerald-900/30', 'text-emerald-600', 'dark:text-emerald-400', 'font-semibold');
    });
    const activeBtn = document.getElementById(`btn-chap-${chapterId}`);
    if(activeBtn) {
      activeBtn.classList.add('bg-emerald-50', 'dark:bg-emerald-900/30', 'text-emerald-600', 'dark:text-emerald-400', 'font-semibold');
    }

    // Header Konten
    document.getElementById('contentCategory').textContent = materi.category;
    document.getElementById('contentTitle').textContent = chapter.title;
    document.getElementById('contentTime').textContent = materi.readTime;

    // Body Konten (Gabungkan teks dan highlight boxes)
    let bodyHtml = `<div class="text-slate-700 dark:text-slate-300 mb-8">${chapter.content}</div>`;
    
    // Box Wajib Hafal
    if (chapter.mustRemember && chapter.mustRemember.length > 0) {
      bodyHtml += `
        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-r-xl mb-6">
          <h4 class="font-bold text-red-700 dark:text-red-400 flex items-center mb-2"><i data-lucide="alert-circle" class="w-5 h-5 mr-2"></i> Wajib Hafal</h4>
          <ul class="list-disc list-inside text-red-900 dark:text-red-200 space-y-1">
            ${chapter.mustRemember.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Box Poin Penting
    if (chapter.keyPoints && chapter.keyPoints.length > 0) {
      bodyHtml += `
        <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
          <h4 class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center mb-2"><i data-lucide="key" class="w-5 h-5 mr-2"></i> Poin Penting</h4>
          <ul class="list-disc list-inside text-emerald-900 dark:text-emerald-200 space-y-1">
            ${chapter.keyPoints.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Box Jebakan
    if (chapter.traps && chapter.traps.length > 0) {
      bodyHtml += `
        <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-5 rounded-r-xl mb-6">
          <h4 class="font-bold text-orange-700 dark:text-orange-400 flex items-center mb-2"><i data-lucide="zap" class="w-5 h-5 mr-2"></i> Jebakan Soal</h4>
          <ul class="list-disc list-inside text-orange-900 dark:text-orange-200 space-y-1">
            ${chapter.traps.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Contoh Soal
    if (chapter.examples && chapter.examples.length > 0) {
      bodyHtml += `<h4 class="text-xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Contoh Soal</h4>`;
      chapter.examples.forEach((ex, i) => {
        bodyHtml += `
          <div class="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
            <p class="font-semibold mb-3"><span class="text-emerald-500 mr-2">Q${i+1}:</span> ${ex.question}</p>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 mb-2">
              <p class="text-sm font-medium text-emerald-700 dark:text-emerald-400">Jawaban: ${ex.answer}</p>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2"><i data-lucide="info" class="inline w-4 h-4 mr-1"></i> ${ex.explanation}</p>
          </div>
        `;
      });
    }

    document.getElementById('contentBody').innerHTML = bodyHtml;
    lucide.createIcons();
    
    // Cek Bookmark dan Checklist
    this.checkBookmarkState();
    this.checkChecklistState();

    // Mobile: Hide sidebar automatically after choosing
    const sidebar = document.getElementById('readingSidebar');
    if(window.innerWidth < 768 && !sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
    }
  },

  // --- Fitur Ujian Besok ---
  renderUjianBesok() {
    const listTips = document.getElementById('quickTips');
    ujianBesokData.tips.forEach(tip => {
      listTips.innerHTML += `<li>${tip}</li>`;
    });

    const listTerms = document.getElementById('quickTerms');
    ujianBesokData.istilah.forEach(item => {
      listTerms.innerHTML += `
        <div class="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
          <span class="font-bold text-blue-600 dark:text-blue-400 block mb-1">${item.term}</span>
          <span class="text-sm text-slate-600 dark:text-slate-300">${item.definition}</span>
        </div>
      `;
    });
  },

  // --- UI Tools ---
  initDarkMode() {
    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
    
    document.getElementById('darkModeToggle').addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
  },

  toggleFocusMode() {
    this.isFocusMode = !this.isFocusMode;
    const sidebar = document.getElementById('readingSidebar');
    const content = document.getElementById('readingContent');
    
    if (this.isFocusMode) {
      sidebar.classList.add('hidden', 'md:hidden');
      content.classList.replace('md:p-10', 'md:p-16'); // Buat padding lebih lebar
    } else {
      sidebar.classList.remove('md:hidden'); // Munculkan di desktop
      content.classList.replace('md:p-16', 'md:p-10');
    }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('readingSidebar');
    sidebar.classList.toggle('hidden');
  },

  // --- Local Storage Features ---
  toggleBookmark() {
    const key = `bookmark_${this.currentMaterialId}_${this.currentChapterId}`;
    let isBookmarked = localStorage.getItem(key);
    
    if (isBookmarked) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, 'true');
    }
    this.checkBookmarkState();
  },

  checkBookmarkState() {
    const key = `bookmark_${this.currentMaterialId}_${this.currentChapterId}`;
    const icon = document.getElementById('iconBookmark');
    if (localStorage.getItem(key)) {
      icon.classList.add('fill-emerald-500', 'text-emerald-500');
    } else {
      icon.classList.remove('fill-emerald-500', 'text-emerald-500');
    }
  },

  setupChecklist() {
    const checkbox = document.getElementById('chapterCheck');
    checkbox.addEventListener('change', (e) => {
      const key = `check_${this.currentMaterialId}_${this.currentChapterId}`;
      if (e.target.checked) {
        localStorage.setItem(key, 'true');
      } else {
        localStorage.removeItem(key);
      }
    });
  },

  checkChecklistState() {
    const key = `check_${this.currentMaterialId}_${this.currentChapterId}`;
    const checkbox = document.getElementById('chapterCheck');
    checkbox.checked = localStorage.getItem(key) === 'true';
  }
};

// Jalankan aplikasi
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
