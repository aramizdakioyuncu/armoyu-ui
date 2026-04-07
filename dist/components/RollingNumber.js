'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function RollingNumber({ value, className = "" }) {
    const [digits, setDigits] = useState([]);
    useEffect(() => {
        setDigits(value.toString().split(''));
    }, [value]);
    return (_jsx("div", { className: `flex items-center overflow-hidden h-[1.2em] leading-[1.2em] ${className}`, children: digits.map((digit, idx) => (_jsx(Digit, { char: digit }, `${idx}-${digit}`))) }));
}
function Digit({ char }) {
    const isNumber = !isNaN(parseInt(char));
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        if (isNumber) {
            setOffset(parseInt(char) * 100);
        }
    }, [char, isNumber]);
    if (!isNumber) {
        return _jsx("span", { className: "inline-block transition-all duration-500", children: char });
    }
    return (_jsx("div", { className: "relative w-[0.6em] h-[1.2em] flex flex-col transition-transform duration-500 ease-out", style: { transform: `translateY(-${offset}%)` }, children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (_jsx("span", { className: "h-[1.2em] flex items-center justify-center shrink-0", children: n }, n))) }));
}
//# sourceMappingURL=RollingNumber.js.map