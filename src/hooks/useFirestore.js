import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

export function useCollection(collectionName, options = {}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db || !isFirebaseConfigured) {
      setLoading(false);
      setDocuments([]);
      return;
    }

    let q = collection(db, collectionName);
    const constraints = [];

    if (options.where) {
      options.where.forEach((w) => {
        constraints.push(where(w.field, w.op, w.value));
      });
    }

    if (options.orderBy) {
      constraints.push(orderBy(options.orderBy, options.orderDir || 'asc'));
    }

    if (options.limit) {
      constraints.push(limit(options.limit));
    }

    q = query(q, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setDocuments(results);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn(`Firestore [${collectionName}]:`, err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(options)]);

  return { documents, loading, error };
}

export function useDocument(collectionName, docId) {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId || !db || !isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, docId),
      (snapshot) => {
        if (snapshot.exists()) {
          setDocument({ id: snapshot.id, ...snapshot.data() });
        } else {
          setDocument(null);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Firestore error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, loading, error };
}

export async function addDocument(collectionName, data) {
  if (!db) throw new Error('Firebase not configured');
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return docRef;
}

export async function updateDocument(collectionName, docId, data) {
  if (!db) throw new Error('Firebase not configured');
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteDocument(collectionName, docId) {
  if (!db) throw new Error('Firebase not configured');
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export async function getDocumentById(collectionName, docId) {
  if (!db) return null;
  const docRef = doc(db, collectionName, docId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}
