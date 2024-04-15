const TitleInput = sessionStorage.getItem(`INPUT`);
const TitleKey = 'b3909a29-acb5-4910-a753-f3b18ad7bb41'

async function getAllTitles() {
    const playerdbUrl = `https://playerdb.co/api/player/minecraft/${TitleInput}`;
    const hypixelUrl = `https://api.hypixel.net/player?key=${TitleKey}&uuid=`;

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

        let RomanNumeral = "";
        var Wins;

        let Overall = [["", "None", 0, 0, "wins"]]
        let Gamemodes = [
            ["UHC", "None", 0, 0, "uhc_duel_wins", "uhc_doubles_wins", "uhc_four_wins", "uhc_meetup_wins"],
            ["SkyWars", "None", 0, 0, "sw_duel_wins", "sw_doubles_wins"],
            ["MW", "None", 0, 0, "mw_duel_wins", "mw_doubles_wins"],
            ["Blitz", "None", 0, 0, "blitz_duel_wins"],
            ["OP", "None", 0, 0, "op_duel_wins", "op_doubles_wins"],
            ["Classic", "None", 0, 0, "classic_duel_wins"],
            ["Bow", "None", 0, 0, "bow_duel_wins"],
            ["NoDebuff", "None", 0, 0, "potion_duel_wins"],
            ["Combo" , "None", 0, 0, "combo_duel_wins"],
            ["TNT", "None", 0, 0, "bowspleef_duel_wins"],
            ["Sumo", "None", 0, 0, "sumo_duel_wins"],
            ["Bridge", "None", 0, 0, "bridge_duel_wins", "bridge_doubles_wins", "bridge_threes_wins", "bridge_four_wins", "bridge_2v2v2v2_wins", "bridge_3v3v3v3_wins", "capture_threes_wins", "capture_duel_wins"],
            ["Parkour", "None", 0, 0, "parkour_eight_wins"],
            ["Boxing", "None", 0, 0, "boxing_duel_wins"]
        ]

        GetTitles(Overall, true);
        GetTitles(Gamemodes, false);

        document.getElementById("OverallTitle").innerHTML = Overall[0][0] + Overall[0][1] + " " + Overall[0][2] + " " + Overall[0][3] + "</span><br>";
        for (let x=0; x <= Gamemodes.length - 1; x++) {
            document.getElementById("GamemodeTitles").innerHTML += Gamemodes[x][0] + Gamemodes[x][1] + " " + Gamemodes[x][2] + " " + Gamemodes[x][3] + "</span><br>";
        }
    
        function GetTitles(Titles, IsOverall) {
            var Type = 1;
            if (IsOverall == true) {
                Type = 2;
            }
            for (var i = 0; i <= Titles.length - 1; i++) {
                for (var j = 4; j <= Titles[i].length - 1; j++) {
                    let Mode = Titles[i][j];
                    Wins = hypixelData.player.stats.Duels[Mode] || 0;
                    Titles[i][3] += Wins;
                }
                if (Titles[i][3] >= 100000*Type) {
                    Titles[i][1] = "ASCENDED";
                    Titles[i][2] += 1;
                    let Increment = 10000*Type;
                    while (Titles[i][3] >= 100000*Type + Increment) {
                        Increment += 10000*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 50000*Type) {
                    Titles[i][1] = "DIVINE";
                    Titles[i][2] += 1;
                    let Increment = 10000*Type;
                    while (Titles[i][3] >= 50000*Type + Increment) {
                        Increment += 10000*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 25000*Type) {
                    Titles[i][1] = "CELESTIAL";
                    Titles[i][2] += 1;
                    let Increment = 5000*Type;
                    while (Titles[i][3] >= 25000*Type + Increment) {
                        Increment += 5000*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 10000*Type) {
                    Titles[i][1] = "Godlike";
                    Titles[i][2] += 1;
                    let Increment = 3000*Type;
                    while (Titles[i][3] >= 10000*Type + Increment) {
                        Increment += 3000*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 5000*Type) {
                    Titles[i][1] = "Grandmaster";
                    Titles[i][2] += 1;
                    let Increment = 1000*Type;
                    while (Titles[i][3] >= 5000*Type + Increment) {
                        Increment += 1000*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 2000*Type) {
                    Titles[i][1] = "Legend";
                    Titles[i][2] += 1;
                    let Increment = 600*Type;
                    while (Titles[i][3] >= 2000*Type + Increment) {
                        Increment += 600*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 1000*Type) {
                    Titles[i][1] = "Master";
                    Titles[i][2] += 1;
                    let Increment = 200*Type;
                    while (Titles[i][3] >= 1000*Type + Increment) {
                        Increment += 200*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 500*Type) {
                    Titles[i][1] = "Diamond";
                    Titles[i][2] += 1;
                    let Increment = 100*Type;
                    while (Titles[i][3] >= 500*Type + Increment) {
                        Increment += 100*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 250*Type) {
                    Titles[i][1] = "Gold";
                    Titles[i][2] += 1;
                    let Increment = 50*Type;
                    while (Titles[i][3] >= 250*Type + Increment) {
                        Increment += 50*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 100*Type) {
                    Titles[i][1] = "Iron";
                    Titles[i][2] += 1;
                    let Increment = 30*Type;
                    while (Titles[i][3] >= 100*Type + Increment) {
                        Increment += 30*Type;
                        Titles[i][2] += 1;
                    }
                } else if (Titles[i][3] >= 50*Type) {
                    Titles[i][1] = "Rookie";
                    Titles[i][2] += 1;
                    let Increment = 10*Type;
                    while (Titles[i][3] >= 50*Type + Increment) {
                        Increment += 10*Type;
                        Titles[i][2] += 1;
                    }
                } else {
                    Titles[i][2] = 1;
                }
                switch (Titles[i][2]) {
                    case 1:
                        RomanNumeral = "";
                        break;
                    case 2:
                        RomanNumeral = "II";
                        break;
                    case 3:
                        RomanNumeral = "III";
                        break;
                    case 4:
                        RomanNumeral = "IV";
                        break;
                    case 5:
                        RomanNumeral = "V";
                        break;
                    case 6:
                        RomanNumeral = "VI";
                        break;
                    case 7:
                        RomanNumeral = "VII";
                        break;
                    case 8:
                        RomanNumeral = "VIII";
                        break;
                    case 9:
                        RomanNumeral = "IX";
                        break;
                    case 10:
                        RomanNumeral = "X";
                        break;
                    case 11:
                        RomanNumeral = "XI";
                        break;
                    case 12:
                        RomanNumeral = "XII";
                        break;
                    case 13:
                        RomanNumeral = "XIII";
                        break;
                    case 14:
                        RomanNumeral = "XIV";
                        break;
                    case 15:
                        RomanNumeral = "XV";
                        break;
                    case 16:
                        RomanNumeral = "XVI";
                        break;
                    case 17:
                        RomanNumeral = "XVII";
                        break;
                    case 18:
                        RomanNumeral = "XVIII";
                        break;
                    case 19:
                        RomanNumeral = "XIX";
                        break;
                    case 20:
                        RomanNumeral = "XX";
                        break;
                    case 21:
                        RomanNumeral = "XXI";
                        break;
                    case 22:
                        RomanNumeral = "XXII";
                        break;
                    case 23:
                        RomanNumeral = "XXIII";
                        break;
                    case 24:
                        RomanNumeral = "XXIV";
                        break;
                    case 25:
                        RomanNumeral = "XXV";
                        break;
                    case 26:
                        RomanNumeral = "XXVI";
                        break;
                    case 27:
                        RomanNumeral = "XXVII";
                        break;
                    case 28:
                        RomanNumeral = "XXVIII";
                        break;
                    case 29:
                        RomanNumeral = "XXIX";
                        break;
                    case 30:
                        RomanNumeral = "XXX";
                        break;
                    case 31:
                        RomanNumeral = "XXXI";
                        break;
                    case 32:
                        RomanNumeral = "XXXII";
                        break;
                    case 33:
                        RomanNumeral = "XXXIII";
                        break;
                    case 34:
                        RomanNumeral = "XXXIV";
                        break;
                    case 35:
                        RomanNumeral = "XXXV";
                        break;
                    case 36:
                        RomanNumeral = "XXXVI";
                        break;
                    case 37:
                        RomanNumeral = "XXXVII";
                        break;
                    case 38:
                        RomanNumeral = "XXXVIII";
                        break;
                    case 39:
                        RomanNumeral = "XXXIX";
                        break;
                    case 40:
                        RomanNumeral = "XL";
                        break;
                    case 41:
                        RomanNumeral = "XLI";
                        break;
                    case 42:
                        RomanNumeral = "XLII";
                        break;
                    case 43:
                        RomanNumeral = "XLIII";
                        break;
                    case 44:
                        RomanNumeral = "XLIV";
                        break;
                    case 45:
                        RomanNumeral = "XLV";
                        break;
                    case 46:
                        RomanNumeral = "XLVI";
                        break;
                    case 47:
                        RomanNumeral = "XLVII";
                        break;
                    case 48:
                        RomanNumeral = "XLVIII";
                        break;
                    case 49:
                        RomanNumeral = "XLIX";
                        break;
                    case 50:
                        RomanNumeral = "L";
                        break;
                }
                Titles[i][2] = RomanNumeral;

                let Format = '';
                switch (Titles[i][1]) {
                    case "ASCENDED":
                        Format = `<span style="color:#FF5555; font-weight:bold">`;
                        break;
                    case "DIVINE":
                        Format = `<span style="color:#FF55FF; font-weight:bold">`;
                        break;
                    case "CELESTIAL":
                        Format = `<span style="color:#55FFFF; font-weight:bold">`;
                        break;
                    case "Godlike":
                        Format = `<span style="color:#AA00AA; font-weight:bold">`;
                        break;
                    case "Grandmaster":
                        Format = `<span style="color:#FFFF55; font-weight:bold">`;
                        break;
                    case "Legend":
                        Format = `<span style="color:#AA0000; font-weight:bold">`;
                        break;
                    case "Master":
                        Format = `<span style="color:#00AA00">`;
                        break;
                    case "Diamond":
                        Format = `<span style="color:#00AAAA">`;
                        break;
                    case "Gold":
                        Format = `<span style="color:#FFAA00">`;
                        break;
                    case "Iron":
                        Format = `<span style="color:#FFFFFF">`;
                        break;
                    case "Rookie":
                        Format = `<span style="color:#999999">`;
                        break;
                    default:
                        Format = `<span style="color:#555555">`;
                        break;
                }
                if (Type == 1) {
                    Gamemodes[i].unshift(Format);
                } else {
                    Overall[0].unshift(Format);
                }
            }
        }
    } catch (error) {
      console.log(error);
    };
};
getAllTitles();