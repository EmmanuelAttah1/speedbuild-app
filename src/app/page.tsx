"use client"
import { Button } from "./components/button/button";
import { CenterPageSkeleton } from "./components/center_skeleton/center_skeleton";
import { NavBar } from "./components/navbar/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <CenterPageSkeleton>
      <NavBar router={router}/>
      <div className="MainContainer">
        <h1>Welcome to SpeedBuild!</h1>
        <p className="MainSubtitle">Save time and reduce bugs by reusing dependency-aware AI-powered code templates.</p>
        <div className="MainBtnContainer">
          <Button
              background_color="#DBE8F2"
              color="#121417"
              label="Start Setup"
              border_radius={true}
              block = {true}
              onClick={()=>{
                router.push("/register")
              }}
          />
          <Button
              background_color="#2B3036"
              color="#ffffff"
              label="View Startup Guide"
              border_radius={true}
              block = {true}
              onClick={()=>{
                router.push("/doc/Get-Started")
              }}
          />
        </div>
      </div>
    </CenterPageSkeleton>
  );
}
