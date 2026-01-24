// ================================================
// СКРИПТ ДЛЯ СТРАНИЦЫ СТАТЬИ "АКВАДРОМ"
// ================================================

// Глобальные переменные
let currentLanguage = 'ru';
let isMusicPlaying = false;
let musicVolume = 0.5;

// Определяем язык из URL параметров
function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'en' || langParam === 'de')) {
        return langParam;
    }
    return null;
}

// Проверяем и сохраняем язык из URL
const urlLang = getLanguageFromURL();
if (urlLang) {
    localStorage.setItem('moscow-game-language', urlLang);
}

// Система переводов для интерфейса
const interfaceTranslations = {
    ru: {
        pageTitle: "Аквадром: гигант, который не смог",
        pageSubtitle: "Самая захватывающая заброшка Москвы",
        translateBtn: "EN",
        musicOn: "Музыка",
        musicOff: "Музыка",
        playText: "Играть",
        homeText: "Статьи",
        telegramText: "Telegram",
        articleDate: "24.01.2026",
        articleCategory: "90-е и заброшки",
        readingTime: "9 мин чтения",
        backToArticles: "Назад к статьям",
        playGame: "Играть в игру",
        footerText: "Проект создан с ❤️ для любителей истории Москвы",
        footerSubtext: "Архивные фотографии и исторические материалы",
        photo1Caption: "Общий вид бетонного гиганта",
        photo2Caption: "Дмитрий Лукаев - советский и российский архитектор",
        photo3Caption: "Модель-проект Аквадрома, интересно, как бы он выглядел сейчас...",
        photo4Caption: "Строительство гиганта",
        photo5Caption: "Строительство гиганта, а сколько сил было вложено...",
        photo6Caption: "Строительство гиганта... обидно думать",
        photo7Caption: "То что успели построить, эх, а ведь не так много осталось...",
        photo8Caption: "Спутниковый снимок, 2003 год",
        photo9Caption: "Было...",
        photo10Caption: "Стало...",
        photo11Caption: "Визуализация нейросети",
        photo12Caption: "Внутри Аквадрома",
        photo13Caption: "Внутри Аквадрома",
        photo14Caption: "Внутри Аквадрома",
        photo15Caption: "Внутри Аквадрома",
        photo16Caption: "Внутри Аквадрома",
        photo17Caption: "Внутри Аквадрома",
        photo18Caption: "Внутри Аквадрома",
        photo19Caption: "Внутри Аквадрома",
        photo20Caption: "Внутри Аквадрома",
        photo21Caption: "Внутри Аквадрома",
        photo22Caption: "Внутри Аквадрома",
        photo23Caption: "Внутри Аквадрома",
        photo24Caption: "Внутри Аквадрома",
        photo25Caption: "Съемки телесериала 'Бригада' в 'Аквадроме'",
        photo26Caption: "Снос...",
        photo27Caption: "А здесь был Аквадром...",
        photo28Caption: "А здесь был Аквадром..."
    },
    en: {
        pageTitle: "Aquadrome: The Giant That Couldn't",
        pageSubtitle: "The Most Exciting Abandoned Place in Moscow",
        translateBtn: "DE",
        musicOn: "Music",
        musicOff: "Music",
        playText: "Play",
        homeText: "Articles",
        telegramText: "Telegram",
        articleDate: "24.01.2026",
        articleCategory: "90s and abandoned places",
        readingTime: "9 min read",
        backToArticles: "Back to articles",
        playGame: "Play the game",
        footerText: "Project created with ❤️ for Moscow history lovers",
        footerSubtext: "Archive photos and historical materials",
        photo1Caption: "General view of the concrete giant",
        photo2Caption: "Dmitry Lukaev - Soviet and Russian architect",
        photo3Caption: "Model-project of Aquadrome, interesting how it would look now...",
        photo4Caption: "Construction of the giant",
        photo5Caption: "Construction of the giant, and how much effort was put in...",
        photo6Caption: "Construction of the giant... it's a pity to think",
        photo7Caption: "What they managed to build, eh, and not much was left...",
        photo8Caption: "Satellite image, 2003",
        photo9Caption: "Was...",
        photo10Caption: "Became...",
        photo11Caption: "Neural network visualization",
        photo12Caption: "Inside Aquadrome",
        photo13Caption: "Inside Aquadrome",
        photo14Caption: "Inside Aquadrome",
        photo15Caption: "Inside Aquadrome",
        photo16Caption: "Inside Aquadrome",
        photo17Caption: "Inside Aquadrome",
        photo18Caption: "Inside Aquadrome",
        photo19Caption: "Inside Aquadrome",
        photo20Caption: "Inside Aquadrome",
        photo21Caption: "Inside Aquadrome",
        photo22Caption: "Inside Aquadrome",
        photo23Caption: "Inside Aquadrome",
        photo24Caption: "Inside Aquadrome",
        photo25Caption: "Filming of the TV series 'Brigada' in 'Aquadrome'",
        photo26Caption: "Demolition...",
        photo27Caption: "And here was Aquadrome...",
        photo28Caption: "And here was Aquadrome..."
    },
    de: {
        pageTitle: "Aquadrom: Der Riese, der es nicht schaffte",
        pageSubtitle: "Der spannendste verlassene Ort in Moskau",
        translateBtn: "RU",
        musicOn: "Musik",
        musicOff: "Musik",
        playText: "Spielen",
        homeText: "Artikel",
        telegramText: "Telegram",
        articleDate: "24.01.2026",
        articleCategory: "90er und verlassene Orte",
        readingTime: "9 Min. Lesezeit",
        backToArticles: "Zurück zu Artikeln",
        playGame: "Spiel spielen",
        footerText: "Projekt mit ❤️ für Moskau-Geschichtsenthusiasten erstellt",
        footerSubtext: "Archivfotos und historische Materialien",
        photo1Caption: "Allgemeine Ansicht des Betonriesen",
        photo2Caption: "Dmitri Lukajew - sowjetischer und russischer Architekt",
        photo3Caption: "Modell-Projekt des Aquadroms, interessant wie es jetzt aussehen würde...",
        photo4Caption: "Bau des Riesen",
        photo5Caption: "Bau des Riesen, und wie viel Mühe hineingesteckt wurde...",
        photo6Caption: "Bau des Riesen... schade zu denken",
        photo7Caption: "Was sie gebaut haben, ach, und nicht viel blieb übrig...",
        photo8Caption: "Satellitenbild, 2003",
        photo9Caption: "War...",
        photo10Caption: "Wurde...",
        photo11Caption: "Neuronales Netz Visualisierung",
        photo12Caption: "Im Inneren des Aquadroms",
        photo13Caption: "Im Inneren des Aquadroms",
        photo14Caption: "Im Inneren des Aquadroms",
        photo15Caption: "Im Inneren des Aquadroms",
        photo16Caption: "Im Inneren des Aquadroms",
        photo17Caption: "Im Inneren des Aquadroms",
        photo18Caption: "Im Inneren des Aquadroms",
        photo19Caption: "Im Inneren des Aquadroms",
        photo20Caption: "Im Inneren des Aquadroms",
        photo21Caption: "Im Inneren des Aquadroms",
        photo22Caption: "Im Inneren des Aquadroms",
        photo23Caption: "Im Inneren des Aquadroms",
        photo24Caption: "Im Inneren des Aquadroms",
        photo25Caption: "Dreharbeiten der TV-Serie 'Brigada' im 'Aquadrom'",
        photo26Caption: "Abriss...",
        photo27Caption: "Und hier war das Aquadrom...",
        photo28Caption: "Und hier war das Aquadrom..."
    }
};

