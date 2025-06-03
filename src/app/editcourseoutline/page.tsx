'use client';

import React, { useState, useEffect } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import Sidebar from '@/components/courseoutlineComponents/sidebar';
import ContentArea from '@/components/courseoutlineComponents/contentArea';
import ProgressCircle from '@/components/courseoutlineComponents/progressCircle';
import Navbar from '@/components/ui/Navbar';

interface Module {
  id: number;
  title: string;
  content: string;
  subsections: Subsection[];
}

interface Subsection {
  id: number;
  title: string;
  content?: string;
}

export default function EditCourseOutlinePage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
  const [selectedSubsection, setSelectedSubsection] = useState<{ modId: number; subId: number } | null>(null);
  const [search, setSearch] = useState('');
  const [courseOutline, setCourseOutline] = useState(initialCourseOutline);
  const [role, setRole] = useState<string | null>(null);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingSubId, setEditingSubId] = useState<number | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editModuleContent, setEditModuleContent] = useState('');
  const [editSubTitle, setEditSubTitle] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [lockedModules, setLockedModules] = useState<number[]>([]);

  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem('role'));
    };
    updateRole();
    window.addEventListener('storage', updateRole);
    return () => window.removeEventListener('storage', updateRole);
  }, []);

  const filteredModules = React.useMemo(() =>
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
    setEditModuleContent(mod.content);
  };
  const saveEditModule = (modId: number) => {
    setCourseOutline((prev) =>
      prev.map((mod) =>
        mod.id === modId
          ? { ...mod, title: editModuleTitle, content: editModuleContent }
          : mod
      )
    );
    setEditingModuleId(null);
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
  };
  const cancelEditSub = () => {
    setEditingSubId(null);
  };

  // Toggle lock for a module
  const toggleLockModule = (modId: number) => {
    setLockedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  // Handle video file upload
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle save
  const handleSave = () => {
    // Here you would send courseOutline and videoFile to backend or localStorage
    setSaveMessage('Course outline and video saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row">
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
          editModuleContent={editModuleContent}
          setEditModuleContent={setEditModuleContent}
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
        />
        <div className="flex-1 flex flex-col">
          <ContentArea
            selected={selected}
            selectedSub={selectedSub}
            editingModuleId={editingModuleId}
            editModuleTitle={editModuleTitle}
            setEditModuleTitle={setEditModuleTitle}
            editModuleContent={editModuleContent}
            setEditModuleContent={setEditModuleContent}
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
          />
          {saveMessage && <span className="ml-4 text-green-600 font-semibold">{saveMessage}</span>}
        </div>
      </div>
    </div>
  );
}