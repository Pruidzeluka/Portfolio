import React, { useState, useEffect, useMemo } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import TeamCard from '../components/team/TeamCard';
import PostCard from '../components/team/PostCard';
import { 
  Search, 
  X, 
  ArrowLeft, 
  RotateCw, 
  AlertTriangle, 
  Users, 
  SlidersHorizontal,
  Sparkles,
  Database
} from 'lucide-react';

export default function CommunityPage({ onNavigate, onShowToast }) {
  // State for fetched users
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc' | 'company-asc'

  // Modal State for user publications
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Team Members from JSONPlaceholder API
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message || 'Failed to load team directory. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Posts for selected User (JSONPlaceholder /posts?userId={id})
  const handleViewPosts = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsLoadingPosts(true);
    setPostsError(null);
    setUserPosts([]);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      if (!response.ok) {
        throw new Error(`Failed to load posts (status ${response.status})`);
      }
      const posts = await response.json();
      setUserPosts(posts);
    } catch (err) {
      console.error('Error fetching user posts:', err);
      setPostsError(err.message || 'Could not fetch posts for this user.');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Distinct company list for category filters
  const companies = useMemo(() => {
    const set = new Set();
    users.forEach((u) => {
      if (u.company?.name) {
        // take first word of company for clean tag
        const firstWord = u.company.name.split(' ')[0].replace(/[,-]/g, '');
        set.add(firstWord);
      }
    });
    return Array.from(set).slice(0, 6);
  }, [users]);

  // Search and Filter logic
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        // Search query matching Name, Username, Company, or Email
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          !q ||
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          (user.company?.name && user.company.name.toLowerCase().includes(q));

        // Company filter
        const matchesCompany = 
          selectedCompany === 'ALL' ||
          (user.company?.name && user.company.name.toLowerCase().includes(selectedCompany.toLowerCase()));

        return matchesQuery && matchesCompany;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'company-asc') {
          return (a.company?.name || '').localeCompare(b.company?.name || '');
        }
        return 0;
      });
  }, [users, searchQuery, selectedCompany, sortBy]);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Return to Portfolio */}
        <div className="mb-8">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-accent-cyan transition-colors cursor-pointer group p-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio Home</span>
          </button>
        </div>

        {/* Section Header */}
        <SectionHeader
          tag="Dynamic API Resource • /users"
          titlePrefix="Community &amp;"
          gradientWord="Team Directory"
          titleSuffix=""
          subtitle="Explore our active developer network fetched dynamically from the JSONPlaceholder REST API. Use the real-time search and filters to discover members and inspect their publications."
        />

        {/* Search & Filter Controls Toolbar */}
        <div className="mb-10 space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Real-time Search Input */}
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-accent-cyan absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members by name, @username, company, or email..."
                  className="w-full bg-dark-900/90 border border-white/10 focus:border-accent-cyan rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-md cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort By Selector */}
              <div className="md:col-span-4 flex items-center justify-end gap-3">
                <span className="text-xs font-mono text-gray-400 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-cyan cursor-pointer w-full md:w-auto"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="company-asc">Company Name</option>
                </select>
              </div>

            </div>

            {/* Quick Filter Tags & Results Counter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-gray-400 mr-1 font-mono">Filter:</span>
                <button
                  onClick={() => setSelectedCompany('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    selectedCompany === 'ALL'
                      ? 'bg-accent-cyan text-dark-900 font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  All Companies
                </button>
                {companies.map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompany(comp)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                      selectedCompany === comp
                        ? 'bg-accent-cyan text-dark-900 font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>

              {/* Real-time search status indicator */}
              <div className="text-xs font-mono text-gray-400">
                Found <span className="text-accent-emerald font-bold">{filteredUsers.length}</span> of {users.length} members
              </div>
            </div>
          </Card>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
            <p className="font-mono text-sm text-gray-400">
              Connecting to JSONPlaceholder REST API...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <Card className="p-8 max-w-lg mx-auto text-center border-red-500/30">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Unable to Load Team Data</h3>
            <p className="text-sm text-gray-400 mb-6">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              icon={<RotateCw className="w-4 h-4" />}
            >
              Retry Request
            </Button>
          </Card>
        )}

        {/* Empty Search Results State */}
        {!isLoading && !error && filteredUsers.length === 0 && (
          <Card className="p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Matching Members Found</h3>
            <p className="text-sm text-gray-400 mb-5">
              No developer matches your search query "{searchQuery}". Try searching for another name or company.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCompany('ALL');
              }}
            >
              Reset Search &amp; Filters
            </Button>
          </Card>
        )}

        {/* Users Grid */}
        {!isLoading && !error && filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <TeamCard
                key={user.id}
                user={user}
                onViewPosts={handleViewPosts}
                isLoadingPosts={isLoadingPosts && selectedUser?.id === user.id}
              />
            ))}
          </div>
        )}

        {/* API Info Callout at the bottom of the page */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-accent-cyan" />
            <span>API Resource: https://jsonplaceholder.typicode.com/users</span>
          </div>
          <span className="text-accent-emerald">
            ✓ Search &amp; Filter Active
          </span>
        </div>

      </div>

      {/* Reusable Modal Window for User Posts */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? `Publications by ${selectedUser.name}` : 'User Publications'}
        subtitle={selectedUser ? `@${selectedUser.username} • ${selectedUser.company?.name}` : ''}
        badgeText="JSONPlaceholder /posts"
        maxWidth="max-w-2xl"
      >
        {/* Loading posts state */}
        {isLoadingPosts && (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full border-3 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
            <p className="font-mono text-xs text-gray-400">Fetching user publications...</p>
          </div>
        )}

        {/* Error state */}
        {!isLoadingPosts && postsError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {postsError}
          </div>
        )}

        {/* List of user posts */}
        {!isLoadingPosts && !postsError && (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-xs font-mono text-gray-400">
              <span>{userPosts.length} article{userPosts.length === 1 ? '' : 's'} available</span>
              <span className="text-accent-emerald">GET /posts?userId={selectedUser?.id}</span>
            </div>

            <div className="space-y-3.5">
              {userPosts.map((post, idx) => (
                <PostCard key={post.id} post={post} index={idx} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
