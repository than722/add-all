'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/contexts/authContext';
import { programCategories, programsList } from '@/data/programsData';
import CreatePostModal from '@/components/ui/Modals/ForumModals/CreatePostModal';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import { dummyForumPosts, dummyComments, ForumPost, Comment } from '@/data/ForumPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface ForumClientProps {
  programName?: string;
  backRoute?: string;
}

const ForumClient: React.FC<ForumClientProps> = ({ programName, backRoute }) => {
  const router = useRouter();
  const { role } = useAuth();
  const isGuest = role === 'guest';

  const decodedProgramName = programName ? decodeURIComponent(programName) : undefined;
  const isProgramSpecific = !!decodedProgramName;

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProgram, setSelectedProgram] = useState(decodedProgramName || 'All Programs');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'discussion'>('list');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(dummyForumPosts);
  const [comments, setComments] = useState<Comment[]>(dummyComments);  // ✅ FIX: Load dummyComments here

  const programsInSelectedCategory = useMemo(() => {
    const categoryObj = programCategories.find(cat => cat.category === selectedCategory);
    return categoryObj && categoryObj.programs.length > 0
      ? ['All Programs', ...categoryObj.programs]
      : ['All Programs'];
  }, [selectedCategory]);

  const filteredAndSortedPosts = useMemo(() => {
    let currentPosts = [...forumPosts];

    if (isProgramSpecific && decodedProgramName) {
      currentPosts = currentPosts.filter(post => post.subject === decodedProgramName);
    } else {
      if (selectedCategory !== 'All Categories') {
        const categoryPrograms = programCategories.find(c => c.category === selectedCategory)?.programs || [];

        if (selectedProgram !== 'All Programs') {
          currentPosts = currentPosts.filter(post => post.subject === selectedProgram);
        } else {
          currentPosts = currentPosts.filter(post =>
            post.subject === selectedCategory || categoryPrograms.includes(post.subject)
          );
        }
      }
    }

    if (searchQuery.trim() !== '') {
      currentPosts = currentPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'likes') {
      currentPosts.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'comments') {
      currentPosts.sort((a, b) => b.commentCount - a.commentCount);
    } else {
      currentPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return currentPosts;
  }, [forumPosts, selectedCategory, selectedProgram, sortBy, searchQuery, isProgramSpecific, decodedProgramName]);

  useEffect(() => {
    if (!isProgramSpecific) setSelectedProgram('All Programs');
  }, [selectedCategory, isProgramSpecific]);

  useEffect(() => {
    if (isProgramSpecific && decodedProgramName) setSelectedProgram(decodedProgramName);
  }, [decodedProgramName, isProgramSpecific]);

  const handleBackToProgram = () => {
    if (backRoute) router.push(backRoute);
  };

  const handleAddComment = (postId: string, text: string, parentCommentId?: string) => {
    if (isGuest) {
      alert('Guests cannot post comments. Please sign in.');
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author: 'Current User',
      text,
      createdAt: new Date(),
      parentCommentId,
    };

    setComments(prev => [...prev, newComment]);

    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post
      )
    );
  };

  const handleLikePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handlePostClick = (post: ForumPost) => {
    setSelectedPost(post);
    setCurrentView('discussion');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <header className="mb-8 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center">
            {isProgramSpecific
              ? `${decodedProgramName} Discussion Forum`
              : 'General Discussion Forum'}
          </h1>

          <SearchBar
            placeholder="Search forum posts..."
            onSearch={setSearchQuery}
          />

          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {isProgramSpecific && backRoute && (
              <button
                onClick={handleBackToProgram}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to {decodedProgramName}
              </button>
            )}

            {currentView === 'list' && !isGuest && (
              <button
                onClick={() => setShowCreatePostModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Create New Post
              </button>
            )}

            {currentView === 'discussion' && (
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setCurrentView('list');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Back to Forum List
              </button>
            )}
          </div>
        </header>

        {showCreatePostModal && (
          <CreatePostModal
            onClose={() => setShowCreatePostModal(false)}
            onPostCreated={(title, subject, content) => {
              const newPost: ForumPost = {
                id: Date.now().toString(),
                title,
                subject,
                content,
                author: 'Current User',
                likes: 0,
                commentCount: 0,
                createdAt: new Date(),
              };
              setForumPosts(prev => [newPost, ...prev]);
              setShowCreatePostModal(false);
            }}
            programFilter={decodedProgramName}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {currentView === 'list' && (
            <>
              <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedProgram={selectedProgram}
                setSelectedProgram={setSelectedProgram}
                sortBy={sortBy}
                setSortBy={setSortBy}
                programsInSelectedCategory={programsInSelectedCategory}
                programCategories={programCategories}
                hideFilters={isProgramSpecific}
              />
              <ContentArea
                currentView={currentView}
                selectedPost={selectedPost}
                filteredAndSortedPosts={filteredAndSortedPosts}
                comments={comments}
                handlePostClick={handlePostClick}
                handleAddComment={handleAddComment}
                handleLikePost={handleLikePost}
                programsList={programsList}
                isGuest={isGuest}
              />
            </>
          )}

          {currentView === 'discussion' && selectedPost && (
            <ContentArea
              currentView={currentView}
              selectedPost={selectedPost}
              filteredAndSortedPosts={filteredAndSortedPosts}
              comments={comments}
              handlePostClick={handlePostClick}
              handleAddComment={handleAddComment}
              handleLikePost={handleLikePost}
              programsList={programsList}
              isGuest={isGuest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumClient;
