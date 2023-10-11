"use client";

import Modal from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <div className="p-4">
      <Modal
        title="Test"
        description="Test Description"
        isOpen
        onClose={() => {}}
      >
        <>Children</>
        {/* <UserButton afterSignOutUrl="/" />
        <h1>This is a protected page</h1> */}
      </Modal>
    </div>
  );
}
