// src/pages/Success.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Success() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const uid = localStorage.getItem('uid');

  useEffect(() => {
    if (!uid) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      const docRef = doc(db, 'users', uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserData(snapshot.data());
      }

      setLoading(false);
    };

    fetchUser();
  }, [uid, navigate]);

  const handleDelete = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('uid');
    navigate('/');
  };

  if (loading) return <p>載入中...</p>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>歡迎！註冊成功</h2>
      <p><strong>姓名：</strong>{userData?.name}</p>
      <p><strong>電話：</strong>{userData?.phone}</p>
      <p><strong>Email：</strong>{userData?.email}</p>
      <button onClick={handleDelete}>刪除帳號並登出</button>
    </div>
  );
}
