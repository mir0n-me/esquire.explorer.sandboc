
/**
*  Esquire frameworks (tm)
*  Sandbox server datastore
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  email: mir0n.the.programmer@gmail.com
*
* History:
*/

const DEBUG = false;

const dictionaries = [
   { kind: 0, //Any other, Default
    layers: [ 
      {
        title: "Details",
        fields: [
          { name: 'image', sort:1, label:'',    type:'image', layer:1, readwrite:1} ,
          { name: 'link',  sort:2, label:'Link', type:'href', layer:1, readwrite:1},
          { name: 'desc',  sort:2, label:'Description', type:'string', layer:1, readwrite:1},
        ]
      }
    ]
   },
  { kind: 12,  //Pokemon
    layers: [ 
      { title:'Details',
        fields: [
          { name: 'image',   sort:1, label:'',         type:'image',  layer:1, readwrite:1},
          { name: 'link',    sort:2, label:'Link',     type:'href',   layer:1, readwrite:1},
          { name: 'color',   sort:3, label:'Color',    type:'string', layer:1, readwrite:1},
          { name: 'weight',  sort:4, label:'Weight',   type:'string', layer:1, readwrite:1},
          { name: 'type',    sort:5, label:'Type',     type:'string', layer:1, readwrite:1},
          { name: 'category',sort:6, label:'Category', type:'string', layer:1, readwrite:1},
      ]},
      { title:'Games',
        fields: [
          { name: 'games',   sort:1, label:'',     type:'tablist', layer:2, readwrite:1, listvalues_kind:14} ,
      ]},
      { title:'TV Shows',
        fields: [
          { name: 'tvShows',  sort:1, label:'', type:'tablist', layer:3, readwrite:1, listvalues_kind:16} ,
      ]},
      { title:'Books',
        fields: [
          { name: 'books',    sort:1, label:'',    type:'tablist', layer:4, readwrite:1, listvalues_kind:18} ,
      ]},
      { title:'Posters',
        fields: [
          { name: 'posters',   sort:1, label:'Posters were shown', type:'tablist', layer:5, readwrite:1, listvalues_kind:20} ,
      ]},
      { title:'Powers',
        fields: [
          { name: 'powers',    sort:1, label:'Pokemon Powers',  type:'tablist', layer:6, readwrite:1, listvalues_kind:22} ,
      ]},
    ]
   },
 ];


const pokemons = [
  'Pikachu','Charizard','Squirtle','Jigglypuff','Meowth','Psyduck','Eevee','Snorlax','Gengar','Bulbasaur',
];

const pokemonPowers = {
  Pikachu: ['Thunder Shock', 'Quick Attack', 'Iron Tail', 'Electro Ball', 'Volt Tackle'],
  Charizard: ['Flamethrower', 'Fly', 'Dragon Claw', 'Fire Spin', 'Slash'],
  Bulbasaur: ['Vine Whip', 'Razor Leaf', 'Solar Beam', 'Seed Bomb', 'Tackle'],
  Squirtle: ['Water Gun', 'Bubble', 'Tackle', 'Bite', 'Skull Bash'],
  Jigglypuff: ['Sing', 'Pound', 'Double Slap', 'Rest', 'Hyper Voice'],
  Meowth: ['Scratch', 'Bite', 'Pay Day', 'Fury Swipes', 'Night Slash'],
  Psyduck: ['Water Gun', 'Confusion', 'Scratch', 'Zen Headbutt', 'Hydro Pump'],
  Eevee: ['Tackle', 'Quick Attack', 'Bite', 'Swift', 'Take Down'],
  Snorlax: ['Tackle', 'Body Slam', 'Rest', 'Snore', 'Hyper Beam'],
  Gengar: ['Lick', 'Shadow Ball', 'Hypnosis', 'Dream Eater', 'Night Shade'],
};

const pokemonGames = ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal',
    'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 
    'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword',
    'Pokemon Shield', 'Pokemon GO', 'Pokemon Green', 'Super Smash Bros.', 'Pokemon Yellow',
    'Pokemon Legends: Arceus', 'Pokemon FireRed', 'Pokemon LeafGreen'
];

const pokemonPosters = [
	'Bulbasaur and Friends Poster', 'Bulbasaur and Pikachu Poster', 'Bulbasaur in Space Poster', 'Bulbasaur in the Garden Poster', 
	'Bulbasaur with Ash Poster', 'Charizard and Friends Poster', 'Charizard in Space Poster', 'Charizard with Ash Poster', 
	'Detective Pikachu Poster', 'Eevee and Ash Poster', 'Eevee and Friends Poster', 'Eevee in Space Poster', 
	'Eevee with Pikachu Poster', 	'Eevees Evolutionary Poster', 'Gengar and Friends Poster', 'Gengar and Pikachu Poster',
	'Gengar in Space Poster', 'Gengar in the Dark Poster',	'Gengar with Ash Poster', 'Jigglypuff and Friends Poster',
	'Jigglypuff and Pikachu Poster', 'Jigglypuff in Space Poster', 	'Jigglypuff Singing Poster', 'Jigglypuff with Ash Poster',
	'Mega Charizard X Poster', 'Mega Charizard Y Poster', 'Meowth and Friends Poster', 	'Meowth and Pikachu Poster', 
	'Meowth in Space Poster', 'Meowth with Team Rocket Poster', 'Meowths Mischief Poster', 	'Pikachu and Eevee Poster', 
	'Pikachu and Friends Poster', 'Pikachu in Space Poster', 'Pikachu with Ash Poster', 'Pokemon 25th Anniversary Poster', 
	'Pokemon Bulbasaur Evolution Poster', 'Pokemon Charizard Evolution Poster', 'Pokemon Eevee Evolution Poster',
	'Pokemon Generations Poster', 'Pokemon Gengar Evolution Poster', 'Pokemon Jigglypuff Evolution Poster', 'Pokemon Meowth Evolution Poster',
	'Pokemon Movie Poster', 'Pokemon Pikachu Evolution Poster', 'Pokemon Psyduck Evolution Poster', 'Pokemon Red and Blue Poster',
	'Pokemon Snorlax Evolution Poster', 'Pokemon Squirtle Evolution Poster', 'Psyduck and Friends Poster', 'Psyduck and Pikachu Poster',
	'Psyduck in Space Poster', 'Psyduck in the Water Poster', 'Psyduck with Misty Poster', 'Snorlax and Friends Poster',
	'Snorlax and Pikachu Poster', 'Snorlax in Space Poster', 'Snorlax Sleeping Poster', 'Snorlax with Ash Poster',
	'Squirtle and Friends Poster', 'Squirtle and Pikachu Poster', 'Squirtle in Space Poster','Squirtle in the Water Poster',
	'Squirtle with Ash Poster',
];

