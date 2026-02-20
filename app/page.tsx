"use client";
import { useState, useRef } from "react";

interface Phrase {
  polish: string;
  pronunciation: string;
  english: string;
}

interface Episode {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  genre: string;
  description: string;
  phrases: Phrase[];
  audioFile?: string;
}

const episodes: Episode[] = [
  {
    id: 1, title: "The Grocery Store", subtitle: "Where it all began",
    emoji: "🛒", genre: "ACTION TRAILER",
    description: "Armed with nothing but a shopping list and raw determination, one person must navigate the Polish sklep.",
    phrases: [
      { polish: "Dzień dobry", pronunciation: "Jen DOH-bri", english: "Good day / Hello" },
      { polish: "Przepraszam, gdzie jest śmietana?", pronunciation: "Psheh-PRAH-shahm, GJEH yest shmyeh-TAH-nah", english: "Excuse me, where is the sour cream?" },
      { polish: "A gdzie jest twaróg?", pronunciation: "Ah GJEH yest TVAH-roog", english: "And where is the cottage cheese?" },
      { polish: "Ile to kosztuje?", pronunciation: "EE-leh toh kosh-TOO-yeh", english: "How much does this cost?" },
      { polish: "Kartą, proszę", pronunciation: "KAR-tow, PRO-sheh", english: "Card, please" },
      { polish: "Gotówką", pronunciation: "Go-TOOV-kow", english: "Cash" },
      { polish: "Dziękuję bardzo!", pronunciation: "Jen-KOO-yeh BAHR-dzo", english: "Thank you very much!" },
      { polish: "Do widzenia!", pronunciation: "Doh vee-DZEH-nyah", english: "Goodbye!" },
      { polish: "Miłego weekendu!", pronunciation: "Mee-WEH-go weekend-oo", english: "Have a great weekend!" },
    ],
  },
  {
    id: 2, title: "The Restaurant", subtitle: "Pierogi or perish",
    emoji: "🍽️", genre: "ACTION SEQUEL",
    description: "Menus with no pictures. Waiters who speak only Polish. One wrong word means herring instead of chicken.",
    phrases: [
      { polish: "Stolik dla dwóch osób, proszę", pronunciation: "STOH-leek dlah dvooh OH-soob, PRO-sheh", english: "Table for two, please" },
      { polish: "Co Pan poleca?", pronunciation: "Tsoh Pahn poh-LEH-tsah", english: "What do you recommend? (to a man)" },
      { polish: "Poproszę pierogi", pronunciation: "Poh-PRO-sheh pyeh-ROH-gee", english: "I'll have the pierogi" },
      { polish: "Poproszę piwo", pronunciation: "Poh-PRO-sheh PEE-voh", english: "Beer, please" },
      { polish: "Poproszę kawę", pronunciation: "Poh-PRO-sheh KAH-veh", english: "Coffee, please" },
      { polish: "Rachunek, proszę!", pronunciation: "Rah-HOO-nek, PRO-sheh", english: "The bill, please!" },
      { polish: "Było pyszne!", pronunciation: "BIH-woh PISH-neh", english: "It was delicious!" },
      { polish: "Reszty nie trzeba", pronunciation: "RESH-tih nyeh TSHEH-bah", english: "Keep the change" },
    ],
  },
  {
    id: 3, title: "Lost in Poland", subtitle: "11 PM. Phone dead. No map.",
    emoji: "🌙", genre: "THRILLER",
    description: "The streets are empty. Your phone is dead. You have one chance to find your way back to the hotel.",
    phrases: [
      { polish: "Jak dojść do hotelu?", pronunciation: "Yahk DOISH-ch doh hoh-TEH-loo", english: "How do I get to the hotel?" },
      { polish: "Prosto", pronunciation: "PROH-stoh", english: "Straight ahead" },
      { polish: "W lewo", pronunciation: "Vleh-voh", english: "Turn left" },
      { polish: "W prawo", pronunciation: "Vprah-voh", english: "Turn right" },
      { polish: "Za rogiem", pronunciation: "Zah ROH-gyem", english: "Around the corner" },
      { polish: "Do hotelu, proszę", pronunciation: "Doh hoh-TEH-loo, PRO-sheh", english: "To the hotel, please" },
      { polish: "Ile będzie kosztować?", pronunciation: "EE-leh BEN-jeh kosh-TOH-vach", english: "How much will it cost?" },
      { polish: "Jak daleko to jest?", pronunciation: "Yahk dah-LEH-koh toh yest", english: "How far is it?" },
    ],
  },
  {
    id: 4, title: "Making Friends", subtitle: "Na zdrowie!",
    emoji: "🍻", genre: "ROMCOM",
    description: "A bar in Kraków. A stranger says Cześć. By the end of the night, you have a dinner invitation.",
    phrases: [
      { polish: "Cześć!", pronunciation: "Cheshch", english: "Hi! (casual)" },
      { polish: "Nie rozumiem", pronunciation: "Nyeh roh-ZOO-myem", english: "I don't understand" },
      { polish: "Nie mówię po polsku", pronunciation: "Nyeh MOO-vyeh poh POHL-skoo", english: "I don't speak Polish" },
      { polish: "Jestem z Holandii", pronunciation: "YES-tem z Hoh-LAHN-dee", english: "I'm from the Netherlands" },
      { polish: "Mam na imię...", pronunciation: "Mahm nah EE-myeh...", english: "My name is..." },
      { polish: "Miło mi!", pronunciation: "MEE-woh mee", english: "Nice to meet you!" },
      { polish: "Polska jest piękna!", pronunciation: "POHL-skah yest PYENK-nah", english: "Poland is beautiful!" },
      { polish: "Na zdrowie!", pronunciation: "Nah ZDROH-vyeh", english: "Cheers! (To health!)" },
    ],
  },
  {
    id: 5, title: "Emergency Mode", subtitle: "Headache. No ibuprofen. No Polish.",
    emoji: "🏥", genre: "SURVIVAL HORROR",
    description: "You wake up sick in Poland. Your mission: find the apteka, explain symptoms, survive.",
    phrases: [
      { polish: "Gdzie jest apteka?", pronunciation: "GJEH yest ahp-TEH-kah", english: "Where is the pharmacy?" },
      { polish: "Potrzebuję coś na ból głowy", pronunciation: "Poh-TSHEH-boo-yeh tsosh nah bool GWOH-vih", english: "I need something for a headache" },
      { polish: "Ból brzucha", pronunciation: "Bool BZHOO-hah", english: "Stomachache" },
      { polish: "Kaszel", pronunciation: "KAH-shel", english: "Cough" },
      { polish: "Gorączka", pronunciation: "Goh-RONCH-kah", english: "Fever" },
      { polish: "Dwa razy dziennie", pronunciation: "Dvah RAH-zih JYEN-nyeh", english: "Twice a day" },
      { polish: "Potrzebuję pomocy!", pronunciation: "Poh-TSHEH-boo-yeh poh-MOH-tsih", english: "I need help!" },
      { polish: "Proszę wezwać karetkę", pronunciation: "PRO-sheh VEZ-vahch kah-RET-keh", english: "Please call an ambulance" },
    ],
  },
  {
    id: 6, title: "The Polish Grocery Run", subtitle: "Śmietana or die trying",
    emoji: "🥛", genre: "HEIST FILM",
    description: "You enter a Polish grocery store in the Netherlands. The labels are in Polish. The cashier speaks Polish. You need śmietana, twaróg, and your dignity intact.",
    phrases: [
      // Time-of-day greetings
      { polish: "Dzień dobry", pronunciation: "Jen DOH-bri", english: "Good day (morning/afternoon)" },
      { polish: "Dobry wieczór", pronunciation: "DOH-bri VYEH-choor", english: "Good evening" },
      { polish: "Cześć!", pronunciation: "Cheshch", english: "Hi! (casual, any time)" },
      // Finding products
      { polish: "Przepraszam, szukam śmietany", pronunciation: "Psheh-PRAH-shahm, SHOO-kahm shmyeh-TAH-nih", english: "Excuse me, I'm looking for sour cream" },
      { polish: "Gdzie jest twaróg?", pronunciation: "GJEH yest TVAH-roog", english: "Where is the cottage cheese?" },
      { polish: "Czy jest śmietana osiemnastoprocentowa?", pronunciation: "Chih yest shmyeh-TAH-nah oh-shyem-NAHS-toh-proh-tsen-TOH-vah", english: "Do you have 18% sour cream?" },
      { polish: "Czy to jest świeże?", pronunciation: "Chih toh yest SHVYEH-zheh", english: "Is this fresh?" },
      // Paying
      { polish: "Ile płacę?", pronunciation: "EE-leh PWAH-tseh", english: "How much do I pay?" },
      { polish: "Kartą, proszę", pronunciation: "KAR-tow, PRO-sheh", english: "By card, please" },
      { polish: "Gotówką", pronunciation: "Go-TOOV-kow", english: "Cash" },
      { polish: "Czy mogę zapłacić kartą?", pronunciation: "Chih MOH-geh zah-PWAH-cheech KAR-tow", english: "Can I pay by card?" },
      { polish: "Czy jest paragon?", pronunciation: "Chih yest pah-RAH-gon", english: "Is there a receipt?" },
      { polish: "Poproszę reklamówkę", pronunciation: "Poh-PRO-sheh reh-klah-MOOV-keh", english: "A plastic bag, please" },
      // Thank you & goodbye
      { polish: "Dziękuję!", pronunciation: "Jen-KOO-yeh", english: "Thank you!" },
      { polish: "Dziękuję bardzo!", pronunciation: "Jen-KOO-yeh BAHR-dzo", english: "Thank you very much!" },
      { polish: "Do widzenia!", pronunciation: "Doh vee-DZEH-nyah", english: "Goodbye!" },
      { polish: "Do zobaczenia!", pronunciation: "Doh zoh-bah-CHEH-nyah", english: "See you!" },
      // Weekend & well-wishes
      { polish: "Miłego dnia!", pronunciation: "Mee-WEH-go DNYAH", english: "Have a nice day!" },
      { polish: "Miłego wieczoru!", pronunciation: "Mee-WEH-go vyeh-CHOH-roo", english: "Have a nice evening!" },
      { polish: "Miłego weekendu!", pronunciation: "Mee-WEH-go weekend-oo", english: "Have a great weekend!" },
      { polish: "Dobrej nocy!", pronunciation: "DOHB-rey NOH-tsih", english: "Good night!" },
    ],
  },
];

