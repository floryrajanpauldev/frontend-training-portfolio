import SimpleInput from './SimpleInput.jsx';
import FruitInput from './FruitInput.jsx';
import Login from './Login.jsx';
import RadioOption from './RadioOption.jsx';
import SelectDropDown from './SelectDropDown.jsx';
import SingleCheckBox from './SingleCheckBox.jsx';
import MultipleCheckboxes from './MultipleCheckboxes.jsx';
import TextArea from './TextArea.jsx';
import MyForm from './MyForm.jsx';
import FormReact19 from './FormReact19.jsx';

function App() {
  return (
    <main>
      <h1>React Forms</h1>
      <section><SimpleInput /></section>
      <section><FruitInput /></section>
      <section><Login /></section>
      <section><RadioOption /></section>
      <section><SelectDropDown /></section>
      <section><SingleCheckBox /></section>
      <section><MultipleCheckboxes /></section>
      <section><TextArea /></section>
      <section><MyForm /></section>
      <section><FormReact19 /></section>
    </main>
  );
}

export default App;
