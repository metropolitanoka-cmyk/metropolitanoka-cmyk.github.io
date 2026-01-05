// ================================================
// МОСКВА: МАШИНА ВРЕМЕНИ - КЛИЕНТСКАЯ ЧАСТЬ (БЕЗ СЕРВЕРА)
// ================================================

// Глобальные переменные игры
let score = 0;
let currentRound = 1;
const totalRounds = 10;
let currentPhotoData = null;
let userMarker = null;
let correctMarker = null;
let correctCircle = null;
let timerInterval = null;
let timeLeft = 60;
let currentLanguage = 'ru';
let isMobile = window.innerWidth <= 768;
let isGameStarted = false;
let previewInterval = null;

// Новые переменные для настроек
let roundTime = 60;
let distancePenaltyEnabled = true;
let darkThemeEnabled = false;

// Переменные для музыки
let isMusicPlaying = false;
let musicVolume = 0.5;
let isMusicLoaded = false; // Флаг: была ли музыка загружена
const backgroundMusic = document.getElementById('background-music');

// Переменные для режимов игры
let currentGameMode = 'all';
let currentMinYear = 1800;
let currentMaxYear = 2000;
let currentModeName = 'Все годы';
let photosInCurrentMode = 0;

// Новая переменная: был ли перемещен ползунок года в текущем раунде
let yearSliderMoved = false;

// СИСТЕМА ПРЕДОТВРАЩЕНИЯ ПОВТОРЕНИЯ ФОТОГРАФИЙ
let usedPhotoIds = new Set(); // ID уже использованных фотографий в текущей игре
let gamePhotosQueue = []; // Очередь фотографий для текущей игры (10 штук)

