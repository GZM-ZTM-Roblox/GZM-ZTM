/* ============================================================
   i18n.js — переводы интерфейса. RU и PL идут первыми (важные).
   ============================================================ */

const LANGS = ['pl','en','ru','de','et','lt','fi'];
const LANG_LABEL = { ru:'RU', pl:'PL', en:'EN', de:'DE', et:'ET', lt:'LT', fi:'FI' };

const I18N = {
  eyebrow: { ru:'GZM · ZTM KATOWICE', pl:'GZM · ZTM KATOWICE', en:'GZM · ZTM KATOWICE', de:'GZM · ZTM KATOWICE', et:'GZM · ZTM KATOWICE', lt:'GZM · ZTM KATOWICE', fi:'GZM · ZTM KATOWICE' },
  title: { ru:'Маршруты и расписание', pl:'Trasy i rozkłady', en:'Routes & Schedules', de:'Linien und Fahrpläne', et:'Marsruudid ja sõiduplaanid', lt:'Maršrutai ir tvarkaraščiai', fi:'Reitit ja aikataulut' },
  aiNote: {
    ru:'Интерфейс переведён автоматически нейросетью — возможны неточности.',
    pl:'Interfejs przetłumaczony automatycznie przez AI — możliwe drobne błędy.',
    en:'Interface translated automatically by AI — please excuse minor errors.',
    de:'Die Oberfläche wurde automatisch von einer KI übersetzt — kleine Fehler sind möglich.',
    et:'Kasutajaliides on tõlgitud automaatselt tehisintellekti abil.',
    lt:'Sąsaja išversta automatiškai naudojant DI.',
    fi:'Käyttöliittymä on käännetty automaattisesti tekoälyllä.'
  },

  navHome: { ru:'Главная', pl:'Strona główna', en:'Home', de:'Startseite', et:'Avaleht', lt:'Pradžia', fi:'Etusivu' },
  navTimetables: { ru:'Расписание', pl:'Rozkłady', en:'Timetables', de:'Fahrpläne', et:'Sõiduplaanid', lt:'Tvarkaraščiai', fi:'Aikataulut' },
  navPlanner: { ru:'Планировщик поездки', pl:'Planer podróży', en:'Trip planner', de:'Routenplaner', et:'Reisiplaneerija', lt:'Kelionės planuoklis', fi:'Reittiopas' },
  navMap: { ru:'Карта', pl:'Mapa', en:'Map', de:'Karte', et:'Veebikaart', lt:'Žemėlapis', fi:'Kartta' },
  navFavorites: { ru:'Избранное', pl:'Ulubione', en:'Favorites', de:'Favoriten', et:'Lemmikud', lt:'Mėgstamiausi', fi:'Suosikit' },
  navNotices: { ru:'Объявления', pl:'Ogłoszenia', en:'Notices', de:'Meldungen', et:'Teated', lt:'Pranešimai', fi:'Tiedotteet' },
  navFaults: { ru:'Сбои', pl:'Utrudnienia', en:'Faults', de:'Störungen', et:'Tõrked', lt:'Sutrikimai', fi:'Häiriöt' },
  navContacts: { ru:'Контакты', pl:'Kontakt', en:'Contacts', de:'Kontakt', et:'Kontaktid', lt:'Kontaktai', fi:'Yhteystiedot' },
  navTickets: { ru:'Билеты', pl:'Bilety', en:'Tickets', de:'Tickets', et:'Piletid', lt:'Bilietai', fi:'Liput' },

  transportGroup: { ru:'Транспорт GZM', pl:'Transport GZM', en:'GZM Transport', de:'GZM-Verkehr', et:'GZM Transport', lt:'GZM Transportas', fi:'GZM-liikenne' },

  vehicleBus: { ru:'Автобус', pl:'Autobus', en:'Bus', de:'Bus', et:'Buss', lt:'Autobusas', fi:'Bussi' },
  vehicleTram: { ru:'Трамвай', pl:'Tramwaj', en:'Tram', de:'Straßenbahn', et:'Tramm', lt:'Tramvajus', fi:'Raitiovaunu' },
  vehicleTrolleybus: { ru:'Троллейбус', pl:'Trolejbus', en:'Trolleybus', de:'Oberleitungsbus', et:'Trollibuss', lt:'Troleibusas', fi:'Johdinauto' },
  filterAll: { ru:'Все', pl:'Wszystkie', en:'All', de:'Alle', et:'Kõik', lt:'Visi', fi:'Kaikki' },

  searchPlaceholder: { ru:'Поиск линии или остановки…', pl:'Szukaj linii lub przystanku…', en:'Search line or stop…', de:'Linie oder Haltestelle suchen…', et:'Otsi liini või peatust…', lt:'Ieškoti maršruto ar stotelės…', fi:'Hae linjaa tai pysäkkiä…' },
  myLocation: { ru:'МОЁ МЕСТО', pl:'MOJA LOKALIZACJA', en:'MY LOCATION', de:'MEIN STANDORT', et:'MINU ASUKOHT', lt:'MANO VIETA', fi:'OMA SIJAINTI' },
  myLocationNote: {
    ru:'Определение местоположения появится в одном из следующих обновлений.',
    pl:'Wykrywanie lokalizacji pojawi się w jednej z kolejnych aktualizacji.',
    en:'Location detection will arrive in a future update.',
    de:'Die Standorterkennung folgt in einem zukünftigen Update.',
    et:'Asukoha tuvastamine lisandub ühes järgmistest uuendustest.',
    lt:'Vietos nustatymas atsiras viename iš būsimų atnaujinimų.',
    fi:'Sijainnin tunnistus lisätään myöhemmässä päivityksessä.'
  },

  direction: { ru:'Направление', pl:'Kierunek', en:'Direction', de:'Richtung', et:'Suund', lt:'Kryptis', fi:'Suunta' },
  stopsHeading: { ru:'Остановки маршрута', pl:'Przystanki na trasie', en:'Stops on this line', de:'Haltestellen dieser Linie', et:'Selle liini peatused', lt:'Šio maršruto stotelės', fi:'Linjan pysäkit' },
  nextDepartures: { ru:'Ближайшие отправления', pl:'Najbliższe odjazdy', en:'Next departures', de:'Nächste Abfahrten', et:'Järgmised väljumised', lt:'Artimiausi išvykimai', fi:'Seuraavat lähdöt' },

  tabPlanner: { ru:'Планировщик', pl:'Planer', en:'Planner', de:'Planer', et:'Reisiplaneerija', lt:'Planuoklis', fi:'Reittiopas' },
  tabFavorites: { ru:'Избранное', pl:'Ulubione', en:'Favorites', de:'Favoriten', et:'Lemmikud', lt:'Mėgstamiausi', fi:'Suosikit' },

  plannerFrom: { ru:'Откуда', pl:'Skąd', en:'From', de:'Von', et:'Algpunkt', lt:'Iš kur', fi:'Mistä' },
  plannerTo: { ru:'Куда', pl:'Dokąd', en:'To', de:'Nach', et:'Lõpp-punkt', lt:'Į kur', fi:'Mihin' },
  plannerFromPlaceholder: { ru:'Остановка отправления', pl:'Przystanek początkowy', en:'Departure stop', de:'Abfahrtshaltestelle', et:'Väljumispeatus', lt:'Išvykimo stotelė', fi:'Lähtöpysäkki' },
  plannerToPlaceholder: { ru:'Остановка назначения', pl:'Przystanek docelowy', en:'Destination stop', de:'Zielhaltestelle', et:'Sihtpeatus', lt:'Paskirties stotelė', fi:'Määränpääpysäkki' },
  plannerDeparts: { ru:'Отправление', pl:'Wyjazd', en:'Departs', de:'Abfahrt', et:'Väljub', lt:'Išvyksta', fi:'Lähtee' },
  plannerArrives: { ru:'Прибытие', pl:'Przyjazd', en:'Arrives', de:'Ankunft', et:'Saabub', lt:'Atvyksta', fi:'Saapuu' },
  plannerMoreOptions: { ru:'дополнительные параметры', pl:'dodatkowe parametry', en:'more options', de:'weitere Optionen', et:'lisaparameetrid', lt:'daugiau parametrų', fi:'lisäasetukset' },
  plannerSearch: { ru:'Найти', pl:'Szukaj', en:'Search', de:'Suchen', et:'Otsi', lt:'Ieškoti', fi:'Hae' },
  plannerNote: {
    ru:'Результаты поиска появятся здесь, когда планировщик подключат к живым данным игры.',
    pl:'Wyniki wyszukiwania pojawią się tutaj, gdy planer zostanie połączony z danymi gry na żywo.',
    en:'Search results will appear here once the planner is connected to live game data.',
    de:'Suchergebnisse erscheinen hier, sobald der Planer mit Live-Spieldaten verbunden ist.',
    et:'Otsingutulemused ilmuvad siia, kui planeerija ühendatakse mängu reaalajas andmetega.',
    lt:'Paieškos rezultatai atsiras čia, kai planuoklis bus prijungtas prie žaidimo gyvų duomenų.',
    fi:'Hakutulokset näkyvät tässä, kun reittiopas yhdistetään pelin reaaliaikaiseen dataan.'
  },

  mapNote: {
    ru:'Здесь появится интерактивная карта. Пока — схема примерного расположения линий.',
    pl:'Tutaj pojawi się interaktywna mapa. Na razie — schemat przybliżonego przebiegu linii.',
    en:'The interactive map will appear here. For now — a rough schematic of the lines.',
    de:'Hier erscheint die interaktive Karte. Vorerst ein grobes Schema der Linien.',
    et:'Siia ilmub interaktiivne kaart. Praegu liinide ligikaudne skeem.',
    lt:'Čia atsiras interaktyvus žemėlapis. Kol kas apytikslė maršrutų schema.',
    fi:'Tähän tulee interaktiivinen kartta. Toistaiseksi karkea kaavio linjoista.'
  },

  favoritesEmpty: {
    ru:'Вы ещё не добавили ни одного маршрута в избранное. Нажмите на звезду рядом с маршрутом в расписании.',
    pl:'Nie dodano jeszcze żadnej linii do ulubionych. Kliknij gwiazdkę przy linii w rozkładzie.',
    en:'You haven\u2019t starred any lines yet. Tap the star next to a line in Timetables.',
    de:'Du hast noch keine Linie favorisiert. Tippe im Fahrplan auf den Stern neben einer Linie.',
    et:'Sa pole veel ühtegi liini lemmikuks lisanud. Vajuta sõiduplaanis liini juures tärnile.',
    lt:'Kol kas nepridėjote nė vieno maršruto į mėgstamiausius. Paspauskite žvaigždutę prie maršruto.',
    fi:'Et ole vielä lisännyt yhtään linjaa suosikkeihin. Napauta linjan tähteä Aikatauluissa.'
  },

  noticesHeading: { ru:'Объявления', pl:'Ogłoszenia', en:'Notices', de:'Meldungen', et:'Teadaanded', lt:'Pranešimai', fi:'Tiedotteet' },
  faultsHeading: { ru:'Сбои и нарушения движения', pl:'Utrudnienia w ruchu', en:'Service faults', de:'Betriebsstörungen', et:'Liiklustõrked', lt:'Eismo sutrikimai', fi:'Liikennehäiriöt' },
  showMore: { ru:'Показать больше', pl:'Pokaż więcej', en:'Show more', de:'Mehr anzeigen', et:'Kuva rohkem', lt:'Rodyti daugiau', fi:'Näytä lisää' },
  noneRightNow: { ru:'Сейчас ничего нет.', pl:'Obecnie brak.', en:'Nothing right now.', de:'Momentan nichts.', et:'Praegu pole midagi.', lt:'Šiuo metu nieko nėra.', fi:'Ei mitään juuri nyt.' },

  contactsHeading: { ru:'Контакты', pl:'Kontakt', en:'Contacts', de:'Kontakt', et:'Kontaktid', lt:'Kontaktai', fi:'Yhteystiedot' },
  contactsBody: {
    ru:'Вопросы по маршрутам или игре? Напишите команде через страницу игры в Roblox.',
    pl:'Pytania o trasy lub grę? Napisz do zespołu przez stronę gry na Roblox.',
    en:'Questions about routes or the game? Reach the team through the Roblox game page.',
    de:'Fragen zu Linien oder zum Spiel? Erreiche das Team über die Roblox-Spielseite.',
    et:'Küsimusi liinide või mängu kohta? Võta meeskonnaga ühendust Robloxi mängu lehe kaudu.',
    lt:'Turite klausimų apie maršrutus ar žaidimą? Susisiekite su komanda per žaidimo puslapį Roblox.',
    fi:'Kysyttävää linjoista tai pelistä? Ota yhteyttä tiimiin Robloxin pelisivun kautta.'
  },

  ticketsHeading: { ru:'Билеты', pl:'Bilety', en:'Tickets', de:'Tickets', et:'Piletid', lt:'Bilietai', fi:'Liput' },
  ticketsBody: {
    ru:'Билетная система пока не подключена — сейчас поездки бесплатны.',
    pl:'System biletowy nie jest jeszcze podłączony — przejazdy są obecnie bezpłatne.',
    en:'Ticketing isn\u2019t connected yet — rides are currently free to board.',
    de:'Das Ticketsystem ist noch nicht angebunden — die Fahrt ist derzeit kostenlos.',
    et:'Piletisüsteem pole veel ühendatud — sõidud on praegu tasuta.',
    lt:'Bilietų sistema dar neprijungta — šiuo metu važiuoti galima nemokamai.',
    fi:'Lippujärjestelmää ei ole vielä liitetty — matkustaminen on toistaiseksi ilmaista.'
  },

  a11yTextSize: { ru:'Размер текста', pl:'Rozmiar tekstu', en:'Text size', de:'Textgröße', et:'Teksti suurus', lt:'Teksto dydis', fi:'Tekstin koko' },
  a11yDefault: { ru:'Обычный', pl:'Domyślny', en:'Default', de:'Standard', et:'Vaikimisi', lt:'Įprastas', fi:'Oletus' },
  a11yLarge: { ru:'Крупный', pl:'Duży', en:'Large', de:'Groß', et:'Suur', lt:'Didelis', fi:'Suuri' },
  a11yXLarge: { ru:'Очень крупный', pl:'Bardzo duży', en:'Extra large', de:'Sehr groß', et:'Väga suur', lt:'Labai didelis', fi:'Erittäin suuri' },
  a11yContrast: { ru:'Контраст', pl:'Kontrast', en:'Contrast', de:'Kontrast', et:'Kontrastsus', lt:'Kontrastas', fi:'Kontrasti' },
  a11yHighContrast: { ru:'Высокий', pl:'Wysoki', en:'High contrast', de:'Hoch', et:'Kõrge', lt:'Aukštas', fi:'Korkea' },

  footer: {
    ru:'Данные расписания приведены для примера.', pl:'Dane rozkładu jazdy mają charakter przykładowy.',
    en:'Sample schedule data.', de:'Beispielhafte Fahrplandaten.', et:'Näidisandmed sõiduplaani kohta.',
    lt:'Pavyzdiniai tvarkaraščio duomenys.', fi:'Esimerkinomaiset aikataulutiedot.'
  },

  /* ---------- login ---------- */
  loginBtn: { ru:'Войти', pl:'Zaloguj', en:'Log in', de:'Anmelden', et:'Logi sisse', lt:'Prisijungti', fi:'Kirjaudu' },
  logoutBtn: { ru:'Выйти', pl:'Wyloguj', en:'Log out', de:'Abmelden', et:'Logi välja', lt:'Atsijungti', fi:'Kirjaudu ulos' },
  loginTitle: { ru:'Вход', pl:'Logowanie', en:'Log in', de:'Anmeldung', et:'Sisselogimine', lt:'Prisijungimas', fi:'Kirjautuminen' },
  loginUsername: { ru:'Логин', pl:'Login', en:'Username', de:'Benutzername', et:'Kasutajanimi', lt:'Vartotojo vardas', fi:'Käyttäjätunnus' },
  loginPassword: { ru:'Пароль', pl:'Hasło', en:'Password', de:'Passwort', et:'Parool', lt:'Slaptažodis', fi:'Salasana' },
  loginSubmit: { ru:'Войти', pl:'Zaloguj', en:'Log in', de:'Anmelden', et:'Logi sisse', lt:'Prisijungti', fi:'Kirjaudu' },
  loginCancel: { ru:'Отмена', pl:'Anuluj', en:'Cancel', de:'Abbrechen', et:'Tühista', lt:'Atšaukti', fi:'Peruuta' },
  loginError: {
    ru:'Неверный логин или пароль.', pl:'Nieprawidłowy login lub hasło.', en:'Incorrect username or password.',
    de:'Falscher Benutzername oder falsches Passwort.', et:'Vale kasutajanimi või parool.',
    lt:'Neteisingas vartotojo vardas arba slaptažodis.', fi:'Väärä käyttäjätunnus tai salasana.'
  },
  loginNote: {
    ru:'Проверка выполняется в браузере и не защищает данные по-настоящему — не используйте здесь настоящий пароль.',
    pl:'Weryfikacja odbywa się w przeglądarce i nie jest prawdziwym zabezpieczeniem — nie używaj tu prawdziwego hasła.',
    en:'This check runs in the browser and isn\u2019t real security \u2014 don\u2019t use a real password here.',
    de:'Diese Prüfung läuft im Browser und ist keine echte Sicherheit \u2014 verwende hier kein echtes Passwort.',
    et:'See kontroll toimub brauseris ega ole tegelik turvameede \u2014 ära kasuta siin päris parooli.',
    lt:'Šis patikrinimas vyksta naršyklėje ir nėra tikra apsauga \u2014 nenaudokite čia tikro slaptažodžio.',
    fi:'Tämä tarkistus tehdään selaimessa eikä ole oikeaa suojausta \u2014 älä käytä tässä oikeaa salasanaa.'
  },
  loggedInAs: { ru:'Вы вошли как', pl:'Zalogowano jako', en:'Logged in as', de:'Angemeldet als', et:'Sisse logitud kui', lt:'Prisijungta kaip', fi:'Kirjautuneena' },

  /* ---------- admin panel ---------- */
  navAdmin: { ru:'Админ-панель', pl:'Panel administratora', en:'Admin panel', de:'Admin-Bereich', et:'Admini paneel', lt:'Administravimo skydelis', fi:'Ylläpito' },
  adminTabLines: { ru:'Линии', pl:'Linie', en:'Lines', de:'Linien', et:'Liinid', lt:'Maršrutai', fi:'Linjat' },
  adminTabNotices: { ru:'Объявления', pl:'Ogłoszenia', en:'Notices', de:'Meldungen', et:'Teated', lt:'Pranešimai', fi:'Tiedotteet' },
  adminTabFaults: { ru:'Сбои', pl:'Utrudnienia', en:'Faults', de:'Störungen', et:'Tõrked', lt:'Sutrikimai', fi:'Häiriöt' },
  adminTabPages: { ru:'Тексты страниц', pl:'Teksty stron', en:'Page texts', de:'Seitentexte', et:'Lehtede tekstid', lt:'Puslapių tekstai', fi:'Sivutekstit' },
  adminHint: {
    ru:'Изменения хранятся только в этой вкладке браузера и исчезают при перезагрузке страницы — без своего сервера сохранить их насовсем нельзя.',
    pl:'Zmiany są przechowywane tylko w tej karcie przeglądarki i znikają po odświeżeniu strony — bez własnego serwera nie da się ich zapisać na stałe.',
    en:'Changes are kept only in this browser tab and disappear on page reload \u2014 without your own server they can\u2019t be saved permanently.',
    de:'Änderungen bleiben nur in diesem Browser-Tab erhalten und gehen beim Neuladen verloren \u2014 ohne eigenen Server lassen sie sich nicht dauerhaft speichern.',
    et:'Muudatused säilivad ainult selles brauseri vahekaardis ja kaovad lehe värskendamisel \u2014 ilma oma serverita ei saa neid jäädavalt salvestada.',
    lt:'Pakeitimai išsaugomi tik šiame naršyklės skirtuke ir dingsta atnaujinus puslapį \u2014 be savo serverio jų negalima išsaugoti visam laikui.',
    fi:'Muutokset säilyvät vain tässä selainvälilehdessä ja katoavat sivua päivitettäessä \u2014 ilman omaa palvelinta niitä ei voi tallentaa pysyvästi.'
  },
  adminAddRoute: { ru:'Добавить маршрут', pl:'Dodaj linię', en:'Add route', de:'Linie hinzufügen', et:'Lisa liin', lt:'Pridėti maršrutą', fi:'Lisää linja' },
  adminAddNotice: { ru:'Добавить объявление', pl:'Dodaj ogłoszenie', en:'Add notice', de:'Meldung hinzufügen', et:'Lisa teade', lt:'Pridėti pranešimą', fi:'Lisää tiedote' },
  adminAddFault: { ru:'Добавить сбой', pl:'Dodaj utrudnienie', en:'Add fault', de:'Störung hinzufügen', et:'Lisa tõrge', lt:'Pridėti sutrikimą', fi:'Lisää häiriö' },
  adminEdit: { ru:'Изменить', pl:'Edytuj', en:'Edit', de:'Bearbeiten', et:'Muuda', lt:'Redaguoti', fi:'Muokkaa' },
  adminDelete: { ru:'Удалить', pl:'Usuń', en:'Delete', de:'Löschen', et:'Kustuta', lt:'Ištrinti', fi:'Poista' },
  adminSave: { ru:'Сохранить', pl:'Zapisz', en:'Save', de:'Speichern', et:'Salvesta', lt:'Išsaugoti', fi:'Tallenna' },
  adminCancel: { ru:'Отмена', pl:'Anuluj', en:'Cancel', de:'Abbrechen', et:'Tühista', lt:'Atšaukti', fi:'Peruuta' },
  adminSaved: { ru:'Сохранено', pl:'Zapisano', en:'Saved', de:'Gespeichert', et:'Salvestatud', lt:'Išsaugota', fi:'Tallennettu' },
  adminDeleted: { ru:'Удалено', pl:'Usunięto', en:'Deleted', de:'Gelöscht', et:'Kustutatud', lt:'Ištrinta', fi:'Poistettu' },
  adminConfirmDelete: {
    ru:'Удалить безвозвратно?', pl:'Usunąć bezpowrotnie?', en:'Delete permanently?', de:'Endgültig löschen?',
    et:'Kustutada jäädavalt?', lt:'Ištrinti negrįžtamai?', fi:'Poistetaanko pysyvästi?'
  },
  formRouteNumber: { ru:'Номер маршрута', pl:'Numer linii', en:'Route number', de:'Liniennummer', et:'Liini number', lt:'Maršruto numeris', fi:'Linjanumero' },
  formVehicleType: { ru:'Тип транспорта', pl:'Typ pojazdu', en:'Vehicle type', de:'Fahrzeugtyp', et:'Sõiduki tüüp', lt:'Transporto tipas', fi:'Ajoneuvotyyppi' },
  formColor: { ru:'Цвет линии', pl:'Kolor linii', en:'Line color', de:'Linienfarbe', et:'Liini värv', lt:'Maršruto spalva', fi:'Linjan väri' },
  formFrom: { ru:'Откуда', pl:'Skąd', en:'From', de:'Von', et:'Algpunkt', lt:'Iš kur', fi:'Mistä' },
  formTo: { ru:'Куда', pl:'Dokąd', en:'To', de:'Nach', et:'Lõpp-punkt', lt:'Į kur', fi:'Mihin' },
  formStops: { ru:'Остановки', pl:'Przystanki', en:'Stops', de:'Haltestellen', et:'Peatused', lt:'Stotelės', fi:'Pysäkit' },
  formAddStop: { ru:'+ Добавить остановку', pl:'+ Dodaj przystanek', en:'+ Add stop', de:'+ Haltestelle hinzufügen', et:'+ Lisa peatus', lt:'+ Pridėti stotelę', fi:'+ Lisää pysäkki' },
  formTimes: { ru:'Время отправления', pl:'Godziny odjazdów', en:'Departure times', de:'Abfahrtszeiten', et:'Väljumisajad', lt:'Išvykimo laikai', fi:'Lähtöajat' },
  formAddTime: { ru:'+ Добавить время', pl:'+ Dodaj godzinę', en:'+ Add time', de:'+ Zeit hinzufügen', et:'+ Lisa aeg', lt:'+ Pridėti laiką', fi:'+ Lisää aika' },
  formDate: { ru:'Дата', pl:'Data', en:'Date', de:'Datum', et:'Kuupäev', lt:'Data', fi:'Päivämäärä' },
  formTitle: { ru:'Заголовок', pl:'Tytuł', en:'Title', de:'Titel', et:'Pealkiri', lt:'Antraštė', fi:'Otsikko' },
  formBody: { ru:'Текст', pl:'Treść', en:'Text', de:'Text', et:'Tekst', lt:'Tekstas', fi:'Teksti' },
  formEditingLang: {
    ru:'Редактируете текст для языка:', pl:'Edytujesz tekst dla języka:', en:'Editing text for language:',
    de:'Text wird bearbeitet für Sprache:', et:'Muudad teksti keeles:', lt:'Redaguojate tekstą kalba:', fi:'Muokkaat tekstiä kielellä:'
  },
  removeStop: { ru:'Удалить остановку', pl:'Usuń przystanek', en:'Remove stop', de:'Haltestelle entfernen', et:'Eemalda peatus', lt:'Pašalinti stotelę', fi:'Poista pysäkki' },
  removeTime: { ru:'Удалить время', pl:'Usuń godzinę', en:'Remove time', de:'Zeit entfernen', et:'Eemalda aeg', lt:'Pašalinti laiką', fi:'Poista aika' },

  labelContactsBody: { ru:'Текст страницы «Контакты»', pl:'Tekst strony „Kontakt”', en:'"Contacts" page text', de:'Text der Seite „Kontakt”', et:'Lehe „Kontaktid” tekst', lt:'Puslapio „Kontaktai” tekstas', fi:'"Yhteystiedot"-sivun teksti' },
  labelTicketsBody: { ru:'Текст страницы «Билеты»', pl:'Tekst strony „Bilety”', en:'"Tickets" page text', de:'Text der Seite „Tickets”', et:'Lehe „Piletid” tekst', lt:'Puslapio „Bilietai” tekstas', fi:'"Liput"-sivun teksti' },
  labelMapNote: { ru:'Подпись на странице «Карта»', pl:'Opis na stronie „Mapa”', en:'"Map" page note', de:'Hinweis auf der Seite „Karte”', et:'Märkus lehel „Veebikaart”', lt:'Pastaba puslapyje „Žemėlapis”', fi:'"Kartta"-sivun huomautus' },
  labelAiNote: { ru:'Строка про машинный перевод', pl:'Wiersz o tłumaczeniu przez AI', en:'AI-translation note line', de:'Hinweiszeile zur KI-Übersetzung', et:'Tehisintellekti tõlke märkuse rida', lt:'Eilutė apie DI vertimą', fi:'Tekoälykäännöksen huomautusrivi' },
  labelFooter: { ru:'Текст в подвале сайта', pl:'Tekst w stopce strony', en:'Site footer text', de:'Text in der Fußzeile', et:'Lehe jaluse tekst', lt:'Svetainės poraštės tekstas', fi:'Sivuston alatunnisteen teksti' },
  formMissingFields: {
    ru:'Заполните номер маршрута, «откуда» и «куда».', pl:'Uzupełnij numer linii, „skąd” i „dokąd”.',
    en:'Please fill in the route number, "from" and "to".', de:'Bitte Liniennummer, „Von” und „Nach” ausfüllen.',
    et:'Täida liini number, „algpunkt” ja „lõpp-punkt”.', lt:'Užpildykite maršruto numerį, „iš kur” ir „į kur”.',
    fi:'Täytä linjanumero, "mistä" ja "mihin".'
  },

  /* ---------- stops / map editing ---------- */
  formStopsPick: { ru:'Остановки маршрута', pl:'Przystanki linii', en:'Route stops', de:'Haltestellen der Linie', et:'Liini peatused', lt:'Maršruto stotelės', fi:'Linjan pysäkit' },
  formStopsPickHint: {
    ru:'Нажимай на остановки по порядку, чтобы добавить их в маршрут.',
    pl:'Klikaj przystanki w kolejności, aby dodać je do linii.',
    en:'Tap stops in order to add them to the route.',
    de:'Tippe Haltestellen der Reihe nach an, um sie zur Linie hinzuzufügen.',
    et:'Vajuta peatustele järjekorras, et need liinile lisada.',
    lt:'Spauskite stoteles iš eilės, kad pridėtumėte jas į maršrutą.',
    fi:'Napauta pysäkkejä järjestyksessä lisätäksesi ne linjaan.'
  },
  formStopsEmpty: {
    ru:'Сначала добавь остановки на странице «Карта» (клик по карте в режиме администратора).',
    pl:'Najpierw dodaj przystanki na stronie „Mapa” (kliknij mapę w trybie administratora).',
    en:'First add stops on the "Map" page (click the map while logged in as admin).',
    de:'Füge zuerst Haltestellen auf der Seite „Karte” hinzu (Klick auf die Karte im Admin-Modus).',
    et:'Lisa kõigepealt peatused lehel „Veebikaart” (klõpsa kaardil administraatorina).',
    lt:'Pirmiausia pridėkite stoteles puslapyje „Žemėlapis” (spustelėkite žemėlapį administratoriaus režimu).',
    fi:'Lisää ensin pysäkkejä "Kartta"-sivulla (napauta karttaa ylläpitäjänä).'
  },
  goToMap: { ru:'Перейти на карту', pl:'Przejdź do mapy', en:'Go to map', de:'Zur Karte', et:'Mine kaardile', lt:'Eiti į žemėlapį', fi:'Siirry karttaan' },
  mapAdminHint: {
    ru:'Кликни по пустому месту карты, чтобы поставить остановку. Кликни по жёлтой точке, чтобы переименовать или удалить её.',
    pl:'Kliknij puste miejsce na mapie, aby dodać przystanek. Kliknij żółtą kropkę, aby ją zmienić lub usunąć.',
    en:'Click an empty spot on the map to place a stop. Click a yellow dot to rename or delete it.',
    de:'Klicke auf eine freie Stelle der Karte, um eine Haltestelle zu setzen. Klicke auf einen gelben Punkt, um sie umzubenennen oder zu löschen.',
    et:'Klõpsa kaardil tühjale kohale, et lisada peatus. Klõpsa kollasel punktil, et see ümber nimetada või kustutada.',
    lt:'Spustelėkite tuščią vietą žemėlapyje, kad pastatytumėte stotelę. Spustelėkite geltoną tašką, kad pervadintumėte ar ištrintumėte.',
    fi:'Napauta karttaa tyhjästä kohdasta lisätäksesi pysäkin. Napauta keltaista pistettä nimetäksesi sen uudelleen tai poistaaksesi sen.'
  },
  promptStopName: { ru:'Название остановки:', pl:'Nazwa przystanku:', en:'Stop name:', de:'Haltestellenname:', et:'Peatuse nimi:', lt:'Stotelės pavadinimas:', fi:'Pysäkin nimi:' },
  promptStopRename: {
    ru:'Изменить название (оставь пустым и нажми OK, чтобы удалить):',
    pl:'Zmień nazwę (zostaw puste i kliknij OK, aby usunąć):',
    en:'Change the name (leave empty and press OK to delete):',
    de:'Namen ändern (leer lassen und OK drücken zum Löschen):',
    et:'Muuda nime (jäta tühjaks ja vajuta OK, et kustutada):',
    lt:'Pakeiskite pavadinimą (palikite tuščią ir spauskite OK, kad ištrintumėte):',
    fi:'Muuta nimeä (jätä tyhjäksi ja paina OK poistaaksesi):'
  },
  stopInfoLinesHeading: { ru:'Линии через эту остановку', pl:'Linie przez ten przystanek', en:'Lines through this stop', de:'Linien über diese Haltestelle', et:'Liinid selle peatuse kaudu', lt:'Maršrutai per šią stotelę', fi:'Pysäkin kautta kulkevat linjat' },
  stopInfoNoLines: {
    ru:'Через эту остановку пока не проходит ни одна линия.',
    pl:'Przez ten przystanek nie przechodzi jeszcze żadna linia.',
    en:'No lines pass through this stop yet.',
    de:'Es verkehrt noch keine Linie über diese Haltestelle.',
    et:'Selle peatuse kaudu ei sõida veel ükski liin.',
    lt:'Per šią stotelę dar nevažiuoja joks maršrutas.',
    fi:'Yksikään linja ei vielä kulje tämän pysäkin kautta.'
  },
  uploadMapImage: { ru:'Загрузить карту игры', pl:'Wczytaj mapę gry', en:'Upload game map', de:'Spielkarte hochladen', et:'Laadi üles mängu kaart', lt:'Įkelti žaidimo žemėlapį', fi:'Lataa pelin kartta' },
  previewMapImage: { ru:'Предпросмотр картинки (только у меня)', pl:'Podgląd obrazu (tylko u mnie)', en:'Preview image (only for me)', de:'Bildvorschau (nur bei mir)', et:'Pildi eelvaade (ainult minul)', lt:'Peržiūrėti paveikslėlį (tik man)', fi:'Esikatsele kuvaa (vain minulle)' },
  resetMapImage: { ru:'Вернуть карту из репозитория', pl:'Przywróć mapę z repozytorium', en:'Restore map from repository', de:'Karte aus dem Repository wiederherstellen', et:'Taasta kaart repositooriumist', lt:'Atkurti žemėlapį iš saugyklos', fi:'Palauta kartta arkistosta' },
  mapImageNote: {
    ru:'Это только предпросмотр в твоём браузере — другие посетители его не увидят. Чтобы карта обновилась у всех, замени файл assets/map.jpg в репозитории на GitHub.',
    pl:'To tylko podgląd w Twojej przeglądarce — inni odwiedzający go nie zobaczą. Aby mapa zaktualizowała się u wszystkich, podmień plik assets/map.jpg w repozytorium na GitHubie.',
    en:'This is only a preview in your browser — other visitors won\u2019t see it. To update the map for everyone, replace the assets/map.jpg file in the GitHub repository.',
    de:'Dies ist nur eine Vorschau in deinem Browser \u2014 andere Besucher sehen sie nicht. Um die Karte für alle zu aktualisieren, ersetze die Datei assets/map.jpg im GitHub-Repository.',
    et:'See on ainult eelvaade sinu brauseris \u2014 teised külastajad seda ei näe. Kaardi uuendamiseks kõigi jaoks asenda fail assets/map.jpg GitHubi repositooriumis.',
    lt:'Tai tik peržiūra jūsų naršyklėje \u2014 kiti lankytojai jos nematys. Kad žemėlapis atsinaujintų visiems, pakeiskite failą assets/map.jpg GitHub saugykloje.',
    fi:'Tämä on vain esikatselu selaimessasi \u2014 muut kävijät eivät näe sitä. Päivittääksesi kartan kaikille, korvaa tiedosto assets/map.jpg GitHub-arkistossa.'
  },
  githubMapNote: {
    ru:'Постоянная карта сайта берётся из файла assets/map.jpg в репозитории. Замени этот файл на GitHub (Add file → Upload files, или git push) — и новая карта появится у всех посетителей сама, без Firebase и паролей в коде.',
    pl:'Stała mapa strony pochodzi z pliku assets/map.jpg w repozytorium. Podmień ten plik na GitHubie (Add file → Upload files albo git push) — nowa mapa pojawi się u wszystkich odwiedzających automatycznie, bez Firebase i haseł w kodzie.',
    en:'The site\u2019s permanent map comes from the assets/map.jpg file in the repository. Replace that file on GitHub (Add file \u2192 Upload files, or git push) \u2014 the new map appears for every visitor automatically, no Firebase or passwords in the code needed.',
    de:'Die dauerhafte Karte der Seite stammt aus der Datei assets/map.jpg im Repository. Ersetze diese Datei auf GitHub (Add file \u2192 Upload files oder git push) \u2014 die neue Karte erscheint automatisch bei allen Besuchern, ohne Firebase oder Passwörter im Code.',
    et:'Lehe püsiv kaart pärineb failist assets/map.jpg repositooriumis. Asenda see fail GitHubis (Add file \u2192 Upload files või git push) \u2014 uus kaart ilmub automaatselt kõigile külastajatele, ilma Firebase\u2019ita või paroolideta koodis.',
    lt:'Nuolatinis svetainės žemėlapis paimamas iš failo assets/map.jpg saugykloje. Pakeiskite šį failą GitHub (Add file \u2192 Upload files arba git push) \u2014 naujas žemėlapis automatiškai atsiras visiems lankytojams, be Firebase ar slaptažodžių kode.',
    fi:'Sivuston pysyvä kartta tulee tiedostosta assets/map.jpg arkistossa. Korvaa tämä tiedosto GitHubissa (Add file \u2192 Upload files tai git push) \u2014 uusi kartta ilmestyy automaattisesti kaikille kävijöille, ilman Firebasea tai salasanoja koodissa.'
  },

  /* ---------- theme ---------- */
  a11yTheme: { ru:'Тема', pl:'Motyw', en:'Theme', de:'Design', et:'Teema', lt:'Tema', fi:'Teema' },
  a11yThemeDark: { ru:'Тёмная', pl:'Ciemny', en:'Dark', de:'Dunkel', et:'Tume', lt:'Tamsi', fi:'Tumma' },
  a11yThemeLight: { ru:'Светлая', pl:'Jasny', en:'Light', de:'Hell', et:'Hele', lt:'Šviesi', fi:'Vaalea' }
};
