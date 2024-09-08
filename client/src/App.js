import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookingForm from '../components/Bookingform';
import HospitalDashboard from './components/HospitalDashboard';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Switch>
          <Route exact path="/" component={BookingForm} />
          <Route path="/hospital-dashboard" component={HospitalDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;