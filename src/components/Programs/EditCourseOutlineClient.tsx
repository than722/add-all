// app/components/Programs/EditCourseOutlineClient.tsx
// This component provides the interface for both Admin and Instructor to edit a program's course outline.
// The back button navigation adapts based on the 'role' prop.

'use client';

import React, { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import Sidebar from '@/components/courseoutlineComponents/sidebar'; // Ensure this path is correct
import ContentArea from '@/components/courseoutlineComponents/contentArea'; // Ensure this path is correct
import { useRouter } from 'next/navigation';

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

interface EditCourseOutlineClientProps {
  programName: string;
  role: 'admin' | 'instructor'; // Explicitly define the roles this component supports
}

export default function EditCourseOutlineClient({ programName, role }: EditCourseOutlineClientProps) {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  const [courseOutline, setCourseOutline] = useState<Module[]>(() => migrateCourseOutline(initialCourseOutline));
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingSubId, setEditingSubId] = useState<number | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editSubTitle, setEditSubTitle] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [lockedModules, setLockedModules] = useState<number[]>([]);

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
    setSaveMessage('Module title saved!');
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
    setSaveMessage('Subsection title saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };
  const cancelEditSub = () => {
    setEditingSubId(null);
  };

  const toggleLockModule = (modId: number) => {
    setLockedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
    setSaveMessage('Module lock status updated!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleSave = () => {
    setSaveMessage('Course outline changes saved locally!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  // Determine the back URL based on the role
  const getBackUrl = () => {
    if (role === 'admin') {
      return `/admin/programlist`;
    }
    if (role === 'instructor') {
      // Instructors go back to their specific program details page
      return `/teacher/assignedprograms/${encodeURIComponent(programName)}`;
    }
    return '/'; // Fallback
  };

  const getBackButtonText = () => {
    if (role === 'admin') {
      return `← Back to Programs List`;
    }
    if (role === 'instructor') {
      return `← Back to ${decodeURIComponent(programName)} Details`;
    }
    return '← Back';
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
          editModuleTitle={editModuleTitle}
          setEditModuleTitle={setEditModuleTitle}
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
          setCourseOutline={setCourseOutline}
          onBackClick={() => router.push(getBackUrl())}
          backButtonText={getBackButtonText()}
        />

        {/* Main Content Area */}
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
  );
}
