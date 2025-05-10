import BackgroundProvider from './components/layout/BackgroundProvider';
import { AppSidebar } from './components/layout/MySideBar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <SidebarProvider>
        <BackgroundProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <div className="py-2 px-4">
              <h1 className="text-3xl font-bold text-white mb-6">Welcome to keketon's Portfolio</h1>
            </div>
          </main>
        </BackgroundProvider>
      </SidebarProvider>
    </AppContextProvider>
  );
}

export default App;
