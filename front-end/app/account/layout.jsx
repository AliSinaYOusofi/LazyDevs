import Footer from "@/components/Footer/Footer";
import Navbar from '../../components/Navbar/Navbar';

export default function Layout({ children }) {

    return (
      <>
        <Navbar />
          {children}
      </>
    )
  }