// Система переводов (расширенная с немецким и новым SEO-контентом)
const translations = {
    ru: {
        // Заголовки
        gameTitle: "🚀 Москва: Машина Времени",
        gameSubtitle: "Угадай год и место старых фотографий Москвы!",
        roundText: "Раунд:",
        
        // Управление
        submitText: "Подтвердить ответ",
        nextText: "Следующий раунд",
        hintText: "Подсказка (-1 балл)",
        continueText: "Продолжить",
        translateBtn: "EN",
        playText: "Играть",
        
        // Музыка
        musicOn: "Музыка",
        musicOff: "Музыка",
        volume: "Громкость",
        
        // Режимы игры
        modeTitle: "Выберите период игры",
        modeAll: "Все годы",
        mode90s: "ЛИХИЕ 90-е",
        modeUSSR: "СССР",
        modeCustom: "Произвольный",
        modeHint: "Для игры нужно минимум 10 фотографий в выбранном периоде",
        photosCount: "фото",
        rangeAll: "1800-2000",
        range90s: "1992-2000",
        rangeUSSR: "1917-1991",
        
        // Интерфейс
        scoreTitle: "Ваш счет",
        pointsText: "баллов",
        yearTitle: "Выберите год съемки",
        mapTitle: "Отметьте место на карте",
        mapHint: "Кликните на карте, чтобы отметить предполагаемое место съемки",
        mobileHint: "Нажмите на карту, чтобы отметить место. Чтобы начать игру выберите режим (ниже).",
        timerTitle: "Время на раунд",
        secondsText: "секунд",
        
        // Настройки
        settingsTitle: "Настройки игры",
        timeSettingTitle: "Время на раунд",
        penaltySettingTitle: "Штрафы за ошибки места",
        penaltyToggleLabel: "Включить штрафы",
        penaltyHint: ">5 км: -2 балла | >10 км: -3 балла",
        timeHint: "Текущее время: ",
        themeSettingTitle: "Темная тема",
        themeToggleLabel: "Включить темную тему",
        themeHint: "Переключает темную и светлую тему",
        
        // Правила
        rulesTitle: "Правила подсчета очков",
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
        rulesHint: "Штрафы за ошибки места можно включить/выключить в настройках",
        
        // Превью
        placeholderText: "Выберите режим игры, чтобы начать. Select the game mode to start.",
        previewText: "Превью: фото меняются каждые 5 сек",
        
        // Telegram
        telegramText: "Telegram канал",
        
        // Сообщения
        selectPlace: "Сначала отметьте место на карте!",
        selectYear: "Для ответа выберите год",
        selectYearMessage: "Пожалуйста, выберите год с помощью ползунка перед отправкой ответа.",
        timeOut: "Время вышло! Списывается 2 балла.",
        gameOverTitle: "🎉 Игра окончена!",
        gameOverScore: "Ваш итоговый счет:",
        gameOverPerformance: (score) => {
            if (score >= 20) return "отличной";
            if (score >= 10) return "хорошей";
            return "неплохой";
        },
        gameOverMessage: "Нажмите OK для начала новой игры.",
        
        // Подсказки
        hintConfirm: "Использовать подсказка? Это будет стоить 1 балл.",
        hintDecade: (decade) => `Подсказка: Эта фотография сделана в ${decade}-х годах`,
        noHintPoints: "Недостаточно баллов для подсказки или фото не загружено!",
        
        // Ошибки
        loadError: "Не удалось загрузить фотографию. Попробуйте обновить страницу.",
        apiError: "Ошибка связи с сервером. Обнови страницу.",
        
        // Результаты
        resultExcellent: "✅ Отличный результат!",
        resultGood: "❌ Можно лучше!",
        resultNeutral: "➖ Нейтральный результат",
        yearAccuracy: "Точность года:",
        locationAccuracy: "Точность места:",
        distance: "Расстояние:",
        meters: "метров",
        roundTotal: "Итого за раунд:",
        totalScore: "Общий счет:",
        
        // Детали результата
        yourYear: "Ваш год",
        correctYear: "Правильный год",
        yearDifference: "Разница",
        years: "лет",
        locationName: "Место",
        locationText: "Локация",
        
        // Режимы игры
        modeLoading: "Загрузка режима...",
        modeAvailable: "✅ Режим доступен",
        modeUnavailable: "❌ Режим недоступен",
        modeNotEnough: "Невозможно, недостаточно фотографий",
        modeNotEnoughText: (count) => `В выбранном периоде только ${count} фото. Минимум 10.`,
        modeNoPhotos: "В выбранном периоде нет фотографий",
        modeInvalidRange: "Неверный диапазон лет",
        modeChanged: "Режим изменен: ",
        
        // Футер
        footerText: "Игра создана с ❤️ для любителей истории Москвы",
        footerSubtext: "Фотографии из различных источников",
        
        // ========== НОВЫЙ SEO-КОНТЕНТ (добавлен) ==========
        seoMainTitle: "УГАДАЙ ГОД И МЕСТО ФОТО МОСКВЫ | Историческая викторина с картой",
        seoMainDescription: "Бесплатная игра-викторина по истории Москвы. Угадайте год съемки старых фотографий Москвы и отметьте место на карте. 3 режима: Все годы (1800-2000), 90-е (1992-2000), СССР (1917-1991).",
        
        seoHowToPlayTitle: "Как играть в викторину?",
        seoStep1: "1. Выберите режим игры: Все годы, 90-е или СССР",
        seoStep2: "2. Посмотрите на старую фотографию Москвы",
        seoStep3: "3. Угадайте год съемки с помощью ползунка (1800-2000)",
        seoStep4: "4. Отметьте место на карте Москвы",
        seoStep5: "5. Нажмите 'Подтвердить ответ' и узнайте результат",
        
        seoFeaturesTitle: "Особенности игры:",
        seoFeature1: "Архивные фотографии Москвы разных периодов",
        seoFeature2: "Три режима игры для разных уровней сложности",
        seoFeature3: "Система подсчета очков с бонусами и штрафами",
        seoFeature4: "Таймер на каждый раунд",
        seoFeature5: "Подсказки для сложных фотографий",
        seoFeature6: "Музыкальное сопровождение в стиле эпохи",
        
        seoWhyPlayTitle: "Почему стоит играть?",
        seoWhyPlayText: "Викторина 'УГАДАЙ ГОД И МЕСТО ФОТО МОСКВЫ' - это увлекательный способ изучить историю столицы России. Увидьте, как менялся город на протяжении двух веков. Подходит для школьников, студентов и всех, кто интересуется историей Москвы.",
        
        seoPeriodsTitle: "Исторические периоды в игре:",
        seoPeriod1: "<strong>Москва 19 века:</strong> Архитектура, транспорт, быт дореволюционной Москвы",
        seoPeriod2: "<strong>Советская Москва (1917-1991):</strong> Изменения в облике города, советские постройки, жизнь в СССР",
        seoPeriod3: "<strong>Москва 90-х годов:</strong> Период радикальных перемен, появление новой архитектуры и культуры",
        
        seoFinalText: "Играйте бесплатно прямо в браузере без регистрации. Подключайтесь к нашему Telegram каналу для обновлений.",
        
        // SEO ключевые слова
        seoKeyword1: "старые фотографии Москвы",
        seoKeyword2: "история Москвы игра",
        seoKeyword3: "угадай год фото Москвы",
        seoKeyword4: "архивные снимки Москвы",
        seoKeyword5: "викторина по истории Москвы",
        seoKeyword6: "Москва 19 век",
        seoKeyword7: "Москва 20 век",
        seoKeyword8: "СССР Москва",
        seoKeyword9: "90-е Москва",
        seoKeyword10: "образовательные игры про Москву",
        seoKeyword11: "интерактивная карта Москвы"
    },
    
    en: {
        // Titles
        gameTitle: "🚀 Moscow: Time Machine",
        gameSubtitle: "Guess the year and location of old Moscow photos!",
        roundText: "Round:",
        
        // Controls
        submitText: "Submit Answer",
        nextText: "Next Round",
        hintText: "Hint (-1 point)",
        continueText: "Continue",
        translateBtn: "DE",
        playText: "Play",
        
        // Music
        musicOn: "Music",
        musicOff: "Music",
        volume: "Volume",
        
        // Game modes
        modeTitle: "Select Game Mode",
        modeAll: "All Years",
        mode90s: "WILD 90s",
        modeUSSR: "USSR",
        modeCustom: "Custom Range",
        modeHint: "Minimum 10 photos required for selected period",
        photosCount: "photos",
        rangeAll: "1800-2000",
        range90s: "1992-2000",
        rangeUSSR: "1917-1991",
        
        // Interface
        scoreTitle: "Your Score",
        pointsText: "points",
        yearTitle: "Select Year",
        mapTitle: "Mark Location on Map",
        mapHint: "Click on map to mark location",
        mobileHint: "Tap on map to mark location. To start selecting a mode (below).",
        timerTitle: "Time per Round",
        secondsText: "seconds",
        
        // Settings
        settingsTitle: "Game Settings",
        timeSettingTitle: "Time per Round",
        penaltySettingTitle: "Distance Penalties",
        penaltyToggleLabel: "Enable Penalties",
        penaltyHint: ">5 km: -2 points | >10 km: -3 points",
        timeHint: "Current time: ",
        themeSettingTitle: "Dark Theme",
        themeToggleLabel: "Enable Dark Theme",
        themeHint: "Switches between dark and light theme",
        
        // Rules
        rulesTitle: "Scoring Rules",
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
        rulesHint: "Distance penalties can be toggled in settings",
        
        // Preview
        placeholderText: "Select game mode to start",
        previewText: "Preview: photos change every 5 sec",
        
        // Telegram
        telegramText: "Telegram Channel",
        
        // Messages
        selectPlace: "First mark a place on the map!",
        selectYear: "Please select a year",
        selectYearMessage: "Please select a year using the slider before submitting your answer.",
        timeOut: "Time's up! Minus 2 points.",
        gameOverTitle: "🎉 Game Over!",
        gameOverScore: "Your final score:",
        gameOverPerformance: (score) => {
            if (score >= 20) return "excellent";
            if (score >= 10) return "good";
            return "not bad";
        },
        gameOverMessage: "Press OK to start a new game.",
        
        // Hints
        hintConfirm: "Use a hint? It will cost 1 point.",
        hintDecade: (decade) => `Hint: This photo was taken in the ${decade}s`,
        noHintPoints: "Not enough points for a hint or photo not loaded!",
        
        // Errors
        loadError: "Failed to load photo. Please refresh the page.",
        apiError: "Server connection error. Refresh the page.",
        
        // Results
        resultExcellent: "✅ Excellent!",
        resultGood: "❌ Could be better!",
        resultNeutral: "➖ Neutral result",
        yearAccuracy: "Year accuracy:",
        locationAccuracy: "Location accuracy:",
        distance: "Distance:",
        meters: "meters",
        roundTotal: "Round total:",
        totalScore: "Total score:",
        
        // Result details
        yourYear: "Your year",
        correctYear: "Correct year",
        yearDifference: "Difference",
        years: "years",
        locationName: "Place",
        locationText: "Location",
        
        // Game modes
        modeLoading: "Loading mode...",
        modeAvailable: "✅ Mode available",
        modeUnavailable: "❌ Mode unavailable",
        modeNotEnough: "Impossible, not enough photos",
        modeNotEnoughText: (count) => `Only ${count} photos in selected period. Minimum 10.`,
        modeNoPhotos: "No photos in selected period",
        modeInvalidRange: "Invalid year range",
        modeChanged: "Mode changed: ",
        
        // Footer
        footerText: "Game created with ❤️ for Moscow history lovers",
        footerSubtext: "Photos from various sources",
        
        // ========== НОВЫЙ SEO-КОНТЕНТ (добавлен) ==========
        seoMainTitle: "GUESS THE YEAR AND LOCATION OF MOSCOW PHOTOS | Historical Quiz with Map",
        seoMainDescription: "Free quiz game about Moscow history. Guess the year of old Moscow photos and mark the location on the map. 3 modes: All years (1800-2000), 90s (1992-2000), USSR (1917-1991).",
        
        seoHowToPlayTitle: "How to play the quiz?",
        seoStep1: "1. Select game mode: All years, 90s or USSR",
        seoStep2: "2. Look at the old Moscow photo",
        seoStep3: "3. Guess the year using the slider (1800-2000)",
        seoStep4: "4. Mark the location on Moscow map",
        seoStep5: "5. Click 'Submit Answer' and see the result",
        
        seoFeaturesTitle: "Game Features:",
        seoFeature1: "Archive photos of Moscow from different periods",
        seoFeature2: "Three game modes for different difficulty levels",
        seoFeature3: "Scoring system with bonuses and penalties",
        seoFeature4: "Timer for each round",
        seoFeature5: "Hints for difficult photos",
        seoFeature6: "Music accompaniment in the style of the era",
        
        seoWhyPlayTitle: "Why should you play?",
        seoWhyPlayText: "The quiz 'GUESS THE YEAR AND LOCATION OF MOSCOW PHOTOS' is an exciting way to study the history of the Russian capital. See how the city has changed over two centuries. Suitable for schoolchildren, students and everyone interested in Moscow history.",
        
        seoPeriodsTitle: "Historical periods in the game:",
        seoPeriod1: "<strong>19th century Moscow:</strong> Architecture, transport, life of pre-revolutionary Moscow",
        seoPeriod2: "<strong>Soviet Moscow (1917-1991):</strong> Changes in the city's appearance, Soviet buildings, life in the USSR",
        seoPeriod3: "<strong>Moscow of the 90s:</strong> Period of radical changes, emergence of new architecture and culture",
        
        seoFinalText: "Play for free right in your browser without registration. Join our Telegram channel for updates.",
        
        // SEO ключевые слова
        seoKeyword1: "old photos of Moscow",
        seoKeyword2: "Moscow history game",
        seoKeyword3: "guess the year of Moscow photos",
        seoKeyword4: "archive photos of Moscow",
        seoKeyword5: "quiz about Moscow history",
        seoKeyword6: "Moscow 19th century",
        seoKeyword7: "Moscow 20th century",
        seoKeyword8: "USSR Moscow",
        seoKeyword9: "90s Moscow",
        seoKeyword10: "educational games about Moscow",
        seoKeyword11: "interactive map of Moscow"
    },
    
    de: {
        // Titles
        gameTitle: "🚀 Moskau: Zeitmaschine",
        gameSubtitle: "Errate das Jahr und den Ort alter Moskau-Fotos!",
        roundText: "Runde:",
        
        // Controls
        submitText: "Antwort bestätigen",
        nextText: "Nächste Runde",
        hintText: "Hinweis (-1 Punkt)",
        continueText: "Weiter",
        translateBtn: "RU",
        playText: "Spielen",
        
        // Music
        musicOn: "Musik",
        musicOff: "Musik",
        volume: "Lautstärke",
        
        // Game modes
        modeTitle: "Spielmodus auswählen",
        modeAll: "Alle Jahre",
        mode90s: "WILDE 90er",
        modeUSSR: "UdSSR",
        modeCustom: "Benutzerdefinierter Bereich",
        modeHint: "Mindestens 10 Fotos im ausgewählten Zeitraum erforderlich",
        photosCount: "Fotos",
        rangeAll: "1800-2000",
        range90s: "1992-2000",
        rangeUSSR: "1917-1991",
        
        // Interface
        scoreTitle: "Ihr Punktestand",
        pointsText: "Punkte",
        yearTitle: "Jahr auswählen",
        mapTitle: "Ort auf Karte markieren",
        mapHint: "Klicken Sie auf die Karte, um den Ort zu markieren",
        mobileHint: "Tippen Sie auf die Karte, um den Ort zu markieren. Um das Spiel zu starten, wählen Sie den Modus (unten).",
        timerTitle: "Zeit pro Runde",
        secondsText: "Sekunden",
        
        // Settings
        settingsTitle: "Spieleinstellungen",
        timeSettingTitle: "Zeit pro Runde",
        penaltySettingTitle: "Entfernungsstrafen",
        penaltyToggleLabel: "Strafen aktivieren",
        penaltyHint: ">5 km: -2 Punkte | >10 km: -3 Punkte",
        timeHint: "Aktuelle Zeit: ",
        themeSettingTitle: "Dunkles Design",
        themeToggleLabel: "Dunkles Design aktivieren",
        themeHint: "Wechselt zwischen dunklem und hellem Design",
        
        // Rules
        rulesTitle: "Punktvergabe",
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
        rulesHint: "Entfernungsstrafen können in den Einstellungen ein-/ausgeschaltet werden",
        
        // Preview
        placeholderText: "Spielmodus auswählen, um zu beginnen",
        previewText: "Vorschau: Fotos wechseln alle 5 Sekunden",
        
        // Telegram
        telegramText: "Telegram-Kanal",
        
        // Messages
        selectPlace: "Zuerst einen Ort auf der Karte markieren!",
        selectYear: "Bitte wählen Sie ein Jahr aus",
        selectYearMessage: "Bitte wählen Sie mit dem Schieberegler ein Jahr aus, bevor Sie Ihre Antwort senden.",
        timeOut: "Zeit abgelaufen! Minus 2 Punkte.",
        gameOverTitle: "🎉 Spiel beendet!",
        gameOverScore: "Ihr Endergebnis:",
        gameOverPerformance: (score) => {
            if (score >= 20) return "ausgezeichnetem";
            if (score >= 10) return "gutem";
            return "nicht schlechtem";
        },
        gameOverMessage: "Drücken Sie OK, um ein neues Spiel zu starten.",
        
        // Hints
        hintConfirm: "Hinweis verwenden? Das kostet 1 Punkt.",
        hintDecade: (decade) => `Hinweis: Dieses Foto wurde in den ${decade}er Jahren aufgenommen`,
        noHintPoints: "Nicht genug Punkте für einen Hinweis oder Foto nicht geladen!",
        
        // Errors
        loadError: "Foto konnte nicht geladen werden. Bitte Seite aktualisieren.",
        apiError: "Serververbindungsfehler. Seite aktualisieren.",
        
        // Results
        resultExcellent: "✅ Ausgezeichnet!",
        resultGood: "❌ Könnte besser sein!",
        resultNeutral: "➖ Neutrales Ergebnis",
        yearAccuracy: "Jahresgenauigkeit:",
        locationAccuracy: "Ortsgenauigkeit:",
        distance: "Entfernung:",
        meters: "Meter",
        roundTotal: "Rundenergebnis:",
        totalScore: "Gesamtpunktzahl:",
        
        // Result details
        yourYear: "Ihr Jahr",
        correctYear: "Richtiges Jahr",
        yearDifference: "Differenz",
        years: "Jahre",
        locationName: "Ort",
        locationText: "Lage",
        
        // Game modes
        modeLoading: "Lade Modus...",
        modeAvailable: "✅ Modus verfügbar",
        modeUnavailable: "❌ Modus nicht verfügbar",
        modeNotEnough: "Nicht möglich, nicht genug Fotos",
        modeNotEnoughText: (count) => `Nur ${count} Fotos im ausgewählten Zeitraum. Mindestens 10 erforderlich.`,
        modeNoPhotos: "Keine Fotos im ausgewählten Zeitraum",
        modeInvalidRange: "Ungültiger Jahresbereich",
        modeChanged: "Modus geändert: ",
        
        // Footer
        footerText: "Spiel mit ❤️ für Moskau-Geschichtsenthusiasten erstellt",
        footerSubtext: "Fotos aus verschiedenen Quellen",
        
        // ========== НОВЫЙ SEO-КОНТЕНТ (добавлен) ==========
        seoMainTitle: "ERRATE JAHR UND ORT VON MOSKAU-FOTOS | Historisches Quiz mit Karte",
        seoMainDescription: "Kostenloses Quiz-Spiel über die Geschichte Moskaus. Errate das Jahr alter Moskau-Fotos und markiere den Ort auf der Karte. 3 Modi: Alle Jahre (1800-2000), 90er (1992-2000), UdSSR (1917-1991).",
        
        seoHowToPlayTitle: "Wie spielt man das Quiz?",
        seoStep1: "1. Wählen Sie den Spielmodus: Alle Jahre, 90er oder UdSSR",
        seoStep2: "2. Sehen Sie sich das alte Moskau-Foto an",
        seoStep3: "3. Erraten Sie das Jahr mit dem Schieberegler (1800-2000)",
        seoStep4: "4. Markieren Sie den Ort auf der Moskau-Karte",
        seoStep5: "5. Klicken Sie 'Antwort bestätigen' und sehen Sie das Ergebnis",
        
        seoFeaturesTitle: "Spielmerkmale:",
        seoFeature1: "Archivfotos von Moskau aus verschiedenen Epochen",
        seoFeature2: "Drei Spielmodi für unterschiedliche Schwierigkeitsgrade",
        seoFeature3: "Punktesystem mit Boni und Strafen",
        seoFeature4: "Timer für jede Runde",
        seoFeature5: "Hinweise für schwierige Fotos",
        seoFeature6: "Musikbegleitung im Stil der Epoche",
        
        seoWhyPlayTitle: "Warum sollten Sie spielen?",
        seoWhyPlayText: "Das Quiz 'ERRATE JAHR UND ORT VON MOSKAU-FOTOS' ist eine spannende Möglichkeit, die Geschichte der russischen Hauptstadt zu studieren. Sehen Sie, wie sich die Stadt über zwei Jahrhunderte verändert hat. Geeignet für Schüler, Studenten und alle, die sich für die Geschichte Moskaus interessieren.",
        
        seoPeriodsTitle: "Historische Perioden im Spiel:",
        seoPeriod1: "<strong>Moskau im 19. Jahrhundert:</strong> Architektur, Transport, Leben im vorrevolutionären Moskau",
        seoPeriod2: "<strong>Sowjetisches Moskau (1917-1991):</strong> Veränderungen im Stadtbild, sowjetische Gebäude, Leben in der UdSSR",
        seoPeriod3: "<strong>Moskau in den 90er Jahren:</strong> Zeit radikaler Veränderungen, Entstehung neuer Architektur und Kultur",
        
        seoFinalText: "Spielen Sie kostenlos direkt im Browser ohne Registrierung. Treten Sie unserem Telegram-Kanal für Updates bei.",
        
        // SEO ключевые слова
        seoKeyword1: "alte Fotos von Moskau",
        seoKeyword2: "Moskau Geschichte Spiel",
        seoKeyword3: "errate das Jahr von Moskau-Fotos",
        seoKeyword4: "Archivfotos von Moskau",
        seoKeyword5: "Quiz über Moskau Geschichte",
        seoKeyword6: "Moskau 19. Jahrhundert",
        seoKeyword7: "Moskau 20. Jahrhundert",
        seoKeyword8: "UdSSR Moskau",
        seoKeyword9: "90er Jahre Moskau",
        seoKeyword10: "Bildungsspiele über Moskau",
        seoKeyword11: "interaktive Karte von Moskau"
    }
};

