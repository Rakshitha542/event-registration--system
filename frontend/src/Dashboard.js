import React from "react";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function Dashboard() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = {};
  }

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Event System</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ADMIN VIEW */}
      {user?.role === "admin" && (
        <>
          <h4 className="mt-4">Add Event</h4>
          <AddEvent />

          <h4 className="mt-4">All Events</h4>
          <EventList isAdmin={true} />
        </>
      )}

      {/* USER VIEW */}
      {user?.role === "user" && (
        <>
          <h4 className="mt-4">Available Events</h4>
          <EventList />
        </>
      )}
    </div>
  );
}

export default Dashboard;