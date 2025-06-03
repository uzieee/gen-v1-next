import { cn, getCountryCodes } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";
import TextField from "../molecules/TextField";
import IconButton from "../atoms/IconButton";

interface ICountryCode {
    code: string;
    country: string;
    flag: string;
}

interface PhoneTextFieldProps extends Omit<ComponentProps<'input'>, 'children'> {
  onCountryCodeChange?: (code: ICountryCode) => void;
  countryCode?: ICountryCode;
  error?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PhoneTextField = forwardRef<HTMLInputElement, PhoneTextFieldProps>(function PhoneTextField({
  onCountryCodeChange,
  countryCode = {
    code: '1',
    country: 'Canada',
    flag: '🇨🇦'
  },
  disabled = false,
  error,
  className,
  ...props
}, ref) {
    const [selectedCountry, setSelectedCountry] = useState(countryCode);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCountries = getCountryCodes().filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm)
    );

    const handleCountrySelect = (value: ICountryCode) => {
        setSelectedCountry(value);
        onCountryCodeChange?.(value);
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
            "flex items-center border-b-2 pb-2 transition-colors",
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
                className="justify-between w-20 !p-0"
                icon={
                <>
                    <span className="font-ariom font-bold text-base">(+{selectedCountry.code})</span>
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
                        onClick={() => handleCountrySelect(country)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-main-700 transition-colors",
                            selectedCountry.country === country.country && "bg-primary-300 text-background"
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
                <div className="text-sm mt-1 transition-colors text-error font-ariom">
                {error}
                </div>
            )}
        </div>
    );
});

export default PhoneTextField;
