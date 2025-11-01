import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/layout";
import ProtectedRoute from "./ProtectedRoute"; 
// admin
import ADashboard from "./components/Dashboard";
import ALayout from "./Layout/layout";
// import ACollection from "./reports/collection";
// import AFollowup from "./reports/followup";
// import APending from "./reports/pending";
// import AWalkin1 from "./reports/walkin";
// import ARegistrationReport from "./reports/RegistrationReport";
// import AReferenceReport from "./reports/reference";
import ABatchSchedule from "./batchschedule/BatchSchedule";
import ANwSheelaWalkin from "./cro/sheela/sheelawalkin";
import ANwSheelaLeed from "./cro/sheela/sheelaleed";
import ANwSheelaCall from "./cro/sheela/sheelacall";
import ANwSheelaDemo from "./cro/sheela/sheelademo";
import ANwSheelaRegistration from "./cro/sheela/sheelaregistration";
import AEducationExpenseTracker from "./expence/expences";
import AAdminDashboard from "./Admin/AdminDb";
import AAdminLogin from "./Admin/Adminlogin";
import ANewStaff from "./Admin/Newstaff";
import ATrainingSchedule from "./Admin/Trainingsch";
// import AReportLeed from "./reports/lead";
import ASignup from "./loginreg/reg";
import ASeminarTracker from "./marketting/seminar";
import AActivityTracker from "./marketting/activities";

// superadmin
import SDashboard from "./components/Dashboard";
import SLayout from "./Layout/layout";
import SCollection from "./reports/collection";
import SFollowup from "./reports/followup";
import SPending from "./reports/pending";
import SWalkin1 from "./reports/walkin";
import SRegistrationReport from "./reports/RegistrationReport";
import SReferenceReport from "./reports/reference";
import SBatchSchedule from "./batchschedule/BatchSchedule";
import SNwSheelaWalkin from "./cro/sheela/sheelawalkin";
import SNwSheelaLeed from "./cro/sheela/sheelaleed";
import SNwSheelaCall from "./cro/sheela/sheelacall";
import SNwSheelaDemo from "./cro/sheela/sheelademo";
import SNwSheelaRegistration from "./cro/sheela/sheelaregistration";
import SEducationExpenseTracker from "./expence/expences";
import SAdminDashboard from "./Admin/AdminDb";
import SAdminLogin from "./Admin/Adminlogin";
import SNewStaff from "./Admin/Newstaff";
import STrainingSchedule from "./Admin/Trainingsch";
import SReportLeed from "./reports/lead";
import SSignup from "./loginreg/reg";
import SSeminarTracker from "./marketting/seminar";
import SActivityTracker from "./marketting/activities";


// ----------------- BDM SECTION ----------------- //
import BdmLayout from "./bdmlayout/bdmlayout";
import BdmDashboard from "./bdmcomponents/bdmDashboard";
import BdmSidebar from "./bdmsidebar/bdmSidebar";
import BdmSheelaWalkin from "./bdmcro/sheela/sheelawalkin";
import BdmSheelaLeed from "./bdmcro/sheela/sheelaleed";
import BdmSheelaCall from "./bdmcro/sheela/sheelacall";
import BdmSheelaDemo from "./bdmcro/sheela/sheelademo";
import BdmSheelaRegistration from "./bdmcro/sheela/sheelaregistration";
import BdmActivityTracker from "./bdmmarketting/activities";
import BdmSeminarTracker from "./bdmmarketting/seminar";
import BdmworkshopTracker from "./bdmmarketting/workshop";
import BdmEducationExpenseTracker from "./bdmexpence/bdmexpences";

import BdmWalkin from "./bdmreport/bdmwalkin";
import BdmCollection from "./bdmreport/bdmcollection";
import BdmFollowup from "./bdmreport/bdmfollowup";
import BdmPending from "./bdmreport/bdmpending";
import BdmReferenceReport from "./bdmreport/bdmreference";
import BdmRegistrationReport from "./bdmreport/bdmRegistrationReport";

import BdmBatchSchedule from "./bdmbatchschedule/bdmBatchSchedule";
import BdmAdminDashboard from "./bdmAdmin/AdminDb";
import BdmAdminLogin from "./bdmAdmin/Adminlogin";
import BdmNewStaff from "./bdmAdmin/Newstaff";
import BdmTrainingSchedule from "./bdmAdmin/Trainingsch";

// Reports
import Dashboard from "./components/Dashboard";
import Collection from "./reports/collection";
import Followup from "./reports/followup";
import Pending from "./reports/pending";
import Walkin1 from "./reports/walkin";
import RegistrationReport from "./reports/RegistrationReport";
import ReferenceReport from "./reports/reference";
import BatchSchedule from "./batchschedule/BatchSchedule";

// CRO Pages
import SheelaWalkin from "./cro/sheela/sheelawalkin";
import SheelaLeed from "./cro/sheela/sheelaleed";
import SheelaCall from "./cro/sheela/sheelacall";
import SheelaDemo from "./cro/sheela/sheelademo";
import SheelaRegistration from "./cro/sheela/sheelaregistration";

// Expense
import EducationExpenseTracker from "./expence/expences";

// Admin
import AdminDashboard from "./Admin/AdminDb";
import AdminLogin from "./Admin/Adminlogin";
import NewStaff from "./Admin/Newstaff";
import TrainingSchedule from "./Admin/Trainingsch";
import ReportLeed from "./reports/lead";
import Signup from "./loginreg/reg";
import Attendance from "./technicals/attendance";
import TechReport from "./reports/techattendrep";

// ----------------- IT DESK ----------------- //
// IT Components
import ItDashboard from "./itcomponents/itDashboard";
import ItLayout from "./itlayout/layout";
import ItSidebar from "./itsidebar/itSidebar";

// IT Admin
import ItAdminDashboard from "./itAdmin/AdminDb";
import ItAdminLogin from "./itAdmin/Adminlogin";
import ItNewStaff from "./itAdmin/Newstaff";
import ItTrainingSchedule from "./itAdmin/Trainingsch";

// IT Batch & Reports
import ItBatchSchedule from "./itbatchschedule/itBatchSchedule";
import ItWalkin from "./itreport/itwalkin";
import ItCollection from "./itreport/itcollection";
import ItFollowup from "./itreport/itfollowup";
import ItPending from "./itreport/itpending";
import ItReferenceReport from "./itreport/itreference";
import ItRegistrationReport from "./itreport/itRegistrationReport";
import ItEducationExpenseTracker from "./itexpence/itexpences";

// IT CRO Pages
import ItSheelaWalkin from "./itcro/sheela/sheelawalkin";
import ItSheelaLeed from "./itcro/sheela/sheelaleed";
import ItSheelaCall from "./itcro/sheela/sheelacall";
import ItSheelaDemo from "./itcro/sheela/sheelademo";
import ItSheelaRegistration from "./itcro/sheela/sheelaregistration";

// Marketing Routes (IT)
import ItActivityTracker from "./itmarketting/activities";
import ItSeminarTracker from "./itmarketting/seminar";
import ItworkshopTracker from "./itmarketting/workshop";
import ActivityTracker from "./marketting/activities";
import SeminarTracker from "./marketting/seminar";