// Переводы содержания статьи
const articleTranslations = {
    ru: {
        articleTitle: "Аквадром: гигант, который не смог",
        articleSubtitle: "Самая захватывающая заброшка Москвы. История амбициозного проекта, который так и не открылся. Самый большой аквапарк Европы 13 лет простоял как мрачная заброшка, став местом для сталкеров и съёмок «Бригады», а в итоге был стёрт с лица города. Эта статья - о проекте-призраке, который стал символом эпохи несбывшихся планов.",
        paragraph1: "Идея построить в Москве самый большой аквапарк в Европе родилась в 1997 году как часть подготовки к Всемирным юношеским играм 1998 года. Власти планировали возвести несколько современных спортивно-развлекательных центров, и площадку на Аминьевском шоссе выбрали не случайно: согласно генплану, здесь должна была появиться зона отдыха. Проект поручили мастерской №11 «Моспроекта-2» под руководством архитектора Дмитрия Лукаева.",
        paragraph2: "Дмитрий Лукаев умер в августе 2000 года, так и не увидев даже частичного завершения своего проекта. Специфика московского строительства 90-х отпугнула иностранных подрядчиков, и всё пришлось делать самостоятельно.",
        paragraph3: "Проект поражал воображение: здание в 11 наземных и 3 подземных этажа общей площадью 43 500 кв. м. По задумке архитекторов из «Моспроекта-2», здесь должно было разместиться всё для отдыха и спорта:",
        area1Name: "5 бассейнов и водные горки:",
        area1Value: "✓",
        area2Name: "Легкоатлетический манеж:",
        area2Value: "✓",
        area3Name: "Дворец игровых видов спорта:",
        area3Value: "✓",
        area4Name: "Тренажерные залы, центр лечебной физкультуры:",
        area4Value: "✓",
        area5Name: "Гостиница, офисы:",
        area5Value: "✓",
        area6Name: "Кафе и рестораны",
        area6Value: "✓",
        paragraph4: "Строительство стартовало в 1998 году, и к 2001-му гигантский каркас с наклонной стеклянной крышей уже возвышался.",
        advertisement: "Если вам нравится столица заходите на сайт-игру по старым фото Москвы https://moscow-time-machine.online/, этот гигант там тоже есть",
        section1Title: "Грандиозный проект: Мечта о водном дворце",
        section2Title: "Стоп-кадр 2001 года: стройка на 59%",
        paragraph5: "Проект привлекал бизнес налоговыми льготами, которые предоставлялись социально значимым объектам. К 2000 году здание было готово на 59%, начали облицовку фасадов. Но в 2001 году власти отменили льготы, и инвестор мгновенно заморозил стройку, бросив готовый каркас. Началась долгая череда судов и перепродаж.",
        paragraph6: "В 2005 году город выплатил инвестору 811 млн рублей и выкупил долгострой, чтобы потом перепродать. Началась новая жизнь аквадрома...",
        section3Title: "Новая незавидная судьба",
        paragraph7: "Началась другая жизнь «Аквадрома». Строительные материалы были растащены, здание стало проседать, а нижние уровни стали подтапливаться грунтовыми водами. К 2011 году его состояние признали аварийным. В здании стали часта происходить пожары. Аквадром стал меккой для сталкеров, любителей острых ощущений и просто любопытных.",
        quoteText: "«Мы с одногруппником шли туда с тревогой… Сергею стало жутковато, он говорил, что внутри могут быть кто угодно, от охраны до сектантов, Мы ходили с открытыми ртами первые минуты… Я сказал Сергею: 'Мне сейчас вообще ничего говорить не хочется, мне просто хочется помолчать…'»",
        quoteAuthor: "ЖЖ, oldnewmoscow, 12.01.2012",
        paragraph8: "Давайте тоже молча понаблюдаем:",
        film1: "Финальная серия культового сериала «Бригада»",
        film2: "Сцены фильмов «На игре» и «Детям до 16…»",
        film3: "Эпизод сериала «Прокурорская проверка» и фильм «Шапито-шоу»",
        section4Title: "Конец аквадрома...",
        paragraph9: "Его мрачная, постапокалиптическая эстетика привлекала кинематографистов. На его площадках снимались:",
        paragraph10: "В 2012 году власти приняли решение о сносе. Работы начались весной 2014 года и завершились к сентябрю. На месте призрака тропиков выросла обычная ТЦшка, открывшаяся в 2020 году. Планировка и назначение полностью изменились, от прежней идеи не осталось и следа.",
        paragraph11: "«Аквадром» разделил судьбу многих символов эпохи. Но если «Синий Зуб» всё же возродился в новом качестве, то «Аквадром» был стёрт с лица города, оставшись лишь в памяти сталкеров и на кадрах культовых фильмов.",
        infoBoxTitle: "Продолжение истории",
        infoBoxText: "Если вам интересна история московских улиц, зданий и их призраков, отправляйтесь в виртуальное путешествие-игру во времени на сайте «Машина времени по Москве» - https://moscow-time-machine.online/."
    },
    en: {
        articleTitle: "Aquadrome: The Giant That Couldn't",
        articleSubtitle: "The Most Exciting Abandoned Place in Moscow. The story of an ambitious project that never opened. The largest aquapark in Europe stood as a gloomy abandoned place for 13 years, becoming a place for stalkers and filming of 'Brigada', and in the end was erased from the face of the city. This article is about a ghost project that became a symbol of an era of unfulfilled plans.",
        paragraph1: "The idea to build the largest aquapark in Europe in Moscow was born in 1997 as part of the preparation for the 1998 World Youth Games. The authorities planned to build several modern sports and entertainment centers, and the site on Aminyevskoye Highway was not chosen by chance: according to the master plan, a recreation area was to appear here. The project was entrusted to workshop No. 11 of 'Mosproekt-2' under the leadership of architect Dmitry Lukaev.",
        paragraph2: "Dmitry Lukaev died in August 2000, without even seeing the partial completion of his project. The specifics of Moscow construction in the 90s scared away foreign contractors, and everything had to be done on our own.",
        paragraph3: "The project was impressive: a building with 11 above-ground and 3 underground floors with a total area of 43,500 sq. m. According to the idea of the architects from 'Mosproekt-2', everything for recreation and sports should be located here:",
        area1Name: "5 pools and water slides:",
        area1Value: "✓",
        area2Name: "Athletics arena:",
        area2Value: "✓",
        area3Name: "Palace of game sports:",
        area3Value: "✓",
        area4Name: "Gyms, therapeutic exercise center:",
        area4Value: "✓",
        area5Name: "Hotel, offices:",
        area5Value: "✓",
        area6Name: "Cafes and restaurants",
        area6Value: "✓",
        paragraph4: "Construction started in 1998, and by 2001 a gigantic frame with an inclined glass roof already towered.",
        advertisement: "If you like the capital, visit the website-game for old photos of Moscow https://moscow-time-machine.online/, this giant is also there",
        section1Title: "Grand project: Dream of a water palace",
        section2Title: "Freeze frame 2001: construction at 59%",
        paragraph5: "The project attracted business with tax benefits that were provided to socially significant objects. By 2000, the building was 59% ready, they began cladding the facades. But in 2001, the authorities canceled the benefits, and the investor instantly froze the construction, abandoning the finished frame. A long series of trials and resales began.",
        paragraph6: "In 2005, the city paid the investor 811 million rubles and bought out the long-term construction in order to resell it later. A new life of the aquadrome began...",
        section3Title: "New unenviable fate",
        paragraph7: "Another life of 'Aquadrome' began. Building materials were stolen, the building began to sag, and the lower levels began to be flooded with groundwater. By 2011, its condition was recognized as emergency. Fires often occurred in the building. Aquadrome became a mecca for stalkers, thrill-seekers and just curious people.",
        quoteText: "'We went there with anxiety with my classmate... Sergey became creepy, he said that there could be anyone inside, from security to sectarians, We walked with open mouths for the first minutes... I said to Sergey: 'I don't want to say anything at all now, I just want to be silent...''",
        quoteAuthor: "LiveJournal, oldnewmoscow, 12.01.2012",
        paragraph8: "Let's also silently observe:",
        film1: "The final episode of the cult series 'Brigada'",
        film2: "Scenes from the films 'Na igre' and 'Detyam do 16...'",
        film3: "Episode of the series 'Prokurorskaya proverka' and the film 'Shapito-shou'",
        section4Title: "End of aquadrome...",
        paragraph9: "Its gloomy, post-apocalyptic aesthetic attracted filmmakers. The following were filmed on its sites:",
        paragraph10: "In 2012, the authorities decided to demolish it. Work began in the spring of 2014 and was completed by September. In place of the ghost of the tropics, an ordinary shopping center grew, opened in 2020. The layout and purpose have completely changed, not a trace remains of the former idea.",
        paragraph11: "'Aquadrome' shared the fate of many symbols of the era. But if 'Blue Tooth' was still revived in a new quality, then 'Aquadrome' was erased from the face of the city, remaining only in the memory of stalkers and on the frames of cult films.",
        infoBoxTitle: "Continuation of history",
        infoBoxText: "If you are interested in the history of Moscow streets, buildings and their ghosts, go on a virtual time travel game on the website 'Time Machine for Moscow' - https://moscow-time-machine.online/."
    },
    de: {
        articleTitle: "Aquadrom: Der Riese, der es nicht schaffte",
        articleSubtitle: "Der spannendste verlassene Ort in Moskau. Die Geschichte eines ehrgeizigen Projekts, das nie eröffnet wurde. Das größte Aquapark Europas stand 13 Jahre als düsterer verlassener Ort, wurde ein Ort für Stalker und Dreharbeiten von 'Brigada' und wurde schließlich aus dem Stadtbild gelöscht. Dieser Artikel handelt von einem Geisterprojekt, das zum Symbol einer Ära unerfüllter Pläne wurde.",
        paragraph1: "Die Idee, das größte Aquapark Europas in Moskau zu bauen, entstand 1997 als Teil der Vorbereitung auf die Weltjugendspiele 1998. Die Behörden planten, mehrere moderne Sport- und Unterhaltungszentren zu errichten, und der Standort an der Aminjewskoje Chaussee wurde nicht zufällig gewählt: Dem Generalplan zufolge sollte hier ein Erholungsgebiet entstehen. Das Projekt wurde der Werkstatt Nr. 11 von 'Mosproekt-2' unter der Leitung des Architekten Dmitri Lukajew anvertraut.",
        paragraph2: "Dmitri Lukajew starb im August 2000, ohne auch nur die teilweise Fertigstellung seines Projekts zu sehen. Die Besonderheiten des Moskauer Bauwesens in den 90er Jahren schreckten ausländische Auftragnehmer ab, und alles musste in Eigenregie erledigt werden.",
        paragraph3: "Das Projekt war beeindruckend: Ein Gebäude mit 11 oberirdischen und 3 unterirdischen Stockwerken mit einer Gesamtfläche von 43.500 qm. Nach der Vorstellung der Architekten von 'Mosproekt-2' sollte hier alles für Erholung und Sport untergebracht werden:",
        area1Name: "5 Becken und Wasserrutschen:",
        area1Value: "✓",
        area2Name: "Leichtathletikhalle:",
        area2Value: "✓",
        area3Name: "Palast der Spielsportarten:",
        area3Value: "✓",
        area4Name: "Fitnessräume, Zentrum für therapeutische Bewegung:",
        area4Value: "✓",
        area5Name: "Hotel, Büros:",
        area5Value: "✓",
        area6Name: "Cafés und Restaurants",
        area6Value: "✓",
        paragraph4: "Der Bau begann 1998, und bis 2001 ragte bereits ein riesiger Rahmen mit einem geneigten Glasdach.",
        advertisement: "Wenn Sie die Hauptstadt mögen, besuchen Sie die Website-Spiel für alte Fotos von Moskau https://moscow-time-machine.online/, dieser Riese ist auch dort",
        section1Title: "Großartiges Projekt: Traum von einem Wasserpalast",
        section2Title: "Standbild 2001: Bau zu 59 %",
        paragraph5: "Das Projekt zog Unternehmen mit Steuervorteilen an, die sozial bedeutsamen Objekten gewährt wurden. Bis 2000 war das Gebäude zu 59 % fertig, sie begannen mit der Verkleidung der Fassaden. Aber 2001 hoben die Behörden die Vorteile auf, und der Investor fror den Bau sofort ein und ließ den fertigen Rahmen im Stich. Eine lange Serie von Prozessen und Wiederverkäufen begann.",
        paragraph6: "2005 zahlte die Stadt dem Investor 811 Millionen Rubel und kaufte den Dauerbaustein, um ihn später weiterzuverkaufen. Ein neues Leben des Aquadroms begann...",
        section3Title: "Neues unerfreuliches Schicksal",
        paragraph7: "Ein anderes Leben des 'Aquadroms' begann. Baumaterialien wurden gestohlen, das Gebäude begann zu sacken, und die unteren Ebenen begannen mit Grundwasser zu überfluten. Bis 2011 wurde sein Zustand als Notfall anerkannt. In dem Gebäude kam es häufig zu Bränden. Aquadrom wurde zu einer Mekka für Stalker, Nervenkitzel-Suchende und einfach Neugierige.",
        quoteText: "'Wir gingen mit meinem Kommilitonen voller Angst dorthin... Sergej wurde unheimlich, er sagte, dass drinnen jeder sein könnte, von Sicherheitsleuten bis zu Sektenangehörigen, Wir liefen die ersten Minuten mit offenem Mund... Ich sagte zu Sergej: 'Ich möchte jetzt überhaupt nichts sagen, ich möchte einfach nur schweigen...''",
        quoteAuthor: "LiveJournal, oldnewmoscow, 12.01.2012",
        paragraph8: "Lasst uns auch schweigend beobachten:",
        film1: "Die letzte Folge der Kultserie 'Brigada'",
        film2: "Szenen aus den Filmen 'Na igre' und 'Detjam do 16...'",
        film3: "Episode der Serie 'Prokurorskaja proverka' und der Film 'Schapito-schou'",
        section4Title: "Ende des Aquadroms...",
        paragraph9: "Seine düstere, postapokalyptische Ästhetik zog Filmemacher an. Auf seinen Flächen wurden gedreht:",
        paragraph10: "2012 entschieden sich die Behörden für den Abriss. Die Arbeiten begannen im Frühjahr 2014 und waren bis September abgeschlossen. Anstelle des Geistes der Tropen wuchs ein gewöhnliches Einkaufszentrum, das 2020 eröffnet wurde. Die Raumaufteilung und Zweckbestimmung haben sich vollständig geändert, von der früheren Idee ist keine Spur mehr vorhanden.",
        paragraph11: "'Aquadrom' teilte das Schicksal vieler Symbole der Ära. Aber wenn 'Blauer Zahn' noch in neuer Qualität wiederbelebt wurde, dann wurde 'Aquadrom' aus dem Stadtbild gelöscht und blieb nur in der Erinnerung von Stalkern und auf den Aufnahmen von Kultfilmen.",
        infoBoxTitle: "Fortsetzung der Geschichte",
        infoBoxText: "Wenn Sie an der Geschichte der Moskauer Straßen, Gebäude und ihrer Geister interessiert sind, gehen Sie auf ein virtuelles Zeitreisespiel auf der Website 'Zeitmaschine für Moskau' - https://moscow-time-machine.online/."
    }
};

