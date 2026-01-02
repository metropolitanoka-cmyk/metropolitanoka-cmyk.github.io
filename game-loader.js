// game-loader.js - преобразованные данные для игры

const allPhotos = [
  {
    "id": 1,
    "imageUrl": "photos/1.jpg",
    "year": 1996,
    "coordinates": {"lat": 55.751080, "lng": 37.634210},
    "location": "Гостиница Россия",
    "mode": "90s"
  },
  {
    "id": 2,
    "imageUrl": "photos/2.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.755844, "lng": 37.614205},
    "location": "Гостиница Москва",
    "mode": "90s"
  },
  {
    "id": 3,
    "imageUrl": "photos/3.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.706178, "lng": 37.458548},
    "location": "Аквапарк Аквадром",
    "mode": "90s"
  },
  {
    "id": 4,
    "imageUrl": "photos/4.jpg",
    "year": 1999,
    "coordinates": {"lat": 55.669361, "lng": 37.479739},
    "location": "Недостроенный бизнес-центр Зенит",
    "mode": "90s"
  },
  {
    "id": 5,
    "imageUrl": "photos/5.jpg",
    "year": 1925,
    "coordinates": {"lat": 55.778249, "lng": 37.656704},
    "location": "Ярославский вокзал",
    "mode": "ussr"
  },
  {
    "id": 6,
    "imageUrl": "photos/6.jpg",
    "year": 1922,
    "coordinates": {"lat": 55.718662, "lng": 37.611758},
    "location": "Шуховская башня",
    "mode": "ussr"
  },
  {
    "id": 7,
    "imageUrl": "photos/7.jpg",
    "year": 1980,
    "coordinates": {"lat": 55.966040, "lng": 37.418501},
    "location": "Аэропорт Шереметьево-2 перед открытием",
    "mode": "ussr"
  },
  {
    "id": 8,
    "imageUrl": "photos/8.jpg",
    "year": 1977,
    "coordinates": {"lat": 55.408910, "lng": 37.894984},
    "location": "ТУ-144 в аэропорту Домодедово",
    "mode": "ussr"
  },
  {
    "id": 9,
    "imageUrl": "photos/9.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.745787, "lng": 37.533389},
    "location": "Строительство Москвы-Сити",
    "mode": "90s"
  },
  {
    "id": 10,
    "imageUrl": "photos/10.jpg",
    "year": 1989,
    "coordinates": {"lat": 55.759596, "lng": 37.625797},
    "location": "Лубянка и железный Феликс",
    "mode": "ussr"
  },
  {
    "id": 11,
    "imageUrl": "photos/11.jpg",
    "year": 1998,
    "coordinates": {"lat": 55.765658, "lng": 37.607282},
    "location": "Кинотеатр Россия",
    "mode": "90s"
  },
  {
    "id": 12,
    "imageUrl": "photos/12.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.659633, "lng": 37.750638},
    "location": "Метро Братиславская",
    "mode": "90s"
  },
  {
    "id": 13,
    "imageUrl": "photos/13.jpg",
    "year": 1982,
    "coordinates": {"lat": 55.754760, "lng": 37.619211},
    "location": "Красная площадь",
    "mode": "ussr"
  },
  {
    "id": 14,
    "imageUrl": "photos/14.jpg",
    "year": 1870,
    "coordinates": {"lat": 55.752864, "lng": 37.565498},
    "location": "Товарищество Прохоровской Трёхгорной мануфактуры",
    "mode": "all"
  },
  {
    "id": 15,
    "imageUrl": "photos/15.jpg",
    "year": 1988,
    "coordinates": {"lat": 55.753554, "lng": 37.574617},
    "location": "Дом Советов РСФСР",
    "mode": "ussr"
  },
  {
    "id": 16,
    "imageUrl": "photos/16.jpg",
    "year": 1984,
    "coordinates": {"lat": 55.823682, "lng": 37.631690},
    "location": "1-я Останкинская улица",
    "mode": "ussr"
  },
  {
    "id": 17,
    "imageUrl": "photos/17.jpg",
    "year": 1994,
    "coordinates": {"lat": 55.744369, "lng": 37.606246},
    "location": "Бассейн Москва",
    "mode": "90s"
  },
  {
    "id": 18,
    "imageUrl": "photos/18.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.750912, "lng": 37.596000},
    "location": "Арбат",
    "mode": "90s"
  },
  {
    "id": 19,
    "imageUrl": "photos/19.jpg",
    "year": 1998,
    "coordinates": {"lat": 55.844335, "lng": 37.581288},
    "location": "Гостиничная улица д.6",
    "mode": "90s"
  },
  {
    "id": 20,
    "imageUrl": "photos/20.jpg",
    "year": 1990,
    "coordinates": {"lat": 55.764937, "lng": 37.603705},
    "location": "Первый макдоналдс в СССР",
    "mode": "ussr"
  },
  {
    "id": 21,
    "imageUrl": "photos/21.jpg",
    "year": 1995,
    "coordinates": {"lat": 55.708516, "lng": 37.557236},
    "location": "Воробьёвы горы",
    "mode": "90s"
  },
  {
    "id": 22,
    "imageUrl": "photos/22.jpg",
    "year": 1994,
    "coordinates": {"lat": 55.707888, "lng": 37.554261},
    "location": "Эскалаторная галерея",
    "mode": "90s"
  },
  {
    "id": 23,
    "imageUrl": "photos/23.jpg",
    "year": 1970,
    "coordinates": {"lat": 55.740889, "lng": 37.674792},
    "location": "Улица Рогожский вал",
    "mode": "ussr"
  },
  {
    "id": 24,
    "imageUrl": "photos/24.jpg",
    "year": 1936,
    "coordinates": {"lat": 55.789526, "lng": 37.679709},
    "location": "Метро Сокольники",
    "mode": "ussr"
  },
  {
    "id": 25,
    "imageUrl": "photos/25.jpg",
    "year": 1980,
    "coordinates": {"lat": 55.744759, "lng": 37.564253},
    "location": "Вид на здание МИДа",
    "mode": "ussr"
  },
  {
    "id": 26,
    "imageUrl": "photos/26.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.757019, "lng": 37.662051},
    "location": "Паровоз на Курском вокзале в честь 55-летия Победы.",
    "mode": "90s"
  },
  {
    "id": 27,
    "imageUrl": "photos/27.jpg",
    "year": 1978,
    "coordinates": {"lat": 55.790504, "lng": 37.747621},
    "location": "Строится гостиничный комплекс Измайлово.",
    "mode": "ussr"
  },
  {
    "id": 28,
    "imageUrl": "photos/28.jpg",
    "year": 1856,
    "coordinates": {"lat": 55.752025, "lng": 37.622736},
    "location": "Храм Василия Блаженного",
    "mode": "all"
  },
  {
    "id": 29,
    "imageUrl": "photos/29.jpg",
    "year": 1877,
    "coordinates": {"lat": 55.757024, "lng": 37.661153},
    "location": "Вокзал Курской железной дороги. Прибытие в Москву санитарного поезда князя В. А. Долгорукова",
    "mode": "all"
  },
  {
    "id": 30,
    "imageUrl": "photos/30.jpg",
    "year": 1880,
    "coordinates": {"lat": 55.741448, "lng": 37.621013},
    "location": "Дом Третьяковых",
    "mode": "all"
  },
  {
    "id": 31,
    "imageUrl": "photos/31.jpg",
    "year": 1986,
    "coordinates": {"lat": 55.741245, "lng": 37.621609},
    "location": "Реконструкция Третьяковской галереи",
    "mode": "ussr"
  },
  {
    "id": 32,
    "imageUrl": "photos/32.jpg",
    "year": 1980,
    "coordinates": {"lat": 55.733575, "lng": 37.603923},
    "location": "Центральный дом художника",
    "mode": "ussr"
  },
  {
    "id": 33,
    "imageUrl": "photos/33.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.746856, "lng": 37.552941},
    "location": "Кутузовский проспект",
    "mode": "90s"
  },
  {
    "id": 34,
    "imageUrl": "photos/34.jpg",
    "year": 1999,
    "coordinates": {"lat": 55.747308, "lng": 37.544911},
    "location": "Мост Багратион и Башня 2000",
    "mode": "90s"
  },
  {
    "id": 35,
    "imageUrl": "photos/35.jpg",
    "year": 1950,
    "coordinates": {"lat": 55.747717, "lng": 37.640567},
    "location": "Строительство высотки на Котельнической набережной.",
    "mode": "ussr"
  },
  {
    "id": 36,
    "imageUrl": "photos/36.jpg",
    "year": 1955,
    "coordinates": {"lat": 55.790363, "lng": 37.557966},
    "location": "Стадион Динамо.",
    "mode": "ussr"
  },
  {
    "id": 37,
    "imageUrl": "photos/37.jpg",
    "year": 1992,
    "coordinates": {"lat": 55.758500, "lng": 37.751437},
    "location": "Шоссе Энтузиастов.",
    "mode": "90s"
  },
  {
    "id": 38,
    "imageUrl": "photos/38.jpg",
    "year": 1983,
    "coordinates": {"lat": 55.760042, "lng": 37.626089},
    "location": "перестройка здания КГБ",
    "mode": "ussr"
  },
  {
    "id": 39,
    "imageUrl": "photos/39.jpg",
    "year": 1963,
    "coordinates": {"lat": 55.818458, "lng": 37.608286},
    "location": "Строительство Останкинской телебашни.",
    "mode": "ussr"
  },
  {
    "id": 40,
    "imageUrl": "photos/40.jpg",
    "year": 1980,
    "coordinates": {"lat": 55.764102, "lng": 37.438046},
    "location": "Велотрек в Крылатском.",
    "mode": "ussr"
  },
  {
    "id": 41,
    "imageUrl": "photos/41.jpg",
    "year": 1985,
    "coordinates": {"lat": 55.757398, "lng": 37.613336},
    "location": "Троллейбус у гостиницы Интурист.",
    "mode": "ussr"
  },
  {
    "id": 42,
    "imageUrl": "photos/42.jpg",
    "year": 1978,
    "coordinates": {"lat": 55.694509, "lng": 37.538487},
    "location": "Цирк на Проспекте Вернадского.",
    "mode": "ussr"
  },
  {
    "id": 43,
    "imageUrl": "photos/43.jpg",
    "year": 1995,
    "coordinates": {"lat": 55.755905, "lng": 37.617330},
    "location": "Восстанавливают разобранные в 1931 году Воскресенские ворота.",
    "mode": "90s"
  },
  {
    "id": 44,
    "imageUrl": "photos/44.jpg",
    "year": 1939,
    "coordinates": {"lat": 55.735692, "lng": 37.593809},
    "location": "Метро Маяковская",
    "mode": "ussr"
  },
  {
    "id": 45,
    "imageUrl": "photos/45.jpg",
    "year": 1995,
    "coordinates": {"lat": 55.545296, "lng": 37.547368},
    "location": "Строительство 4-ого микрорайона Южного Бутово.",
    "mode": "90s"
  },
  {
    "id": 46,
    "imageUrl": "photos/46.jpg",
    "year": 1957,
    "coordinates": {"lat": 55.786710, "lng": 37.528608},
    "location": "Ил-18 на Ходынском поле.",
    "mode": "ussr"
  },
  {
    "id": 47,
    "imageUrl": "photos/47.jpg",
    "year": 1979,
    "coordinates": {"lat": 55.594446, "lng": 37.271715},
    "location": "Аэропорт Внуково",
    "mode": "ussr"
  },
  {
    "id": 48,
    "imageUrl": "photos/48.jpg",
    "year": 1986,
    "coordinates": {"lat": 55.774619, "lng": 37.575130},
    "location": "Белорусский вокзал.",
    "mode": "ussr"
  },
  {
    "id": 49,
    "imageUrl": "photos/49.jpg",
    "year": 1906,
    "coordinates": {"lat": 55.755658, "lng": 37.632387},
    "location": "Ильинский крестец.",
    "mode": "all"
  },
  {
    "id": 50,
    "imageUrl": "photos/50.jpg",
    "year": 1982,
    "coordinates": {"lat": 55.792705, "lng": 37.636383},
    "location": "Крытый рынок.",
    "mode": "ussr"
  },
  {
    "id": 51,
    "imageUrl": "photos/51.jpg",
    "year": 1967,
    "coordinates": {"lat": 55.753799, "lng": 37.577560},
    "location": "Панорамный вид с здания СЭВ.",
    "mode": "ussr"
  },
  {
    "id": 52,
    "imageUrl": "photos/52.jpg",
    "year": 1872,
    "coordinates": {"lat": 55.729212, "lng": 37.562640},
    "location": "Новодевичий монастырь.",
    "mode": "all"
  },
  {
    "id": 53,
    "imageUrl": "photos/53.jpg",
    "year": 2000,
    "coordinates": {"lat": 55.758366, "lng": 37.612794},
    "location": "Гостиница Интурист.",
    "mode": "90s"
  },
  {
    "id": 54,
    "imageUrl": "photos/54.jpg",
    "year": 1920,
    "coordinates": {"lat": 55.614780, "lng": 37.682933},
    "location": "Руины Царицынского дворца.",
    "mode": "ussr"
  },
  {
    "id": 55,
    "imageUrl": "photos/55.jpg",
    "year": 1995,
    "coordinates": {"lat": 55.756362, "lng": 37.616194},
    "location": "Cтроительство торгового центра Охотный ряд.",
    "mode": "90s"
  },
  {
    "id": 56,
    "imageUrl": "photos/56.jpg",
    "year": 1999,
    "coordinates": {"lat": 55.765420, "lng": 37.620446},
    "location": "Нижний Кисельный переулок.",
    "mode": "90s"
  },
  {
    "id": 57,
    "imageUrl": "photos/57.jpg",
    "year": 1999,
    "coordinates": {"lat": 55.792285, "lng": 37.748973},
    "location": "Вид с крыши гостиницы Измайлово на Черкизон.",
    "mode": "90s"
  },
  {
    "id": 58,
    "imageUrl": "photos/58.jpg",
    "year": 1880,
    "coordinates": {"lat": 55.740376, "lng": 37.652250},
    "location": "Вид Нижней Таганской площади.",
    "mode": "all"
  },
  {
    "id": 59,
    "imageUrl": "photos/59.jpg",
    "year": 1973,
    "coordinates": {"lat": 55.743112, "lng": 37.643463},
    "location": "Большой Устьинский мост.",
    "mode": "ussr"
  },
  {
    "id": 60,
    "imageUrl": "photos/60.jpg",
    "year": 1980,
    "coordinates": {"lat": 55.742655, "lng": 37.628327},
    "location": "Пятницкая улица.",
    "mode": "ussr"
  },
  {
    "id": 61,
    "imageUrl": "photos/61.jpg",
    "year": 1999,
    "coordinates": {"lat": 55.769648, "lng": 37.595857},
    "location": "Триумфальная площадь.",
    "mode": "90s"
  },
  {
    "id": 62,
    "imageUrl": "photos/62.jpg",
    "year": 1987,
    "coordinates": {"lat": 55.793383, "lng": 37.639510},
    "location": "Платформа Ржевская",
    "mode": "ussr"
  }
];

