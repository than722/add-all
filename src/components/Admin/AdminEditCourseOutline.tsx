'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import Sidebar from '@/components/courseoutlineComponents/sidebar'; // Ensure this path is correct
import ContentArea from '@/components/courseoutlineComponents/contentArea'; // Ensure this path is correct
import ProgressCircle from '@/components/courseoutlineComponents/progressCircle'; // Ensure this path is correct
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

interface ContentBlock {
  id: number;
  type: 'text' | 'video';
  value: string;
  isEditing?: boolean;
}

interface Module {
  id: number;
  title: string;
  contentBlocks: ContentBlock[];
  subsections: Subsection[];
}

interface Subsection {
  id: number;
  title: string;
  contentBlocks: ContentBlock[];
}

// Helper to migrate old course outline to new contentBlocks structure
// This will ensure your initial data conforms to the expected structure
function migrateCourseOutline(oldOutline: any[]): Module[] {
  return oldOutline.map((mod) => ({
    id: mod.id,
    title: mod.title,
    contentBlocks: mod.content
      ? [{ id: Date.now() + Math.random(), type: 'text', value: mod.content }]
      : [],
    subsections: (mod.subsections || []).map((sub: any) => ({
      id: sub.id,
      title: sub.title,
      contentBlocks: sub.content
        ? [{ id: Date.now() + Math.random(), type: 'text', value: sub.content }]
        : [],
    })),
  }));
}

interface AdminEditCourseOutlineClientProps {
  programName: string; // The program name passed from the server page
}

export default function AdminEditCourseOutlineClient({ programName }: AdminEditCourseOutlineClientProps) {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  // Initialize courseOutline with migrated data
  const [courseOutline, setCourseOutline] = useState<Module[]>(() => migrateCourseOutline(initialCourseOutline));
  // Removed role state as it's not directly needed for UI within this component.
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingSubId, setEditingSubId] = useState<number | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editSubTitle, setEditSubTitle] = useState('');
  // Removed videoFile and videoUrl as they don't seem to be used in the provided UI.
  // If needed, they can be reintegrated based on how you want to handle video content in the edit view.
  const [saveMessage, setSaveMessage] = useState('');
  const [lockedModules, setLockedModules] = useState<number[]>([]);

  // Memoize filteredModules for performance
  const filteredModules = useMemo(() =>
    courseOutline.filter((mod) =>
      mod.title.toLowerCase().includes(search.toLowerCase()) ||
      mod.subsections.some((sub) => sub.title.toLowerCase().includes(search.toLowerCase()))
    ),
    [courseOutline, search]
  );

  const selected = courseOutline.find((mod) => mod.id === selectedModule) || null;
  const selectedSub = selectedSubsection && courseOutline
    .find((mod) => mod.id === selectedSubsection.modId)?.subsections.find((sub) => sub.id === selectedSubsection.subId) || null;

  // Handlers for editing
  const startEditModule = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditModuleTitle(mod.title);
  };
  const saveEditModule = (modId: number) => {
    setCourseOutline((prev) =>
      prev.map((mod) =>
        mod.id === modId
          ? { ...mod, title: editModuleTitle }
          : mod
      )
    );
    setEditingModuleId(null);
    setSaveMessage('Module title saved!'); // Feedback for save
    setTimeout(() => setSaveMessage(''), 2000);
  };
  const cancelEditModule = () => {
    setEditingModuleId(null);
  };

  const startEditSub = (sub: Subsection) => {
    setEditingSubId(sub.id);
    setEditSubTitle(sub.title);
  };
  const saveEditSub = (modId: number, subId: number) => {
    setCourseOutline((prev) =>
      prev.map((mod) =>
        mod.id === modId
          ? {
              ...mod,
              subsections: mod.subsections.map((sub: any) =>
                sub.id === subId ? { ...sub, title: editSubTitle } : sub
              ),
            }
          : mod
      )
    );
    setEditingSubId(null);
    setSaveMessage('Subsection title saved!'); // Feedback for save
    setTimeout(() => setSaveMessage(''), 2000);
  };
  const cancelEditSub = () => {
    setEditingSubId(null);
  };

  // Toggle lock for a module (assuming this is an admin feature)
  const toggleLockModule = (modId: number) => {
    setLockedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
    setSaveMessage('Module lock status updated!'); // Feedback
    setTimeout(() => setSaveMessage(''), 2000);
  };

  // Handle general save (e.g., when content blocks are fully implemented)
  const handleSave = () => {
    // In a real application, you would send the courseOutline state to your backend API here.
    // e.g., fetch('/api/save-course-outline', { method: 'POST', body: JSON.stringify(courseOutline) });
    setSaveMessage('Course outline changes saved locally!'); // Indicate local save for demo
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar Component */}
        <Sidebar
          search={search}
          setSearch={setSearch}
          filteredModules={filteredModules}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          expandedModule={expandedModule}
          setExpandedModule={setExpandedModule}
          editingModuleId={editingModuleId}
          startEditModule={startEditModule}
          saveEditModule={saveEditModule}
          cancelEditModule={cancelEditModule}
          editModuleTitle={editModuleTitle} // Pass editModuleTitle
          setEditModuleTitle={setEditModuleTitle} // Pass setEditModuleTitle
          moduleProgress={moduleProgress}
          selectedSubsection={selectedSubsection}
          setSelectedSubsection={setSelectedSubsection}
          editingSubId={editingSubId}
          startEditSub={startEditSub}
          saveEditSub={saveEditSub}
          cancelEditSub={cancelEditSub}
          editSubTitle={editSubTitle}
          setEditSubTitle={setEditSubTitle}
          subsectionProgress={subsectionProgress}
          lockedModules={lockedModules}
          toggleLockModule={toggleLockModule}
          setCourseOutline={setCourseOutline} // Pass setCourseOutline for add/delete
          // Admin-specific back button
          onBackClick={() => router.push(`/admin/programlist/${encodeURIComponent(programName)}`)}
          backButtonText={`← Back to ${decodeURIComponent(programName)} Details`}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <ContentArea
            selected={selected}
            selectedSub={selectedSub}
            editingModuleId={editingModuleId}
            editModuleTitle={editModuleTitle}
            setEditModuleTitle={setEditModuleTitle}
            saveEditModule={saveEditModule}
            cancelEditModule={cancelEditModule}
            editingSubId={editingSubId}
            editSubTitle={editSubTitle}
            setEditSubTitle={setEditSubTitle}
            saveEditSub={saveEditSub}
            cancelEditSub={cancelEditSub}
            startEditSub={startEditSub}
            setSelectedSubsection={setSelectedSubsection}
            lockedModules={lockedModules}
            startEditModule={startEditModule}
            setCourseOutline={setCourseOutline}
            setSelectedModule={setSelectedModule}
          />
          {saveMessage && <span className="ml-4 text-green-600 font-semibold">{saveMessage}</span>}
          {/* Global Save Button for the entire outline */}
          <div className="p-4 bg-white shadow-md mt-auto flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition font-semibold"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}