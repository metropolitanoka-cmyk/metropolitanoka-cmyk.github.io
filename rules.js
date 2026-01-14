// ================================================
// JavaScript для страницы правил
// ================================================

let currentLanguage = 'ru';
let isMusicPlaying = false;
let musicVolume = 0.5;
let isMusicLoaded = false;
let darkThemeEnabled = false;
const backgroundMusic = document.getElementById('background-music');

// Система переводов для страницы правил
const translations = {
    ru: {
        // Заголовки
        pageTitle: "📖 ПРАВИЛА ИГРЫ",
        pageSubtitle: "УГАДАЙ ГОД И МЕСТО ФОТО МОСКВЫ | Историческая викторина с картой",
        mainTitle: "УГАДАЙ ГОД И МЕСТО ФОТО МОСКВЫ | Историческая викторина с картой",
        
        // Описание
        mainDescription: "Бесплатная игра-викторина по истории Москвы. Угадайте год съемки старых фотографий Москвы и отметьте место на карте. 3 режима: Все годы (1800-2000), 90-е (1992-2000), СССР (1917-1991).",
        
        // Как играть
        howToPlayTitle: "Как играть в викторину?",
        step1: "1. Выберите режим игры: Все годы, 90-е или СССР",
        step2: "2. Посмотрите на старую фотографию Москвы",
        step3: "3. Угадайте год съемки с помощью ползунка (1800-2000)",
        step4: "4. Отметьте место на карте Москвы",
        step5: "5. Нажмите 'Подтвердить ответ' и узнайте результат",
        
        // Особенности
        featuresTitle: "Особенности игры:",
        feature1: "Архивные фотографии Москвы разных периодов",
        feature2: "Три режима игры для разных уровней сложности",
        feature3: "Система подсчета очков с бонусами и штрафами",
        feature4: "Таймер на каждый раунд",
        feature5: "Подсказки для сложных фотографий",
        feature6: "Музыкальное сопровождение в стиле эпохи",
        
        // Почему стоит играть
        whyPlayTitle: "Почему стоит играть?",
        whyPlayText: "Викторина 'УГАДАЙ ГОД И МЕСТО ФОТО МОСКВЫ' - это увлекательный способ изучить историю столицы России. Увидьте, как менялся город на протяжении двух веков. Подходит для школьников, студентов и всех, кто интересуется историей Москвы.",
        
        // Исторические периоды
        periodsTitle: "Исторические периоды в игре:",
        period1: "<strong>Москва 19 века:</strong> Архитектура, транспорт, быт дореволюционной Москвы",
        period2: "<strong>Советская Москва (1917-1991):</strong> Изменения в облике города, советские постройки, жизнь в СССР",
        period3: "<strong>Москва 90-х годов:</strong> Период радикальных перемен, появление новой архитектуры и культуры",
        
        // Правила подсчета
        scoringTitle: "ПРАВИЛА ПОДСЧЕТА БАЛЛОВ",
        rule1: "Точный год",
        rule2: "Погрешность 2 года",
        rule3: "Погрешность 5 лет",
        rule4: "Ошибка 5-10 лет",
        rule5: "Ошибка >10 лет",
        rule6: "Точное место (200 м)",
        rule7: "Менее 1 км",
        rule8: "Ошибка >5 км",
        rule9: "Ошибка >10 км",
        rule10: "Подсказка",
        rule11: "Время вышло",
        
        // Ключевые слова
        keyword1: "старые фотографии Москвы",
        keyword2: "история Москвы игра",
        keyword3: "угадай год фото Москвы",
        keyword4: "архивные снимки Москвы",
        keyword5: "викторина по истории Москвы",
        keyword6: "Москва 19 век",
        keyword7: "Москва 20 век",
        keyword8: "СССР Москва",
        keyword9: "90-е Москва",
        keyword10: "образовательные игры про Москву",
        keyword11: "интерактивная карта Москвы",
        
        // Финальный текст
        finalText: "Играйте бесплатно прямо в браузере без регистрации. Подключайтесь к нашему Telegram каналу для обновлений.",
        
        // Кнопки
        playHeaderText: "Играть",
        playBigText: "НАЧАТЬ ИГРАТЬ",
        musicText: "Музыка",
        translateBtn: "EN",
        telegramText: "Telegram",
        
        // Футер
        footerText: "Игра создана с ❤️ для любителей истории Москвы",
        footerSubtext: "Архивные фотографии Москвы",
        
        // Точки в правилах
        pointsText: "балла"
    },
    
    en: {
        // Titles
        pageTitle: "📖 GAME RULES",
        pageSubtitle: "GUESS THE YEAR AND LOCATION OF MOSCOW PHOTOS | Historical Quiz with Map",
        mainTitle: "GUESS THE YEAR AND LOCATION OF MOSCOW PHOTOS | Historical Quiz with Map",
        
        // Description
        mainDescription: "Free quiz game about Moscow history. Guess the year of old Moscow photos and mark the location on the map. 3 modes: All years (1800-2000), 90s (1992-2000), USSR (1917-1991).",
        
        // How to play
        howToPlayTitle: "How to play the quiz?",
        step1: "1. Select game mode: All years, 90s or USSR",
        step2: "2. Look at the old Moscow photo",
        step3: "3. Guess the year using the slider (1800-2000)",
        step4: "4. Mark the location on Moscow map",
        step5: "5. Click 'Submit Answer' and see the result",
        
        // Features
        featuresTitle: "Game Features:",
        feature1: "Archive photos of Moscow from different periods",
        feature2: "Three game modes for different difficulty levels",
        feature3: "Scoring system with bonuses and penalties",
        feature4: "Timer for each round",
        feature5: "Hints for difficult photos",
        feature6: "Music accompaniment in the style of the era",
        
        // Why play
        whyPlayTitle: "Why should you play?",
        whyPlayText: "The quiz 'GUESS THE YEAR AND LOCATION OF MOSCOW PHOTOS' is an exciting way to study the history of the Russian capital. See how the city has changed over two centuries. Suitable for schoolchildren, students and everyone interested in Moscow history.",
        
        // Historical periods
        periodsTitle: "Historical periods in the game:",
        period1: "<strong>19th century Moscow:</strong> Architecture, transport, life of pre-revolutionary Moscow",
        period2: "<strong>Soviet Moscow (1917-1991):</strong> Changes in the city's appearance, Soviet buildings, life in the USSR",
        period3: "<strong>Moscow of the 90s:</strong> Period of radical changes, emergence of new architecture and culture",
        
        // Scoring rules
        scoringTitle: "SCORING RULES",
        rule1: "Exact year",
        rule2: "Error ±2 years",
        rule3: "Error ±5 years",
        rule4: "Mistake 5-10 years",
        rule5: "Mistake >10 years",
        rule6: "Exact location (200 m)",
        rule7: "Less than 1 km",
        rule8: "Mistake >5 km",
        rule9: "Mistake >10 km",
        rule10: "Hint",
        rule11: "Time's up",
        
        // Keywords
        keyword1: "old photos of Moscow",
        keyword2: "Moscow history game",
        keyword3: "guess the year of Moscow photos",
        keyword4: "archive photos of Moscow",
        keyword5: "quiz about Moscow history",
        keyword6: "Moscow 19th century",
        keyword7: "Moscow 20th century",
        keyword8: "USSR Moscow",
        keyword9: "90s Moscow",
        keyword10: "educational games about Moscow",
        keyword11: "interactive map of Moscow",
        
        // Final text
        finalText: "Play for free right in your browser without registration. Join our Telegram channel for updates.",
        
        // Buttons
        playHeaderText: "Play",
        playBigText: "START PLAYING",
        musicText: "Music",
        translateBtn: "DE",
        telegramText: "Telegram",
        
        // Footer
        footerText: "Game created with ❤️ for Moscow history lovers",
        footerSubtext: "Archive photos of Moscow",
        
        // Points in rules
        pointsText: "points"
    },
    
    de: {
        // Titles
        pageTitle: "📖 SPIELREGELN",
        pageSubtitle: "ERRATE JAHR UND ORT VON MOSKAU-FOTOS | Historisches Quiz mit Karte",
        mainTitle: "ERRATE JAHR UND ORT VON MOSKAU-FOTOS | Historisches Quiz mit Karte",
        
        // Description
        mainDescription: "Kostenloses Quiz-Spiel über die Geschichte Moskaus. Errate das Jahr alter Moskau-Fotos und markiere den Ort auf der Karte. 3 Modi: Alle Jahre (1800-2000), 90er (1992-2000), UdSSR (1917-1991).",
        
        // How to play
        howToPlayTitle: "Wie spielt man das Quiz?",
        step1: "1. Wählen Sie den Spielmodus: Alle Jahre, 90er oder UdSSR",
        step2: "2. Sehen Sie sich das alte Moskau-Foto an",
        step3: "3. Erraten Sie das Jahr mit dem Schieberegler (1800-2000)",
        step4: "4. Markieren Sie den Ort auf der Moskau-Karte",
        step5: "5. Klicken Sie 'Antwort bestätigen' und sehen Sie das Ergebnis",
        
        // Features
        featuresTitle: "Spielmerkmale:",
        feature1: "Archivfotos von Moskau aus verschiedenen Epochen",
        feature2: "Drei Spielmodi für unterschiedliche Schwierigkeitsgrade",
        feature3: "Punktesystem mit Boni und Strafen",
        feature4: "Timer für jede Runde",
        feature5: "Hinweise für schwierige Fotos",
        feature6: "Musikbegleitung im Stil der Epoche",
        
        // Why play
        whyPlayTitle: "Warum sollten Sie spielen?",
        whyPlayText: "Das Quiz 'ERRATE JAHR UND ORT VON MOSKAU-FOTOS' ist eine spannende Möglichkeit, die Geschichte der russischen Hauptstadt zu studieren. Sehen Sie, wie sich die Stadt über zwei Jahrhunderte verändert hat. Geeignet für Schüler, Studenten und alle, die sich für die Geschichte Moskaus interessieren.",
        
        // Historical periods
        periodsTitle: "Historische Perioden im Spiel:",
        period1: "<strong>Moskau im 19. Jahrhundert:</strong> Architektur, Transport, Leben im vorrevolutionären Moskau",
        period2: "<strong>Sowjetisches Moskau (1917-1991):</strong> Veränderungen im Stadtbild, sowjetische Gebäude, Leben in der UdSSR",
        period3: "<strong>Moskau in den 90er Jahren:</strong> Zeit radikaler Veränderungen, Entstehung neuer Architektur und Kultur",
        
        // Scoring rules
        scoringTitle: "PUNKTVERGABE",
        rule1: "Exaktes Jahr",
        rule2: "Abweichung ±2 Jahre",
        rule3: "Abweichung ±5 Jahre",
        rule4: "Fehler 5-10 Jahre",
        rule5: "Fehler >10 Jahre",
        rule6: "Exakter Ort (200 m)",
        rule7: "Weniger als 1 km",
        rule8: "Fehler >5 км",
        rule9: "Fehler >10 км",
        rule10: "Hinweis",
        rule11: "Zeit abgelaufen",
        
        // Keywords
        keyword1: "alte Fotos von Moskau",
        keyword2: "Moskau Geschichte Spiel",
        keyword3: "errate das Jahr von Moskau-Fotos",
        keyword4: "Archivfotos von Moskau",
        keyword5: "Quiz über Moskau Geschichte",
        keyword6: "Moskau 19. Jahrhundert",
        keyword7: "Moskau 20. Jahrhundert",
        keyword8: "UdSSR Moskau",
        keyword9: "90er Jahre Moskau",
        keyword10: "Bildungsspiele über Moskau",
        keyword11: "interaktive Karte von Moskau",
        
        // Final text
        finalText: "Spielen Sie kostenlos direkt im Browser ohne Registrierung. Treten Sie unserem Telegram-Kanal für Updates bei.",
        
        // Buttons
        playHeaderText: "Spielen",
        playBigText: "SPIEL STARTEN",
        musicText: "Musik",
        translateBtn: "RU",
        telegramText: "Telegram",
        
        // Footer
        footerText: "Spiel mit ❤️ für Moskau-Geschichtsenthusiasten erstellt",
        footerSubtext: "Archivfotos von Moskau",
        
        // Points in rules
        pointsText: "Punkte"
    }
};

