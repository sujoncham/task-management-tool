import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-gray-200 px-5">
          <h1 className="text-4xl text-primary text-bold mt-10">
            Wecome to Dashboard
          </h1>

          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li className="border-2 border-gray-400 mb-1">
              <Link to="/dashboard/users">Users</Link>
            </li>

            <li className="border-2 border-gray-400 mb-1">
              <Link to="/dashboard">My Orders</Link>
            </li>

            <li className="border-2 border-gray-400 mb-1">
              <Link to="/dashboard/reviewList">Review List</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
