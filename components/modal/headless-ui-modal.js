// components/Modal.js
import { Dialog } from "@headlessui/react";

export default function HeadlessUIModal({
  isOpen,
  closeModal,
  title,
  children,
}) {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {/* Title */}
          {title && (
            <Dialog.Title className="text-xl font-bold mb-4 text-black">
              {title}
            </Dialog.Title>
          )}

          {/* Modal Body */}
          <div>{children}</div>

          {/* Close Button */}
          {/* <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div> */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