// Функция перевода для правил
function translateText(key, ...args) {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
        console.warn(`Missing translation for key "${key}" in language "${currentLanguage}"`);
        return key;
    }
    
    let text = translations[currentLanguage][key];
    
    if (typeof text === 'function') {
        return text(...args);
    }
    
    return text || key;
}

// Применение перевода для страницы правил
function applyTranslation() {
    try {
        // Заголовки страницы
        if (document.getElementById('page-title')) {
            document.getElementById('page-title').textContent = translateText('pageTitle');
        }
        if (document.getElementById('page-subtitle')) {
            document.getElementById('page-subtitle').textContent = translateText('pageSubtitle');
        }
        if (document.getElementById('main-title')) {
            document.getElementById('main-title').textContent = translateText('mainTitle');
        }
        
        // Основное описание
        if (document.getElementById('main-description')) {
            document.getElementById('main-description').textContent = translateText('mainDescription');
        }
        
        // Как играть
        if (document.getElementById('how-to-play-title')) {
            document.getElementById('how-to-play-title').textContent = translateText('howToPlayTitle');
        }
        if (document.getElementById('step1')) {
            document.getElementById('step1').textContent = translateText('step1');
        }
        if (document.getElementById('step2')) {
            document.getElementById('step2').textContent = translateText('step2');
        }
        if (document.getElementById('step3')) {
            document.getElementById('step3').textContent = translateText('step3');
        }
        if (document.getElementById('step4')) {
            document.getElementById('step4').textContent = translateText('step4');
        }
        if (document.getElementById('step5')) {
            document.getElementById('step5').textContent = translateText('step5');
        }
        
        // Особенности
        if (document.getElementById('features-title')) {
            document.getElementById('features-title').textContent = translateText('featuresTitle');
        }
        if (document.getElementById('feature1')) {
            document.getElementById('feature1').textContent = translateText('feature1');
        }
        if (document.getElementById('feature2')) {
            document.getElementById('feature2').textContent = translateText('feature2');
        }
        if (document.getElementById('feature3')) {
            document.getElementById('feature3').textContent = translateText('feature3');
        }
        if (document.getElementById('feature4')) {
            document.getElementById('feature4').textContent = translateText('feature4');
        }
        if (document.getElementById('feature5')) {
            document.getElementById('feature5').textContent = translateText('feature5');
        }
        if (document.getElementById('feature6')) {
            document.getElementById('feature6').textContent = translateText('feature6');
        }
        
        // Почему стоит играть
        if (document.getElementById('why-play-title')) {
            document.getElementById('why-play-title').textContent = translateText('whyPlayTitle');
        }
        if (document.getElementById('why-play-text')) {
            document.getElementById('why-play-text').textContent = translateText('whyPlayText');
        }
        
        // Исторические периоды
        if (document.getElementById('periods-title')) {
            document.getElementById('periods-title').textContent = translateText('periodsTitle');
        }
        if (document.getElementById('period1')) {
            document.getElementById('period1').innerHTML = translateText('period1');
        }
        if (document.getElementById('period2')) {
            document.getElementById('period2').innerHTML = translateText('period2');
        }
        if (document.getElementById('period3')) {
            document.getElementById('period3').innerHTML = translateText('period3');
        }
        
        // Правила подсчета
        if (document.getElementById('scoring-title')) {
            document.getElementById('scoring-title').textContent = translateText('scoringTitle');
        }
        if (document.getElementById('rule1')) {
            document.getElementById('rule1').textContent = translateText('rule1');
        }
        if (document.getElementById('rule2')) {
            document.getElementById('rule2').textContent = translateText('rule2');
        }
        if (document.getElementById('rule3')) {
            document.getElementById('rule3').textContent = translateText('rule3');
        }
        if (document.getElementById('rule4')) {
            document.getElementById('rule4').textContent = translateText('rule4');
        }
        if (document.getElementById('rule5')) {
            document.getElementById('rule5').textContent = translateText('rule5');
        }
        if (document.getElementById('rule6')) {
            document.getElementById('rule6').textContent = translateText('rule6');
        }
        if (document.getElementById('rule7')) {
            document.getElementById('rule7').textContent = translateText('rule7');
        }
        if (document.getElementById('rule8')) {
            document.getElementById('rule8').textContent = translateText('rule8');
        }
        if (document.getElementById('rule9')) {
            document.getElementById('rule9').textContent = translateText('rule9');
        }
        if (document.getElementById('rule10')) {
            document.getElementById('rule10').textContent = translateText('rule10');
        }
        if (document.getElementById('rule11')) {
            document.getElementById('rule11').textContent = translateText('rule11');
        }
        
        // Ключевые слова
        for (let i = 1; i <= 11; i++) {
            const element = document.getElementById(`keyword${i}`);
            if (element) {
                element.textContent = translateText(`keyword${i}`);
            }
        }
        
        // Финальный текст
        if (document.getElementById('final-text')) {
            document.getElementById('final-text').textContent = translateText('finalText');
        }
        
        // Кнопки
        if (document.getElementById('play-header-text')) {
            document.getElementById('play-header-text').textContent = translateText('playHeaderText');
        }
        if (document.getElementById('play-big-text')) {
            document.getElementById('play-big-text').textContent = translateText('playBigText');
        }
        if (document.getElementById('music-text')) {
            document.getElementById('music-text').textContent = translateText('musicText');
        }
        if (document.getElementById('translate-text')) {
            document.getElementById('translate-text').textContent = translateText('translateBtn');
        }
        if (document.getElementById('telegram-text')) {
            document.getElementById('telegram-text').textContent = translateText('telegramText');
        }
        
        // Футер
        if (document.getElementById('footer-text')) {
            document.getElementById('footer-text').textContent = translateText('footerText');
        }
        if (document.getElementById('footer-subtext')) {
            document.getElementById('footer-subtext').textContent = translateText('footerSubtext');
        }
        
        // Обновляем единицы измерения
        const pointsUnits = document.querySelectorAll('.points-unit');
        pointsUnits.forEach(unit => {
            if (unit) {
                unit.textContent = translateText('pointsText');
            }
        });
        
        console.log('Перевод применен для языка:', currentLanguage);
        
    } catch (error) {
        console.error('Ошибка при применении перевода:', error);
    }
}