// Вспомогательные функции
function translateInterface(key) {
    return interfaceTranslations[currentLanguage][key] || interfaceTranslations['ru'][key] || key;
}

function translateArticle(key) {
    return articleTranslations[currentLanguage][key] || articleTranslations['ru'][key] || key;
}

function applyTranslation() {
    // Заголовки страницы
    document.getElementById('game-title').textContent = translateInterface('pageTitle');
    document.getElementById('game-subtitle').textContent = translateInterface('pageSubtitle');
    
    // Кнопки управления
    document.getElementById('translate-text').textContent = translateInterface('translateBtn');
    document.getElementById('music-text').textContent = isMusicPlaying ? translateInterface('musicOff') : translateInterface('musicOn');
    document.getElementById('play-text').textContent = translateInterface('playText');
    document.getElementById('home-text').textContent = translateInterface('homeText');
    document.getElementById('telegram-text').textContent = translateInterface('telegramText');
    document.getElementById('back-to-articles').textContent = translateInterface('backToArticles');
    document.getElementById('play-game').textContent = translateInterface('playGame');
    
    // Метаданные статьи
    document.getElementById('article-date').textContent = translateInterface('articleDate');
    document.getElementById('article-category').textContent = translateInterface('articleCategory');
    document.getElementById('reading-time-text').textContent = translateInterface('readingTime');
    
    // Футер
    document.getElementById('footer-text').textContent = translateInterface('footerText');
    document.getElementById('footer-subtext').textContent = translateInterface('footerSubtext');
    
    // Подписи к фотографиям (1-28)
    for (let i = 1; i <= 28; i++) {
        const captionId = `photo${i}-caption`;
        const captionElement = document.getElementById(captionId);
        if (captionElement) {
            const captionTextElement = captionElement.querySelector('.caption-text');
            if (captionTextElement) {
                captionTextElement.textContent = translateInterface(`photo${i}Caption`);
            }
        }
    }
    
    // Содержание статьи
    document.getElementById('article-title').textContent = translateArticle('articleTitle');
    document.getElementById('article-subtitle').textContent = translateArticle('articleSubtitle');
    
    // Абзацы
    for (let i = 1; i <= 11; i++) {
        const paraId = `paragraph${i}`;
        if (document.getElementById(paraId)) {
            document.getElementById(paraId).textContent = translateArticle(paraId);
        }
    }
    
    // Заголовки разделов
    const sectionTitles = ['section1-title', 'section2-title', 'section3-title', 'section4-title'];
    sectionTitles.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const key = sectionId.replace('-title', 'Title').replace('section', 'section');
            element.textContent = translateArticle(key);
        }
    });
    
    // Список возможностей
    for (let i = 1; i <= 6; i++) {
        const areaNameId = `area${i}-name`;
        const areaValueId = `area${i}-value`;
        
        const areaNameElement = document.getElementById(areaNameId);
        const areaValueElement = document.getElementById(areaValueId);
        
        if (areaNameElement) {
            const key = `area${i}Name`;
            areaNameElement.textContent = translateArticle(key);
        }
        
        if (areaValueElement) {
            const key = `area${i}Value`;
            areaValueElement.textContent = translateArticle(key);
        }
    }
    
    // Цитата
    document.getElementById('quote-text').textContent = translateArticle('quoteText');
    document.getElementById('quote-author').textContent = translateArticle('quoteAuthor');
    
    // Список фильмов
    for (let i = 1; i <= 3; i++) {
        const filmId = `film${i}`;
        if (document.getElementById(filmId)) {
            document.getElementById(filmId).textContent = translateArticle(filmId);
        }
    }
    
    // Реклама и инфобокс
    const adElement = document.getElementById('advertisement');
    if (adElement) {
        const adText = translateArticle('advertisement');
        const parts = adText.split('https://moscow-time-machine.online/');
        if (parts.length > 1) {
            adElement.innerHTML = `<p><i class="fas fa-gamepad me-2"></i> <strong>${parts[0]}</strong><a href="https://moscow-time-machine.online/" target="_blank">https://moscow-time-machine.online/</a>${parts[1] ? ', ' + parts[1] : ''}</p>`;
        }
    }
    
    document.getElementById('info-box-title').textContent = translateArticle('infoBoxTitle');
    document.getElementById('info-box-text').innerHTML = translateArticle('infoBoxText').replace('https://moscow-time-machine.online/', '<a href="https://moscow-time-machine.online/" target="_blank">https://moscow-time-machine.online/</a>');
}