function PhraseCard({ phrase }: { phrase: Phrase }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = async () => {
    if (playing) return;
    setPlaying(true);
    try {
      const url = `/api/tts?text=${encodeURIComponent(phrase.polish)}`;
      if (!audioRef.current) {
        audioRef.current = new Audio(url);
      }
      audioRef.current.src = url;
      await audioRef.current.play();
      audioRef.current.onended = () => setPlaying(false);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="phrase-card" onClick={play}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-white truncate">{phrase.polish}</p>
          <p className="text-sm text-[#DC143C] font-mono mt-1">{phrase.pronunciation}</p>
          <p className="text-sm text-gray-400 mt-1">{phrase.english}</p>
        </div>
        <button
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            playing ? "bg-[#DC143C] scale-110" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {playing ? "🔊" : "🔈"}
        </button>
      </div>
    </div>
  );
}

function EpisodeSection({ episode, index }: { episode: Episode; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="episode-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div
        className="p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{episode.emoji}</span>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#DC143C] uppercase">
              {episode.genre} — EP {episode.id}
            </span>
            <h2 className="text-xl font-bold">{episode.title}</h2>
          </div>
          <span className="ml-auto text-gray-500 text-2xl">{open ? "−" : "+"}</span>
        </div>
        <p className="text-sm text-gray-500 italic">{episode.subtitle}</p>
        <p className="text-sm text-gray-400 mt-2">{episode.description}</p>
      </div>

      {open && (
        <div className="px-6 pb-6">
          <div className="border-t border-white/5 pt-4 grid gap-3 sm:grid-cols-2">
            {episode.phrases.map((p, i) => (
              <PhraseCard key={i} phrase={p} />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">
            Tap any phrase to hear pronunciation 🔊
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DC143C]/10 via-transparent to-transparent" />
        <div className="max-w-2xl mx-auto px-6 pt-16 pb-12 text-center relative">
          <div className="text-6xl mb-4">🇵🇱</div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight glow">
            SMETANA<br />
            <span className="text-[#DC143C]">RUN</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Survive Poland. One phrase at a time.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            A cinematic phrasebook for brave beginners
          </p>
        </div>
      </div>

      {/* Episodes */}
      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-4">
        <div className="flex items-center gap-3 px-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DC143C]/30 to-transparent" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Season 1</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DC143C]/30 to-transparent" />
        </div>

        {episodes.map((ep, i) => (
          <EpisodeSection key={ep.id} episode={ep} index={i} />
        ))}

        <div className="text-center pt-8">
          <p className="text-gray-600 text-sm">More episodes coming soon...</p>
          <p className="text-gray-700 text-xs mt-1">Built with 🦀 and ElevenLabs</p>
        </div>
      </div>
    </main>
  );
}
