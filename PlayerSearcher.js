document.getElementById('Input').onkeydown = function(e) {
    if(e.keyCode == 13){
      const Input = document.getElementById('Input').value;
      sessionStorage.setItem('INPUT', Input);
      window.location.href = "./PlayerSearcher.html";
      return;
    }
};

/* MAIN */

const Input = sessionStorage.getItem(`INPUT`);
const KEY = 'b3909a29-acb5-4910-a753-f3b18ad7bb41'

async function getData() {
  const playerdbUrl = `https://playerdb.co/api/player/minecraft/${Input}`;
  const hypixelUrl = `https://api.hypixel.net/player?key=${KEY}&uuid=`;

/* PLAYERDB */

  try {
        
    const response = await fetch(playerdbUrl);
    const playerdbData = await response.json();

    var DBUUID = playerdbData.data.player.raw_id;

  } catch (error) {
    console.log(error);
  } 

/* HYPIXEL */

  try {
        
    const response = await fetch(hypixelUrl + DBUUID);
    const hypixelData = await response.json();
    const IGN = hypixelData.player.displayname;
    const UUID = hypixelData.player.uuid;

  /* RANK */

    var DisplayName;
    var ACTIVERANK;
    var PLUSCOLOR = hypixelData.player.rankPlusColor;
    var RANK = hypixelData.player.prefix;
    var STAFF = hypixelData.player.rank;
    var PLUSPLUS = hypixelData.player.monthlyPackageRank;
    var NEW = hypixelData.player.newPackageRank;
    var PACKAGE = hypixelData.player.packageRank;
    var RANKCOLOR = hypixelData.player.monthlyRankColor;

    switch (PLUSCOLOR) {
      case undefined:
        PLUSCOLOR = '<span style="color:#FF5555">';
        break;
      case 'RED':
        PLUSCOLOR = '<span style="color:#FF5555">';
        break;
      case 'GOLD':
        PLUSCOLOR = '<span style="color:#FFAA00">';
        break;
      case 'GREEN':
        PLUSCOLOR = '<span style="color:#55FF55">';
        break;
      case 'YELLOW':
        PLUSCOLOR = '<span style="color:#FFFF55">';
        break;
      case 'LIGHT_PURPLE':
        PLUSCOLOR = '<span style="color:#FF55FF">';
        break;
      case 'WHITE':
        PLUSCOLOR = '<span style="color:#FFFFFF">';
        break;
      case 'BLUE':
        PLUSCOLOR = '<span style="color:#5555FF">';
        break;
      case 'DARK_GREEN':
        PLUSCOLOR = '<span style="color:#00AA00">';
        break;
      case 'DARK_RED':
        PLUSCOLOR = '<span style="color:#AA0000">';
        break;
      case 'DARK_AQUA':
        PLUSCOLOR = '<span style="color:#00AAAA">';
        break;
      case 'DARK_PURPLE':
        PLUSCOLOR = '<span style="color:#AA00AA">';
        break;
      case 'DARK_GRAY':
        PLUSCOLOR = '<span style="color:#555555">';
        break;
      case 'BLACK':
        PLUSCOLOR = '<span style="color:#000000">';
        break;
      case 'DARK_BLUE':
        PLUSCOLOR = '<span style="color:#0000AA">';
        break;
      default:
        PLUSCOLOR = '<span style="color:#FF5555">';
        break;
    };

    switch (RANKCOLOR) {
        case 'GOLD':
          RANKCOLOR = '#FFAA00';
          break;
        case 'AQUA':
          RANKCOLOR = '#55FFFF'
          break;
        case undefined:
          RANKCOLOR = '#FFAA00';
          break;
    };

    if (RANK !== undefined) {
      ACTIVERANK = RANK;
    } else if (STAFF == 'YOUTUBER' || STAFF == 'MODERATOR' || STAFF == 'ADMIN' || STAFF == 'GAME_MASTER') {
      ACTIVERANK = STAFF;
    } else if (PLUSPLUS == `SUPERSTAR`) {
      ACTIVERANK = PLUSPLUS;
    } else if (NEW == 'MVP_PLUS' || NEW == 'MVP' || NEW == 'VIP_PLUS' || NEW == 'VIP' || NEW == 'NONE') {
      ACTIVERANK = NEW;
      } else {
        ACTIVERANK = PACKAGE;
    }

    //CUSTOM NAMES

    if (UUID == "0978807a590f410ebfacee87e7972f17") {
        DisplayName = "Jackson";
    } else if (UUID == "587e3f9a2ddd427f82fdb7c275acdf84") {
        DisplayName = "Shaidyn";
        ACTIVERANK = 'YOUTUBER';
    } else {
        DisplayName = IGN;
    }

    switch (ACTIVERANK) {
      case '§c[OWNER]':
        document.getElementById("rank").innerHTML = `<span style="color:#FF5555">[OWNER] ${DisplayName}</span>`;
        break;
      case '§d[PIG§b+++§d]':
        document.getElementById("rank").innerHTML = `<span style="color:#FF55FF">[PIG</span><span style="color:#55FFFF">+++</span><span style="color:#FF55FF">] ${DisplayName}</span>`;
        break;
      case '§6[MOJANG]':
        document.getElementById("rank").innerHTML = `<span style="color:#FFAA00">[MOJANG] ${DisplayName}</span>`;
        break;
      case '§6[EVENTS]':
        document.getElementById("rank").innerHTML = `<span style color:#FFAA00>[EVENTS] ${DisplayName}</span>`;
        break;
      case 'YOUTUBER':
        document.getElementById("rank").innerHTML = `<span style="color:#FF5555">[</span><span style="color:#FFFFFF">YOUTUBE</span><span style="color:#FF5555">] ${DisplayName}</span>`;
        break;
      case 'MODERATOR':
        document.getElementById("rank").innerHTML = `<span style="color:#00AA00">[MOD] ${DisplayName}</span>`;
        break;
      case 'ADMIN':
        document.getElementById("rank").innerHTML = `<span style="color:#FF5555">[ADMIN] ${DisplayName}</span>`;
        break;
      case 'GAME_MASTER':
        document.getElementById("rank").innerHTML = `<span style="color:#00AA00">[GM] ${DisplayName}</span>`;
        break;
      case 'SUPERSTAR':
        document.getElementById("rank").innerHTML = `<span style="color:${RANKCOLOR}">[MVP</span>${PLUSCOLOR}++</span><span style="color:${RANKCOLOR}">] ${DisplayName}</span>`;
        break;
      case 'MVP_PLUS':
        document.getElementById("rank").innerHTML = `<span style="color:#55FFFF">[MVP</span>${PLUSCOLOR}+</span><span style="color:#55FFFF">] ${DisplayName}</span>`;
        break;
      case 'MVP':
        document.getElementById("rank").innerHTML = `<span style="color:#55FFFF">[MVP] ${DisplayName}</span>`;
        break;
      case 'VIP_PLUS':
        document.getElementById("rank").innerHTML = `<span style="color:#55FF55">[VIP</span><span style="color:#FFAA00">+</span><span style="color:#55FF55">] ${DisplayName}</span>`;
        break;
      case 'VIP':
        document.getElementById("rank").innerHTML = `<span style="color:#55FF55">[VIP] ${DisplayName}</span>`; 
        break;
      case 'NONE':
        document.getElementById("rank").innerHTML = `<span style="color:#AAAAAA">${DisplayName}</span>`;
        break;
      default:
        document.getElementById("rank").innerHTML = `<span style="color:#AAAAAA">${DisplayName}</span>`;
        break;
    };

  /* SKIN */

  const SKINURL = `https://minotar.net/armor/body/${UUID}`;
  const skinresponse = await fetch(SKINURL);
  const skinblob = await skinresponse.blob();
  document.getElementById('skin').src = URL.createObjectURL(skinblob);
  document.getElementById('skinLink').href = `https://www.namemc.com/${Input}`;

  /* SPECIAL TITLES */

    var titlesArray1 = hypixelData.player.stats.Duels.custom_titles;
    var titlesArray2 = [];

    if (titlesArray1 == undefined) {
      document.getElementById("specialTitles").innerHTML = '<span>This player does not <br>have any legacy titles to display.</span>';
    
    } else {

      for (let i in titlesArray1) {
        switch (titlesArray1[i]) {
          case '%%gold%%✫ %%light_purple%%Challenger':
            titlesArray2.push('<span style="color:#FFAA00">✫ </span><span style="color:#FF55FF">Challenger</span>');
            break;
          case '%%gold%%✫ %%red%%%%bold%%Champion':
            titlesArray2.unshift('<span style="color:#FFAA00">✫ </span><span style="color:#FF5555; font-weight: bold">Champion</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lUHC #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lUHC #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lUHC #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #3</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lUHC #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #5</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lUHC §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lUHC §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lUHC §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§8(§a§lS1§8) §6§lUHC §2Division 4':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#00AA00">Division 4</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lSKYWARS #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SKYWARS #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lSKYWARS #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SKYWARS #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lSKYWARS #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SKYWARS #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lSkyWars §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lSkyWars §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lSkyWars §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lSkyWars §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lSkyWars §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lSkyWars §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SkyWars </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lMEGA WALLS #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">MEGA WALLS #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lMEGA WALLS #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">MEGA WALLS #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lMEGA WALLS #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">MEGA WALLS #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lMega Walls §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lMega Walls §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lMega Walls §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lMega Walls §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lMega Walls §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lMega Walls §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Mega Walls </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lBLITZ #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lBLITZ #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lBLITZ #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lBlitz §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lBlitz §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lBlitz §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lBlitz §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lBlitz §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lBlitz §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lOP #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lOP #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lOP #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lOP §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lOP §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lOP §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lOP §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lOP §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lOP §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lCLASSIC #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lCLASSIC #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lCLASSIC #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lClassic §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lClassic §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lClassic §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lClassic §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lClassic §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lClassic §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lBOW #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lBOW #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lBOW #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lBow §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lBow §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lBow §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lBow §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lBow §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lBow §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lNODEBUFF #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lNODEBUFF #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lNODEBUFF #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lNodebuff §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lNodebuff §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lNodebuff §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lNodebuff §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lNodebuff §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lNodebuff §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lCOMBO #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">COMBO #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lCOMBO #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">COMBO #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lCOMBO #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">COMBO #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lCombo §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lCombo §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lCombo §bTop 100':
            titlesArray2.push('<span styombole="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lCombo §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lCombo §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lCombo §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Combo </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lTNT #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lTNT #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lTNT #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lTNT §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lTNT §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lTNT §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lTNT §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lTNT §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lTNT §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">TNT </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lSUMO #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lSUMO #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lOP #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lSumo §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lSumo §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lSumo §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lSumo §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lSumo §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lSumo §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lTHE BRIDGE #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #1</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lTHE BRIDGE #2':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #2</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lTHE BRIDGE #3':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #3</span>');
            break;
          case '§c§l✫ §8(§a§lS1§8) §6§lThe Bridge §cTop 10':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§d§l✫ §8(§a§lS1§8) §6§lThe Bridge §dTop 50':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF55FF">Top 50</span>');
            break;
          case '§b§l✫ §8(§a§lS1§8) §6§lThe Bridge §bTop 100':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#55FFFF">Top 100</span>');
            break;
          case '§8(§a§lS1§8) §6§lThe Bridge §eTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FFFF55">Top 500</span>');
            break;
          case '§8(§a§lS1§8) §6§lThe Bridge §eTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FFFF55">Top 1000</span>');
            break;
          case '§8(§a§lS1§8) §6§lThe Bridge §eTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S1</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FFFF55">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS2§8) §6§lOP #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #1</span>');
            break;
          case '§c§l✫ §8(§a§lS2§8) §6§lOP #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #2</span>');
            break;
          case '§c§l✫ §8(§a§lS2§8) §6§lOP #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #3</span>');
            break;
          case '§d§l✫ §8(§a§lS2§8) §6§lOP #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #4</span>');
            break;
          case '§d§l✫ §8(§a§lS2§8) §6§lOP #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #5</span>');
            break;
          case '§d§l✫ §8(§a§lS2§8) §6§lOP #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #6</span>');
            break;
          case '§b§l✫ §8(§a§lS2§8) §6§lOP #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #7</span>');
            break;
          case '§b§l✫ §8(§a§lS2§8) §6§lOP #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #8</span>');
            break;
          case '§b§l✫ §8(§a§lS2§8) §6§lOP #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #9</span>');
            break;
          case '§b§l✫ §8(§a§lS2§8) §6§lOP #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #10</span>');
            break;
          case '§8(§a§lS2§8) §6§lOP §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS2§8) §6§lOP §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS2§8) §6§lOP §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS2§8) §6§lOP §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS2§8) §6§lOP §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS2§8) §6§lOP §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S2</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§c§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #1</span>');
            break;
          case '§c§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #2</span>');
            break;
          case '§c§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #3</span>');
            break;
          case '§d§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #4</span>');
            break;
          case '§d§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #5</span>');
            break;
          case '§d§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #6</span>');
            break;
          case '§b§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #7</span>');
            break;
          case '§b§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #8</span>');
            break;
          case '§b§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #9</span>');
            break;
          case '§b§l✫ §8(§a§lS3§8) §6§lTHE BRIDGE #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">THE BRIDGE #10</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS3§8) §6§lThe Bridge §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS3§8) §6§lThe Bridge §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS3§8) §6§lThe Bridge §2Division 4':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S3</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">The Bridge </span><span style="color:#00AA00">Division 4</span>');
            break;
          case '§c§l✫ §8(§a§lS4§8) §6§lCLASSIC #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #1</span>');
            break;
          case '§c§l✫ §8(§a§lS4§8) §6§lCLASSIC #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #2</span>');
            break;
          case '§c§l✫ §8(§a§lS4§8) §6§lCLASSIC #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">OP #3</span>');
            break;
          case '§d§l✫ §8(§a§lS4§8) §6§lCLASSIC #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #4</span>');
            break;
          case '§d§l✫ §8(§a§lS4§8) §6§lCLASSIC #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #5</span>');
            break;
          case '§d§l✫ §8(§a§lS4§8) §6§lCLASSIC #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #6</span>');
            break;
          case '§b§l✫ §8(§a§lS4§8) §6§lCLASSIC #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #7</span>');
            break;
          case '§b§l✫ §8(§a§lS4§8) §6§lCLASSIC #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #8</span>');
            break;
          case '§b§l✫ §8(§a§lS4§8) §6§lCLASSIC #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #9</span>');
            break;
          case '§b§l✫ §8(§a§lS4§8) §6§lCLASSIC #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">CLASSIC #10</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS4§8) §6§lClassic §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS4§8) §6§lClassic §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS4§8) §6§lClassic §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Classic </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§c§l✫ §8(§a§lS5§8) §6§lUHC #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #1</span>');
            break;
          case '§c§l✫ §8(§a§lS5§8) §6§lUHC #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #2</span>');
            break;
          case '§c§l✫ §8(§a§lS5§8) §6§lUHC #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #3</span>');
            break;
          case '§d§l✫ §8(§a§lS5§8) §6§lUHC #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #4</span>');
            break;
          case '§d§l✫ §8(§a§lS5§8) §6§lUHC #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #5</span>');
            break;
          case '§d§l✫ §8(§a§lS5§8) §6§lUHC #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #6</span>');
            break;
          case '§b§l✫ §8(§a§lS5§8) §6§lUHC #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #7</span>');
            break;
          case '§b§l✫ §8(§a§lS5§8) §6§lUHC #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #8</span>');
            break;
          case '§b§l✫ §8(§a§lS5§8) §6§lUHC #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #9</span>');
            break;
          case '§b§l✫ §8(§a§lS5§8) §6§lUHC #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #10</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS5§8) §6§lUHC §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS5§8) §6§lUHC §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S5</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS5§8) §6§lUHC §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S4</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§c§l✫ §8(§a§lS6§8) §6§lBLITZ #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #1</span>');
            break;
          case '§c§l✫ §8(§a§lS6§8) §6§lBLITZ #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #2</span>');
            break;
          case '§c§l✫ §8(§a§lS6§8) §6§lBLITZ #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #3</span>');
            break;
          case '§d§l✫ §8(§a§lS6§8) §6§lBLITZ #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #4</span>');
            break;
          case '§d§l✫ §8(§a§lS6§8) §6§lBLITZ #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #5</span>');
            break;
          case '§d§l✫ §8(§a§lS6§8) §6§lBLITZ #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #6</span>');
            break;
          case '§b§l✫ §8(§a§lS6§8) §6§lBLITZ #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #7</span>');
            break;
          case '§b§l✫ §8(§a§lS6§8) §6§lBLITZ #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #8</span>');
            break;
          case '§b§l✫ §8(§a§lS6§8) §6§lBLITZ #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #9</span>');
            break;
          case '§b§l✫ §8(§a§lS6§8) §6§lBLITZ #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BLITZ #10</span>');
            break;
          case '§8(§a§lS6§8) §6§lBlitz §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS6§8) §6§lBlitz §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS6§8) §6§lBlitz §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS6§8) §6§lBlitz §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS6§8) §6§lBlitz §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS6§8) §6§lBlitz §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS7§8) §6§lBlitz §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#55FFFF">Top 2500</span>');
          case '§8(§a§lS6§8) §6§lBlitz §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S6</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Blitz </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§c§l✫ §8(§a§lS7§8) §6§lNODEBUFF #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #1</span>');
            break;
          case '§c§l✫ §8(§a§lS7§8) §6§lNODEBUFF #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #2</span>');
            break;
          case '§c§l✫ §8(§a§lS7§8) §6§lNODEBUFF #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #3</span>');
            break;
          case '§d§l✫ §8(§a§lS7§8) §6§lNODEBUFF #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #4</span>');
            break;
          case '§d§l✫ §8(§a§lS7§8) §6§lNODEBUFF #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #5</span>');
            break;
          case '§d§l✫ §8(§a§lS7§8) §6§lNODEBUFF #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #6</span>');
            break;
          case '§b§l✫ §8(§a§lS7§8) §6§lNODEBUFF #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #7</span>');
            break;
          case '§b§l✫ §8(§a§lS7§8) §6§lNODEBUFF #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #8</span>');
            break;
          case '§b§l✫ §8(§a§lS7§8) §6§lNODEBUFF #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #9</span>');
            break;
          case '§b§l✫ §8(§a§lS7§8) §6§lNODEBUFF #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">NODEBUFF #10</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS7§8) §6§lNodebuff §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#55FFFF">Top 500</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS7§8) §6§lNodebuff §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S7</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Nodebuff </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§c§l✫ §8(§a§lS8§8) §6§lBOW #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #1</span>');
            break;
          case '§c§l✫ §8(§a§lS8§8) §6§lBOW #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #2</span>');
            break;
          case '§c§l✫ §8(§a§lS8§8) §6§lBOW #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #3</span>');
            break;
          case '§d§l✫ §8(§a§lS8§8) §6§lBOW #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #4</span>');
            break;
          case '§d§l✫ §8(§a§lS8§8) §6§lBOW #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #5</span>');
            break;
          case '§d§l✫ §8(§a§lS8§8) §6§lBOW #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #6</span>');
            break;
          case '§b§l✫ §8(§a§lS8§8) §6§lBOW #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #7</span>');
            break;
          case '§b§l✫ §8(§a§lS8§8) §6§lBOW #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #8</span>');
            break;
          case '§b§l✫ §8(§a§lS8§8) §6§lBOW #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #9</span>');
            break;
          case '§b§l✫ §8(§a§lS8§8) §6§lBOW #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">BOW #10</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS8§8) §6§lBow §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS8§8) §6§lBow §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§8(§a§lS8§8) §6§lBow §e§lDivision 2':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S8</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Bow </span><span style="color:#FFFF55">Division 2</span>');
            break;
          case '§c§l✫ §8(§a§lS9§8) §6§lUHC #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #1</span>');
            break;
          case '§c§l✫ §8(§a§lS9§8) §6§lUHC #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #2</span>');
            break;
          case '§c§l✫ §8(§a§lS9§8) §6§lUHC #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #3</span>');
            break;
          case '§d§l✫ §8(§a§lS9§8) §6§lUHC #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #4</span>');
            break;
          case '§d§l✫ §8(§a§lS9§8) §6§lUHC #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #5</span>');
            break;
          case '§d§l✫ §8(§a§lS9§8) §6§lUHC #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #6</span>');
            break;
          case '§b§l✫ §8(§a§lS9§8) §6§lUHC #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #7</span>');
            break;
          case '§b§l✫ §8(§a§lS9§8) §6§lUHC #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #8</span>');
            break;
          case '§b§l✫ §8(§a§lS9§8) §6§lUHC #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #9</span>');
            break;
          case '§b§l✫ §8(§a§lS9§8) §6§lUHC #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC #10</span>');
            break;
          case '§8(§a§lS9§8) §6§lUHC §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS9§8) §6§lUHC §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS9§8) §6§lUHC §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS9§8) §6§lUHC §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS9§8) §6§lUHC §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS9§8) §6§lUHC §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS9§8) §6§lUHC §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#55FFFF">Top 2500</span>');
          case '§8(§a§lS9§8) §6§lUHC §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S9</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">UHC </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§c§l✫ §8(§a§lS10§8) §6§lSUMO #1':
            titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #1</span>');
            break;
          case '§c§l✫ §8(§a§lS10§8) §6§lSUMO #2':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #2</span>');
            break;
          case '§c§l✫ §8(§a§lS10§8) §6§lSUMO #3':
              titlesArray2.push('<span style="color:#FF5555; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #3</span>');
            break;
          case '§d§l✫ §8(§a§lS10§8) §6§lSUMO #4':
              titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #4</span>');
            break;
          case '§d§l✫ §8(§a§lS10§8) §6§lSUMO #5':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #5</span>');
            break;
          case '§d§l✫ §8(§a§lS10§8) §6§lSUMO #6':
            titlesArray2.push('<span style="color:#FF55FF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #6</span>');
            break;
          case '§b§l✫ §8(§a§lS10§8) §6§lSUMO #7':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #7</span>');
            break;
          case '§b§l✫ §8(§a§lS10§8) §6§lSUMO #8':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #8</span>');
            break;
          case '§b§l✫ §8(§a§lS10§8) §6§lSUMO #9':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #9</span>');
            break;
          case '§b§l✫ §8(§a§lS10§8) §6§lSUMO #10':
            titlesArray2.push('<span style="color:#55FFFF; font-weight:bold">✫</span><span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">SUMO #10</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §cTop 10':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF5555">Top 10</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §cTop 50':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF5555">Top 50</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §dTop 100':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF55FF">Top 100</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §dTop 250':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#FF55FF">Top 250</span>');
            break; 
          case '§8(§a§lS10§8) §6§lSumo §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#55FFFF">Top 500</span>');
            break; 
          case '§8(§a§lS10§8) §6§lSumo §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §bTop 2500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#55FFFF">Top 2500</span>');
            break;
          case '§8(§a§lS10§8) §6§lSumo §5§lDivision 1':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">Sumo </span><span style="color:#AA00AA">Division 1</span>');
            break;
          case '§8(§a§lS10§8) §6§l相扑 §bTop 500':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">相扑 </span><span style="color:#55FFFF">Top 500</span>');
            break;
          case '§8(§a§lS10§8) §6§l相扑 §bTop 1000':
            titlesArray2.push('<span style="color:#555555">(</span><span style="color:#55FF55; font-weight:bold">S10</span><span style="color:#555555">) <span style="color:#FFAA00; font-weight:bold">相扑 </span><span style="color:#55FFFF">Top 1000</span>');
            break;
          default:
            titlesArray2.push(titlesArray1[i]);
            break;
                
            }
          }
          
          var SeasonTitleList = '';
          for (let ii in titlesArray2) {
            SeasonTitleList = SeasonTitleList.concat(titlesArray2[ii] + "<br>");
          }
          document.getElementById("specialTitles").innerHTML = SeasonTitleList;
        }
  
  /* GAMEMODE TITLES */

    /* OVERALL STATS */

      if (hypixelData.player.achievements == undefined) {
        var COINS = hypixelData.player.stats.Duels.coins;
        var CURRENTWS = hypixelData.player.stats.Duels.current_winstreak;
        var BESTWS = hypixelData.player.stats.Duels.best_overall_winstreak;
        var WINS = hypixelData.player.stats.Duels.wins;
        var LOSS = hypixelData.player.stats.Duels.losses;
        var KILLS = hypixelData.player.stats.Duels.kills;
        var DEATH = hypixelData.player.stats.Duels.deaths;
        var SHOTS = hypixelData.player.stats.Duels.bow_shots;
        var BOWHITS = hypixelData.player.stats.Duels.bow_hits;
        var SWINGS = hypixelData.player.stats.Duels.melee_swings;
        var MELEEHITS = hypixelData.player.stats.Duels.melee_hits;
      } else {
        var COINS = hypixelData.player.stats.Duels.coins;
        var CURRENTWS = hypixelData.player.stats.Duels.current_winstreak;
        var BESTWS = hypixelData.player.stats.Duels.best_overall_winstreak;
        var TROPHIES = hypixelData.player.achievements.duels_duels_trophies;
        var WINS = hypixelData.player.stats.Duels.wins;
        var LOSS = hypixelData.player.stats.Duels.losses;
        var KILLS = hypixelData.player.stats.Duels.kills;
        var DEATH = hypixelData.player.stats.Duels.deaths;
        var SHOTS = hypixelData.player.stats.Duels.bow_shots;
        var BOWHITS = hypixelData.player.stats.Duels.bow_hits;
        var SWINGS = hypixelData.player.stats.Duels.melee_swings;
        var MELEEHITS = hypixelData.player.stats.Duels.melee_hits;
      }
      
      if (COINS == undefined) {
        COINS = 0};
      if (WINS == undefined) {
        WINS = 0};
      if (LOSS == undefined) {
        LOSS = 0};
      if (KILLS == undefined) {
        KILLS = 0};
      if (DEATH == undefined) {
        DEATH = 0};
      if (SHOTS == undefined) {
        SHOTS = 0};
      if (BOWHITS == undefined) {
        BOWHITS = 0};
      if (SWINGS == undefined) {
        SWINGS = 0};
      if (MELEEHITS == undefined) {
        MELEEHITS = 0};
      if (CURRENTWS == undefined) {
        CURRENTWS = 0};
      if (BESTWS == undefined) {
        BESTWS = 0};
    
      if (TROPHIES !== undefined) {
        document.getElementById("trophies").innerHTML = `<span>Trophies: ${TROPHIES.toLocaleString('en-US')}</span>` }; 

      document.getElementById("coins").innerHTML = `<span>Tokens: ${COINS.toLocaleString('en-US')}</span>`;
      document.getElementById("currentWinstreak").innerHTML = `<span>Current Winstreak: ${CURRENTWS.toLocaleString('en-US')}</span>`;
      document.getElementById("bestWinstreak").innerHTML = `<span>Best Winstreak: ${BESTWS.toLocaleString('en-US')}</span>`;
      document.getElementById("wins").innerHTML = `<span>Wins: ${WINS.toLocaleString('en-US')}</span>`;
      document.getElementById("losses").innerHTML = `<span>Losses: ${LOSS.toLocaleString('en-US')}</span>`;
      document.getElementById("wlr").innerHTML = `<span>Win/Loss Ratio: ${(Math.round((WINS / LOSS) * 100) / 100).toLocaleString('en-US')}</span>`;
      document.getElementById("kills").innerHTML = `<span>Kills: ${KILLS.toLocaleString('en-US')}</span>`;
      document.getElementById("deaths").innerHTML = `<span>Deaths: ${DEATH.toLocaleString('en-US')}</span>`;
      document.getElementById("kdr").innerHTML = `<span>Kill/Death Ratio: ${(Math.round((KILLS / DEATH) * 100) / 100).toLocaleString('en-US')}</span>`;
      document.getElementById("arrowsShot").innerHTML = `<span>Arrows Shot: ${SHOTS.toLocaleString('en-US')}</span>`;
      document.getElementById("arrowsHit").innerHTML = `<span>Arrows Hit: ${BOWHITS.toLocaleString('en-US')}</span>`;
      document.getElementById("ahmr").innerHTML = `<span>Arrow H/M Ratio: ${(Math.round(((BOWHITS / SHOTS) * 100) * 100) / 100).toLocaleString('en-US')}%</span>`;
      document.getElementById("meleeSwings").innerHTML = `<span>Melee Swings: ${SWINGS.toLocaleString('en-US')}</span>`;
      document.getElementById("meleeHits").innerHTML = `<span>Melee Hits: ${MELEEHITS.toLocaleString('en-US')}</span>`;
      document.getElementById("mhmr").innerHTML = `<span>Melee H/M Ratio: ${(Math.round(((MELEEHITS / SWINGS) * 100) * 100) / 100).toLocaleString('en-US')}%</span>`;

      if (hypixelData.player.achievements !== undefined) {

        var BCONQUERER = hypixelData.player.achievements.duels_unique_map_wins;
        var BDUELWINNER = hypixelData.player.achievements.duels_bridge_duel_wins;
        var BSTREAK = hypixelData.player.achievements.duels_bridge_win_streak;
        
        const ARRAY1 = hypixelData.player.achievementsOneTime;
        let COUNT = 0;
        for(let i = 0; i < ARRAY1.length; i++) {
          if(ARRAY1[i] === 'duels_gone_fishing')
            COUNT++;
          if(ARRAY1[i] === 'duels_on_fire')
            COUNT++;
          if(ARRAY1[i] === 'duels_close_call')
            COUNT++;
          if(ARRAY1[i] === 'duels_shut_down')
            COUNT++;
          if(ARRAY1[i] === 'duels_my_preference')
            COUNT++;
          if(ARRAY1[i] === 'duels_well_rounded')
            COUNT++;
          if(ARRAY1[i] === 'duels_community_oriented')
            COUNT++;
          if(ARRAY1[i] === 'duels_gg')
            COUNT++;
          if(ARRAY1[i] === 'duels_carried')
            COUNT++;
          if(ARRAY1[i] === 'duels_replay')
            COUNT++;
          if(ARRAY1[i] === 'duels_domination')
            COUNT++;
          if(ARRAY1[i] === 'duels_hawk_eye')
            COUNT++;
          if(ARRAY1[i] === 'duels_revenge')
            COUNT++;
          if(ARRAY1[i] === 'duels_the_waiting_game')
            COUNT++;
          if(ARRAY1[i] === 'duels_fortification')
            COUNT++;
          if(ARRAY1[i] === 'duels_burn_baby_burn')
            COUNT++;
          if(ARRAY1[i] === 'duels_trial_by_combat')
            COUNT++;
          if(ARRAY1[i] === 'duels_build_battle')
            COUNT++;
          if(ARRAY1[i] === 'duels_rematch')
            COUNT++;
          if(ARRAY1[i] === 'duels_summoner')
            COUNT++;
          if(ARRAY1[i] === 'duels_untouchable')
            COUNT++;
          if(ARRAY1[i] === 'duels_express_yourself')
            COUNT++;
          if(ARRAY1[i] === 'duels_hungry')
            COUNT++;
          if(ARRAY1[i] === 'duels_lobby_slayer')
            COUNT++;
          if(ARRAY1[i] === 'duels_speed_duel')
            COUNT++;
          if(ARRAY1[i] === 'duels_ninja')
            COUNT++;
          if(ARRAY1[i] === 'duels_not_close_at_all')
            COUNT++;
          if(ARRAY1[i] === 'duels_void_archer')
            COUNT++;
          if(ARRAY1[i] === 'duels_speedy_sumo')
            COUNT++;
          if(ARRAY1[i] === 'duels_got_ya')
            COUNT++;
          if(ARRAY1[i] === 'duels_last_stand')
            COUNT++;
          if(ARRAY1[i] === 'duels_hat_trick')
            COUNT++;
          if(ARRAY1[i] === 'duels_getting_loot')
            COUNT++;
          if(ARRAY1[i] === 'duels_axe_you_a_question')
            COUNT++;
          if(ARRAY1[i] === 'duels_clean_sweep')
            COUNT++;
          if(ARRAY1[i] === 'duels_heart_hoarder')
            COUNT++;
          if(ARRAY1[i] === 'duels_ace')
            COUNT++;
          if(ARRAY1[i] === 'duels_not_hungary')
            COUNT++;
          if(ARRAY1[i] === 'duels_team_player')
            COUNT++;
          if(ARRAY1[i] === 'duels_one_v_one_me')
            COUNT++;
        } 

        var BCONQUERER = hypixelData.player.achievements.duels_unique_map_wins;
        var BDUELWINNER = hypixelData.player.achievements.duels_bridge_duels_wins;
        var BSTREAK = hypixelData.player.achievements.duels_bridge_win_streak;
        var DTRAVELLER = hypixelData.player.achievements.duels_duels_traveller;
        var BTEAMSWINNER = hypixelData.player.achievements.duels_bridge_teams_wins;
        var BSCORER = hypixelData.player.achievements.duels_goals;
        var BDOUBLESWINNER = hypixelData.player.achievements.duels_bridge_doubles_wins;
        var BWINNER = hypixelData.player.achievements.duels_bridge_wins;
        var DWINSTREAK = hypixelData.player.achievements.duels_duels_win_streak;
        var DWINNER = hypixelData.player.stats.Duels.wins;
        var BFOURWINNER = hypixelData.player.achievements.duels_bridge_four_teams_wins;
        var CLIMBING = hypixelData.player.achievements.duels_duels_division;

        if (BCONQUERER == undefined) {
          BCONQUERER = 0};
        if (BDUELWINNER == undefined) {
          BDUELWINNER = 0};
        if (BSTREAK == undefined) {
          BSTREAK = 0};
        if (DTRAVELLER == undefined) {
          DTRAVELLER = 0};
        if (BTEAMSWINNER == undefined) {
          BTEAMSWINNER = 0};
        if (BSCORER == undefined) {
          BSCORER = 0};
        if (BDOUBLESWINNER == undefined) {
          BDOUBLESWINNER = 0};
        if (BWINNER == undefined) {
          BWINNER = 0};
        if (DWINSTREAK == undefined) {
          DWINSTREAK = 0};
        if (DWINNER == undefined) {
          DWINNER = 0};
        if (BFOURWINNER == undefined) {
          BFOURWINNER = 0};
        if (CLIMBING == undefined) {
          CLIMBING = 0};

        if (BCONQUERER >= 15) {
          COUNT += 5;
        } else if (BCONQUERER >= 12) {
          COUNT += 4;
        } else if (BCONQUERER >= 9) {
          COUNT += 3;
        } else if (BCONQUERER >= 6) {
          COUNT += 2; 
        } else if (BCONQUERER >= 3) {
          COUNT += 1; }
        
        if (BDUELWINNER >= 500) {
          COUNT += 5;
        } else if (BDUELWINNER >= 250) {
          COUNT += 4;
        } else if (BDUELWINNER >= 100) {
          COUNT += 3;
        } else if (BDUELWINNER >= 50) {
          COUNT += 2;
        } else if (BDUELWINNER >= 10) {
          COUNT += 1; }

        if (BSTREAK >= 25) {
          COUNT += 5;
        } else if (BSTREAK >= 15) {
          COUNT += 4;
        } else if (BSTREAK >= 10) {
          COUNT += 3;
        } else if (BSTREAK >= 6) {
          COUNT += 2;
        } else if (BSTREAK >= 3) {
          COUNT += 1; }

        if (DTRAVELLER >= 8) {
          COUNT += 5;
        } else if (DTRAVELLER >= 7) {
          COUNT += 4;
        } else if (DTRAVELLER >= 6) {
          COUNT += 3;
        } else if (DTRAVELLER >= 5) {
          COUNT += 2;
        } else if (DTRAVELLER >= 4) {
          COUNT += 1; }

        if (BTEAMSWINNER >= 500) {
          COUNT += 5;
        } else if (BTEAMSWINNER >= 250) {
          COUNT += 4;
        } else if (BTEAMSWINNER >= 100) {
          COUNT += 3;
        } else if (BTEAMSWINNER >= 50) {
          COUNT += 2;
        } else if (BTEAMSWINNER >= 10) {
          COUNT += 1; }

        if (BSCORER >= 1000) {
          COUNT += 5;
        } else if (BSCORER >= 500) {
          COUNT += 4;
        } else if (BSCORER >= 250) {
          COUNT += 3;
        } else if (BSCORER >= 100) {
          COUNT += 2;
        } else if (BSCORER >= 25) {
          COUNT += 1; }

        if (BDOUBLESWINNER >= 500) {
          COUNT += 5;
        } else if (BDOUBLESWINNER >= 250) {
          COUNT += 4;
        } else if (BDOUBLESWINNER >= 100) {
          COUNT += 3;
        } else if (BDOUBLESWINNER >= 50) {
          COUNT += 2;
        } else if (BDOUBLESWINNER >= 10) {
          COUNT += 1; }

        if (BWINNER >= 1000) {
          COUNT += 5;
        } else if (BWINNER >= 500) {
          COUNT += 4;
        } else if (BWINNER >= 250) {
          COUNT += 3;
        } else if (BWINNER >= 100) {
          COUNT += 2;
        } else if (BWINNER >= 20) {
          COUNT += 1; }

        if (DWINSTREAK >= 20) {
          COUNT += 5;
        } else if (DWINSTREAK >= 12) {
          COUNT += 4;
        } else if (DWINSTREAK >= 8) {
          COUNT += 3;
        } else if (DWINSTREAK >= 4) {
          COUNT += 2;
        } else if (DWINSTREAK >= 2) {
          COUNT += 1; }

        if (DWINNER >= 1500) {
          COUNT += 5;
        } else if (DWINNER >= 500) {
          COUNT += 4;
        } else if (DWINNER >= 250) {
          COUNT += 3;
        } else if (DWINNER >= 100) {
          COUNT += 2;
        } else if (DWINNER >= 25) {
          COUNT += 1; }

        if (BFOURWINNER >= 250) {
          COUNT += 5;
        } else if (BFOURWINNER >= 100) {
          COUNT += 4;
        } else if (BFOURWINNER >= 50) {
          COUNT += 3;
        } else if (BFOURWINNER >= 25) {
          COUNT += 2;
        } else if (BFOURWINNER >= 10) {
          COUNT += 1; }

        if (CLIMBING >= 5) {
          COUNT += 5;
        } else if (CLIMBING >= 4) {
          COUNT += 4;
        } else if (CLIMBING >= 3) {
          COUNT += 3;
        } else if (CLIMBING >= 2) {
          COUNT += 2;
        } else if (CLIMBING >= 1) {
          COUNT += 1; }

          document.getElementById("ap").innerHTML = `<span>Achievements: ${COUNT}/100</span>`;

      } else {
        document.getElementById("ap").innerHTML = `<span>Achievements: 0/100</span>` };

      var DPLENGTH;
      var DKLENGTH;
      var DWLENGTH;
      var WKLENGTH;
      var WWLENGTH;

      if (hypixelData.player.quests == undefined) {
        DPLENGTH = 0;
        DKLENGTH = 0;
        DWLENGTH = 0;
        WKLENGTH = 0;
        WWLENGTH = 0;

        document.getElementById("quests").innerHTML = `<span>Completed Quests: 0</span>`;

      } else {

        var DUELSPLAYER = hypixelData.player.quests.duels_player;
        var DUELSKILLER = hypixelData.player.quests.duels_killer;
        var DUELSWINNER = hypixelData.player.quests.duels_winner;
        var WEEKLYKILLS = hypixelData.player.quests.duels_weekly_kills;
        var WEEKLYWINS = hypixelData.player.quests.duels_weekly_wins;

        if (DUELSPLAYER == undefined) {
          DPLENGTH = 0 
        } else if (hypixelData.player.quests.duels_player.completions == undefined) {
          DPLENGTH = 0
        } else {
          DPLENGTH = hypixelData.player.quests.duels_player.completions.length };
        if (DUELSKILLER == undefined) {
          DKLENGTH = 0
        } else if (hypixelData.player.quests.duels_killer.completions == undefined) {
          DKLENGTH = 0
        } else {
          DKLENGTH = hypixelData.player.quests.duels_killer.completions.length };
        if (DUELSWINNER == undefined) {
          DWLENGTH = 0
        } else if (hypixelData.player.quests.duels_winner.completions == undefined) {
          DWLENGTH = 0
        } else {
          DWLENGTH = hypixelData.player.quests.duels_winner.completions.length };
        if (WEEKLYKILLS == undefined) {
          WKLENGTH = 0
        } else if (hypixelData.player.quests.duels_weekly_kills.completions == undefined) {
          WKLENGTH = 0
        } else {  
          WKLENGTH = hypixelData.player.quests.duels_weekly_kills.completions.length };
        if (WEEKLYWINS == undefined) {
          WWLENGTH = 0
        } else if (hypixelData.player.quests.duels_weekly_wins.completions == undefined) {
          WWLENGTH = 0
        } else {
            WWLENGTH = hypixelData.player.quests.duels_weekly_wins.completions.length };

        var QUESTS = DPLENGTH + DKLENGTH + DWLENGTH + WKLENGTH + WWLENGTH;

        document.getElementById("quests").innerHTML = `<span>Completed Quests: ${QUESTS.toLocaleString('en-US')}</span>`;
      };

  /* GAMEMODE STATS */
    //UHC DUELS

      var UHC1W = hypixelData.player.stats.Duels.uhc_duel_wins;
      var UHC1L = hypixelData.player.stats.Duels.uhc_duel_losses;
      var UHC1K = hypixelData.player.stats.Duels.uhc_duel_kills;
      var UHC1D = hypixelData.player.stats.Duels.uhc_duel_deaths;
      var UHC1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_uhc_duel;
      var UHC1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_uhc_duel;
      var UHC1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_uhc_duel;

      if (UHC1W == undefined) {
        UHC1W = 0 }
      if (UHC1L == undefined) {
        UHC1L = 0 }
      if (UHC1K == undefined) {
        UHC1K = 0 }
      if (UHC1D == undefined) {
        UHC1D = 0 }
      if (UHC1CWS == undefined) {
        UHC1CWS = 0 }
      if (UHC1BWS == undefined) {
        UHC1BWS = 0 }
      if (UHC1DWS == undefined) {
        UHC1DWS = 0 }
    
      document.getElementById("UHC1W").innerHTML = `<span>${UHC1W.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1L").innerHTML = `<span>${UHC1L.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1WLR").innerHTML = `<span>${Math.round((UHC1W / UHC1L) * 100) / 100}</span>`;
      document.getElementById("UHC1K").innerHTML = `<span>${UHC1K.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1D").innerHTML = `<span>${UHC1D.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1KDR").innerHTML = `<span>${Math.round((UHC1K / UHC1D) * 100) / 100}</span>`;
      document.getElementById("UHC1CWS").innerHTML = `<span>${UHC1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1BWS").innerHTML = `<span>${UHC1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC1DWS").innerHTML = `<span>${UHC1DWS.toLocaleString('en-US')}</span>`;

      var UHC2W = hypixelData.player.stats.Duels.uhc_doubles_wins;
      var UHC2L = hypixelData.player.stats.Duels.uhc_doubles_losses;
      var UHC2K = hypixelData.player.stats.Duels.uhc_doubles_kills;
      var UHC2D = hypixelData.player.stats.Duels.uhc_doubles_deaths;
      var UHC2CWS = hypixelData.player.stats.Duels.current_winstreak_mode_uhc_doubles;
      var UHC2BWS = hypixelData.player.stats.Duels.best_winstreak_mode_uhc_doubles;
      var UHC2DWS = hypixelData.player.stats.Duels.duels_winstreak_best_uhc_doubles;

      if (UHC2W == undefined) {
        UHC2W = 0 }
      if (UHC2L == undefined) {
        UHC2L = 0 }
      if (UHC2K == undefined) {
        UHC2K = 0 }
      if (UHC2D == undefined) {
        UHC2D = 0 }
      if (UHC2CWS == undefined) {
        UHC2CWS = 0 }
      if (UHC2BWS == undefined) {
        UHC2BWS = 0 }
      if (UHC2DWS == undefined) {
        UHC2DWS = 0 }
    
      document.getElementById("UHC2W").innerHTML = `<span>${UHC2W.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2L").innerHTML = `<span>${UHC2L.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2WLR").innerHTML = `<span>${Math.round((UHC2W / UHC2L) * 100) / 100}</span>`;
      document.getElementById("UHC2K").innerHTML = `<span>${UHC2K.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2D").innerHTML = `<span>${UHC2D.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2KDR").innerHTML = `<span>${Math.round((UHC2K / UHC2D) * 100) / 100}</span>`;
      document.getElementById("UHC2CWS").innerHTML = `<span>${UHC2CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2BWS").innerHTML = `<span>${UHC2BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC2DWS").innerHTML = `<span>${UHC2DWS.toLocaleString('en-US')}</span>`;

      var UHC4W = hypixelData.player.stats.Duels.uhc_four_wins;
      var UHC4L = hypixelData.player.stats.Duels.uhc_four_losses;
      var UHC4K = hypixelData.player.stats.Duels.uhc_four_kills;
      var UHC4D = hypixelData.player.stats.Duels.uhc_four_deaths;
      var UHC4CWS = hypixelData.player.stats.Duels.current_winstreak_mode_uhc_four;
      var UHC4BWS = hypixelData.player.stats.Duels.best_winstreak_mode_uhc_four;
      var UHC4DWS = hypixelData.player.stats.Duels.duels_winstreak_best_uhc_four;

      if (UHC4W == undefined) {
        UHC4W = 0 }
      if (UHC4L == undefined) {
        UHC4L = 0 }
      if (UHC4K == undefined) {
        UHC4K = 0 }
      if (UHC4D == undefined) {
        UHC4D = 0 }
      if (UHC4CWS == undefined) {
        UHC4CWS = 0 }
      if (UHC4BWS == undefined) {
        UHC4BWS = 0 }
      if (UHC4DWS == undefined) {
        UHC4DWS = 0 }
    
      document.getElementById("UHC4W").innerHTML = `<span>${UHC4W.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4L").innerHTML = `<span>${UHC4L.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4WLR").innerHTML = `<span>${Math.round((UHC4W / UHC4L) * 100) / 100}</span>`;
      document.getElementById("UHC4K").innerHTML = `<span>${UHC4K.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4D").innerHTML = `<span>${UHC4D.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4KDR").innerHTML = `<span>${Math.round((UHC4K / UHC4D) * 100) / 100}</span>`;
      document.getElementById("UHC4CWS").innerHTML = `<span>${UHC4CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4BWS").innerHTML = `<span>${UHC4BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHC4DWS").innerHTML = `<span>${UHC4DWS.toLocaleString('en-US')}</span>`;


      var UHCDMW = hypixelData.player.stats.Duels.uhc_meetup_wins;
      var UHCDML = hypixelData.player.stats.Duels.uhc_meetup_losses;
      var UHCDMK = hypixelData.player.stats.Duels.uhc_meetup_kills;
      var UHCDMD = hypixelData.player.stats.Duels.uhc_meetup_deaths;
      var UHCDMCWS = hypixelData.player.stats.Duels.current_winstreak_mode_uhc_meetup;
      var UHCDMBWS = hypixelData.player.stats.Duels.best_winstreak_mode_uhc_meetup;
      var UHCDMDWS = hypixelData.player.stats.Duels.duels_winstreak_best_uhc_meetup;

      if (UHCDMW == undefined) {
        UHCDMW = 0 }
      if (UHCDML == undefined) {
        UHCDML = 0 }
      if (UHCDMK == undefined) {
        UHCDMK = 0 }
      if (UHCDMD == undefined) {
        UHCDMD = 0 }
      if (UHCDMCWS == undefined) {
        UHCDMCWS = 0 }
      if (UHCDMBWS == undefined) {
        UHCDMBWS = 0 }
      if (UHCDMDWS == undefined) {
        UHCDMDWS = 0 }
    
      document.getElementById("UHCDMW").innerHTML = `<span>${UHCDMW.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDML").innerHTML = `<span>${UHCDML.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDMWLR").innerHTML = `<span>${Math.round((UHCDMW / UHCDML) * 100) / 100}</span>`;
      document.getElementById("UHCDMK").innerHTML = `<span>${UHCDMK.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDMD").innerHTML = `<span>${UHCDMD.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDMKDR").innerHTML = `<span>${Math.round((UHCDMK / UHCDMD) * 100) / 100}</span>`;
      document.getElementById("UHCDMCWS").innerHTML = `<span>${UHCDMCWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDMBWS").innerHTML = `<span>${UHCDMBWS.toLocaleString('en-US')}</span>`;
      document.getElementById("UHCDMDWS").innerHTML = `<span>${UHCDMDWS.toLocaleString('en-US')}</span>`;

    // SKYWARS DUELS

      var SW1W = hypixelData.player.stats.Duels.sw_duel_wins;
      var SW1L = hypixelData.player.stats.Duels.sw_duel_losses;
      var SW1K = hypixelData.player.stats.Duels.sw_duel_kills;
      var SW1D = hypixelData.player.stats.Duels.sw_duel_deaths;
      var SW1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_sw_duel;
      var SW1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_sw_duel;
      var SW1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_sw_duel;

      if (SW1W == undefined) {
        SW1W = 0 }
      if (SW1L == undefined) {
        SW1L = 0 }
      if (SW1K == undefined) {
        SW1K = 0 }
      if (SW1D == undefined) {
        SW1D = 0 }
      if (SW1CWS == undefined) {
        SW1CWS = 0 }
      if (SW1BWS == undefined) {
        SW1BWS = 0 }
      if (SW1DWS == undefined) {
        SW1DWS = 0 }
    
      document.getElementById("SW1W").innerHTML = `<span>${SW1W.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1L").innerHTML = `<span>${SW1L.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1WLR").innerHTML = `<span>${Math.round((SW1W / SW1L) * 100) / 100}</span>`;
      document.getElementById("SW1K").innerHTML = `<span>${SW1K.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1D").innerHTML = `<span>${SW1D.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1KDR").innerHTML = `<span>${Math.round((SW1K / SW1D) * 100) / 100}</span>`;
      document.getElementById("SW1CWS").innerHTML = `<span>${SW1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1BWS").innerHTML = `<span>${SW1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SW1DWS").innerHTML = `<span>${SW1DWS.toLocaleString('en-US')}</span>`;

      var SW2W = hypixelData.player.stats.Duels.sw_doubles_wins;
      var SW2L = hypixelData.player.stats.Duels.sw_doubles_losses;
      var SW2K = hypixelData.player.stats.Duels.sw_doubles_kills;
      var SW2D = hypixelData.player.stats.Duels.sw_doubles_deaths;
      var SW2CWS = hypixelData.player.stats.Duels.current_winstreak_mode_sw_doubles;
      var SW2BWS = hypixelData.player.stats.Duels.best_winstreak_mode_sw_doubles;
      var SW2DWS = hypixelData.player.stats.Duels.duels_winstreak_best_sw_doubles;

      if (SW2W == undefined) {
        SW2W = 0 }
      if (SW2L == undefined) {
        SW2L = 0 }
      if (SW2K == undefined) {
        SW2K = 0 }
      if (SW2D == undefined) {
        SW2D = 0 }
      if (SW2CWS == undefined) {
        SW2CWS = 0 }
      if (SW2BWS == undefined) {
        SW2BWS = 0 }
      if (SW2DWS == undefined) {
        SW2DWS = 0 }
    
      document.getElementById("SW2W").innerHTML = `<span>${SW2W.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2L").innerHTML = `<span>${SW2L.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2WLR").innerHTML = `<span>${Math.round((SW2W / SW2L) * 100) / 100}</span>`;
      document.getElementById("SW2K").innerHTML = `<span>${SW2K.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2D").innerHTML = `<span>${SW2D.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2KDR").innerHTML = `<span>${Math.round((SW2K / SW2D) * 100) / 100}</span>`;
      document.getElementById("SW2CWS").innerHTML = `<span>${SW2CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2BWS").innerHTML = `<span>${SW2BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SW2DWS").innerHTML = `<span>${SW2DWS.toLocaleString('en-US')}</span>`;

    // MEGAWALLS DUELS

      var MW1W = hypixelData.player.stats.Duels.mw_duel_wins;
      var MW1L = hypixelData.player.stats.Duels.mw_duel_losses;
      var MW1K = hypixelData.player.stats.Duels.mw_duel_kills;
      var MW1D = hypixelData.player.stats.Duels.mw_duel_deaths;
      var MW1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_mw_duel;
      var MW1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_mw_duel;
      var MW1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_mw_duel;

      if (MW1W == undefined) {
        MW1W = 0 }
      if (MW1L == undefined) {
        MW1L = 0 }
      if (MW1K == undefined) {
        MW1K = 0 }
      if (MW1D == undefined) {
        MW1D = 0 }
      if (MW1CWS == undefined) {
        MW1CWS = 0 }
      if (MW1BWS == undefined) {
        MW1BWS = 0 }
      if (MW1DWS == undefined) {
        MW1DWS = 0 }
    
      document.getElementById("MW1W").innerHTML = `<span>${MW1W.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1L").innerHTML = `<span>${MW1L.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1WLR").innerHTML = `<span>${Math.round((MW1W / MW1L) * 100) / 100}</span>`;
      document.getElementById("MW1K").innerHTML = `<span>${MW1K.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1D").innerHTML = `<span>${MW1D.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1KDR").innerHTML = `<span>${Math.round((MW1K / MW1D) * 100) / 100}</span>`;
      document.getElementById("MW1CWS").innerHTML = `<span>${MW1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1BWS").innerHTML = `<span>${MW1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("MW1DWS").innerHTML = `<span>${MW1DWS.toLocaleString('en-US')}</span>`;

      var MW2W = hypixelData.player.stats.Duels.mw_doubles_wins;
      var MW2L = hypixelData.player.stats.Duels.mw_doubles_losses;
      var MW2K = hypixelData.player.stats.Duels.mw_doubles_kills;
      var MW2D = hypixelData.player.stats.Duels.mw_doubles_deaths;
      var MW2CWS = hypixelData.player.stats.Duels.current_winstreak_mode_mw_doubles;
      var MW2BWS = hypixelData.player.stats.Duels.best_winstreak_mode_mw_doubles;
      var MW2DWS = hypixelData.player.stats.Duels.duels_winstreak_best_mw_doubles;

      if (MW2W == undefined) {
        MW2W = 0 }
      if (MW2L == undefined) {
        MW2L = 0 }
      if (MW2K == undefined) {
        MW2K = 0 }
      if (MW2D == undefined) {
        MW2D = 0 }
      if (MW2CWS == undefined) {
        MW2CWS = 0 }
      if (MW2BWS == undefined) {
        MW2BWS = 0 }
      if (MW2DWS == undefined) {
        MW2DWS = 0 }
    
      document.getElementById("MW2W").innerHTML = `<span>${MW2W.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2L").innerHTML = `<span>${MW2L.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2WLR").innerHTML = `<span>${Math.round((MW2W / MW2L) * 100) / 100}</span>`;
      document.getElementById("MW2K").innerHTML = `<span>${MW2K.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2D").innerHTML = `<span>${MW2D.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2KDR").innerHTML = `<span>${Math.round((MW2K / MW2D) * 100) / 100}</span>`;
      document.getElementById("MW2CWS").innerHTML = `<span>${MW2CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2BWS").innerHTML = `<span>${MW2BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("MW2DWS").innerHTML = `<span>${MW2DWS.toLocaleString('en-US')}</span>`;

    // BLITZ DUELS

      var BLITZ1W = hypixelData.player.stats.Duels.blitz_duel_wins;
      var BLITZ1L = hypixelData.player.stats.Duels.blitz_duel_losses;
      var BLITZ1K = hypixelData.player.stats.Duels.blitz_duel_kills;
      var BLITZ1D = hypixelData.player.stats.Duels.blitz_duel_deaths;
      var BLITZ1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_blitz_duel;
      var BLITZ1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_blitz_duel;
      var BLITZ1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_blitz_duel;

      if (BLITZ1W == undefined) {
        BLITZ1W = 0 }
      if (BLITZ1L == undefined) {
        BLITZ1L = 0 }
      if (BLITZ1K == undefined) {
        BLITZ1K = 0 }
      if (BLITZ1D == undefined) {
        BLITZ1D = 0 }
      if (BLITZ1CWS == undefined) {
        BLITZ1CWS = 0 }
      if (BLITZ1BWS == undefined) {
        BLITZ1BWS = 0 }
      if (BLITZ1DWS == undefined) {
        BLITZ1DWS = 0 }
    
      document.getElementById("BLITZ1W").innerHTML = `<span>${BLITZ1W.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1L").innerHTML = `<span>${BLITZ1L.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1WLR").innerHTML = `<span>${Math.round((BLITZ1W / BLITZ1L) * 100) / 100}</span>`;
      document.getElementById("BLITZ1K").innerHTML = `<span>${BLITZ1K.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1D").innerHTML = `<span>${BLITZ1D.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1KDR").innerHTML = `<span>${Math.round((BLITZ1K / BLITZ1D) * 100) / 100}</span>`;
      document.getElementById("BLITZ1CWS").innerHTML = `<span>${BLITZ1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1BWS").innerHTML = `<span>${BLITZ1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BLITZ1DWS").innerHTML = `<span>${BLITZ1DWS.toLocaleString('en-US')}</span>`;


    // OP DUELS

      var OP1W = hypixelData.player.stats.Duels.op_duel_wins;
      var OP1L = hypixelData.player.stats.Duels.op_duel_losses;
      var OP1K = hypixelData.player.stats.Duels.op_duel_kills;
      var OP1D = hypixelData.player.stats.Duels.op_duel_deaths;
      var OP1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_op_duel;
      var OP1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_op_duel;
      var OP1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_op_duel;

      if (OP1W == undefined) {
        OP1W = 0 }
      if (OP1L == undefined) {
        OP1L = 0 }
      if (OP1K == undefined) {
        OP1K = 0 }
      if (OP1D == undefined) {
        OP1D = 0 }
      if (OP1CWS == undefined) {
        OP1CWS = 0 }
      if (OP1BWS == undefined) {
        OP1BWS = 0 }
      if (OP1DWS == undefined) {
        OP1DWS = 0 }
    
      document.getElementById("OP1W").innerHTML = `<span>${OP1W.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1L").innerHTML = `<span>${OP1L.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1WLR").innerHTML = `<span>${Math.round((OP1W / OP1L) * 100) / 100}</span>`;
      document.getElementById("OP1K").innerHTML = `<span>${OP1K.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1D").innerHTML = `<span>${OP1D.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1KDR").innerHTML = `<span>${Math.round((OP1K / OP1D) * 100) / 100}</span>`;
      document.getElementById("OP1CWS").innerHTML = `<span>${OP1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1BWS").innerHTML = `<span>${OP1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("OP1DWS").innerHTML = `<span>${OP1DWS.toLocaleString('en-US')}</span>`;


      var OP2W = hypixelData.player.stats.Duels.op_doubles_wins;
      var OP2L = hypixelData.player.stats.Duels.op_doubles_losses;
      var OP2K = hypixelData.player.stats.Duels.op_doubles_kills;
      var OP2D = hypixelData.player.stats.Duels.op_doubles_deaths;
      var OP2CWS = hypixelData.player.stats.Duels.current_winstreak_mode_op_doubles;
      var OP2BWS = hypixelData.player.stats.Duels.best_winstreak_mode_op_doubles;
      var OP2DWS = hypixelData.player.stats.Duels.duels_winstreak_best_op_doubles;

      if (OP2W == undefined) {
        OP2W = 0 }
      if (OP2L == undefined) {
        OP2L = 0 }
      if (OP2K == undefined) {
        OP2K = 0 }
      if (OP2D == undefined) {
        OP2D = 0 }
      if (OP2CWS == undefined) {
        OP2CWS = 0 }
      if (OP2BWS == undefined) {
        OP2BWS = 0 }
      if (OP2DWS == undefined) {
        OP2DWS = 0 }
    
      document.getElementById("OP2W").innerHTML = `<span>${OP2W.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2L").innerHTML = `<span>${OP2L.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2WLR").innerHTML = `<span>${Math.round((OP2W / OP2L) * 100) / 100}</span>`;
      document.getElementById("OP2K").innerHTML = `<span>${OP2K.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2D").innerHTML = `<span>${OP2D.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2KDR").innerHTML = `<span>${Math.round((OP2K / OP2D) * 100) / 100}</span>`;
      document.getElementById("OP2CWS").innerHTML = `<span>${OP2CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2BWS").innerHTML = `<span>${OP2BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("OP2DWS").innerHTML = `<span>${OP2DWS.toLocaleString('en-US')}</span>`;

    // CLASSIC DUELS

      var CLASSIC1W = hypixelData.player.stats.Duels.classic_duel_wins;
      var CLASSIC1L = hypixelData.player.stats.Duels.classic_duel_losses;
      var CLASSIC1K = hypixelData.player.stats.Duels.classic_duel_kills;
      var CLASSIC1D = hypixelData.player.stats.Duels.classic_duel_deaths;
      var CLASSIC1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_classic_duel;
      var CLASSIC1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_classic_duel;
      var CLASSIC1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_classic_duel;

      if (CLASSIC1W == undefined) {
        CLASSIC1W = 0 }
      if (CLASSIC1L == undefined) {
        CLASSIC1L = 0 }
      if (CLASSIC1K == undefined) {
        CLASSIC1K = 0 }
      if (CLASSIC1D == undefined) {
        CLASSIC1D = 0 }
      if (CLASSIC1CWS == undefined) {
        CLASSIC1CWS = 0 }
      if (CLASSIC1BWS == undefined) {
        CLASSIC1BWS = 0 }
      if (CLASSIC1DWS == undefined) {
        CLASSIC1DWS = 0 }
    
      document.getElementById("CLASSIC1W").innerHTML = `<span>${CLASSIC1W.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1L").innerHTML = `<span>${CLASSIC1L.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1WLR").innerHTML = `<span>${Math.round((CLASSIC1W / CLASSIC1L) * 100) / 100}</span>`;
      document.getElementById("CLASSIC1K").innerHTML = `<span>${CLASSIC1K.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1D").innerHTML = `<span>${CLASSIC1D.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1KDR").innerHTML = `<span>${Math.round((CLASSIC1K / CLASSIC1D) * 100) / 100}</span>`;
      document.getElementById("CLASSIC1CWS").innerHTML = `<span>${CLASSIC1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1BWS").innerHTML = `<span>${CLASSIC1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("CLASSIC1DWS").innerHTML = `<span>${CLASSIC1DWS.toLocaleString('en-US')}</span>`;

    // BOW DUELS

      var BOW1W = hypixelData.player.stats.Duels.bow_duel_wins;
      var BOW1L = hypixelData.player.stats.Duels.bow_duel_losses;
      var BOW1K = hypixelData.player.stats.Duels.bow_duel_kills;
      var BOW1D = hypixelData.player.stats.Duels.bow_duel_deaths;
      var BOW1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bow_duel;
      var BOW1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bow_duel;
      var BOW1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bow_duel;

      if (BOW1W == undefined) {
        BOW1W = 0 }
      if (BOW1L == undefined) {
        BOW1L = 0 }
      if (BOW1K == undefined) {
        BOW1K = 0 }
      if (BOW1D == undefined) {
        BOW1D = 0 }
      if (BOW1CWS == undefined) {
        BOW1CWS = 0 }
      if (BOW1BWS == undefined) {
        BOW1BWS = 0 }
      if (BOW1DWS == undefined) {
        BOW1DWS = 0 }
    
      document.getElementById("BOW1W").innerHTML = `<span>${BOW1W.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1L").innerHTML = `<span>${BOW1L.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1WLR").innerHTML = `<span>${Math.round((BOW1W / BOW1L) * 100) / 100}</span>`;
      document.getElementById("BOW1K").innerHTML = `<span>${BOW1K.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1D").innerHTML = `<span>${BOW1D.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1KDR").innerHTML = `<span>${Math.round((BOW1K / BOW1D) * 100) / 100}</span>`;
      document.getElementById("BOW1CWS").innerHTML = `<span>${BOW1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1BWS").innerHTML = `<span>${BOW1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BOW1DWS").innerHTML = `<span>${BOW1DWS.toLocaleString('en-US')}</span>`;

    // NODEBUFF DUELS
  
      var NDB1W = hypixelData.player.stats.Duels.potion_duel_wins;
      var NDB1L = hypixelData.player.stats.Duels.potion_duel_losses;
      var NDB1K = hypixelData.player.stats.Duels.potion_duel_kills;
      var NDB1D = hypixelData.player.stats.Duels.potion_duel_deaths;
      var NDB1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_potion_duel;
      var NDB1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_potion_duel;
      var NDB1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_potion_duel;

      if (NDB1W == undefined) {
        NDB1W = 0 }
      if (NDB1L == undefined) {
        NDB1L = 0 }
      if (NDB1K == undefined) {
        NDB1K = 0 }
      if (NDB1D == undefined) {
        NDB1D = 0 }
      if (NDB1CWS == undefined) {
        NDB1CWS = 0 }
      if (NDB1BWS == undefined) {
        NDB1BWS = 0 }
      if (NDB1DWS == undefined) {
        NDB1DWS = 0 }
    
      document.getElementById("NDB1W").innerHTML = `<span>${NDB1W.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1L").innerHTML = `<span>${NDB1L.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1WLR").innerHTML = `<span>${Math.round((NDB1W / NDB1L) * 100) / 100}</span>`;
      document.getElementById("NDB1K").innerHTML = `<span>${NDB1K.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1D").innerHTML = `<span>${NDB1D.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1KDR").innerHTML = `<span>${Math.round((NDB1K / NDB1D) * 100) / 100}</span>`;
      document.getElementById("NDB1CWS").innerHTML = `<span>${NDB1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1BWS").innerHTML = `<span>${NDB1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("NDB1DWS").innerHTML = `<span>${NDB1DWS.toLocaleString('en-US')}</span>`;

    // COMBO DUELS

      var COMBO1W = hypixelData.player.stats.Duels.combo_duel_wins;
      var COMBO1L = hypixelData.player.stats.Duels.combo_duel_losses;
      var COMBO1K = hypixelData.player.stats.Duels.combo_duel_kills;
      var COMBO1D = hypixelData.player.stats.Duels.combo_duel_deaths;
      var COMBO1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_combo_duel;
      var COMBO1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_combo_duel;
      var COMBO1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_combo_duel;

      if (COMBO1W == undefined) {
        COMBO1W = 0 }
      if (COMBO1L == undefined) {
        COMBO1L = 0 }
      if (COMBO1K == undefined) {
        COMBO1K = 0 }
      if (COMBO1D == undefined) {
        COMBO1D = 0 }
      if (COMBO1CWS == undefined) {
        COMBO1CWS = 0 }
      if (COMBO1BWS == undefined) {
        COMBO1BWS = 0 }
      if (COMBO1DWS == undefined) {
        COMBO1DWS = 0 }
    
      document.getElementById("COMBO1W").innerHTML = `<span>${COMBO1W.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1L").innerHTML = `<span>${COMBO1L.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1WLR").innerHTML = `<span>${Math.round((COMBO1W / COMBO1L) * 100) / 100}</span>`;
      document.getElementById("COMBO1K").innerHTML = `<span>${COMBO1K.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1D").innerHTML = `<span>${COMBO1D.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1KDR").innerHTML = `<span>${Math.round((COMBO1K / COMBO1D) * 100) / 100}</span>`;
      document.getElementById("COMBO1CWS").innerHTML = `<span>${COMBO1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1BWS").innerHTML = `<span>${COMBO1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("COMBO1DWS").innerHTML = `<span>${COMBO1DWS.toLocaleString('en-US')}</span>`;

    // TNT DUELS  

      var TNT1W = hypixelData.player.stats.Duels.bowspleef_duel_wins;
      var TNT1L = hypixelData.player.stats.Duels.bowspleef_duel_losses;
      var TNT1K = hypixelData.player.stats.Duels.bowspleef_duel_kills;
      var TNT1D = hypixelData.player.stats.Duels.bowspleef_duel_deaths;
      var TNT1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bowspleef_duel;
      var TNT1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bowspleef_duel;
      var TNT1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bowspleef_duel;

      if (TNT1W == undefined) {
        TNT1W = 0 }
      if (TNT1L == undefined) {
        TNT1L = 0 }
      if (TNT1K == undefined) {
        TNT1K = 0 }
      if (TNT1D == undefined) {
        TNT1D = 0 }
      if (TNT1CWS == undefined) {
        TNT1CWS = 0 }
      if (TNT1BWS == undefined) {
        TNT1BWS = 0 }
      if (TNT1DWS == undefined) {
        TNT1DWS = 0 }
    
      document.getElementById("TNT1W").innerHTML = `<span>${TNT1W.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1L").innerHTML = `<span>${TNT1L.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1WLR").innerHTML = `<span>${Math.round((TNT1W / TNT1L) * 100) / 100}</span>`;
      document.getElementById("TNT1K").innerHTML = `<span>${TNT1K.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1D").innerHTML = `<span>${TNT1D.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1KDR").innerHTML = `<span>${Math.round((TNT1K / TNT1D) * 100) / 100}</span>`;
      document.getElementById("TNT1CWS").innerHTML = `<span>${TNT1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1BWS").innerHTML = `<span>${TNT1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("TNT1DWS").innerHTML = `<span>${TNT1DWS.toLocaleString('en-US')}</span>`;


    // SUMO DUELS

      var SUMO1W = hypixelData.player.stats.Duels.sumo_duel_wins;
      var SUMO1L = hypixelData.player.stats.Duels.sumo_duel_losses;
      var SUMO1K = hypixelData.player.stats.Duels.sumo_duel_kills;
      var SUMO1D = hypixelData.player.stats.Duels.sumo_duel_deaths;
      var SUMO1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_sumo_duel;
      var SUMO1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_sumo_duel;
      var SUMO1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_sumo_duel;

      if (SUMO1W == undefined) {
        SUMO1W = 0 }
      if (SUMO1L == undefined) {
        SUMO1L = 0 }
      if (SUMO1K == undefined) {
        SUMO1K = 0 }
      if (SUMO1D == undefined) {
        SUMO1D = 0 }
      if (SUMO1CWS == undefined) {
        SUMO1CWS = 0 }
      if (SUMO1BWS == undefined) {
        SUMO1BWS = 0 }
      if (SUMO1DWS == undefined) {
        SUMO1DWS = 0 }
    
      document.getElementById("SUMO1W").innerHTML = `<span>${SUMO1W.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1L").innerHTML = `<span>${SUMO1L.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1WLR").innerHTML = `<span>${Math.round((SUMO1W / SUMO1L) * 100) / 100}</span>`;
      document.getElementById("SUMO1K").innerHTML = `<span>${SUMO1K.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1D").innerHTML = `<span>${SUMO1D.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1KDR").innerHTML = `<span>${Math.round((SUMO1K / SUMO1D) * 100) / 100}</span>`;
      document.getElementById("SUMO1CWS").innerHTML = `<span>${SUMO1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1BWS").innerHTML = `<span>${SUMO1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("SUMO1DWS").innerHTML = `<span>${SUMO1DWS.toLocaleString('en-US')}</span>`;

    // BRIDGE DUELS

      var BRIDGE1W = hypixelData.player.stats.Duels.bridge_duel_wins;
      var BRIDGE1L = hypixelData.player.stats.Duels.bridge_duel_losses;
      var BRIDGE1K = hypixelData.player.stats.Duels.bridge_duel_bridge_kills;
      var BRIDGE1D = hypixelData.player.stats.Duels.bridge_duel_bridge_deaths;
      var BRIDGE1CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_duel;
      var BRIDGE1BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_duel;
      var BRIDGE1DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_duel;

      if (BRIDGE1W == undefined) {
        BRIDGE1W = 0 }
      if (BRIDGE1L == undefined) {
        BRIDGE1L = 0 }
      if (BRIDGE1K == undefined) {
        BRIDGE1K = 0 }
      if (BRIDGE1D == undefined) {
        BRIDGE1D = 0 }
      if (BRIDGE1CWS == undefined) {
        BRIDGE1CWS = 0 }
      if (BRIDGE1BWS == undefined) {
        BRIDGE1BWS = 0 }
      if (BRIDGE1DWS == undefined) {
        BRIDGE1DWS = 0 }
    
      document.getElementById("BRIDGE1W").innerHTML = `<span>${BRIDGE1W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1L").innerHTML = `<span>${BRIDGE1L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1WLR").innerHTML = `<span>${Math.round((BRIDGE1W / BRIDGE1L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE1K").innerHTML = `<span>${BRIDGE1K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1D").innerHTML = `<span>${BRIDGE1D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1KDR").innerHTML = `<span>${Math.round((BRIDGE1K / BRIDGE1D) * 100) / 100}</span>`;
      document.getElementById("BRIDGE1CWS").innerHTML = `<span>${BRIDGE1CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1BWS").innerHTML = `<span>${BRIDGE1BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE1DWS").innerHTML = `<span>${BRIDGE1DWS.toLocaleString('en-US')}</span>`;


      var BRIDGE2W = hypixelData.player.stats.Duels.bridge_doubles_wins;
      var BRIDGE2L = hypixelData.player.stats.Duels.bridge_doubles_losses;
      var BRIDGE2K = hypixelData.player.stats.Duels.bridge_doubles_bridge_kills;
      var BRIDGE2D = hypixelData.player.stats.Duels.bridge_doubles_bridge_deaths;
      var BRIDGE2CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_doubles;
      var BRIDGE2BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_doubles;
      var BRIDGE2DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_doubles;

      if (BRIDGE2W == undefined) {
        BRIDGE2W = 0 }
      if (BRIDGE2L == undefined) {
        BRIDGE2L = 0 }
      if (BRIDGE2K == undefined) {
        BRIDGE2K = 0 }
      if (BRIDGE2D == undefined) {
        BRIDGE2D = 0 }
      if (BRIDGE2CWS == undefined) {
        BRIDGE2CWS = 0 }
      if (BRIDGE2BWS == undefined) {
        BRIDGE2BWS = 0 }
      if (BRIDGE2DWS == undefined) {
        BRIDGE2DWS = 0 }
    
      document.getElementById("BRIDGE2W").innerHTML = `<span>${BRIDGE2W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2L").innerHTML = `<span>${BRIDGE2L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2WLR").innerHTML = `<span>${Math.round((BRIDGE2W / BRIDGE2L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE2K").innerHTML = `<span>${BRIDGE2K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2D").innerHTML = `<span>${BRIDGE2D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2KDR").innerHTML = `<span>${Math.round((BRIDGE2K / BRIDGE2D) * 100) / 100}</span>`;
      document.getElementById("BRIDGE2CWS").innerHTML = `<span>${BRIDGE2CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2BWS").innerHTML = `<span>${BRIDGE2BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2DWS").innerHTML = `<span>${BRIDGE2DWS.toLocaleString('en-US')}</span>`;


      var BRIDGE3W = hypixelData.player.stats.Duels.bridge_threes_wins;
      var BRIDGE3L = hypixelData.player.stats.Duels.bridge_threes_losses;
      var BRIDGE3K = hypixelData.player.stats.Duels.bridge_threes_bridge_kills;
      var BRIDGE3D = hypixelData.player.stats.Duels.bridge_threes_bridge_deaths;
      var BRIDGE3CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_threes;
      var BRIDGE3BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_threes;
      var BRIDGE3DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_threes;

      if (BRIDGE3W == undefined) {
        BRIDGE3W = 0 }
      if (BRIDGE3L == undefined) {
        BRIDGE3L = 0 }
      if (BRIDGE3K == undefined) {
        BRIDGE3K = 0 }
      if (BRIDGE3D == undefined) {
        BRIDGE3D = 0 }
      if (BRIDGE3CWS == undefined) {
        BRIDGE3CWS = 0 }
      if (BRIDGE3BWS == undefined) {
        BRIDGE3BWS = 0 }
      if (BRIDGE3DWS == undefined) {
        BRIDGE3DWS = 0 }
    
      document.getElementById("BRIDGE3W").innerHTML = `<span>${BRIDGE3W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3L").innerHTML = `<span>${BRIDGE3L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3WLR").innerHTML = `<span>${Math.round((BRIDGE3W / BRIDGE3L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE3K").innerHTML = `<span>${BRIDGE3K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3D").innerHTML = `<span>${BRIDGE3D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3KDR").innerHTML = `<span>${Math.round((BRIDGE3K / BRIDGE3D) * 100) / 100}</span>`;


      var BRIDGE4W = hypixelData.player.stats.Duels.bridge_four_wins;
      var BRIDGE4L = hypixelData.player.stats.Duels.bridge_four_losses;
      var BRIDGE4K = hypixelData.player.stats.Duels.bridge_four_bridge_kills;
      var BRIDGE4D = hypixelData.player.stats.Duels.bridge_four_bridge_deaths;
      var BRIDGE4CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_four;
      var BRIDGE4BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_four;
      var BRIDGE4DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_four;

      if (BRIDGE4W == undefined) {
        BRIDGE4W = 0 }
      if (BRIDGE4L == undefined) {
        BRIDGE4L = 0 }
      if (BRIDGE4K == undefined) {
        BRIDGE4K = 0 }
      if (BRIDGE4D == undefined) {
        BRIDGE4D = 0 }
      if (BRIDGE4CWS == undefined) {
        BRIDGE4CWS = 0 }
      if (BRIDGE4BWS == undefined) {
        BRIDGE4BWS = 0 }
      if (BRIDGE4DWS == undefined) {
        BRIDGE4DWS = 0 }
    
      document.getElementById("BRIDGE4W").innerHTML = `<span>${BRIDGE4W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4L").innerHTML = `<span>${BRIDGE4L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4WLR").innerHTML = `<span>${Math.round((BRIDGE4W / BRIDGE4L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE4K").innerHTML = `<span>${BRIDGE4K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4D").innerHTML = `<span>${BRIDGE4D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4KDR").innerHTML = `<span>${Math.round((BRIDGE4K / BRIDGE4D) * 100) / 100}</span>`;
      document.getElementById("BRIDGE4CWS").innerHTML = `<span>${BRIDGE4CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4BWS").innerHTML = `<span>${BRIDGE4BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE4DWS").innerHTML = `<span>${BRIDGE4DWS.toLocaleString('en-US')}</span>`;


      var BRIDGE2222W = hypixelData.player.stats.Duels.bridge_2v2v2v2_wins;
      var BRIDGE2222L = hypixelData.player.stats.Duels.bridge_2v2v2v2_losses;
      var BRIDGE2222K = hypixelData.player.stats.Duels.bridge_2v2v2v2_bridge_kills;
      var BRIDGE2222D = hypixelData.player.stats.Duels.bridge_2v2v2v2_bridge_deaths;
      var BRIDGE2222CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_2v2v2v2;
      var BRIDGE2222BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_2v2v2v2;
      var BRIDGE2222DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_2v2v2v2;

      if (BRIDGE2222W == undefined) {
        BRIDGE2222W = 0 }
      if (BRIDGE2222L == undefined) {
        BRIDGE2222L = 0 }
      if (BRIDGE2222K == undefined) {
        BRIDGE2222K = 0 }
      if (BRIDGE2222D == undefined) {
        BRIDGE2222D = 0 }
      if (BRIDGE2222CWS == undefined) {
        BRIDGE2222CWS = 0 }
      if (BRIDGE2222BWS == undefined) {
        BRIDGE2222BWS = 0 }
      if (BRIDGE2222DWS == undefined) {
        BRIDGE2222DWS = 0 }
    
      document.getElementById("BRIDGE2222W").innerHTML = `<span>${BRIDGE2222W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222L").innerHTML = `<span>${BRIDGE2222L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222WLR").innerHTML = `<span>${Math.round((BRIDGE2222W / BRIDGE2222L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE2222K").innerHTML = `<span>${BRIDGE2222K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222D").innerHTML = `<span>${BRIDGE2222D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222KDR").innerHTML = `<span>${Math.round((BRIDGE2222K / BRIDGE2222D) * 100) / 100}</span>`;
      document.getElementById("BRIDGE2222CWS").innerHTML = `<span>${BRIDGE2222CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222BWS").innerHTML = `<span>${BRIDGE2222BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE2222DWS").innerHTML = `<span>${BRIDGE2222DWS.toLocaleString('en-US')}</span>`;


      var BRIDGE3333W = hypixelData.player.stats.Duels.bridge_3v3v3v3_wins;
      var BRIDGE3333L = hypixelData.player.stats.Duels.bridge_3v3v3v3_losses;
      var BRIDGE3333K = hypixelData.player.stats.Duels.bridge_3v3v3v3_bridge_kills;
      var BRIDGE3333D = hypixelData.player.stats.Duels.bridge_3v3v3v3_bridge_deaths;
      var BRIDGE3333CWS = hypixelData.player.stats.Duels.current_winstreak_mode_bridge_3v3v3v3;
      var BRIDGE3333BWS = hypixelData.player.stats.Duels.best_winstreak_mode_bridge_3v3v3v3;
      var BRIDGE3333DWS = hypixelData.player.stats.Duels.duels_winstreak_best_bridge_3v3v3v3;

      if (BRIDGE3333W == undefined) {
        BRIDGE3333W = 0 }
      if (BRIDGE3333L == undefined) {
        BRIDGE3333L = 0 }
      if (BRIDGE3333K == undefined) {
        BRIDGE3333K = 0 }
      if (BRIDGE3333D == undefined) {
        BRIDGE3333D = 0 }
      if (BRIDGE3333CWS == undefined) {
        BRIDGE3333CWS = 0 }
      if (BRIDGE3333BWS == undefined) {
        BRIDGE3333BWS = 0 }
      if (BRIDGE3333DWS == undefined) {
        BRIDGE3333DWS = 0 }
    
      document.getElementById("BRIDGE3333W").innerHTML = `<span>${BRIDGE3333W.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333L").innerHTML = `<span>${BRIDGE3333L.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333WLR").innerHTML = `<span>${Math.round((BRIDGE3333W / BRIDGE3333L) * 100) / 100}</span>`;
      document.getElementById("BRIDGE3333K").innerHTML = `<span>${BRIDGE3333K.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333D").innerHTML = `<span>${BRIDGE3333D.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333KDR").innerHTML = `<span>${Math.round((BRIDGE3333K / BRIDGE3333D) * 100) / 100}</span>`;
      document.getElementById("BRIDGE3333CWS").innerHTML = `<span>${BRIDGE3333CWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333BWS").innerHTML = `<span>${BRIDGE3333BWS.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGE3333DWS").innerHTML = `<span>${BRIDGE3333DWS.toLocaleString('en-US')}</span>`;

      
      var BRIDGECTFW = hypixelData.player.stats.Duels.capture_threes_wins;
      var BRIDGECTFL = hypixelData.player.stats.Duels.capture_threes_losses;
      var BRIDGECTFK = hypixelData.player.stats.Duels.capture_threes_bridge_kills;
      var BRIDGECTFD = hypixelData.player.stats.Duels.capture_threes_bridge_deaths;
      var BRIDGECTFCWS = hypixelData.player.stats.Duels.current_winstreak_mode_capture_threes;
      var BRIDGECTFBWS = hypixelData.player.stats.Duels.best_winstreak_mode_capture_threes;
      var BRIDGECTFDWS = hypixelData.player.stats.Duels.duels_winstreak_best_capture_threes;

      if (BRIDGECTFW == undefined) {
        BRIDGECTFW = 0 }
      if (BRIDGECTFL == undefined) {
        BRIDGECTFL = 0 }
      if (BRIDGECTFK == undefined) {
        BRIDGECTFK = 0 }
      if (BRIDGECTFD == undefined) {
        BRIDGECTFD = 0 }
      if (BRIDGECTFCWS == undefined) {
        BRIDGECTFCWS = 0 }
      if (BRIDGECTFBWS == undefined) {
        BRUDGECTFBWS = 0 }
      if (BRIDGECTFDWS == undefined) {
        BRIDGECTFDWS = 0 }
    
      document.getElementById("BRIDGECTFW").innerHTML = `<span>${BRIDGECTFW.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGECTFL").innerHTML = `<span>${BRIDGECTFL.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGECTFWLR").innerHTML = `<span>${Math.round((BRIDGECTFW / BRIDGECTFL) * 100) / 100}</span>`;
      document.getElementById("BRIDGECTFK").innerHTML = `<span>${BRIDGECTFK.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGECTFD").innerHTML = `<span>${BRIDGECTFD.toLocaleString('en-US')}</span>`;
      document.getElementById("BRIDGECTFKDR").innerHTML = `<span>${Math.round((BRIDGECTFK / BRIDGECTFD) * 100) / 100}</span>`;


      var PARKOURW = hypixelData.player.stats.Duels.parkour_eight_wins;
      var PARKOURL = hypixelData.player.stats.Duels.parkour_eight_losses;
      var PARKOURK = hypixelData.player.stats.Duels.parkour_eight_kills;
      var PARKOURD = hypixelData.player.stats.Duels.parkour_eight_deaths;
      var PARKOURCWS = hypixelData.player.stats.Duels.current_winstreak_mode_parkour_eight;
      var PARKOURBWS = hypixelData.player.stats.Duels.best_winstreak_mode_parkour_eight;
      var PARKOURDWS = hypixelData.player.stats.Duels.duels_winstreak_best_parkour_eight;

      if (PARKOURW == undefined) {
        PARKOURW = 0 }
      if (PARKOURL == undefined) {
        PARKOURL = 0 }
      if (PARKOURK == undefined) {
        PARKOURK = 0 }
      if (PARKOURD == undefined) {
        PARKOURD = 0 }
      if (PARKOURCWS == undefined) {
        PARKOURCWS = 0 }
      if (PARKOURBWS == undefined) {
        PARKOURBWS = 0 }
      if (PARKOURDWS == undefined) {
        PARKOURDWS = 0 }
    
      document.getElementById("PARKOURW").innerHTML = `<span>${PARKOURW.toLocaleString('en-US')}</span>`;
      document.getElementById("PARKOURL").innerHTML = `<span>${PARKOURL.toLocaleString('en-US')}</span>`;
      document.getElementById("PARKOURWLR").innerHTML = `<span>${Math.round((PARKOURW / PARKOURL) * 100) / 100}</span>`;
      document.getElementById("PARKOURK").innerHTML = `<span>${PARKOURK.toLocaleString('en-US')}</span>`;
      document.getElementById("PARKOURD").innerHTML = `<span>${PARKOURD.toLocaleString('en-US')}</span>`;
      document.getElementById("PARKOURKDR").innerHTML = `<span>${Math.round((PARKOURK / PARKOURD) * 100) / 100}</span>`;


      var BOXINGW = hypixelData.player.stats.Duels.boxing_duel_wins;
      var BOXINGL = hypixelData.player.stats.Duels.boxing_duel_losses;
      var BOXINGK = hypixelData.player.stats.Duels.boxing_duel_kills;
      var BOXINGD = hypixelData.player.stats.Duels.boxing_duel_deaths;
      var BOXINGCWS = hypixelData.player.stats.Duels.current_winstreak_mode_boxing_duel;
      var BOXINGBWS = hypixelData.player.stats.Duels.best_winstreak_mode_boxing_duel;
      var BOXINGDWS = hypixelData.player.stats.Duels.duels_winstreak_best_boxing_duel;

      if (BOXINGW == undefined) {
        BOXINGW = 0 }
      if (BOXINGL == undefined) {
        BOXINGL = 0 }
      if (BOXINGK == undefined) {
        BOXINGK = 0 }
      if (BOXINGD == undefined) {
        BOXINGD = 0 }
      if (BOXINGCWS == undefined) {
        BOXINGCWS = 0 }
      if (BOXINGBWS == undefined) {
        BOXINGBWS = 0 }
      if (BOXINGDWS == undefined) {
        BOXINGDWS = 0 }
    
      document.getElementById("BOXINGW").innerHTML = `<span>${BOXINGW.toLocaleString('en-US')}</span>`;
      document.getElementById("BOXINGL").innerHTML = `<span>${BOXINGL.toLocaleString('en-US')}</span>`;
      document.getElementById("BOXINGWLR").innerHTML = `<span>${Math.round((BOXINGW / BOXINGL) * 100) / 100}</span>`;
      document.getElementById("BOXINGK").innerHTML = `<span>${BOXINGK.toLocaleString('en-US')}</span>`;
      document.getElementById("BOXINGD").innerHTML = `<span>${BOXINGD.toLocaleString('en-US')}</span>`;
      document.getElementById("BOXINGKDR").innerHTML = `<span>${Math.round((BOXINGK / BOXINGD) * 100) / 100}</span>`;


      var ARENAW = hypixelData.player.stats.Duels.duel_arena_wins;
      var ARENAL = hypixelData.player.stats.Duels.duel_arena_losses;
      var ARENAK = hypixelData.player.stats.Duels.duel_arena_kills;
      var ARENAD = hypixelData.player.stats.Duels.duel_arena_deaths;
      var ARENACWS = hypixelData.player.stats.Duels.current_winstreak_mode_duel_arena;
      var ARENABWS = hypixelData.player.stats.Duels.best_winstreak_mode_duel_arena;
      var ARENABWS = hypixelData.player.stats.Duels.duels_winstreak_best_duel_arena;

      if (ARENAW == undefined) {
        ARENAW = 0 }
      if (ARENAL == undefined) {
        ARENAL = 0 }
      if (ARENAK == undefined) {
        ARENAK = 0 }
      if (ARENAD == undefined) {
        ARENAD = 0 }
      if (BOXINGCWS == undefined) {
        BOXINGCWS = 0 }
      if (BOXINGBWS == undefined) {
        BOXINGBWS = 0 }
      if (BOXINGDWS == undefined) {
        BOXINGDWS = 0 }
    
      document.getElementById("ARENAW").innerHTML = `<span>${ARENAW.toLocaleString('en-US')}</span>`;
      document.getElementById("ARENAL").innerHTML = `<span>${ARENAL.toLocaleString('en-US')}</span>`;
      document.getElementById("ARENAWLR").innerHTML = `<span>${Math.round((ARENAW / ARENAL) * 100) / 100}</span>`;
      document.getElementById("ARENAK").innerHTML = `<span>${ARENAK.toLocaleString('en-US')}</span>`;
      document.getElementById("ARENAD").innerHTML = `<span>${ARENAD.toLocaleString('en-US')}</span>`;
      document.getElementById("ARENAKDR").innerHTML = `<span>${Math.round((ARENAK / ARENAD) * 100) / 100}</span>`;

  /* GUILD */
      
      const findGuildUrl = `https://api.hypixel.net/findGuild?key=${KEY}&byUuid=${UUID}`;
      const guildInfoUrl = `https://api.hypixel.net/guild?key=${KEY}&id=`;
          
      const findresponse = await fetch(findGuildUrl);
      const finddata = await findresponse.json();
      
      var GuildID = finddata.guild;
      
      if (GuildID == null) {
          document.getElementById("guildTag").innerHTML = '<span style="color:#FFFFFF">This player is not in a guild.</span>';
      
      } else {     
          
          const inforesponse = await fetch(guildInfoUrl + GuildID);
          const infodata = await inforesponse.json();
          
          var guildName = infodata.guild.name;
          var tag = infodata.guild.tag;
          var tagColor = infodata.guild.tagColor;
          var guildLevel = infodata.guild.exp;
          var memberList = infodata.guild.members;
          var count = memberList.length;
          var member = memberList.find(memberList => memberList.uuid == UUID);
          var guildRank = member.rank;
          var unix = member.joined;
          var date = new Date(unix).toLocaleDateString("en-us");
          var guildColor = '';
          
      }
      
      guildName = `<span style="color:#FFFFFF;font-weight:bold">${guildName}</span>`;
      
      if (tag == undefined) {
          tag = '';
      } else if (tag == '§a1§e2§c3§7') {
          tag = '<span style="color:#555555">[</span><span style="color:#55FF55">1</span><span style="color:#FFFF55">2</span><span style="color:#FF5555">3</span><span style="color:#555555">]</span>';
      } else if (tag == '§5❤§7') {
          tag = '<span style="color:#555555">[</span><span style="color:#FF5555">❤</span><span style="color:#555555">]</span>';
      } else if (tag == '§2ⓢⓦⓐⓜⓟ§6') {
          tag = '<span style="color:#FFAA00">[</span><span style="color:#00AA00">ⓢⓦⓐⓜⓟ</span><span style="color:#FFAA00">]</span>';
      } else {

        switch (tagColor) {
          case 'GRAY':
            tag = `<span style="color:#AAAAAA">[${tag}]</span>`;
            break;
          case 'DARK_AQUA':
            tag = `<span style="color:#00AAAA">[${tag}]</span>`;
            break;
          case 'DARK_GREEN':
            tag = `<span style="color:#00AA00">[${tag}]</span>`;
            break;
          case 'YELLOW':
            tag = `<span style="color:#FFFF55">[${tag}]</span>`;
            break;
          case 'GOLD':
            tag = `<span style="color:#FFAA00">[${tag}]</span>`;
            break;
          default:
           tag = `<span style="color:#AAAAAA">[${tag}]</span>`;
            break;
        }
      } 

      switch (tagColor) {
        case 'GRAY':
            guildColor = '<span style="color:#AAAAAA">';
            break;
        case 'DARK_AQUA':
            guildColor = '<span style="color:#00AAAA">';
            break;
        case 'DARK_GREEN':
            guildColor = '<span style="color:#00AA00">';
            break;
        case 'YELLOW':
            guildColor = '<span style="color:#FFFF55">';
            break;
        case 'GOLD':
            guildColor = '<span style="color:#FFAA00">';
            break;
        default:
            guildColor = '<span style="color:#AAAAAA">';
            break;
      }
      
      if (guildLevel < 100000) {
          guildLevel = '0';
      } else if (guildLevel < 250000) {
          guildLevel = '1';
      } else if (guildLevel < 500000) {
          guildLevel = '2';
      } else if (guildLevel < 1000000) {
          guildLevel = '3';
      } else if (guildLevel < 1750000) {
          guildLevel = '4';
      } else if (guildLevel < 2750000) {
          guildLevel = '5';
      } else if (guildLevel < 4000000) {
          guildLevel = '6';
      } else if (guildLevel < 5500000) {
          guildLevel = '8';
      } else if (guildLevel < 7500000) {
          guildLevel = '9';
      } else {
          if (guildLevel < 15000000) {
              guildLevel = `${Math.floor((guildLevel - 7500000) / 2500000) + 9}`;
          } else {
              guildLevel = `${Math.floor((guildLevel - 15000000) / 3000000) + 12}`;
          }
      }
      
      document.getElementById("previousNames").innerHTML = `${guildName} ${tag} • <span style="color:#FFFFFF;font-weight:bold">Guild Level: </span>${guildColor}${guildLevel}</span> • <span style="color:#FFFFFF;font-weight:bold">Members: </span>${guildColor}${count}/125</span> • <span style="color:#FFFFFF;font-weight:bold">Guild Rank: </span>${guildColor}${guildRank}</span> • <span style="color:#FFFFFF;font-weight:bold">Date Joined: </span>${guildColor}${date}</span>`;

  /* ACTIVE TITLE */

      var PREFIX;
      var PREFIXCOLOR = hypixelData.player.stats.Duels.equipped_prefix_color;
      var PREFIXICON = hypixelData.player.stats.Duels.equippeed_prefix_icon;

      switch (PREFIXCOLOR) {
        case undefined:
          PREFIXCOLOR = '<span style="color:#FFAA00">';
          break;
        case 'Gold':
          PREFIXCOLOR = '<span style=+"color:FFAAA00">';
          break;
        case 'White':
          PREFIXCOLOR = '<span style="color:FFFFFF">';
          break;
        case 'Red':
          PREFIXCOLOR = '<span style="color:FF5555">';
          break;
        case 'Aqua':
          PREFIXCOLOR = '<span style="color:55FFFF">';
          break;
        case 'Yellow':
          PREFIXCOLOR = '<span style="color:FFFF55">';
          break;
        case 'Green':
          PREFIXCOLOR = '<span style="color:55FF55">';
          break;
        case 'Blue':
          PREFIXCOLOR = '<span style="color:5555FF">';
          break;
        case 'Purple':
          PREFIXCOLOR = '<span style="color:FF55FF">';
          break;
        case 'Black':
          PREFIXCOLOR = '<span style="color:000000">';
          break;
      };


  } catch (error) {
      console.log(error);
    };
};

getData();