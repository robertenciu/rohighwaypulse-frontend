import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
