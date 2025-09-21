"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddressItem from "./address-item";
import HeadlessUIModal from "../modal/headless-ui-modal";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Harsh Kumar",
      street: "123, MG Road",
      city: "Delhi",
      state: "Delhi",
      zip: "110001",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "John Doe",
      street: "456, Park Street",
      city: "Kolkata",
      state: "West Bengal",
      zip: "700001",
      phone: "9876543211",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveAddress = (newAddress) => {
    setAddresses((prev) => [...prev, { id: Date.now(), ...newAddress }]);
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Addresses</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          <Plus className="w-5 h-5" /> Add New Address
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {addresses.map((addr) => (
          <AddressItem
            key={addr.id}
            address={addr}
            onEdit={() => alert("Edit " + addr.name)}
            onDelete={() =>
              setAddresses((prev) => prev.filter((a) => a.id !== addr.id))
            }
          />
        ))}
      </div>

      {/* Modal using HeadlessUIModal */}
      <HeadlessUIModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        title="Add New Address"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            handleSaveAddress({
              name: form.name.value,
              street: form.street.value,
              city: form.city.value,
              state: form.state.value,
              zip: form.zip.value,
              phone: form.phone.value,
            });
          }}
          className="flex flex-col gap-3 text-black"
        >
          <input
            name="name"
            placeholder="Full Name"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="street"
            placeholder="Street Address"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="state"
            placeholder="State"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="zip"
            placeholder="ZIP Code"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </HeadlessUIModal>
    </main>
  );
}
