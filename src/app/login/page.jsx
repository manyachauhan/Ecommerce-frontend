'use client'; 
import React, { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image'; 
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const [csrfToken, setCsrfToken] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/login/csrf/', {
          credentials: 'include',
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include', // Required for cookies to be sent
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login({ email }); // Store email as user info
        console.log('Login successful:', data);
        router.push("/");
        // redirect or update UI here
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed: ' + errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
//     <div className="min-h-screen bg-gray-100 flex">

//       <div className="flex-[0.6] relative min-h-screen"> 

//   <Image
//     src="/elogin.jpg"  // path relative to public folder
//     alt="Login illustration"
//     fill  // fills the parent div
//     style={{ objectFit: 'cover' }}
//     priority={true} // for faster loading
//   />
// </div>


   
//       <div className="flex-[0.4] bg-white p-12 flex flex-col justify-center min-h-screen"> 

//         <div className="w-full max-w-sm mx-auto">
     
//           <div className="flex items-center mb-8">
//             <div className="w-10 h-10 bg-orange-700 rounded-lg flex items-center justify-center mr-3">
//               <span className="text-white font-bold text-lg">S</span>
//             </div>
//             <span className="text-2xl font-bold text-gray-800">StyleNest

// </span>
//           </div>

//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-gray-500 mb-8">Please login to your account</p>

        
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder-gray-400"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 text-black  placeholder-gray-400"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <div className="text-right">
//               <button className="text-sm text-gray-500 hover:text-orange-700">
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               onClick={handleLogin}
//               className="w-full bg-orange-700 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition duration-200"
//             >
//               Login
//             </button>
//           </div>

         
   
//           <p className="text-center text-gray-500 mt-8">
//             Don't have an account?{' '}
//             <button className="text-orange-500 hover:text-orange-600 font-medium"
         
//             onClick={()=>router.push("/signup")}
//             >
//               Signup
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>

<div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
  {/* Left Side Image */}
  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:flex-[0.6] lg:min-h-screen">
    <Image
      src="/elogin.jpg"
      alt="Login illustration"
      fill
      priority
      sizes="(min-width:1280px) 60vw, (min-width:1024px) 100vw, 100vw"
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
  </div>

  {/* Right Side Form */}
  <div className="flex-[0.4] bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center 
                  py-12 lg:min-h-screen lg:py-0">
    <div className="w-full max-w-md mx-auto">
      {/* Logo + Title */}
      <div className="flex items-center mb-8 justify-center lg:justify-start">
        <div className="w-10 h-10 bg-orange-700 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">StyleNest</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center lg:text-left">
        Welcome Back
      </h2>
      <p className="text-gray-500 mb-8 text-center lg:text-left">
        Please login to your account
      </p>

      {/* Form */}
      <div className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 
                       focus:border-transparent text-black placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 
                         focus:border-transparent pr-12 text-black placeholder-gray-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-500 hover:text-orange-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button className="text-sm text-gray-500 hover:text-orange-700">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-700 text-white py-3 rounded-lg 
                     font-medium hover:bg-orange-600 transition duration-200"
        >
          Login
        </button>
      </div>

      {/* Signup link */}
      <p className="text-center text-gray-500 mt-8">
        Don&apos;t have an account?{" "}
        <button
          className="text-orange-500 hover:text-orange-600 font-medium"
          onClick={() => router.push("/signup")}
        >
          Signup
        </button>
      </p>
    </div>
  </div>
</div>



  );
}
