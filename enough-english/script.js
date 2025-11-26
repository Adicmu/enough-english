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
        ]
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

    // --- Initialization ---
    function init() {
        setupMapInteractions();
        setupFloorControls();
        setupForm();
        setupCharts();
        setupModal();
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