// Функция перевода
function translateText(key, ...args) {
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
        console.warn(`Missing translation for key "${key}" in language "${currentLanguage}"`);
        return translations['ru'][key] || key;
    }
    
    let text = translations[currentLanguage][key];
    
    if (typeof text === 'function') {
        return text(...args);
    }
    
    return text || key;
}

// Применение перевода (ОБНОВЛЕНА с учетом SEO-контента)
function applyTranslation() {
    // Заголовки
    document.getElementById('game-title').textContent = translateText('gameTitle');
    document.getElementById('game-subtitle').textContent = translateText('gameSubtitle');
    document.getElementById('round-text').textContent = translateText('roundText');
    
    // Управление
    document.getElementById('translate-text').textContent = translateText('translateBtn');
    document.getElementById('submit-text').textContent = translateText('submitText');
    document.getElementById('next-text').textContent = translateText('nextText');
    document.getElementById('hint-text').textContent = translateText('hintText');
    document.getElementById('continue-text').textContent = translateText('continueText');
    document.getElementById('play-text').textContent = translateText('playText');
    
    // Музыка
    document.getElementById('music-text').textContent = translateText('musicOn');
    
    // Режимы
    document.getElementById('mode-title').textContent = translateText('modeTitle');
    document.getElementById('mode-hint').textContent = translateText('modeHint');
    document.querySelector('#mode-all-btn strong').textContent = translateText('modeAll');
    document.querySelector('#mode-90s-btn strong').textContent = translateText('mode90s');
    document.querySelector('#mode-ussr-btn strong').textContent = translateText('modeUSSR');
    
    // Интерфейс
    document.getElementById('score-title').textContent = translateText('scoreTitle');
    document.getElementById('points-text').textContent = translateText('pointsText');
    document.getElementById('year-title').textContent = translateText('yearTitle');
    document.getElementById('map-title').textContent = translateText('mapTitle');
    document.getElementById('map-hint').textContent = translateText('mapHint');
    document.getElementById('mobile-hint').textContent = translateText('mobileHint');
    document.getElementById('timer-title').textContent = translateText('timerTitle');
    document.getElementById('seconds-text').textContent = translateText('secondsText');
    
    // Настройки
    document.getElementById('settings-title').textContent = translateText('settingsTitle');
    document.getElementById('time-setting-title').textContent = translateText('timeSettingTitle');
    document.getElementById('penalty-setting-title').textContent = translateText('penaltySettingTitle');
    document.getElementById('penalty-toggle-label').textContent = translateText('penaltyToggleLabel');
    document.getElementById('penalty-hint').textContent = translateText('penaltyHint');
    document.getElementById('time-hint').innerHTML = translateText('timeHint') + `<span id="current-time-display">${roundTime}</span>`;
    document.getElementById('theme-setting-title').textContent = translateText('themeSettingTitle');
    document.getElementById('theme-toggle-label').textContent = translateText('themeToggleLabel');
    document.getElementById('theme-hint').textContent = translateText('themeHint');
    
    // Правила
    document.getElementById('rules-title').textContent = translateText('rulesTitle');
    document.getElementById('rule1').textContent = translateText('rule1');
    document.getElementById('rule2').textContent = translateText('rule2');
    document.getElementById('rule3').textContent = translateText('rule3');
    document.getElementById('rule4').textContent = translateText('rule4');
    document.getElementById('rule5').textContent = translateText('rule5');
    document.getElementById('rule6').textContent = translateText('rule6');
    document.getElementById('rule7').textContent = translateText('rule7');
    document.getElementById('rule8').textContent = translateText('rule8');
    document.getElementById('rule9').textContent = translateText('rule9');
    document.getElementById('rule10').textContent = translateText('rule10');
    document.getElementById('rule11').textContent = translateText('rule11');
    document.getElementById('rules-hint').textContent = translateText('rulesHint');
    
    // Превью
    document.getElementById('placeholder-text').textContent = translateText('placeholderText');
    document.getElementById('preview-text').textContent = translateText('previewText');
    
    // Telegram
    document.getElementById('telegram-text').textContent = translateText('telegramText');
    
    // Футер
    document.getElementById('footer-text').textContent = translateText('footerText');
    document.getElementById('footer-subtext').textContent = translateText('footerSubtext');
    
    // Обновляем единицы измерения
    const pointsUnits = document.querySelectorAll('.points-unit');
    pointsUnits.forEach(unit => {
        unit.textContent = translateText('pointsText');
    });
    
    // Обновляем языковой бейдж
    document.getElementById('language-badge').textContent = currentLanguage.toUpperCase();
    
    // ========== ОБНОВЛЕНИЕ SEO-КОНТЕНТА ==========
    const seoSection = document.querySelector('.seo-content-visible');
    if (seoSection) {
        // Заголовки и параграфы
        const h1 = seoSection.querySelector('h1');
        if (h1) h1.textContent = translateText('seoMainTitle');
        
        const firstP = seoSection.querySelector('p');
        if (firstP && !firstP.classList.contains('mt-3')) {
            firstP.textContent = translateText('seoMainDescription');
        }
        
        // "Как играть в викторину?"
        const howToPlayTitle = seoSection.querySelector('h2:nth-of-type(1)');
        if (howToPlayTitle) howToPlayTitle.textContent = translateText('seoHowToPlayTitle');
        
        // Шаги игры (параграфы после первого h2)
        const steps = seoSection.querySelectorAll('h2:nth-of-type(1) ~ p');
        if (steps.length >= 5) {
            steps[0].textContent = translateText('seoStep1');
            steps[1].textContent = translateText('seoStep2');
            steps[2].textContent = translateText('seoStep3');
            steps[3].textContent = translateText('seoStep4');
            steps[4].textContent = translateText('seoStep5');
        }
        
        // "Особенности игры:"
        const featuresTitle = seoSection.querySelector('h2:nth-of-type(2)');
        if (featuresTitle) featuresTitle.textContent = translateText('seoFeaturesTitle');
        
        // Особенности (список после второго h2)
        const featuresList = seoSection.querySelector('h2:nth-of-type(2) ~ ul:first-of-type');
        if (featuresList) {
            const featureItems = featuresList.querySelectorAll('li');
            if (featureItems.length >= 6) {
                featureItems[0].textContent = translateText('seoFeature1');
                featureItems[1].textContent = translateText('seoFeature2');
                featureItems[2].textContent = translateText('seoFeature3');
                featureItems[3].textContent = translateText('seoFeature4');
                featureItems[4].textContent = translateText('seoFeature5');
                featureItems[5].textContent = translateText('seoFeature6');
            }
        }
        
        // "Почему стоит играть?"
        const whyPlayTitle = seoSection.querySelector('h2:nth-of-type(3)');
        if (whyPlayTitle) whyPlayTitle.textContent = translateText('seoWhyPlayTitle');
        
        // Текст "Почему стоит играть?"
        const whyPlayText = seoSection.querySelector('h2:nth-of-type(3) ~ p');
        if (whyPlayText) whyPlayText.textContent = translateText('seoWhyPlayText');
        
        // "Исторические периоды в игре:"
        const periodsTitle = seoSection.querySelector('h3');
        if (periodsTitle) periodsTitle.textContent = translateText('seoPeriodsTitle');
        
        // Периоды (список после h3)
        const periodsList = seoSection.querySelector('h3 ~ ul');
        if (periodsList) {
            const periodItems = periodsList.querySelectorAll('li');
            if (periodItems.length >= 3) {
                periodItems[0].innerHTML = translateText('seoPeriod1');
                periodItems[1].innerHTML = translateText('seoPeriod2');
                periodItems[2].innerHTML = translateText('seoPeriod3');
            }
        }
        
        // Ключевые слова (теги)
        const keywordTags = seoSection.querySelectorAll('.keyword-tag');
        if (keywordTags.length >= 11) {
            for (let i = 0; i < 11; i++) {
                keywordTags[i].textContent = translateText(`seoKeyword${i + 1}`);
            }
        }
        
        // Финальный параграф
        const finalP = seoSection.querySelector('p.mt-3');
        if (finalP) finalP.textContent = translateText('seoFinalText');
    }
    
    // Сохраняем язык
    localStorage.setItem('moscow-game-language', currentLanguage);
}

