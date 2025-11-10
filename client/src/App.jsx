import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Posts from './Components/Posts/Posts'
import Admin from './Components/Admin/AdminDashboard'
import CreatePost from './Components/Create/CreatePost'
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import { ToastContainer } from 'react-toastify'
import PostDetails from './Components/PostDetails/PostDetails'
import Category from './Components/Category/Category'
import Profile from './Components/Profile/Profile'
import UsersTable from './Components/Admin/UsersTable'
import PostsTable from './Components/Admin/PostsTable'
import CategoriesTable from './Components/Admin/CategoriesTable'
import CommentsTable from './Components/Admin/CommentsTable'
import ForgotPassword from './Components/Forms/ForgotPassword'
import ResetPassword from './Components/Forms/ResetPassword'
import NotFound from './Components/NotFound/NotFound'
import AuthView from './Components/AuthView/AuthView'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import AdminProtectedRoute from './Components/ProtectedRoutes/AdminProtectedRoute'
import VerifyEmail from './Components/VerifyEmail/VerifyEmail'



function App() {
 
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },

        { path: "/posts", element: <Posts /> },
        { path: "/posts/create-post", element: <ProtectedRoutes><CreatePost /></ProtectedRoutes> },
        { path: "/posts/details/:id", element: <PostDetails /> },
        { path: "/posts/categories/:category", element: <Category /> },

        { path: "/admin-dashboard", element: <AdminProtectedRoute><Admin /></AdminProtectedRoute> },
        { path: "/admin-dashboard/users-table", element: <AdminProtectedRoute><UsersTable /></AdminProtectedRoute> },
        { path: "/admin-dashboard/posts-table", element: <AdminProtectedRoute><PostsTable /></AdminProtectedRoute> },
        {path: "/admin-dashboard/categories-table",element: <AdminProtectedRoute><CategoriesTable /></AdminProtectedRoute>},
        { path: "/admin-dashboard/comments-table", element: <AdminProtectedRoute><CommentsTable /></AdminProtectedRoute> },

        { path: "/profile/:id", element: <Profile /> },

        { path: "/login", element: <AuthView><Login /></AuthView> },
        { path: "/register", element: <AuthView><Register /></AuthView> },
        { path: "/users/:userId/verify/:token", element: <AuthView><VerifyEmail /></AuthView> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password/:userId/:token", element: <ResetPassword /> },


        {path:"*", element:<NotFound/>}
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
        
        <ToastContainer />
    </>
  );
}

export default App