// Переключение языка на странице правил
function toggleLanguage() {
    const languages = ['ru', 'en', 'de'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    currentLanguage = languages[nextIndex];
    
    // Сохраняем язык в localStorage для синхронизации с главной страницей
    localStorage.setItem('moscow-game-language', currentLanguage);
    
    console.log('Язык переключен на:', currentLanguage);
    
    applyTranslation();
}

// ================================================
// УПРАВЛЕНИЕ МУЗЫКОЙ
// ================================================

function initMusic() {
    try {
        // Загружаем сохраненную громкость
        const savedVolume = localStorage.getItem('moscow-game-volume');
        
        if (savedVolume) {
            musicVolume = parseFloat(savedVolume);
        }
        
        // Настраиваем аудио элемент
        backgroundMusic.volume = musicVolume;
        backgroundMusic.loop = true;
        
        // Настраиваем слайдер громкости
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.value = musicVolume;
        }
        
        // Скрываем контролы громкости по умолчанию
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl) {
            volumeControl.style.display = 'none';
        }
        
        // Проверяем, была ли музыка включена ранее
        const savedMusicState = localStorage.getItem('moscow-game-music');
        if (savedMusicState === 'playing') {
            // Пробуем включить музыку автоматически
            setTimeout(() => {
                playMusic();
                const musicBtn = document.getElementById('music-btn');
                if (musicBtn) {
                    musicBtn.classList.add('active');
                }
                if (volumeControl) {
                    volumeControl.style.display = 'flex';
                }
            }, 1000);
        }
        
        updateAudioIndicator();
        
        console.log('Музыка инициализирована, громкость:', musicVolume);
        
    } catch (error) {
        console.error('Ошибка инициализации музыки:', error);
    }
}

