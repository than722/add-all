'use client';

import React, { useState, useMemo } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import Sidebar from '@/components/editcourseoutlineComponents/Sidebar';
import ContentArea from '@/components/editcourseoutlineComponents/ContentArea';

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

export interface EditCourseOutlineProps {
  programName: string;
  onBackClick: () => void;
  backButtonText: string;
}

export default function EditCourseOutline({
  programName,
  onBackClick,
  backButtonText,
}: EditCourseOutlineProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  const [courseOutline, setCourseOutline] = useState<Module[]>(() =>
    initialCourseOutline.map((mod) => ({
      id: mod.id,
      title: mod.title,
      contentBlocks: mod.content ? [{ id: Date.now() + Math.random(), type: 'text', value: mod.content }] : [],
      subsections: (mod.subsections || []).map((sub: any) => ({
        id: sub.id,
        title: sub.title,
        contentBlocks: sub.content ? [{ id: Date.now() + Math.random(), type: 'text', value: sub.content }] : [],
      })),
    }))
  );
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingSubId, setEditingSubId] = useState<number | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editSubTitle, setEditSubTitle] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [lockedModules, setLockedModules] = useState<number[]>([]);

  const filteredModules = useMemo(
    () =>
      courseOutline.filter(
        (mod) =>
          mod.title.toLowerCase().includes(search.toLowerCase()) ||
          mod.subsections.some((sub) => sub.title.toLowerCase().includes(search.toLowerCase()))
      ),
    [courseOutline, search]
  );

  const selected = courseOutline.find((mod) => mod.id === selectedModule) || null;
  const selectedSub =
    selectedSubsection &&
    courseOutline
      .find((mod) => mod.id === selectedSubsection.modId)
      ?.subsections.find((sub) => sub.id === selectedSubsection.subId) || null;

  const startEditModule = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditModuleTitle(mod.title);
  };

  const saveEditModule = (modId: number) => {
    setCourseOutline((prev) =>
      prev.map((mod) => (mod.id === modId ? { ...mod, title: editModuleTitle } : mod))
    );
    setEditingModuleId(null);
    flashMessage('Module title saved!');
  };

  const cancelEditModule = () => setEditingModuleId(null);

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
              subsections: mod.subsections.map((sub) =>
                sub.id === subId ? { ...sub, title: editSubTitle } : sub
              ),
            }
          : mod
      )
    );
    setEditingSubId(null);
    flashMessage('Subsection title saved!');
  };

  const cancelEditSub = () => setEditingSubId(null);

  const toggleLockModule = (modId: number) => {
    setLockedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
    flashMessage('Module lock status updated!');
  };

  const handleSave = () => {
    // In a real application, you would send the courseOutline state to your backend API here.
    // e.g., fetch('/api/save-course-outline', { method: 'POST', body: JSON.stringify(courseOutline) });
    flashMessage('Course outline changes saved locally!');
  };

  const flashMessage = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header/Navbar placeholder (if you have one above this component) */}
      {/* Assuming there's a navigation bar like in your screenshot above this component */}

      {/* Main content area below the absolute header */}
      <div className="flex flex-1"> {/* This div now stretches */}
        {/* Sidebar Component with adjusted positioning if needed */}
        {/* The Sidebar itself is fixed at the top-left portion of the main content area */}
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
          onBackClick={onBackClick}
          backButtonText={backButtonText}
        />

        {/* This div represents the right-hand content section, including its header */}
        <div className="flex-1 flex flex-col bg-gray-100"> {/* Matches outer background */}
            {/* Header for the content area on the right */}
            <div className="w-full bg-white shadow-md p-4 flex justify-between items-center z-10 sticky top-0">
                <div className="flex items-center">
                    {saveMessage && (
                        <span className="ml-4 text-green-600 font-semibold">{saveMessage}</span>
                    )}
                </div>
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition font-semibold"
                >
                    Save All Changes
                </button>
            </div>

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
        </div>
      </div>
    </div>
  );
}