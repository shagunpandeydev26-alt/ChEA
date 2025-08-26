import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { uploadToCloudinary, CloudinaryUploadResult } from '@/lib/cloudinary';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  college?: string;
  course?: string;
  year?: string;
  rollNumber?: string;
  profilePicture?: string;
  profilePicturePublicId?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    twitter?: string;
  };
  membershipDetails: {
    membershipId: string;
    membershipType: 'student' | 'alumni' | 'faculty' | 'premium';
    joinDate: string;
    expiryDate?: string;
    isActive: boolean;
    paymentStatus: 'paid' | 'pending' | 'free';
    benefits: string[];
  };
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      events: boolean;
      newsletters: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'members' | 'private';
      showEmail: boolean;
      showPhone: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  deleteProfilePicture: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const { showToast } = useNotifications();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if user is admin (you can modify this logic based on your admin setup)
  const isAdmin = userProfile?.email === 'admin@chea.com' || 
                  userProfile?.email === 'hemapandey760@gmail.com' || 
                  userProfile?.membershipDetails.membershipType === 'faculty';

  // Create default profile for new users
  const createDefaultProfile = (user: User): UserProfile => {
    const membershipId = `CHEA-${Date.now()}-${user.uid.slice(-6).toUpperCase()}`;
    
    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
      membershipDetails: {
        membershipId,
        membershipType: 'student',
        joinDate: new Date().toISOString(),
        isActive: true,
        paymentStatus: 'free',
        benefits: [
          'Access to ChEA events',
          'Student newsletter subscription',
          'Basic career resources',
          'Community forum access'
        ]
      },
      preferences: {
        notifications: {
          email: true,
          push: true,
          events: true,
          newsletters: true,
        },
        privacy: {
          profileVisibility: 'members',
          showEmail: false,
          showPhone: false,
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  // Load user profile
  const loadUserProfile = async (user: User) => {
    setLoading(true);
    try {
      // In a real app, you'd fetch from a database
      // For now, we'll use localStorage as a mock database
      const storageKey = `chea_user_profile_${user.uid}`;
      const storedProfile = localStorage.getItem(storageKey);
      
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
      } else {
        // Create new profile for first-time users
        const newProfile = createDefaultProfile(user);
        localStorage.setItem(storageKey, JSON.stringify(newProfile));
        setUserProfile(newProfile);
        showToast('success', 'Welcome to ChEA!', 'Your profile has been created successfully.');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      showToast('error', 'Error loading profile', 'Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      const updatedProfile = {
        ...userProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      const storageKey = `chea_user_profile_${userProfile.uid}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      
      showToast('success', 'Profile Updated', 'Your profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('error', 'Update Failed', 'Failed to update profile. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file: File): Promise<string> => {
    if (!userProfile) throw new Error('No user profile found');
    
    setLoading(true);
    try {
      const result: CloudinaryUploadResult = await uploadToCloudinary(file, {
        folder: 'chea/profile-pictures',
        width: 400,
        height: 400,
        crop: 'fill',
      });

      await updateProfile({
        profilePicture: result.secure_url,
        profilePicturePublicId: result.public_id,
      });

      showToast('success', 'Profile Picture Updated', 'Your profile picture has been updated successfully.');
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      showToast('error', 'Upload Failed', 'Failed to upload profile picture. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete profile picture
  const deleteProfilePicture = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      await updateProfile({
        profilePicture: undefined,
        profilePicturePublicId: undefined,
      });
      
      showToast('success', 'Profile Picture Removed', 'Your profile picture has been removed.');
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      showToast('error', 'Delete Failed', 'Failed to remove profile picture. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (currentUser) {
      await loadUserProfile(currentUser);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadUserProfile(currentUser);
    } else {
      setUserProfile(null);
    }
  }, [currentUser]);

  const value: UserContextType = {
    userProfile,
    loading,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    refreshProfile,
    isAdmin,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;