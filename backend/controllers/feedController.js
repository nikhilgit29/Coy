import prisma, { DEMO_USER_ID } from '../services/db.js';

export const getFeed = async (req, res) => {
  try {
    // 1. Find all profile IDs that the demo user has already swiped on
    const existingSwipes = await prisma.swipe.findMany({
      where: { userId: DEMO_USER_ID },
      select: { profileId: true }
    });

    const swipedIds = existingSwipes.map(s => s.profileId);

    // 2. Fetch profiles not yet swiped on
    const profiles = await prisma.profile.findMany({
      where: {
        id: {
          notIn: swipedIds
        }
      },
      select: {
        id: true,
        name: true,
        age: true,
        photo: true,
        bio: true,
        cityOrCollege: true,
        interests: true,
        createdAt: true
        // NOTE: Strictly exclude any incomingLikes or internal relations to protect privacy!
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Format interests as JSON array
    const formattedProfiles = profiles.map(p => ({
      ...p,
      interests: typeof p.interests === 'string' ? JSON.parse(p.interests) : p.interests
    }));

    return res.json({
      success: true,
      count: formattedProfiles.length,
      profiles: formattedProfiles
    });
  } catch (error) {
    console.error("Error in getFeed:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch feed" });
  }
};
