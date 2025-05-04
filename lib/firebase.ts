import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

// Bike Management
export const bikeService = {
  // Add or update a bike
  async saveBike(bikeData: any) {
    const bikeRef = doc(db, 'bikes', bikeData.id);
    await setDoc(bikeRef, bikeData, { merge: true });
    return bikeData;
  },

  // Delete a bike
  async deleteBike(bikeId: string) {
    const bikeRef = doc(db, 'bikes', bikeId);
    await deleteDoc(bikeRef);
  },

  // Subscribe to bike changes
  subscribeToBikes(callback: (bikes: any[]) => void) {
    return onSnapshot(collection(db, 'bikes'), snapshot => {
      const bikes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(bikes);
    });
  },

  // Upload bike image
  async uploadBikeImage(file: File, bikeId: string) {
    const storageRef = ref(storage, `bikes/${bikeId}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },
};

// Testimonial Management
export const testimonialService = {
  // Add or update a testimonial
  async saveTestimonial(testimonialData: any) {
    const testimonialRef = doc(db, 'testimonials', testimonialData.id);
    await setDoc(testimonialRef, testimonialData, { merge: true });
    return testimonialData;
  },

  // Delete a testimonial
  async deleteTestimonial(testimonialId: string) {
    const testimonialRef = doc(db, 'testimonials', testimonialId);
    await deleteDoc(testimonialRef);
  },

  // Subscribe to testimonial changes
  subscribeToTestimonials(callback: (testimonials: any[]) => void) {
    return onSnapshot(collection(db, 'testimonials'), snapshot => {
      const testimonials = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(testimonials);
    });
  },
};

// Service Center Management
export const serviceCenterService = {
  // Add or update a service center
  async saveServiceCenter(centerData: any) {
    const centerRef = doc(db, 'service-centers', centerData.id);
    await setDoc(centerRef, centerData, { merge: true });
    return centerData;
  },

  // Delete a service center
  async deleteServiceCenter(centerId: string) {
    const centerRef = doc(db, 'service-centers', centerId);
    await deleteDoc(centerRef);
  },

  // Subscribe to service center changes
  subscribeToServiceCenters(callback: (centers: any[]) => void) {
    return onSnapshot(collection(db, 'service-centers'), snapshot => {
      const centers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(centers);
    });
  },
};
