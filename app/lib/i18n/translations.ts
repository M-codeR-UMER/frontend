export type Language = "en" | "ur";

export type Translations = {
  common: {
    portal: string;
    appName: string;
    appNameShort: string;
  };
  marketing: {
    eyebrow: string;
    heading: string[];
    description: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  login: {
    heading: string;
    description: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    forgot: string;
    show: string;
    hide: string;
    login: string;
    newAccount: string;
    register: string;
    patientQuestion: string;
    patientLogin: string;
    reminder: string;
    demo: string;
  };
  signup: {
    heading: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    passwordHint: string;
    terms: string;
    submit: string;
    submitting: string;
    existing: string;
    login: string;
    show: string;
    hide: string;
    success: string;
    successHint: string;
    goToLogin: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    common: {
      portal: "Doctor portal",
      appName: "Asaandoc",
      appNameShort: "Asaandoc",
    },
    marketing: {
      eyebrow: "Care made simple",
      heading: [
        "Your patients.",
        "Your practice.",
        "One connected platform.",
      ],
      description:
        "Asaandoc helps doctors and patients across Pakistan take the next step toward better care.",
      benefits: [
        {
          title: "Appointments, organized",
          description: "Manage your consultations and daily schedule.",
        },
        {
          title: "Stay connected",
          description: "Help patients connect with your practice.",
        },
        {
          title: "Your practice, simplified",
          description: "Spend less time coordinating and more time caring.",
        },
      ],
    },
    login: {
      heading: "Welcome back, Doctor",
      description: "Sign in to manage appointments and stay connected with your patients.",
      email: "Email address",
      emailPlaceholder: "doctor@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      forgot: "Forgot password?",
      show: "Show password",
      hide: "Hide password",
      login: "Sign in as Doctor",
      newAccount: "Don't have an account?",
      register: "Register as a doctor",
      patientQuestion: "Looking for a doctor?",
      patientLogin: "Continue to Patient Login",
      reminder: "Using a shared device? Sign out when you finish.",
      demo: "Authentication is not connected yet. No login request has been sent.",
    },
    signup: {
      heading: "Create your account",
      description: "Start your Asaandoc journey with your account and contact details.",
      name: "Full name",
      namePlaceholder: "Dr. Ayesha Khan",
      email: "Email address",
      emailPlaceholder: "doctor@example.com",
      phone: "Mobile number",
      phonePlaceholder: "+92 300 1234567",
      password: "Password",
      passwordPlaceholder: "Create a password",
      passwordHint: "At least 8 characters; maximum 72 UTF-8 bytes.",
      terms: "I have read and accept the Asaandoc terms and conditions.",
      submit: "Create doctor account",
      submitting: "Creating account...",
      existing: "Already have an account?",
      login: "Sign in",
      show: "Show password",
      hide: "Hide password",
      success: "Your account has been created.",
      successHint: "Doctor sign-in is not connected yet.",
      goToLogin: "Go to doctor login",
    },
  },
  ur: {
    common: {
      portal: "ڈاکٹر پورٹل",
      appName: "آسان ڈاک",
      appNameShort: "آسان ڈاک",
    },
    marketing: {
      eyebrow: "صحت کا آسان راستہ",
      heading: [
        "آپ کے مریض۔",
        "آپ کی پریکٹس۔",
        "سب ایک ہی پلیٹ فارم پر۔",
      ],
      description:
        "آسان ڈاک پاکستان بھر میں ڈاکٹروں اور مریضوں کو بہتر صحت کی جانب قدم بڑھانے میں مدد دیتا ہے۔",
      benefits: [
        {
          title: "اپائنٹمنٹس کا آسان انتظام",
          description: "اپنی مشاورت اور روزانہ کے شیڈول کا انتظام کریں۔",
        },
        {
          title: "مریضوں سے رابطے میں رہیں",
          description: "مریضوں کے لیے آپ سے رابطہ کرنا آسان بنائیں۔",
        },
        {
          title: "پریکٹس کا انتظام، اب آسان",
          description: "انتظامی کاموں پر کم اور مریضوں کی دیکھ بھال پر زیادہ وقت دیں۔",
        },
      ],
    },
    login: {
      heading: "ڈاکٹر صاحب، خوش آمدید",
      description: "اپنی اپائنٹمنٹس کا انتظام کرنے اور مریضوں سے رابطے میں رہنے کے لیے لاگ اِن کریں۔",
      email: "ای میل",
      emailPlaceholder: "doctor@example.com",
      password: "پاس ورڈ",
      passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
      forgot: "پاس ورڈ بھول گئے؟",
      show: "پاس ورڈ دکھائیں",
      hide: "پاس ورڈ چھپائیں",
      login: "بطور ڈاکٹر لاگ اِن کریں",
      newAccount: "ابھی اکاؤنٹ نہیں ہے؟",
      register: "بطور ڈاکٹر رجسٹر ہوں",
      patientQuestion: "ڈاکٹر تلاش کرنا چاہتے ہیں؟",
      patientLogin: "مریض کے طور پر لاگ اِن کریں",
      reminder: "مشترکہ ڈیوائس پر کام مکمل ہونے کے بعد لاگ آؤٹ ضرور کریں۔",
      demo: "لاگ اِن کی سہولت ابھی منسلک نہیں ہے۔ کوئی درخواست نہیں بھیجی گئی۔",
    },
    signup: {
      heading: "اپنا اکاؤنٹ بنائیں",
      description: "اپنے اکاؤنٹ اور رابطے کی تفصیلات کے ساتھ آسان ڈاک پر آغاز کریں۔",
      name: "پورا نام",
      namePlaceholder: "ڈاکٹر عائشہ خان",
      email: "ای میل",
      emailPlaceholder: "doctor@example.com",
      phone: "موبائل نمبر",
      phonePlaceholder: "+92 300 1234567",
      password: "پاس ورڈ",
      passwordPlaceholder: "پاس ورڈ بنائیں",
      passwordHint: "کم از کم 8 حروف؛ زیادہ سے زیادہ 72 UTF-8 بائٹس۔",
      terms: "میں نے آسان ڈاک کی شرائط پڑھ لی ہیں اور انہیں قبول کرتا/کرتی ہوں۔",
      submit: "ڈاکٹر اکاؤنٹ بنائیں",
      submitting: "اکاؤنٹ بنایا جا رہا ہے...",
      existing: "پہلے سے اکاؤنٹ ہے؟",
      login: "لاگ اِن کریں",
      show: "پاس ورڈ دکھائیں",
      hide: "پاس ورڈ چھپائیں",
      success: "آپ کا اکاؤنٹ بن گیا ہے۔",
      successHint: "ڈاکٹر لاگ اِن ابھی منسلک نہیں ہے۔",
      goToLogin: "ڈاکٹر لاگ اِن پر جائیں",
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}

export function t<K extends keyof Translations>(language: Language, namespace: K): Translations[K] {
  return translations[language][namespace];
}