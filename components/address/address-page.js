"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddressItem from "./address-item";
import HeadlessUIModal from "../modal/headless-ui-modal";
import { INDIAN_STATES } from "@/lib/utils/constants";
import { addAddress, getUserAddress, updateAddress } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AddressesPage({ addresses }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const router = useRouter();

  const handleSaveAddress = async (newAddress) => {
    if (editingAddress) {
      await updateAddress({
        update_type: "address",
        address_id: editingAddress.address_id,
        ...newAddress,
      });
      Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
      router.refresh();
      setEditingAddress(null);
    } else {
      await addAddress(newAddress);
      Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
      router.refresh();
    }
    setModalOpen(false);
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setModalOpen(true);
  };
  const handleDelete = async (addr) => {
    var confirm = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirm) {
      await updateAddress({
        update_type: "delete",
        address_id: addr.address_id,
      });
      Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
      router.refresh();
    }
  };
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

      <div className="max-w-3xl mx-auto space-y-4">
        {addresses &&
          addresses.map((addr) => (
            <AddressItem
              key={addr.address}
              address={addr}
              selected={addr.is_selected || false}
              onEdit={() => handleEdit(addr)}
              onDelete={() => {
                handleDelete(addr);
              }}
              onSelect={() => handleSelect(addr)}
              // onDelete={() =>
              //   setAddresses((prev) => prev.filter((a) => a.id !== addr.id))
              // }
            />
          ))}
      </div>

      {/* Modal */}
      <HeadlessUIModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        title={editingAddress ? "Edit Address" : "Add New Address"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;

            // Basic validation
            const phone = form.phone.value;
            const zip = form.pincode.value;
            if (!/^\d{10}$/.test(phone)) {
              alert("Phone number must be 10 digits");
              return;
            }
            if (!/^\d{6}$/.test(zip)) {
              alert("Pincode code must be 6 digits");
              return;
            }

            handleSaveAddress({
              name: form.name.value,
              address: form.address.value,
              city: form.city.value,
              state: form.state.value,
              pincode: form.pincode.value,
              phone,
            });
          }}
          className="flex flex-col gap-3 text-black"
        >
          <input
            name="name"
            placeholder="Full Name"
            required
            defaultValue={editingAddress?.name || ""}
            className="border px-3 py-2 rounded"
          />
          <input
            name="address"
            placeholder="Street Address"
            required
            defaultValue={editingAddress?.address || ""}
            className="border px-3 py-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            required
            defaultValue={editingAddress?.city || ""}
            className="border px-3 py-2 rounded"
          />
          <select
            name="state"
            required
            defaultValue={editingAddress?.state || ""}
            className="border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select State
            </option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            name="pincode"
            placeholder="PIN Code"
            type="number"
            maxLength={6}
            required
            defaultValue={editingAddress?.pincode || ""}
            onWheel={(e) => e.currentTarget.blur()}
            className="border px-3 py-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            type="number"
            maxLength={10}
            required
            onWheel={(e) => e.currentTarget.blur()}
            defaultValue={editingAddress?.phone || ""}
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
              {editingAddress ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </HeadlessUIModal>
    </main>
  );
}
