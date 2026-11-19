import prisma, { DEMO_USER_ID } from '../services/db.js';

export const handleSwipe = async (req, res) => {
  try {
    const { profileId, action } = req.body;

    if (!profileId || !action) {
      return res.status(400).json({
        success: false,
        error: "profileId and action are required"
      });
    }

    const normalizedAction = action.toUpperCase();
    if (normalizedAction !== 'LIKE' && normalizedAction !== 'PASS') {
      return res.status(400).json({
        success: false,
        error: "action must be either LIKE or PASS"
      });
    }

    // Verify profile exists
    const profile = await prisma.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "Profile not found"
      });
    }

    // 1. Record the swipe (upsert to maintain idempotency)
    await prisma.swipe.upsert({
      where: {
        userId_profileId: {
          userId: DEMO_USER_ID,
          profileId: profileId
        }
      },
      update: {
        action: normalizedAction
      },
      create: {
        userId: DEMO_USER_ID,
        profileId: profileId,
        action: normalizedAction
      }
    });

    // 2. Check for mutual match if action is LIKE
    let isMatch = false;
    let matchedProfile = null;

    if (normalizedAction === 'LIKE') {
      const incomingLike = await prisma.incomingLike.findUnique({
        where: {
          profileId_userId: {
            profileId: profileId,
            userId: DEMO_USER_ID
          }
        }
      });

      if (incomingLike) {
        // Mutual like found!
        isMatch = true;

        // Persist the match
        await prisma.match.upsert({
          where: {
            userId_profileId: {
              userId: DEMO_USER_ID,
              profileId: profileId
            }
          },
          update: {},
          create: {
            userId: DEMO_USER_ID,
            profileId: profileId
          }
        });

        matchedProfile = {
          id: profile.id,
          name: profile.name,
          age: profile.age,
          photo: profile.photo,
          cityOrCollege: profile.cityOrCollege,
          bio: profile.bio,
          interests: typeof profile.interests === 'string' ? JSON.parse(profile.interests) : profile.interests
        };
      }
    }

    return res.json({
      success: true,
      action: normalizedAction,
      isMatch,
      matchedProfile
    });
  } catch (error) {
    console.error("Error in handleSwipe:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process swipe"
    });
  }
};
