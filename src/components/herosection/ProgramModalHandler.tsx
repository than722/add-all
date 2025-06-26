'use client';

import React from 'react';
import FeaturedProgramViewModal from '../ui/Modals/HeroSectionModals/featuredprogramviewModal';

type ProgramModalHandlerProps = {
  trigger: (
    openModal: (program: string, category: string) => void
  ) => React.ReactNode;
};

export default function ProgramModalHandler({ trigger }: ProgramModalHandlerProps) {
  const [modalProgram, setModalProgram] = React.useState<{ program: string; category: string } | null>(null);

  const openModal = (program: string, category: string) => {
    setModalProgram({ program, category });
  };

  return (
    <>
      {trigger(openModal)}

      {modalProgram && (
        <FeaturedProgramViewModal
          program={modalProgram.program}
          category={modalProgram.category}
          onClose={() => setModalProgram(null)}
        />
      )}
    </>
  );
}