// ... остальной код без изменений (функции toggleLanguage, initMap, loadPreviewPhoto, startPreview, stopPreview, initMusic и т.д.)
// Все остальные функции остаются БЕЗ ИЗМЕНЕНИЙ, так как задание было добавить только перевод нового контента

// ================================================
// Переключение языка (остается без изменений)
// ================================================

function toggleLanguage() {
    const languages = ['ru', 'en', 'de'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    currentLanguage = languages[nextIndex];
    
    applyTranslation();
    updateModeInfo();
    updatePenaltyRulesDisplay();
    
    // Обновляем маркеры на карте, если они есть
    if (userMarker && userMarker.getPopup()) {
        userMarker.setPopupContent(currentLanguage === 'ru' ? 'Ваш выбор' : 
                                  currentLanguage === 'en' ? 'Your choice' : 
                                  'Ihre Auswahl').openPopup();
    }
    
    if (correctMarker && correctMarker.getPopup()) {
        correctMarker.setPopupContent(currentLanguage === 'ru' ? '<b>Правильное место</b>' : 
                                     currentLanguage === 'en' ? '<b>Correct location</b>' : 
                                     '<b>Richtiger Ort</b>').openPopup();
    }
}

// ================================================
// Инициализация карты (остается без изменений)
// ================================================

function initMap() {
    const map = L.map('map').setView([55.7558, 37.6173], isMobile ? 11 : 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);
    
    if (isMobile) {
        map.touchZoom.enable();
        map.doubleClickZoom.disable();
    }
    
    return map;
}

const map = initMap();

// ================================================
// Обработчик клика по карте (остается без изменений)
// ================================================

map.on('click', function(e) {
    if (!isGameStarted) return;
    
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    
    const markerOptions = isMobile ? {
        icon: L.divIcon({
            className: 'mobile-marker',
            html: '<div style="background:#3498db;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    } : {
        icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        })
    };
    
    userMarker = L.marker(e.latlng, markerOptions).addTo(map);
    
    const popupText = currentLanguage === 'ru' ? 'Ваш выбор' : 
                     currentLanguage === 'en' ? 'Your choice' : 
                     'Ihre Auswahl';
    
    userMarker.bindPopup(popupText).openPopup();
    document.getElementById('submit-btn').disabled = false;
    
    if (isMobile) {
        setTimeout(() => {
            userMarker.closePopup();
        }, 1500);
    }
});

// ================================================
// Ползунок года и предупреждения (остается без изменений)
// ================================================

const yearSlider = document.getElementById('year-slider');
const selectedYearSpan = document.getElementById('selected-year');

// Сброс флага перемещения ползунка при начале нового раунда
yearSlider.addEventListener('mousedown', function() {
    yearSliderMoved = true;
    hideYearWarning();
});

yearSlider.addEventListener('touchstart', function() {
    yearSliderMoved = true;
    hideYearWarning();
});

yearSlider.addEventListener('input', function() {
    selectedYearSpan.textContent = this.value;
    yearSliderMoved = true;
    hideYearWarning();
});

// Показ предупреждения о выборе года
function showYearWarning() {
    const warningElement = document.getElementById('year-warning');
    warningElement.textContent = translateText('selectYear');
    warningElement.style.display = 'block';
    
    warningElement.style.animation = 'none';
    setTimeout(() => {
        warningElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Скрытие предупреждения
function hideYearWarning() {
    const warningElement = document.getElementById('year-warning');
    warningElement.style.display = 'none';
}

// Проверка, нужно ли показывать предупреждение о выборе года
function shouldShowYearWarning() {
    if (yearSliderMoved) {
        return false;
    }
    
    if (currentPhotoData && currentPhotoData.year) {
        const year = currentPhotoData.year;
        if (year >= 1890 && year <= 1910) {
            return false;
        }
    }
    
    return true;
}

// ================================================
// ПРЕВЬЮ ФОТОГРАФИЙ (остается без изменений)
// ================================================

let previewUsedPhotoIds = new Set();

function loadPreviewPhoto() {
    try {
        if (window.GameData && window.GameData.getAllPhotos) {
            const allPhotos = window.GameData.getAllPhotos();
            let availablePhotos = allPhotos.filter(photo => !previewUsedPhotoIds.has(photo.id));
            
            if (availablePhotos.length === 0) {
                previewUsedPhotoIds.clear();
                availablePhotos = allPhotos;
            }
            
            const randomIndex = Math.floor(Math.random() * availablePhotos.length);
            const photoData = availablePhotos[randomIndex];
            previewUsedPhotoIds.add(photoData.id);
            
            if (photoData && photoData.imageUrl) {
                const img = document.getElementById('old-photo');
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.src = photoData.imageUrl;
                    img.style.opacity = '1';
                }, 300);
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки превью:', error);
    }
}

function startPreview() {
    previewUsedPhotoIds.clear();
    loadPreviewPhoto();
    previewInterval = setInterval(loadPreviewPhoto, 5000);
    document.getElementById('preview-indicator').style.display = 'block';
    document.getElementById('photo-placeholder').style.display = 'none';
}

function stopPreview() {
    if (previewInterval) {
        clearInterval(previewInterval);
        previewInterval = null;
    }
    document.getElementById('preview-indicator').style.display = 'none';
}

// ================================================
// УПРАВЛЕНИЕ МУЗЫКОЙ (остается без изменений)
// ================================================

function initMusic() {
    const savedVolume = localStorage.getItem('moscow-game-volume');
    
    if (savedVolume) {
        musicVolume = parseFloat(savedVolume);
    }
    
    backgroundMusic.volume = musicVolume;
    backgroundMusic.loop = true;
    
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.value = musicVolume;
    }
    
    const volumeControl = document.getElementById('volume-control');
    volumeControl.style.display = 'none';
    document.getElementById('music-btn').classList.remove('active');
    updateAudioIndicator();
}

function loadAndPlayMusic() {
    if (!isMusicLoaded) {
        const source = document.createElement('source');
        source.src = 'audio/moscow_never_sleep.mp3';
        source.type = 'audio/mpeg';
        
        while (backgroundMusic.firstChild) {
            backgroundMusic.removeChild(backgroundMusic.firstChild);
        }
        
        backgroundMusic.appendChild(source);
        backgroundMusic.load();
        isMusicLoaded = true;
    }
    
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Музыка воспроизводится');
        }).catch(error => {
            console.log('Ошибка воспроизведения музыки:', error);
            if (error.name === 'NotAllowedError') {
                alert('Разрешите воспроизведение музыки в вашем браузере');
            }
        });
    }
}

