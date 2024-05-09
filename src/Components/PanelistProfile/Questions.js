import React, { useState } from 'react';

const Questions = ({ questions, onHandleQuestionResponse, userResponse, language = 'en' }) => {
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
                        <label>{language === 'hi' ? question.hindi : question.text}</label>
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
                            <option value="">{language === 'hi' ? 'कोई विकल्प चुनें' : 'Select an option'}</option>
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
                        <label>{language === 'hi' ? question.hindi : question.text}</label>
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
                                <label htmlFor={option.id} className="custom-control-label">{language === 'hi' ? option.hindi : option.value}</label>
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
                        <label>{language === 'hi' ? question.hindi : question.text}</label>
                        {question.options.map((option) => (
                            <div key={option.id} className="col ml-2">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={option.id}
                                    value={option.id}
                                    checked={formData[question.id]?.includes(option.id) || false}
                                    onChange={() => handleCheckboxChange(question.id, option.id, option.value)}
                                />
                                <label className="custom-control-label" htmlFor={option.id}>{language === 'hi' ? option.hindi : option.value}</label>
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
                {language === 'hi' ? option.hindi : option.value}
            </option>
        ));
    };


    //OLD
    // const handleCheckboxChange = (questionId, value, text) => {
    //     setFormData((prevData) => {
    //         const currentValues = prevData[questionId] || [];
    //         const updatedValues = currentValues.includes(value)
    //             ? currentValues.filter((v) => v !== value)
    //             : [...currentValues, value];
    //
    //         onHandleQuestionResponse({
    //             ...prevData,
    //             [questionId]: updatedValues,
    //
    //         });
    //         return {
    //             ...prevData,
    //             [questionId]: updatedValues,
    //
    //         };
    //     });
    // };


    //NEW
    const noneOfAboveIds = [
        "9ac889bc-b4bb-4c99-8ff8-dde8c195427a",
        "ab2c3386-e167-4233-8231-4744c42a09b5",
        "bab2c389-3ca6-4e41-abdc-123968e79126",
        "44585a7f-5ea8-4606-9835-ae7f92369f2f",
        "a2cd307f-bf50-49b6-8ec9-184a18571152",
        "1d3834f0-69eb-4ef1-b7bc-39a45395b721",
        "6fcb73a1-ea1e-473f-9e13-82c8553c1063",
        "37b22db0-d678-49d4-ac63-451818bc6c27",
        "83336a46-e819-45c9-b484-a0248c9d3707",
        "cdf586a2-35ae-42ff-94d4-013c0b695b7d",
        "d0c9ae88-ee27-4d4d-ab2c-7450936d4d68",
        "193d275a-bc1b-4b29-83a8-daf0a90c8769",
        "7277f122-b3f7-4975-b098-45c91f934605",
        "3138d4c4-e4e8-4519-973e-74a6269e307e"
    ];

    const handleCheckboxChange = (questionId, value, text) => {
        setFormData((prevData) => {
            let updatedValues;
            if (text === "None of the above") {
                updatedValues = [value];
            } else {
                const currentValues = prevData[questionId] || [];
                updatedValues = currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value];
            }

            // Remove None of above IDs if any other option is selected
            if (updatedValues.length > 0 && text !== "None of the above") {
                updatedValues = updatedValues.filter(id => !noneOfAboveIds.includes(id));
            }

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


    // const handleCheckboxChange = (questionId, value, text) => {
    //     setFormData((prevData) => {
    //         let updatedValues;
    //         const currentValues = prevData[questionId] || [];
    //
    //         if (text === 'None of the above') {
    //             if (currentValues.includes(value)) {
    //                 updatedValues = currentValues.filter((v) => v !== value);
    //             } else {
    //                 updatedValues = [value];
    //             }
    //         } else {
    //             if (currentValues.includes('None of the above')) {
    //                 if (currentValues.length === 1) {
    //                     updatedValues = [value];
    //                 } else {
    //                     updatedValues = currentValues.filter((v) => v !== 'None of the above' && v !== value);
    //                 }
    //             } else {
    //                 if (currentValues.includes(value)) {
    //                     updatedValues = currentValues.filter((v) => v !== value);
    //                 } else {
    //                     updatedValues = [...currentValues, value];
    //                 }
    //             }
    //         }
    //
    //         onHandleQuestionResponse({
    //             ...prevData,
    //             [questionId]: updatedValues,
    //         });
    //
    //         return {
    //             ...prevData,
    //             [questionId]: updatedValues,
    //         };
    //     });
    // };

    console.log('formdata---->', formData)
    return (
        <div>
            {questions.map((question) => renderQuestion(question))}
        </div>
    );
};

export default Questions;
