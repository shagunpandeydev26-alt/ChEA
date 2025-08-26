import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  limit,
  writeBatch,
  Timestamp,
  connectFirestoreEmulator
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Event, CreateEventData, UpdateEventData, EventFilter } from '../types/event';

const EVENTS_COLLECTION = 'events';

// Test Firebase connection
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('📞 [EventService] Testing Firebase connection...');
    
    // Try to read from a simple collection
    const testQuery = query(collection(db, EVENTS_COLLECTION), limit(1));
    const snapshot = await getDocs(testQuery);
    
    console.log('✅ [EventService] Firebase connection successful!');
    return true;
  } catch (error) {
    console.error('❌ [EventService] Firebase connection failed:', error);
    console.error('❌ [EventService] Error details:', {
      code: error.code,
      message: error.message,
      name: error.name
    });
    return false;
  }
};

// Create a new event
export const createEvent = async (eventData: CreateEventData, createdBy: string): Promise<string> => {
  try {
    console.log('📁 [EventService] Creating event with data:', eventData);
    console.log('👤 [EventService] Created by user:', createdBy);
    
    const now = new Date().toISOString();
    const newEvent = {
      ...eventData,
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    console.log('💾 [EventService] Final event object to save:', newEvent);
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), newEvent);
    console.log('✅ [EventService] Event created successfully with ID:', docRef.id);
    
    // Verify the event was saved
    const savedEvent = await getDoc(docRef);
    if (savedEvent.exists()) {
      console.log('✅ [EventService] Event verified in Firebase:', savedEvent.data());
    } else {
      console.error('❌ [EventService] Event not found after creation!');
    }
    
    return docRef.id;
  } catch (error) {
    console.error('❌ [EventService] Error creating event:', error);
    console.error('❌ [EventService] Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw new Error(`Failed to create event: ${error.message}`);
  }
};

// Get all events with optional filtering and ordering
export const getEvents = async (filter?: EventFilter): Promise<Event[]> => {
  try {
    console.log('🔍 [EventService] Getting events with filter:', filter);
    
    // Test connection first
    const isConnected = await testFirebaseConnection();
    if (!isConnected) {
      throw new Error('Firebase connection failed');
    }
    
    // Simple query with only priority ordering to avoid compound index
    let q = query(collection(db, EVENTS_COLLECTION), orderBy('priority', 'asc'));
    console.log('🔍 [EventService] Applied priority ordering only (avoiding compound index)');

    const snapshot = await getDocs(q);
    console.log('📊 [EventService] Firebase query returned', snapshot.size, 'documents');
    
    const events: Event[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const event = {
        id: doc.id,
        ...data
      } as Event;
      events.push(event);
      console.log('📄 [EventService] Processed event:', event.title, 'ID:', event.id);
    });

    // Apply all filters on client side to avoid compound index requirements
    let filteredEvents = events;
    
    if (filter?.isActive !== undefined) {
      filteredEvents = filteredEvents.filter(event => event.isActive === filter.isActive);
      console.log('🔍 [EventService] Client-side isActive filter applied:', filteredEvents.length, 'events');
    }
    
    if (filter?.dateFrom) {
      filteredEvents = filteredEvents.filter(event => event.date >= filter.dateFrom!);
      console.log('🔍 [EventService] Client-side dateFrom filter applied:', filteredEvents.length, 'events');
    }
    
    if (filter?.dateTo) {
      filteredEvents = filteredEvents.filter(event => event.date <= filter.dateTo!);
      console.log('🔍 [EventService] Client-side dateTo filter applied:', filteredEvents.length, 'events');
    }

    // Sort by date on client side
    filteredEvents.sort((a, b) => {
      // First sort by priority (ascending)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Then by date (descending) for same priority
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    console.log('🗒 [EventService] Final sorted events count:', filteredEvents.length);

    // Apply search filter on client side
    if (filter?.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      const searchResults = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
      );
      console.log('🔍 [EventService] Search filter applied, found:', searchResults.length, 'events');
      return searchResults;
    }

    return filteredEvents;
  } catch (error) {
    console.error('❌ [EventService] Error getting events:', error);
    console.error('❌ [EventService] Error details:', {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // Provide more specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Firebase permission denied. Please check Firestore rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase service is currently unavailable. Please try again later.');
    } else if (error.message.includes('network')) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }
};

// Get a single event by ID
export const getEvent = async (eventId: string): Promise<Event | null> => {
  try {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Event;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting event:', error);
    throw new Error('Failed to fetch event');
  }
};

// Update an event
export const updateEvent = async (eventData: UpdateEventData): Promise<void> => {
  try {
    const { id, ...updateData } = eventData;
    const docRef = doc(db, EVENTS_COLLECTION, id);
    
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    console.log('Event updated successfully');
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
};

// Delete an event
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    await deleteDoc(docRef);
    console.log('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
};

// Bulk update event priorities (for reordering)
export const updateEventPriorities = async (eventUpdates: Array<{ id: string; priority: number }>): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const now = new Date().toISOString();

    eventUpdates.forEach(({ id, priority }) => {
      const eventRef = doc(db, EVENTS_COLLECTION, id);
      batch.update(eventRef, { 
        priority,
        updatedAt: now
      });
    });

    await batch.commit();
    console.log('Event priorities updated successfully');
  } catch (error) {
    console.error('Error updating event priorities:', error);
    throw new Error('Failed to update event priorities');
  }
};

// Get active events only (for public display)
export const getActiveEvents = async (): Promise<Event[]> => {
  console.log('🔍 [EventService] Getting active events (client-side filtering)...');
  
  try {
    // Get all events first (no compound index needed)
    let q = query(collection(db, EVENTS_COLLECTION), orderBy('priority', 'asc'));
    
    console.log('🔍 [EventService] Executing simple priority query...');
    const snapshot = await getDocs(q);
    console.log('📊 [EventService] Firebase query returned', snapshot.size, 'documents');
    
    const allEvents: Event[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const event = {
        id: doc.id,
        ...data
      } as Event;
      allEvents.push(event);
    });
    
    // Filter active events on client side
    const activeEvents = allEvents.filter(event => event.isActive === true);
    console.log('🔍 [EventService] Filtered to active events:', activeEvents.length, 'out of', allEvents.length);
    
    // Sort by date on client side
    activeEvents.sort((a, b) => {
      // First sort by priority (ascending)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Then by date (descending) for same priority
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    console.log('🗒 [EventService] Final sorted active events:', activeEvents.length);
    return activeEvents;
  } catch (error) {
    console.error('❌ [EventService] Error getting active events:', error);
    throw new Error(`Failed to fetch active events: ${error.message}`);
  }
};

// Get upcoming events (active events with future dates)
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  return getEvents({ 
    isActive: true, 
    dateFrom: today 
  });
};

// Toggle event active status
export const toggleEventStatus = async (eventId: string, isActive: boolean): Promise<void> => {
  try {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    await updateDoc(docRef, {
      isActive,
      updatedAt: new Date().toISOString()
    });
    console.log(`Event ${isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    console.error('Error toggling event status:', error);
    throw new Error('Failed to toggle event status');
  }
};