function toggleMusic() {
    const musicBtn = document.getElementById('music-btn');
    const volumeControl = document.getElementById('volume-control');
    
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
        loadAndPlayMusic();
        musicBtn.classList.add('active');
        volumeControl.style.display = 'flex';
    } else {
        pauseMusic();
        musicBtn.classList.remove('active');
        volumeControl.style.display = 'none';
    }
    
    updateAudioIndicator();
}

function playMusic() {
    loadAndPlayMusic();
}

function pauseMusic() {
    backgroundMusic.pause();
}

function setMusicVolume(volume) {
    musicVolume = volume;
    backgroundMusic.volume = volume;
    localStorage.setItem('moscow-game-volume', volume.toString());
    updateAudioIndicator();
}

function updateAudioIndicator() {
    const indicator = document.getElementById('audio-indicator');
    
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
// УПРАВЛЕНИЕ РЕЖИМАМИ ИГРЫ (остается без изменений)
// ================================================

async function checkModeAvailability(mode, minYear = null, maxYear = null) {
    try {
        if (window.GameData && window.GameData.checkModeAvailability) {
            const result = window.GameData.checkModeAvailability(mode, minYear, maxYear);
            return result;
        } else {
            console.warn('GameData не загружен, используем заглушку');
            return {
                success: true,
                available: true,
                count: 50,
                mode: mode,
                minYear: minYear || 1800,
                maxYear: maxYear || 2000
            };
        }
    } catch (error) {
        console.error('Ошибка проверки режима:', error);
        return {
            success: false,
            error: translateText('apiError')
        };
    }
}

function updateModeInfo() {
    const modeInfo = document.getElementById('mode-info');
    const modeBadge = document.getElementById('mode-badge');
    const modeName = document.getElementById('current-mode-name');
    const yearRange = document.getElementById('current-year-range');
    const photosCount = document.getElementById('photos-count');
    const statusText = document.getElementById('mode-status-text');
    
    modeName.textContent = currentModeName;
    yearRange.textContent = getYearRangeText();
    
    if (window.GameData && window.GameData.checkModeAvailability) {
        const checkResult = window.GameData.checkModeAvailability(currentGameMode, currentMinYear, currentMaxYear);
        photosInCurrentMode = checkResult.count;
    }
    
    photosCount.textContent = `${photosInCurrentMode} ${translateText('photosCount')}`;
    
    if (modeBadge) {
        modeBadge.className = 'mode-badge';
        modeBadge.textContent = currentModeName;
        
        switch(currentGameMode) {
            case 'all':
                modeBadge.classList.add('mode-all');
                modeInfo.className = 'mode-info';
                break;
            case '90s':
                modeBadge.classList.add('mode-90s');
                modeInfo.className = 'mode-info mode-info-90s';
                break;
            case 'ussr':
                modeBadge.classList.add('mode-ussr');
                modeInfo.className = 'mode-info mode-info-ussr';
                break;
            case 'custom':
                modeBadge.classList.add('mode-all');
                modeInfo.className = 'mode-info';
                break;
        }
    }
    
    if (statusText) {
        if (photosInCurrentMode >= 10) {
            statusText.textContent = translateText('modeAvailable');
            statusText.style.color = '#27ae60';
        } else if (photosInCurrentMode > 0) {
            statusText.textContent = translateText('modeNotEnoughText', photosInCurrentMode);
            statusText.style.color = '#e74c3c';
        } else {
            statusText.textContent = translateText('modeNoPhotos');
            statusText.style.color = '#e74c3c';
        }
    }
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    switch(currentGameMode) {
        case 'all':
            document.getElementById('mode-all-btn').classList.add('active');
            break;
        case '90s':
            document.getElementById('mode-90s-btn').classList.add('active');
            break;
        case 'ussr':
            document.getElementById('mode-ussr-btn').classList.add('active');
            break;
        case 'custom':
            document.getElementById('mode-custom-btn').classList.add('active');
            break;
    }
}

function getYearRangeText() {
    switch(currentGameMode) {
        case '90s': return translateText('range90s');
        case 'ussr': return translateText('rangeUSSR');
        case 'custom': return `${currentMinYear}-${currentMaxYear}`;
        default: return translateText('rangeAll');
    }
}

async function switchGameMode(mode, minYear = null, maxYear = null) {
    try {
        const statusText = document.getElementById('mode-status-text');
        if (statusText) {
            statusText.textContent = translateText('modeLoading');
            statusText.style.color = '#3498db';
        }
        
        const checkResult = await checkModeAvailability(mode, minYear, maxYear);
        
        if (!checkResult.success) {
            if (statusText) {
                statusText.textContent = checkResult.error || translateText('apiError');
                statusText.style.color = '#e74c3c';
            }
            return false;
        }
        
        currentGameMode = mode;
        currentModeName = checkResult.mode;
        photosInCurrentMode = checkResult.count;
        
        if (mode === 'custom' && minYear && maxYear) {
            currentMinYear = parseInt(minYear);
            currentMaxYear = parseInt(maxYear);
        } else {
            switch(mode) {
                case '90s':
                    currentMinYear = 1992;
                    currentMaxYear = 2000;
                    break;
                case 'ussr':
                    currentMinYear = 1917;
                    currentMaxYear = 1991;
                    break;
                default:
                    currentMinYear = 1800;
                    currentMaxYear = 2000;
            }
        }
        
        updateModeInfo();
        
        return checkResult.available;
        
    } catch (error) {
        console.error('Ошибка переключения режима:', error);
        return false;
    }
}

// ================================================
// ФУНКЦИИ ДЛЯ ПРЕДОТВРАЩЕНИЯ ПОВТОРЕНИЯ ФОТО (без изменений)
// ================================================

function prepareGamePhotos() {
    gamePhotosQueue = [];
    usedPhotoIds.clear();
    
    const allPhotos = window.GameData.getAllPhotos();
    
    let filteredPhotos = allPhotos.filter(photo => {
        const year = photo.year;
        
        if (currentGameMode === '90s') {
            return year >= 1992 && year <= 2000;
        } else if (currentGameMode === 'ussr') {
            return year >= 1917 && year <= 1991;
        } else if (currentGameMode === 'custom') {
            return year >= currentMinYear && year <= currentMaxYear;
        } else {
            return year >= 1800 && year <= 2000;
        }
    });
    
    if (filteredPhotos.length < 10) {
        console.error(`Недостаточно фото для режима ${currentGameMode}: ${filteredPhotos.length} вместо 10`);
        return false;
    }
    
    let availablePhotos = filteredPhotos.filter(photo => !usedPhotoIds.has(photo.id));
    
    if (availablePhotos.length < 10) {
        console.log('Очищаем историю использованных фото, начинаем заново');
        usedPhotoIds.clear();
        availablePhotos = filteredPhotos;
    }
    
    for (let i = availablePhotos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availablePhotos[i], availablePhotos[j]] = [availablePhotos[j], availablePhotos[i]];
    }
    
    gamePhotosQueue = availablePhotos.slice(0, 10);
    gamePhotosQueue.forEach(photo => usedPhotoIds.add(photo.id));
    
    console.log(`Подготовлено ${gamePhotosQueue.length} уникальных фото для игры`);
    console.log('Использованные ID:', Array.from(usedPhotoIds));
    
    return true;
}

