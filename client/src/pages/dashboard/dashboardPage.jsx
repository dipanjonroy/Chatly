import { lazy, Suspense, useState } from "react";
import Loader from "../../components/Loader/loader";
import UpdateProfileModal from "../../components/Dashboard/updateProfile";
const Sidebar = lazy(() => import("../../components/Dashboard/Sidebar"));
const ChatBox = lazy(() => import("../../components/Dashboard/ChatBox"));
const NoFriendSelect = lazy(() =>
  import("../../components/Dashboard/NoFriendSelect")
);

function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Suspense fallback={<Loader force={true} />}>
      <div className="w-screen h-screen bg-background text-white p-5">
        <div className="flex gap-4 h-full overflow-hidden">
          <Sidebar />
          <ChatBox />
        </div>

        {showModal && <UpdateProfileModal />}
      </div>
    </Suspense>
  );
}

export default DashboardPage;
