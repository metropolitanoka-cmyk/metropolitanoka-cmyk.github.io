// ================================================
// СКРИПТ ДЛЯ СТРАНИЦЫ СТАТЬИ "СИНИЙ ЗУБ"
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

// Система переводов для интерфейса (ДОБАВЛЕН ПЕРЕВОД ДЛЯ СЧЕТЧИКА)
const interfaceTranslations = {
    ru: {
        pageTitle: "Синий зуб. Стеклянный памятник 90-х",
        pageSubtitle: "Статья из цикла «Заброшенная Москва»",
        translateBtn: "EN",
        musicOn: "Музыка",
        musicOff: "Музыка",
        playText: "Играть",
        homeText: "Статьи",
        telegramText: "Telegram",
        articleDate: "20.01.2026",
        articleCategory: "90-е и строения",
        readingTime: "7 мин чтения",
        backToArticles: "Назад к статьям",
        playGame: "Играть в игру",
        footerText: "Проект создан с ❤️ для любителей истории Москвы",
        footerSubtext: "Архивные фотографии и исторические материалы",
        viewsText: "просмотров",
        photo1Caption: "Общий вид, после реконструкции",
        photo2Caption: "Академик Абел Аганбегян",
        photo3Caption: "«Город из стеклянных кристаллов» итальянского архитектора Лучано Перини",
        photo4Caption: "Это один из вариантов проекта Центра международной торговли на Красной Пресне от Лучано Перини. Изначальный проект «Зуба» был похож на него - башня была очень высокой",
        photo5Caption: "3D визуализация здания, хотя скорее комплекса зданий",
        photo6Caption: "Строительство «Блютуза». Здание почти сразу прозвали синим зубом из-за цвета стекла",
        photo7Caption: "Застывшие, но как оказалось не навечно панорамные лифты",
        photo8Caption: "Гигантская лебёдка на крыше",
        photo9Caption: "Атриум",
        photo10Caption: "Фотографии внутри молчаливого гиганта",
        photo11Caption: "Фотографии внутри молчаливого гиганта",
        photo12Caption: "Фотографии внутри молчаливого гиганта",
        photo13Caption: "Фотографии внутри молчаливого гиганта",
        photo14Caption: "Реконструкция и замена стёкол"
    },
    en: {
        pageTitle: "Blue Tooth. Glass monument of the 90s",
        pageSubtitle: "Article from the series «Abandoned Moscow»",
        translateBtn: "DE",
        musicOn: "Music",
        musicOff: "Music",
        playText: "Play",
        homeText: "Articles",
        telegramText: "Telegram",
        articleDate: "20.01.2026",
        articleCategory: "90s and buildings",
        readingTime: "7 min read",
        backToArticles: "Back to articles",
        playGame: "Play the game",
        footerText: "Project created with ❤️ for Moscow history lovers",
        footerSubtext: "Archive photos and historical materials",
        viewsText: "views",
        photo1Caption: "General view, after reconstruction",
        photo2Caption: "Academician Abel Aganbegyan",
        photo3Caption: "«City of glass crystals» by Italian architect Luciano Perini",
        photo4Caption: "This is one of the variants of the International Trade Center project on Krasnaya Presnya by Luciano Perini. The original «Tooth» project was similar to it - the tower was very high",
        photo5Caption: "3D visualization of the building, or rather the complex of buildings",
        photo6Caption: "Construction of «Bluetooth». The building was almost immediately nicknamed the blue tooth due to the color of the glass",
        photo7Caption: "Frozen, but as it turned out not forever panoramic elevators",
        photo8Caption: "Giant winch on the roof",
        photo9Caption: "Atrium",
        photo10Caption: "Photos inside the silent giant",
        photo11Caption: "Photos inside the silent giant",
        photo12Caption: "Photos inside the silent giant",
        photo13Caption: "Photos inside the silent giant",
        photo14Caption: "Reconstruction and glass replacement"
    },
    de: {
        pageTitle: "Blauer Zahn. Glasdenkmal der 90er Jahre",
        pageSubtitle: "Artikel aus der Serie «Verlassenes Moskau»",
        translateBtn: "RU",
        musicOn: "Musik",
        musicOff: "Musik",
        playText: "Spielen",
        homeText: "Artikel",
        telegramText: "Telegram",
        articleDate: "20.01.2026",
        articleCategory: "90er und Gebäude",
        readingTime: "7 Min. Lesezeit",
        backToArticles: "Zurück zu Artikeln",
        playGame: "Spiel spielen",
        footerText: "Projekt mit ❤️ für Moskau-Geschichtsenthusiasten erstellt",
        footerSubtext: "Archivfotos und historische Materialien",
        viewsText: "Aufrufe",
        photo1Caption: "Allgemeine Ansicht nach der Rekonstruktion",
        photo2Caption: "Akademiker Abel Aganbegyan",
        photo3Caption: "«Stadt aus Glaskristallen» des italienischen Architekten Luciano Perini",
        photo4Caption: "Dies ist eine der Varianten des Internationalen Handelszentrums auf der Krasnaya Presnya von Luciano Perini. Das ursprüngliche «Zahn»-Projekt war ähnlich - der Turm war sehr hoch",
        photo5Caption: "3D-Visualisierung des Gebäudes, oder eher des Gebäudekomplexes",
        photo6Caption: "Bau von «Bluetooth». Das Gebäude wurde aufgrund der Glasfarbe fast sofort blauer Zahn genannt",
        photo7Caption: "Eingefrorene, aber wie sich herausstellte, nicht für immer Panoramaaufzüge",
        photo8Caption: "Riesige Winde auf dem Dach",
        photo9Caption: "Atrium",
        photo10Caption: "Fotos im Inneren des stillen Riesen",
        photo11Caption: "Fotos im Inneren des stillen Riesen",
        photo12Caption: "Fotos im Inneren des stillen Riesen",
        photo13Caption: "Fotos im Inneren des stillen Riesen",
        photo14Caption: "Rekonstruktion und Glasaustausch"
    }
};