function getPhotoForCurrentRound() {
    if (gamePhotosQueue.length === 0 || currentRound > gamePhotosQueue.length) {
        console.error('Нет фото для текущего раунда');
        return null;
    }
    
    return gamePhotosQueue[currentRound - 1];
}

// ================================================
// ОСНОВНЫЕ ФУНКЦИИ ИГРЫ (без изменений)
// ================================================

async function loadNewPhoto() {
    try {
        if (!currentGameMode) {
            alert(translateText('modeInvalidRange'));
            return;
        }
        
        if (photosInCurrentMode < 10) {
            alert(translateText('modeNotEnoughText', photosInCurrentMode));
            return;
        }
        
        document.getElementById('old-photo').style.opacity = '0.5';
        
        const photoData = getPhotoForCurrentRound();
        
        if (!photoData) {
            console.error('Не удалось получить фото для раунда', currentRound);
            alert('Ошибка загрузки фотографии. Попробуйте начать игру заново.');
            return;
        }
        
        currentPhotoData = photoData;
        currentPhotoData.year = parseInt(currentPhotoData.year);
        
        if (currentPhotoData.coordinates) {
            currentPhotoData.coordinates.lat = parseFloat(currentPhotoData.coordinates.lat);
            currentPhotoData.coordinates.lng = parseFloat(currentPhotoData.coordinates.lng);
        } else {
            currentPhotoData.coordinates = { lat: 55.7558, lng: 37.6173 };
        }
        
        yearSliderMoved = false;
        
        const checkResult = window.GameData.checkModeAvailability(currentGameMode, currentMinYear, currentMaxYear);
        photosInCurrentMode = checkResult.count;
        updateModeInfo();
        
        const img = document.getElementById('old-photo');
        img.src = photoData.imageUrl;
        img.alt = `${photoData.location || 'Фото Москвы'} (${photoData.year})`;
        img.style.opacity = '1';
        
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        if (correctMarker) {
            map.removeLayer(correctMarker);
            correctMarker = null;
        }
        if (correctCircle) {
            map.removeLayer(correctCircle);
            correctCircle = null;
        }
        
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
        
        hideYearWarning();
        
        const middleYear = Math.round((currentMinYear + currentMaxYear) / 2);
        yearSlider.min = currentMinYear;
        yearSlider.max = currentMaxYear;
        yearSlider.value = middleYear;
        selectedYearSpan.textContent = middleYear;
        
        document.getElementById('min-year').textContent = currentMinYear;
        document.getElementById('mid-year').textContent = Math.round((currentMinYear + currentMaxYear) / 2);
        document.getElementById('max-year').textContent = currentMaxYear;
        
        startTimer();
        
    } catch (error) {
        console.error('Ошибка загрузки фото:', error);
        alert(translateText('loadError'));
    }
}

