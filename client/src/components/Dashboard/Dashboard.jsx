import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";

function Dashboard() {
  return ( 
    <div className="w-screen h-screen bg-background text-white p-3">
      <div className="flex gap-3 w-full h-full">
        <Sidebar/>
        <ChatArea/>
      </div>
    </div>
   );
}

export default Dashboard;