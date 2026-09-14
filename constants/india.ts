// Comprehensive list of Indian States, Union Territories, and Major Cities

export interface IndianState {
  name: string;
  code: string;
  type: 'State' | 'Union Territory';
  cities: string[];
}

export const INDIAN_STATES_AND_UTS: IndianState[] = [
  {
    name: 'Maharashtra',
    code: 'MH',
    type: 'State',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad (Chhatrapati Sambhaji Nagar)', 'Solapur', 'Navi Mumbai', 'Amravati', 'Kolhapur', 'Nanded', 'Sangli', 'Jalgaon', 'Akola', 'Latur'],
  },
  {
    name: 'Delhi',
    code: 'DL',
    type: 'Union Territory',
    cities: ['New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Dwarka', 'Rohini', 'Saket', 'Connaught Place', 'Vasant Kunj'],
  },
  {
    name: 'Karnataka',
    code: 'KA',
    type: 'State',
    cities: ['Bengaluru (Bangalore)', 'Mysuru (Mysore)', 'Hubballi-Dharwad', 'Mangaluru (Mangalore)', 'Belagavi (Belgaum)', 'Davanagere', 'Ballari (Bellary)', 'Kalaburagi (Gulbarga)', 'Shivamogga', 'Tumakuru', 'Udupi'],
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    type: 'State',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli (Trichy)', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Kanchipuram'],
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    type: 'State',
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj (Allahabad)', 'Noida', 'Greater Noida', 'Ghaziabad', 'Meerut', 'Bareilly', 'Aligarh', 'Gorakhpur', 'Moradabad', 'Saharanpur', 'Jhansi', 'Ayodhya', 'Mathura'],
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    type: 'State',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Navsari', 'Morbi', 'Vapi', 'Bharuch'],
  },
  {
    name: 'West Bengal',
    code: 'WB',
    type: 'State',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Kharagpur', 'Haldia', 'Darjeeling'],
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    type: 'State',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar', 'Sikar', 'Bharatpur', 'Pali', 'Sri Ganganagar'],
  },
  {
    name: 'Telangana',
    code: 'TS',
    type: 'State',
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Siddipet'],
  },
  {
    name: 'Kerala',
    code: 'KL',
    type: 'State',
    cities: ['Thiruvananthapuram', 'Kochi (Cochin)', 'Kozhikode (Calicut)', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam', 'Malappuram'],
  },
  {
    name: 'Punjab',
    code: 'PB',
    type: 'State',
    cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Pathankot', 'Hoshiarpur', 'Batala', 'Moga'],
  },
  {
    name: 'Haryana',
    code: 'HR',
    type: 'State',
    cities: ['Gurugram (Gurgaon)', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    type: 'State',
    cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Singrauli', 'Katni'],
  },
  {
    name: 'Bihar',
    code: 'BR',
    type: 'State',
    cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger'],
  },
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    type: 'State',
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kakinada', 'Kadapa', 'Anantapur', 'Eluru'],
  },
  {
    name: 'Odisha',
    code: 'OR',
    type: 'State',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada'],
  },
  {
    name: 'Assam',
    code: 'AS',
    type: 'State',
    cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Karimganj'],
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    type: 'State',
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh'],
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    type: 'State',
    cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Durg', 'Jagdalpur', 'Ambikapur'],
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    type: 'State',
    cities: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Rishikesh', 'Kashipur', 'Nainital', 'Mussoorie'],
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    type: 'State',
    cities: ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Manali', 'Baddi', 'Bilaspur', 'Hamirpur'],
  },
  {
    name: 'Goa',
    code: 'GA',
    type: 'State',
    cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim'],
  },
  {
    name: 'Tripura',
    code: 'TR',
    type: 'State',
    cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia'],
  },
  {
    name: 'Manipur',
    code: 'MN',
    type: 'State',
    cities: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul'],
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    type: 'State',
    cities: ['Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Williamnagar'],
  },
  {
    name: 'Nagaland',
    code: 'NL',
    type: 'State',
    cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha'],
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    type: 'State',
    cities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib'],
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    type: 'State',
    cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro'],
  },
  {
    name: 'Sikkim',
    code: 'SK',
    type: 'State',
    cities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan', 'Ravangla'],
  },
  {
    name: 'Jammu and Kashmir',
    code: 'JK',
    type: 'Union Territory',
    cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua', 'Sopore'],
  },
  {
    name: 'Ladakh',
    code: 'LA',
    type: 'Union Territory',
    cities: ['Leh', 'Kargil', 'Diskit', 'Zanskar'],
  },
  {
    name: 'Chandigarh',
    code: 'CH',
    type: 'Union Territory',
    cities: ['Chandigarh'],
  },
  {
    name: 'Puducherry',
    code: 'PY',
    type: 'Union Territory',
    cities: ['Puducherry (Pondicherry)', 'Karaikal', 'Mahe', 'Yanam'],
  },
  {
    name: 'Andaman and Nicobar Islands',
    code: 'AN',
    type: 'Union Territory',
    cities: ['Port Blair', 'Diglipur', 'Mayabunder'],
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    code: 'DD',
    type: 'Union Territory',
    cities: ['Daman', 'Diu', 'Silvassa'],
  },
  {
    name: 'Lakshadweep',
    code: 'LD',
    type: 'Union Territory',
    cities: ['Kavaratti', 'Agatti', 'Andrott', 'Minicoy'],
  },
];

// Helper: Normalize Date of Birth (supports DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD) to ISO YYYY-MM-DD
export function normalizeDobToIso(dobStr: string): string | null {
  if (!dobStr) return null;
  const trimmed = dobStr.trim();

  // Pattern 1: DD-MM-YYYY or DD/MM/YYYY
  const ddmmyyyyMatch = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const month = parseInt(ddmmyyyyMatch[2], 10);
    const year = parseInt(ddmmyyyyMatch[3], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}`;
  }

  // Pattern 2: YYYY-MM-DD
  const yyyymmddMatch = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (yyyymmddMatch) {
    const year = parseInt(yyyymmddMatch[1], 10);
    const month = parseInt(yyyymmddMatch[2], 10);
    const day = parseInt(yyyymmddMatch[3], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}`;
  }

  return null;
}

// Helper: Validate Indian PIN Code (exactly 6 numeric digits, non-zero starting)
export function isValidIndianPinCode(pin: string): boolean {
  if (!pin) return false;
  return /^[1-9][0-9]{5}$/.test(pin.trim());
}

// Helper: Validate Indian PAN (Permanent Account Number: 5 uppercase letters, 4 digits, 1 uppercase letter)
export function isValidPanCard(pan: string): boolean {
  if (!pan) return false;
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim().toUpperCase());
}

// Helper: Validate Aadhaar (12 digits)
export function isValidAadhaar(aadhaar: string): boolean {
  if (!aadhaar) return false;
  const clean = aadhaar.replace(/\s+/g, '');
  return /^[2-9]{1}[0-9]{11}$/.test(clean);
}
