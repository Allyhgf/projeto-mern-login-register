import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { GoalDisplay, DashboardForm } from "./Dashboard.elements";
import { UserInput } from "../../globalStyles";

const Dashboard = () => {
  const [tempGoal, setTempGoal] = useState("");
  const [goal, setGoal] = useState("");

  const token = localStorage.getItem("token");

  const populateDashboard = async () => {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      headers: { "x-access-token": token },
    });

    const data = await req.json()

    if(data.status === "ok") {
      setGoal(data.goal)
    } else {
      alert("Invalid Token")
    }
  };

  useEffect(() => {
    const isTokenValid = decodeToken(token);
    if (isTokenValid) {
      populateDashboard();
    } else {
      alert("Invalid Token");
    }
  });

  const addGoal = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:1337/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: await JSON.stringify({
        tempGoal,
      }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      setGoal(tempGoal);
      setTempGoal("");
    } else {
      alert("Invalid Token");
    }
  };

  return (
    <>
      <h1> Dashboard </h1>
      <GoalDisplay>{goal || "No goal found"}</GoalDisplay>
      <DashboardForm onSubmit={addGoal}>
        <UserInput
          placeholder="Add a goal"
          value={tempGoal}
          onChange={(e) => setTempGoal(e.target.value)}
          type="text"
        />
        <UserInput type="submit" />
      </DashboardForm>
    </>
  );
};

export default Dashboard;