function startTimer() {
    timeLeft = roundTime;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    
    timerElement.classList.remove('timer-warning');
    timerElement.style.color = '';
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            timerElement.classList.add('timer-warning');
        } else {
            timerElement.classList.remove('timer-warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            score -= 2;
            
            document.getElementById('score-board').textContent = score.toFixed(1);
            
            alert(translateText('timeOut'));
            nextRound();
        }
    }, 1000);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function calculateYearPoints(userYear, realYear) {
    const diff = Math.abs(userYear - realYear);
    
    if (diff === 0) return 3;
    if (diff <= 2) return 2;
    if (diff <= 5) return 1;
    if (diff <= 10) return -2;
    return -3;
}

function calculateLocationPoints(userLatLng, realLatLng, distance) {
    if (distance <= 200) return 2;
    if (distance <= 1000) return 0.5;
    
    if (distancePenaltyEnabled) {
        if (distance > 10000) return -3;
        if (distance > 5000) return -2;
    }
    
    return 0;
}

function showRoundResult(yearPoints, locationPoints, distance, userYear, realYear) {
    const totalPoints = yearPoints + locationPoints;
    const modal = document.getElementById('result-modal');
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');
    
    const yearDiff = Math.abs(userYear - realYear);
    
    if (totalPoints > 2) {
        title.textContent = translateText('resultExcellent');
        title.style.color = '#2ecc71';
    } else if (totalPoints >= 0) {
        title.textContent = translateText('resultNeutral');
        title.style.color = '#7f8c8d';
    } else {
        title.textContent = translateText('resultGood');
        title.style.color = '#e74c3c';
    }
    
    const fontSize = isMobile ? '0.9rem' : '1rem';
    const headingSize = isMobile ? '1.1rem' : '1.25rem';
    
    let detailsHTML = `
        <div class="mb-4">
            <h6 style="font-size: ${headingSize}; margin-bottom: 1rem;">📅 ${translateText('yearAccuracy')}</h6>
            
            <div class="row mb-3">
                <div class="col-6">
                    <div class="text-center p-2 bg-light rounded">
                        <small style="font-size: 0.85rem; color: #666;">${translateText('yourYear')}</small>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #3498db;">${userYear}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="text-center p-2 bg-light rounded">
                        <small style="font-size: 0.85rem; color: #666;">${translateText('correctYear')}</small>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #27ae60;">${realYear}</div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mb-3">
                <span style="font-size: ${fontSize}; color: #666;">${translateText('yearDifference')}: </span>
                <span style="font-size: ${fontSize}; font-weight: bold; color: ${yearDiff <= 5 ? '#27ae60' : '#e74c3c'};">${yearDiff}</span>
                <span style="font-size: ${fontSize}; color: #666;"> ${translateText('years')}</span>
            </div>
            
            <div class="text-center">
                <span style="font-size: 1.2rem; font-weight: bold; color: ${yearPoints >= 0 ? '#27ae60' : '#e74c3c'};">${yearPoints > 0 ? '+' : ''}${yearPoints}</span>
                <span style="font-size: ${fontSize}; color: #666;"> ${translateText('pointsText')}</span>
            </div>
        </div>
        
        <div class="mb-4">
            <h6 style="font-size: ${headingSize}; margin-bottom: 1rem;">📍 ${translateText('locationText')}</h6>
            
            <div class="text-center mb-2">
                <div style="font-size: 1.2rem; font-weight: bold; color: #2c3e50;">
                    ${currentPhotoData.location || (currentLanguage === 'ru' ? 'Москва' : currentLanguage === 'en' ? 'Moscow' : 'Moskau')}
                </div>
                <small style="font-size: 0.9rem; color: #666;">${translateText('locationName')}</small>
            </div>
            
            <div class="text-center mb-3">
                <span style="font-size: ${fontSize}; color: #666;">${translateText('distance')}: </span>
                <span style="font-size: 1.1rem; font-weight: bold; color: ${distance <= 1000 ? '#27ae60' : '#e74c3c'};">${Math.round(distance)}</span>
                <span style="font-size: ${fontSize}; color: #666;"> ${translateText('meters')}</span>
            </div>
            
            <div class="text-center">
                <span style="font-size: 1.2rem; font-weight: bold; color: ${locationPoints > 0 ? '#27ae60' : locationPoints < 0 ? '#e74c3c' : '#666'};">${locationPoints > 0 ? '+' : ''}${locationPoints.toFixed(1)}</span>
                <span style="font-size: ${fontSize}; color: #666;"> ${translateText('pointsText')}</span>
            </div>
        </div>
        
        <div class="alert ${totalPoints > 2 ? 'alert-success' : totalPoints >= 0 ? 'alert-warning' : 'alert-danger'}" 
             style="margin-top: 1.5rem; padding: ${isMobile ? '0.75rem' : '1rem'}; border-radius: 10px;">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 style="font-size: ${isMobile ? '1.1rem' : '1.25rem'}; margin: 0;">${translateText('roundTotal')}</h5>
                    <small style="font-size: 0.9rem; opacity: 0.8;">${translateText('totalScore')}: ${score.toFixed(1)}</small>
                </div>
                <div style="font-size: ${isMobile ? '1.5rem' : '1.8rem'}; font-weight: bold; color: ${totalPoints > 2 ? '#27ae60' : totalPoints >= 0 ? '#f39c12' : '#e74c3c'}">
                    ${totalPoints > 0 ? '+' : ''}${totalPoints.toFixed(1)}
                </div>
            </div>
        </div>
    `;
    
    details.innerHTML = detailsHTML;
    modal.style.display = 'flex';
    
    if (isMobile) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.width = '95%';
        modalContent.style.maxWidth = 'none';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '20px';
    }
}

function nextRound() {
    document.getElementById('result-modal').style.display = 'none';
    
    currentRound++;
    
    if (currentRound > totalRounds) {
        const finalScore = score;
        const performance = translateText('gameOverPerformance', finalScore);
        
        let message = `${translateText('gameOverTitle')}\n\n${translateText('gameOverScore')} ${finalScore.toFixed(1)} ${translateText('pointsText')}\n\n`;
        
        if (currentLanguage === 'ru') {
            message += `Это ${performance} игрой!`;
        } else if (currentLanguage === 'en') {
            message += `This is ${performance} gameplay!`;
        } else {
            message += `Das ist ${performance} Spiel!`;
        }
        
        message += `\n\n${translateText('gameOverMessage')}`;
        
        alert(message);
        
        currentRound = 1;
        score = 0;
        document.getElementById('score-board').textContent = '0.0';
        document.getElementById('current-round').textContent = '1';
        isGameStarted = false;
        
        document.getElementById('photo-placeholder').style.display = 'flex';
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
        startPreview();
        return;
    }
    
    document.getElementById('current-round').textContent = currentRound;
    loadNewPhoto();
}

function startNewGame() {
    if (!isGameStarted) {
        isGameStarted = true;
        stopPreview();
        document.getElementById('photo-placeholder').style.display = 'none';
    }
    
    const success = prepareGamePhotos();
    if (!success) {
        alert(translateText('modeNotEnoughText', photosInCurrentMode));
        return;
    }
    
    currentRound = 1;
    score = 0;
    document.getElementById('score-board').textContent = '0.0';
    document.getElementById('current-round').textContent = '1';
    loadNewPhoto();
}

// ================================================
// ТЕМНАЯ ТЕМА (без изменений)
// ================================================

