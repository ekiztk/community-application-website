import DashboardHeader from 'components/ui/dashboard/DashboardHeader';
import DashboardSidebar from 'components/ui/dashboard/DashboardSidebar';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="relative flex">
      <DashboardSidebar isSidebar={isSidebar} />
      <main className="w-full h-full m-2 md:m-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
