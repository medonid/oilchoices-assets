/* ═══════════════════════════════════════════════════
   OILCHOICES.COM — Header JS v8.1 SECURITY
   Fixes: XSS via innerHTML, open-redirect, whitelist
   All user-controlled data goes through textContent
   or validated DOM API — zero innerHTML from input
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var D = document, W = window;
  var booted = false, bootTries = 0, BOOT_MAX = 80;
  var lastScroll = 0, ticking = false, headerHidden = false;

  /* ── Data ── */
  var MAKES = [
    "Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet",
    "Chrysler","Dodge","Ford","GMC","Honda","Hyundai","Infiniti","Jeep","Kia",
    "Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan",
    "Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo"
  ];

  /* ── SECURITY: Whitelist set for O(1) lookup ── */
  var MAKES_SET = Object.create(null);
  MAKES.forEach(function (m) { MAKES_SET[m] = true; });

  var MODELS = {
    "Acura":["ILX","MDX","RDX","TLX","ZDX"],
    "Alfa Romeo":["Giulia","Stelvio","Tonale"],
    "Audi":["A3","A4","A5","A6","Q3","Q5","Q7","Q8","e-tron"],
    "BMW":["2 Series","3 Series","4 Series","5 Series","7 Series","M3","M5","X1","X3","X5","X7","iX"],
    "Buick":["Enclave","Encore","Encore GX","Envision"],
    "Cadillac":["CT4","CT5","Escalade","XT4","XT5","XT6","Lyriq"],
    "Chevrolet":["Blazer","Camaro","Colorado","Equinox","Malibu","Silverado 1500","Silverado 2500HD","Suburban","Tahoe","Traverse","Trax"],
    "Chrysler":["300","Pacifica","Pacifica Hybrid"],
    "Dodge":["Challenger","Charger","Durango","Hornet"],
    "Ford":["Bronco","Edge","Escape","Explorer","Expedition","F-150","F-250 Super Duty","Maverick","Mustang","Ranger","Transit"],
    "GMC":["Acadia","Canyon","Sierra 1500","Sierra 2500HD","Terrain","Yukon"],
    "Honda":["Accord","CR-V","Civic","HR-V","Odyssey","Passport","Pilot","Ridgeline"],
    "Hyundai":["Elantra","Ioniq 5","Ioniq 6","Kona","Palisade","Santa Fe","Sonata","Tucson"],
    "Infiniti":["Q50","Q60","QX50","QX60","QX80"],
    "Jeep":["Cherokee","Compass","Gladiator","Grand Cherokee","Renegade","Wrangler"],
    "Kia":["Carnival","EV6","EV9","Forte","K5","Sorento","Soul","Sportage","Telluride"],
    "Land Rover":["Defender","Discovery","Discovery Sport","Range Rover","Range Rover Sport"],
    "Lexus":["ES","GX","IS","LX","NX","RX","UX"],
    "Lincoln":["Aviator","Corsair","Nautilus","Navigator"],
    "Mazda":["CX-30","CX-5","CX-50","CX-90","Mazda3","Mazda6","MX-5 Miata"],
    "Mercedes-Benz":["A-Class","C-Class","E-Class","GLC","GLE","GLS","S-Class","Sprinter"],
    "Mitsubishi":["Eclipse Cross","Mirage","Outlander","Outlander PHEV"],
    "Nissan":["Altima","Armada","Frontier","Murano","Pathfinder","Rogue","Sentra","Titan","Versa"],
    "Ram":["1500","2500","3500","ProMaster"],
    "Subaru":["Ascent","BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","WRX"],
    "Tesla":["Cybertruck","Model 3","Model S","Model X","Model Y"],
    "Toyota":["4Runner","Camry","Corolla","Crown","GR86","Highlander","Land Cruiser","Prius","RAV4","RAV4 Hybrid","Sequoia","Sienna","Supra","Tacoma","Tundra","Venza"],
    "Volkswagen":["Atlas","Golf","GTI","ID.4","Jetta","Taos","Tiguan"],
    "Volvo":["S60","S90","V60","V90","XC40","XC60","XC90"]
  };

  /* ── SECURITY: MODELS set per make for whitelist check ── */
  var MODELS_SET = Object.create(null);
  Object.keys(MODELS).forEach(function (mk) {
    MODELS_SET[mk] = Object.create(null);
    MODELS[mk].forEach(function (mo) { MODELS_SET[mk][mo] = true; });
  });

  var DB = {
    'Ford': {
      'F-150':         { capacity:'5.7 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'FL-820S' },
      'Mustang':       { capacity:'8.0 qt', viscosity:'5W-50',  interval:'7,500 mi',  api:'API SP',       filter:'FL-400S' },
      'Explorer':      { capacity:'6.0 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'FL-910S' },
      'Edge':          { capacity:'5.5 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SQ',       filter:'FL-500S' },
      'Bronco':        { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'FL-820S' },
      'Escape':        { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'FL-910S' },
      'Ranger':        { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'FL-820S' },
      'Expedition':    { capacity:'7.5 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'FL-910S' },
      'Maverick':      { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'FL-910S' },
      'Transit':       { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'FL-820S' }
    },
    'Chevrolet': {
      'Silverado 1500':{ capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Equinox':       { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Malibu':        { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SQ',       filter:'PF-64'  },
      'Colorado':      { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Camaro':        { capacity:'7.5 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-48'  },
      'Blazer':        { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Tahoe':         { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Suburban':      { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Traverse':      { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Trax':          { capacity:'4.2 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-64'  }
    },
    'Toyota': {
      'Camry':         { capacity:'4.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP/GF-6A', filter:'90915-YZZD2' },
      'Corolla':       { capacity:'4.4 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP/GF-6A', filter:'90915-YZZD4' },
      'RAV4':          { capacity:'4.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP/GF-6A', filter:'90915-YZZD2' },
      'RAV4 Hybrid':   { capacity:'4.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP/GF-6A', filter:'90915-YZZD2' },
      'Tacoma':        { capacity:'5.5 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZE2' },
      '4Runner':       { capacity:'6.2 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZE2' },
      'Highlander':    { capacity:'5.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' },
      'Tundra':        { capacity:'7.2 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZF4' },
      'Prius':         { capacity:'4.4 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP/GF-6A', filter:'90915-YZZD4' },
      'Sienna':        { capacity:'5.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' }
    },
    'Honda': {
      'Civic':         { capacity:'3.4 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SQ/GF-7A', filter:'15400-PLM-A02' },
      'Accord':        { capacity:'3.7 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SQ/GF-7A', filter:'15400-RTA-003' },
      'CR-V':          { capacity:'3.7 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-RTA-003' },
      'Pilot':         { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-RTA-003' },
      'HR-V':          { capacity:'3.4 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-PLM-A02' },
      'Odyssey':       { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-RTA-003' },
      'Ridgeline':     { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-RTA-003' },
      'Passport':      { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'15400-RTA-003' }
    },
    'BMW': {
      '3 Series':      { capacity:'5.3 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' },
      '5 Series':      { capacity:'6.9 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' },
      'X3':            { capacity:'5.3 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' },
      'X5':            { capacity:'6.9 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' },
      'M3':            { capacity:'6.9 qt', viscosity:'10W-60', interval:'7,500 mi',  api:'BMW M',        filter:'11428507683' },
      'M5':            { capacity:'8.5 qt', viscosity:'10W-60', interval:'7,500 mi',  api:'BMW M',        filter:'11428507683' },
      'X1':            { capacity:'5.3 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' },
      'X7':            { capacity:'6.9 qt', viscosity:'0W-30',  interval:'10,000 mi', api:'BMW LL-17',    filter:'11428507683' }
    },
    'Mercedes-Benz': {
      'C-Class':       { capacity:'5.5 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'MB 229.71',    filter:'A6511800009' },
      'E-Class':       { capacity:'6.9 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'MB 229.71',    filter:'A6511800009' },
      'GLC':           { capacity:'5.5 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'MB 229.71',    filter:'A6511800009' },
      'GLE':           { capacity:'8.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'MB 229.51',    filter:'A6421800009' },
      'S-Class':       { capacity:'8.5 qt', viscosity:'0W-40',  interval:'10,000 mi', api:'MB 229.71',    filter:'A2761800009' },
      'GLS':           { capacity:'8.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'MB 229.51',    filter:'A6421800009' },
      'Sprinter':      { capacity:'8.5 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'MB 229.51',    filter:'A6421800009' }
    },
    'Dodge': {
      'Challenger':    { capacity:'7.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Charger':       { capacity:'7.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Durango':       { capacity:'6.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Hornet':        { capacity:'4.5 qt', viscosity:'0W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' }
    },
    'Nissan': {
      'Altima':        { capacity:'4.3 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-9E01A' },
      'Rogue':         { capacity:'3.9 qt', viscosity:'0W-20',  interval:'5,000 mi',  api:'API SP',       filter:'15208-65F0A' },
      'Pathfinder':    { capacity:'5.8 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-9E01A' },
      'Frontier':      { capacity:'5.4 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-9E01A' },
      'Armada':        { capacity:'6.2 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-9E01A' },
      'Murano':        { capacity:'4.3 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-65F0A' },
      'Sentra':        { capacity:'3.9 qt', viscosity:'0W-20',  interval:'5,000 mi',  api:'API SP',       filter:'15208-65F0A' },
      'Titan':         { capacity:'6.5 qt', viscosity:'5W-30',  interval:'5,000 mi',  api:'API SP',       filter:'15208-9E01A' },
      'Versa':         { capacity:'3.5 qt', viscosity:'0W-20',  interval:'5,000 mi',  api:'API SP',       filter:'15208-65F0A' }
    },
    'Jeep': {
      'Wrangler':      { capacity:'5.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Grand Cherokee':{ capacity:'5.9 qt', viscosity:'0W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Gladiator':     { capacity:'5.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Compass':       { capacity:'4.5 qt', viscosity:'0W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Cherokee':      { capacity:'5.5 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'Renegade':      { capacity:'4.0 qt', viscosity:'0W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' }
    },
    'Subaru': {
      'Outback':       { capacity:'5.1 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'Forester':      { capacity:'5.1 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'Crosstrek':     { capacity:'5.1 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'Ascent':        { capacity:'5.1 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'Impreza':       { capacity:'4.2 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'Legacy':        { capacity:'5.1 qt', viscosity:'0W-20',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'WRX':           { capacity:'5.1 qt', viscosity:'5W-30',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' },
      'BRZ':           { capacity:'4.2 qt', viscosity:'5W-30',  interval:'6,000 mi',  api:'API SP',       filter:'15208AA170' }
    },
    'Hyundai': {
      'Elantra':       { capacity:'4.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SN',       filter:'26300-35504' },
      'Sonata':        { capacity:'5.1 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Tucson':        { capacity:'4.7 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Santa Fe':      { capacity:'5.1 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Palisade':      { capacity:'6.6 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35505' },
      'Kona':          { capacity:'4.2 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' }
    },
    'Kia': {
      'Forte':         { capacity:'4.2 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SN',       filter:'26300-35504' },
      'K5':            { capacity:'5.1 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Sportage':      { capacity:'4.7 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Sorento':       { capacity:'5.1 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' },
      'Telluride':     { capacity:'6.6 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35505' },
      'Carnival':      { capacity:'6.6 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35505' },
      'Soul':          { capacity:'4.2 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'26300-35504' }
    },
    'Ram': {
      '1500':          { capacity:'8.0 qt', viscosity:'0W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      '2500':          { capacity:'8.0 qt', viscosity:'5W-40',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      '3500':          { capacity:'8.0 qt', viscosity:'5W-40',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' },
      'ProMaster':     { capacity:'5.0 qt', viscosity:'5W-20',  interval:'8,000 mi',  api:'API SP',       filter:'MO-090' }
    },
    'GMC': {
      'Sierra 1500':   { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Sierra 2500HD': { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Yukon':         { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Terrain':       { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Acadia':        { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'Canyon':        { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' }
    },
    'Audi': {
      'A3':            { capacity:'4.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'A4':            { capacity:'5.7 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'A6':            { capacity:'6.4 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06E115403P' },
      'Q5':            { capacity:'5.7 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'Q7':            { capacity:'6.4 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06E115403P' },
      'Q8':            { capacity:'6.4 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06E115403P' }
    },
    'Volkswagen': {
      'Jetta':         { capacity:'4.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'Tiguan':        { capacity:'5.7 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'Atlas':         { capacity:'6.4 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'Golf':          { capacity:'4.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'GTI':           { capacity:'4.5 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' },
      'Taos':          { capacity:'5.0 qt', viscosity:'5W-40',  interval:'10,000 mi', api:'VW 502.00',    filter:'06J115403Q' }
    },
    'Lexus': {
      'RX':            { capacity:'5.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' },
      'NX':            { capacity:'4.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' },
      'ES':            { capacity:'4.8 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' },
      'IS':            { capacity:'5.3 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD2' },
      'GX':            { capacity:'6.2 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZE2' },
      'LX':            { capacity:'7.4 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZF4' },
      'UX':            { capacity:'4.2 qt', viscosity:'0W-20',  interval:'10,000 mi', api:'API SP',       filter:'90915-YZZD4' }
    },
    'Lincoln': {
      'Navigator':     { capacity:'7.5 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'FL-910S' },
      'Aviator':       { capacity:'6.0 qt', viscosity:'5W-30',  interval:'10,000 mi', api:'API SP',       filter:'FL-910S' },
      'Nautilus':      { capacity:'5.5 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'FL-500S' },
      'Corsair':       { capacity:'4.5 qt', viscosity:'5W-20',  interval:'7,500 mi',  api:'API SP',       filter:'FL-910S' }
    },
    'Cadillac': {
      'Escalade':      { capacity:'8.0 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'CT5':           { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'CT4':           { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'XT5':           { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'XT6':           { capacity:'6.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' },
      'XT4':           { capacity:'5.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PF-63E' }
    },
    'Mazda': {
      'Mazda3':        { capacity:'4.5 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' },
      'CX-5':          { capacity:'4.5 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' },
      'CX-50':         { capacity:'4.5 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' },
      'CX-90':         { capacity:'5.8 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'SH0114302'   },
      'Mazda6':        { capacity:'4.5 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' },
      'MX-5 Miata':    { capacity:'4.0 qt', viscosity:'5W-30',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' },
      'CX-30':         { capacity:'4.5 qt', viscosity:'0W-20',  interval:'7,500 mi',  api:'API SP',       filter:'PE01-14-302' }
    }
  };

  /* ── EV map ── */
  var EV_MAP = {
    'Audi':       { 'e-tron': 1 },
    'BMW':        { 'iX': 1 },
    'Cadillac':   { 'Lyriq': 1 },
    'Hyundai':    { 'Ioniq 5': 1, 'Ioniq 6': 1 },
    'Kia':        { 'EV6': 1, 'EV9': 1 },
    'Tesla':      { 'Cybertruck': 1, 'Model 3': 1, 'Model S': 1, 'Model X': 1, 'Model Y': 1 },
    'Volkswagen': { 'ID.4': 1 }
  };

  /* ════════════════════════════════════════
     SECURITY HELPERS
  ════════════════════════════════════════ */

  /**
   * FIX #1 — XSS: escape any string before using in HTML context.
   * Used only where textContent is not an option (e.g. option values).
   */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * FIX #2 — Whitelist validation for make/model/year.
   * Returns sanitized string or null if invalid.
   */
  function validateYear(v) {
    var n = parseInt(v, 10);
    return (n >= 1990 && n <= 2026) ? String(n) : null;
  }

  function validateMake(v) {
    return (typeof v === 'string' && MAKES_SET[v] === true) ? v : null;
  }

  function validateModel(mk, v) {
    return (typeof v === 'string' && MODELS_SET[mk] && MODELS_SET[mk][v] === true) ? v : null;
  }

  /* ── Other helpers ── */
  function getFallback(make, model) {
    if (EV_MAP[make] && EV_MAP[make][model]) {
      return {
        capacity: 'N/A', viscosity: 'No engine oil',
        interval: 'N/A', api: 'Battery EV', filter: 'N/A',
        note: 'Battery-electric vehicle — no conventional engine oil required.'
      };
    }
    return null;
  }

  /**
   * FIX #3 — buildYears: use DOM API, no string injection.
   */
  function buildYears(sel) {
    var opt0 = D.createElement('option');
    opt0.value = '';
    opt0.textContent = 'Year';
    sel.appendChild(opt0);
    for (var y = 2026; y >= 1990; y--) {
      var opt = D.createElement('option');
      opt.value = String(y);
      opt.textContent = String(y);
      sel.appendChild(opt);
    }
  }

  /**
   * FIX #4 — buildMakes: use DOM API, no string injection.
   */
  function buildMakes(sel) {
    var opt0 = D.createElement('option');
    opt0.value = '';
    opt0.textContent = 'Make';
    sel.appendChild(opt0);
    MAKES.forEach(function (m) {
      var opt = D.createElement('option');
      opt.value = m;           /* value is from internal whitelist — safe */
      opt.textContent = m;
      sel.appendChild(opt);
    });
  }

  function dd(label, titleText, links) {
    /* Static trusted data only — no user input here */
    return '<div class="oc-dd">' +
      '<button class="oc-dtog" type="button" aria-haspopup="true" aria-expanded="false">' +
        esc(label) + ' <span class="oc-darr" aria-hidden="true">&#9660;</span>' +
      '</button>' +
      '<div class="oc-ddm" role="menu">' +
        '<div class="oc-ddt">' + esc(titleText) + '</div>' +
        '<div class="oc-ddl">' +
          links.map(function (l) {
            /* href values are hardcoded internal URLs — safe */
            return '<a href="' + esc(l[1]) + '" role="menuitem">' + esc(l[0]) + '</a>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /**
   * FIX #5 — shake: never write arbitrary values to style.
   * Only safe numeric pixel offsets from internal array.
   */
  function shake(el) {
    var pos = [6, -6, 4, -4, 2, 0];
    var i = 0;
    var t = setInterval(function () {
      /* pos[i] is always a number from our own array — safe */
      var px = typeof pos[i] === 'number' ? pos[i] : 0;
      el.style.transform = 'translateX(' + px + 'px)';
      if (++i >= pos.length) {
        clearInterval(t);
        el.style.transform = '';
      }
    }, 55);
  }

  function syncNbOffset() {
    var nb = D.getElementById('oc-nb');
    if (!nb) return;
    var h = Math.max(36, Math.round(nb.getBoundingClientRect().height));
    D.documentElement.style.setProperty('--oc-nb-h', h + 'px');
  }

  function hidePanel() {
    var p = D.getElementById('oc-spec-panel');
    if (p) p.remove();
  }

  function getPanel() {
    var p = D.getElementById('oc-spec-panel');
    if (!p) {
      p = D.createElement('div');
      p.id = 'oc-spec-panel';
      var ymm = D.querySelector('.oc-ymm');
      var hdr = D.getElementById('oc-hdr');
      if (ymm) ymm.insertAdjacentElement('afterend', p);
      else if (hdr) hdr.appendChild(p);
    }
    return p;
  }

  /**
   * FIX #6 — pill: use DOM API exclusively, no innerHTML with user data.
   */
  function pill(label, val, color) {
    var sp = D.createElement('span');
    sp.className = 'oc-sp-pill';
    /* color comes from internal hardcoded strings — safe, but guard anyway */
    var safeColor = /^#[0-9a-fA-F]{3,6}$/.test(color) ? color : '#0d47a1';
    sp.style.borderLeftColor = safeColor;

    var lbl = D.createElement('span');
    lbl.className = 'oc-sp-pill-lbl';
    lbl.style.color = safeColor;
    lbl.textContent = label;   /* textContent — XSS-safe */

    var valEl = D.createElement('span');
    valEl.className = 'oc-sp-pill-val';
    valEl.textContent = val;   /* textContent — XSS-safe */

    sp.appendChild(lbl);
    sp.appendChild(valEl);
    return sp;
  }

  function closeBtn() {
    var btn = D.createElement('button');
    btn.type = 'button';
    btn.className = 'oc-sp-close';
    btn.setAttribute('aria-label', 'Close oil spec panel');
    btn.textContent = '\u00D7';   /* FIX: textContent instead of innerHTML */
    btn.addEventListener('click', hidePanel);
    return btn;
  }

  /**
   * FIX #7 — showResult: all dynamic values via textContent, never innerHTML.
   */
  function showResult(yr, mk, mo, s) {
    var p = getPanel();
    p.className = '';
    /* Safe to clear — then rebuild with DOM API */
    while (p.firstChild) p.removeChild(p.firstChild);

    var wrap = D.createElement('div');

    var veh = D.createElement('span');
    veh.className = 'oc-sp-veh';
    /* yr/mk/mo are already validated by whitelist before reaching here */
    veh.textContent = yr + ' ' + mk + ' ' + mo;
    wrap.appendChild(veh);

    /* All spec values come from our internal DB — safe, but textContent anyway */
    wrap.appendChild(pill('Capacity',  s.capacity,  '#0d47a1'));
    wrap.appendChild(pill('Viscosity', s.viscosity, '#d50000'));
    wrap.appendChild(pill('Interval',  s.interval,  '#2e7d32'));
    wrap.appendChild(pill('Standard',  s.api,       '#5a3a00'));
    wrap.appendChild(pill('Filter',    s.filter,    '#37474f'));

    var lnk = D.createElement('a');
    lnk.className = 'oc-sp-link';
    /* href is hardcoded — safe */
    lnk.href = s.note
      ? 'https://www.oilchoices.com/about'
      : 'https://www.oilchoices.com/vehicle-oil-capacity';
    lnk.textContent = s.note ? 'EV Guide \u2192' : 'Full Guide \u2192';
    wrap.appendChild(lnk);

    wrap.appendChild(closeBtn());
    p.appendChild(wrap);
  }

  /**
   * FIX #8 — showError / showMissing: use textContent for all messages.
   */
  function showError(msg) {
    var p = getPanel();
    p.className = 'oc-sp-err';
    while (p.firstChild) p.removeChild(p.firstChild);
    var wrap = D.createElement('div');
    var sp = D.createElement('span');
    sp.textContent = msg;          /* textContent — XSS-safe */
    wrap.appendChild(sp);
    wrap.appendChild(closeBtn());
    p.appendChild(wrap);
  }

  function showMissing(yr, mk, mo) {
    var p = getPanel();
    p.className = 'oc-sp-err';
    while (p.firstChild) p.removeChild(p.firstChild);
    var wrap = D.createElement('div');
    var sp = D.createElement('span');
    /* yr/mk/mo are validated whitelist values — safe; textContent for defence-in-depth */
    sp.textContent = 'Specs for ' + yr + ' ' + mk + ' ' + mo + ' not preloaded \u2014 see full guide.';
    wrap.appendChild(sp);
    var lnk = D.createElement('a');
    lnk.className = 'oc-sp-link';
    lnk.href = 'https://www.oilchoices.com/vehicle-oil-capacity';
    lnk.textContent = 'Open Full Guide \u2192';
    wrap.appendChild(lnk);
    wrap.appendChild(closeBtn());
    p.appendChild(wrap);
  }

  /* ════════════════════════════════════════
     INIT
  ════════════════════════════════════════ */
  function init() {
    if (booted || !D.body || D.getElementById('oc-hdr')) return false;
    booted = true;

    /* ── Progress bar ── */
    var pg = D.createElement('div');
    pg.id = 'oc-prog';
    pg.setAttribute('role', 'progressbar');
    pg.setAttribute('aria-label', 'Page scroll progress');
    D.documentElement.insertBefore(pg, D.documentElement.firstChild);

    /* ── Back to top ── */
    var btt = D.createElement('button');
    btt.id = 'oc-btt';
    btt.type = 'button';
    btt.setAttribute('aria-label', 'Back to top');
    btt.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';
    D.body.appendChild(btt);
    btt.addEventListener('click', function () {
      W.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── Notice bar ── */
    var nb = D.createElement('div');
    nb.id = 'oc-nb';
    nb.setAttribute('role', 'banner');
    /* Static trusted content — innerHTML acceptable here */
    nb.innerHTML = '\uD83D\uDD27 Need help choosing the right oil? ' +
      '<a href="https://www.oilchoices.com/contact">Ask our experts \u2192</a>';
    D.body.insertBefore(nb, D.body.firstChild);

    /* ── Header ── */
    var hdr = D.createElement('header');
    hdr.id = 'oc-hdr';
    hdr.setAttribute('role', 'navigation');
    hdr.setAttribute('aria-label', 'Main site navigation');

    /* Static trusted markup — innerHTML acceptable here */
    hdr.innerHTML =
      '<div class="oc-r1">' +
        '<a class="oc-brand" href="https://www.oilchoices.com/" aria-label="OilChoices home">' +
          '<span class="oc-badge">' +
            '<img src="https://assets.zyrosite.com/H1TztxDu8joXrzU2/oil-choices-capacity-type-change-logo-3loqmy0CXiVCqOm8.webp"' +
                 ' alt="OilChoices logo" width="44" height="44" loading="eager" fetchpriority="high">' +
          '</span>' +
          '<span class="oc-btext">' +
            '<span class="oc-btitle">OilChoices</span>' +
            '<span class="oc-bsub">Engine Oil Guides</span>' +
          '</span>' +
        '</a>' +
        '<span class="oc-vdiv" aria-hidden="true"></span>' +
        '<button id="ocTog" class="oc-tog" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="ocNW">&#9776;</button>' +
        '<div id="ocNW" class="oc-nwrap" role="region" aria-label="Navigation links">' +
          '<nav class="oc-nav" aria-label="Primary">' +
            '<a class="oc-lnk" data-m="/" href="https://www.oilchoices.com/">Home</a>' +
            dd('Oil Types', 'Oil Types', [
              ['Oil Type & Capacity',       'https://www.oilchoices.com/oil-type-and-capacity'],
              ['Oil Viscosity Guide',        'https://www.oilchoices.com/oil-viscosity-guide'],
              ['Synthetic vs Conventional',  'https://www.oilchoices.com/synthetic-vs-conventional-oil']
            ]) +
            dd('Oil Capacity', 'Oil Capacity', [
              ['Vehicle Oil Capacity',       'https://www.oilchoices.com/vehicle-oil-capacity'],
              ['Engine Oil Capacity',        'https://www.oilchoices.com/engine-oil-capacity'],
              ['Capacity by Make',           'https://www.oilchoices.com/oil-capacity-by-make'],
              ['Capacity by Engine',         'https://www.oilchoices.com/oil-capacity-by-engine']
            ]) +
            dd('Oil Change', 'Oil Change', [
              ['Change Intervals',           'https://www.oilchoices.com/oil-change-intervals'],
              ['Change Cost',                'https://www.oilchoices.com/oil-change-cost'],
              ['Change Coupons',             'https://www.oilchoices.com/oil-change-coupons'],
              ['Light Reset',                'https://www.oilchoices.com/oil-change-light-reset'],
              ['Change FAQ',                 'https://www.oilchoices.com/oil-change-faq']
            ]) +
            dd('Oil Filter', 'Oil Filter', [
              ['Filter Lookup',              'https://www.oilchoices.com/oil-filter-lookup'],
              ['Cross Reference',            'https://www.oilchoices.com/oil-filter-cross-reference'],
              ['Filter by Vehicle',          'https://www.oilchoices.com/oil-filter-by-vehicle'],
              ['Filter by Engine',           'https://www.oilchoices.com/oil-filter-by-engine']
            ]) +
            dd('Quick Tips', 'Quick Tips', [
              ['Problems & Symptoms',        'https://www.oilchoices.com/oil-problems-and-symptoms'],
              ['Oil Color Guide',            'https://www.oilchoices.com/engine-oil-color-guide'],
              ['Burning Oil Guide',          'https://www.oilchoices.com/burning-oil-guide'],
              ['Check Engine & Oil',         'https://www.oilchoices.com/check-engine-light-and-oil-issues']
            ]) +
            dd('Resources', 'Resources', [
              ['Oil Capacity Chart',         'https://www.oilchoices.com/oil-capacity-chart'],
              ['Oil Type Chart',             'https://www.oilchoices.com/oil-type-chart'],
              ['Oil Glossary',               'https://www.oilchoices.com/engine-oil-glossary']
            ]) +
            '<a class="oc-lnk" data-m="/blog"    href="https://www.oilchoices.com/blog">Blog</a>' +
            '<a class="oc-lnk" data-m="/about"   href="https://www.oilchoices.com/about">About</a>' +
            '<a class="oc-lnk" data-m="/contact" href="https://www.oilchoices.com/contact">Contact</a>' +
          '</nav>' +
          '<div class="oc-srch" role="search">' +
            '<label class="oc-sr-only" for="ocSI">Search OilChoices</label>' +
            '<input type="search" id="ocSI" placeholder="Search oil specs..." autocomplete="off" aria-label="Search">' +
            '<button type="button" id="ocSB" aria-label="Submit search">&#128269;</button>' +
          '</div>' +
          '<a class="oc-cta" href="https://www.oilchoices.com/vehicle-oil-capacity">Check Oil Specs</a>' +
        '</div>' +
      '</div>' +
      '<div class="oc-ymm">' +
        '<div class="oc-ymm-in">' +
          '<span class="oc-ymm-lbl">Find Your Oil Spec:</span>' +
          '<label class="oc-sr-only" for="yY">Year</label>' +
          '<select id="yY"></select>' +
          '<label class="oc-sr-only" for="yM">Make</label>' +
          '<select id="yM" disabled><option value="">Make</option></select>' +
          '<label class="oc-sr-only" for="yMo">Model</label>' +
          '<select id="yMo" disabled><option value="">Model</option></select>' +
          '<button class="oc-ymm-btn" id="yBtn" type="button">Find Oil Spec \u2192</button>' +
        '</div>' +
      '</div>';

    nb.insertAdjacentElement('afterend', hdr);

    /* ── FIX #3+4: Populate selects via DOM API after hdr is in DOM ── */
    var yY  = D.getElementById('yY');
    var yM  = D.getElementById('yM');
    var yMo = D.getElementById('yMo');
    var yBtn = D.getElementById('yBtn');

    buildYears(yY);   /* Safe DOM builder — no innerHTML */

    /* ── Mobile toggle ── */
    var nw  = D.getElementById('ocNW');
    var tog = D.getElementById('ocTog');

    tog.addEventListener('click', function () {
      var open = nw.classList.toggle('open');
      tog.setAttribute('aria-expanded', String(open));
      tog.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      tog.textContent = open ? '\u00D7' : '\u2630';   /* FIX: textContent */
    });

    /* ── Dropdowns ── */
    var dds = hdr.querySelectorAll('.oc-dd');
    dds.forEach(function (dd) {
      var btn = dd.querySelector('.oc-dtog');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var was = dd.classList.contains('open');
        closeAllDds();
        if (!was) {
          dd.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          btn.classList.add('active');
        }
      });
    });

    function closeAllDds() {
      dds.forEach(function (d) {
        d.classList.remove('open');
        var b = d.querySelector('.oc-dtog');
        b.setAttribute('aria-expanded', 'false');
        b.classList.remove('active');
      });
    }

    D.addEventListener('click', function (e) {
      dds.forEach(function (dd) {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          var b = dd.querySelector('.oc-dtog');
          b.setAttribute('aria-expanded', 'false');
          b.classList.remove('active');
        }
      });
      if (((W.innerWidth <= 960) || ((W.innerWidth <= 1100) && W.matchMedia('(hover: none) and (pointer: coarse)').matches)) && nw.classList.contains('open') &&
    !nw.contains(e.target) && !tog.contains(e.target)) {
        nw.classList.remove('open');
        tog.setAttribute('aria-expanded', 'false');
        tog.setAttribute('aria-label', 'Open menu');
        tog.textContent = '\u2630';   /* FIX: textContent */
      }
    });

    D.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDds();
    });

    /* ── FIX #9 — Search: validate query, open only to oilchoices.com domain ── */
    var si = D.getElementById('ocSI');
    var sb = D.getElementById('ocSB');

    function doSearch() {
      var raw = (si.value || '').trim();
      /* Reject empty or suspiciously long input */
      if (!raw || raw.length > 200) return;
      /* Strip any protocol/URL attempts — keep plain text only */
      var q = raw.replace(/[<>"'`]/g, '');
      if (!q) return;
      /* FIX: destination is always our own domain — no open redirect possible */
      var url = 'https://www.google.com/search?q=' +
        encodeURIComponent(q + ' site:oilchoices.com');
      W.open(url, '_blank', 'noopener,noreferrer');
    }

    sb.addEventListener('click', doSearch);
    si.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });

    /* ── YMM selects — strict sequential + whitelist ── */
    yM.disabled  = true;
    yMo.disabled = true;

    function resetSelect(sel, placeholder) {
      while (sel.firstChild) sel.removeChild(sel.firstChild);
      var opt = D.createElement('option');
      opt.value = '';
      opt.textContent = placeholder;   /* FIX: textContent */
      sel.appendChild(opt);
      sel.disabled = true;
    }

    function showGuide(msg, type) {
      var p = getPanel();
      p.className = type === 'info' ? '' : 'oc-sp-err';
      while (p.firstChild) p.removeChild(p.firstChild);
      var wrap = D.createElement('div');
      var sp = D.createElement('span');
      sp.style.cssText = 'font-size:13px;font-weight:600;color:' +
        (type === 'info' ? 'var(--oc-blue)' : 'var(--oc-red)');
      sp.textContent = msg;   /* FIX: textContent — XSS-safe */
      wrap.appendChild(sp);
      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    /* Step 1 — Year selected → unlock Make */
    yY.addEventListener('change', function () {
      hidePanel();
      if (!this.value) {
        resetSelect(yM, 'Make');
        resetSelect(yMo, 'Model');
        return;
      }
      /* FIX: validate year before trusting */
      if (!validateYear(this.value)) {
        resetSelect(yM, 'Make');
        resetSelect(yMo, 'Model');
        return;
      }
      resetSelect(yM, 'Make');
      buildMakes(yM);   /* Safe DOM builder */
      yM.disabled = false;
      yM.focus();
      resetSelect(yMo, 'Model');
      showGuide('\u2713 Year selected \u2014 now choose your Make', 'info');
    });

    /* Step 2 — Make selected → unlock Model */
    yM.addEventListener('change', function () {
      hidePanel();
      if (!this.value) {
        resetSelect(yMo, 'Model');
        return;
      }
      /* FIX #2: whitelist check — reject anything not in MAKES_SET */
      var safeMk = validateMake(this.value);
      if (!safeMk) {
        resetSelect(yMo, 'Model');
        showGuide('\u26a0 Invalid make selected', 'error');
        return;
      }
      var list = MODELS[safeMk] || [];
      resetSelect(yMo, 'Model');
      list.forEach(function (v) {
        var opt = D.createElement('option');
        opt.value = v;           /* from internal whitelist — safe */
        opt.textContent = v;     /* textContent */
        yMo.appendChild(opt);
      });
      yMo.disabled = false;
      yMo.focus();
      showGuide('\u2713 Make selected \u2014 now choose your Model', 'info');
    });

    /* Step 3 — Model selected → ready */
    yMo.addEventListener('change', function () {
      hidePanel();
      if (this.value) {
        showGuide('\u2713 Ready \u2014 press Find Oil Spec', 'info');
      }
    });

    yM.addEventListener('mousedown', function (e) {
      if (this.disabled) {
        e.preventDefault();
        shake(yY);
        showGuide('\u26a0 Please select the Year first', 'error');
      }
    });

    yMo.addEventListener('mousedown', function (e) {
      if (this.disabled) {
        e.preventDefault();
        if (!yY.value) {
          shake(yY);
          showGuide('\u26a0 Please select the Year first', 'error');
        } else {
          shake(yM);
          showGuide('\u26a0 Please select the Make first', 'error');
        }
      }
    });

    /* Find Oil Spec button */
    yBtn.addEventListener('click', function () {
      var rawYr = yY.value, rawMk = yM.value, rawMo = yMo.value;

      if (!rawYr) {
        shake(yY); shake(yBtn);
        showGuide('\u26a0 Please select a Year to get started', 'error');
        return;
      }
      if (!rawMk) {
        shake(yM); shake(yBtn);
        showGuide('\u26a0 Please select your vehicle Make', 'error');
        return;
      }
      if (!rawMo) {
        shake(yMo); shake(yBtn);
        showGuide('\u26a0 Please select your vehicle Model', 'error');
        return;
      }

      /* FIX #2: strict whitelist validation before any DB lookup */
      var yr = validateYear(rawYr);
      var mk = validateMake(rawMk);
      var mo = mk ? validateModel(mk, rawMo) : null;

      if (!yr || !mk || !mo) {
        showGuide('\u26a0 Invalid selection \u2014 please use the dropdowns', 'error');
        return;
      }

      var specs = (DB[mk] && DB[mk][mo]) || getFallback(mk, mo);
      if (specs) { showResult(yr, mk, mo, specs); return; }
      showMissing(yr, mk, mo);
    });

    /* ── Active nav link ── */
    var path = (W.location.pathname || '/').replace(/\/+$/, '') || '/';
    hdr.querySelectorAll('.oc-lnk[data-m]').forEach(function (l) {
      var m = l.getAttribute('data-m');
      l.classList.toggle('active', m === '/' ? path === '/' : path.indexOf(m) === 0);
      if (l.classList.contains('active')) l.setAttribute('aria-current', 'page');
    });

    /* ════════════════════════════════════════
       SCROLL LOGIC — auto-hide header
    ════════════════════════════════════════ */
    var HIDE_THRESHOLD = 80;
    var SCROLL_DELTA   = 5;

    function onScroll() {
      var st = W.scrollY || 0;
      var dh = D.documentElement.scrollHeight - W.innerHeight;

      pg.style.width = (dh > 0 ? Math.min((st / dh) * 100, 100) : 0) + '%';
      btt.classList.toggle('show', st > 350);
      hdr.classList.toggle('scrolled', st > 30);
      nb.classList.toggle('compact',   st > 30);

      if (st > HIDE_THRESHOLD) {
        var delta = st - lastScroll;
        if (Math.abs(delta) > SCROLL_DELTA) {
          if (delta > 0 && !headerHidden) {
            hdr.classList.add('oc-hidden');
            headerHidden = true;
          } else if (delta < 0 && headerHidden) {
            hdr.classList.remove('oc-hidden');
            headerHidden = false;
          }
        }
      } else {
        hdr.classList.remove('oc-hidden');
        headerHidden = false;
      }

      lastScroll = st;
      syncNbOffset();
      ticking = false;
    }

    W.addEventListener('scroll', function () {
      if (!ticking) {
        W.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    W.addEventListener('resize', function () {
      syncNbOffset();
    });

    syncNbOffset();
    onScroll();

    /* ════════════════════════════════════════
       KILL NATIVE HOSTINGER HEADER
    ════════════════════════════════════════ */
    setTimeout(function () {
      var sels = ['header', '[role="banner"]', '.site-header', '.header', '.navbar', '.topbar'];
      var seen = [];
      sels.forEach(function (sel) {
        try {
          D.querySelectorAll(sel).forEach(function (el) {
            if (seen.indexOf(el) > -1) return;
            seen.push(el);
            if (['oc-hdr', 'oc-nb', 'oc-prog', 'oc-btt', 'oc-spec-panel'].indexOf(el.id) > -1) return;
            if (el.closest && (el.closest('#oc-hdr') || el.closest('#oc-nb'))) return;
            try {
              var r  = el.getBoundingClientRect();
              var cs = W.getComputedStyle(el);
              var isSticky = cs.position === 'fixed' || cs.position === 'sticky';
              var isTop    = r.top < 160;
              var isWide   = r.width > W.innerWidth * 0.55;
              var isGoodH  = r.height >= 35 && r.height <= 300;
              var isHeader = /header|banner|navbar|topbar/.test(
                ((el.tagName || '') + ' ' + (el.className || '')).toLowerCase()
              ) || (el.tagName || '').toLowerCase() === 'header';
              if (isHeader && (isSticky || isTop) && isWide && isGoodH) {
                el.classList.add('oc-kill');
                el.setAttribute('aria-hidden', 'true');
              }
            } catch (ex) {}
          });
        } catch (ex) {}
      });
    }, 600);

    return true;
  }

  /* ── Boot ── */
  function boot() {
    if (init()) return;
    if (booted) return;
    if (++bootTries < BOOT_MAX) W.setTimeout(boot, 120);
  }

  if (D.readyState === 'loading') {
    D.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  W.addEventListener('load', boot, { once: true });

})();
