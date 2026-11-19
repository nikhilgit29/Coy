import prisma, { DEMO_USER_ID } from '../services/db.js';

export const getMatches = async (req, res) => {
  try {
    // Only fetch records from the Match table, which guarantees mutual liking
    const matches = await prisma.match.findMany({
      where: {
        userId: DEMO_USER_ID
      },
      include: {
        profile: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedMatches = matches.map(m => ({
      matchId: m.id,
      matchedAt: m.createdAt,
      profile: {
        id: m.profile.id,
        name: m.profile.name,
        age: m.profile.age,
        photo: m.profile.photo,
        cityOrCollege: m.profile.cityOrCollege,
        bio: m.profile.bio,
        interests: typeof m.profile.interests === 'string' ? JSON.parse(m.profile.interests) : m.profile.interests
      }
    }));

    return res.json({
      success: true,
      count: formattedMatches.length,
      matches: formattedMatches
    });
  } catch (error) {
    console.error("Error in getMatches:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch matches"
    });
  }
};

export const resetSwipes = async (req, res) => {
  try {
    await prisma.swipe.deleteMany({
      where: { userId: DEMO_USER_ID }
    });

    await prisma.match.deleteMany({
      where: { userId: DEMO_USER_ID }
    });

    return res.json({
      success: true,
      message: "Demo swipes and matches have been reset successfully."
    });
  } catch (error) {
    console.error("Error in resetSwipes:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to reset swipes"
    });
  }
};