function toggleLanguage() {
    const languages = ['ru', 'en', 'de'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    currentLanguage = languages[nextIndex];
    
    applyTranslation();
    localStorage.setItem('moscow-game-language', currentLanguage);
    
    // Обновляем URL с параметром языка для SEO
    const url = new URL(window.location);
    url.searchParams.set('lang', currentLanguage);
    window.history.replaceState({}, '', url);
}

// Управление музыкой
function initMusic() {
    const backgroundMusic = document.getElementById('background-music');
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
    
    updateAudioIndicator();
    
    // Проверяем, была ли музыка включена при последнем посещении
    const wasMusicPlaying = localStorage.getItem('moscow-game-music-playing') === 'true';
    if (wasMusicPlaying) {
        setTimeout(() => {
            toggleMusic();
        }, 1000);
    }
}

function toggleMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-btn');
    const volumeControl = document.getElementById('volume-control');
    
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Музыка воспроизводится');
            }).catch(error => {
                console.log('Ошибка воспроизведения музыки:', error);
                if (error.name === 'NotAllowedError') {
                    console.log('Разрешите воспроизведение музыки в вашем браузере');
                }
            });
        }
        musicBtn.classList.add('active');
        musicBtn.innerHTML = `<i class="fas fa-volume-up"></i> <span id="music-text">${translateInterface('musicOff')}</span>`;
        volumeControl.style.display = 'flex';
    } else {
        backgroundMusic.pause();
        musicBtn.classList.remove('active');
        musicBtn.innerHTML = `<i class="fas fa-music"></i> <span id="music-text">${translateInterface('musicOn')}</span>`;
        volumeControl.style.display = 'none';
    }
    
    updateAudioIndicator();
    localStorage.setItem('moscow-game-music-playing', isMusicPlaying.toString());
}

