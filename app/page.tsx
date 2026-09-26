import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/components/Home/HomePage";

export default function Home() {
  return (
    <div >
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
