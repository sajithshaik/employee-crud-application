import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddEmployee() {
  const initialValues = { name: "", email: "", username: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (!Object.keys(errors).length){
       createUsers();
    }
    
  };
  const createUsers = async () => {
    const result = await axios.post("http://localhost:3200/users", formValues);
      setIsSubmit(true);
      console.log(result);
       
    };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.username) {
      errors.username = "UserName is required!";
    }
    return errors;
  };
 
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Added successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Employee Form</h1>
        <div class="form-floating mb-3 mt-3">
          <input type="text" class="form-control" id="name" placeholder="Enter first name" name="name" value={formValues.name} onChange={handleChange}/>
          <label for="email"> Name</label>

        </div>
        <p style={{color: "red"}}>{formErrors.name}</p>

        <div class="form-floating mt-3 mb-3">
          <input type="text" class="form-control" id="username" placeholder="Enter last name" name="username" value={formValues.username} onChange={handleChange} />
          <label for="pwd">User Name</label>
        </div>
        <p style={{color: "red"}}>{formErrors.username}</p>

        <div class="form-floating mt-3 mb-3">
          <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" value={formValues.email} onChange={handleChange} />
          <label for="pwd">Email</label>

        </div>
        <p style={{color: "red"}}>{formErrors.email}</p>

        <button class="btn btn-primary" type="submit">submit</button>
      </form>
    </div>          
  )  
}

export default AddEmployee;