function loadAndPlayMusic() {
    return new Promise((resolve, reject) => {
        try {
            if (!isMusicLoaded) {
                // Создаем источник аудио
                const source = document.createElement('source');
                source.src = 'audio/moscow_never_sleep.mp3';
                source.type = 'audio/mpeg';
                
                // Очищаем предыдущие источники
                while (backgroundMusic.firstChild) {
                    backgroundMusic.removeChild(backgroundMusic.firstChild);
                }
                
                // Добавляем новый источник
                backgroundMusic.appendChild(source);
                
                // Загружаем аудио
                backgroundMusic.load();
                isMusicLoaded = true;
                
                // Добавляем обработчик ошибок
                backgroundMusic.onerror = function() {
                    console.error('Ошибка загрузки аудио файла');
                    reject(new Error('Ошибка загрузки аудио файла'));
                };
                
                backgroundMusic.oncanplaythrough = function() {
                    console.log('Аудио файл загружен и готов к воспроизведению');
                    resolve();
                };
                
                // Таймаут на случай, если загрузка зависнет
                setTimeout(() => {
                    if (backgroundMusic.readyState < 3) {
                        console.warn('Загрузка аудио занимает слишком много времени');
                        resolve(); // Все равно разрешаем, возможно аудио загрузится позже
                    }
                }, 5000);
                
            } else {
                // Музыка уже загружена
                resolve();
            }
        } catch (error) {
            console.error('Ошибка при загрузке музыки:', error);
            reject(error);
        }
    });
}

