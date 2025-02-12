import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const mapCarData = (doc: QueryDocumentSnapshot<DocumentData>) => ({
  model: doc.data().model || '',
  year: doc.data().year || 0,
  price: doc.data().price || 0,
  desc: doc.data().desc || '',
  brief: doc.data().brief || '',
  likes: doc.data().likes || 0,
  seller: doc.data().seller || {
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  },
  mileage: doc.data().mileage || 0,
  image: doc.data().image || '',
  id: doc.id,
});
