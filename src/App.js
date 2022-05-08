import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import DetailLogin from "./pages/DetailLogin/DetailLogin";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListSaga from "./pages/ToDoList/ToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Modal from "./HOC/Modal";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import UserLoginTemplate from "./templates/UserLoginTemplate/UserLoginTemplate";
import LoginCyberBug from "./pages/CyberBug/LoginCyberBug/LoginCyberBug";
import history from "./util/libs/history";
import CyberBugsTenplate from "./templates/CyberBugsTemplate/CyberBugsTenplate";
import ModalCyberBugs from './components/CyberBugs/ModalCyberBugs/ModalCyberBugs'
import CyberBoard from './pages/CyberBug/CyberBoard'
import ProjectDetail from "./pages/CyberBug/ProjectDetail";
import ProjectManagement from "./pages/CyberBug/ProjectManagement";
import DemoDragDrop from "./components/DemoDragAndDrop/DemoDragDrop";
import DragAndDrop from "./components/DemoDragAndDrop/DragAndDrop";
import RegisterCyberBug from "./pages/CyberBug/RegisterCyberBug/RegisterCyberBug";
import UserManagement from "./pages/CyberBug/UserManagement";
function App() {
  return (
    <Router history={history}>
      <LoadingComponent></LoadingComponent>
      <Modal></Modal>
      <ModalCyberBugs></ModalCyberBugs>
      <Switch>
        <CyberBugsTenplate exact path="/" Component={ProjectManagement}></CyberBugsTenplate>
        <HomeTemplate exact path='/home' Component={Home}><Home></Home></HomeTemplate>
        <HomeTemplate exact path="/contact" Component={Contact}></HomeTemplate>
        <HomeTemplate exact path="/detailLogin/:id" Component={DetailLogin}></HomeTemplate>
        <HomeTemplate exact path="/drag" Component={DemoDragDrop}></HomeTemplate>
        <HomeTemplate exact path="/drag2" Component={DragAndDrop}></HomeTemplate>
        <UserLoginTemplate exact path='/login' Component={LoginCyberBug}></UserLoginTemplate>
        <UserLoginTemplate exact path='/register' Component={RegisterCyberBug}></UserLoginTemplate>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/todolist' component={ToDoList}></Route>
        <Route exact path='/todolist2' component={ToDoListRFC}></Route>
        <Route exact path='/todolistredux' component={ToDoListRedux}></Route>
        <Route exact path='/todolistsaga' component={ToDoListSaga}></Route>
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal}></HomeTemplate>
        <CyberBugsTenplate exact path='/project/board/:projectId' Component={CyberBoard}></CyberBugsTenplate>
        <CyberBugsTenplate exact path='/project/detail' Component={ProjectDetail} ></CyberBugsTenplate>
        <CyberBugsTenplate exact path='/project/management' Component={ProjectManagement} ></CyberBugsTenplate>
        <CyberBugsTenplate exact path='/usermanagement' Component={UserManagement} ></CyberBugsTenplate>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