function toggleDarkTheme() {
    darkThemeEnabled = !darkThemeEnabled;
    
    const themeToggle = document.getElementById('dark-theme-toggle');
    themeToggle.checked = darkThemeEnabled;
    
    if (darkThemeEnabled) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('moscow-game-dark-theme', 'enabled');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('moscow-game-dark-theme', 'disabled');
    }
}

function initDarkTheme() {
    const savedTheme = localStorage.getItem('moscow-game-dark-theme');
    
    if (savedTheme === 'enabled') {
        darkThemeEnabled = true;
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('dark-theme-toggle').checked = true;
    } else {
        darkThemeEnabled = false;
        document.body.removeAttribute('data-theme');
    }
}

// ================================================
// НАСТРОЙКИ ИГРЫ (без изменений)
// ================================================

function updatePenaltyRulesDisplay() {
    const penaltyRules = document.querySelectorAll('.penalty-rule');
    if (distancePenaltyEnabled) {
        penaltyRules.forEach(rule => rule.style.display = 'flex');
    } else {
        penaltyRules.forEach(rule => rule.style.display = 'none');
    }
}

function updateTimeDisplay() {
    document.getElementById('current-time-display').textContent = roundTime;
    document.getElementById('timer').textContent = roundTime;
    
    document.querySelectorAll('.time-btn').forEach(btn => {
        if (parseInt(btn.dataset.time) === roundTime) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ================================================
// ОБРАБОТЧИКИ СОБЫТИЙ (без изменений)
// ================================================

document.getElementById('submit-btn').addEventListener('click', function() {
    if (!userMarker || !currentPhotoData) {
        alert(translateText('selectPlace'));
        return;
    }
    
    if (shouldShowYearWarning()) {
        showYearWarning();
        alert(translateText('selectYearMessage'));
        return;
    }
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const userYear = parseInt(yearSlider.value);
    const realYear = currentPhotoData.year;
    const userLatLng = userMarker.getLatLng();
    const realLatLng = currentPhotoData.coordinates;
    
    const yearPoints = calculateYearPoints(userYear, realYear);
    const distance = calculateDistance(userLatLng.lat, userLatLng.lng, realLatLng.lat, realLatLng.lng);
    const locationPoints = calculateLocationPoints(userLatLng, realLatLng, distance);
    const roundPoints = yearPoints + locationPoints;
    
    score += roundPoints;
    document.getElementById('score-board').textContent = score.toFixed(1);
    
    const correctMarkerOptions = isMobile ? {
        icon: L.divIcon({
            className: 'correct-marker',
            html: '<div style="background:#27ae60;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        })
    } : {
        icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        })
    };
    
    correctMarker = L.marker(realLatLng, correctMarkerOptions).addTo(map);
    
    const popupText = currentLanguage === 'ru' ? '<b>Правильное место</b>' : 
                     currentLanguage === 'en' ? '<b>Correct location</b>' : 
                     '<b>Richtiger Ort</b>';
    
    correctMarker.bindPopup(popupText).openPopup();
    
    correctCircle = L.circle(realLatLng, {
        color: '#27ae60',
        fillColor: '#2ecc71',
        fillOpacity: 0.2,
        radius: 200,
        weight: isMobile ? 2 : 3
    }).addTo(map);
    
    this.style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
    
    showRoundResult(yearPoints, locationPoints, distance, userYear, realYear);
});

document.getElementById('next-btn').addEventListener('click', nextRound);

document.getElementById('hint-btn').addEventListener('click', function() {
    if (!currentPhotoData || score < 1) {
        alert(translateText('noHintPoints'));
        return;
    }
    
    if (confirm(translateText('hintConfirm'))) {
        score -= 1;
        document.getElementById('score-board').textContent = score.toFixed(1);
        
        const decade = Math.floor(currentPhotoData.year / 10) * 10;
        alert(translateText('hintDecade', decade));
    }
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('result-modal').style.display = 'none';
});

document.getElementById('translate-btn').addEventListener('click', toggleLanguage);

document.getElementById('music-btn').addEventListener('click', toggleMusic);

document.getElementById('volume-slider').addEventListener('input', function() {
    setMusicVolume(parseFloat(this.value));
});

document.getElementById('audio-indicator').addEventListener('click', function() {
    toggleMusic();
    
    if (isMobile && isMusicPlaying) {
        const volumeControl = document.getElementById('volume-control');
        volumeControl.style.display = volumeControl.style.display === 'none' ? 'flex' : 'none';
    }
});

// Обработчики режимов
document.getElementById('mode-all-btn').addEventListener('click', async function() {
    const success = await switchGameMode('all');
    if (success && photosInCurrentMode >= 10) {
        startNewGame();
    }
});

document.getElementById('mode-90s-btn').addEventListener('click', async function() {
    const success = await switchGameMode('90s');
    if (success && photosInCurrentMode >= 10) {
        startNewGame();
    }
});

document.getElementById('mode-ussr-btn').addEventListener('click', async function() {
    const success = await switchGameMode('ussr');
    if (success && photosInCurrentMode >= 10) {
        startNewGame();
    }
});

document.getElementById('mode-custom-btn').addEventListener('click', async function() {
    const minYear = parseInt(document.getElementById('custom-min-year').value);
    const maxYear = parseInt(document.getElementById('custom-max-year').value);
    
    if (isNaN(minYear) || isNaN(maxYear) || minYear > maxYear) {
        alert(translateText('modeInvalidRange'));
        return;
    }
    
    const success = await switchGameMode('custom', minYear, maxYear);
    if (success && photosInCurrentMode >= 10) {
        startNewGame();
    }
});

// Обработчики настроек времени
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const newTime = parseInt(this.dataset.time);
        roundTime = newTime;
        
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('current-time-display').textContent = roundTime;
        
        if (timerInterval && isGameStarted) {
            timeLeft = roundTime;
            document.getElementById('timer').textContent = timeLeft;
        }
        
        localStorage.setItem('moscow-game-time', roundTime.toString());
    });
});

document.getElementById('distance-penalty-toggle').addEventListener('change', function() {
    distancePenaltyEnabled = this.checked;
    updatePenaltyRulesDisplay();
    localStorage.setItem('moscow-game-penalty', distancePenaltyEnabled.toString());
});

// Обработчик темной темы
document.getElementById('dark-theme-toggle').addEventListener('change', function() {
    toggleDarkTheme();
});

// ================================================
// ИНИЦИАЛИЗАЦИЯ ИГРЫ (без изменений)
// ================================================

function initGame() {
    // Загружаем сохраненные настройки
    const savedLanguage = localStorage.getItem('moscow-game-language');
    const savedTime = localStorage.getItem('moscow-game-time');
    const savedPenalty = localStorage.getItem('moscow-game-penalty');
    
    // По умолчанию русский
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en' || savedLanguage === 'de')) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'ru';
        localStorage.setItem('moscow-game-language', 'ru');
    }
    
    if (savedTime) {
        roundTime = parseInt(savedTime);
    }
    
    if (savedPenalty !== null) {
        distancePenaltyEnabled = savedPenalty === 'true';
        document.getElementById('distance-penalty-toggle').checked = distancePenaltyEnabled;
    }
    
    // Инициализируем темную тему
    initDarkTheme();
    
    initMusic();
    applyTranslation();
    updateTimeDisplay();
    updatePenaltyRulesDisplay();
    
    // Проверяем, загружены ли данные игры
    if (!window.GameData) {
        console.warn('GameData не загружен. Проверьте подключение game-loader.js перед script.js');
        document.getElementById('photo-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Данные игры не загружены. Пожалуйста, обновите страницу.</p>
        `;
    } else {
        // Запускаем превью
        startPreview();
        
        // Инициализируем режим по умолчанию
        switchGameMode('all').then(success => {
            console.log('Режим "Все годы" загружен:', success ? 'доступен' : 'недоступен');
        });
    }
    
    console.log('🎮 Игра "Москва: Машина Времени" инициализирована (без сервера)');
    console.log('Текущий язык:', currentLanguage);
    console.log('Доступные фото:', window.GameData ? window.GameData.getAllPhotos().length : 0);
}

// Запуск игры при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
