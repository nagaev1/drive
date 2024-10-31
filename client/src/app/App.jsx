import './App.css';

import DrivePage from '@src/pages/DrivePage/DrivePage';
import RegisterPage from '@src/pages/RegisterPage/RegisterPage';
import LoginPage from '@src/pages/LoginPage/LoginPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/drive",
    element: <DrivePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

function App() {
  return (
    <div className='bg-th-bg-primary'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
