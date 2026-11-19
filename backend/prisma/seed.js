import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEMO_USER_ID = "demo-user-123";

const MOCK_PROFILES = [
  {
    id: "prof-1",
    name: "Maya Patel",
    age: 21,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "UC Berkeley",
    bio: "Architecture major, matcha enthusiast, and amateur film photographer. Catch me hunting for mid-century modern furniture.",
    interests: JSON.stringify(["Architecture", "Matcha", "Film Photography", "Design", "Vinyl"]),
    preLikedUser: true
  },
  {
    id: "prof-2",
    name: "Liam Chen",
    age: 23,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Stanford University",
    bio: "CS + Philosophy. I spend too much time building indie games and analyzing A24 movie scores. Let's debate sci-fi plots.",
    interests: JSON.stringify(["Indie Games", "Sci-Fi", "A24", "Climbing", "Coffee"]),
    preLikedUser: false
  },
  {
    id: "prof-3",
    name: "Chloe Rodriguez",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "San Francisco, CA",
    bio: "Graphic designer with a weakness for typography, sour beers, and thrifted leather jackets. Always planning the next road trip.",
    interests: JSON.stringify(["Typography", "Thrifting", "Road Trips", "Concerts", "Art"]),
    preLikedUser: true
  },
  {
    id: "prof-4",
    name: "Noah Washington",
    age: 24,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Columbia University",
    bio: "Jazz saxophonist by night, creative strategist by day. Looking for someone who appreciates late-night diner pancakes.",
    interests: JSON.stringify(["Jazz", "Diners", "Poetry", "Vinyl", "Night Walks"]),
    preLikedUser: false
  },
  {
    id: "prof-5",
    name: "Aria Sharma",
    age: 20,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "NYU Tisch",
    bio: "Screenwriting student. Probably romanticizing everyday life in the subway or curating oddly specific Spotify playlists.",
    interests: JSON.stringify(["Screenwriting", "Indie Pop", "Coffee", "Museums", "Cinema"]),
    preLikedUser: false
  },
  {
    id: "prof-6",
    name: "Julian Rivera",
    age: 23,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Austin, TX",
    bio: "Food truck explorer, analog synth tinkerer, and golden retriever dad. Tell me your top 3 comfort foods.",
    interests: JSON.stringify(["Tacos", "Synths", "Dogs", "Biking", "Live Music"]),
    preLikedUser: true
  },
  {
    id: "prof-7",
    name: "Sienna Brooks",
    age: 22,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "UCLA",
    bio: "Marine biology researcher and weekend surfer. I collect shells, love beach bonfires, and make a mean batch of sourdough.",
    interests: JSON.stringify(["Surfing", "Marine Biology", "Baking", "Sunsets", "Hiking"]),
    preLikedUser: false
  },
  {
    id: "prof-8",
    name: "Ethan Kim",
    age: 21,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "University of Washington",
    bio: "Industrial design geek. Coffee roaster, rainy day enthusiast, and big fan of Japanese stationery stores.",
    interests: JSON.stringify(["Coffee Roasting", "Stationery", "Industrial Design", "Ceramics"]),
    preLikedUser: true
  },
  {
    id: "prof-9",
    name: "Zara Al-Mansoor",
    age: 23,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Toronto, ON",
    bio: "Curator in training. Passionate about contemporary Middle Eastern art, spicy noodles, and vintage postcards.",
    interests: JSON.stringify(["Art Galleries", "Spicy Food", "Postcards", "Reading", "Travel"]),
    preLikedUser: false
  },
  {
    id: "prof-10",
    name: "Lucas Vance",
    age: 22,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Boston University",
    bio: "Mechanical engineering student. I build combat robots for fun and run half-marathons. Looking for a banter partner.",
    interests: JSON.stringify(["Robotics", "Running", "Rock Climbing", "Podcasts"]),
    preLikedUser: false
  },
  {
    id: "prof-11",
    name: "Elena Rostova",
    age: 21,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "McGill University",
    bio: "Classical violinist venturing into shoegaze bands. Let's get croissants and wander around independent bookstores.",
    interests: JSON.stringify(["Violin", "Shoegaze", "Bookstores", "French Pastries", "Tea"]),
    preLikedUser: false
  },
  {
    id: "prof-12",
    name: "Marcus Thorne",
    age: 24,
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Chicago, IL",
    bio: "Urban planner fascinated by train transit maps. Passionate about craft coffee, bouldering, and rooftop gardens.",
    interests: JSON.stringify(["Urbanism", "Bouldering", "Espresso", "Plants", "Board Games"]),
    preLikedUser: true
  },
  {
    id: "prof-13",
    name: "Tara Kapoor",
    age: 22,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Emory University",
    bio: "Neuroscience major with an obsession for pottery and matcha lattes. Show me your silliest pet photos.",
    interests: JSON.stringify(["Ceramics", "Neuroscience", "Matcha", "Cats", "Biking"]),
    preLikedUser: false
  },
  {
    id: "prof-14",
    name: "Devon Hayes",
    age: 23,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Seattle, WA",
    bio: "Front-end dev who cares deeply about UI micro-interactions and dark roast beans. Let's play chess in the park.",
    interests: JSON.stringify(["Chess", "UI Design", "Coffee", "Indie Music", "Cycling"]),
    preLikedUser: false
  },
  {
    id: "prof-15",
    name: "Isla Campbell",
    age: 21,
    photo: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "University of Edinburgh",
    bio: "Literature student. Lover of rainy afternoons, Scottish highlands, folklore stories, and cozy wool sweaters.",
    interests: JSON.stringify(["Literature", "Folklore", "Hiking", "Tea", "Baking"]),
    preLikedUser: true
  },
  {
    id: "prof-16",
    name: "Mateo Garcia",
    age: 24,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Miami, FL",
    bio: "DJ and mixologist. I curate upbeat Latin house sets and concoct botanical mocktails. Looking for someone with rhythm.",
    interests: JSON.stringify(["DJing", "House Music", "Cooking", "Rollerblading"]),
    preLikedUser: false
  },
  {
    id: "prof-17",
    name: "Harper Lin",
    age: 20,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Rice University",
    bio: "Biochem nerd by day, competitive board gamer by weekend. Can explain CRISPR or teach you Settlers of Catan.",
    interests: JSON.stringify(["Biotech", "Board Games", "Dim Sum", "Boba", "Puzzles"]),
    preLikedUser: false
  },
  {
    id: "prof-18",
    name: "Cameron Diaz-Scott",
    age: 23,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Denver, CO",
    bio: "Ski instructor and backcountry camper. Let's wake up at 5am for fresh powder or share campfires under the Milky Way.",
    interests: JSON.stringify(["Skiing", "Camping", "Photography", "Astronomy"]),
    preLikedUser: false
  },
  {
    id: "prof-19",
    name: "Nia Okafor",
    age: 22,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Georgia Tech",
    bio: "Aerospace engineer dreaming of Mars rover missions. Loves Afrobeats dance classes and spontaneous karaoke nights.",
    interests: JSON.stringify(["Aerospace", "Afrobeats", "Karaoke", "Baking", "Sci-Fi"]),
    preLikedUser: true
  },
  {
    id: "prof-20",
    name: "Finnian Gallagher",
    age: 22,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Dublin / Boston",
    bio: "History major who knows too many obscure trivia facts about medieval castles. Always down for pub trivia.",
    interests: JSON.stringify(["History", "Trivia", "Guinness", "Soccer", "Guitar"]),
    preLikedUser: false
  },
  {
    id: "prof-21",
    name: "Sophie Leclerc",
    age: 23,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Montreal, QC",
    bio: "Fashion design student making upcycled streetwear. Let's go vintage hunting on Saint Laurent blvd.",
    interests: JSON.stringify(["Fashion", "Upcycling", "Thrifting", "Art", "Cafes"]),
    preLikedUser: false
  },
  {
    id: "prof-22",
    name: "Kai Takahashi",
    age: 21,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "University of Tokyo / USC",
    bio: "Film student focusing on stop-motion animation. Let's exchange favorite Miyazaki scenes and visit ramen spots.",
    interests: JSON.stringify(["Animation", "Ramen", "Cinema", "Drawing", "Film"]),
    preLikedUser: false
  },
  {
    id: "prof-23",
    name: "Gemma Ward",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Melbourne / NYC",
    bio: "Coffee barista by choice, botanical illustrator by passion. Let's discuss flat whites versus pour overs.",
    interests: JSON.stringify(["Specialty Coffee", "Botanical Art", "Plants", "Records", "Biking"]),
    preLikedUser: true
  },
  {
    id: "prof-24",
    name: "Zion Adebayo",
    age: 24,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "London / NY",
    bio: "Photographer documenting underground music scenes. Lover of 35mm film, vintage synthesizers, and street food.",
    interests: JSON.stringify(["Photography", "Street Food", "Music", "Synthesizers"]),
    preLikedUser: false
  },
  {
    id: "prof-25",
    name: "Priya Nair",
    age: 20,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Carnegie Mellon",
    bio: "HCI researcher designing intuitive interfaces for educational tech. Huge fan of escape rooms and bubble tea.",
    interests: JSON.stringify(["HCI", "Escape Rooms", "Boba", "Podcasts", "Design"]),
    preLikedUser: false
  },
  {
    id: "prof-26",
    name: "Lucas Morales",
    age: 23,
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "San Diego State",
    bio: "Surfing at sunrise, coding games at night. Looking for someone to join me for fish tacos and sunset drives.",
    interests: JSON.stringify(["Surfing", "Game Dev", "Sunsets", "Tacos", "Skateboarding"]),
    preLikedUser: false
  },
  {
    id: "prof-27",
    name: "Amara Bell",
    age: 21,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Vanderbilt University",
    bio: "Journalism student passionate about investigative podcasts, acoustic sets, and spicy pad thai.",
    interests: JSON.stringify(["Journalism", "Podcasts", "Acoustic Music", "Thai Food"]),
    preLikedUser: true
  },
  {
    id: "prof-28",
    name: "Oliver Sterling",
    age: 24,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Northwestern University",
    bio: "Journalist covering tech & culture. Amateur baker with a specialty in cardamom buns.",
    interests: JSON.stringify(["Baking", "Cardamom Buns", "Journalism", "Museums", "Coffee"]),
    preLikedUser: false
  },
  {
    id: "prof-29",
    name: "Freja Lindqvist",
    age: 22,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Stockholm / San Francisco",
    bio: "Industrial design exchange student. Living for sauna culture, clean typography, and cycling around the bay.",
    interests: JSON.stringify(["Design", "Sauna", "Cycling", "Minimalism", "Photography"]),
    preLikedUser: false
  },
  {
    id: "prof-30",
    name: "Dante Rossi",
    age: 23,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cityOrCollege: "Florence / NYU",
    bio: "Art history researcher and gelato connoisseur. I can show you the best hidden trattorias and rooftop views.",
    interests: JSON.stringify(["Art History", "Gelato", "Italian Cooking", "Cinema", "Architecture"]),
    preLikedUser: true
  }
];