async function playMusic() {
    try {
        // Загружаем музыку, если еще не загружена
        await loadAndPlayMusic();
        
        // Пробуем воспроизвести
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isMusicPlaying = true;
                    localStorage.setItem('moscow-game-music', 'playing');
                    console.log('Музыка воспроизводится');
                    updateAudioIndicator();
                })
                .catch(error => {
                    console.log('Ошибка воспроизведения музыки:', error);
                    if (error.name === 'NotAllowedError') {
                        // Браузер заблокировал автовоспроизведение
                        console.log('Автовоспроизведение заблокировано браузером');
                        // Показываем сообщение пользователю
                        alert('Нажмите на кнопку "Музыка" еще раз, чтобы разрешить воспроизведение музыки');
                        isMusicPlaying = false;
                        updateAudioIndicator();
                    }
                });
        }
    } catch (error) {
        console.error('Ошибка при попытке воспроизведения музыки:', error);
        isMusicPlaying = false;
        updateAudioIndicator();
    }
}

function pauseMusic() {
    try {
        backgroundMusic.pause();
        isMusicPlaying = false;
        localStorage.setItem('moscow-game-music', 'paused');
        console.log('Музыка приостановлена');
        updateAudioIndicator();
    } catch (error) {
        console.error('Ошибка при приостановке музыки:', error);
    }
}

