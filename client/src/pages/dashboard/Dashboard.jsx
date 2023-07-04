import DashboardSidebar from 'components/ui/dashboard/DashboardSidebar';
import React, { useState } from 'react';

const Dashboard = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="relative flex">
      <DashboardSidebar isSidebar={isSidebar} />
      <main className="content">
        <h1>deneme</h1>
      </main>
    </div>
  );
};

export default Dashboard;
