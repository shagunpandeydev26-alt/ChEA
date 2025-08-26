import { db } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

// Simple Firebase connection test
export const runFirebaseTest = async () => {
  console.log('🔥 [FirebaseTest] Starting Firebase connection test...');
  
  try {
    console.log('📱 [FirebaseTest] Testing Firestore connection...');
    
    // Try to read from events collection
    const eventsRef = collection(db, 'events');
    const testQuery = query(eventsRef, limit(1));
    
    console.log('🔍 [FirebaseTest] Executing test query...');
    const snapshot = await getDocs(testQuery);
    
    console.log('✅ [FirebaseTest] Success! Query executed successfully');
    console.log('📊 [FirebaseTest] Documents found:', snapshot.size);
    
    if (snapshot.size > 0) {
      snapshot.forEach((doc) => {
        console.log('📄 [FirebaseTest] Sample document:', {
          id: doc.id,
          data: doc.data()
        });
      });
    } else {
      console.log('📭 [FirebaseTest] No documents found (collection might be empty)');
    }
    
    return { success: true, message: 'Firebase connection successful!' };
  } catch (error) {
    console.error('❌ [FirebaseTest] Firebase test failed:', error);
    console.error('🔍 [FirebaseTest] Error details:', {
      code: error.code,
      message: error.message,
      name: error.name
    });
    
    let errorMessage = 'Unknown error';
    
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied - Check Firestore rules';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Firebase service unavailable';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Network connection error';
    } else {
      errorMessage = error.message || 'Unknown Firebase error';
    }
    
    return { success: false, message: errorMessage, error };
  }
};

// Add to window for easy testing in browser console
if (typeof window !== 'undefined') {
  (window as any).testFirebase = runFirebaseTest;
  console.log('🧪 [FirebaseTest] Test function available as window.testFirebase()');
}