import React, { useState } from 'react';
import Form from './Form';
import './Demo.css'

const FormFieldTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  DROPDOWN: 'dropdown',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
};

const Demo = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleAddField = (type) => {
    setFormFields([...formFields, { type, label: '', options: [] }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].options[optionIndex] = value;
    setFormFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic goes here
    console.log('Form submitted:', formFields);
    
  };

  const renderField = (field, index) => {
    switch (field.type) {
      case FormFieldTypes.DROPDOWN:
        return (
            <div>
                <select style={{position:"relative",bottom:"2px", marginLeft: "8px"}}
            value={formData[field.label] || ''}
            onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
          >
            {field.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
                <div className='options'>
                Options:
                {field.options.map((option, optionIndex) => (
                  <input style={{marginLeft: "5px"}}
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  />
                ))}
                <button style={{marginLeft: "5px"}}   className= "btn btn-info" onClick={() => handleOptionChange(index, field.options.length, '')}>Add Option</button>
              </div>
            </div>
        );
      case FormFieldTypes.RADIO:
        return (
          <div>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  name={field.label}
                  value={option}
                  checked={formData[field.label] === option}
                  onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                />
                {option}
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter option"
              value={field.newOption || ''}
              onChange={(e) => handleInputChange(index, 'newOption', e.target.value)}
            />
            <button   className= "btn btn-info" onClick={() => {
              if (field.newOption.trim() !== '') {
                handleOptionChange(index, field.options.length, field.newOption);
                handleInputChange(index, 'newOption', '');
              }
            }}>Add Option</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      <h1>Dynamic Form Generator</h1>
      <div className="form-buttons ">
        <button type="button" className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.TEXT)}>
          Add Text Field
        </button>
        <button type="button"className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.TEXTAREA)}>
          Add Text Area
        </button>
        <button type="button"   className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.DROPDOWN)}>
          Add Dropdown
        </button>
        <button type="button"   className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.CHECKBOX)}>
          Add Checkbox
        </button>
        <button type="button"   className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.RADIO)}>
          Add Radio
        </button>
        <button
            type="button"
            
              className= "btn btn-info" onClick={() => handleAddField(FormFieldTypes.FILE)}
          >
            Add File 
          </button>
        <button type="submit" className= "btn btn-info" >Submit</button>
        </div>

      <form className="form" onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div className="form-field" key={index}>
            <label style={{fontSize: "15px"}}>
              Field Label:
              <input  
                type="text"
                className='input form-label'
                value={field.label}
                onChange={(e) => handleInputChange(index, 'label', e.target.value)}
              />
            </label>
            <label style={{marginLeft: "97px",fontSize: "15px"}}>
              Field Type:
              <select style={{marginLeft: "5px"}}
                value={field.type}
                onChange={(e) => handleInputChange(index, 'type', e.target.value)}
              >
                {Object.values(FormFieldTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            {renderField(field, index)}
            <button type="button" className='btn btn-danger'    onClick={() => handleRemoveField(index)}>
              Remove Field
            </button>
          </div>
        ))}
              </form>


        <Form formFields={formFields} />



    </div>
  );
};

export default Demo;