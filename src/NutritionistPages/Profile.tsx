import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Linkedin, Twitter, Languages, Award, Stethoscope, CreditCard, Video } from 'lucide-react';

function Profile() {

  const getProfileImageUrl = (email) =>
    `http://localhost:2025/nutritionist/image?email=${encodeURIComponent(email)}`;

  const [nutritionist, setNutritionist] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'))?.email; // Assuming email is stored in user data in localStorage

    if (!email) {
      // Handle case when email is not found in session
      return;
    }

    // Fetch nutritionist data
    const fetchNutritionistData = async () => {
      try {
        const response = await fetch(`http://localhost:2025/nutritionist/view?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Nutritionist Data:', data); // Log fetched data
        setNutritionist(data);
      } catch (error) {
        console.error('Error fetching nutritionist data:', error);
      }
    };
    
    

    // Fetch the profile image
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(getProfileImageUrl(email));
        if (!response.ok) {
          throw new Error('Image not found');
        }
        const imageUrl = await response.text();
        console.log('Fetched Profile Image URL:', imageUrl); // Log fetched image URL
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    

    fetchNutritionistData();
    fetchProfileImage();
  }, []);

  // If data is not loaded yet, show loading indicator
  if (!nutritionist || !profileImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
          <img
  src={getProfileImageUrl(nutritionist.email)}  // Default image if not loaded
  alt={nutritionist.bio}
  className="w-48 h-48 rounded-full object-cover border-4 border-red-500"
/>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{nutritionist.fullName}</h1>
              <p className="text-red-400 text-xl mb-4">{nutritionist.yearsOfExperience} Years of Experience</p>
              <p className="text-gray-300 mb-4">{nutritionist.bio}</p>
              <div className="flex gap-4">
                <a href={nutritionist.linkedInUrl} className="text-white hover:text-red-400">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={nutritionist.twitterUrl} className="text-white hover:text-red-400">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-red-400" />
                <span>{nutritionist.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-red-400" />
                <span>{nutritionist.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-red-400" />
                <span>{nutritionist.clinicAddress}</span>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Qualifications</h2>
            <div className="space-y-2">
              {nutritionist.qualifications.map((qual, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Award className="text-red-400" />
                  <span>{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Specializations</h2>
            <div className="space-y-2">
              {nutritionist.specializations.map((spec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Stethoscope className="text-red-400" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Consultation</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="text-red-400" />
                <span>Fee: ${nutritionist.consultationFee}/session</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="text-red-400" />
                <span>Modes: {nutritionist.consultationModes.join(", ")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Languages className="text-red-400" />
                <span>Languages: {nutritionist.languages.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Clock className="text-red-400" />
                <span>Working Hours: {nutritionist.workingHours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-red-400" />
                <span>Available: {nutritionist.availableDays.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
