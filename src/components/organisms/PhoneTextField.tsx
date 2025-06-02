import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";
import TextField from "../molecules/TextField";
import IconButton from "../atoms/IconButton";

interface PhoneTextFieldProps extends Omit<ComponentProps<'input'>, 'children'> {
  onCountryCodeChange?: (code: string) => void;
  countryCode?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PhoneTextField = forwardRef<HTMLInputElement, PhoneTextFieldProps>(function PhoneTextField({
  onCountryCodeChange,
  countryCode = '84',
  disabled = false,
  error,
  className,
  ...props
}, ref) {
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const countryCodes = [
    { code: '84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '1', country: 'Canada', flag: '🇨🇦' },
    { code: '1', country: 'United States', flag: '🇺🇸' },
    { code: '44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '86', country: 'China', flag: '🇨🇳' },
    { code: '81', country: 'Japan', flag: '🇯🇵' },
    { code: '82', country: 'South Korea', flag: '🇰🇷' },
    { code: '65', country: 'Singapore', flag: '🇸🇬' },
    { code: '66', country: 'Thailand', flag: '🇹🇭' },
    { code: '60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '63', country: 'Philippines', flag: '🇵🇭' },
    { code: '91', country: 'India', flag: '🇮🇳' },
    { code: '61', country: 'Australia', flag: '🇦🇺' },
    { code: '49', country: 'Germany', flag: '🇩🇪' },
    { code: '33', country: 'France', flag: '🇫🇷' },
    { code: '39', country: 'Italy', flag: '🇮🇹' },
    { code: '34', country: 'Spain', flag: '🇪🇸' },
    { code: '7', country: 'Russia', flag: '🇷🇺' },
    { code: '55', country: 'Brazil', flag: '🇧🇷' },
    { code: '52', country: 'Mexico', flag: '🇲🇽' },
    { code: '41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '46', country: 'Sweden', flag: '🇸🇪' },
    { code: '47', country: 'Norway', flag: '🇳🇴' },
    { code: '45', country: 'Denmark', flag: '🇩🇰' },
    { code: '353', country: 'Ireland', flag: '🇮🇪' },
    { code: '351', country: 'Portugal', flag: '🇵🇹' },
    { code: '30', country: 'Greece', flag: '🇬🇷' },
    { code: '48', country: 'Poland', flag: '🇵🇱' },
    { code: '420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '36', country: 'Hungary', flag: '🇭🇺' },
    { code: '381', country: 'Serbia', flag: '🇷🇸' },
    { code: '250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '254', country: 'Kenya', flag: '🇰🇪' },
    { code: '256', country: 'Uganda', flag: '🇺🇬' },
    { code: '255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '233', country: 'Ghana', flag: '🇬🇭' },
    { code: '234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '212', country: 'Morocco', flag: '🇲🇦' },
    { code: '213', country: 'Algeria', flag: '🇩🇿' },
    { code: '216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '218', country: 'Libya', flag: '🇱🇾' },
    { code: '249', country: 'Sudan', flag: '🇸🇩' },
    { code: '963', country: 'Syria', flag: '🇸🇾' },
    { code: '964', country: 'Iraq', flag: '🇮🇶' },
    { code: '962', country: 'Jordan', flag: '🇯🇴' },
    { code: '965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '971', country: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '974', country: 'Qatar', flag: '🇶🇦' },
    { code: '968', country: "Oman's", flag:'🇴🇲' },
    { code: '973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '961', country: 'Lebanon', flag: '🇱🇧' },
    ];

    const filteredCountries = countryCodes.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm)
    );

    const handleCountrySelect = (code: string) => {
        setSelectedCountryCode(code);
        onCountryCodeChange?.(code);
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
            setSearchTerm('');
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            <div className={cn(
            "flex items-center border-b-2 pb-2 transition-colors font-syne",
            error ? "border-error" : "border-main-600 focus-within:border-primary",
            disabled && "opacity-50 cursor-not-allowed",
            className
            )}>
            {/* Country Code Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <IconButton
                onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
                disabled={disabled}
                variant="ghost"
                icon={
                    <>
                        <span className="font-syne font-bold text-base">(+{selectedCountryCode})</span>
                        {isDropdownOpen ? (
                            <ChevronDown className="!w-2.5 !h-2.5" />
                        ) : (
                            <ChevronUp className="!w-2.5 !h-2.5" />
                        )}
                    </>
                }
                />
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-main rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3">
                    <TextField
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        textClassName="w-full text-background text-sm shadow-none"
                    />
                    </div>
                    
                    {/* Country List */}
                    <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((country) => (
                        <button
                        key={country.country}
                        onClick={() => handleCountrySelect(country.code)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-main-700 transition-colors",
                            selectedCountryCode === country.code && "bg-primary-300 text-background"
                        )}
                        >
                            <span className="text-lg">{country.flag}</span>
                            <span className="flex-1 text-sm font-medium">{country.country}</span>
                            <span className="text-sm text-secondary-600">+{country.code}</span>
                        </button>
                    ))}
                    {filteredCountries.length === 0 && (
                        <div className="px-4 py-6 text-center text-secondary-600 text-sm">
                        No countries found
                        </div>
                    )}
                    </div>
                </div>
                )}
            </div>
            <TextField
                ref={ref}
                className="border-none"
                {...props}
            />
            </div>
            {error && (
                <div className="text-sm mt-1 transition-colors text-error">
                {error}
                </div>
            )}
        </div>
    );
});

export default PhoneTextField;
