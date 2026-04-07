'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from '../Button';
import { useAuth } from '../../context/AuthContext';
import { userList } from '../../lib/constants/seedData';
export function LoginModal({ isOpen, onClose }) {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    // QR Kod State'leri
    const [qrValue, setQrValue] = React.useState('');
    const [qrProgress, setQrProgress] = React.useState(100);
    // Modal açıldığında form verilerinin ve QR kodun yönetimi
    React.useEffect(() => {
        if (!isOpen) {
            setUsername('');
            setPassword('');
            setError('');
            return;
        }
        const generateQR = () => {
            // Gerçek senaryoda bu veri backend'den dönen ve JWT içeren tek kullanımlık bir token olur.
            setQrValue(`armoyu_mobile_auth_${Math.random().toString(36).substring(2, 15)}`);
            setQrProgress(100);
        };
        generateQR();
        const refreshInterval = setInterval(() => {
            generateQR();
        }, 20000); // Her 20 saniyede bir yenilenir
        const progressInterval = setInterval(() => {
            // 20 saniyelik süreci 100 parçaya bölerek her 100ms'de azaltır
            setQrProgress((prev) => Math.max(0, prev - (100 / (20000 / 100))));
        }, 100);
        return () => {
            clearInterval(refreshInterval);
            clearInterval(progressInterval);
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Simulate API delay
        setTimeout(() => {
            // Search for the user in our seeded userList
            const foundUser = userList.find((u) => u.username.toLowerCase() === username.toLowerCase());
            if (foundUser) {
                login(foundUser);
                setIsSubmitting(false);
                onClose();
            }
            else {
                setError('Kullanıcı bulunamadı! Lütfen listedeki geçerli bir kullanıcı adını deneyin.');
                setIsSubmitting(false);
            }
        }, 800);
    };
    const fillTestAccount = () => {
        setUsername('test');
        setPassword('123456');
        setError('');
    };
    return (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200", children: _jsxs("div", { className: "relative glass-panel bg-[#0a0a0e]/95 w-full max-w-4xl rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300", children: [_jsx("button", { onClick: onClose, className: "absolute top-6 right-6 z-20 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10 border border-white/5", title: "Kapat", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }), _jsxs("div", { className: "w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative z-10", children: [_jsx("h2", { className: "text-3xl font-black mb-2 text-white tracking-tight", children: "Giri\u015F Yap" }), _jsx("p", { className: "text-gray-400 text-sm mb-8", children: "Kald\u0131\u011F\u0131n yerden oynamaya devam et." }), _jsxs("div", { className: "mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center shadow-inner flex items-center justify-between gap-4", children: [_jsxs("p", { className: "text-xs text-blue-300 font-medium text-left", children: ["Test hesab\u0131 ile ", _jsx("br", {}), "aray\u00FCz\u00FC inceleyin."] }), _jsx("button", { type: "button", onClick: () => { setUsername('berkaytikenoglu'); setPassword('armo-v3'); }, className: "text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2 px-4 rounded-lg transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)] border border-blue-400/50 whitespace-nowrap", children: "Kurucu Bilgilerini Gir" })] }), _jsxs("form", { className: "space-y-4", onSubmit: handleLogin, children: [error && (_jsx("div", { className: "p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl text-center animate-in slide-in-from-top-2 duration-200", children: error })), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "Kullan\u0131c\u0131 Ad\u0131" }), _jsx("input", { required: true, type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "\u015Eifre" }), _jsx("input", { required: true, type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium tracking-widest", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { className: "flex justify-between items-center text-sm px-1 pt-1", children: [_jsxs("label", { className: "flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-gray-300", children: [_jsx("input", { type: "checkbox", className: "rounded bg-transparent border border-white/20 text-blue-500 focus:ring-blue-500 h-4 w-4" }), _jsx("span", { children: "Beni Hat\u0131rla" })] }), _jsx("a", { href: "#", className: "text-blue-400 hover:text-blue-300 transition-colors font-medium", children: "\u015Eifremi Unuttum" })] }), _jsx(Button, { variant: "primary", className: "w-full h-12 text-md mt-6 font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded-xl", isLoading: isSubmitting, children: "Hesab\u0131ma Giri\u015F Yap" }), _jsxs("p", { className: "text-center text-gray-500 text-sm mt-6 font-medium", children: ["Hen\u00FCz ARMOYU'da de\u011Fil misin? ", _jsx("a", { href: "#", className: "text-blue-400 hover:text-blue-300 ml-1", children: "Kay\u0131t Ol" })] })] })] }), _jsxs("div", { className: "w-full md:w-1/2 bg-gradient-to-br from-[#0c101c] to-[#160b24] p-8 lg:p-12 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/5 relative", children: [_jsxs("div", { className: "text-center space-y-4 mb-8 relative z-10 w-full", children: [_jsx("h3", { className: "text-2xl font-bold text-white tracking-tight", children: "Mobil Uygulama \u0130le Gir" }), _jsxs("p", { className: "text-gray-400 text-sm max-w-[260px] mx-auto leading-relaxed", children: ["ARMOYU uygulamas\u0131ndan ", _jsx("strong", { className: "text-white font-medium", children: "Ayarlar > QR Okut" }), " men\u00FCs\u00FCne girerek saniyeler i\u00E7inde ba\u011Flan\u0131n."] })] }), _jsx("div", { className: "relative p-3 bg-white/10 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/10", children: _jsx("div", { className: "bg-white p-4 rounded-2xl relative overflow-hidden group", children: _jsx("img", { src: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrValue}`, alt: "Login QR Code", className: "w-44 h-44 md:w-48 md:h-48 transition-all duration-300 group-hover:scale-105", style: { opacity: qrProgress > 95 ? 0.3 : 1 } }) }) }), _jsxs("div", { className: "mt-10 flex flex-col items-center w-full max-w-[220px]", children: [_jsx("div", { className: "w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner", children: _jsx("div", { className: "h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]", style: { width: `${qrProgress}%` } }) }), _jsxs("p", { className: "text-xs text-gray-400 mt-3 font-medium flex items-center gap-1.5", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: `${qrProgress < 15 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`, children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("polyline", { points: "12 6 12 12 16 14" })] }), _jsxs("span", { className: `${qrProgress < 15 ? 'text-red-400' : 'text-gray-400'}`, children: [Math.ceil((qrProgress / 100) * 20), " saniye i\u00E7inde yenilenecek"] })] })] })] })] }) }));
}
//# sourceMappingURL=LoginModal.js.map