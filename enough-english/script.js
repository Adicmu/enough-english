document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const state = {
        entries: [],
        currentSelection: {
            x: null,
            y: null
        },
        currentFloorIndex: 0, // 0: Ground, 1: 2nd, 2: 3rd
        floors: [
            { name: 'Ground', image: 'assets/cmuq_map_ground.png' },
            { name: '2nd', image: 'assets/cmuq_map_2nd.png' },
            { name: '3rd', image: 'assets/cmuq_map_3rd.png' }
        ],
        currentLang: 'en' // 'en' or 'ar'
    };

    // --- Translations ---
    const translations = {
        en: {
            title: "Enough English?",
            subtitle: "Mapping Language & Identity at CMU-Q",
            purposeBtn: "Purpose of this Website",
            langToggleBtn: "العربية",
            shareExp: "Share Your Experience",
            location: "Location",
            locationPlaceholder: "Click on map to set location",
            languageUsed: "Language Used",
            selectLang: "Select a language...",
            howFeel: "How did it feel?",
            pressured: "Pressured / Overwhelmed",
            inadequate: "Inadequate / Excluded",
            authentic: "Authentic / Comfortable",
            tooMuch: "(Too Much)",
            notEnough: "(Not Enough)",
            justEnough: "(Just Enough)",
            reflection: "Reflection (Optional)",
            reflectionPlaceholder: "Briefly describe the moment...",
            submitBtn: "Submit Entry",
            liveData: "Live Data",
            aiAnalysis: "AI Thematic Analysis",
            analyzingText: "Analyzing reflections...",
            recentEntries: "Recent Entries",
            mapInstructions: "📍 Click on the map to select your location",
            floor: "FLOOR",
            // Modal
            modalTitle: "Purpose of this Website",
            modalWhy: "Why This Exists",
            modalWhyText: "This project visualizes how CMU-Q students, faculty, and staff navigate English, Arabic, and other languages across campus. It responds to a persistent problem: multilingual students are often made to feel that their English is never quite \"good enough\" for academic spaces, while their Arabic is judged as not \"authentic\" enough for society.",
            modalDisrupt: "Disrupting Deficit Narratives",
            modalDisruptText: "These feelings of \"not enoughness\" are often hidden. By mapping them, we turn private anxieties into public data. This visualization argues that everyday multilingual practices are not evidence of a lack, but a resource to be valued.",
            modalImpact: "How Data Creates Impact",
            modalImpactText: "By making these invisible tensions visible, we aim to:",
            modalList1: "Show that you are not alone in these feelings.",
            modalList2: "Challenge the \"English-only\" hierarchy in academic spaces.",
            modalList3: "Open space for more flexible, locally grounded standards of language.",
            modalFooter: "Based on research by Blommaert & Varis (2015) and Hopkyns & Elyas (2022).",
            // Chart titles
            langDistribution: "Language Distribution",
            feelingsEnoughness: "Feelings of \"Enoughness\""
        },
        ar: {
            title: "إنجليزي كافٍ؟",
            subtitle: "رسم خريطة اللغة والهوية في جامعة كارنيجي ميلون - قطر",
            purposeBtn: "الغرض من هذا الموقع",
            langToggleBtn: "English",
            shareExp: "شارك تجربتك",
            location: "الموقع",
            locationPlaceholder: "انقر على الخريطة لتحديد الموقع",
            languageUsed: "اللغة المستخدمة",
            selectLang: "اختر لغة...",
            howFeel: "كيف كان شعورك؟",
            pressured: "مضغوط / مرهق",
            inadequate: "غير كافٍ / مستبعد",
            authentic: "أصيل / مرتاح",
            tooMuch: "(كثير جداً)",
            notEnough: "(غير كافٍ)",
            justEnough: "(كافٍ تماماً)",
            reflection: "تأمل (اختياري)",
            reflectionPlaceholder: "صف اللحظة بإيجاز...",
            submitBtn: "إرسال",
            liveData: "بيانات مباشرة",
            aiAnalysis: "التحليل الموضوعي بالذكاء الاصطناعي",
            analyzingText: "جارٍ تحليل التأملات...",
            recentEntries: "الإدخالات الأخيرة",
            mapInstructions: "📍 انقر على الخريطة لتحديد موقعك",
            floor: "الطابق",
            // Modal
            modalTitle: "الغرض من هذا الموقع",
            modalWhy: "لماذا يوجد هذا",
            modalWhyText: "يصور هذا المشروع كيف يتنقل طلاب وأعضاء هيئة التدريس والموظفون في جامعة كارنيجي ميلون - قطر بين اللغة الإنجليزية والعربية واللغات الأخرى في الحرم الجامعي. إنه يستجيب لمشكلة مستمرة: غالباً ما يُشعر الطلاب متعددو اللغات بأن لغتهم الإنجليزية ليست \"جيدة بما فيه الكفاية\" للمساحات الأكاديمية، بينما يُحكم على لغتهم العربية بأنها ليست \"أصيلة\" بما فيه الكفاية للمجتمع.",
            modalDisrupt: "تعطيل روايات العجز",
            modalDisruptText: "غالباً ما تكون هذه المشاعر بـ\"عدم الكفاية\" مخفية. من خلال رسم خريطة لها، نحول القلق الخاص إلى بيانات عامة. يجادل هذا التصور بأن الممارسات اللغوية المتعددة اليومية ليست دليلاً على نقص، بل مورداً يجب تقديره.",
            modalImpact: "كيف تخلق البيانات تأثيراً",
            modalImpactText: "من خلال جعل هذه التوترات غير المرئية مرئية، نهدف إلى:",
            modalList1: "إظهار أنك لست وحدك في هذه المشاعر.",
            modalList2: "تحدي التسلسل الهرمي \"الإنجليزية فقط\" في المساحات الأكاديمية.",
            modalList3: "فتح مساحة لمعايير أكثر مرونة ومحلية للغة.",
            modalFooter: "بناءً على أبحاث بلومارت وفاريس (2015) وهوبكينز وإلياس (2022).",
            // Chart titles
            langDistribution: "توزيع اللغات",
            feelingsEnoughness: "مشاعر \"الكفاية\""
        }
    };

    // --- DOM Elements ---
    const mapContainer = document.getElementById('mapContainer');
    const cmuMap = document.getElementById('cmuMap');
    const heatmapCanvas = document.getElementById('heatmapCanvas');
    const clickMarker = document.getElementById('clickMarker');
    const locationDisplay = document.getElementById('locationDisplay');
    const entryForm = document.getElementById('entryForm');
    const reflectionInput = document.getElementById('reflection');
    const charCount = document.getElementById('charCount');
    const entriesList = document.getElementById('entriesList');
    const wordCloudContainer = document.getElementById('wordCloud');

    // Floor Controls
    const btnFloorUp = document.getElementById('btnFloorUp');
    const btnFloorDown = document.getElementById('btnFloorDown');
    const floorNameDisplay = document.getElementById('floorName');
    const floorInput = document.getElementById('floor');

    // --- Chart Instances ---
    let langChart = null;
    let feelingChart = null;

    // --- Modal Logic ---
    function setupModal() {
        const modal = document.getElementById('purposeModal');
        const btn = document.getElementById('btnPurpose');
        const span = document.getElementById('closeModal');

        btn.onclick = function () {
            modal.classList.remove('hidden');
        }

        span.onclick = function () {
            modal.classList.add('hidden');
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.classList.add('hidden');
            }
        }
    }

    // --- Language Toggle ---
    function setupLanguageToggle() {
        const btnLangToggle = document.getElementById('btnLangToggle');

        btnLangToggle.onclick = function () {
            state.currentLang = state.currentLang === 'en' ? 'ar' : 'en';
            updateLanguage();
        };
    }

    function updateLanguage() {
        const t = translations[state.currentLang];
        const isArabic = state.currentLang === 'ar';

        // Set document direction
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
        document.documentElement.lang = isArabic ? 'ar' : 'en';

        // Update header
        document.querySelector('.app-header h1').textContent = t.title;
        document.querySelector('.subtitle').textContent = t.subtitle;
        document.getElementById('btnPurpose').textContent = t.purposeBtn;
        document.getElementById('btnLangToggle').textContent = t.langToggleBtn;

        // Update form
        document.querySelector('.input-card h2').textContent = t.shareExp;
        document.querySelector('label[for="locationDisplay"]').textContent = t.location;
        document.getElementById('locationDisplay').placeholder = t.locationPlaceholder;
        document.querySelector('label[for="language"]').textContent = t.languageUsed;
        document.querySelector('select#language option[value=""]').textContent = t.selectLang;
        document.querySelector('.form-group label:nth-of-type(1)').childNodes[0].textContent = t.howFeel;

        // Update feeling options
        const feelingLabels = document.querySelectorAll('.radio-option');
        feelingLabels[0].querySelector('strong').textContent = t.pressured;
        feelingLabels[0].querySelector('small').textContent = t.tooMuch;
        feelingLabels[1].querySelector('strong').textContent = t.inadequate;
        feelingLabels[1].querySelector('small').textContent = t.notEnough;
        feelingLabels[2].querySelector('strong').textContent = t.authentic;
        feelingLabels[2].querySelector('small').textContent = t.justEnough;

        document.querySelector('label[for="reflection"]').textContent = t.reflection;
        document.getElementById('reflection').placeholder = t.reflectionPlaceholder;
        document.querySelector('.btn-submit').textContent = t.submitBtn;

        // Update stats and analysis
        document.querySelector('.stats-card h2').textContent = t.liveData;
        document.querySelector('.wordcloud-card h2').textContent = t.aiAnalysis;
        const placeholder = document.querySelector('.word-cloud .placeholder-text');
        if (placeholder) placeholder.textContent = t.analyzingText;
        document.querySelector('.recent-entries-card h2').textContent = t.recentEntries;

        // Update map instructions
        document.querySelector('.map-instructions p').textContent = t.mapInstructions;
        document.querySelector('.floor-label').textContent = t.floor;

        // Update modal
        document.querySelector('#purposeModal h2').textContent = t.modalTitle;
        const modalBody = document.querySelector('.modal-body');
        modalBody.querySelector('h3:nth-of-type(1)').textContent = t.modalWhy;
        modalBody.querySelector('p:nth-of-type(1)').textContent = t.modalWhyText;
        modalBody.querySelector('h3:nth-of-type(2)').textContent = t.modalDisrupt;
        modalBody.querySelector('p:nth-of-type(2)').textContent = t.modalDisruptText;
        modalBody.querySelector('h3:nth-of-type(3)').textContent = t.modalImpact;
        modalBody.querySelector('p:nth-of-type(3)').textContent = t.modalImpactText;
        const listItems = modalBody.querySelectorAll('li');
        listItems[0].textContent = t.modalList1;
        listItems[1].textContent = t.modalList2;
        listItems[2].textContent = t.modalList3;
        document.querySelector('.modal-footer p em').textContent = t.modalFooter;

        // Update charts
        if (langChart) {
            langChart.options.plugins.title.text = t.langDistribution;
            langChart.update();
        }
        if (feelingChart) {
            feelingChart.options.plugins.title.text = t.feelingsEnoughness;
            feelingChart.update();
        }
    }

    // --- Initialization ---
    function init() {
        setupMapInteractions();
        setupFloorControls();
        setupForm();
        setupCharts();
        setupModal();
        setupLanguageToggle();
        loadData();
        resizeCanvas();
        updateFloorUI();

        setInterval(loadData, 5000);

        window.addEventListener('resize', () => {
            resizeCanvas();
            renderHeatmap();
        });
    }

    // ... (Keep existing Floor, Map, Form, Data logic) ...

    function updateVisuals() {
        renderHeatmap();
        updateCharts();
        updateThematicAnalysis(); // Changed from updateWordCloud
        updateEntriesList();
    }

    // ... (Keep existing Chart setup) ...

    // --- AI Thematic Analysis ---
    function updateThematicAnalysis() {
        const reflections = state.entries
            .map(e => e.reflection)
            .filter(t => t)
            .join(' ')
            .toLowerCase();

        if (!reflections) return;

        // Simple keyword-based theme detection (Simulating AI)
        const themes = {
            'Academic Pressure': ['class', 'grade', 'professor', 'exam', 'study', 'presentation', 'smart', 'stupid', 'vocabulary'],
            'Social Belonging': ['friend', 'group', 'lunch', 'hallway', 'joke', 'laugh', 'alone', 'together', 'excluded'],
            'Identity Conflict': ['home', 'authentic', 'fake', 'western', 'arab', 'qatari', 'culture', 'tradition', 'modern'],
            'Linguistic Insecurity': ['accent', 'grammar', 'mistake', 'judge', 'shame', 'embarrassed', 'broken', 'fluent']
        };

        const themeScores = {};

        // Calculate scores
        for (const [theme, keywords] of Object.entries(themes)) {
            let score = 0;
            keywords.forEach(kw => {
                const regex = new RegExp(`\\b${kw}\\b`, 'gi');
                const matches = reflections.match(regex);
                if (matches) score += matches.length;
            });
            if (score > 0) themeScores[theme] = score;
        }

        // Sort by score
        const sortedThemes = Object.entries(themeScores)
            .sort((a, b) => b[1] - a[1]);

        wordCloudContainer.innerHTML = '';
        if (sortedThemes.length === 0) {
            wordCloudContainer.innerHTML = '<p class="placeholder-text">AI is analyzing reflections for common themes...</p>';
            return;
        }

        // Display "AI" results
        sortedThemes.forEach(([theme, score]) => {
            const div = document.createElement('div');
            div.className = 'theme-tag';
            div.innerHTML = `${theme} <span class="theme-score">(${score} mentions)</span>`;

            // Scale opacity based on score relative to max
            const maxScore = sortedThemes[0][1];
            div.style.opacity = 0.6 + ((score / maxScore) * 0.4);

            wordCloudContainer.appendChild(div);
        });
    }

    // --- Floor Logic ---
    function setupFloorControls() {
        btnFloorUp.addEventListener('click', () => {
            if (state.currentFloorIndex < state.floors.length - 1) {
                state.currentFloorIndex++;
                updateFloorUI();
            }
        });

        btnFloorDown.addEventListener('click', () => {
            if (state.currentFloorIndex > 0) {
                state.currentFloorIndex--;
                updateFloorUI();
            }
        });
    }

    function updateFloorUI() {
        const floor = state.floors[state.currentFloorIndex];

        // Update Map Image
        cmuMap.src = floor.image;

        // Update Text
        floorNameDisplay.textContent = floor.name;
        floorInput.value = floor.name;

        // Update Button States
        btnFloorUp.disabled = state.currentFloorIndex === state.floors.length - 1;
        btnFloorDown.disabled = state.currentFloorIndex === 0;

        // Clear selection when switching floors
        state.currentSelection = { x: null, y: null };
        clickMarker.classList.add('hidden');
        locationDisplay.value = '';

        // Redraw Heatmap for new floor
        // We need to wait for image load to be safe, but usually cached
        // For now just render immediately
        renderHeatmap();
    }

    // --- Map Logic ---
    function setupMapInteractions() {
        mapContainer.addEventListener('click', (e) => {
            const rect = mapContainer.getBoundingClientRect();

            // Calculate relative coordinates (0-1)
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            state.currentSelection = { x, y };

            updateMarkerPosition(x, y);

            // Update form display
            locationDisplay.value = `Floor: ${state.floors[state.currentFloorIndex].name}, ${Math.round(x * 100)}, ${Math.round(y * 100)}`;

            // Visual feedback
            renderHeatmap();
        });
    }

    function updateMarkerPosition(x, y) {
        clickMarker.style.left = `${x * 100}%`;
        clickMarker.style.top = `${y * 100}%`;
        clickMarker.classList.remove('hidden');
    }

    function resizeCanvas() {
        heatmapCanvas.width = mapContainer.offsetWidth;
        heatmapCanvas.height = mapContainer.offsetHeight;
        renderHeatmap();
    }

    function renderHeatmap() {
        const ctx = heatmapCanvas.getContext('2d');
        const width = heatmapCanvas.width;
        const height = heatmapCanvas.height;

        ctx.clearRect(0, 0, width, height);

        // Filter entries for current floor
        const currentFloorName = state.floors[state.currentFloorIndex].name;
        const floorEntries = state.entries.filter(e => e.floor === currentFloorName);

        // Use multiply blending to make overlapping areas darker
        ctx.globalCompositeOperation = 'multiply';

        // Draw heatmap
        floorEntries.forEach(entry => {
            const x = entry.x * width;
            const y = entry.y * height;
            const radius = 40;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            // Use a stronger base red that will darken when multiplied
            gradient.addColorStop(0, 'rgba(200, 0, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(200, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Reset blending mode
        ctx.globalCompositeOperation = 'source-over';
    }

    // --- Form Logic ---
    function setupForm() {
        reflectionInput.addEventListener('input', () => {
            charCount.textContent = reflectionInput.value.length;
        });

        entryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!state.currentSelection.x) {
                alert('Please click on the map to select a location first.');
                return;
            }

            const formData = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                x: state.currentSelection.x,
                y: state.currentSelection.y,
                floor: state.floors[state.currentFloorIndex].name,
                language: document.getElementById('language').value,
                feeling: document.querySelector('input[name="feeling"]:checked').value,
                reflection: reflectionInput.value.trim()
            };

            saveEntry(formData);
            resetForm();
        });
    }

    function resetForm() {
        entryForm.reset();
        // Reset floor input to current floor
        floorInput.value = state.floors[state.currentFloorIndex].name;

        state.currentSelection = { x: null, y: null };
        clickMarker.classList.add('hidden');
        locationDisplay.value = '';
        charCount.textContent = '0';
    }

    // --- Data Management ---
    function saveEntry(entry) {
        state.entries.push(entry);
        localStorage.setItem('linguistic_landscapes_entries', JSON.stringify(state.entries));
        updateVisuals();
        console.log('Entry saved:', entry);
    }

    function loadData() {
        const savedData = localStorage.getItem('linguistic_landscapes_entries');

        if (savedData) {
            try {
                state.entries = JSON.parse(savedData);
                console.log('Loaded data from storage:', state.entries.length, 'entries');
            } catch (e) {
                console.error('Error loading data:', e);
                state.entries = [];
            }
        }

        if (state.entries.length === 0) {
            // Add some dummy data with floors
            const dummyData = [
                { x: 0.45, y: 0.55, floor: 'Ground', language: 'English', feeling: 'Just Enough', reflection: 'Class discussion was easy.' },
                { x: 0.52, y: 0.48, floor: 'Ground', language: 'Arabic', feeling: 'Not Enough', reflection: 'Wish I could speak more Arabic here.' },
                { x: 0.48, y: 0.52, floor: '2nd', language: 'Mix', feeling: 'Too Much', reflection: 'Code switching is exhausting.' },
                { x: 0.55, y: 0.45, floor: '3rd', language: 'Other', feeling: 'Just Enough', reflection: 'Speaking French with friends.' }
            ];
            state.entries = dummyData;
            // Save dummy data so we don't reset every time if the user clears
            localStorage.setItem('linguistic_landscapes_entries', JSON.stringify(state.entries));
        }
        updateVisuals();
    }

    function updateVisuals() {
        renderHeatmap();
        updateCharts();
        updateWordCloud();
        updateEntriesList();
    }

    // --- Visualization Logic ---
    function setupCharts() {
        // Language Chart
        const langCtx = document.getElementById('langChart').getContext('2d');
        langChart = new Chart(langCtx, {
            type: 'doughnut',
            data: {
                labels: ['English', 'Arabic', 'Mix', 'Russian', 'Mandarin', 'Hindi', 'Other'],
                datasets: [{
                    data: [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: ['#990000', '#333333', '#888888', '#1E90FF', '#FFD700', '#FF8C00', '#D4D4D4']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12 } },
                    title: { display: true, text: 'Language Distribution' }
                }
            }
        });

        // Feeling Chart
        const feelingCtx = document.getElementById('feelingChart').getContext('2d');
        feelingChart = new Chart(feelingCtx, {
            type: 'bar',
            data: {
                labels: ['Pressured', 'Inadequate', 'Authentic'],
                datasets: [{
                    label: 'Responses',
                    data: [0, 0, 0],
                    backgroundColor: ['#990000', '#333333', '#888888']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Feelings of "Enoughness"' }
                }
            }
        });
    }

    function updateCharts() {
        const langCounts = { 'English': 0, 'Arabic': 0, 'Mix': 0, 'Russian': 0, 'Mandarin': 0, 'Hindi': 0, 'Other': 0 };
        const feelingCounts = { 'Too Much': 0, 'Not Enough': 0, 'Just Enough': 0 };

        state.entries.forEach(e => {
            if (langCounts[e.language] !== undefined) langCounts[e.language]++;
            if (feelingCounts[e.feeling] !== undefined) feelingCounts[e.feeling]++;
        });

        langChart.data.datasets[0].data = [
            langCounts['English'],
            langCounts['Arabic'],
            langCounts['Mix'],
            langCounts['Russian'],
            langCounts['Mandarin'],
            langCounts['Hindi'],
            langCounts['Other']
        ];
        langChart.update();

        feelingChart.data.datasets[0].data = [
            feelingCounts['Too Much'],
            feelingCounts['Not Enough'],
            feelingCounts['Just Enough']
        ];
        feelingChart.update();
    }

    function updateWordCloud() {
        const text = state.entries
            .map(e => e.reflection)
            .filter(t => t)
            .join(' ')
            .toLowerCase();

        if (!text) return;

        // Expanded stop words list
        const stopWords = new Set([
            'the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was', 'it', 'i', 'my', 'me', 'very', 'really', 'just',
            'that', 'this', 'these', 'those', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
            'but', 'or', 'so', 'because', 'if', 'when', 'where', 'why', 'how', 'all', 'any', 'some', 'no', 'not', 'only',
            'own', 'same', 'other', 'another', 'such', 'what', 'which', 'who', 'whom', 'whose', 'he', 'she', 'they', 'we', 'you',
            'him', 'her', 'them', 'us', 'his', 'hers', 'their', 'our', 'your', 'myself', 'yourself', 'himself', 'herself', 'themselves',
            'ourselves', 'yourselves', 'from', 'up', 'down', 'out', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
            'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
            'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
        ]);

        const words = text.match(/\b\w+\b/g) || [];

        const freq = {};
        words.forEach(w => {
            if (!stopWords.has(w) && w.length > 2) {
                freq[w] = (freq[w] || 0) + 1;
            }
        });

        const sortedWords = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15);

        wordCloudContainer.innerHTML = '';
        if (sortedWords.length === 0) {
            wordCloudContainer.innerHTML = '<p class="placeholder-text">Reflections will appear here...</p>';
            return;
        }

        sortedWords.forEach(([word, count]) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'word-tag';
            const size = 0.8 + (count * 0.1);
            span.style.fontSize = `${Math.min(size, 2.5)}rem`;
            span.style.opacity = 0.6 + (Math.min(count, 5) * 0.08);
            wordCloudContainer.appendChild(span);
        });
    }

    function updateEntriesList() {
        entriesList.innerHTML = '';
        const recent = state.entries.slice().reverse().slice(0, 5);

        recent.forEach(entry => {
            const li = document.createElement('li');
            li.className = 'entry-item';
            li.innerHTML = `
                <div class="entry-header">
                    <span>${entry.language}</span>
                    <span>${entry.feeling}</span>
                </div>
                <div class="entry-meta">Floor: ${entry.floor || 'Ground'}</div>
                ${entry.reflection ? `<p class="entry-text">"${entry.reflection}"</p>` : ''}
            `;
            entriesList.appendChild(li);
        });
    }

    init();
});
