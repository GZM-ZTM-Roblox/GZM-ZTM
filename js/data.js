/* ============================================================
   data.js — тестовые данные: остановки, линии, объявления, сбои.

   ОСТАНОВКИ (STOPS) ставятся на странице "Карта" (администратором,
   кликом по карте) и потом просто выбираются при создании маршрута —
   не нужно печатать их вручную.
   ============================================================ */

/* ============================================================
   Карта игры: положи файл в /assets/map.jpg и просто замени его
   в репозитории на GitHub, когда карта в игре обновится — сайт
   сам подхватит новую версию у всех, ничего больше делать не надо.
   Если файла ещё нет — сайт просто покажет клетчатую заглушку.
   ============================================================ */
let MAP_IMAGE_URL = 'assets/map.jpg';

/* Остановки пока пустые — расставляются на странице "Карта" в
   режиме администратора (клик по карте). */
let STOPS = [];

let ROUTES = [
  { id:'6',  type:'bus',  color:'#ef4444', from:'Katowice Dworzec', to:'Chorzów Batory',
    stops:[], times:['07:04','07:16','07:28','07:40'] },
  { id:'11', type:'tram', color:'#3b82f6', from:'Sosnowiec Pogoń', to:'Katowice Ligota',
    stops:[], times:['06:58','07:13','07:28','07:43'] },
  { id:'23', type:'bus', color:'#22c55e', from:'Zabrze Biskupice', to:'Gliwice Zajezdnia',
    stops:[], times:['07:02','07:20','07:38','07:56'] },
  { id:'51', type:'trolleybus', color:'#f59e0b', from:'Bytom Dworzec', to:'Chorzów Stadion',
    stops:[], times:['07:10','07:25','07:40','07:55'] },
  { id:'77', type:'tram', color:'#a78bfa', from:'Katowice Ligota', to:'Tychy Miasto',
    stops:[], times:['06:45','07:05','07:25','07:45'] },
];

/* Объявления (Teadaanded) — общая информация, не сбои */
let NOTICES = [
  {
    date:'16.08.2026', type:'bus', routeId:'6',
    title:{ ru:'Небольшое изменение расписания линии 6', pl:'Drobna zmiana rozkładu linii 6', en:'Minor schedule change on line 6', de:'Kleine Fahrplanänderung bei Linie 6', et:'Väike sõiduplaani muudatus liinil 6', lt:'Nedidelis 6 maršruto tvarkaraščio pokytis', fi:'Pieni aikataulumuutos linjalla 6' },
    body:{
      ru:'С сегодняшнего дня расписание линии 6 незначительно скорректировано в утренние часы.',
      pl:'Od dzisiaj rozkład linii 6 został nieznacznie skorygowany w godzinach porannych.',
      en:'As of today, the morning schedule for line 6 has been slightly adjusted.',
      de:'Ab heute wurde der Vormittagsfahrplan der Linie 6 leicht angepasst.',
      et:'Alates tänasest on liini 6 hommikune sõiduplaan veidi muudetud.',
      lt:'Nuo šiandien 6 maršruto ryto tvarkaraštis šiek tiek pakoreguotas.',
      fi:'Tästä päivästä alkaen linjan 6 aamuaikataulua on hieman muutettu.'
    }
  },
  {
    date:'10.08.2026', type:'tram', routeId:'77',
    title:{ ru:'Новая остановка на линии 77', pl:'Nowy przystanek na linii 77', en:'New stop on line 77', de:'Neue Haltestelle auf Linie 77', et:'Uus peatus liinil 77', lt:'Nauja stotelė 77 maršrute', fi:'Uusi pysäkki linjalla 77' },
    body:{
      ru:'На маршруте 77 добавлена дополнительная остановка «Tychy Ustroń».',
      pl:'Na trasie 77 dodano dodatkowy przystanek „Tychy Ustroń”.',
      en:'An additional stop, "Tychy Ustroń", has been added to line 77.',
      de:'Auf Linie 77 wurde die zusätzliche Haltestelle „Tychy Ustroń” eingerichtet.',
      et:'Liinile 77 lisati täiendav peatus „Tychy Ustroń”.',
      lt:'Į 77 maršrutą įtraukta papildoma stotelė „Tychy Ustroń”.',
      fi:'Linjalle 77 on lisätty uusi pysäkki "Tychy Ustroń".'
    }
  },
];

/* Сбои / нарушения движения (Tõrked) */
let FAULTS = [
  {
    date:'14.08.2026', type:'bus', routeId:'23',
    title:{ ru:'Временный объезд на линии 23', pl:'Tymczasowy objazd na linii 23', en:'Temporary diversion on line 23', de:'Vorübergehende Umleitung auf Linie 23', et:'Ajutine ümbersõit liinil 23', lt:'Laikinas 23 maršruto aplinkkelias', fi:'Tilapäinen kiertotie linjalla 23' },
    body:{
      ru:'Из-за ремонта дороги автобусы линии 23 временно объезжают участок Ruda Śląska — Gliwice Sośnica.',
      pl:'Z powodu remontu drogi autobusy linii 23 tymczasowo omijają odcinek Ruda Śląska — Gliwice Sośnica.',
      en:'Due to roadworks, line 23 buses are temporarily diverted around the Ruda Śląska — Gliwice Sośnica section.',
      de:'Wegen Straßenarbeiten fahren die Busse der Linie 23 vorübergehend eine Umleitung um den Abschnitt Ruda Śląska — Gliwice Sośnica.',
      et:'Teetööde tõttu sõidavad liini 23 bussid ajutiselt ümber lõigust Ruda Śląska — Gliwice Sośnica.',
      lt:'Dėl kelio remonto 23 maršruto autobusai laikinai važiuoja aplinkkeliu ruože Ruda Śląska — Gliwice Sośnica.',
      fi:'Tietöiden vuoksi linjan 23 bussit kiertävät tilapäisesti osuuden Ruda Śląska — Gliwice Sośnica.'
    }
  },
  {
    date:'12.08.2026', type:'trolleybus', routeId:'51',
    title:{ ru:'Перерыв в движении на линии 51', pl:'Przerwa w kursowaniu linii 51', en:'Service break on line 51', de:'Betriebsunterbrechung auf Linie 51', et:'Liikluskatkestus liinil 51', lt:'51 maršruto eismo pertrauka', fi:'Liikennekatko linjalla 51' },
    body:{
      ru:'Троллейбусы линии 51 временно не курсируют между остановками Bytom Karb и Chorzów Rynek.',
      pl:'Trolejbusy linii 51 tymczasowo nie kursują między przystankami Bytom Karb i Chorzów Rynek.',
      en:'Line 51 trolleybuses are temporarily not running between the Bytom Karb and Chorzów Rynek stops.',
      de:'Die Oberleitungsbusse der Linie 51 verkehren vorübergehend nicht zwischen den Haltestellen Bytom Karb und Chorzów Rynek.',
      et:'Liini 51 trollibussid ajutiselt ei sõida peatuste Bytom Karb ja Chorzów Rynek vahel.',
      lt:'51 maršruto troleibusai laikinai nekursuoja tarp stotelių Bytom Karb ir Chorzów Rynek.',
      fi:'Linjan 51 johdinautot eivät tilapäisesti liikennöi pysäkkien Bytom Karb ja Chorzów Rynek välillä.'
    }
  },
];
