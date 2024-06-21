import logo from './logo.svg';
import './App.css';

import SimpleCard from "./components/SimpleCard";
import {SidebarWithCta} from "./components/SidebarWithCta";
import {StickyNavbar} from "./components/StickyNavbar";
import {FeaturedImageGallery} from "./components/ImageGallery";
import LoginPage from "./components/LoginPage";
import {useKeycloak} from "@react-keycloak/web";


function App() {

    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return <LoginPage />;
    }

  return (
    <div className="App">
        <StickyNavbar />

        <div class="container">
            <h1 className="bg-slate-500 text-white text-center">This is a Tailwind styled site!</h1>
        </div>
        <div class="gap-8 columns-3">
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
        </div>
        <div class="container content-center">
            <FeaturedImageGallery />
        </div>
        <SidebarWithCta />
    </div>
  );
}

export default App;
