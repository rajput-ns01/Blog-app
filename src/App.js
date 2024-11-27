import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login/Login';
import Dashboard from './admin/Dashboard/Dashboard';
import Home from './admin/Home/Home';
import BlogList from './admin/BlogList/BlogList';
import AddNewBlog from './admin/AddBlog/AddNewBlog';
import CategoryList from './admin/CategoryList/CategoryList';
import AddCategory from './admin/AddCategory/AddCategory';
import CommentList from './admin/CommentList/CommentList';
import { isLogin } from './checkAuth';
import UserLayout from './user/UserLayout';
import Blog from './user/Blog/Blog';
import UserHome from './user/UserHome/UserHome';
import BlogDetail from './user/Blog/BlogDetail';
import UserSignUp from './user/UserLogin/UserSignUp';
import UserLogin from './user/UserLogin/UserLogin';


const router=createBrowserRouter([
  {path:'signUp',element:<UserSignUp/>},
  {path:'login',element:<UserLogin/>},
  {path:'',element:<UserLayout/>,children:[
    {path:'',element:<UserHome/>},
    {path:'home',element:<UserHome/>},
    {path:'blog',element:<Blog/>},
    {path:'blog-detail/:blogId',element:<BlogDetail/>}
  ]},
  {path:'admin',element:<AdminLayout/>,children:[
    {path:'login',element:<Login/>},
    {path:'dashboard',loader:isLogin,element:<Dashboard/>,children:[
      {path:'',element:<Home/>},
      {path:'blog',element:<BlogList/>},
      {path:'add-blog',element:<AddNewBlog  key="add-blog" mode="add-blog"/>},
      {path:'category',element:<CategoryList/>},
      {path:'add-category',element:<AddCategory key="add" mode="add"/>},
      {path:'comment',element:<CommentList/>},
      {path:'edit-category',element:<AddCategory key="edit" mode="edit"/>},
      {path:'edit-blog',element:<AddNewBlog key="edit-blog" mode="edit-blog"/>}

    ]}
  ]}
])

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
    
  );
}

export default App;
