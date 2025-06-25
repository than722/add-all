'use client';

import React, { useState } from 'react';
import { ForumPost, Comment } from '@/data/ForumPost';
import { Program } from '@/data/programsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentDots, faReply } from '@fortawesome/free-solid-svg-icons';

interface ContentAreaProps {
  currentView: 'list' | 'discussion';
  selectedPost: ForumPost | null;
  filteredAndSortedPosts: ForumPost[];
  comments: Comment[];
  handlePostClick: (post: ForumPost) => void;
  handleAddComment: (postId: string, commentText: string, parentCommentId?: string) => void;
  handleLikePost: (postId: string) => void;
  programsList: Program[];
  programName?: string;
  isGuest: boolean;
}

const MAX_NESTING_DEPTH = 3;

const ContentArea: React.FC<ContentAreaProps> = ({
  currentView,
  selectedPost,
  filteredAndSortedPosts,
  comments,
  handlePostClick,
  handleAddComment,
  handleLikePost,
  programsList,
  isGuest,
}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const renderReplies = (parentId: string, depth: number, postId: string): React.ReactNode => {
    if (depth >= MAX_NESTING_DEPTH) return null;

    const childComments = comments.filter((c) => c.parentCommentId === parentId);

    return childComments.map((reply) => (
      <div
        key={reply.id}
        className={`mt-3 ml-${depth * 4} pl-4 border-l-2 border-gray-300`}
      >
        <p className="text-sm font-semibold text-gray-700 mb-1">
          {reply.author} •{' '}
          <span className="text-gray-500">
            {Math.ceil((new Date().getTime() - reply.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
          </span>
        </p>
        <p className="text-gray-800">{reply.text}</p>

        {!isGuest && (
          <button
            onClick={() => setReplyingTo(reply.id)}
            className="text-xs text-blue-600 hover:underline mt-1"
          >
            <FontAwesomeIcon icon={faReply} className="mr-1" />
            Reply
          </button>
        )}

        {replyingTo === reply.id && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md text-sm mb-1"
              placeholder="Write your reply..."
              id={`reply-textarea-${reply.id}`}
            ></textarea>
            <button
              onClick={() => {
                const textarea = document.getElementById(
                  `reply-textarea-${reply.id}`
                ) as HTMLTextAreaElement;
                if (textarea && textarea.value.trim()) {
                  handleAddComment(postId, textarea.value.trim(), reply.id);
                  textarea.value = '';
                  setReplyingTo(null);
                }
              }}
              className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
            >
              Post Reply
            </button>
          </div>
        )}

        {renderReplies(reply.id, depth + 1, postId)}
      </div>
    ));
  };

  return (
    <main className="lg:w-3/4 flex-grow">
      {currentView === 'list' ? (
        filteredAndSortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredAndSortedPosts.map((post) => {
              const associatedProgram = programsList.find((p) => p.program === post.subject);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="flex items-center mb-3">
                    <div className="flex flex-col items-center mr-4 text-gray-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikePost(post.id);
                        }}
                        className="hover:text-blue-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                      </button>
                      <span className="font-bold text-gray-800">{post.likes}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <span className="font-semibold text-blue-600 mr-2">{post.subject}</span>
                        • Posted by {post.author}{' '}
                        {Math.ceil(
                          (new Date().getTime() - post.createdAt.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{' '}
                        days ago
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      {associatedProgram && (
                        <p className="text-sm text-gray-600 mb-2">
                          About: <span className="font-medium">{associatedProgram.program}</span>
                        </p>
                      )}
                      <p className="text-gray-700 text-base line-clamp-2">{post.content}</p>
                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                        <span>{post.commentCount} Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-600 text-lg">
            No discussions found matching your filters.
          </div>
        )
      ) : (
        selectedPost && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedPost.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="font-semibold text-blue-600 mr-2">{selectedPost.subject}</span>
              • Posted by {selectedPost.author}{' '}
              {Math.ceil(
                (new Date().getTime() - selectedPost.createdAt.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              days ago
              <div className="flex items-center ml-4">
                <button
                  onClick={() => handleLikePost(selectedPost.id)}
                  className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                  <span className="font-bold">{selectedPost.likes}</span>
                </button>
              </div>
            </div>

            <p className="text-gray-800 text-base mb-6 leading-relaxed">{selectedPost.content}</p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Join the Conversation ({selectedPost.commentCount} Comments)
            </h3>

            {!isGuest && (
              <div className="mb-6">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Write your comment here..."
                  rows={3}
                  id="new-comment-textarea"
                ></textarea>
                <button
                  onClick={() => {
                    const textarea = document.getElementById('new-comment-textarea') as HTMLTextAreaElement;
                    if (textarea && textarea.value.trim()) {
                      handleAddComment(selectedPost.id, textarea.value.trim());
                      textarea.value = '';
                    }
                  }}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Post Comment
                </button>
              </div>
            )}

            <div className="space-y-4">
              {comments
                .filter((comment) => comment.postId === selectedPost.id && !comment.parentCommentId)
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {comment.author} •{' '}
                      <span className="text-gray-500">
                        {Math.ceil((new Date().getTime() - comment.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </span>
                    </p>
                    <p className="text-gray-800">{comment.text}</p>

                    {!isGuest && (
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        <FontAwesomeIcon icon={faReply} className="mr-1" />
                        Reply
                      </button>
                    )}

                    {replyingTo === comment.id && (
                      <div className="mt-2">
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md text-sm mb-1"
                          placeholder="Write your reply..."
                          id={`reply-textarea-${comment.id}`}
                        ></textarea>
                        <button
                          onClick={() => {
                            const textarea = document.getElementById(
                              `reply-textarea-${comment.id}`
                            ) as HTMLTextAreaElement;
                            if (textarea && textarea.value.trim()) {
                              handleAddComment(selectedPost.id, textarea.value.trim(), comment.id);
                              textarea.value = '';
                              setReplyingTo(null);
                            }
                          }}
                          className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          Post Reply
                        </button>
                      </div>
                    )}

                    {renderReplies(comment.id, 1, selectedPost.id)}
                  </div>
                ))}

              {comments.filter((comment) => comment.postId === selectedPost.id).length === 0 && (
                <p className="text-center text-gray-500 italic">No comments yet. Be the first to reply!</p>
              )}
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default ContentArea;
