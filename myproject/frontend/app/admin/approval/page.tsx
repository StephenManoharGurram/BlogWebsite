// app/admin/approval/page.tsx

const mockPendingUsers = [
  { id: 1, email: "testcreator@example.com", role: "Creator", status: "Pending" },
  { id: 2, email: "helper@example.com", role: "Admin", status: "Pending" },
];

export default function AdminApprovalPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F1F3E0] text-[#778873]">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Supreme Admin — Approvals
          </h1>
          <p className="text-lg">
            Eventually, only accounts you approve here will be able to log in as
            creators or admins.
          </p>
        </div>

        <div className="rounded-2xl border border-[#D2DCB6] bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#D2DCB6]/60 text-left">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Requested Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPendingUsers.map((user) => (
                <tr key={user.id} className="border-t border-[#F1F3E0]">
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">{user.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="mr-2 text-xs rounded-full border border-[#778873] px-3 py-1 hover:bg-[#778873] hover:text-[#F1F3E0] transition">
                      Approve
                    </button>
                    <button className="text-xs rounded-full border border-red-300 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
