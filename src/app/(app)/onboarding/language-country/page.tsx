/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomButton from '@/components/atoms/CustomButton';
import Tag from '@/components/atoms/Tag';
import HeaderWithSteps from '@/components/molecules/HeaderWithSteps';
import SelectableList from '@/components/molecules/SelectableList';
import TextField from '@/components/molecules/TextField';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ILanguageCountryDetails, languageCountrySchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Language() {
    const router = useRouter();
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('language');
    const {
        formState: { isValid, errors},
        setValue,
        handleSubmit,
    } = useForm<ILanguageCountryDetails>({
        resolver: zodResolver(languageCountrySchema),
        mode: "onChange",
        reValidateMode: "onChange",
        criteriaMode: "all"
    });
    const allLanguages = [
    {name: 'Afrikaans'},
    {name: 'Albanian'},
    {name: 'Arabic'},
    {name: 'Armenian'},
    {name: 'Azerbaijani'},
    {name: 'Basque'},
    {name: 'Bengali'},
    {name: 'Bulgarian'},
    {name: 'Catalan'},
    {name: 'Chinese'},
    {name: 'Croatian'},
    {name: 'Czech'},
    {name: 'Danish'},
    {name: 'Dutch'},
    {name: 'English'},
    {name: 'Estonian'},
    {name: 'Finnish'},
    {name: 'French'},
    {name: 'German'},
    {name: 'Greek'},
    {name: 'Hebrew'},
    {name: 'Hindi'},
    {name: 'Hungarian'},
    {name: 'Italian'},
    {name: 'Japanese'},
    {name: 'Korean'},
    {name: 'Latvian'},
    {name: 'Lithuanian'},
    {name: 'Norwegian'},
    {name: 'Polish'},
    {name: 'Portuguese'},
    {name: 'Romanian'},
    {name: 'Russian'},
    {name: 'Serbian'},
    {name: 'Slovak'},
    {name: 'Slovenian'},
    {name: 'Spanish'},
    {name: 'Swedish'},
    {name: 'Turkish'},
    {name: 'Ukrainian'},
    {name: 'Vietnamese'},
    {name: 'Kiswahili'},
    {name: 'Zulu'},
    {name: 'Xhosa'},
    {name: 'Amharic'},
    {name: 'Somali'},
    {name: 'Tigrinya'},
    {name: 'Yoruba'},
    {name: 'Igbo'},
    {name: 'Hausa'},
    {name: 'Farsi'},
    {name: 'Urdu'},
    {name: 'Malay'},
    {name: 'Indonesian'},
    {name: 'Tagalog'},
    {name: 'Burmese'},
    {name: 'Thai'},
    {name: 'Khmer'},
    {name: 'Lao'},
    {name: 'Punjabi'},
    {name: 'Gujarati'},
    {name: 'Marathi'},
    {name: 'Tamil'},
    {name: 'Telugu'},
    {name: 'Kannada'},
    {name: 'Malayalam'},
    {name: 'Sinhala'},
    {name: 'Nepali'},
    {name: 'Mongolian'},
    {name: 'Kazakh'},
    {name: 'Uzbek'},
    {name: 'Kyrgyz'},
    {name: 'Tajik'},
    {name: 'Turkmen'},
    {name: 'Georgian'},
    {name: 'Macedonian'},
    {name: 'Bosnian'},
    {name: 'Montenegrin'},
    {name: 'Breton'},
    {name: 'Cornish'},
    {name: 'Irish'},
    {name: 'Scottish Gaelic'},
    {name: 'Welsh'},
    {name: 'Manx'},
    {name: 'Sami'},
    {name: 'Kinyarwanda'},
    {name: 'Kirundi'},
    {name: 'Oromo'},
    {name: 'Akan'},
    {name: 'Twi'},
    {name: 'Ewe'},
    {name: 'Fante'},
    {name: 'Ga'},
    ];
    const allCountries = [
        {name: 'Afghanistan', icon: '🇦🇫'},
        {name: 'Canada', icon: '🇨🇦'},
        {name: 'United States', icon: '🇺🇸'},
        {name: 'Mexico', icon: '🇲🇽'},
        {name: 'United Kingdom', icon: '🇬🇧'},
        {name: 'Germany', icon: '🇩🇪'},
        {name: 'France', icon: '🇫🇷'},
        {name: 'Spain', icon: '🇪🇸'},
        {name: 'Italy', icon: '🇮🇹'},
        {name: 'Australia', icon: '🇦🇺'},
        {name: 'India', icon: '🇮🇳'},
        {name: 'China', icon: '🇨🇳'},
        {name: 'Japan', icon: '🇯🇵'},
        {name: 'South Korea', icon: '🇰🇷'},
        {name: 'Brazil', icon: '🇧🇷'},
        {name: 'Argentina', icon: '🇦🇷'},
        {name: 'South Africa', icon: '🇿🇦'},
        {name: 'Nigeria', icon: '🇳🇬'},
        {name: 'Egypt', icon: '🇪🇬'},
        {name: 'Russia', icon: '🇷🇺'},
        {name: 'Turkey', icon: '🇹🇷'},
        {name: 'Saudi Arabia', icon: '🇸🇦'}
        , {name: 'United Arab Emirates', icon: '🇦🇪'},
        {name: 'Indonesia', icon: '🇮🇩'},
        {name: 'Malaysia', icon: '🇲🇾'},
        {name: 'Philippines', icon: '🇵🇭'},
        {name: 'Thailand', icon: '🇹🇭'},
        {name: 'Vietnam', icon: '🇻🇳'},
        {name: 'Singapore', icon: '🇸🇬'},
        {name: 'New Zealand', icon: '🇳🇿'},
        {name: 'Ireland', icon: '🇮🇪'},
        {name: 'Netherlands', icon: '🇳🇱'},
        {name: 'Belgium', icon: '🇧🇪'},
        {name: 'Sweden', icon: '🇸🇪'},
        {name: 'Norway', icon: '🇳🇴'},
        {name: 'Denmark', icon: '🇩🇰'},
        {name: 'Finland', icon: '🇫🇮'},
        {name: 'Poland', icon: '🇵🇱'},
        {name: 'Czech Republic', icon: '🇨🇿'},
        {name: 'Hungary', icon: '🇭🇺'},
        {name: 'Greece', icon: '🇬🇷'},
        {name: 'Portugal', icon: '🇵🇹'},
        {name: 'Romania', icon: '🇷🇴'},
        {name: 'Bulgaria', icon: '🇧🇬'},
        {name: 'Croatia', icon: '🇭🇷'},
        {name: 'Slovakia', icon: '🇸🇰'},
        {name: 'Slovenia', icon: '🇸🇮'},
        {name: 'Austria', icon: '🇦🇹'},
        {name: 'Switzerland', icon: '🇨🇭'},
        {name: 'Iceland', icon: '🇮🇸'},
        {name: 'Luxembourg', icon: '🇱🇺'},
        {name: 'Malta', icon: '🇲🇹'},
        {name: 'Cyprus', icon: '🇨🇾'},
        {name: 'Estonia', icon: '🇪🇪'},
        {name: 'Latvia', icon: '🇱🇻'},
        {name: 'Lithuania', icon: '🇱🇹'},
        {name: 'Ukraine', icon: '🇺🇦'},
        {name: 'Belarus', icon: '🇧🇾'},
        {name: 'Kazakhstan', icon: '🇰🇿'},
        {name: 'Uzbekistan', icon: '🇺🇿'},
        {name: 'Kyrgyzstan', icon: '🇰🇬'},
        {name: 'Tajikistan', icon: '🇹🇯'},
        {name: 'Turkmenistan', icon: '🇹🇲'},
        {name: 'Azerbaijan', icon: '🇦🇿'},
        {name: 'Armenia', icon: '🇦🇲'},
        {name: 'Georgia', icon: '🇬🇪'},
        {name: 'Mongolia', icon: '🇲🇳'},
        {name: 'North Korea', icon: '🇰🇵'},
        {name: 'Taiwan', icon: '🇹🇼'},
        {name: 'Hong Kong', icon: '🇭🇰'},
        {name: 'Macau', icon: '🇲🇴'},
        {name: 'Brunei', icon: '🇧🇳'},
        {name: 'Cambodia', icon: '🇰🇭'},
        {name: 'Laos', icon: '🇱🇦'},
        {name: 'Myanmar (Burma)', icon: '🇲🇲'},
        {name: 'Sri Lanka', icon: '🇱🇰'},
        {name: 'Bangladesh', icon: '🇧🇩'},
        {name: 'Nepal', icon: '🇳🇵'},
        {name: 'Bhutan', icon: '🇧🇹'},
        {name: 'Maldives', icon: '🇲🇻'},
        {name: 'Rwanda', icon: '🇷🇼'},
        {name: 'Kenya', icon: '🇰🇪'},
        {name: 'Uganda', icon: '🇺🇬'},
        {name: 'Tanzania', icon: '🇹🇿'},
        {name: 'Zimbabwe', icon: '🇿🇼'},
        {name: 'Zambia', icon: '🇿🇲'},
        {name: 'Botswana', icon: '🇧🇼'},
        {name: 'Namibia', icon: '🇳🇦'},
        {name: 'Angola', icon: '🇦🇴'},
        {name: 'Mozambique', icon: '🇲🇿'},
        {name: 'Ghana', icon: '🇬🇭'},
        {name: 'Ivory Coast', icon: '🇨🇮'},
        {name: 'Senegal', icon: '🇸🇳'},
        {name: 'Mali', icon: '🇲🇱'},
        {name: 'Burkina Faso', icon: '🇧🇫'},
        {name: 'Niger', icon: '🇳🇪'},
        {name: 'Chad', icon: '🇹🇩'},
        {name: 'Cameroon', icon: '🇨🇲'},
        {name: 'Gabon', icon: '🇬🇦'},
        {name: 'Congo (Brazzaville)', icon: '🇨🇬'},
        {name: 'DRC', icon: '🇨🇩'},
        {name: 'Central African Republic', icon: '🇨🇫'},
        {name: 'Sao Tome and Principe', icon: '🇸🇹'},
        {name: 'Equatorial Guinea', icon: '🇬🇶'},
        {name: 'Sierra Leone', icon: '🇸🇱'},
        {name: 'Liberia', icon: '🇱🇷'},
        {name: 'Guinea', icon: '🇬🇳'},
        {name: 'Guinea-Bissau', icon: '🇬🇼'}, 
        {name: 'Cape Verde', icon: '🇨🇻'},
        {name: 'Togo', icon: '🇹🇬'},
        {name: 'Benin', icon: '🇧🇯'},
    ]

    const filteredLanguages = allLanguages.filter(language =>
        language.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCountries = allCountries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggle = (item: string) => {
        if (activeTab == 'language') {
            setSelectedLanguages(prev => 
            prev.includes(item) 
                ? prev.filter(lang => lang !== item)
                : [...prev, item]
            );
        }
        if (activeTab == 'countries') {
            setSelectedCountries(prev => 
            prev.includes(item) 
                ? prev.filter(country => country !== item)
                : [...prev, item]
            );
        }
    };

    const onSubmit: SubmitHandler<ILanguageCountryDetails> = (data) => {
        console.log('Selected languages:', data);
        router.push("/onboarding/take-a-photo");
    };

    const onSkip = () => {
        router.push("/onboarding/take-a-photo");
    };

    useEffect(() => {
        if (selectedLanguages.length > 0) {
            setValue('languages', selectedLanguages, { shouldValidate: true });
        }
    }, [selectedLanguages]);

    useEffect(() => {
        if (selectedCountries.length > 0) {
            setValue('countries', selectedCountries, { shouldValidate: true });
        }
    }, [selectedCountries]);
console.log(errors)

    return (
    <>
        <HeaderWithSteps
            onSkip={onSkip}
            action="Skip"
            activeIndicator={3}
        />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-14 p-8"
        >
            <div className="flex flex-col gap-7">
                <div className="text-2xl font-bold text-main-600 font-ariom">
                    {activeTab == 'language' ? 'Language' : 'Cultural Ties'}
                </div>
                {/* Search Bar */}
                <TextField
                    placeholder={activeTab == 'language' ? 'Search languages...' : 'Search countries...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border border-main-600 focus:border-primary focus:outline-none rounded-2xl px-4 h-14'
                    icon={<Search className='!w-6 !h-6 text-main-600' />}
                    suffix={searchQuery && <X className='!w-5 !h-5 text-main-600' />}
                    handleClear={() => setSearchQuery('')}
                />
                <div className="flex gap-3 flex-wrap max-h-24 overflow-y-auto">
                    {((activeTab == 'language' ? selectedLanguages : selectedCountries)).map((item) => (
                        <Tag
                        key={item}
                        label={item}
                        icon={activeTab == 'language' ? undefined : allCountries.find(country => country.name === item)?.icon}
                        className='border-2'
                        />
                    ))}
                </div>
                <Tabs defaultValue={activeTab} activationMode='manual'>
                    <TabsList className="flex items-center gap-6 shadow-none">
                        <TabsTrigger 
                        value="language" 
                        className={cn(
                            'w-fit text-sm font-bold font-ariom px-4 py-2.5 cursor-pointer flex-none rounded-2xl',
                            activeTab === 'language' ? 'text-background !bg-primary' : 'text-secondary-500'
                        )}
                        onClick={() => setActiveTab('language')}>
                            Language
                        </TabsTrigger>
                        <TabsTrigger 
                        value="countries" 
                        className={cn(
                            'w-fit text-sm font-bold font-ariom px-4 py-2.5 cursor-pointer flex-none rounded-2xl',
                            activeTab === 'countries' ? 'text-background !bg-primary' : 'text-secondary-500'
                        )}
                        onClick={() => setActiveTab('countries')}>
                            Countries
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="language" className='mt-10 h-80 overflow-y-auto'>
                        <SelectableList
                            item="language"
                            items={filteredLanguages}
                            selectedItems={selectedLanguages}
                            handleToggle={handleToggle}
                        />
                    </TabsContent>
                    <TabsContent value="countries" className='mt-10 h-80 overflow-y-auto'>
                        <SelectableList
                            item="country"
                            items={filteredCountries}
                            selectedItems={selectedCountries}
                            handleToggle={handleToggle}
                            />
                    </TabsContent>
                    {errors.languages && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.languages.message}
                        </div>
                    )}
                    {errors.countries && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.countries.message}
                        </div>
                    )}
                </Tabs>
            </div>
            <CustomButton
            type="submit"
            className="w-full rounded-2xl"
            state={isValid ? "default" : "disabled"}
            >
            Continue
            </CustomButton>
        </form>
    </>
    );
}
