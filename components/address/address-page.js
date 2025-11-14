"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddressItem from "./address-item";
import ModalHeadlessUi from "../modal/headless-ui-modal";
import { addAddress, updateAddress } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AddressForm from "../modal/address-form";

export default function AddressesPage({ addresses }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const router = useRouter();

  // ✅ Add or Update Address
  const handleSaveAddress = async (newAddress) => {
    try {
      if (editingAddress) {
        await updateAddress({
          update_type: "address",
          address_id: editingAddress.address_id,
          ...newAddress,
        });
      } else {
        await addAddress(newAddress);
      }

      Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
      router.refresh();
      setEditingAddress(null);
      setModalOpen(false);
    } catch (error) {
      console.error("❌ Error saving address:", error);
    }
  };

  // ✅ Edit Handler
  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setModalOpen(true);
  };

  // ✅ Delete Handler
  const handleDelete = async (addr) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await updateAddress({
        update_type: "delete",
        address_id: addr.address_id,
      });
      Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
      router.refresh();
    }
  };

  // ✅ Select Address
  const handleSelect = async (addr) => {
    await updateAddress({
      update_type: "selection",
      address_id: addr.address_id,
    });
    Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Addresses</h1>
        <button
          onClick={() => {
            setEditingAddress(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          <Plus className="w-5 h-5" /> Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {addresses && addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressItem
              key={addr.address_id}
              address={addr}
              selected={addr.is_selected || false}
              onEdit={() => handleEdit(addr)}
              onDelete={() => handleDelete(addr)}
              onSelect={() => handleSelect(addr)}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No addresses found.</p>
        )}
      </div>

      {/* Address Modal */}
      <ModalHeadlessUi
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAddress ? "Edit Address" : "Add New Address"}
      >
        <AddressForm
          onClose={() => setModalOpen(false)}
          handleSaveAddress={handleSaveAddress}
          editingAddress={editingAddress}
        />
      </ModalHeadlessUi>
    </main>
  );
}
