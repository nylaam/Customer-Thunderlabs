import React, {useState} from "react";
import loginImg from '../assets/background.jpg'
import companyLogo from '../assets/companylogo.png';

export default function Login(){
    const [phoneNumber, setPhoneNumber] = useState("+62");

    const handlePhoneNumberChange = (e) => {
        const inputNumber = e.target.value;
        const sanitizedInput = inputNumber.replace(/\D/g, ""); // agar nilai yg diinputkan hanya bisa berbentuk
        
        if (sanitizedInput.startsWith("62")) {
            setPhoneNumber(`+${sanitizedInput}`);
        } else {
            setPhoneNumber(`+62${sanitizedInput}`);
        }
    };

    return(
        <div className="relative w-full h-screen bg-yellow-400/85">
            <img className="absolute w-full h-full object-cover mix-blend-overlay" style={{ opacity: '0.6' }} src={loginImg} alt="/" />
            <div className="flex flex-col justify-center items-center h-full">
                <img src={companyLogo} alt="Company Logo" className="h-12 mt-8 mb-4" />
                <form className="max-w-[750px] w-full mx-auto bg-yellow-400 p-8 border border-gray-300 rounded-xl mt-10">
                    <div className="flex flex-col mb-6 relative">
                        <label htmlFor="phone" className="text-gray-950 font-semibold text-lg mb-3">Masukkan nomor telepon anda</label>
                        <input
                            id="phone"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="bg-white text-gray-800 p-3 pl- focus:outline-none focus:border-gray-700 rounded-md relative"
                            type="tel"
                            style={{ fontSize: '1.1rem' }}
                        />
                    </div>
                    <button className="w-full py-4 mt-8 bg-black hover:bg-yellow-500 rounded-full relative text-white font-bold">Masuk</button>
                </form>
            </div>
        </div>
    )
}