function setMusicVolume(volume) {
    const backgroundMusic = document.getElementById('background-music');
    musicVolume = volume;
    backgroundMusic.volume = volume;
    localStorage.setItem('moscow-game-volume', volume.toString());
    updateAudioIndicator();
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

// Обработка изображений при ошибке загрузки
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Ошибка загрузки изображения: ${this.src}`);
            // Заменяем на SVG placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QaG90byBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            this.alt = 'Изображение не загружено';
        });
    });
}

// Инициализация страницы
function initArticlePage() {
    // Загружаем язык
    const savedLanguage = localStorage.getItem('moscow-game-language');
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en' || savedLanguage === 'de')) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'ru';
        localStorage.setItem('moscow-game-language', 'ru');
    }
    
    // Применяем переводы
    applyTranslation();
    
    // Инициализируем музыку
    initMusic();
    
    // Обработка ошибок изображений
    handleImageErrors();
    
    // Навешиваем обработчики событий
    document.getElementById('translate-btn-top').addEventListener('click', toggleLanguage);
    document.getElementById('music-btn').addEventListener('click', toggleMusic);
    document.getElementById('volume-slider').addEventListener('input', function() {
        setMusicVolume(parseFloat(this.value));
    });
    document.getElementById('audio-indicator').addEventListener('click', toggleMusic);
    
    console.log(`📄 Страница статьи «Аквадром» инициализирована. Текущий язык: ${currentLanguage}`);
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticlePage);
} else {
    initArticlePage();
}

// Эффекты для изображений при наведении
document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px var(--shadow-color)';
        });
    });
});