// Функция для получения случайной фотографии
function getRandomPhoto(mode = 'all', minYear = 1800, maxYear = 2000) {
  let filtered = [...allPhotos];
  
  if (mode === '90s') {
    filtered = allPhotos.filter(p => p.year >= 1992 && p.year <= 2000);
  } else if (mode === 'ussr') {
    filtered = allPhotos.filter(p => p.year >= 1917 && p.year <= 1991);
  } else if (mode === 'custom') {
    filtered = allPhotos.filter(p => p.year >= minYear && p.year <= maxYear);
  }
  
  if (filtered.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

// Функция проверки режима
function checkModeAvailability(mode, minYear = null, maxYear = null) {
  let filtered = [...allPhotos];
  
  if (mode === '90s') {
    filtered = allPhotos.filter(p => p.year >= 1992 && p.year <= 2000);
  } else if (mode === 'ussr') {
    filtered = allPhotos.filter(p => p.year >= 1917 && p.year <= 1991);
  } else if (mode === 'custom') {
    filtered = allPhotos.filter(p => p.year >= minYear && p.year <= maxYear);
  }
  
  return {
    success: true,
    available: filtered.length >= 10,
    count: filtered.length,
    mode: mode,
    minYear: minYear || 1800,
    maxYear: maxYear || 2000
  };
}

// Сделаем функции доступными извне
window.GameData = {
  getRandomPhoto,
  checkModeAvailability,
  getAllPhotos: () => allPhotos
};

console.log('✅ GameData загружен! Всего фото:', allPhotos.length);
console.log('90-е:', allPhotos.filter(p => p.mode === '90s').length, 'фото');
console.log('СССР:', allPhotos.filter(p => p.mode === 'ussr').length, 'фото');
console.log('Все годы:', allPhotos.filter(p => p.mode === 'all').length, 'фото');