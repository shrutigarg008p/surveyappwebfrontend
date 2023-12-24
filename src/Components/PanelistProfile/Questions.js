import React, { useState } from 'react';

const Questions = ({ questions, onHandleQuestionResponse, userResponse }) => {
    const [formData, setFormData] = useState(userResponse);

    const handleChange = (questionId, value) => {
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [questionId]: value,
            };

            onHandleQuestionResponse(updatedData);
            return updatedData;
        });
    };

    const renderQuestion = (question) => {
        switch (question.displayType) {
            case 1:
                // Dropdown
                return (
                    <div className="jumbotron bg-white p-3 border shadow-sm" key={question.id}>
                    <div key={question.id}>
                        <label>{question.text}</label>
                        <select
                            style={{
                                width: '100%',
                                display: 'block',
                                height: '40px',
                                lineHeight: '1.5',
                                color: '#495057',
                                backgroundColor: '#fff',
                                backgroundClip: 'padding-box',
                                border: '1px solid #ced4da',
                                borderRadius: '5px',
                                transition:
                                    'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                            }}
                            name='blackListType'
                            id='type'
                            required
                            value={formData[question.id] || ''}
                            onChange={(e) => handleChange(question.id, e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {renderOptions(question.options)}
                        </select>
                    </div>
                    </div>
                );

            case 2:
                // Radio buttons
                return (
                    <div className="jumbotron bg-white p-3 border shadow-sm" key={question.id}>
                    <div key={question.id}>
                        <label>{question.text}</label>
                        <div className="custom-control custom-radio">
                        {question.options.map((option) => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    id={option.id}
                                    name={question.id}
                                    value={option.id}
                                    checked={formData[question.id] === option.id}
                                    onChange={() => handleChange(question.id, option.id)}
                                />
                                <label htmlFor={option.id} className="custom-control-label">{option.value}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                );

            case 4:
                // Checkboxes
                return (
                    <div className="jumbotron bg-white p-3 border shadow-sm" key={question.id}>
                    <div key={question.id}>
                        <label>{question.text}</label>
                        {question.options.map((option) => (
                            <div key={option.id} className="col ml-2">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={option.id}
                                    value={option.id}
                                    checked={formData[question.id]?.includes(option.id) || false}
                                    onChange={() => handleCheckboxChange(question.id, option.id)}
                                />
                                <label className="custom-control-label" htmlFor={option.id}>{option.value}</label>
                            </div>
                        ))}
                    </div>
                    </div>
                );

            // Add more cases for other display types as needed

            default:
                return null;
        }
    };

    const renderOptions = (options) => {
        return options.map((option) => (
            <option key={option.id} value={option.id}>
                {option.value}
            </option>
        ));
    };


    const handleCheckboxChange = (questionId, value) => {
        setFormData((prevData) => {
            const currentValues = prevData[questionId] || [];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];

            onHandleQuestionResponse({
                ...prevData,
                [questionId]: updatedValues,

            });
            return {
                ...prevData,
                [questionId]: updatedValues,

            };
        });
    };

    console.log('formdata---->', formData)
    return (
        <div>
            {questions.map((question) => renderQuestion(question))}
        </div>
    );
};

export default Questions;
