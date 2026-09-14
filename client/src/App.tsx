import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Collection } from './pages/customer/Collection';
import CustomHomePage from './pages/CustomHomePage';

function App() {
  return (
    <>
       <AdminDashboard />;
       <CustomHomePage />;
       <Collection />;
    </>
  )
}

export default App;