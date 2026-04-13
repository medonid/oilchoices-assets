/* ══════════════════════════════════════════════
   OILCHOICES.COM — Header JS v6.2 ROBUST
   Rewritten for safer boot, about link, EV fallback,
   missing-model panel, stable sticky offset
══════════════════════════════════════════════ */
(function(){
  'use strict';
  var D=document, W=window;
  var booted=false;
  var bootTries=0;
  var BOOT_MAX=80;

  var MAKES=["Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet",
    "Chrysler","Dodge","Ford","GMC","Honda","Hyundai","Infiniti","Jeep","Kia",
    "Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan",
    "Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo"];

  var MODELS={
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

  var DB={
    'Ford':{
      'F-150':         {capacity:'5.7 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'FL-820S'},
      'Mustang':       {capacity:'8.0 qt',viscosity:'5W-50', interval:'7,500 mi', api:'API SP',       filter:'FL-400S'},
      'Explorer':      {capacity:'6.0 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'FL-910S'},
      'Edge':          {capacity:'5.5 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SQ',       filter:'FL-500S'},
      'Bronco':        {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'FL-820S'},
      'Escape':        {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'FL-910S'},
      'Ranger':        {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'FL-820S'},
      'Expedition':    {capacity:'7.5 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'FL-910S'},
      'Maverick':      {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'FL-910S'},
      'Transit':       {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'FL-820S'}
    },
    'Chevrolet':{
      'Silverado 1500':{capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Equinox':       {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Malibu':        {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SQ',       filter:'PF-64'},
      'Colorado':      {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Camaro':        {capacity:'7.5 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-48'},
      'Blazer':        {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Tahoe':         {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Suburban':      {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Traverse':      {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Trax':          {capacity:'4.2 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-64'}
    },
    'Toyota':{
      'Camry':         {capacity:'4.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP/GF-6A', filter:'90915-YZZD2'},
      'Corolla':       {capacity:'4.4 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP/GF-6A', filter:'90915-YZZD4'},
      'RAV4':          {capacity:'4.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP/GF-6A', filter:'90915-YZZD2'},
      'RAV4 Hybrid':   {capacity:'4.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP/GF-6A', filter:'90915-YZZD2'},
      'Tacoma':        {capacity:'5.5 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZE2'},
      '4Runner':       {capacity:'6.2 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZE2'},
      'Highlander':    {capacity:'5.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'},
      'Tundra':        {capacity:'7.2 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZF4'},
      'Prius':         {capacity:'4.4 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP/GF-6A', filter:'90915-YZZD4'},
      'Sienna':        {capacity:'5.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'}
    },
    'Honda':{
      'Civic':         {capacity:'3.4 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SQ/GF-7A', filter:'15400-PLM-A02'},
      'Accord':        {capacity:'3.7 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SQ/GF-7A', filter:'15400-RTA-003'},
      'CR-V':          {capacity:'3.7 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-RTA-003'},
      'Pilot':         {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-RTA-003'},
      'HR-V':          {capacity:'3.4 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-PLM-A02'},
      'Odyssey':       {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-RTA-003'},
      'Ridgeline':     {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-RTA-003'},
      'Passport':      {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'15400-RTA-003'}
    },
    'BMW':{
      '3 Series':      {capacity:'5.3 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'},
      '5 Series':      {capacity:'6.9 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'},
      'X3':            {capacity:'5.3 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'},
      'X5':            {capacity:'6.9 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'},
      'M3':            {capacity:'6.9 qt',viscosity:'10W-60',interval:'7,500 mi', api:'BMW M',        filter:'11428507683'},
      'M5':            {capacity:'8.5 qt',viscosity:'10W-60',interval:'7,500 mi', api:'BMW M',        filter:'11428507683'},
      'X1':            {capacity:'5.3 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'},
      'X7':            {capacity:'6.9 qt',viscosity:'0W-30', interval:'10,000 mi',api:'BMW LL-17',    filter:'11428507683'}
    },
    'Mercedes-Benz':{
      'C-Class':       {capacity:'5.5 qt',viscosity:'0W-20', interval:'10,000 mi',api:'MB 229.71',    filter:'A6511800009'},
      'E-Class':       {capacity:'6.9 qt',viscosity:'0W-20', interval:'10,000 mi',api:'MB 229.71',    filter:'A6511800009'},
      'GLC':           {capacity:'5.5 qt',viscosity:'0W-20', interval:'10,000 mi',api:'MB 229.71',    filter:'A6511800009'},
      'GLE':           {capacity:'8.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'MB 229.51',    filter:'A6421800009'},
      'S-Class':       {capacity:'8.5 qt',viscosity:'0W-40', interval:'10,000 mi',api:'MB 229.71',    filter:'A2761800009'},
      'GLS':           {capacity:'8.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'MB 229.51',    filter:'A6421800009'},
      'Sprinter':      {capacity:'8.5 qt',viscosity:'5W-30', interval:'10,000 mi',api:'MB 229.51',    filter:'A6421800009'}
    },
    'Dodge':{
      'Challenger':    {capacity:'7.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Charger':       {capacity:'7.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Durango':       {capacity:'6.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Hornet':        {capacity:'4.5 qt',viscosity:'0W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'}
    },
    'Nissan':{
      'Altima':        {capacity:'4.3 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-9E01A'},
      'Rogue':         {capacity:'3.9 qt',viscosity:'0W-20', interval:'5,000 mi', api:'API SP',       filter:'15208-65F0A'},
      'Pathfinder':    {capacity:'5.8 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-9E01A'},
      'Frontier':      {capacity:'5.4 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-9E01A'},
      'Armada':        {capacity:'6.2 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-9E01A'},
      'Murano':        {capacity:'4.3 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-65F0A'},
      'Sentra':        {capacity:'3.9 qt',viscosity:'0W-20', interval:'5,000 mi', api:'API SP',       filter:'15208-65F0A'},
      'Titan':         {capacity:'6.5 qt',viscosity:'5W-30', interval:'5,000 mi', api:'API SP',       filter:'15208-9E01A'},
      'Versa':         {capacity:'3.5 qt',viscosity:'0W-20', interval:'5,000 mi', api:'API SP',       filter:'15208-65F0A'}
    },
    'Jeep':{
      'Wrangler':      {capacity:'5.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Grand Cherokee':{capacity:'5.9 qt',viscosity:'0W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Gladiator':     {capacity:'5.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Compass':       {capacity:'4.5 qt',viscosity:'0W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Cherokee':      {capacity:'5.5 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'Renegade':      {capacity:'4.0 qt',viscosity:'0W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'}
    },
    'Subaru':{
      'Outback':       {capacity:'5.1 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'Forester':      {capacity:'5.1 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'Crosstrek':     {capacity:'5.1 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'Ascent':        {capacity:'5.1 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'Impreza':       {capacity:'4.2 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'Legacy':        {capacity:'5.1 qt',viscosity:'0W-20', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'WRX':           {capacity:'5.1 qt',viscosity:'5W-30', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'},
      'BRZ':           {capacity:'4.2 qt',viscosity:'5W-30', interval:'6,000 mi', api:'API SP',       filter:'15208AA170'}
    },
    'Hyundai':{
      'Elantra':       {capacity:'4.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SN',       filter:'26300-35504'},
      'Sonata':        {capacity:'5.1 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Tucson':        {capacity:'4.7 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Santa Fe':      {capacity:'5.1 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Palisade':      {capacity:'6.6 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'26300-35505'},
      'Kona':          {capacity:'4.2 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'}
    },
    'Kia':{
      'Forte':         {capacity:'4.2 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SN',       filter:'26300-35504'},
      'K5':            {capacity:'5.1 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Sportage':      {capacity:'4.7 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Sorento':       {capacity:'5.1 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'},
      'Telluride':     {capacity:'6.6 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'26300-35505'},
      'Carnival':      {capacity:'6.6 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'26300-35505'},
      'Soul':          {capacity:'4.2 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'26300-35504'}
    },
    'Ram':{
      '1500':          {capacity:'8.0 qt',viscosity:'0W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      '2500':          {capacity:'8.0 qt',viscosity:'5W-40', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      '3500':          {capacity:'8.0 qt',viscosity:'5W-40', interval:'8,000 mi', api:'API SP',       filter:'MO-090'},
      'ProMaster':     {capacity:'5.0 qt',viscosity:'5W-20', interval:'8,000 mi', api:'API SP',       filter:'MO-090'}
    },
    'GMC':{
      'Sierra 1500':   {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Sierra 2500HD': {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Yukon':         {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Terrain':       {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Acadia':        {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'Canyon':        {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'}
    },
    'Audi':{
      'A3':            {capacity:'4.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'A4':            {capacity:'5.7 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'A6':            {capacity:'6.4 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06E115403P'},
      'Q5':            {capacity:'5.7 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'Q7':            {capacity:'6.4 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06E115403P'},
      'Q8':            {capacity:'6.4 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06E115403P'}
    },
    'Volkswagen':{
      'Jetta':         {capacity:'4.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'Tiguan':        {capacity:'5.7 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'Atlas':         {capacity:'6.4 qt',viscosity:'5W-30', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'Golf':          {capacity:'4.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'GTI':           {capacity:'4.5 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'},
      'Taos':          {capacity:'5.0 qt',viscosity:'5W-40', interval:'10,000 mi',api:'VW 502.00',    filter:'06J115403Q'}
    },
    'Lexus':{
      'RX':            {capacity:'5.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'},
      'NX':            {capacity:'4.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'},
      'ES':            {capacity:'4.8 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'},
      'IS':            {capacity:'5.3 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD2'},
      'GX':            {capacity:'6.2 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZE2'},
      'LX':            {capacity:'7.4 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZF4'},
      'UX':            {capacity:'4.2 qt',viscosity:'0W-20', interval:'10,000 mi',api:'API SP',       filter:'90915-YZZD4'}
    },
    'Lincoln':{
      'Navigator':     {capacity:'7.5 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'FL-910S'},
      'Aviator':       {capacity:'6.0 qt',viscosity:'5W-30', interval:'10,000 mi',api:'API SP',       filter:'FL-910S'},
      'Nautilus':      {capacity:'5.5 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'FL-500S'},
      'Corsair':       {capacity:'4.5 qt',viscosity:'5W-20', interval:'7,500 mi', api:'API SP',       filter:'FL-910S'}
    },
    'Cadillac':{
      'Escalade':      {capacity:'8.0 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'CT5':           {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'CT4':           {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'XT5':           {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'XT6':           {capacity:'6.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'},
      'XT4':           {capacity:'5.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PF-63E'}
    },
    'Mazda':{
      'Mazda3':        {capacity:'4.5 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'CX-5':          {capacity:'4.5 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'CX-50':         {capacity:'4.5 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'CX-90':         {capacity:'5.8 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'SH0114302'},
      'Mazda6':        {capacity:'4.5 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'MX-5 Miata':    {capacity:'4.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'CX-30':         {capacity:'4.5 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'}
    }
  };

  function getFallbackSpecs(make, model){
    var evMap={
      'Audi':{'e-tron':1},
      'BMW':{'iX':1},
      'Cadillac':{'Lyriq':1},
      'Hyundai':{'Ioniq 5':1,'Ioniq 6':1},
      'Kia':{'EV6':1,'EV9':1},
      'Tesla':{'Cybertruck':1,'Model 3':1,'Model S':1,'Model X':1,'Model Y':1},
      'Volkswagen':{'ID.4':1}
    };
    if(evMap[make]&&evMap[make][model]){
      return {
        capacity:'N/A',
        viscosity:'No engine oil',
        interval:'N/A',
        api:'Battery EV',
        filter:'N/A',
        note:'This battery-electric vehicle does not use conventional engine oil.'
      };
    }
    return null;
  }

  function _dd(label,title,links){
    return '<div class="oc-dd">'+
      '<button class="oc-dtog" type="button" aria-expanded="false">'+label+' &#9662;</button>'+
      '<div class="oc-ddm"><div class="oc-ddt">'+title+'</div>'+
      '<div class="oc-ddl">'+
        links.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>';}).join('')+
      '</div></div></div>';
  }

  function buildYears(){
    var o='<option value="">Year</option>';
    for(var y=2026;y>=1990;y--) o+='<option value="'+y+'">'+y+'</option>';
    return o;
  }

  function buildMakes(){
    return '<option value="">Make</option>'+
      MAKES.map(function(m){ return '<option value="'+m+'">'+m+'</option>'; }).join('');
  }

  function closeBtn(){
    var btn=D.createElement('button');
    btn.type='button';
    btn.className='oc-sp-close';
    btn.innerHTML='&#10005;';
    btn.addEventListener('click',function(){
      var p=D.getElementById('oc-spec-panel');
      if(p)p.remove();
    });
    return btn;
  }

  function hidePanel(){
    var p=D.getElementById('oc-spec-panel');
    if(p)p.remove();
  }

  function shake(el){
    var pos=[7,-7,5,-5,3,-3,0],i=0;
    var t=setInterval(function(){
      el.style.transform='translateX('+(pos[i]||0)+'px)';
      if(++i>=pos.length){clearInterval(t);el.style.transform='';}
    },55);
  }

  function init(){
    if(booted || !D.body || D.getElementById('oc-hdr')) return false;
    booted=true;

    var nb=D.createElement('div');
    nb.id='oc-nb';
    nb.innerHTML='&#128295; Need help choosing the right oil? <a href="https://www.oilchoices.com/contact">Ask our experts &#8594;</a>';
    D.body.insertBefore(nb,D.body.firstChild);

    var pg=D.createElement('div');
    pg.id='oc-prog';
    D.documentElement.appendChild(pg);

    var btt=D.createElement('button');
    btt.id='oc-btt';
    btt.type='button';
    btt.setAttribute('aria-label','Back to top');
    btt.innerHTML='<svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>';
    D.documentElement.appendChild(btt);

    var hdr=D.createElement('div');
    hdr.id='oc-hdr';
    hdr.innerHTML=
      '<div class="oc-r1" id="ocR1">'+
        '<a class="oc-brand" href="https://www.oilchoices.com/">'+
          '<span class="oc-badge">'+
            '<img src="https://assets.zyrosite.com/H1TztxDu8joXrzU2/logo_falg_us-removebg-preview2-cK8YmexhrcooOrxd.webp" alt="OilChoices" loading="eager">'+
          '</span>'+
          '<span class="oc-btext">'+
            '<span class="oc-btitle">OilChoices</span>'+
            '<span class="oc-bsub">Engine Oil Guides</span>'+
          '</span>'+
        '</a>'+
        '<button id="ocTog" class="oc-tog" type="button" aria-label="Menu" aria-expanded="false">&#9776;</button>'+
        '<div id="ocNW" class="oc-nwrap">'+
          '<nav class="oc-nav" aria-label="Main navigation">'+
            '<a class="oc-lnk" data-m="/" href="https://www.oilchoices.com/">HOME</a>'+
            _dd('OIL TYPES','&#128738;&#65039; Oil Types',[
              ['Oil Type and Capacity','https://www.oilchoices.com/oil-type-and-capacity'],
              ['Oil Viscosity Guide','https://www.oilchoices.com/oil-viscosity-guide'],
              ['Synthetic vs Conventional','https://www.oilchoices.com/synthetic-vs-conventional-oil']
            ])+
            _dd('OIL CAPACITY','&#128202; Oil Capacity',[
              ['Vehicle Oil Capacity','https://www.oilchoices.com/vehicle-oil-capacity'],
              ['Engine Oil Capacity','https://www.oilchoices.com/engine-oil-capacity'],
              ['Oil Capacity by Make','https://www.oilchoices.com/oil-capacity-by-make'],
              ['Oil Capacity by Engine','https://www.oilchoices.com/oil-capacity-by-engine']
            ])+
            _dd('OIL CHANGE','&#128260; Oil Change',[
              ['Oil Change Intervals','https://www.oilchoices.com/oil-change-intervals'],
              ['Oil Change Cost','https://www.oilchoices.com/oil-change-cost'],
              ['Oil Change Coupons','https://www.oilchoices.com/oil-change-coupons'],
              ['Oil Change Light Reset','https://www.oilchoices.com/oil-change-light-reset'],
              ['Oil Change FAQ','https://www.oilchoices.com/oil-change-faq']
            ])+
            _dd('OIL FILTER','&#128295; Oil Filter',[
              ['Oil Filter Lookup','https://www.oilchoices.com/oil-filter-lookup'],
              ['Oil Filter Cross Reference','https://www.oilchoices.com/oil-filter-cross-reference'],
              ['Oil Filter by Vehicle','https://www.oilchoices.com/oil-filter-by-vehicle'],
              ['Oil Filter by Engine','https://www.oilchoices.com/oil-filter-by-engine']
            ])+
            _dd('QUICK TIPS','&#128161; Quick Tips',[
              ['Oil Problems & Symptoms','https://www.oilchoices.com/oil-problems-and-symptoms'],
              ['Engine Oil Color Guide','https://www.oilchoices.com/engine-oil-color-guide'],
              ['Burning Oil Guide','https://www.oilchoices.com/burning-oil-guide'],
              ['Check Engine Light & Oil','https://www.oilchoices.com/check-engine-light-and-oil-issues']
            ])+
            _dd('RESOURCES','&#128218; Resources',[
              ['Oil Capacity Chart','https://www.oilchoices.com/oil-capacity-chart'],
              ['Oil Type Chart','https://www.oilchoices.com/oil-type-chart'],
              ['Engine Oil Glossary','https://www.oilchoices.com/engine-oil-glossary']
            ])+
            '<a class="oc-lnk" data-m="/blog" href="https://www.oilchoices.com/blog">BLOG</a>'+
            '<a class="oc-lnk" data-m="/about" href="https://www.oilchoices.com/about">ABOUT</a>'+
            '<a class="oc-lnk" data-m="/contact" href="https://www.oilchoices.com/contact">CONTACT</a>'+
          '</nav>'+
          '<div class="oc-srch">'+
            '<input type="text" id="ocSI" placeholder="Search oil specs..." autocomplete="off" aria-label="Search">'+
            '<button type="button" id="ocSB" aria-label="Search">&#128270;</button>'+
          '</div>'+
          '<a class="oc-cta" href="https://www.oilchoices.com/vehicle-oil-capacity">CHECK OIL SPECS</a>'+
        '</div>'+
      '</div>'+
      '<div class="oc-ymm">'+
        '<div class="oc-ymm-in">'+
          '<span class="oc-ymm-lbl">&#128663; Find Your Oil Spec:</span>'+
          '<select id="yY">'+buildYears()+'</select>'+
          '<select id="yM">'+buildMakes()+'</select>'+
          '<select id="yMo" disabled><option value="">Model</option></select>'+
          '<button class="oc-ymm-btn" id="yBtn" type="button">Find Oil Spec &#8594;</button>'+
        '</div>'+
      '</div>';

    nb.insertAdjacentElement('afterend',hdr);

    var nw=D.getElementById('ocNW');
    var r1=D.getElementById('ocR1');
    var tog=D.getElementById('ocTog');

    tog.addEventListener('click',function(){
      var open=nw.classList.toggle('open');
      r1.classList.toggle('mopen',open);
      this.setAttribute('aria-expanded',String(open));
      this.innerHTML=open?'&#10005;':'&#9776;';
    });

    var dds=hdr.querySelectorAll('.oc-dd');
    dds.forEach(function(dd){
      var btn=dd.querySelector('.oc-dtog');
      btn.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var was=dd.classList.contains('open');
        dds.forEach(function(d){
          d.classList.remove('open');
          var b=d.querySelector('.oc-dtog');
          b.setAttribute('aria-expanded','false');
          b.classList.remove('active');
        });
        if(!was){
          dd.classList.add('open');
          btn.setAttribute('aria-expanded','true');
          btn.classList.add('active');
        }
      });
    });

    D.addEventListener('click',function(e){
      dds.forEach(function(dd){
        if(!dd.contains(e.target)){
          dd.classList.remove('open');
          var b=dd.querySelector('.oc-dtog');
          b.setAttribute('aria-expanded','false');
          b.classList.remove('active');
        }
      });
      if(W.innerWidth<=960 && nw.classList.contains('open') && !nw.contains(e.target) && !tog.contains(e.target)){
        nw.classList.remove('open');
        r1.classList.remove('mopen');
        tog.setAttribute('aria-expanded','false');
        tog.innerHTML='&#9776;';
      }
    });

    var si=D.getElementById('ocSI');
    var sb=D.getElementById('ocSB');
    function doSearch(){
      var q=(si.value||'').trim();
      if(!q) return;
      W.location.href='https://www.google.com/search?q='+encodeURIComponent(q+' site:oilchoices.com');
    }
    sb.addEventListener('click',doSearch);
    si.addEventListener('keydown',function(e){
      if(e.key==='Enter') doSearch();
    });

    var yY=D.getElementById('yY');
    var yM=D.getElementById('yM');
    var yMo=D.getElementById('yMo');
    var yBtn=D.getElementById('yBtn');

    yM.addEventListener('change',function(){
      var list=MODELS[this.value]||[];
      yMo.innerHTML='<option value="">Model</option>'+
        list.map(function(v){ return '<option value="'+v+'">'+v+'</option>'; }).join('');
      yMo.disabled=list.length===0;
      hidePanel();
    });
    yY.addEventListener('change',hidePanel);
    yMo.addEventListener('change',hidePanel);

    function getPanel(){
      var p=D.getElementById('oc-spec-panel');
      if(!p){
        p=D.createElement('div');
        p.id='oc-spec-panel';
        var ymm=D.querySelector('.oc-ymm');
        if(ymm) ymm.insertAdjacentElement('afterend',p);
        else hdr.appendChild(p);
      }
      return p;
    }

    function pill(label,val,col){
      var sp=D.createElement('span');
      sp.className='oc-sp-pill';
      sp.style.borderLeft='3px solid '+col;
      sp.innerHTML=
        '<span class="oc-sp-pill-lbl" style="color:'+col+'">'+label+'</span>'+
        '<span class="oc-sp-pill-val">'+val+'</span>';
      return sp;
    }

    function showResult(yr,mk,mo,s){
      var p=getPanel();
      p.className='';
      p.innerHTML='';
      var wrap=D.createElement('div');

      var veh=D.createElement('span');
      veh.className='oc-sp-veh';
      veh.innerHTML='&#128269; '+yr+' '+mk+' '+mo;
      wrap.appendChild(veh);

      wrap.appendChild(pill('Capacity',   s.capacity,  '#002868'));
      wrap.appendChild(pill('Viscosity',  s.viscosity, '#BF0A30'));
      wrap.appendChild(pill('Interval',   s.interval,  '#1a5c1a'));
      wrap.appendChild(pill('Standard',   s.api,       '#5a3a00'));
      wrap.appendChild(pill('Filter',     s.filter,    '#2a2a6e'));

      var lnk=D.createElement('a');
      lnk.className='oc-sp-link';
      lnk.href=s.note ? 'https://www.oilchoices.com/about' : 'https://www.oilchoices.com/car-oil-capacity';
      lnk.innerHTML=s.note ? 'EV Care Guide &#8599;' : 'Full Guide &#8599;';
      wrap.appendChild(lnk);

      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    function showError(msg){
      var p=getPanel();
      p.className='oc-sp-err';
      p.innerHTML='';
      var wrap=D.createElement('div');
      var sp=D.createElement('span');
      sp.innerHTML='&#9888;&#65039; '+msg;
      wrap.appendChild(sp);
      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    function showMissing(yr,mk,mo){
      var p=getPanel();
      p.className='oc-sp-err';
      p.innerHTML='';
      var wrap=D.createElement('div');
      var sp=D.createElement('span');
      var slug=[yr,mk,mo].filter(Boolean).join('-')
        .toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
      sp.innerHTML='&#8505;&#65039; Quick header specs are not preloaded yet for '+yr+' '+mk+' '+mo+'. Open the full guide for the latest fitment.';
      wrap.appendChild(sp);

      var lnk=D.createElement('a');
      lnk.className='oc-sp-link';
      lnk.href='https://www.oilchoices.com/vehicle-oil-capacity'+(slug?'/'+slug:'');
      lnk.innerHTML='Open Full Guide &#8599;';
      wrap.appendChild(lnk);

      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    yBtn.addEventListener('click',function(){
      var yr=yY.value, mk=yM.value, mo=yMo.value;
      if(!yr || !mk){
        shake(yBtn);
        showError('Please select at least Year and Make.');
        return;
      }
      var specs=(DB[mk]&&DB[mk][mo]) || getFallbackSpecs(mk,mo);
      if(mo && specs){ showResult(yr,mk,mo,specs); return; }
      if(mo){ showMissing(yr,mk,mo); return; }
      var slug=[yr,mk,mo].filter(Boolean).join('-')
        .toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
      W.location.href='https://www.oilchoices.com/vehicle-oil-capacity'+(slug?'/'+slug:'');
    });

    var path=(W.location.pathname||'/').replace(/\/+$/,'')||'/';
    hdr.querySelectorAll('.oc-lnk[data-m]').forEach(function(l){
      var m=l.getAttribute('data-m');
      l.classList.toggle('active', m==='/' ? path==='/' : path.indexOf(m)===0);
    });

    btt.addEventListener('click',function(){
      W.scrollTo({top:0,behavior:'smooth'});
    });

    var ticking=false;

    function syncNoticeOffset(){
      if(!nb || !D.documentElement) return;
      var wasCompact=nb.classList.contains('compact');
      nb.classList.remove('compact');
      nb.style.minHeight='';
      var stable=Math.max(40, Math.round(nb.getBoundingClientRect().height||0));
      nb.style.minHeight=stable+'px';
      if(wasCompact) nb.classList.add('compact');
      D.documentElement.style.setProperty('--oc-nb-h', stable+'px');
    }

    function onScroll(){
      var st=W.scrollY||0;
      var dh=D.documentElement.scrollHeight-W.innerHeight;
      pg.style.width=(dh>0 ? Math.min((st/dh)*100,100) : 0)+'%';
      btt.classList.toggle('show', st>350);
      hdr.classList.toggle('scrolled', st>30);
      nb.classList.toggle('compact', st>30);
      ticking=false;
    }

    W.addEventListener('scroll',function(){
      if(!ticking){
        W.requestAnimationFrame(onScroll);
        ticking=true;
      }
    },{passive:true});

    W.addEventListener('resize',function(){
      syncNoticeOffset();
      if(!ticking){
        W.requestAnimationFrame(onScroll);
        ticking=true;
      }
    });

    syncNoticeOffset();
    onScroll();

    setTimeout(function(){
      var sels=['header','[role="banner"]','.site-header','.header','.navbar','.topbar'];
      var seen=[];
      sels.forEach(function(sel){
        try{
          D.querySelectorAll(sel).forEach(function(el){
            if(seen.indexOf(el)>-1) return;
            seen.push(el);
            if(el.id==='oc-hdr' || el.id==='oc-nb' || el.id==='oc-prog' || el.id==='oc-btt' || el.id==='oc-spec-panel') return;
            if(el.closest && (el.closest('#oc-hdr') || el.closest('#oc-nb'))) return;

            try{
              var r=el.getBoundingClientRect();
              var cs=W.getComputedStyle(el);
              var near=r.top<160 || cs.position==='fixed' || cs.position==='sticky';
              var wide=r.width>W.innerWidth*0.55;
              var goodH=r.height>=35 && r.height<=290;
              var isH=/header|banner|navbar|topbar/.test(((el.tagName||'')+' '+(el.className||'')).toLowerCase()) || (el.tagName||'').toLowerCase()==='header';
              if(isH && near && wide && goodH){
                el.classList.add('oc-kill');
                el.setAttribute('aria-hidden','true');
              }
            }catch(ex){}
          });
        }catch(ex){}
      });
    },600);

    return true;
  }

  function boot(){
    if(init()) return;
    if(booted) return;
    bootTries++;
    if(bootTries<BOOT_MAX){
      W.setTimeout(boot,120);
    }
  }

  if(D.readyState==='loading'){
    D.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }
  W.addEventListener('load', boot, {once:true});
})();