function toggleMusic() {
    console.log('Переключение музыки, текущее состояние:', isMusicPlaying);
    
    if (isMusicPlaying) {
        pauseMusic();
        const musicBtn = document.getElementById('music-btn');
        if (musicBtn) {
            musicBtn.classList.remove('active');
        }
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl) {
            volumeControl.style.display = 'none';
        }
    } else {
        playMusic();
        const musicBtn = document.getElementById('music-btn');
        if (musicBtn) {
            musicBtn.classList.add('active');
        }
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl) {
            volumeControl.style.display = 'flex';
        }
    }
}

function setMusicVolume(volume) {
    try {
        musicVolume = volume;
        backgroundMusic.volume = volume;
        localStorage.setItem('moscow-game-volume', volume.toString());
        updateAudioIndicator();
        console.log('Громкость установлена на:', volume);
    } catch (error) {
        console.error('Ошибка при установке громкости:', error);
    }
}

function updateAudioIndicator() {
    const indicator = document.getElementById('audio-indicator');
    if (!indicator) return;
    
    if (isMusicPlaying) {
        indicator.classList.add('pulsing');
        indicator.innerHTML = musicVolume > 0.7 ? '<i class="fas fa-volume-up"></i>' : 
                             musicVolume > 0.3 ? '<i class="fas fa-volume-down"></i>' : 
                             '<i class="fas fa-volume-off"></i>';
    } else {
        indicator.classList.remove('pulsing');
        indicator.innerHTML = '<i class="fas fa-music"></i>';
    }
}

// ================================================
// ТЕМНАЯ ТЕМА
// ================================================