function App() {
  // ✅ Define office state here
  const [office, setOffice] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Login & Register (open for all) */}
        <Route path="/Admin/Adminlogin" element={<AdminLogin />} />
        <Route path="/reg" element={<Signup />} />

        {/* ✅ Protected routes only after login */}
        <Route path="/" element={<Layout />}>
          {/* Reports - Dashboard as default route */}
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
          <Route path="/followup" element={<ProtectedRoute><Followup /></ProtectedRoute>} />
          <Route path="/pending" element={<ProtectedRoute><Pending /></ProtectedRoute>} />
          <Route path="/walkin" element={<ProtectedRoute><Walkin1 /></ProtectedRoute>} />
          <Route path="/registrationreport" element={<ProtectedRoute><RegistrationReport /></ProtectedRoute>} />
          <Route path="/reference" element={<ProtectedRoute><ReferenceReport /></ProtectedRoute>} />
          <Route path="/techattendrepo" element={<ProtectedRoute><TechReport /></ProtectedRoute>} />

          {/* CRO: Sheela */}
          <Route path="cro/walkin" element={<ProtectedRoute><SheelaWalkin /></ProtectedRoute>} />
          <Route path="cro/leed" element={<ProtectedRoute><SheelaLeed /></ProtectedRoute>} />
          <Route path="cro/call" element={<ProtectedRoute><SheelaCall /></ProtectedRoute>} />
          <Route path="cro/demo" element={<ProtectedRoute><SheelaDemo /></ProtectedRoute>} />
          <Route path="cro/registration" element={<ProtectedRoute><SheelaRegistration /></ProtectedRoute>} />

          {/* Expense */}
          <Route path="expence/expences" element={<ProtectedRoute><EducationExpenseTracker /></ProtectedRoute>} />

          {/* Batch Schedule */}
          <Route path="batchschedule/BatchSchedule" element={<ProtectedRoute><BatchSchedule /></ProtectedRoute>} />

          {/* Admin Pages */}
          <Route path="/Admin/AdminDB" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/Admin/Newstaff" element={<ProtectedRoute><NewStaff /></ProtectedRoute>} />
          <Route path="/Admin/Trainingsch" element={<ProtectedRoute><TrainingSchedule /></ProtectedRoute>} />
          <Route path="/reportleed" element={<ProtectedRoute><ReportLeed /></ProtectedRoute>} />
          <Route path="/attend" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path="/activities" element={<ProtectedRoute><ActivityTracker /></ProtectedRoute>} />
          <Route path="/seminar" element={<ProtectedRoute><SeminarTracker /></ProtectedRoute>} />
        </Route>

        {/* ----------------- IT ROUTES ----------------- */}
        <Route path="/it" element={<ItLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<ItDashboard />} />
          <Route path="itsidebar" element={<ItSidebar />} />

          {/* IT Admin */}
          <Route path="itadmin/AdminDB" element={<ItAdminDashboard />} />
          <Route path="itadmin/Adminlogin" element={<ItAdminLogin />} />
          <Route path="itadmin/Newstaff" element={<ItNewStaff />} />
          <Route path="itadmin/Trainingsch" element={<ItTrainingSchedule />} />

          {/* IT Batch & Reports */}
          <Route path="itbatchschedule/itBatchSchedule" element={<ItBatchSchedule />} />
          <Route path="itreport/itwalkin" element={<ItWalkin />} />
          <Route path="itreport/itcollection" element={<ItCollection />} />
          <Route path="itreport/itfollowup" element={<ItFollowup />} />
          <Route path="itreport/itpending" element={<ItPending />} />
          <Route path="itreport/itreference" element={<ItReferenceReport />} />
          <Route path="itreport/itRegistrationReport" element={<ItRegistrationReport />} />
          <Route path="itexpence/itexpences" element={<ItEducationExpenseTracker />} />

          {/* IT CRO Routes */}
          <Route path="itcro/sheela/sheelawalkin" element={<ItSheelaWalkin />} />
          <Route path="itcro/sheela/sheelaleed" element={<ItSheelaLeed />} />
          <Route path="itcro/sheela/sheelacall" element={<ItSheelaCall />} />
          <Route path="itcro/sheela/sheelademo" element={<ItSheelaDemo />} />
          <Route path="itcro/sheela/sheelaregistration" element={<ItSheelaRegistration />} />

          {/* IT Marketing */}
          <Route path="itmarketting/activities" element={<ItActivityTracker />} />
          <Route path="itmarketting/seminar" element={<ItSeminarTracker />} />
          <Route path="itmarketting/workshop" element={<ItworkshopTracker />} />
        </Route>

        {/* ----------------- BDM ROUTES ----------------- */}
        <Route path="/bdm" element={<BdmLayout office={office} setOffice={setOffice} />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<BdmDashboard />} />
          <Route path="bdmsidebar/bdmSidebar" element={<BdmSidebar/>}/>
          <Route path="bdmcro/sheela/sheelawalkin" element={<BdmSheelaWalkin />} />
          <Route path="bdmcro/sheela/sheelaleed" element={<BdmSheelaLeed />} />
          <Route path="bdmcro/sheela/sheelacall" element={<BdmSheelaCall />} />
          <Route path="bdmcro/sheela/sheelademo" element={<BdmSheelaDemo />} />
          <Route path="bdmcro/sheela/sheelaregistration" element={<BdmSheelaRegistration />} />
          <Route path="bdmexpence/bdmexpences" element={<BdmEducationExpenseTracker />} />
          <Route path="bdmmarketting/activities" element={<BdmActivityTracker />} />
          <Route path="bdmmarketting/seminar" element={<BdmSeminarTracker />} />
          <Route path="bdmmarketting/workshop" element={<BdmworkshopTracker />} />
          <Route path="bdmreport/bdmwalkin" element={<BdmWalkin />} />
          <Route path="bdmreport/bdmcollection" element={<BdmCollection />} />
          <Route path="bdmreport/bdmfollowup" element={<BdmFollowup />} />
          <Route path="bdmreport/bdmpending" element={<BdmPending />} />
          <Route path="bdmreport/bdmreference" element={<BdmReferenceReport />} />
          <Route path="bdmreport/bdmRegistrationReport" element={<BdmRegistrationReport />} />
          <Route path="bdmbatchschedule/bdmBatchSchedule" element={<BdmBatchSchedule />} />
          <Route path="bdmadmin/AdminDB" element={<BdmAdminDashboard />} />
          <Route path="bdmadmin/Adminlogin" element={<BdmAdminLogin />} />
          <Route path="bdmadmin/Newstaff" element={<BdmNewStaff />} />
          <Route path="bdmadmin/Trainingsch" element={<BdmTrainingSchedule />} />
        </Route>
{/*         
        superadmin */}

        <Route path="/superadmin" element={<Layout office={office} setOffice={setOffice} />}>
          {/* ✅ Redirect to dashboard on root */}
          <Route index element={<Navigate to="dashboard" />} />

          {/* ✅ All child routes */}
          <Route path="dashboard" element={<SDashboard />} />
          <Route path="collection" element={<sCollection />} />
          <Route path="followup" element={<SFollowup />} />
          <Route path="pending" element={<SPending />} />
          <Route path="walkin" element={<SWalkin1 />} />
          <Route path="registrationreport" element={<SRegistrationReport />} />
          <Route path="reference" element={<SReferenceReport />} />
          <Route path="marketting/activities" element={<SActivityTracker />} />
          <Route path="marketting/seminar" element={<SSeminarTracker />} />
          <Route path="reports/collection" element={<SCollection/>}/>
          
          <Route path="cro/walkin" element={<SNwSheelaWalkin />} />
          <Route path="cro/leed" element={<SNwSheelaLeed />} />
          <Route path="cro/call" element={<SNwSheelaCall />} />
          <Route path="cro/demo" element={<SNwSheelaDemo />} />
          <Route path="cro/registration" element={<SNwSheelaRegistration />} />
          <Route path="expence/expences" element={<SEducationExpenseTracker />} />
          <Route path="Admin/AdminDB" element={<SAdminDashboard />} />
          <Route path="Admin/Adminlogin" element={<SAdminLogin />} />
          <Route path="Admin/Newstaff" element={<SNewStaff />} />
          <Route path="Admin/Trainingsch" element={<STrainingSchedule />} />
          <Route path="batchschedule/BatchSchedule" element={<SBatchSchedule />} />
          <Route path="reportleed" element={<SReportLeed />} />
          <Route path="reg" element={<SSignup />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<ALayout office={office} setOffice={setOffice} />}>
          {/* ✅ Redirect to dashboard on root */}
          <Route index element={<Navigate to="dashboard" />} />

          {/* ✅ All child routes */}
          <Route path="dashboard" element={<ADashboard />} />
          {/* <Route path="collection" element={<ACollection />} />
          <Route path="followup" element={<AFollowup />} /> */}
          {/* <Route path="pending" element={<APending />} /> */}
          {/* <Route path="walkin" element={<AWalkin1 />} /> */}
          {/* <Route path="registrationreport" element={<ARegistrationReport />} /> */}
          {/* <Route path="reference" element={<AReferenceReport />} /> */}
          <Route path="marketting/activities" element={<AActivityTracker />} />
          <Route path="marketting/seminar" element={<ASeminarTracker />} />
      
          <Route path="cro/walkin" element={<ANwSheelaWalkin />} />
          <Route path="cro/leed" element={<ANwSheelaLeed />} />
          <Route path="cro/call" element={<ANwSheelaCall />} />
          <Route path="cro/demo" element={<ANwSheelaDemo />} />
          <Route path="cro/registration" element={<ANwSheelaRegistration />} />
          <Route path="expence/expences" element={<AEducationExpenseTracker />} />
          <Route path="Admin/AdminDB" element={<AAdminDashboard />} />
          <Route path="Admin/Adminlogin" element={<AAdminLogin />} />
          <Route path="Admin/Newstaff" element={<ANewStaff />} />
          <Route path="Admin/Trainingsch" element={<ATrainingSchedule />} />
          <Route path="batchschedule/BatchSchedule" element={<ABatchSchedule />} />
          {/* <Route path="reportleed" element={<AReportLeed />} /> */}
          <Route path="reg" element={<ASignup />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
