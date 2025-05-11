import BackgroundProvider from './components/layout/BackgroundProvider';
import { AppSidebar } from './components/layout/MySideBar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppContextProvider } from './context/AppContext';
import Router from './Router';

function App() {
  return (
    <AppContextProvider>
      <SidebarProvider>
        <BackgroundProvider>
          <AppSidebar />
          <main className="flex flex-col w-screen h-screen">
            <SidebarTrigger />
            <div className="flex-1">
              <Router />
            </div>
          </main>
        </BackgroundProvider>
      </SidebarProvider>
    </AppContextProvider>
  );
}

export default App;
