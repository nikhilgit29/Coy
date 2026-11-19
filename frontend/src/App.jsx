import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import MatchModal from './components/MatchModal';
import SettingsModal from './components/SettingsModal';
import { api } from './services/api';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('discover'); // 'home' or 'discover'
  const [activeSubSection, setActiveSubSection] = useState('discover'); // 'discover' or 'matches'
  
  // Data states
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load feed and matches
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [feedData, matchData, userData] = await Promise.all([
        api.getFeed().catch(() => ({ profiles: [] })),
        api.getMatches().catch(() => ({ matches: [] })),
        api.getDemoUser().catch(() => null),
      ]);

      setProfiles(feedData.profiles || []);
      setMatches(matchData.matches || []);
      if (userData) setUser(userData);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Swipe action
  const handleSwipe = async (profileId, action) => {
    // Optimistically remove from current list
    const currentCard = profiles.find((p) => p.id === profileId);
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));

    try {
      const response = await api.swipe(profileId, action);

      if (response.isMatch && response.matchedProfile) {
        setMatchedProfile(response.matchedProfile);
        setIsMatchModalOpen(true);
        // Refresh matches
        const updatedMatches = await api.getMatches();
        setMatches(updatedMatches.matches || []);
      }
    } catch (err) {
      console.error('Error saving swipe:', err);
      // Re-fetch in case of server sync issue
      loadData();
    }
  };

  // Reset Swipes (Demo)
  const handleResetSwipes = async () => {
    try {
      await api.resetSwipes();
      await loadData();
    } catch (err) {
      console.error('Failed to reset swipes:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex justify-center text-[#17141E] font-coy">
      {/* 3-Second Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Centered Narrow Mobile Container */}
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col relative shadow-xl border-x border-gray-100">
        {/* Header with Coy logo and Settings */}
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {activeTab === 'home' ? (
            <HomePage onGoToDiscover={() => setActiveTab('discover')} />
          ) : (
            <DiscoverPage
              profiles={profiles}
              loading={loading}
              matches={matches}
              onSwipe={handleSwipe}
              onResetSwipes={handleResetSwipes}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
            />
          )}
        </main>

        {/* Bottom Navigation: 2 tabs (Home & Discover) */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          matchCount={matches.length}
        />

        {/* "It's a Match!" Mutual Match Modal */}
        <MatchModal
          isOpen={isMatchModalOpen}
          matchedProfile={matchedProfile}
          userPhoto={user?.photo}
          onContinue={() => {
            setIsMatchModalOpen(false);
            setMatchedProfile(null);
          }}
          onViewMatches={() => {
            setIsMatchModalOpen(false);
            setMatchedProfile(null);
            setActiveTab('discover');
            setActiveSubSection('matches');
          }}
        />

        {/* Settings & Demo Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onResetSwipes={handleResetSwipes}
          user={user}
        />
      </div>
    </div>
  );
}
