import { Component } from '@angular/core';

export interface ProgramItem {
  time: string;
  title: string;
  description: string;
}

export interface ProgramSection {
  id: string;
  heading: string;
  items: ProgramItem[];
}

export interface MenuSection {
  heading: string;
  tagline: string;
  items: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly program: ProgramSection[] = [
    {
      id: 'evening',
      heading: 'THE EVENING',
      items: [
        {
          time: '5:00 – 6:00 PM',
          title: 'GUEST ARRIVAL & COCKTAIL RECEPTION',
          description: 'Red carpet, photography, music, drinks and mingling.',
        },
        {
          time: '6:00 – 6:35 PM',
          title: 'WELCOME & OPENING PRAYER',
          description: 'The MC welcomes guests, recognizes special guests, and introduces the evening.',
        },
        {
          time: '6:35 – 6:45 PM',
          title: 'MC ICEBREAKER',
          description: 'Light-hearted jokes and audience engagement to set the tone.',
        },
        {
          time: '6:45 – 7:40 PM',
          title: 'GRAND ENTRANCE #1 — “THE LEGACY ENTRANCE”',
          description: 'The celebrant enters with spouse and family to a specially selected song.',
        },
        {
          time: '7:40 – 8:00 PM',
          title: 'TRIBUTES — PART I: THE JOURNEY',
          description: 'Selected friends or family members share short tributes (maximum 3–4 minutes each).',
        },
        {
          time: '8:00 – 8:05 PM',
          title: 'DINNER INTRODUCTION & LOGISTICS',
          description: 'The MC introduces dinner service and provides table instructions.',
        },
        {
          time: '8:05 – 9:00 PM',
          title: 'DINNER SERVICE',
          description: 'Main meal with elegant background music, plus trivia and interactive games.',
        },
      ],
    },
    {
      id: 'celebration',
      heading: 'THE CELEBRATION CONTINUES',
      items: [
        {
          time: '9:00 – 9:45 PM',
          title: 'GRAND ENTRANCE #2 — “THE GOLDEN KING ENTRANCE”',
          description: 'Outfit change, high-energy music and a celebratory dance-in with friends and family.',
        },
        {
          time: '9:45 – 10:00 PM',
          title: 'SPECIAL PRAYER FOR THE CELEBRANT & FAMILY',
          description: 'A time of thanksgiving, blessings and prayers for the next 50 years.',
        },
        {
          time: '10:00 – 10:10 PM',
          title: 'GOLDEN JUBILEE TOAST',
          description: 'Raise a glass to the celebrant and to the years ahead.',
        },
        {
          time: '10:10 – 10:20 PM',
          title: 'GAME — BEST DRESSED COMPETITION',
          description: 'Awards for Best Dressed Male, Female, and Couple alongside gift presentations.',
        },
        {
          time: '10:20 – 10:30 PM',
          title: 'TRIBUTES — PART II: THE MAN BEHIND THE MEMORIES',
          description: 'Special friends share short, personal stories.',
        },
        {
          time: '10:30 – 10:40 PM',
          title: 'CAKE CUTTING CEREMONY',
          description: "Birthday song, cake cutting, and special recognition of Ibukun and Iyanu's birthdays.",
        },
        {
          time: '10:40 – 10:50 PM',
          title: 'CELEBRANT’S REMARKS',
          description: 'A moment for the celebrant to express appreciation.',
        },
        {
          time: '10:50 – 11:30 PM',
          title: 'CELEBRANT & FAMILY DANCE',
          description: 'A special dance with spouse, children, family, and friends.',
        },
        {
          time: '11:30 – 11:45 PM',
          title: 'VOTE OF THANKS',
          description: 'Words of appreciation to guests, family, and friends.',
        },
        {
          time: '11:45 PM – 12 AM',
          title: 'PREPARE FOR THE AFTER PARTY',
          description: 'The MC transitions guests into the late-night celebration.',
        },
        {
          time: '12:00 – 2:00 AM',
          title: 'THE GOLDEN AFTER PARTY',
          description: 'DJ, Afrobeats, Highlife, old-school classics, dancing, and late-night food.',
        },
      ],
    },
  ];

  protected readonly menu: MenuSection[] = [
    {
      heading: '✨ Small Chops & Golden Bites',
      tagline: 'Little Bites, Big Enjoyment!',
      items: [
        'Classic Plain Puff-Puff',
        'Frosted Puff-Puff — Sweetness with a Glow',
        'Crispy Vegetable Spring Rolls',
        'Meat Pie',
      ],
    },
    {
      heading: '🍚 The Rice & Noodle Affair',
      tagline: 'Rice, Rice Baby… And Noodles Too!',
      items: [
        'Party Jollof Rice — The Owambe Classic',
        'Golden Fried Rice',
        'Vegetarian Fried Rice — Garden Fresh',
        'Native Rice — Naija Flavour Unleashed',
        'Ofada Rice & Signature Ayamase Sauce',
        'Shanghai Noodles with Chicken & Shrimp',
        'Special Rice Noodles',
        'Vegetarian Cantonese Chow Mein',
      ],
    },
    {
      heading: '🇳🇬 Naija Classics & Comfort Food',
      tagline: 'Homegrown Flavours, Royal Treatment!',
      items: [
        'Amala Made Fresh on the Spot',
        'Efo Riro & Smooth Pounded Yam',
        'Ewa Agoyin & Fiery Pepper Sauce',
        'Asaro — Rich & Hearty Yam Porridge',
        'Golden Fried Plantain (Dodo)',
        'Naija Salad — Fresh, Colourful & Classic',
      ],
    },
    {
      heading: '🍗 The Grill, The Heat & The Meat',
      tagline: 'Peppered, Grilled & Ready to Thrill!',
      items: [
        'Soft & Succulent Chicken',
        'Spicy Peppered Chicken',
        'Smoky Grilled Chicken',
        'Peppered Turkey — Full of Flavour',
        'Peppered Fish — Hot, Fresh & Tasty',
        'Beef & Broccoli — Savoury Stir-Fry Delight',
      ],
    },
    {
      heading: '🔥 The After-Party Turn-Up',
      tagline: 'When the Music Drops, the Munchies Begin!',
      items: [
        'Asun — Smoky, Spicy Goat Meat',
        'Peppered Lamb Cubes — Little Bites of Fire',
        "Grilled Chicken Wings — Finger-Lickin' Good",
        'Crispy Golden Fries',
      ],
    },
  ];
}
