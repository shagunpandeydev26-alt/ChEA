export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string; // ISO date string
  location: string;
  priority: number; // For ordering events (lower number = higher priority)
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string; // Admin user ID who created the event
}

export interface CreateEventData {
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  priority: number;
  isActive: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  imageFile?: File;
  imageUrl?: string;
  date: string;
  location: string;
  priority: number;
  isActive: boolean;
}

export interface EventFilter {
  isActive?: boolean;
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
}

// Event management action types for admin operations
export type EventAction = 'create' | 'update' | 'delete' | 'reorder';

// Event status for UI feedback
export type EventStatus = 'draft' | 'published' | 'archived';