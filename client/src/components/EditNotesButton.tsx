import React, {FunctionComponent, useState} from 'react';
import {Trans} from '@lingui/macro';

import {Modal} from 'src/components/Modal';
import {mediaTrackerApi} from 'src/api/api';
import {Seen} from 'mediatracker-api';
import {queryClient} from "../App";

export const EditNotesButton: FunctionComponent<{
  seenEntry?: Seen;
}> = (props) => {
  const {seenEntry} = {
    ...props,
  };

  const [notes, setNotes] = useState(seenEntry.notes);

  const updateNotes = async (closeModal) => {
    await mediaTrackerApi.seen.updateById(seenEntry.id, {
      notes: notes,
    });
    queryClient.invalidateQueries(['details']);
    closeModal();
  };

  return (
    <Modal
      openModal={(openModal) => (
        <div className="text-sm btn-blue bg" onClick={openModal}>
          Edit Notes
        </div>
      )}
    >
      {(closeModal) => (
        <>
          <form
            className="flex flex-wrap mx-2 my-1 mb-2"
            onSubmit={(e) => {
              e.preventDefault();
              updateNotes(closeModal);
            }}
          >
            <textarea
              className="w-full"
              value={notes}
              placeholder="Notes"
              onChange={(e) => {
                setNotes(e.currentTarget?.value);
                e.currentTarget?.setCustomValidity('');
              }}
            />
            <div className="flex mt-1">
              <button className="flex-grow btn">
                Save
              </button>
              <div className="ml-4 btn-red" onClick={() => closeModal()}>
                <Trans>Cancel</Trans>
              </div>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};