async function main() {
  console.log("🌱 Starting Coy Discover database seeding...");

  // 1. Upsert Demo User
  const demoUser = await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      name: "Alex",
      age: 22,
      photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80",
      bio: "Product designer and indie film lover. Living in the city with two cats.",
      city: "San Francisco, CA",
      interests: JSON.stringify(["Design", "Films", "Coffee", "Vinyl"])
    }
  });

  console.log(`👤 Demo User: ${demoUser.name} (${demoUser.id}) ready.`);

  // 2. Clear previous swipes, matches, and incoming likes for fresh demo
  await prisma.swipe.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.match.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.incomingLike.deleteMany({});

  // 3. Upsert 30 Profiles and Seed Incoming Likes
  let incomingCount = 0;
  for (const p of MOCK_PROFILES) {
    const profile = await prisma.profile.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        age: p.age,
        photo: p.photo,
        cityOrCollege: p.cityOrCollege,
        bio: p.bio,
        interests: p.interests
      },
      create: {
        id: p.id,
        name: p.name,
        age: p.age,
        photo: p.photo,
        cityOrCollege: p.cityOrCollege,
        bio: p.bio,
        interests: p.interests
      }
    });

    if (p.preLikedUser) {
      await prisma.incomingLike.upsert({
        where: {
          profileId_userId: {
            profileId: profile.id,
            userId: DEMO_USER_ID
          }
        },
        update: {},
        create: {
          profileId: profile.id,
          userId: DEMO_USER_ID
        }
      });
      incomingCount++;
    }
  }

  console.log(`✨ Successfully seeded ${MOCK_PROFILES.length} profiles.`);
  console.log(`❤️ Seeded ${incomingCount} incoming secret likes to enable real mutual matches during demonstration.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
