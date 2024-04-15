const PieInput = sessionStorage.getItem(`INPUT`);
const PieKey = 'b3909a29-acb5-4910-a753-f3b18ad7bb41'

async function getPieData() {
  const playerdbUrl = `https://playerdb.co/api/player/minecraft/${PieInput}`;
  const hypixelUrl = `https://api.hypixel.net/player?key=${PieKey}&uuid=`;

/* PLAYERDB */

  try {
        
    const response = await fetch(playerdbUrl);
    const playerdbData = await response.json();

    var PieDBUUID = playerdbData.data.player.raw_id;

  } catch (error) {
    console.log(error);
  } 

/* HYPIXEL */

  try {
        
    const response = await fetch(hypixelUrl + PieDBUUID);
    const hypixelData = await response.json();
    const PieIGN = hypixelData.player.displayname;
    const PieUUID = hypixelData.player.uuid;

  /* GAMEMODE STATS */

    var PieUHC1W = hypixelData.player.stats.Duels.uhc_duel_wins;
    var PieUHC2W = hypixelData.player.stats.Duels.uhc_doubles_wins;
    var PieUHC4W = hypixelData.player.stats.Duels.uhc_four_wins;
    var PieUHCDMW = hypixelData.player.stats.Duels.uhc_meetup_wins;
    var PieSW1W = hypixelData.player.stats.Duels.sw_duel_wins;
    var PieSW2W = hypixelData.player.stats.Duels.sw_doubles_wins;
    var PieMW1W = hypixelData.player.stats.Duels.mw_duel_wins;
    var PieMW2W = hypixelData.player.stats.Duels.mw_doubles_wins;
    var PieBLITZ1W = hypixelData.player.stats.Duels.blitz_duel_wins;
    var PieOP1W = hypixelData.player.stats.Duels.op_duel_wins;
    var PieOP2W = hypixelData.player.stats.Duels.op_doubles_wins;
    var PieCLASSIC1W = hypixelData.player.stats.Duels.classic_duel_wins;
    var PieBOW1W = hypixelData.player.stats.Duels.bow_duel_wins;
    var PieNDB1W = hypixelData.player.stats.Duels.potion_duel_wins;
    var PieCOMBO1W = hypixelData.player.stats.Duels.combo_duel_wins;
    var PieTNT1W = hypixelData.player.stats.Duels.bowspleef_duel_wins;
    var PieSUMO1W = hypixelData.player.stats.Duels.sumo_duel_wins;
    var PieBRIDGE1W = hypixelData.player.stats.Duels.bridge_duel_wins;
    var PieBRIDGE2W = hypixelData.player.stats.Duels.bridge_doubles_wins;
    var PieBRIDGE3W = hypixelData.player.stats.Duels.bridge_threes_wins;
    var PieBRIDGE4W = hypixelData.player.stats.Duels.bridge_four_wins;
    var PieBRIDGE2222W = hypixelData.player.stats.Duels.bridge_2v2v2v2_wins;
    var PieBRIDGE3333W = hypixelData.player.stats.Duels.bridge_3v3v3v3_wins;
    var PieBRIDGECTFW = hypixelData.player.stats.Duels.capture_threes_wins;
    var PiePARKOUR8W = hypixelData.player.stats.Duels.parkour_eight_wins;
    var PieBOXING1W = hypixelData.player.stats.Duels.boxing_duel_wins;
    var PieARENA32W = hypixelData.player.stats.Duels.duel_arena_wins;

    if (PieUHC1W == undefined) {
      PieUHC1W = 0} ;
    if (PieUHC2W == undefined) {
      PieUHC2W = 0} ;
    if (PieUHC4W == undefined) {
      PieUHC4W = 0} ;
    if (PieSW1W == undefined) {
      PieSW1W = 0} ;
    if (PieSW2W == undefined) {
      PieSW2W = 0} ;
    if (PieMW1W == undefined) {
      PieMW1W = 0} ;
    if (PieMW2W == undefined) {
      PieMW2W = 0} ;
    if (PieBLITZ1W == undefined) {
      PieBLITZ1W = 0} ;
    if (PieOP1W == undefined) {
      PieOP1W = 0} ;
    if (PieOP2W == undefined) {
      PieOP2W = 0} ;
    if (PieCLASSIC1W == undefined) {
      PieCLASSIC1W = 0} ;
    if (PieBOW1W == undefined) {
      PieBOW1W = 0} ;
    if (PieNDB1W == undefined) {
      PieNDB1W = 0} ;
    if (PieCOMBO1W == undefined) {
      PieCOMBO1W = 0} ;
    if (PieTNT1W == undefined) {
      PieTNT1W = 0} ;
    if (PieSUMO1W == undefined) {
      PieSUMO1W = 0} ;
    if (PieBRIDGE1W == undefined) {
      PieBRIDGE1W = 0} ;
    if (PieBRIDGE2W == undefined) {
      PieBRIDGE2W = 0} ;
    if (PieBRIDGE3W == undefined) {
      PieBRIDGE3W = 0} ;
    if (PieBRIDGE4W == undefined) {
      PieBRIDGE4W = 0} ;
    if (PieBRIDGE2222W == undefined) {
      PieBRIDGE2222W = 0} ;
    if (PieBRIDGE3333W == undefined) {
      PieBRIDGE3333W = 0} ;
    if (PieBRIDGECTFW == undefined) {
      PieBRIDGECTFW = 0} ;
    if (PiePARKOUR8W == undefined) {
      PiePARKOUR8W = 0} ;
    if (PieBOXING1W == undefined) {
      PieBOXING1W = 0} ;
    if (PieARENA32W == undefined) {
      PieARENA32W = 0} ;

  /* OVERALL STATS */
    
    var PieWINS = hypixelData.player.stats.Duels.wins;

  /* PIE CHART */

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
      ['Gamemode', 'Number of Wins'],
      ['UHC', PieUHC1W + PieUHC2W + PieUHC4W + PieUHCDMW],
      ['Skywars', PieSW1W + PieSW2W],
      ['Megawalls', PieMW1W + PieMW2W],
      ['Blitz', PieBLITZ1W],
      ['OP', PieOP1W + PieOP2W],
      ['Classic', PieCLASSIC1W],
      ['Bow', PieBOW1W],
      ['Nodebuff', PieNDB1W],
      ['Combo', PieCOMBO1W],
      ['TNT', PieTNT1W],
      ['Sumo', PieSUMO1W],
      ['Bridge', PieBRIDGE1W + PieBRIDGE2W + PieBRIDGE3W + PieBRIDGE4W + PieBRIDGE2222W + PieBRIDGE3333W + PieBRIDGECTFW],
      ['Parkour', PiePARKOUR8W],
      ['Boxing', PieBOXING1W],
      ['Duel Arena', PieARENA32W]
    ]);

      var chart = new google.visualization.PieChart(document.getElementById('PieChart'));
      chart.draw(data, {
        width: 800,
        height: 500,
        chartArea: {
          width: '80%',
          height: '100%' },
        colors: ['#fe7b81', '#fe9184', '#fca782', '#fec080', '#fbd47c', '#fae67e', '#ecee7d', '#c4f082', '#90f193', '#63f0ac', '#5ce9be', '#5ed5d1', '66b3d9', '7280d1', '756ac7'],
        pieHole: 0.4,
        sliceVisibilityThreshold: 0.005,
        backgroundColor: '#191919',
        pieSliceBorderColor: '#191919',
        tooltip: { 
          trigger: 'selection' },
        legend: { 
          alignment: 'center',
          textStyle: {color: '#ffffff'},
          position: 'right' },
        titleTextStyle: {
          color: '#ffffff' },
        pieSliceText: 'percentage'
      });
    }
  } catch (error) {
      console.log(error);
    };
};

getPieData();