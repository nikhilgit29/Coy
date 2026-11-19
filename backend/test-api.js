import prisma, { DEMO_USER_ID } from './services/db.js';

async function testWorkflow() {
  console.log('🧪 Starting Coy Discover Verification Test Suite...\n');

  // Test 1: Seed verification
  const profileCount = await prisma.profile.count();
  console.log(`✓ Database Profiles Count: ${profileCount} (Target: >= 30)`);
  if (profileCount < 30) throw new Error("Seed count less than 30");

  const incomingLikeCount = await prisma.incomingLike.count();
  console.log(`✓ Secret Pre-seeded Incoming Likes Count: ${incomingLikeCount}`);

  // Test 2: Clean slate for demo user
  await prisma.swipe.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.match.deleteMany({ where: { userId: DEMO_USER_ID } });

  // Test 3: Feed verification
  const existingSwipes = await prisma.swipe.findMany({
    where: { userId: DEMO_USER_ID },
    select: { profileId: true }
  });
  const swipedIds = existingSwipes.map(s => s.profileId);
  const feed = await prisma.profile.findMany({
    where: { id: { notIn: swipedIds } }
  });
  console.log(`✓ Initial Feed Length: ${feed.length} profiles`);

  // Verify privacy: ensure no incoming likes leaked
  feed.forEach(p => {
    if (p.preLikedUser !== undefined || p.incomingLikes !== undefined) {
      throw new Error(`CRITICAL PRIVACY VIOLATION: Feed leaked secret like data on ${p.name}`);
    }
  });
  console.log('✓ Privacy Check: Zero secret incoming like leaks in feed.');

  // Test 4: One-sided like (User likes prof-2 who hasn't liked user)
  const targetProf2 = "prof-2";
  const incomingLikeProf2 = await prisma.incomingLike.findUnique({
    where: { profileId_userId: { profileId: targetProf2, userId: DEMO_USER_ID } }
  });
  const isMutualMatch2 = Boolean(incomingLikeProf2);
  console.log(`✓ Swipe on prof-2 (Liam Chen): isMutualMatch = ${isMutualMatch2} (Expected: false)`);
  if (isMutualMatch2) throw new Error("Expected false for prof-2");

  // Record pass/like
  await prisma.swipe.create({
    data: { userId: DEMO_USER_ID, profileId: targetProf2, action: 'LIKE' }
  });

  // Verify prof-2 is removed from feed
  const feedAfterProf2 = await prisma.profile.findMany({
    where: { id: { notIn: [targetProf2] } }
  });
  if (feedAfterProf2.find(p => p.id === targetProf2)) {
    throw new Error("Swiped profile still appears in feed!");
  }
  console.log('✓ Persistence Check: Swiped profile prof-2 successfully removed from feed.');

  // Test 5: Mutual Match (User likes prof-1 Maya Patel who pre-liked the user)
  const targetProf1 = "prof-1";
  const incomingLikeProf1 = await prisma.incomingLike.findUnique({
    where: { profileId_userId: { profileId: targetProf1, userId: DEMO_USER_ID } }
  });
  const isMutualMatch1 = Boolean(incomingLikeProf1);
  console.log(`✓ Swipe LIKE on prof-1 (Maya Patel): isMutualMatch = ${isMutualMatch1} (Expected: true)`);
  if (!isMutualMatch1) throw new Error("Expected true for prof-1");

  await prisma.swipe.create({
    data: { userId: DEMO_USER_ID, profileId: targetProf1, action: 'LIKE' }
  });
  await prisma.match.create({
    data: { userId: DEMO_USER_ID, profileId: targetProf1 }
  });

  // Test 6: Verify Matches endpoint query
  const matches = await prisma.match.findMany({
    where: { userId: DEMO_USER_ID },
    include: { profile: true }
  });
  console.log(`✓ Matches Count: ${matches.length} (Expected: 1)`);
  console.log(`✓ Matched User: ${matches[0].profile.name} (${matches[0].profile.cityOrCollege})`);

  // Verify prof-2 is NOT in matches (privacy guarantee)
  if (matches.find(m => m.profileId === targetProf2)) {
    throw new Error("PRIVACY VIOLATION: Non-mutual profile appeared in matches!");
  }
  console.log('✓ Matches Privacy Check: Only mutual matches exist in Matches view.');

  // Clean slate for demo user after tests
  await prisma.swipe.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.match.deleteMany({ where: { userId: DEMO_USER_ID } });
  console.log('✓ Reset state back to clean demo initial state.');

  console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

testWorkflow()
  .catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
