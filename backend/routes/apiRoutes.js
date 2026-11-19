import { Router } from 'express';
import { getFeed } from '../controllers/feedController.js';
import { handleSwipe } from '../controllers/swipeController.js';
import { getMatches, resetSwipes } from '../controllers/matchController.js';
import prisma, { DEMO_USER_ID } from '../services/db.js';

const router = Router();

// Feed endpoint
router.get('/feed', getFeed);

// Swipe endpoint
router.post('/swipe', handleSwipe);

// Matches endpoint
router.get('/matches', getMatches);

// Demo convenience endpoints
router.post('/reset', resetSwipes);
router.get('/user', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: DEMO_USER_ID }
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      ...user,
      interests: JSON.parse(user.interests)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