const pokemonBooks = [
'Ash\'s Charizard Challenge', 'Bulbasaur and the Hidden Village', 'Charizard Go!', 'Eevee and Friends',
'Eevee\'s Evolutionary Adventures', 'Eevee\'s Great Escape', 'Eevee\'s Secret Mission', 'Gengar and Friends',
'Gengar\'s Great Escape', 'Night in the Haunted Tower', 'Gengar\'s Mischief', 'I Choose You!',
'Jigglypuff and the Mystery Zone', 'Jigglypuff and the Sinister Song', 'Jigglypuff\'s Lullaby', 'Jigglypuff\'s Singing Sensation',
 'Meowth and the Great Escape', 'Meowth Rules', 'Meowth\'s Big Battle', 'Meowth\'s Party',
 'Mewtwo Strikes Back', 'Pikachu Shocks Back', 'Pikachu\'s Global Adventure', 'Pokemon Adventures',
 'Pokemon Junior', 'Pokemon Tales',  'Pokemon: Ash and the Squirtle Squad', 'Pokemon: Bulbasaur\'s Bad Day',
 'Pokemon: Bulbasaur\'s Mysterious Garden', 'Pokemon: Charizard in Trouble', 'Pokemon: I Choose You!', 'Pokemon: Jigglypuff\'s Song',
 'Pokemon: Mewtwo Returns', 'Pokemon: Pikachu in Love', 'Pokemon: The First Movie', 'Pokemon: The Wacky Watcher',
 'Psyduck in Trouble', 'Psyduck\'s Love Song', 'Psyduck\'s Panic', 'Psyduck\'s Psychic Surprise', 
 'Psyduck\'s Wild Ride', 'Squirtle Saves the Day', 'Team Rocket to the Rescue', 'Team Rocket Trouble',
 'The Bulbasaur and the Beautiful Garden', 'The Eevee and the Trainer', 'The Electric Tale of Pikachu', 
 'The Gengar and the Trainer', 'The Legend of Eevee',  'The Legend of Gengar', 'The Legend of Thunder', 
 'The Meowth and the Mystery', 'The Psyduck and the Pokedex',  'The Song of Jigglypuff', 'The Trouble with Bullies'
];


const pokemonShows = [
'Pokemon Journeys', 'Pokemon: Advanced', 'Pokemon: Advanced Battle', 'Pokemon: Advanced Challenge', 
'Pokemon: Adventures in the Orange Islands', 'Pokemon: Battle Frontier', 'Pokemon: Black and White',  'Pokemon: Black and White Adventures in Unova and Beyond', 
'Pokemon: Black and White Rival Destinies', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 
'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Indigo League', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions',
'Pokemon: Master Quest', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 
];

const pokemonShowDetails = [
	{
		id: 's01',
    name: 'Pokemon Journeys',
    desc: '2019, The Series is the twenty-third season of the Pokémon anime series and the first and titular season of Pokémon Journeys: The Series, known in Japan as Pocket Monsters',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_Journeys:_The_Series',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/0/04/Pok%C3%A9mon_S23_-_Posters.png',
  },
	{
		id: 's02',
    name: 'Pokemon: Advanced', 
    desc: '2002, The sixth season of the Pokémon anime series and the first season of Pokémon the Series: Ruby and Sapphire, known in Japan as Pocket Monsters: Advanced Generation',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Advanced#:~:text=Pok%C3%A9mon:%20Advanced%20is%20the%20sixth,compete%20in%20the%20Hoenn%20League.',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/6/6e/Pokemonseason6DVDvol1.jpg',
  },
	{
		id: 's03',
    name: 'Pokemon: Advanced Battle', 
    desc: '2004, The eighth season of the Pokémon anime series and the third season of Pokémon the Series: Ruby and Sapphire, known in Japan as Pocket Monsters: Advanced Generation',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Advanced_Battle',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/8/8c/Pokemonseason8DVDvol1.jpg',
  },
	{
		id: 's04',
    name: 'Pokemon: Advanced Challenge', 
    desc: '2003, The seventh season of the Pokémon anime series and the second season of Pokémon the Series: Ruby and Sapphire, known in Japan as Pocket Monsters: Advanced Generation',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Advanced_Challenge',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/1/1c/Pokemonseason7DVDvol1.jpg',
  },
	{
		id: 's05',
    name: 'Pokemon: Adventures in the Orange Islands', 
    desc: '1999, The second season of the Pokémon anime series and of Pokémon the Series: The Beginning, known in Japan as Pocket Monsters ',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Adventures_in_the_Orange_Islands',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/5/54/Pokemonseason2DVDBoxSet.jpg',
  },
	{
		id: 's06',
    name: 'Pokemon: Battle Frontier',
    desc: '2005, The ninth season of the Pokémon anime series and the fourth and final season of Pokémon the Series: Ruby and Sapphire, known in Japan as Pocket Monsters: Advanced Generation',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Battle_Frontier',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/2/27/Pok%C3%A9mon_Battle_Frontier_Complete_Collection_DVD.jpg',
  },
	{
		id: 's07',
    name: 'Pokemon: Black and White', 
    desc: '2010, The fourteenth season of the Pokémon anime series and the first and titular season of Pokémon the Series: Black & White, known in Japan as Pocket Monsters: Best Wishes',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_the_Series:_Black_%26_White',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/7/72/Pok%C3%A9mon_Black_and_White_logo.png',
  },
	{
		id: 's08',
    name: 'Pokemon: Black and White Adventures in Unova and Beyond', 
    desc: '2012, The sixteenth season of the Pokémon anime series and the third and final season of Pokémon the Series: Black & White',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Black_%26_White:_Adventures_in_Unova_and_Beyond',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/2/2a/Pokemon_BW_Adventures_in_Unova_logo.png',
  },
	{
		id: 's09',
    name: 'Pokemon: Black and White Rival Destinies', 
    desc: '2011, The fifteenth season of the Pokémon anime series and the second season of Pokémon the Series: Black & White known in Japan as Pocket Monsters: Best Wishes!',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Black_%26_White:_Rival_Destinies',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/1/15/PokemonBWRivalDestinies15.png',
  },
	{
		id: 's10',
    name: 'Pokemon: Diamond and Pearl', 
    desc: '2006, The tenth season of the Pokémon anime series and the first and titular season of Pokémon the Series: Diamond and Pearl, known in Japan as Pocket Monsters Diamond & Pearl',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_the_Series:_Diamond_and_Pearl',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Pok%C3%A9mon_Diamond_and_Pearl_logo.png/330px-Pok%C3%A9mon_Diamond_and_Pearl_logo.png',
  },
	{
		id: 's11',
    name: 'Pokemon: Diamond and Pearl Battle Dimension', 
    desc: '2007, The eleventh season of the Pokémon anime series and the second season of Pokémon the Series: Diamond and Pearl, known in Japan as Pocket Monsters Diamond & Pearl',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Diamond_and_Pearl:_Battle_Dimension',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/b/bd/DP-Battle_Dimesion.png',
  },
	{
		id: 's12',
    name: 'Pokemon: Diamond and Pearl Galactic Battles', 
    desc: '2008, The twelfth season of the Pokémon anime series and the third season of Pokémon the Series: Diamond and Pearl, known in Japan as Pocket Monsters Diamond & Pearl',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Diamond_and_Pearl:_Galactic_Battles',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/a/a1/DP-Pok%C3%A9mon_Galactic_Battle.jpg',
  },
	{
		id: 's13',
    name: 'Pokemon: Diamond and Pearl Sinnoh League Victors', 
    desc: '2010, The thirteenth season of the Pokémon anime series and the fourth and final season of Pokémon the Series: Diamond and Pearl, known in Japan as Pocket Monsters Diamond & Pearl',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Diamond_and_Pearl:_Sinnoh_League_Victors',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/2/2f/DP-Sinnoh_League_Victors.png',
  },
	{
		id: 's14',
    name: 'Pokemon: Indigo League', 
    desc: '1997,  the first season of the Pokémon anime series and of Pokémon the Series: The Beginning, known in Japan as Pocket Monsters',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Indigo_League',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/2/27/Pokemonseason1DVDBoxSet.jpg',
  },
	{
		id: 's15',
    name: 'Pokemon: Johto Journeys', 
    desc: '1999, The third season of the Pokémon anime series and the first season of Pokémon the Series: Gold and Silver, known in Japan as Pocket Monsters',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_The_Johto_Journeys',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/0/0a/Pokemonseason3DVDvol1.jpg',
  },
	{
		id: 's16',
    name: 'Pokemon: Johto League Champions',
    desc: '2000, The fourth season of the Pokémon anime series and the second season of Pokémon the Series: Gold and Silver, known in Japan as Pocket Monsters',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Johto_League_Champions',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/2/2b/Pokemonseason4DVDvol1.jpg',
  },
	{
		id: 's17',
    name: 'Pokemon: Master Quest', 
    desc: '2001, The fifth season of the Pokémon anime series and the third season of Pokémon the Series: Gold and Silver, known in Japan as Pocket Monsters',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon:_Master_Quest',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/b/b4/Pokemonseason5DVDBoxSet.jpg',
  },
	{
		id: 's18',
    name: 'Pokemon: XY', 
    desc: '2013, The seventeenth season of the Pokémon anime series and the first and titular season of Pokémon the Series: XY, known in Japan as Pocket Monsters: XY',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_the_Series:_XY',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/f/f7/PokemonSeason17XYLogo.png',
  },
	{
		id: 's19',
    name: 'Pokemon: XY Kalos Quest', 
    desc: '2014, The eighteenth season of the Pokémon anime series and the second season of Pokémon the Series: XY, known in Japan as Pocket Monsters: XY',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_the_Series:_XY_Kalos_Quest',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/7/77/PokemonSeason18XYKalosQuestLogo.png',
  },
	{
		id: 's20',
    name: 'Pokemon: XYZ', 
    desc: '2015, The nineteenth season of the Pokémon anime series and the third and final season of Pokémon the Series: XY, known in Japan as Pocket Monsters: XY',
    link: ['https://en.wikipedia.org/wiki/Pok%C3%A9mon_the_Series:_XYZ',
           'Online Reference'],
    image:'https://upload.wikimedia.org/wikipedia/en/5/52/PokemonSeason19LogoXYZEnglish.png',
  },
];