function initDarkTheme() {
    try {
        const savedTheme = localStorage.getItem('moscow-game-dark-theme');
        
        if (savedTheme === 'enabled') {
            darkThemeEnabled = true;
            document.body.setAttribute('data-theme', 'dark');
            console.log('Темная тема включена');
        } else {
            darkThemeEnabled = false;
            document.body.removeAttribute('data-theme');
            console.log('Светлая тема включена');
        }
    } catch (error) {
        console.error('Ошибка инициализации темы:', error);
    }
}

// ================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ================================================

function setupEventListeners() {
    try {
        // Кнопка перевода
        const translateBtn = document.getElementById('translate-btn');
        if (translateBtn) {
            translateBtn.addEventListener('click', toggleLanguage);
            console.log('Обработчик для кнопки перевода установлен');
        }
        
        // Кнопка музыки
        const musicBtn = document.getElementById('music-btn');
        if (musicBtn) {
            musicBtn.addEventListener('click', toggleMusic);
            console.log('Обработчик для кнопки музыки установлен');
        }
        
        // Слайдер громкости
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                setMusicVolume(parseFloat(this.value));
            });
            console.log('Обработчик для слайдера громкости установлен');
        }
        
        // Аудио индикатор
        const audioIndicator = document.getElementById('audio-indicator');
        if (audioIndicator) {
            audioIndicator.addEventListener('click', toggleMusic);
            console.log('Обработчик для аудио индикатора установлен');
        }
        
        // Добавляем обработчик для кнопки "Играть" в верхней панели
        const playHeaderBtn = document.querySelector('a.btn-play-header');
        if (playHeaderBtn) {
            playHeaderBtn.addEventListener('click', function(e) {
                // Убедимся, что это обычный переход по ссылке
                console.log('Переход на главную страницу');
            });
        }
        
        // Добавляем обработчик для большой кнопки "Играть"
        const playBigBtn = document.querySelector('a.btn-play');
        if (playBigBtn) {
            playBigBtn.addEventListener('click', function(e) {
                console.log('Переход на главную страницу через большую кнопку');
            });
        }
        
        console.log('Все обработчики событий установлены');
        
    } catch (error) {
        console.error('Ошибка при установке обработчиков событий:', error);
    }
}

// ================================================
// ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ПРАВИЛ
// ================================================

function initRulesPage() {
    console.log('Инициализация страницы правил...');
    
    try {
        // Загружаем сохраненный язык
        const savedLanguage = localStorage.getItem('moscow-game-language');
        
        if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en' || savedLanguage === 'de')) {
            currentLanguage = savedLanguage;
            console.log('Язык загружен из localStorage:', currentLanguage);
        } else {
            currentLanguage = 'ru';
            localStorage.setItem('moscow-game-language', 'ru');
            console.log('Язык установлен по умолчанию: русский');
        }
        
        // Инициализируем темную тему
        initDarkTheme();
        
        // Инициализируем музыку
        initMusic();
        
        // Применяем перевод
        applyTranslation();
        
        // Устанавливаем обработчики событий
        setupEventListeners();
        
        console.log('✅ Страница правил успешно инициализирована');
        console.log('Текущий язык:', currentLanguage);
        console.log('Состояние музыки:', isMusicPlaying ? 'играет' : 'выключена');
        console.log('Громкость:', musicVolume);
        
        // Проверяем аудио файл
        console.log('Проверка аудио файла...');
        const audio = new Audio();
        audio.src = 'audio/moscow_never_sleep.mp3';
        audio.oncanplay = () => {
            console.log('✅ Аудио файл доступен и может быть воспроизведен');
        };
        audio.onerror = () => {
            console.error('❌ Аудио файл не найден или недоступен');
            console.log('Убедитесь, что файл audio/moscow_never_sleep.mp3 существует в папке audio');
        };
        
    } catch (error) {
        console.error('❌ Ошибка при инициализации страницы правил:', error);
    }
}

// Запуск инициализации при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRulesPage);
} else {
    initRulesPage();
}

// Также инициализируем при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
});

// Экспортируем функции для отладки
window.rulesPage = {
    init: initRulesPage,
    toggleLanguage: toggleLanguage,
    toggleMusic: toggleMusic,
    setMusicVolume: setMusicVolume,
    applyTranslation: applyTranslation,
    getCurrentLanguage: () => currentLanguage,
    getMusicState: () => ({ isPlaying: isMusicPlaying, volume: musicVolume })
};