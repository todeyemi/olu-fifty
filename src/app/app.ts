import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TimelineEvent {
  time: string;
  title: string;
  category: 'Reception' | 'Ceremony' | 'Dining' | 'Party';
  description: string;
  location: string;
  icon: string;
  expanded?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Canapés' | 'Mains' | 'Cocktails' | 'Desserts';
  description: string;
  tags: string[];
  recommended?: boolean;
  imageIcon: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  votes: number;
  requestedBy?: string;
  message?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  avatarBg: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  // Mobile Menu State
  protected readonly mobileMenuOpen = signal<boolean>(false);

  // Countdown State
  private timerInterval: any;
  protected readonly targetDate = new Date('2026-11-14T17:00:00');
  protected readonly daysLeft = signal<number>(0);
  protected readonly hoursLeft = signal<number>(0);
  protected readonly minutesLeft = signal<number>(0);
  protected readonly secondsLeft = signal<number>(0);

  // Program Filter
  protected readonly selectedCategory = signal<string>('All');

  // Menu Category & Filter State
  protected readonly activeMenuCategory = signal<'Canapés' | 'Mains' | 'Cocktails' | 'Desserts'>('Canapés');
  protected readonly dietaryFilter = signal<string>('All');

  // Song Suggestion Modal & State
  protected readonly showSongModal = signal<boolean>(false);
  protected readonly newSongTitle = signal<string>('');
  protected readonly newSongArtist = signal<string>('');
  protected readonly newSongGuest = signal<string>('');
  protected readonly newSongMessage = signal<string>('');

  // RSVP / Guestbook State
  protected readonly guestName = signal<string>('');
  protected readonly guestRelation = signal<string>('Friend');
  protected readonly guestMessage = signal<string>('');
  protected readonly rsvpAttending = signal<string>('Yes');
  protected readonly showRsvpSuccess = signal<boolean>(false);

  // Program Data
  protected readonly timelineEvents = signal<TimelineEvent[]>([
    {
      time: '17:00',
      title: 'Red Carpet & Champagne Reception',
      category: 'Reception',
      description: 'Chilled Moët & Chandon champagne, red carpet arrival photography, and live violin serenades as guests arrive.',
      location: 'Grand Foyer & Gardens',
      icon: 'pi-glass-martini',
      expanded: false
    },
    {
      time: '18:00',
      title: 'Grand Entrance & Opening Prayers',
      category: 'Ceremony',
      description: 'Royal entrance of the celebrant Olu, welcome opening address, and invocation prayers for good health and prosperity.',
      location: 'Main Ballroom',
      icon: 'pi-crown',
      expanded: false
    },
    {
      time: '18:45',
      title: 'Jubilee Tributes & Documentary Screening',
      category: 'Ceremony',
      description: 'A rich visual documentary showcasing 50 memorable years of Olu\'s life, followed by heartfelt toasts from family and friends.',
      location: 'Main Stage',
      icon: 'pi-video',
      expanded: false
    },
    {
      time: '19:30',
      title: 'Gourmet Afro-Fusion Banquet',
      category: 'Dining',
      description: 'An exquisite multi-course culinary experience featuring international and traditional Afro-fusion delicacies with live saxophonist accompaniment.',
      location: 'Banquet Hall',
      icon: 'pi-shopping-bag',
      expanded: false
    },
    {
      time: '21:00',
      title: 'Royal Cake Cutting & Champagne Toast',
      category: 'Ceremony',
      description: 'Cutting of the 50th Jubilee Birthday Cake, formal family photo session, and royal toast to the next half century.',
      location: 'Central Pavilion',
      icon: 'pi-star-fill',
      expanded: false
    },
    {
      time: '21:45',
      title: 'Celebrant\'s Dance & DJ After-Party',
      category: 'Party',
      description: 'The Golden Jubilee dance floor opens! Non-stop Afrobeats, 90s classics, signature cocktails, and late-night party vibes till dawn.',
      location: 'Dance Arena & Lounge',
      icon: 'pi-volume-up',
      expanded: false
    }
  ]);

  // Menu Data
  protected readonly menuItems = signal<MenuItem[]>([
    // Canapés
    {
      id: 'm1',
      name: 'Gourmet Beef Suya Skewers',
      category: 'Canapés',
      description: 'Prime tenderloin beef crusted in Yaji spice blend, served with pickled red onions and micro cilantro.',
      tags: ['Spicy', 'Gluten-Free', 'Chef Special'],
      recommended: true,
      imageIcon: 'pi-heart-fill'
    },
    {
      id: 'm2',
      name: 'Truffle Prawn Crostini',
      category: 'Canapés',
      description: 'Pan-seared jumbo tiger prawns over garlic crostini topped with truffle aioli.',
      tags: ['Seafood', 'Chef Special'],
      recommended: true,
      imageIcon: 'pi-star'
    },
    {
      id: 'm3',
      name: 'Crispy Veggie Samosa Bites',
      category: 'Canapés',
      description: 'Golden fried pastry triangles stuffed with spiced potatoes and sweet peas, accompanied by mango chutney.',
      tags: ['Vegetarian', 'Vegan'],
      recommended: false,
      imageIcon: 'pi-sun'
    },
    // Mains
    {
      id: 'm4',
      name: 'Smokey Royal Jollof Rice',
      category: 'Mains',
      description: 'Fire-roasted bell pepper and tomato infused long-grain rice, served with sweet fried dodo and grilled jumbo prawns.',
      tags: ['Gluten-Free', 'Signature Dish'],
      recommended: true,
      imageIcon: 'pi-crown'
    },
    {
      id: 'm5',
      name: 'Slow-Braised Lamb Shanks',
      category: 'Mains',
      description: 'Tender braised lamb in red wine & rosemary reduction, served over creamy parmesan garlic mash.',
      tags: ['Chef Special'],
      recommended: true,
      imageIcon: 'pi-fire'
    },
    {
      id: 'm6',
      name: 'Wild Salmon in Coconut Lemongrass Curry',
      category: 'Mains',
      description: 'Pan-roasted Atlantic salmon fillet swimming in fragrant coconut curry with wild jasmine rice.',
      tags: ['Seafood', 'Gluten-Free'],
      recommended: false,
      imageIcon: 'pi-compass'
    },
    {
      id: 'm7',
      name: 'Pounded Yam & Assorted Egusi Special',
      category: 'Mains',
      description: 'Silky smooth pounded yam served with rich melon seed soup, goat meat, stockfish, and spinach.',
      tags: ['Traditional Special'],
      recommended: true,
      imageIcon: 'pi-heart'
    },
    // Cocktails
    {
      id: 'm8',
      name: 'The Golden Jubilee 50',
      category: 'Cocktails',
      description: 'Aged Bourbon, elderflower liqueur, lemon zest, edible 24k gold flakes, and champagne float.',
      tags: ['Signature Cocktail', 'Contains Alcohol'],
      recommended: true,
      imageIcon: 'pi-sparkles'
    },
    {
      id: 'm9',
      name: 'Afro-Beat Sparkle (Mocktail)',
      category: 'Cocktails',
      description: 'Fresh Zobo (hibiscus flower infusion), ginger beer, passion fruit puree, and mint sprig.',
      tags: ['Non-Alcoholic', 'Refreshing'],
      recommended: true,
      imageIcon: 'pi-palette'
    },
    {
      id: 'm10',
      name: 'Olu\'s Smoked Old Fashioned',
      category: 'Cocktails',
      description: 'Single malt scotch, Angostura bitters, raw cane sugar syrup, infusing applewood smoke.',
      tags: ['Contains Alcohol'],
      recommended: false,
      imageIcon: 'pi-cog'
    },
    // Desserts
    {
      id: 'm11',
      name: '3-Tiered Red Velvet & Gold Birthday Cake',
      category: 'Desserts',
      description: 'Decadent moist red velvet layers filled with Madagascar vanilla cream cheese and gold leaf detailing.',
      tags: ['Celebrant Cake'],
      recommended: true,
      imageIcon: 'pi-gift'
    },
    {
      id: 'm12',
      name: 'Artisanal Gelato & Warm Brownie Sundae',
      category: 'Desserts',
      description: 'Warm double-chocolate fudgy brownie paired with pistachio gelato and salted caramel drizzle.',
      tags: ['Chef Special'],
      recommended: false,
      imageIcon: 'pi-sun'
    }
  ]);

  // Playlist & Songs
  protected readonly songs = signal<Song[]>([
    { id: 's1', title: 'Essence', artist: 'Wizkid ft. Tems', category: 'Afrobeats', votes: 42 },
    { id: 's2', title: 'Last Last', artist: 'Burna Boy', category: 'Afrobeats', votes: 38 },
    { id: 's3', title: 'September', artist: 'Earth, Wind & Fire', category: '90s & Classics', votes: 35 },
    { id: 's4', title: 'Juju Music Special', artist: 'King Sunny Ade', category: 'Highlife & Classics', votes: 29 },
    { id: 's5', title: 'Celebration', artist: 'Kool & The Gang', category: '90s & Classics', votes: 27 },
    { id: 's6', title: 'Excess Love', artist: 'Mercy Chinwo', category: 'Gospel & Celebration', votes: 24 },
    { id: 's7', title: 'Vula Sekele', artist: 'Kamo Mphela', category: 'Amapiano', votes: 21 }
  ]);

  // Guest Wishes
  protected readonly guestWishes = signal<GuestWish[]>([
    {
      id: 'w1',
      name: 'Uncle Tunde & Family',
      relation: 'Family',
      message: 'Happy 50th Birthday Olu! You have always been a beacon of strength, wisdom, and joy to our entire family. May the next 50 years be filled with even greater glory!',
      date: 'Aug 16, 2026',
      avatarBg: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'w2',
      name: 'Dr. Kunle & Funmi',
      relation: 'Friend',
      message: 'Welcome to the Golden Club! 50 looks incredible on you brother. Looking forward to dancing the night away at the party!',
      date: 'Aug 16, 2026',
      avatarBg: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'w3',
      name: 'Executive Team @ TechCorp',
      relation: 'Colleague',
      message: 'Warmest 50th birthday wishes to an outstanding leader and visionary friend. Cheers to half a century of excellence!',
      date: 'Aug 15, 2026',
      avatarBg: 'from-emerald-500 to-teal-700'
    }
  ]);

  // Computed Filters
  protected readonly filteredEvents = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.timelineEvents();
    return this.timelineEvents().filter(e => e.category === cat);
  });

  protected readonly filteredMenuItems = computed(() => {
    const category = this.activeMenuCategory();
    const dietary = this.dietaryFilter();

    return this.menuItems().filter(item => {
      const matchCat = item.category === category;
      const matchDiet = dietary === 'All' || item.tags.includes(dietary);
      return matchCat && matchDiet;
    });
  });

  ngOnInit() {
    this.updateCountdown();
    this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
    this.loadLocalStorageData();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Timer Calculation
  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance > 0) {
      this.daysLeft.set(Math.floor(distance / (1000 * 60 * 60 * 24)));
      this.hoursLeft.set(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      this.minutesLeft.set(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      this.secondsLeft.set(Math.floor((distance % (1000 * 60)) / 1000));
    } else {
      this.daysLeft.set(0);
      this.hoursLeft.set(0);
      this.minutesLeft.set(0);
      this.secondsLeft.set(0);
    }
  }

  // Interactivity Actions
  protected toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  protected toggleEventExpand(index: number) {
    this.timelineEvents.update(events => {
      const copy = [...events];
      copy[index].expanded = !copy[index].expanded;
      return copy;
    });
  }

  protected upvoteSong(songId: string) {
    this.songs.update(list => {
      return list.map(s => s.id === songId ? { ...s, votes: s.votes + 1 } : s)
                 .sort((a, b) => b.votes - a.votes);
    });
    this.saveSongsToStorage();
  }

  protected openSongModal() {
    this.showSongModal.set(true);
  }

  protected closeSongModal() {
    this.showSongModal.set(false);
  }

  protected submitSongRequest() {
    if (!this.newSongTitle() || !this.newSongArtist()) return;

    const newSong: Song = {
      id: 's_' + Date.now(),
      title: this.newSongTitle(),
      artist: this.newSongArtist(),
      category: 'Guest Request',
      votes: 1,
      requestedBy: this.newSongGuest() || 'Anonymous Guest',
      message: this.newSongMessage()
    };

    this.songs.update(list => [...list, newSong].sort((a, b) => b.votes - a.votes));
    this.saveSongsToStorage();

    // Reset Form
    this.newSongTitle.set('');
    this.newSongArtist.set('');
    this.newSongGuest.set('');
    this.newSongMessage.set('');
    this.showSongModal.set(false);
  }

  protected submitGuestWish() {
    if (!this.guestName() || !this.guestMessage()) return;

    const gradients = [
      'from-amber-500 to-yellow-600',
      'from-purple-600 to-indigo-600',
      'from-emerald-500 to-teal-700',
      'from-rose-500 to-pink-600',
      'from-cyan-500 to-blue-600'
    ];
    const randomBg = gradients[Math.floor(Math.random() * gradients.length)];

    const newWish: GuestWish = {
      id: 'w_' + Date.now(),
      name: this.guestName(),
      relation: this.guestRelation(),
      message: this.guestMessage(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatarBg: randomBg
    };

    this.guestWishes.update(wishes => [newWish, ...wishes]);
    this.saveWishesToStorage();

    // Reset Form & Notify
    this.guestName.set('');
    this.guestMessage.set('');
    this.showRsvpSuccess.set(true);

    setTimeout(() => {
      this.showRsvpSuccess.set(false);
    }, 4000);
  }

  private saveSongsToStorage() {
    try {
      localStorage.setItem('olu_fifty_songs', JSON.stringify(this.songs()));
    } catch (e) {}
  }

  private saveWishesToStorage() {
    try {
      localStorage.setItem('olu_fifty_wishes', JSON.stringify(this.guestWishes()));
    } catch (e) {}
  }

  /** Map legacy avatarBg string to a CSS class color suffix */
  protected getAvatarColor(bg: string): string {
    if (bg.includes('amber') || bg.includes('yellow')) return 'gold';
    if (bg.includes('purple') || bg.includes('indigo')) return 'purple';
    if (bg.includes('emerald') || bg.includes('teal')) return 'teal';
    if (bg.includes('rose') || bg.includes('pink')) return 'rose';
    if (bg.includes('cyan') || bg.includes('blue')) return 'blue';
    return 'gold';
  }

  private loadLocalStorageData() {
    try {
      const savedSongs = localStorage.getItem('olu_fifty_songs');
      if (savedSongs) {
        this.songs.set(JSON.parse(savedSongs));
      }
      const savedWishes = localStorage.getItem('olu_fifty_wishes');
      if (savedWishes) {
        this.guestWishes.set(JSON.parse(savedWishes));
      }
    } catch (e) {}
  }
}