// Переводы содержания статьи
const articleTranslations = {
    ru: {
        articleTitle: "Синий зуб. Стеклянный памятник 90-х",
        articleSubtitle: "Сейчас многие люди, проезжая по проспекту Вернадского, замечают (на сегодняшний взгляд) обычную офисную стекляшку. Но немногие знают, что зданию почти 40 лет, и не осознают его истинных размеров! Давайте разберёмся в истории этого символа 90-х, сталкеров, диггеров и других исследователей Москвы, и что происходит с ним сейчас.",
        paragraph1: "Футуристический замысел: деловой центр для новой России. Идея строительства родилась в 1989 году, когда ректор Академии народного хозяйства академик Абел Аганбегян, будучи в Болонье, увидел проект «города из стеклянных кристаллов» итальянского архитектора Лучано Перини.",
        paragraph2: "Аганбегян, один из главных идеологов экономической перестройки, загорелся воплотить подобный символ в Москве. Он видел в нём олицетворение новой, открытой миру, рыночной России.",
        paragraph3: "Здание, получившее официальное название «Международный учебно-деловой центр \"Зенит\"», задумывалось как грандиозный комплекс при Академии. Проект был поручен мастерской «Моспроект-1», а концепцию Перини архитекторы Яков Белопольский (к слову видный московский модернист, автор цирка на том же Проспекте Вернадского) и Николай Лютомский переработали, придав ей черты супрематизма - здание должно было выглядеть как «сломанные и смятые кристаллы».",
        paragraph4: "Позже «начинку» здания было решено поменять, вот что там должно было быть. Амбициозные планы распределяли 100 тысяч кв. метров площади следующим образом:",
        area1Name: "Офисные помещения:",
        area1Value: "40 000 м²",
        area2Name: "Пятизвёздочный гостиничный комплекс:",
        area2Value: "40 000 м²",
        area3Name: "Подземная парковка:",
        area3Value: "14 000 м²",
        area4Name: "Торговые зоны:",
        area4Value: "3 500 м²",
        area5Name: "Конференц-зал:",
        area5Value: "2 500 м²",
        area6Name: "Панорамный ресторан на 19-м этаже",
        area6Value: "✓",
        advertisement: "Если вам нравится столица заходите на сайт-игру по старым фото Москвы https://moscow-time-machine.online/, этот гигант там тоже есть",
        section1Title: "Откуда деньги взять?",
        paragraph5: "Проект был уникален для своего времени. Деньги на него - кредит в 102 млн ЭКЮ (европейская валютная единица) - выделил консорциум европейских банков во главе с итальянским «Banca Popolare di Novara». Гарантом выступало не советское, а итальянское правительство, что было беспрецедентно. Стальной каркас здания проектировали в Москве, производили в Италии и везли на сборку в СССР.",
        paragraph6: "Однако судьба проекта оказалась заложником бурной эпохи. В 1995 году, когда здание было готово на 80-85%, стройка внезапно остановилась. Основной подрядчик, итальянская компания, исчезла в разгар коррупционного скандала «Чистые руки». Вскоре грянул дефолт 1998 года, похоронивший надежды на рефинансирование кредита. Началась долгая череда судов за права собственности.",
        section2Title: "Царство диггеров и сталкеров",
        paragraph7: "К концу 1990-х годов внутри почти завершенного здания царила призрачная атмосфера. Конструктивная особенность с внутренними водостоками привела к катастрофе: вода замерзала ночью, разрывая трубы, а днем затапливала этажи. В некоторых местах не успели покрыть силиконом резиновые прокладки между стеклопакетами, что ускорило разрушение. За годы заброшенности «Синий Зуб» превратился в культовое место для московских сталкеров, исследователей и граффити-художников. Проникнуть внутрь можно было через дыры в заборе, хотя объект формально охранялся. Вот фотографии из тех времён:",
        quoteText: "«Все скрипит, хрустит, падает, кажется, что скоро всё обвалится... Гуляя по этажам, мы набрели на конференц-зал, где буквально каждый дюйм исписан граффити»",
        quoteAuthor: "mister_marat, ЖЖ, 18 марта 2010",
        section3Title: "Легенды, мифы, поговорки",
        paragraph8: "За годы заброшенности вокруг «Синего Зуба» сложилось множество легенд. Одна из самых мрачных гласила, что охранники регулярно находили внутри трупы людей - от самоубийц до жертв несчастных случаев. Ходили слухи о случаях, когда мальчики затаскивали девочек в здание и угрожали выбросить их из окон.",
        paragraph9: "Была и история о генерал-майоре, который незаконно сдал в аренду земли Минобороны итальянским строителям, а полученные деньги потратил на путешествие в Японию. Но самая известная легенда связана с причинами остановки строительства - сицилийской мафией, которая остановила стройку.",
        section4Title: "Что сейчас, что будет?",
        paragraph10: "Новая жизнь началась в 2018–2019 годах, когда было принято решение завершить строительство для нужд РАНХиГС (правопреемника АНХ). Подрядчиком выступила компания «Техинжстрой». После оценки и укрепления каркаса началась масштабная реконструкция.",
        paragraph11: "По последним данным (декабрь 2025 года), внешние работы практически завершены: закончена облицовка, идет обустройство территории. В здании, общая площадь которого после реконструкции составит 162 тыс. м², разместятся учебные корпуса, гостиница, спортивный комплекс, кафе и конференц-залы.",
        infoBoxTitle: "Продолжение истории",
        infoBoxText: "Если вам интересна история московских улиц, зданий и их призраков, отправляйтесь в виртуальное путешествие-игру во времени на сайте «Машина времени по Москве» - https://moscow-time-machine.online/."
    },
    en: {
        articleTitle: "Blue Tooth. Glass monument of the 90s",
        articleSubtitle: "Now many people, driving along Vernadsky Avenue, notice (in today's view) an ordinary office glass building. But few know that the building is almost 40 years old, and do not realize its true size! Let's understand the history of this symbol of the 90s, stalkers, diggers and other researchers of Moscow, and what is happening with it now.",
        paragraph1: "Futuristic idea: a business center for new Russia. The idea of construction was born in 1989, when the rector of the Academy of National Economy, academician Abel Aganbegyan, being in Bologna, saw the project of a «city of glass crystals» by Italian architect Luciano Perini.",
        paragraph2: "Aganbegyan, one of the main ideologists of economic perestroika, was inspired to embody such a symbol in Moscow. He saw in it the embodiment of a new, open to the world, market Russia.",
        paragraph3: "The building, which received the official name «International Educational and Business Center \"Zenith\"», was conceived as a grandiose complex at the Academy. The project was entrusted to the workshop «Mosproekt-1», and Perini's concept was reworked by architects Yakov Belopolsky (by the way, a prominent Moscow modernist, author of the circus on the same Vernadsky Avenue) and Nikolai Lyutomsky, giving it features of suprematism - the building was supposed to look like «broken and crumpled crystals».",
        paragraph4: "Later, it was decided to change the «filling» of the building, here's what should have been there. Ambitious plans distributed 100 thousand square meters of area as follows:",
        area1Name: "Office premises:",
        area1Value: "40,000 m²",
        area2Name: "Five-star hotel complex:",
        area2Value: "40,000 m²",
        area3Name: "Underground parking:",
        area3Value: "14,000 m²",
        area4Name: "Trading zones:",
        area4Value: "3,500 m²",
        area5Name: "Conference hall:",
        area5Value: "2,500 m²",
        area6Name: "Panoramic restaurant on the 19th floor",
        area6Value: "✓",
        advertisement: "If you like the capital, visit the website-game for old photos of Moscow https://moscow-time-machine.online/, this giant is also there",
        section1Title: "Where to get money?",
        paragraph5: "The project was unique for its time. Money for it - a loan of 102 million ECU (European Currency Unit) - was allocated by a consortium of European banks led by the Italian «Banca Popolare di Novara». The guarantor was not the Soviet, but the Italian government, which was unprecedented. The steel frame of the building was designed in Moscow, produced in Italy and transported for assembly in the USSR.",
        paragraph6: "However, the fate of the project became a hostage of a turbulent era. In 1995, when the building was 80-85% ready, construction suddenly stopped. The main contractor, an Italian company, disappeared in the midst of the «Clean Hands» corruption scandal. Soon the 1998 default broke out, burying hopes for loan refinancing. A long series of trials for property rights began.",
        section2Title: "Kingdom of diggers and stalkers",
        paragraph7: "By the end of the 1990s, a ghostly atmosphere reigned inside the almost completed building. A design feature with internal drains led to disaster: water froze at night, breaking pipes, and flooded floors during the day. In some places, they did not have time to cover the rubber gaskets between the double-glazed windows with silicone, which accelerated destruction. Over the years of abandonment, the «Blue Tooth» has become a cult place for Moscow stalkers, researchers and graffiti artists. It was possible to get inside through holes in the fence, although the object was formally guarded. Here are photos from those times:",
        quoteText: "«Everything creaks, crunches, falls, it seems that everything will soon collapse... Walking through the floors, we came across a conference hall, where literally every inch is painted with graffiti»",
        quoteAuthor: "mister_marat, LiveJournal, March 18, 2010",
        section3Title: "Legends, myths, sayings",
        paragraph8: "Over the years of abandonment, many legends have developed around the «Blue Tooth». One of the darkest said that guards regularly found corpses of people inside - from suicides to victims of accidents. There were rumors of cases where boys dragged girls into the building and threatened to throw them out of windows.",
        paragraph9: "There was also a story about a major general who illegally leased Ministry of Defense lands to Italian builders, and spent the money received on a trip to Japan. But the most famous legend is connected with the reasons for stopping construction - the Sicilian mafia, which stopped the construction.",
        section4Title: "What now, what will be?",
        paragraph10: "New life began in 2018-2019, when it was decided to complete the construction for the needs of RANEPA (successor to the ANKh). The contractor was the company «Tekhinzhstroy». After assessing and strengthening the frame, a large-scale reconstruction began.",
        paragraph11: "According to the latest data (December 2025), external work is almost completed: cladding is completed, territory improvement is underway. The building, the total area of which after reconstruction will be 162 thousand m², will house educational buildings, a hotel, a sports complex, cafes and conference halls.",
        infoBoxTitle: "Continuation of history",
        infoBoxText: "If you are interested in the history of Moscow streets, buildings and their ghosts, go on a virtual time travel game on the website «Time Machine for Moscow» - https://moscow-time-machine.online/."
    },
    de: {
        articleTitle: "Blauer Zahn. Glasdenkmal der 90er Jahre",
        articleSubtitle: "Heute bemerken viele Menschen, die entlang dem Vernadski-Prospekt fahren, (aus heutiger Sicht) ein gewöhnliches Büroglashaus. Aber wenige wissen, dass das Gebäude fast 40 Jahre alt ist und seine wahre Größe nicht erkennen! Lassen Sie uns die Geschichte dieses Symbols der 90er Jahre, Stalker, Digger und anderer Moskauer Forscher verstehen und was jetzt damit geschieht.",
        paragraph1: "Futuristische Ideе: ein Geschäftszentrum für das neue Russland. Die Bauidee entstand 1989, als der Rektor der Akademie der Volkswirtschaft, Akademiker Abel Aganbegyan, in Bologna das Projekt einer «Stadt aus Glaskristallen» des italienischen Architekten Luciano Perini sah.",
        paragraph2: "Aganbegyan, einer der Hauptideologen der wirtschaftlichen Perestroika, war inspiriert, ein solches Symbol in Moskau zu verkörpern. Er sah darin die Verkörperung eines neuen, der Welt offenen, marktwirtschaftlichen Russlands.",
        paragraph3: "Das Gebäude, das den offiziellen Namen «Internationales Bildungs- und Geschäftszentrum \"Zenith\"» erhielt, war als grandioser Komplex an der Akademie konzipiert. Das Projekt wurde der Werkstatt «Mosproekt-1» anvertraut, und Perinis Konzept wurde von den Architekten Jakow Belopolski (übrigens ein bedeutender Moskauer Modernist, Autor des Zirkus auf demselben Vernadski-Prospekt) und Nikolai Ljutomski überarbeitet, wodurch ihm Züge des Suprematismus verliehen wurden - das Gebäude sollte wie «gebrochene und zerknitterte Kristalle» aussehen.",
        paragraph4: "Später wurde beschlossen, die «Füllung» des Gebäudes zu ändern, hier ist, was dort hätte sein sollen. Ambitionierte Pläne verteilten 100.000 Quadratmeter Fläche wie folgt:",
        area1Name: "Büroräume:",
        area1Value: "40.000 m²",
        area2Name: "Fünf-Sterne-Hotelkomplex:",
        area2Value: "40.000 m²",
        area3Name: "Tiefgarage:",
        area3Value: "14.000 m²",
        area4Name: "Handelszonen:",
        area4Value: "3.500 m²",
        area5Name: "Konferenzsaal:",
        area5Value: "2.500 m²",
        area6Name: "Panoramarestaurant im 19. Stock",
        area6Value: "✓",
        advertisement: "Wenn Sie die Hauptstadt mögen, besuchen Sie die Website-Spiel für alte Fotos von Moskau https://moscow-time-machine.online/, dieser Riese ist auch dort",
        section1Title: "Woher Geld nehmen?",
        paragraph5: "Das Projekt war für seine Zeit einzigartig. Geld dafür - ein Kredit von 102 Millionen ECU (Europäische Währungseinheit) - wurde von einem Konsortium europäischer Banken unter der Leitung der italienischen «Banca Popolare di Novara» bereitgestellt. Der Garant war nicht die sowjetische, sondern die italienische Regierung, was beispiellos war. Der Stahlrahmen des Gebäudes wurde in Moskau entworfen, in Italien hergestellt und zur Montage in die UdSSR transportiert.",
        paragraph6: "Das Schicksal des Projekts wurde jedoch zur Geisel einer turbulenten Ära. 1995, als das Gebäude zu 80-85% fertig war, stoppte der Bau plötzlich. Der Hauptauftragnehmer, eine italienische Firma, verschwand inmitten des Korruptionsskandals «Saubere Hände». Bald brach die Zahlungsunfähigkeit von 1998 aus, die Hoffnungen auf eine Kreditrefinanzierung begrub. Eine lange Serie von Prozessen um Eigentumsrechte begann.",
        section2Title: "Königreich der Digger und Stalker",
        paragraph7: "Ende der 1990er Jahre herrschte im fast fertiggestellten Gebäude eine gespenstische Atmosphäre. Ein Konstruktionsmerkmal mit internen Abflüssen führte zur Katastrophe: Wasser gefror nachts, brach Rohre und überflutete tagsüber die Böden. An einigen Stellen hatten sie keine Zeit, die Gummipackungen zwischen den Isolierglasscheiben mit Silikon zu bedecken, was die Zerstörung beschleunigte. Über die Jahre der Verlassenheit wurde der «Blaue Zahn» zu einem Kultort für Moskauer Stalker, Forscher und Graffiti-Künstler. Es war möglich, durch Löcher im Zaun ins Innere zu gelangen, obwohl das Objekt formal bewacht war. Hier sind Fotos aus jenen Zeiten:",
        quoteText: "«Alles knarrt, knirscht, fällt, es scheint, dass alles bald einstürzen wird... Beim Gehen durch die Stockwerge stießen wir auf einen Konferenzsaal, wo buchstäblich jeder Zentimeter mit Graffiti bedeckt ist»",
        quoteAuthor: "mister_marat, LiveJournal, 18. März 2010",
        section3Title: "Legenden, Mythen, Sprüche",
        paragraph8: "Über die Jahre der Verlassenheit haben sich viele Legenden um den «Blauen Zahn» entwickelt. Eine der dunkelsten besagte, dass Wachen regelmäßig Leichen von Menschen im Inneren fanden - von Selbstmördern bis zu Unfallopfern. Es gab Gerüchte über Fälle, in denen Jungen Mädchen ins Gebäude schleppten und drohten, sie aus den Fenstern zu werfen.",
        paragraph9: "Es gab auch eine Geschichte über einen Generalmajor, der illegal Land des Verteidigungsministeriums an italienische Bauunternehmer verpachtete und das erhaltene Geld für eine Reise nach Japan ausgab. Aber die berühmteste Legende hängt mit den Gründen für den Baustopp zusammen - die sizilianische Mafia, die den Bau stoppte.",
        section4Title: "Что сейчас, что будет?",
        paragraph10: "Ein neues Leben begann 2018-2019, als beschlossen wurde, den Bau für die Bedürfnisse der RANEPA (Nachfolger der ANKh) abzuschließen. Auftragnehmer war das Unternehmen «Tekhinzhstroy». Nach Bewertung und Verstärkung des Rahmens begann eine groß angelegte Rekonstruktion.",
        paragraph11: "Nach neuesten Daten (Dezember 2025) sind die Außenarbeiten fast abgeschlossen: Die Verkleidung ist fertig, die Geländegestaltung ist im Gange. Das Gebäude, dessen Gesamtfläche nach der Rekonstruktion 162.000 m² betragen wird, wird Lehrgebäude, ein Hotel, einen Sportkomplex, Cafés und Konferenzsäle beherbergen.",
        infoBoxTitle: "Fortsetzung der Geschichte",
        infoBoxText: "Wenn Sie an der Geschichte der Moskauer Straßen, Gebäude und ihrer Geister interessiert sind, gehen Sie auf ein virtuelles Zeitreisespiel auf der Website «Zeitmaschine für Moskau» - https://moscow-time-machine.online/."
    }
};

// Вспомогательные функции
function translateInterface(key) {
    return interfaceTranslations[currentLanguage][key] || interfaceTranslations['ru'][key] || key;
}

function translateArticle(key) {
    return articleTranslations[currentLanguage][key] || articleTranslations['ru'][key] || key;
}

// УПРОЩЕННАЯ ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ СЧЕТЧИКА GOATCOUNTER
function loadGoatCounterViews() {
    const viewElement = document.getElementById('views-text');
    if (!viewElement) return;
    
    // Показываем просто текст "просмотров" без цифр
    // GoatCounter не предоставляет простого API для получения количества просмотров
    // без использования виджета или серверного API с ключом
    viewElement.textContent = translateInterface('viewsText');
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
    
    // Счетчик просмотров
    loadGoatCounterViews();
    
    // Футер
    document.getElementById('footer-text').textContent = translateInterface('footerText');
    document.getElementById('footer-subtext').textContent = translateInterface('footerSubtext');
    
    // Подписи к фотографиям
    for (let i = 1; i <= 14; i++) {
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
    
    // Список площадей
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
    
    console.log(`📄 Страница статьи «Синий зуб» инициализирована. Текущий язык: ${currentLanguage}`);
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
