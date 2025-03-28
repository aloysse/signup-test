// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { email, password, name, phone } = form;
    if (!email || !password || !name || !phone) {
      setError('所有欄位皆為必填');
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const token = await userCred.user.getIdToken();

      await setDoc(doc(db, 'users', uid), {
        email,
        name,
        phone,
        createdAt: new Date(),
      });

      localStorage.setItem('authToken', token);
      localStorage.setItem('uid', uid);
      navigate('/success');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>註冊帳號</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" placeholder="密碼" type="password" value={form.password} onChange={handleChange} required /><br />
        <input name="name" placeholder="姓名" value={form.name} onChange={handleChange} required /><br />
        <input name="phone" placeholder="電話" value={form.phone} onChange={handleChange} required /><br />
        <button type="submit">註冊</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
