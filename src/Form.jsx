import React, { useState } from 'react';
import "./form.css"
const Form = ({ formFields }) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e, fieldName) => {
    const value = e.target.type === 'checkbox' ? !!e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,

    });
    console.log(formData)
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let errors = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required.`;
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formData);
    }
  };

  return (
    <form  className = "result" onSubmit={handleSubmit}>
        <h1 className='field'>Fields</h1>
      {formFields.map(field => (
        <div className = "form" key={field.name}>
          <label className='label' htmlFor={field.name}>{field.label}</label>
          {field.type === 'text' && (
            <input
              className='input1'
              type="text"
              id={field.name}
              name={field.name}
              value={field.value} 
              onChange={(e) => handleChange(e, field.label)}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              className='txt'
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={(e) => handleChange(e, field.label)}
            />
          )}
          {field.type === 'dropdown' && (
            <select
              className='drop'
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={(e) => handleChange(e, field.label)}
            >
              <option value="">Select...</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          {field.type === 'checkbox' && (
            <input
              className='check'
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={field.value}
              onChange={(e) => handleChange(e, field.label)}
            />
          )}
          {field.type === 'radio' && (
            <>
              {field.options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option} 
                    checked={formData[field.label]=== option}
                    onChange={(e) => handleChange(e, field.label)}
                  />
                  {option}
                </label>
              ))}
            </>
          )}
          {field.type === 'file' && (
            <>
            <label htmlFor={field.name}>{field.label}</label>
             <input
              type="file"
              className="form-control"
              accept="jpg" 
              onChange={(e) => {
                handleChange(e, field.label)
              }}
            />
            </>
          )}

          {formErrors[field.name] && <div style={{ color: 'red' }}>{formErrors[field.name]}</div>}
          
        </div>
        
      ))}
       {formFields?<button className = "btn2 btn btn btn-info" type="submit">Submit</button>:" "}
    </form>
  );
};

export default Form;