const pokemonBookDetails = [
	{
		id: 'b01',
    name: 'Ash\'s Charizard Challenge',
    desc: 'Part of Pokémon Colossal Collection 16 Books Box Set',
    link: ['https://www.amazon.com/Pok%C3%A9mon-Colossal-Collection-Challenge-Charizard/dp/1408369095/',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/81-zUpIJ9NL._SL1500_.jpg',
  },
  {
		id: 'b02',
    name: 'Bulbasaur and the Hidden Village',
    desc: 'Not a book but the title of Episode 10 from the first season of the Pokémon anime',
    link: ['https://www.google.com/search?q=BOOK+Bulbasaur+and+the+Hidden+Village',
           'Online Reference'],
    image:'https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/seasons/season01/season01_ep10_ss01.jpg',
  },
	{
		id: 'b03',
    name: 'Charizard Go!',
    desc: '2000, Pokemon Chapter Books, No. 6',
    link: ['https://www.amazon.com/Charizard-Pokemon-Chapter-Books-No/dp/0439154219',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/51HIUnkNNPL.jpg',
  },
	{
		id: 'b04',
    name:'Night in the Haunted Tower',
    desc: 'Night in the Haunted Tower (Pokemon Chapter Book), 1999 by Tracey West (Author)',
    link: ['https://www.amazon.com/Night-Haunted-Tower-Pokemon-Chapter/dp/043913742X',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/61gDy7voDkL._SL1024_.jpg',
  },
	{
		id: 'b05',
    name:'I Choose You!',
    desc: 'I Choose You (Pokemon Chapter Book), 1999 by Tracey West (Author)',
    link: ['https://www.amazon.com/Choose-You-Pokemon-Chapter-Book/dp/0439104645',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/71rQzCHt5bL._SL1024_.jpg',
  },
	{
		id: 'b06',
    name:'Jigglypuff\'s Lullaby',
    desc: 'Pokemon Tales, Volume 11: Jigglypuff\'s Magic Lullaby June 2000 by Akihito Toda (Author)',
    link: ['https://www.amazon.in/Pokemon-Tales-11-Jigglypuffs-Lullaby/dp/156931442X',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/5159FZG6WDL.jpg',
  },
	{
		id: 'b07',
    name:'Meowth Rules',
    desc: 'not a book but the title of a popular episode from the Pokémon anime series',
    link: ['https://www.pokemon.com/us/animation/seasons/2/episode-41-meowth-rule',
           'Online Reference'],
    image:'https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/seasons/season02/season02_ep41_ss01.jpg',
  },
	{
		id: 'b08',
    name:'Mewtwo Strikes Back',
    desc: 'Mewtwo Strikes Back (Pokemon, the First Movie) 1999 by Tracey West (Author)',
    link: ['https://www.amazon.com/Mewtwo-Strikes-Pokemon-First-Movie/dp/0439137411',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/81NeS2N5MKL._SL1500_.jpg',
  },
	{
		id: 'b09',
    name:'Pikachu Shocks Back',
    desc: 'Four-issue miniseries "Pikachu Shocks Back"',
    link: ['https://www.amazon.com/Pokemon-Presents-Pikachu-Shocks-Complete/dp/B07K373CD',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/81SgidJOwZL._SL1500_.jpg',
  },
	{
		id: 'b10',
    name:'Pikachu\'s Global Adventure',
    desc: 'Pikachu\'s Global Adventure: The Rise and Fall of Pokemon, 2004 by Joseph Tobin (Editor)',
    link: ['https://www.amazon.com/Pikachus-Global-Adventure-Rise-Pok%C3%A9mon/dp/0822332876',
           'Online Reference'],
    image:'https://m.media-amazon.com/images/I/711vi3B9OvL._SL1500_.jpg',
  },
	{
		id: 'b11',
    name:'Pokemon Adventures',
    desc: 'Pokémon Adventures Collector\'s Edition, Vol. 1 Hidenori Kusaka, Mato (By (artist)',
    link: ['https://bookpeople.com/book/9781974709649',
           'Online Reference'],
    image:'https://images.booksense.com/images/649/709/9781974709649.jpg',
  },
];

const pokemonPosterDetails = [];


const pokemonGameDetails = [
	{
		id: 'g01',
    name: 'Pokemon Red', 
    desc: 'Nintendo, 1998, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/8/80/Red_EN_boxart.png',
  },
	{
		id: 'g02',
    name: 'Pokemon Blue', 
    desc: 'Nintendo, 1998, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/5/5a/Blue_EN_boxart.png',
  },
	{
		id: 'g03',
    name: 'Pokemon Gold', 
    desc: 'Nintendo, 1999, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/c/c7/Gold_EN_boxart.png',
  },
	{
		id: 'g04',
    name: 'Pokemon Silver', 
    desc: 'Nintendo, 1999, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/f/f5/Silver_EN_boxart.png',
  },
	{
		id: 'g05',
    name: 'Pokemon Crystal', 
    desc: 'Nintendo, 2000, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Crystal_Version',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/6/60/Crystal_EN_boxart.png',
  },
	{
		id: 'g06',
    name: 'Pokemon Ruby', 
    desc: 'Nintendo, 2002, Game Boy Advance, up to 4 players',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Ruby_and_Sapphire_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/5/5f/Ruby_EN_boxart.png',
  },
	{
		id: 'g07',
    name: 'Pokemon Sapphire', 
    desc: 'Nintendo, 2002, Game Boy Advance, up to 4 players',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Ruby_and_Sapphire_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/6/62/Sapphire_EN_boxart.png',
  },
	{
		id: 'g08',
    name: 'Pokemon Emerald', 
    desc: 'Nintendo, 2005, Game Boy Advance, up to 5 players',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Emerald_Version',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/6/65/Emerald_EN_boxart.jpg',
  },
	{
		id: 'g09',
    name: 'Pokemon Diamond', 
    desc: 'Nintendo, 2006, Nintendo DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Diamond_and_Pearl_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/6/69/Diamond_EN_boxart.jpg',
  },
	{
		id: 'g10',
    name: 'Pokemon Pearl',
    desc: 'Nintendo, 2006, Nintendo DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Diamond_and_Pearl_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/a/af/Pearl_EN_boxart.jpg',
  },
	{
		id: 'g11',
    name: 'Pokemon Platinum', 
    desc: 'Nintendo, 2008, Nintendo DS, 1-5 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Platinum_Version',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/8/83/Platinum_EN_boxart.png',
  },
	{
		id: 'g12',
    name: 'Pokemon Black', 
    desc: 'Nintendo, 2010, Nintendo DSi, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_and_White_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/d/dc/Black_EN_boxart.png',
  },
	{
		id: 'g13',
    name: 'Pokemon White', 
    desc: 'Nintendo, 2010, Nintendo DSi, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_and_White_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/0/08/White_EN_boxart.png',
  },
	{
		id: 'g14',
    name: 'Pokemon X', 
    desc: 'Nintendo, 2013, Nintendo 3DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_X_and_Y',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/2/27/X_EN_boxart.png',
  },
	{
		id: 'g15',
    name: 'Pokemon Y', 
    desc: 'Nintendo, 2013, Nintendo 3DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_X_and_Y',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/4/41/Y_EN_boxart.png',
  },
	{
		id: 'g16',
    name: 'Pokemon Sun', 
    desc: 'Nintendo, 2016, Nintendo 3DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sun_and_Moon',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/0/06/Sun_EN_boxart.png',
  },
	{
		id: 'g17',
    name: 'Pokemon Moon', 
    desc: 'Nintendo, 2016, Nintendo 3DS, 1-4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sun_and_Moon',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/38/Moon_EN_boxart.png',
  },
	{
		id: 'g18',
    name: 'Pokemon Sword', 
    desc: 'Nintendo, 2019, Nintendo Switch, 1-2, 4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sword_and_Shield',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/4/47/Sword_EN_boxart.png',
  },
	{
		id: 'g19',
    name: 'Pokemon Shield', 
    desc: 'Nintendo, 2019, Nintendo Switch, 1-2, 4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sword_and_Shield',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/8/8d/Shield_EN_boxart.png',
  },
	{
		id: 'g20',
    name: 'Pokemon GO', 
    desc: 'Ninatic, 2016, iOS, Android, 1+, Real-world adventure',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_GO',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/3d/Pokemon_Go_Logo.png',
  },
	{
		id: 'g21',
    name: 'Pokemon Green', 
    desc: 'Nintendo, 1996, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Green_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/2/21/Green_JP_boxart.png',
  },
	{
		id: 'g22',
    name: 'Super Smash Bros.', 
    desc: 'Nintendo, 1999, Nintendo 64, 4 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Super_Smash_Bros.',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/1/18/Super_Smash_Brothers_EN_boxart.jpg',
  },
	{
		id: 'g23',
    name: 'Pokemon Yellow', 
    desc: 'Nintendo, 1998, Game Boy, 2 players simultaneous',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Yellow_Version',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/9/95/Yellow_EN_boxart.png',
  },
	{
		id: 'g24',
    name: 'Pokemon Legends: Arceus', 
    desc: 'Nintendo, 2022, 	Nintendo Switch, 1 payer',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Legends:_Arceus',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/3a/Legends_Arceus_EN_boxart.png',
  },
	{
		id: 'g25',
    name: 'Pokemon FireRed', 
    desc: 'Nintendo, 2004, 	:	Game Boy Advance, up to 5',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/4/43/FireRed_EN_boxart.png',
  },
	{
		id: 'g26',
    name: 'Pokemon LeafGreen', 
    desc: 'Nintendo, 2004, 	:	Game Boy Advance, up to 5',
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_FireRed_and_LeafGreen_Versions',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/d/d7/LeafGreen_EN_boxart.png',
  },
];

const pokemonDetails = {
  Pikachu: {
    color: 'Yellow',
    weight: '6.0 kg',
    height: '0.4 m',
    type: 'Electric',
    category: 'Mouse Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Yellow', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon Legends: Arceus', 'Pokemon GO'],// 'Super Smash Bros.'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Pokemon: Pikachu in Love', 'I Choose You!', 'Team Rocket Trouble', 'Charizard Go!', 'Pikachu Shocks Back', 'Pikachu\'s Global Adventure'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Pikachu Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Detective Pikachu Poster', 'Pikachu with Ash Poster', 'Pikachu and Eevee Poster', 'Pokemon Generations Poster', 'Pikachu in Space Poster', 'Pikachu and Friends Poster'],
    powers: ['Thunder Shock', 'Quick Attack', 'Iron Tail', 'Electro Ball', 'Volt Tackle'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png',
  },

  Charizard: {
    color: 'Orange',
    weight: '90.5 kg',
    height: '1.7 m',
    type: 'Fire/Flying',
    category: 'Flame Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon FireRed', 'Pokemon LeafGreen', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Pokemon: Charizard in Trouble', 'Ash\'s Charizard Challenge', 'Charizard Go!', 'Pokemon: The First Movie', 'Mewtwo Strikes Back', 'Pokemon: Mewtwo Returns'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Charizard Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Mega Charizard X Poster', 'Mega Charizard Y Poster', 'Charizard with Ash Poster', 'Charizard and Friends Poster', 'Pokemon Generations Poster', 'Charizard in Space Poster'],
    powers: ['Flamethrower', 'Fly', 'Dragon Claw', 'Fire Spin', 'Slash'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/38/0006Charizard.png',
  },
  Bulbasaur: {
    color: 'Green',
    weight: '6.9 kg',
    height: '0.7 m',
    type: 'Grass/Poison',
    category: 'Seed Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Green', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Pokemon: Bulbasaur\'s Mysterious Garden', 'The Trouble with Bullies', 'Pokemon: I Choose You!', 'Pokemon: Bulbasaur\'s Bad Day', 'The Bulbasaur and the Beautiful Garden', 'Bulbasaur and the Hidden Village'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Bulbasaur Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Bulbasaur with Ash Poster', 'Bulbasaur in the Garden Poster', 'Pokemon Generations Poster', 'Bulbasaur and Friends Poster', 'Bulbasaur in Space Poster', 'Bulbasaur and Pikachu Poster'],
    powers: ['Vine Whip', 'Razor Leaf', 'Solar Beam', 'Seed Bomb', 'Tackle'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png',
  },
  Squirtle: {
    color: 'Blue',
    weight: '9.0 kg',
    height: '0.5 m',
    type: 'Water',
    category: 'Tiny Turtle Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Green', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Pokemon: The Wacky Watcher', 'Pokemon: The First Movie', 'Pokemon: I Choose You!', 'The Legend of Thunder', 'Pokemon: Ash and the Squirtle Squad', 'Squirtle Saves the Day'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Squirtle Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Squirtle with Ash Poster', 'Squirtle in the Water Poster', 'Pokemon Generations Poster', 'Squirtle and Friends Poster', 'Squirtle in Space Poster', 'Squirtle and Pikachu Poster'],
    powers: ['Water Gun', 'Bubble', 'Tackle', 'Bite', 'Skull Bash'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/5/54/0007Squirtle.png',
  },
  Jigglypuff: {
    color: 'Pink',
    weight: '5.5 kg',
    height: '0.5 m',
    type: 'Normal/Fairy',
    category: 'Balloon Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Super Smash Bros.'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Pokemon: Jigglypuff\'s Song', 'Jigglypuff\'s Singing Sensation', 'The Song of Jigglypuff', 'Jigglypuff and the Mystery Zone', 'Jigglypuff and the Sinister Song', 'Jigglypuff\'s Lullaby'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Jigglypuff Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Jigglypuff with Ash Poster', 'Jigglypuff Singing Poster', 'Pokemon Generations Poster', 'Jigglypuff and Friends Poster', 'Jigglypuff in Space Poster', 'Jigglypuff and Pikachu Poster'],
    powers: ['Sing', 'Pound', 'Double Slap', 'Rest', 'Hyper Voice'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Jigglypuff_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/3a/0039Jigglypuff.png',
  },
  Meowth: {
    color: 'Yellow',
    weight: '4.2 kg',
    height: '0.4 m',
    type: 'Normal',
    category: 'Scratch Cat Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon GO'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Meowth\'s Party', 'The Meowth and the Mystery', 'Meowth Rules', 'Meowth\'s Big Battle', 'Meowth and the Great Escape', 'Team Rocket to the Rescue'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Meowth Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Meowth with Team Rocket Poster', 'Meowth and Friends Poster', 'Pokemon Generations Poster', 'Meowth in Space Poster', 'Meowth and Pikachu Poster', 'Meowth\'s Mischief Poster'],
    powers: ['Scratch', 'Bite', 'Pay Day', 'Fury Swipes', 'Night Slash'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Meowth_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/d/d6/0052Meowth.png',
  },
  Psyduck: {
    color: 'Yellow',
    weight: '19.6 kg',
    height: '0.8 m',
    type: 'Water',
    category: 'Duck Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon GO'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'The Psyduck and the Pokedex', 'Psyduck\'s Panic', 'Psyduck\'s Love Song', 'Psyduck in Trouble', 'Psyduck\'s Wild Ride', 'Psyduck\'s Psychic Surprise'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Psyduck Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Psyduck with Misty Poster', 'Psyduck in the Water Poster', 'Pokemon Generations Poster', 'Psyduck and Friends Poster', 'Psyduck in Space Poster', 'Psyduck and Pikachu Poster'],
    powers: ['Water Gun', 'Confusion', 'Scratch', 'Zen Headbutt', 'Hydro Pump'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Psyduck_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/3/3f/0054Psyduck.png',
  },
  Eevee: {
    color: 'Brown',
    weight: '6.5 kg',
    height: '0.3 m',
    type: 'Normal',
    category: 'Evolution Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon GO'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Eevee\'s Evolutionary Adventures', 'The Eevee and the Trainer', 'Eevee\'s Great Escape', 'Eevee and Friends', 'The Legend of Eevee', 'Eevee\'s Secret Mission'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Eevee Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Eevee with Pikachu Poster', 'Eevee and Friends Poster', 'Pokemon Generations Poster', 'Eevee in Space Poster', 'Eevee and Ash Poster', 'Eevee\'s Evolutionary Poster'],
    powers: ['Tackle', 'Quick Attack', 'Bite', 'Swift', 'Take Down'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Eevee_(Pok%C3%A9mon)',
           'Online Reference'],
    image: 'https://archives.bulbagarden.net/media/upload/4/4c/0133Eevee.png',
  },
  Snorlax: {
    color: 'Black',
    weight: '460.0 kg',
    height: '2.1 m',
    type: 'Normal',
    category: 'Sleeping Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon GO'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Snorlax\'s Hunger', 'The Snorlax and the Trainer', 'Snorlax\'s Lazy Day', 'Snorlax and Friends', 'Snorlax\'s Great Escape', 'The Legend of Snorlax'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Snorlax Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Snorlax with Ash Poster', 'Snorlax Sleeping Poster', 'Pokemon Generations Poster', 'Snorlax and Friends Poster', 'Snorlax in Space Poster', 'Snorlax and Pikachu Poster'],
    powers: ['Tackle', 'Body Slam', 'Rest', 'Snore', 'Hyper Beam'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
             'Online Reference'],
  image:'https://archives.bulbagarden.net/media/upload/3/3f/0143Snorlax.png',
  },
  Gengar: {
    color: 'Purple',
    weight: '40.5 kg',
    height: '1.5 m',
    type: 'Ghost/Poison',
    category: 'Shadow Pokémon',
    games: ['Pokemon Red', 'Pokemon Blue', 'Pokemon Gold', 'Pokemon Silver', 'Pokemon Crystal', 'Pokemon Ruby', 'Pokemon Sapphire', 'Pokemon Emerald', 'Pokemon Diamond', 'Pokemon Pearl', 'Pokemon Platinum', 'Pokemon Black', 'Pokemon White', 'Pokemon X', 'Pokemon Y', 'Pokemon Sun', 'Pokemon Moon', 'Pokemon Sword', 'Pokemon Shield', 'Pokemon GO'],
    tvShows: ['Pokemon: Indigo League', 'Pokemon: Adventures in the Orange Islands', 'Pokemon: Johto Journeys', 'Pokemon: Johto League Champions', 'Pokemon: Master Quest', 'Pokemon: Advanced', 'Pokemon: Advanced Challenge', 'Pokemon: Advanced Battle', 'Pokemon: Battle Frontier', 'Pokemon: Diamond and Pearl', 'Pokemon: Diamond and Pearl Battle Dimension', 'Pokemon: Diamond and Pearl Galactic Battles', 'Pokemon: Diamond and Pearl Sinnoh League Victors', 'Pokemon: Black and White', 'Pokemon: Black and White Rival Destinies', 'Pokemon: Black and White Adventures in Unova and Beyond', 'Pokemon: XY', 'Pokemon: XY Kalos Quest', 'Pokemon: XYZ', 'Pokemon Journeys'],
    books: ['Pokemon Adventures', 'The Electric Tale of Pikachu', 'Pokemon Junior', 'Pokemon Tales', 'Night in the Haunted Tower', 'The Gengar and the Trainer', 'Gengar\'s Mischief', 'Gengar and Friends', 'Gengar\'s Great Escape', 'The Legend of Gengar'],
    posters: ['Pokemon Red and Blue Poster', 'Pokemon Gengar Evolution Poster', 'Pokemon 25th Anniversary Poster', 'Pokemon Movie Poster', 'Gengar with Ash Poster', 'Gengar in the Dark Poster', 'Pokemon Generations Poster', 'Gengar and Friends Poster', 'Gengar in Space Poster', 'Gengar and Pikachu Poster'],
    powers: ['Lick', 'Shadow Ball', 'Hypnosis', 'Dream Eater', 'Night Shade'], 
    link: ['https://bulbapedia.bulbagarden.net/wiki/Gengar_(Pok%C3%A9mon)',
           'Online Reference'],
    image:'https://archives.bulbagarden.net/media/upload/4/47/0094Gengar.png',
  }
};

const PokemonNodeType = {
  Pokemons:    {id:2,  name: "Pokemons"},    
  Games:       {id:4,  name: "Games"},  
  TvShows:     {id:6,  name: "TvShows"},
  Books:       {id:8,  name: "Books"}, 
  Posters:     {id:10, name: "Posters"},
  Pokemon:     {id:12, name: "Pokemon"},
  PokemonLink: {id:13, name: "Pokemon"},
  Game:        {id:14, name: "Game"},
  GameLink:    {id:15, name: "Game"},
  TvShow:      {id:16, name: "TvShow"},
  TvShowLink:  {id:17, name: "TvShow"},
  Book:        {id:18, name: "Book"},
  BookLink:    {id:19, name: "Book"},
  Poster:      {id:20, name: "Poster"},
  PosterLink:  {id:21, name: "Poster"},
  Power:       {id:22, name: "Power"},
 
  instanceOf ( id ) {
    var ret;
    for (const key in PokemonNodeType) {
      const value = PokemonNodeType[key];
      if (value.id === id) {
        ret = value;
        break;
      }
    }
    return ret;
  }
};
// statuses
// 1  : deleted
// 2  : locked
// 3  : checked 
// 4  : question 


class TreeNodeDto {
  id;
  parentId;
  linkId;
  name;
  kind;
  entityId;
  treeFlags;
  statusCode;
  moreRemaining;
  level;
  desc;
  path;

  constructor ( id, parentId, linkId, name, kind, entityId, treeFlags, statusCode, moreRemaining, level, path, desc) {
    this.id = id;
    this.parentId = parentId;
    this.linkId = linkId;
    this.name = name;
    this.kind = kind;
    this.entityId = entityId;
    this.treeFlags = treeFlags;
    this.statusCode = statusCode;
    this.moreRemaining = moreRemaining;
    this.level = level;
    this.desc = desc;
    this.path = path; 
  } 

}

class Datastore {

  pkmns = Array(0);
  constructor () {
    this.init ();
  }
 
  log(...par) {
    if (DEBUG) {
      console.log(...par);
    }
  }


  findGameById(id) {
  	let ret = null;
		const selected = pokemonGameDetails.filter((x) => x.id == id);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }
  findGameByName(gname) {
  	let ret = null;
		const selected = pokemonGameDetails.filter((x) => x.name == gname);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }
  findPosterByName(pname) {
  	let ret = null;
		const selected = pokemonPosterDetails.filter((x) => x.name == pname);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }
  findPosterById(id) {
  	let ret = null;
		const selected = pokemonPosterDetails.filter((x) => x.id == id);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }

  findBookByName(bname) {
  	let ret = null;
		const selected = pokemonBookDetails.filter((x) => x.name == bname);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }
  findBookById(id) {
  	let ret = null;
		const selected = pokemonBookDetails.filter((x) => x.id == id);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }

  findShowByName(sname) {
  	let ret = null;
		const selected = pokemonShowDetails.filter((x) => x.name == sname);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }

  findShowById(id) {
  	let ret = null;
		const selected = pokemonShowDetails.filter((x) => x.id == id);
		if (selected && selected.length > 0) {
			ret = selected[0];
    }
    return ret;
  }

  add( id, parentId, linkId, name, kind, entityId, treeFlags, statusCode, moreRemaining, level, path, desc) {
    this.pkmns[this.pkmns.length] = new TreeNodeDto
     ( id, parentId, linkId, name, kind, entityId, treeFlags, statusCode, moreRemaining, level, path, desc); 
  }

  init () {
    this.add("pokemons", null, null, 'All Pokemons', PokemonNodeType.Pokemons.id, "pokemons", 'BT', 0, false, 0, [], '"All Pokemons" generic folder'); 
    this.add("games",    null, null, 'All Games',    PokemonNodeType.Games.id,    "games",    'BT', 0, false, 0, [], '"All Games" generic folder'); 
    this.add("books",    null, null, 'All Books',    PokemonNodeType.Books.id,    "books",    'BT', 0, false, 0, [], '"All Books" generic folder'); 
    this.add("tvshows",  null, null, 'All Tv Shows', PokemonNodeType.TvShows.id,  "tvshows",  'BT', 0, false, 0, [], '"All Tv Shows" generic folder'); 
    this.add("posters",  null, null, 'All Posters',  PokemonNodeType.TvShows.id,  "posters",  'BT', 0, false, 0, [], '"All Posters" generic folder'); 
    pokemons.forEach((x)       => this.fillPokemon(x, 'pokemons'));
    pokemonGames.forEach((x)   => this.fillGame(x, "games")); 
    pokemonBooks.forEach((x)   => this.fillBook(x, "books")); 
    pokemonShows.forEach((x)   => this.fillShow(x, "tvshows")); 
    pokemonPosters.forEach((x) => this.fillPoster(x, "posters")); 
  }

  fillPokemon(pkmn, root) {
      //add pokemon
      this.add(pkmn, 'pokemons', null, pkmn, PokemonNodeType.Pokemon.id, pkmn, 'BTb', 0, false, 1, [root]
        , pokemonDetails[pkmn].type + ', ' + pokemonDetails[pkmn].color + ', ' + pokemonDetails[pkmn].category);
    
      //add Games
      const games_id = pkmn + "-games";
      this.add(games_id, pkmn, null, "Games", PokemonNodeType.Games.id, null, 'Bb', 0, false, 2, [root,pkmn], 'Games where Pokémon appears');
      pokemonDetails[pkmn].games.forEach((gm) => {
        let details = this.findGameByName(gm);
        if (details) {
          this.add (pkmn + "-" + details.id, games_id, details.id, details.name, PokemonNodeType.Game.id + 1, details.id, 'b', 0, false, 3, [root, pkmn, games_id], details.desc);
        } else {
          this.add (pkmn + "-" + gm,         games_id,         gm,           gm, PokemonNodeType.Game.id + 1,         gm, 'b', 4, false, 3, [root, pkmn, games_id], "Details not found");
        }
      });
      //add shows
      const shows_id = pkmn + "-shows";
      this.add(shows_id, pkmn, null, "TV Shows", PokemonNodeType.TvShows.id, null, 'Bb', 0, false, 2, [root,pkmn], 'Tv Shows where Pokémon appears');
      pokemonDetails[pkmn].tvShows.forEach((sh) => {
        let details = this.findShowByName(sh);
        if (details) {
          this.add (pkmn + "-" + details.id, shows_id, details.id, details.name, PokemonNodeType.TvShow.id + 1, details.id, 'b', 0, false, 3, [root, pkmn, shows_id], details.desc)
        } else {
          this.add (pkmn + "-" + sm,         shows_id,         gm,           gm, PokemonNodeType.TvShow.id + 1,         sh, 'b', 4, false, 3, [root, pkmn, shows_id], "Details not found");
        }
      });
      
      //add books
      const books_id = pkmn + "-books";
      this.add(books_id, pkmn, null, "Books", PokemonNodeType.Books.id, null, 'Bb', 0, false, 2, [root,pkmn], 'Books that mention Pokémon');
      pokemonDetails[pkmn].books.forEach((bk) => {
        let details = this.findBookByName(bk);
        if (details) {
          this.add (pkmn + "-" + details.id, books_id, details.id, details.name, PokemonNodeType.Book.id + 1, details.id, 'b', 0, false, 3, [root, pkmn, books_id], details.desc)
        } else {
          this.add (pkmn + "-" + bk,         books_id,         bk,           bk, PokemonNodeType.Book.id + 1,         bk, 'b', 4, false, 3, [root, pkmn, books_id], "Details not found");
        }
      });
      
      //add posters
      const posters_id = pkmn + "-posters";
			this.add(posters_id, pkmn, null, "Posters", PokemonNodeType.Posters.id, null, 'Bb', 0, false, 2, [root,pkmn], 'Posters where Pokémon appears');
      pokemonDetails[pkmn].posters.forEach((pst) => {
        let details = this.findPosterByName(pst);
        if (details) {
          this.add (pkmn + "-" + details.id, posters_id, details.id, details.name, PokemonNodeType.Poster.id + 1, details.id, 'b', 0, false, 3, [root, pkmn, posters_id], details.desc)
        } else {
          this.add (pkmn + "-" + pst,        posters_id,        pst,          pst, PokemonNodeType.Poster.id + 1,        pst, 'b', 4, false, 3, [root, pkmn, posters_id], "Details not found");
        }
      });
  }

//  add( id, parentId, linkId, name, kind, entityId, treeFlags, statusCode, moreRemaining, level, path, desc) {
  fillShow(sh, root) {
    const show = this.findShowByName(sh);
    if (show) {
      this.add(show.id, root, null, show.name, PokemonNodeType.TvShow.id, show.id, 'Bb', 0, false, 1, [root], show.desc);
    }  else {
      this.add(sh,      root, null,        sh,  PokemonNodeType.TvShow.id,     sh, 'Bb', 4, false, 1, [root], "No details found");
    }
    pokemons.forEach((x) => this.fillShowPkmn(x, show ? show.id : sh, show ? show.name : sh, root));
  } 
  fillShowPkmn(pkmn, show_id, show_name, root) {
    const details = pokemonDetails[pkmn];
    if (details) {
      const selected = details.tvShows.filter((x) => x == show_name);
      if (selected && selected.length > 0) {
        this.add (show_id + '-' + pkmn, show_id, pkmn, pkmn, PokemonNodeType.Pokemon.id + 1, pkmn, 'b', 0, false, 2, [root, show_id],  details.type + ', ' + details.color + ', ' + details.category);
      }
    }
  }

  fillPoster(pst, root) {
    const poster = this.findPosterByName(pst);
    if (poster) {
      this.add(poster.id, root, null, poster.name, PokemonNodeType.Poster.id, show.id, 'Bb', 0, false, 1, [root], poster.desc);
    }  else {
      this.add(pst,       root, null,         pst, PokemonNodeType.Poster.id,     pst, 'Bb', 4, false, 1, [root], "No details found");
    }
    pokemons.forEach((x) => this.fillPosterPkmn(x, poster ? poster.id : pst, poster ? poster.name : pst, root));
  } 
  fillPosterPkmn(pkmn, poster_id, poster_name, root) {
    const details = pokemonDetails[pkmn];
    if (details) {
      const selected = details.posters.filter((x) => x == poster_name);
      if (selected && selected.length > 0) {
        this.add (poster_id + '-' + pkmn, poster_id, pkmn, pkmn, PokemonNodeType.Pokemon.id + 1, pkmn, 'b', 0, false, 2, [root, poster_id],  details.type + ', ' + details.color + ', ' + details.category);
      }
    }
  }

  fillBook(bk, root) {
    const book = this.findBookByName(bk);
    if (book) {
      this.add(book.id, root, null, book.name, PokemonNodeType.Book.id, book.id, 'Bb', 0, false, 1, [root], book.desc);
    }  else {
      this.add(bk,      root, null,        bk,  PokemonNodeType.Book.id,     bk, 'Bb', 4, false, 1, [root], "No details found");
    }
    pokemons.forEach((x) => this.fillBookPkmn(x, book ? book.id : bk, book ? book.name : bk, root));
  } 
  fillBookPkmn(pkmn, book_id, book_name, root) {
    const details = pokemonDetails[pkmn];
    if (details) {
      const selected = details.books.filter((x) => x == book_name);
      if (selected && selected.length > 0) {
        this.add (book_id + '-' + pkmn, book_id, pkmn, pkmn, PokemonNodeType.Pokemon.id + 1, pkmn, 'b', 0, false, 2, [root, book_id],  details.type + ', ' + details.color + ', ' + details.category);
      }
    }
  }

  fillGame(gmn, root) {
    const game = this.findGameByName(gmn);
    if (game) {
      this.add(game.id, root, null, game.name, PokemonNodeType.Game.id, game.id, 'Bb', 0, false, 1, [root], game.desc);
    }  else {
      this.add(gmn,     root, null,       gmn, PokemonNodeType.Game.id,     gmn, 'Bb', 4, false, 1, [root], "No details found");
    }
    pokemons.forEach((x) => this.fillGamePkmn(x, game ? game.id : gmn, game ? game.name : gmn, root));
  } 
  fillGamePkmn(pkmn, game_id, game_name, root) {
    const details = pokemonDetails[pkmn];
    if (details) {
      const selected = details.games.filter((x) => x == game_name);
      if (selected && selected.length > 0) {
        this.add (game_id + '-' + pkmn, game_id, pkmn, pkmn, PokemonNodeType.Pokemon.id + 1, pkmn, 'b', 0, false, 2, [root, game_id],  details.type + ', ' + details.color + ', ' + details.category);
      }
    }
  }

  getChildren (parent, skip, take) {
    var s = Number(skip);
    var t = Number(take);
    const selected = this.pkmns.filter((x) => x.parentId == parent);
//this.log(parent, s, t, selected);
    let data = [];
    if (selected && selected.length > 0) {
      data = this.deepCopy(selected.slice(s, s + t));

      if (data.length > 0 && (s + data.length) < selected.length ) {
//this.log("has more after ", data[data.length-1].id);        
        data[data.length-1].moreRemaining = true;
      }

    }
    return data;
  }


  getPath (node_id) {
    var data = [];
    const selected = this.pkmns.filter((x) => x.id == node_id);
//this.log('id',node_id, selected); 
    if (selected && selected.length > 0) {
      data = selected[0].path;
    };
    return data;
  }

  deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      const copy = [];
      for (let i = 0; i < obj.length; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    const copy = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = this.deepCopy(obj[key]);
      }
    }
    return copy;
  }

  getRoot () {
    const selected = this.pkmns.filter((x) => (!x.parentId) );
//this.log(parent, s, t, selected);
    let data = [];
    if (selected && selected.length > 0) {
      data = this.deepCopy(selected);
    }
    return data;
  }


  googleIt(node) {
    var ret = ('https://www.google.com/search?q='
       + "+" + PokemonNodeType.instanceOf (node.kind).name
       + "+" + node.name);
    return  ret.replace("'","%27").replace(" ","+");
  }

  getNodeDetails (id) {
    var ret;
//this.log("looking:", id);
    const selected = this.pkmns.filter((x) => x.id == id);
//this.log("looking:", id,' found:', selected);
    if (selected && selected.length > 0) {
      let node = selected[0];
      switch (node.kind) {
        case PokemonNodeType.Pokemon.id:
        case PokemonNodeType.Pokemon.id + 1:
          ret = pokemonDetails[node.entityId];
          break;
        case PokemonNodeType.Game.id:
        case PokemonNodeType.Game.id + 1:
          ret = this.findGameById(node.entityId);
          break;
        case PokemonNodeType.TvShow.id:
        case PokemonNodeType.TvShow.id + 1:
          ret = this.findShowById(node.entityId);
          break;
        case PokemonNodeType.Book.id:
        case PokemonNodeType.Book.id + 1:
          ret = this.findBookById(node.entityId);
          break;
        case PokemonNodeType.Poster.id:
        case PokemonNodeType.Poster.id + 1:
          ret = this.findPosterById(node.entityId);
          break;
        default:
          break;
      }
      if (!ret) {
        ret = 	{
          id: id,
          name: id, 
          desc: 'No details were found',
          link: [this.googleIt(node), 'Google it...'],
          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56r0NfYX5KeWeBOFqDxS0-h_p5efe-aXSRQ&s',
        };
      }
    }
    return ret;
  }

 findEntityNode (entity_id, entity_name, entity_kind) {
    var ret;
    var selected;
    if (entity_id) {
        selected = this.pkmns.filter((x) => (x.linkId) && (x.entityId == entity_id));
    } else if (entity_name && entity_kind) {
        selected = this.pkmns.filter((x) => (x.kind == entity_kind) && (x.name == entity_name));
    }
    if (selected && selected.length > 0) {
      ret = selected[0];
    }
    return ret;
  }
  
  dictionary(entity_kind) {
    var ret;
    if (!entity_kind || entity_kind < 12 || entity_kind > 22) {
      return ret;
    }
    var selected = dictionaries.filter((x) => (x.kind == entity_kind));
    if (selected && selected.length > 0) {
      ret = selected[0].layers;
    } else {
      ret = dictionaries[0].layers;
    }
    return ret;
  }

  esquire ( id, skip, take) {
    var data = [];
    if (id && id.length > 0) {
      data = this.getChildren(decodeURIComponent(id)
      , skip ? skip : 0, take ? take : 10);
      if (data) {
          this.log('esq ~ id:',id,'skip:',skip,'take:',take,
            'length:',data.length, 'data:',data);
      } else {  
          this.log('esq ~ id:',id,'skip:',skip,'take:',take,
            'no data');
          data = [];
      }
    } else {
      data = this.getRoot();
      this.log(data);
    }
    return data;
  }

  esquireCmd (id, cmd) {
    var data = undefined;
    if (id) {
//this.log("pass to looking:", id);
      data = this.getNodeDetails((id && id.length>0)?decodeURIComponent(id):undefined);
      if (data) {
        this.log('esq-cmd ~ id:',id, 
          'length:',data.length, 'data:',data);
      } else {  
        this.log('esq-cmd ~ id:',id, 'no data');
      }
    }
    this.log(data);
    return data;
  }
  
  esquireDictionary(kind) {
    var data = this.dictionary(kind);
    this.log('esq-dict ~ kind:', kind, data);
    return data;
  }

  esquireEntityNode (id, name, kind) {
    var data = this.findEntityNode(
      (id && id.length>0)?decodeURIComponent(id):undefined,
      name ? decodeURIComponent(name):undefined,
      kind
    );
    this.log('esq-enode ~ id:',id,' name:', name, ' kind:', kind, data);    
    return data;
  }

  esquirePath (id)  {
    var data = [];
    if (id) {
      data = this.getPath((id && id.length>0)?decodeURIComponent(id):undefined);
      if (data) {
          this.log('esq-path ~ id:',id, 
            'length:',data.length, 'data:',data);
      } else {  
          this.log('esq-path ~ id:',id, 'no data');
          data = [];
      }
    }
    this.log(data);
    return data;
  }

}

module.exports = { 
  Datastore
};