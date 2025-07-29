import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import ScrollButton from "./ScrollButton";

function Layout() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Outlet />
        <ScrollButton />
      </div>
    </>
  );
}

export default Layout;
