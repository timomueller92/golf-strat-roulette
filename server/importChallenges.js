const axios = require('axios');

const challenges = [
  "Spiele den nächsten Schlag mit einem Putter.",
  "Schlage mit dem Sand Wedge vom Abschlag.",
  "Du darfst beim nächsten Schlag nur einhändig schlagen.",
  "Verwende dein Holz 3 für jeden Schlag in diesem Loch.",
  "Spiele den Ball rückwärts (Rückhand).",
  "Benutze dein schlechtestes Eisen für den nächsten Schlag.",
  "Du musst auf einem Bein stehen beim Putten.",
  "Spiele mit geschlossenen Augen (Mitspieler hilft beim Ausrichten).",
  "Lege den Ball 10 Meter zurück vom normalen Spot.",
  "Benutze nur halbe Schläge dieses Loch.",
  "Tausche deinen Schläger mit einem Mitspieler.",
  "Jeder Schlag muss kommentiert werden wie im Fernsehen.",
  "Spiele den Ball mit der Rückseite des Schlägerkopfs.",
  "Nutze einen Schläger deiner Wahl – aber nur einmal pro Loch.",
  "Du musst jedes Mal eine Pose machen, bevor du schlägst.",
  "Du darfst nur Chips verwenden (auch vom Tee).",
  "Spiele das Loch nur mit Wedges.",
  "Jeder Schlag muss über das Knie gehen (Chip-Style).",
  "Trinke einen Shot vor dem Abschlag.",
  "Benutze dein Sand Wedge auf dem Green.",
  "Du darfst nicht sprechen bis der Ball eingelocht ist.",
  "Spiele barfuß dieses Loch.",
  "Spiele das Loch beidhändig – aber über Kreuz (rechte Hand links, etc).",
  "Du darfst keine Probeschwünge machen.",
  "Benutze nur Driver – auch auf dem Green.",
  "Du musst den Ball in der Hocke spielen.",
  "Spiele das Loch rückwärts (vom Ziel weg).",
  "Benutze die Schläger anderer Flight-Mitglieder.",
  "Verwende die linke Hand für Rechtshänder – oder umgekehrt.",
  "Du darfst den Ball nicht neu ausrichten – wie er liegt, so liegt er.",
  "Du musst singen, während du schlägst.",
  "Triff den Ball mit der Schlägerkante.",
  "Verwende das Holz 5 – für alle Schläge.",
  "Du darfst den Ball vor dem Schlag nicht anschauen.",
  "Verwende nur Eisen mit gerader Zahl.",
  "Du darfst maximal 50% Kraft verwenden.",
  "Der Ball muss aus einem Bunker gespielt werden (leg ihn rein!).",
  "Du musst mit links schlagen (auch als Rechtshänder).",
  "Spiele mit Handschuh auf beiden Händen.",
  "Putte mit einem Eisen.",
  "Der nächste Schlag muss mit geschlossenen Augen gespielt werden.",
  "Das Loch darf nur im Rückwärtsgang absolviert werden.",
  "Spiele mit Regenschirm in der Hand.",
  "Benutze einen Kinder-Golfschläger (wenn vorhanden).",
  "Spiele auf einem Bein vom Tee.",
  "Tausche Driver gegen Putter für dieses Loch.",
  "Der Schlag muss aus der Hocke erfolgen.",
  "Du darfst nur mit dem Handrücken schlagen.",
  "Schlage mit dem Griff statt mit dem Schlägerkopf (vorsichtig!).",
  "Trinke einen Shot und mache 10 Kniebeugen vor dem Abschlag."
];

async function importChallenges() {
  for (const text of challenges) {
    try {
      const res = await axios.post('https://golf-strat-roulette.onrender.com/api/challenges', { text });
      console.log(`✅ Gespeichert: ${text}`);
    } catch (err) {
      console.error(`❌ Fehler bei: ${text}`, err.message);
    }
  }
}

importChallenges();
