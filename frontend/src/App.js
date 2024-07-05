import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import SavedFormData from './SavedFormData';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/savedFormData" element={<SavedFormData />} />
      </Routes>
    </Router>
  );
};

export default App;
