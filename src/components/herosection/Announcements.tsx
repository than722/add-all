'use client';

import React from 'react';
import { dummyAnnouncements, Announcement } from '@/data/AnnouncementData';

export default function AnnouncementsClient() {
  const announcements: Announcement[] = dummyAnnouncements;

  const sortedAnnouncements = announcements.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-[#08228d] mb-8 text-center border-b pb-4">
        News & Announcements
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {sortedAnnouncements.length === 0 ? (
          <p className="text-gray-600 text-lg text-center py-10">
            No announcements available at the moment. Please check back later!
          </p>
        ) : (
          sortedAnnouncements.map((announcement: Announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-gray-900">{announcement.title}</h2>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                    announcement.category === 'News' ? 'bg-blue-100 text-blue-800' :
                    announcement.category === 'Event' ? 'bg-purple-100 text-purple-800' :
                    announcement.category === 'Update' ? 'bg-green-100 text-green-800' :
                    announcement.category === 'Maintenance' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {announcement.category}
                </span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {announcement.content}
              </p>
              <p className="text-sm text-gray-500 text-right">
                Published: {new Date(announcement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
