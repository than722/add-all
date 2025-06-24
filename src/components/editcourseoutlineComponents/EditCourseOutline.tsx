'use client';

import React, { useState, useMemo } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';
import Sidebar from '@/components/editcourseoutlineComponents/Sidebar'; // Explicit .tsx extension
import ContentArea from '@/components/editcourseoutlineComponents/ContentArea';
// Import the delete modals
import DeleteModuleModal from '@/components/ui/Modals/AdminModals/DeleteModuleModal'; // Explicit .tsx extension
import DeleteSubsectionModal from '@/components/ui/Modals/AdminModals/DeleteSubsectionModal'; // Explicit .tsx extension

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

  // State for Module Delete Modal
  const [showDeleteModuleModal, setShowDeleteModuleModal] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);

  // State for Subsection Delete Modal
  const [showDeleteSubsectionModal, setShowDeleteSubsectionModal] = useState(false);
  const [subsectionToDelete, setSubsectionToDelete] = useState<{ modId: number; subId: number; title: string } | null>(null);


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

  /**
   * Initiates the module deletion process by opening the confirmation modal.
   * Stores the module to be deleted in state.
   * @param mod The Module object to be deleted.
   */
  const handleDeleteModuleClick = (mod: Module) => {
    setModuleToDelete(mod); // Store the module data
    setShowDeleteModuleModal(true); // Open the modal
  };

  /**
   * Confirms the deletion of a module after user confirmation from the modal.
   * Filters out the module and its subsections from the course outline.
   * Adjusts selected module/subsection if the deleted module was active.
   */
  const confirmDeleteModule = () => {
    if (moduleToDelete) {
      const modId = moduleToDelete.id;
      setCourseOutline(prev => {
        const updatedOutline = prev.filter(mod => mod.id !== modId);
        // If the deleted module was selected, select the first available module or none
        if (selectedModule === modId) {
          setSelectedModule(updatedOutline.length > 0 ? updatedOutline[0].id : 0);
          setSelectedSubsection(null); // Clear selected subsection
        }
        setExpandedModule(null); // Collapse any expanded module
        return updatedOutline;
      });
    }
    setModuleToDelete(null); // Clear the module to delete
    setShowDeleteModuleModal(false); // Close the modal
  };

  /**
   * Cancels the module deletion process, closing the modal without deleting.
   */
  const cancelDeleteModule = () => {
    setModuleToDelete(null);
    setShowDeleteModuleModal(false);
  };

  /**
   * Initiates the subsection deletion process by opening the confirmation modal.
   * Stores the subsection details (module ID, subsection ID, and title) in state.
   * @param modId The ID of the parent module.
   * @param sub The Subsection object to be deleted.
   */
  const handleDeleteSubsectionClick = (modId: number, sub: Subsection) => {
    setSubsectionToDelete({ modId: modId, subId: sub.id, title: sub.title }); // Store subsection data
    setShowDeleteSubsectionModal(true); // Open the modal
  };

  /**
   * Confirms the deletion of a subsection after user confirmation from the modal.
   * Filters out the subsection from its parent module's subsections.
   * Adjusts selected subsection if the deleted subsection was active.
   */
  const confirmDeleteSubsection = () => {
    if (subsectionToDelete) {
      const { modId, subId } = subsectionToDelete;
      setCourseOutline(prevOutline => prevOutline.map(mod => {
        if (mod.id === modId) {
          return {
            ...mod,
            subsections: mod.subsections.filter(sub => sub.id !== subId)
          };
        }
        return mod;
      }));
      // If the deleted subsection was selected, clear the selection
      if (selectedSubsection?.modId === modId && selectedSubsection?.subId === subId) {
        setSelectedSubsection(null);
      }
    }
    setSubsectionToDelete(null); // Clear the subsection to delete
    setShowDeleteSubsectionModal(false); // Close the modal
  };

  /**
   * Cancels the subsection deletion process, closing the modal without deleting.
   */
  const cancelDeleteSubsection = () => {
    setSubsectionToDelete(null);
    setShowDeleteSubsectionModal(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content area below the absolute header */}
      <div className="flex flex-1">
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
          // Pass the new delete handlers down to Sidebar
          handleDeleteModuleClick={handleDeleteModuleClick}
          handleDeleteSubsectionClick={handleDeleteSubsectionClick}
        />

        <div className="flex-1 flex flex-col bg-gray-100">
          <div className="w-full bg-white shadow-md p-4 flex justify-between items-center z-10 sticky top-0">
            <div className="flex items-center">
              {saveMessage && (
                <span className="ml-4 text-green-600 font-semibold">{saveMessage}</span>
              )}
            </div>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition font-semibold cursor-pointer"
            >
              Save All Changes
            </button>
          </div>

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

      {/* Delete Module Confirmation Modal - Rendered at the top level */}
      <DeleteModuleModal
        isOpen={showDeleteModuleModal}
        moduleName={moduleToDelete?.title || ''}
        onConfirm={confirmDeleteModule}
        onCancel={cancelDeleteModule}
      />

      {/* Delete Subsection Confirmation Modal - Rendered at the top level */}
      <DeleteSubsectionModal
        isOpen={showDeleteSubsectionModal}
        subsectionName={subsectionToDelete?.title || ''}
        onConfirm={confirmDeleteSubsection}
        onCancel={cancelDeleteSubsection}
      />
    </div>
  );
}
