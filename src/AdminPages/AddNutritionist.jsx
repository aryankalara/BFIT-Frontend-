import React, { useState } from 'react';
import { Clock, MapPin, Phone, Mail, User, Calendar, Camera, Award, Globe, BookOpen, Building, Languages, DollarSign } from 'lucide-react';

function AddNutritionist() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    profileImage: null,
    qualifications: '',
    experience: '',
    licenseNumber: '',
    specializations: [],
    servicesOffered: [],
    consultationFee: '',
    consultationModes: [],
    languages: '',
    clinicAddress: '',
    workingHours: '',
    availableDays: [],
    bio: '',
    socialMediaLinks: {
      linkedin: '',
      twitter: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (Array.isArray(formData[name])) {
      const values = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'socialMediaLinks') {
        formDataToSend.append('linkedin', formData.socialMediaLinks.linkedin);
        formDataToSend.append('twitter', formData.socialMediaLinks.twitter);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:2025/admin/add-nutritionist', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        alert('Nutritionist added successfully!');
        // Reset form or navigate away as needed
      } else {
        alert('Failed to add nutritionist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > index ? 'bg-red-600 text-white' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="John Doe"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Image</label>
          <div className="relative">
            <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Professional Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Qualifications</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="e.g., MSc in Nutrition"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years of Experience</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="5"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">License Number</label>
          <div className="relative">
            <Award className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="License number"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Specializations</label>
          <select
            name="specializations"
            multiple
            value={formData.specializations}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 h-32 text-black"
          >
            <option value="sports">Sports Nutrition</option>
            <option value="clinical">Clinical Nutrition</option>
            <option value="pediatric">Pediatric Nutrition</option>
            <option value="weight">Weight Management</option>
            <option value="diabetes">Diabetes Management</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Services & Consultation</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Services Offered</label>
          <select
            name="servicesOffered"
            multiple
            value={formData.servicesOffered}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 h-32 text-black"
          >
            <option value="diet">Diet Planning</option>
            <option value="counseling">Nutritional Counseling</option>
            <option value="assessment">Nutritional Assessment</option>
            <option value="education">Nutrition Education</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Consultation Fee</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="100"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Consultation Modes</label>
          <select
            name="consultationModes"
            multiple
            value={formData.consultationModes}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
          >
            <option value="inPerson">In-Person</option>
            <option value="video">Video Call</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Languages</label>
          <div className="relative">
            <Languages className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="English, Spanish"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Work Details & Additional Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Clinic Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="Enter your clinic address"
              rows={3}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Working Hours</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="9:00 AM - 5:00 PM"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Available Days</label>
          <select
            name="availableDays"
            multiple
            value={formData.availableDays}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Social Media Links</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="linkedin"
                value={formData.socialMediaLinks.linkedin}
                onChange={(e) => setFormData({ ...formData, socialMediaLinks: { ...formData.socialMediaLinks, linkedin: e.target.value } })}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="twitter"
                value={formData.socialMediaLinks.twitter}
                onChange={(e) => setFormData({ ...formData, socialMediaLinks: { ...formData.socialMediaLinks, twitter: e.target.value } })}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500 text-black"
                placeholder="Twitter URL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Nutritionist Registration</h1>
        
        {renderProgressBar()}
        
        <form className="space-y-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              {step === totalSteps ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNutritionist;