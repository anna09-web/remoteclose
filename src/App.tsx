import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProblemPromise from "./components/ProblemPromise";
import Curriculum from "./components/Curriculum";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import ApplicationForm from "./components/ApplicationForm";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ProblemPromise />
        <Curriculum />
        <HowItWorks />
        <Testimonials />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}

function getRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    function onHashChange() {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "/terms") return <Terms />;
  if (route === "/privacy") return <Privacy />;
  return <Landing />;
}

export default App;
