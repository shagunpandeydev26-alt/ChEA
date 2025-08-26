// Client-side Cloudinary implementation (browser-compatible)

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export interface UploadOptions {
  folder?: string;
  transformation?: string;
  width?: number;
  height?: number;
  crop?: string;
}

// Client-side Cloudinary implementation (browser-compatible)

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export interface UploadOptions {
  folder?: string;
  transformation?: string;
  width?: number;
  height?: number;
  crop?: string;
}

// Simple base64 upload fallback for development
const uploadAsBase64 = async (file: File): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Create a mock result for development
      const mockResult: CloudinaryUploadResult = {
        public_id: `chea/dev_${Date.now()}`,
        secure_url: reader.result as string,
        width: 400,
        height: 400,
        format: file.name.split('.').pop() || 'jpg',
        resource_type: 'image'
      };
      resolve(mockResult);
    };
    reader.readAsDataURL(file);
  });
};

// Upload image to Cloudinary using REST API (browser-compatible)
export const uploadToCloudinary = async (
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  // Get environment variables
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  // Debug logging
  console.log('Cloudinary upload attempt:', {
    cloudName,
    uploadPreset,
    fileSize: file.size,
    fileType: file.type
  });
  
  // If environment variables are not properly set, use fallback
  if (!cloudName || !uploadPreset) {
    console.warn('Cloudinary not configured properly, using base64 fallback for development');
    console.warn('Missing:', { cloudName: !cloudName, uploadPreset: !uploadPreset });
    return await uploadAsBase64(file);
  }
  
  const formData = new FormData();
  
  // Add the file
  formData.append('file', file);
  
  // Add upload preset (required for unsigned uploads)
  formData.append('upload_preset', uploadPreset);
  
  // Add folder if specified
  if (options.folder) {
    formData.append('folder', options.folder);
  }
  
  // Add transformation if specified
  if (options.transformation) {
    formData.append('transformation', options.transformation);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload failed:', {
        status: response.status,
        statusText: response.statusText,
        errorResponse: errorText
      });
      
      // Fallback to base64 if Cloudinary fails
      console.warn('Cloudinary failed, falling back to base64 storage');
      return await uploadAsBase64(file);
    }

    const data = await response.json();
    console.log('Cloudinary upload success:', data);
    return data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    
    // Fallback to base64 if network error
    console.warn('Network error, falling back to base64 storage');
    return await uploadAsBase64(file);
  }
};

// Generate optimized image URL (browser-compatible)
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
  } = {}
): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME not set, returning original publicId');
    return publicId;
  }

  const {
    width = 400,
    height = 400,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
};

// Delete image from Cloudinary (browser-compatible with limitations)
// Note: This requires signed requests which need backend implementation
// For now, we'll return a placeholder function
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  console.warn('Delete operation requires backend implementation for security');
  // In production, this should call your backend API to delete the image
  // Backend would handle the signed request to Cloudinary
};

export default {
  uploadToCloudinary,
  getOptimizedImageUrl,
  deleteFromCloudinary
};