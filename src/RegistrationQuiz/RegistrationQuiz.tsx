import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import axios from 'axios'; // import axios
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BasicInfo from './Steps/BasicInfo';
import PhysicalInfo from './Steps/PhysicalInfo';
import GoalsBarriers from './Steps/GoalsBarriers';
import PersonalDetails from './Steps/PersonalDetails';
import ProgressBar from './ProgressBar';

export default function RegistrationQuiz() {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    height: '',
    actual_weight: '',
    goal_weight: '',
    gender: '',
    goals: [] as string[],
    barriers: [] as string[],
    dob: '',
    location: '',
    activity_level: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (field: 'goals' | 'barriers', value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues,
      };
    });
  };

  const prevStep1 = () => {
    if (currentStep === 1) {
      navigate('/'); // Redirect to the home page on the first step
    } else {
      setCurrentStep((prev) => prev - 1); // Go to the previous step
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
  
    try {
      const response = await axios.post("http://localhost:2025/user/adduser", formData);
      console.log("Backend response:", response);
  
      if (response.status === 200) {
        setMessage("Registration successful!");
        setFormData({
          name: '',
          email: '',
          password: '',
          height: '',
          actual_weight: '',
          goal_weight: '',
          gender: '',
          goals: [],
          barriers: [],
          dob: '',
          location: '',
          activity_level: '',
        });
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Backend error response:", error.response.data);
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        console.error("Unknown error:", error);
        setMessage("Error submitting form. Please try again later.");
      }
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-500/20 p-8 w-full max-w-2xl">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center">
            {currentStep === 1 && (
              <BasicInfo formData={formData} handleChange={handleChange} />
            )}
            {currentStep === 2 && (
              <PhysicalInfo formData={formData} handleChange={handleChange} />
            )}
            {currentStep === 3 && (
              <GoalsBarriers
                formData={formData}
                handleMultiSelect={handleMultiSelect}
              />
            )}
            {currentStep === 4 && (
              <PersonalDetails formData={formData} handleChange={handleChange} />
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep1}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>


            {currentStep === totalSteps ? (
              <button type="submit" className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition-colors" onClick={handleSubmit}>
                Complete Registration
              </button>
              
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          {message && <p className="text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
