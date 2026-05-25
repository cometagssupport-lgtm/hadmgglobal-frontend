import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Language {
  private platformId = inject(PLATFORM_ID);

  private allLanguages = [
    { label: "عربي", code: "sa" },
    { label: "čeština", code: "cz" },
    { label: "English", code: "gb" },
    { label: "Français", code: "fr" },
    { label: "Deutsch", code: "de" },
    { label: "magyar", code: "hu" },
    { label: "Indonesian", code: "id" },
    { label: "Italiano", code: "it" },
    { label: "فارسی", code: "ir" },
    { label: "Polski", code: "pl" },
    { label: "Português", code: "br" },
    { label: "Русский", code: "ru" },
    { label: "Slovák", code: "sk" },
    { label: "Español", code: "es" },
    { label: "Türkçe", code: "tr" },
    { label: "o'zbek", code: "uz" },
    { label: "Tiếng Việt", code: "vn" }
  ];

  // private rtlLanguages = ['Arabic - عربي', 'Persian - فارسی'];
  private rtlLanguages = ['sa', 'ir'];

  private translations: Record<string, Record<string, string>> = {
    "English": {
      // "Cancel": "Cancel",
      "Email": "Email",
      "Password": "Password",
      "Log In": "Log In",
      "Welcome": "Welcome",
      "Country": "Country",
      "Mobile": "Mobile",
      "to Mission Town": "to Mission Town",
      "Remember me": "Remember me",
      "Forgot password": "Forgot password?",
      "Don't have an account": "Don't have an account?",
      "Sign Up": "Sign Up",
      "Password is required": "Password is required",
      "Password must be at least 6 characters": "Password must be at least 6 characters",
      "Email is required": "Email is required",
      "Create your account": "Create your account",
      "Name": "Name",
      "Login Password": "Login Password",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Confirm E-PIN",
      "in Mission Tower-B": "in Mission Tower-B",
      "I agree to all": "I agree to all",
      "Terms & Conditions": "Terms & Conditions",
      "Create Account": "Create Account",
      "Already have an account?": "Already have an account?",
      "Change password": "Change password",
      "Create a new password. Ensure it differs from previous ones for security.": "Create a new password. Ensure it differs from previous ones for security.",
      "New password": "New password",
      "Enter your new password": "Enter your new password",
      "Confirm New password": "Confirm New password",
      "Passwords do not match.": "Passwords do not match.",
      "Update password": "Update password",
      "Please enter a valid email": "Please enter a valid email",
      "Send Email": "Send Email",
      "Verified successfully": "Verified successfully",
      "Your Email has been successfully verified. Tap Continue to log in to your account.": "Your Email has been successfully verified. Tap Continue to log in to your account.",
      "Continue": "Continue",
      "Open your Gmail and Kindly verify your registered Gmail address to complete your account creation by tapping the create account button": "Open your Gmail and Kindly verify your registered Gmail address to complete your account creation by tapping the create account button",
      "Resend email": "Resend email",
      "Pass Code": "Pass Code",
      "Confirm Pass Code": "Confirm Pass Code",
      "Referral Code": "Referral Code",
      "Referral Code is required": "Referral Code is required",
      "I hereby agree to all": "I hereby agree to all",
      "of TowerBNB": "of TowerBNB",
      "Deposit": "Deposit",
      "Withdrawal": "Withdrawal",
      "History": "History",
      "Group": "Group",
      "Main Wallet": "Main Wallet",
      "Withdrawal Account": "Withdrawal Account",
      "SHARE YOUR LINK": "SHARE YOUR LINK",
      "Earn up to 21% profit bonus when your friends sign up": "Earn up to 21% profit bonus when your friends sign up",
      "TowerBNB Core Concept": "TowerBNB Core Concept",
      "At TowerBNB, the Circulation Yield Protocol (CYP) redefines how digital assets generate value. Built on an IDV-based Circulation strategy model, it offers a highly stable and quantitative trading design. It allows users to earn consistent returns from digital assets, all while eliminating manual monitoring, trading risks, and market volatility through automated and smart-driven interaction methods.": "At TowerBNB, the Circulation Yield Protocol (CYP) redefines how digital assets generate value. Built on an IDV-based Circulation strategy model, it offers a highly stable and quantitative trading design. It allows users to earn consistent returns from digital assets, all while eliminating manual monitoring, trading risks, and market volatility through automated and smart-driven interaction methods.",
      "The TowerBNB Circulation Strategy is operated based on the Ethereum Network and uses Tower’s circular product—Compound-Connected Loop Yield Technology for optimized circulation strategy rewards. Tower’s Circular strategy helps the technology interact with algorithms that automatically maximize returns, allowing participants to earn predictable income from digital assets. The model focuses on high-yield accumulation based on capital-flow efficiency, ensuring maximum potential for both new and existing investors.": "The TowerBNB Circulation Strategy is operated based on the Ethereum Network and uses Tower’s circular product—Compound-Connected Loop Yield Technology for optimized circulation strategy rewards. Tower’s Circular strategy helps the technology interact with algorithms that automatically maximize returns, allowing participants to earn predictable income from digital assets. The model focuses on high-yield accumulation based on capital-flow efficiency, ensuring maximum potential for both new and existing investors.",
      "Join our Telegram channel to stay updated": "Join our Telegram channel to stay updated",
      "Get the latest updates insights!": "Get the latest updates insights!",
      "We’re here to help": "We’re here to help",
      "Support": "Support",
      "• Sign-up and explore the Free Trial and earn 8 USDT fund.": "• Sign-up and explore the Free Trial and earn 8 USDT fund.",
      "• Join the group and contact your Manager or Customer Support to receive a 2 USDT joining bonus.": "• Join the group and contact your Manager or Customer Support to receive a 2 USDT joining bonus.",
      "• Claim a total of 10 USDT and use the funds to circulate Tower Upgrade or withdraw upon upgrading to Core 1G Tower Computing.": "• Claim a total of 10 USDT and use the funds to circulate Tower Upgrade or withdraw upon upgrading to Core 1G Tower Computing.",
      "• $2 bonus when activating your account with $50.": "• $2 bonus when activating your account with $50.",
      "Create deposit": "Create deposit",
      "Congratulations": "Congratulations",
      "You are about to start deposit process. The process is fully automated and usually takes about 20 minutes. Make sure to send exact total amount, including fees.": "You are about to start deposit process. The process is fully automated and usually takes about 20 minutes. Make sure to send exact total amount, including fees.",
      "Enter amount": "Enter amount",
      "USDT Recharge": "USDT Recharge",
      "Confirm": "Confirm",
      "Cancel": "Cancel",
      "Deposit Successful!": "Deposit Successful!",
      "Your payment has been submitted. You can track it anytime in your transaction history.": "Your payment has been submitted. You can track it anytime in your transaction history.",
      "USDT BEP20 Deposit Instructions": "USDT BEP20 Deposit Instructions",
      "Please read these instructions carefully before making a deposit:": "Please read these instructions carefully before making a deposit:",
      "Network Requirement:": "Network Requirement:",
      "Only deposit": "Only deposit",
      "USDT (BEP-20)": "USDT (BEP-20)",
      "on the Binance Smart Chain. Deposits from any other network may result in permanent asset loss.": "on the Binance Smart Chain. Deposits from any other network may result in permanent asset loss.",
      "Minimum Deposit:": "Minimum Deposit:",
      "50 USDT. Deposits below 50 USDT are not auto-credited — contact support for manual help.": "50 USDT. Deposits below 50 USDT are not auto-credited — contact support for manual help.",
      "Quick Deposit Options:": "Quick Deposit Options:",
      "You may use preset amounts like 50, 100, 150, 200, 250, 300 USDT or enter your own.": "You may use preset amounts like 50, 100, 150, 200, 250, 300 USDT or enter your own.",
      "Confirmation Time:": "Confirmation Time:",
      "Your account will be credited after the network confirms your transfer.": "Your account will be credited after the network confirms your transfer.",
      "Unsupported Deposits:": "Unsupported Deposits:",
      "Do NOT send NFTs": "Do NOT send NFTs",
      "Smart contract deposits are NOT supported": "Smart contract deposits are NOT supported",
      "(ERC20 / Arbitrum / Optimism etc.)": "(ERC20 / Arbitrum / Optimism etc.)",
      "Important:": "Important:",
      "Always use": "Always use",
      "USDT-BEP20": "USDT-BEP20",
      "and deposit at least": "and deposit at least",
      "50 USDT": "50 USDT",
      "to avoid loss.": "to avoid loss.",
      "Experience smooth and secure deposits designed for effortless funding.": "Experience smooth and secure deposits designed for effortless funding.",
      "Amount for payment": "Amount for payment",
      "Your deposit address for payment": "Your deposit address for payment",
      "Only use this address for the network you selected. Sending assets to other networks may prevent them from being recovered.": "Only use this address for the network you selected. Sending assets to other networks may prevent them from being recovered.",
      "WITHDRAWAL ACCOUNT": "WITHDRAWAL ACCOUNT",
      "USDT–BEP20 wallet address": "USDT–BEP20 wallet address",
      "Enter Your USDT–BEP20 wallet address": "Enter Your USDT–BEP20 wallet address",
      "Enter Pass Code": "Enter Pass Code",
      "Warm reminder": "Warm reminder",
      "The minimum withdrawal amount is 20 USDT.": "The minimum withdrawal amount is 20 USDT.",
      "The withdrawal fee for all Pioneer's level users is fixed at 8%.": "The withdrawal fee for all Pioneer's level users is fixed at 8%.",
      "The withdrawal process is subject to multi-node, confirmation and audit, and the estimated arrival time is 24 to 72 hours.": "The withdrawal process is subject to multi-node, confirmation and audit, and the estimated arrival time is 24 to 72 hours.",
      "Each withdrawal is subject to review, and the next withdrawal can only be performed after the previous withdrawal is completed.": "Each withdrawal is subject to review, and the next withdrawal can only be performed after the previous withdrawal is completed.",
      "You can get one free withdrawal fee every 21 days, and the number of free withdrawals cannot be accumulated.": "You can get one free withdrawal fee every 21 days, and the number of free withdrawals cannot be accumulated.",
      "Security Hold:": "Security Hold:",
      "After changing login password, transaction password, or wallet address, wait 24 hours to request a withdrawal.": "After changing login password, transaction password, or wallet address, wait 24 hours to request a withdrawal.",
      "Transaction history": "Transaction history",
      "Track your recent spends, transfers, and deposits in one place.": "Track your recent spends, transfers, and deposits in one place.",
      "PAYOUT WITHDRAW": "PAYOUT WITHDRAW",
      "Admin Internal Background": "Admin Internal Background",
      "Circulation Quantitative Trading Earn": "Circulation Quantitative Trading Earn",
      "Credit": "Credit",
      "Reward": "Reward",
      "Smart Filters": "Smart Filters",
      "Commission History": "Commission History",
      "Circulation Points": "Circulation Points",
      "Wallet Summary Details": "Wallet Summary Details",
      "Today's Personal commission": "Today's Personal commission",
      "Team daily commission": "Team daily commission",
      "Grand Total commission": "Grand Total commission",
      "Your Flexible Deposit": "Your Flexible Deposit",
      "Your Total withdrawals": "Your Total withdrawals",
      "Other settings": "Other settings",
      "Help & support": "Help & support",
      "Log out": "Log out",
      "Log out!": "Log out!",
      "Are you sure?": "Are you sure?",
      "You will now be logged out of your current account": "You will now be logged out of your current account",
      "Yes, log out": "Yes, log out",
      "No, Cancel": "No, Cancel",
      "Members list": "Members list",
      "Search members": "Search members",
      "REGISTRATION DATE": "REGISTRATION DATE",
      "LEVEL INVITE COUNT": "LEVEL INVITE COUNT",
      "Hello": "Hello",
      "An overview of your team’s recent performance.": "An overview of your team’s recent performance.",
      "Team overview": "Team overview",
      "Total Number of Downlines": "Total Number of Downlines",
      "Total Team commission": "Total Team commission",
      "Total amount of the team recharge": "Total amount of the team recharge",
      "The team's total withdrawals": "The team's total withdrawals",
      "TOTAL VALID MEMBERS:": "TOTAL VALID MEMBERS:",
      "First Generation Data": "First Generation Data",
      "Second Generation Data": "Second Generation Data",
      "Third Generation Data": "Third Generation Data",
      "Terms and conditions": "Terms and conditions",
      "Earn more, level up": "Earn more, level up",
      "Unlock your Tower Strategy Level, circulate your digital assets, and generate sustainable returns with smart circulation": "Unlock your Tower Strategy Level, circulate your digital assets, and generate sustainable returns with smart circulation",
      "Tower BNB - Free Trial": "Tower BNB - Free Trial",
      "Earn 8 USDT": "Earn 8 USDT",
      "CIRCULATION VALIDITY: 1 DAY": "CIRCULATION VALIDITY: 1 DAY",
      "Unlock Now": "Unlock Now",
      "Activated": "Activated",
      "Core 1G Tower Computing": "Core 1G Tower Computing",
      "Status: Pending Activation": "Status: Pending Activation",
      "CIRCULATION VALIDITY: 120 DAYS": "CIRCULATION VALIDITY: 120 DAYS",
      "DEP : 60-500 USDT": "DEP : 60-500 USDT",
      "Earn: 1.6% per day": "Earn: 1.6% per day",
      "Purchase Now": "Purchase Now",
      "Core 2G Tower Computing": "Core 2G Tower Computing",
      "DEP : 501-900 USDT": "DEP : 501-900 USDT",
      "Earn: 1.9% per day": "Earn: 1.9% per day",
      "Core 3G Tower Computing": "Core 3G Tower Computing",
      "DEP : 901-1500 USDT": "DEP : 901-1500 USDT",
      "Earn: 2.3% per day": "Earn: 2.3% per day",
      "Core 4G Tower Computing": "Core 4G Tower Computing",
      "CIRCULATION VALIDITY 120 DAYS": "CIRCULATION VALIDITY 120 DAYS",
      "DEP : 1501-3500 USDT": "DEP : 1501-3500 USDT",
      "Open on 2026 First Quarter (Q1)": "Open on 2026 First Quarter (Q1)",
      "Status: Core Activated": "Status: Core Activated",
      "Active Now": "Active Now",
      "Update Now": "Update Now",
      "Congratulations!": "Congratulations!",
      "Successful Purchase!": "Successful Purchase!",
      "Your Core Tower Computing has been unlocked.": "Your Core Tower Computing has been unlocked.",
      "Start your daily trading strategy and watch your earnings level up with every order.": "Start your daily trading strategy and watch your earnings level up with every order.",
      "You’re On a Roll!": "You’re On a Roll!",
      "Core computing started successful": "Core computing started successful",
      "Your Core Circulation Strategy Computing Trading activity is now in progress.": "Your Core Circulation Strategy Computing Trading activity is now in progress.",
      "You’ve earned": "You’ve earned",
      "points so far.": "points so far.",
      "HOURS": "HOURS",
      "MINUTES": "MINUTES",
      "SECONDS": "SECONDS",
      "You can start your next Circulation Trading session after the Tower cooldown period.": "You can start your next Circulation Trading session after the Tower cooldown period.",
      "This agreement was last updated on": "This agreement was last updated on",
      "TowerBNB Service Agreement: A Summary": "TowerBNB Service Agreement: A Summary",
      "Key Provisions of the Agreement": "Key Provisions of the Agreement",
      "User Eligibility and Registration (Article 2):": "User Eligibility and Registration (Article 2):",
      "Service Offerings (Article 3):": "Service Offerings (Article 3):",
      "Account Security and Management (Article 4):": "Account Security and Management (Article 4):",
      "Deposit and Withdrawal Rules (Article 5):": "Deposit and Withdrawal Rules (Article 5):",
      "Profit Distribution and Disclaimer (Articles 6 & 8):": "Profit Distribution and Disclaimer (Articles 6 & 8):",
      "Prohibited Conduct (Article 7):": "Prohibited Conduct (Article 7):",
      "Intellectual Property and Agreement Updates (Articles 9 & 10):": "Intellectual Property and Agreement Updates (Articles 9 & 10):",
      "Conclusion": "Conclusion",
      "Enter your valid Gmail address to receive the verification link to create an account": "Enter your valid Gmail address to receive the verification link to create an account",
      "This document outlines the Service Agreement for the use of products and services provided by": "This document outlines the Service Agreement for the use of products and services provided by",
      "TowerBNB Technologies Inc.": "TowerBNB Technologies Inc.",
      " (referred to as ": " (referred to as ",
      " or \"the Platform\"). By registering or using the Platform, you agree to be bound by all the terms herein. If you do not agree, you must not use the Platform’s services.": " or \"the Platform\"). By registering or using the Platform, you agree to be bound by all the terms herein. If you do not agree, you must not use the Platform’s services.",
      "You must be at least 18 years old and possess the full legal capacity to enter into this agreement.": "You must be at least 18 years old and possess the full legal capacity to enter into this agreement.",
      "All registration information must be true, accurate, complete, and kept up-to-date.": "All registration information must be true, accurate, complete, and kept up-to-date.",
      "You are prohibited from using the Platform for any illegal activities or those that infringe upon the rights of others.": "You are prohibited from using the Platform for any illegal activities or those that infringe upon the rights of others.",
      "TowerBNB provides registered users with services including:": "TowerBNB provides registered users with services including:",
      "Digital asset management, staking functions, and fund circulation (e.g., USDT).": "Digital asset management, staking functions, and fund circulation (e.g., USDT).",
      "A smartphone Tower mining system (running a computing power package to generate income).": "A smartphone Tower mining system (running a computing power package to generate income).",
      "Team incentive plans (fission income and node ecological incentives).": "Team incentive plans (fission income and node ecological incentives).",
      "Digital asset exchange and withdrawal services.": "Digital asset exchange and withdrawal services.",
      "TowerBNB reserves the right to adjust the services offered at its discretion.": "TowerBNB reserves the right to adjust the services offered at its discretion.",
      "You are solely responsible for the safekeeping of your account, password, transaction password, and other key information. Any asset loss resulting from your negligence is your responsibility.": "You are solely responsible for the safekeeping of your account, password, transaction password, and other key information. Any asset loss resulting from your negligence is your responsibility.",
      "Accounts may not be transferred, rented, loaned, or authorized for use by others.": "Accounts may not be transferred, rented, loaned, or authorized for use by others.",
      "You must immediately notify TowerBNB of any abnormal activity, password leaks, or unauthorized use.": "You must immediately notify TowerBNB of any abnormal activity, password leaks, or unauthorized use.",
      "The Platform reserves the right to freeze or restrict accounts for security purposes.": "The Platform reserves the right to freeze or restrict accounts for security purposes.",
      "You must ensure the correct currency, mainnet type, and address for all deposits, as incorrect operations may result in asset loss for which you are responsible.": "You must ensure the correct currency, mainnet type, and address for all deposits, as incorrect operations may result in asset loss for which you are responsible.",
      "Withdrawals require a fund or payment password and must comply with the Platform's limits and fee structures.": "Withdrawals require a fund or payment password and must comply with the Platform's limits and fee structures.",
      "The Platform may delay processing withdrawals or deposits due to technical maintenance, compliance requirements, or security reviews.": "The Platform may delay processing withdrawals or deposits due to technical maintenance, compliance requirements, or security reviews.",
      "Income is distributed in USDT tokens.": "Income is distributed in USDT tokens.",
      "TowerBNB does not promise any fixed income.": "TowerBNB does not promise any fixed income.",
      "All earnings depend on actual mining operations, market fluctuations, and platform development.": "All earnings depend on actual mining operations, market fluctuations, and platform development.",
      "The Platform is a technical service provider and does not guarantee user investment decisions or returns.": "The Platform is a technical service provider and does not guarantee user investment decisions or returns.",
      "Users assume sole responsibility for risks associated with participating in digital asset activities.": "Users assume sole responsibility for risks associated with participating in digital asset activities.",
      "TowerBNB is not liable for losses caused by force majeure (natural disasters, hacker attacks, blockchain failures), but will attempt to assist in recovery.": "TowerBNB is not liable for losses caused by force majeure (natural disasters, hacker attacks, blockchain failures), but will attempt to assist in recovery.",
      "Users are strictly forbidden from:": "Users are strictly forbidden from:",
      "Exploiting vulnerabilities or using scripts to illegally profit.": "Exploiting vulnerabilities or using scripts to illegally profit.",
      "Engaging in illegal financial activities such as money laundering, fraud, or pyramid schemes.": "Engaging in illegal financial activities such as money laundering, fraud, or pyramid schemes.",
      "Maliciously attacking the system or tampering with data.": "Maliciously attacking the system or tampering with data.",
      "Publishing false information or damaging the Platform's reputation.": "Publishing false information or damaging the Platform's reputation.",
      "TowerBNB has the right to suspend or terminate services and pursue legal action against users who engage in these behaviors.": "TowerBNB has the right to suspend or terminate services and pursue legal action against users who engage in these behaviors.",
      "All Platform content (trademarks, codes, etc.) is protected by law and cannot be used without authorization.": "All Platform content (trademarks, codes, etc.) is protected by law and cannot be used without authorization.",
      "TowerBNB reserves the right to update this Agreement at any time. Continued use of the Platform after an update constitutes acceptance of the revised terms.": "TowerBNB reserves the right to update this Agreement at any time. Continued use of the Platform after an update constitutes acceptance of the revised terms.",
      "TowerBNB Technologies Inc. holds the final right of interpretation of this Agreement.": "TowerBNB Technologies Inc. holds the final right of interpretation of this Agreement.",
      "TowerBNB aims to be user-centric, ensuring asset security and promoting access to intelligent computing power. By choosing TowerBNB, you agree to these terms as you embark on a journey of smart mining and asset growth.": "TowerBNB aims to be user-centric, ensuring asset security and promoting access to intelligent computing power. By choosing TowerBNB, you agree to these terms as you embark on a journey of smart mining and asset growth."

    },
    "عربي": {
      "Registration": "التسجيل",
      "Authenticate to continue": "قم بالمصادقة للمتابعة",
      "Comet AGS": "كوميت AGS",

      "Username": "اسم المستخدم",
      "Enter your Username": "أدخل اسم المستخدم",
      "Username is required": "اسم المستخدم مطلوب",

      "Enter your Email ID": "أدخل بريدك الإلكتروني",

      "Enter your Password": "أدخل كلمة المرور",

      "Confirm Login Password": "تأكيد كلمة المرور",
      "Re-enter your Password": "أعد إدخال كلمة المرور",
      "Confirm Password is required": "تأكيد كلمة المرور مطلوب",

      "Affiliate Key": "رمز الإحالة",
      "Enter Affiliate Key": "أدخل رمز الإحالة",

      "Passwords do not match": "كلمات المرور غير متطابقة",

      "By continuing, you acknowledge and agree to the":
        "بالمتابعة، فإنك تقر وتوافق على",

      "Terms of Service and Privacy Policy.":
        "شروط الخدمة وسياسة الخصوصية.",

      "Register an Account": "تسجيل حساب",

      "Log in": "تسجيل الدخول"
    },
    "čeština": {
      "Registration": "Registrace",
      "Authenticate to continue": "Ověřte se pro pokračování",
      "Comet AGS": "Comet AGS",

      "Username": "Uživatelské jméno",
      "Enter your Username": "Zadejte uživatelské jméno",
      "Username is required": "Uživatelské jméno je povinné",

      "Enter your Email ID": "Zadejte svůj e-mail",

      "Enter your Password": "Zadejte heslo",

      "Confirm Login Password": "Potvrďte heslo",
      "Re-enter your Password": "Zadejte heslo znovu",
      "Confirm Password is required": "Potvrzení hesla je povinné",

      "Affiliate Key": "Partnerský klíč",
      "Enter Affiliate Key": "Zadejte partnerský klíč",

      "Passwords do not match": "Hesla se neshodují",

      "By continuing, you acknowledge and agree to the":
        "Pokračováním potvrzujete a souhlasíte s",

      "Terms of Service and Privacy Policy.":
        "Podmínkami služby a zásadami ochrany osobních údajů.",

      "Register an Account": "Registrovat účet",

      "Log in": "Přihlásit se"
    },
    "Français": {
      "Registration": "Inscription",
      "Authenticate to continue": "Authentifiez-vous pour continuer",
      "Comet AGS": "Comet AGS",

      "Username": "Nom d'utilisateur",
      "Enter your Username": "Entrez votre nom d'utilisateur",
      "Username is required": "Le nom d'utilisateur est requis",

      "Enter your Email ID": "Entrez votre adresse e-mail",

      "Enter your Password": "Entrez votre mot de passe",

      "Confirm Login Password": "Confirmez le mot de passe",
      "Re-enter your Password": "Saisissez à nouveau votre mot de passe",
      "Confirm Password is required": "La confirmation du mot de passe est requise",

      "Affiliate Key": "Clé d'affiliation",
      "Enter Affiliate Key": "Entrez la clé d'affiliation",

      "Passwords do not match": "Les mots de passe ne correspondent pas",

      "By continuing, you acknowledge and agree to the":
        "En continuant, vous reconnaissez et acceptez les",

      "Terms of Service and Privacy Policy.":
        "Conditions d'utilisation et politique de confidentialité.",

      "Register an Account": "Créer un compte",

      "Log in": "Se connecter"
    }, "German - Deutsch": {
      "Registration": "Registrierung",
      "Authenticate to continue": "Authentifizieren Sie sich, um fortzufahren",
      "Comet AGS": "Comet AGS",

      "Username": "Benutzername",
      "Enter your Username": "Benutzernamen eingeben",
      "Username is required": "Benutzername ist erforderlich",

      "Enter your Email ID": "E-Mail-Adresse eingeben",

      "Enter your Password": "Passwort eingeben",

      "Confirm Login Password": "Passwort bestätigen",
      "Re-enter your Password": "Passwort erneut eingeben",
      "Confirm Password is required": "Passwortbestätigung erforderlich",

      "Affiliate Key": "Affiliate-Schlüssel",
      "Enter Affiliate Key": "Affiliate-Schlüssel eingeben",

      "Passwords do not match": "Passwörter stimmen nicht überein",

      "By continuing, you acknowledge and agree to the":
        "Durch die Fortsetzung erkennen Sie die",

      "Terms of Service and Privacy Policy.":
        "Nutzungsbedingungen und Datenschutzrichtlinie an.",

      "Register an Account": "Konto registrieren",

      "Log in": "Anmelden"
    }, "Hungarian - magyar": {
      "Registration": "Regisztráció",
      "Authenticate to continue": "Hitelesítsen a folytatáshoz",
      "Comet AGS": "Comet AGS",

      "Username": "Felhasználónév",
      "Enter your Username": "Adja meg a felhasználónevet",
      "Username is required": "A felhasználónév kötelező",

      "Enter your Email ID": "Adja meg az e-mail címét",

      "Enter your Password": "Adja meg a jelszót",

      "Confirm Login Password": "Jelszó megerősítése",
      "Re-enter your Password": "Írja be újra a jelszót",
      "Confirm Password is required": "A jelszó megerősítése kötelező",

      "Affiliate Key": "Partnerkulcs",
      "Enter Affiliate Key": "Adja meg a partnerkulcsot",

      "Passwords do not match": "A jelszavak nem egyeznek",

      "By continuing, you acknowledge and agree to the":
        "A folytatással elfogadja a",

      "Terms of Service and Privacy Policy.":
        "Szolgáltatási feltételeket és az adatvédelmi szabályzatot.",

      "Register an Account": "Fiók regisztrálása",

      "Log in": "Bejelentkezés"
    }, "Indonesian": {
      "Registration": "Pendaftaran",
      "Authenticate to continue": "Autentikasi untuk melanjutkan",
      "Comet AGS": "Comet AGS",

      "Username": "Nama Pengguna",
      "Enter your Username": "Masukkan nama pengguna",
      "Username is required": "Nama pengguna wajib diisi",

      "Enter your Email ID": "Masukkan email Anda",

      "Enter your Password": "Masukkan kata sandi",

      "Confirm Login Password": "Konfirmasi kata sandi",
      "Re-enter your Password": "Masukkan ulang kata sandi",
      "Confirm Password is required": "Konfirmasi kata sandi wajib diisi",

      "Affiliate Key": "Kunci Afiliasi",
      "Enter Affiliate Key": "Masukkan kunci afiliasi",

      "Passwords do not match": "Kata sandi tidak cocok",

      "By continuing, you acknowledge and agree to the":
        "Dengan melanjutkan, Anda menyetujui",

      "Terms of Service and Privacy Policy.":
        "Ketentuan Layanan dan Kebijakan Privasi.",

      "Register an Account": "Daftar Akun",

      "Log in": "Masuk"
    }, "Italian - Italiano": {
      "Registration": "Registrazione",
      "Authenticate to continue": "Autenticati per continuare",
      "Comet AGS": "Comet AGS",

      "Username": "Nome utente",
      "Enter your Username": "Inserisci il nome utente",
      "Username is required": "Il nome utente è obbligatorio",

      "Enter your Email ID": "Inserisci la tua email",

      "Enter your Password": "Inserisci la password",

      "Confirm Login Password": "Conferma password",
      "Re-enter your Password": "Reinserisci la password",
      "Confirm Password is required": "La conferma della password è obbligatoria",

      "Affiliate Key": "Chiave affiliato",
      "Enter Affiliate Key": "Inserisci la chiave affiliato",

      "Passwords do not match": "Le password non corrispondono",

      "By continuing, you acknowledge and agree to the":
        "Continuando, riconosci e accetti i",

      "Terms of Service and Privacy Policy.":
        "Termini di servizio e Informativa sulla privacy.",

      "Register an Account": "Registra un account",

      "Log in": "Accedi"
    },
  };

  private currentLang = signal<string>('English');
  private currentDirection = signal<'ltr' | 'rtl'>('ltr');


  constructor() {
    const savedLang = this.safeGetLocalStorage('app_lang');
    const savedDir = this.safeGetLocalStorage('app_dir');

    if (savedLang && this.allLanguages.some(l => l.label === savedLang)) {
      this.currentLang.set(savedLang);
    }

    if (savedDir === 'rtl' || savedDir === 'ltr') {
      this.currentDirection.set(savedDir as 'rtl' | 'ltr');
    } else {
      this.setDirectionByLanguage(this.currentLang());
    }

    this.applyDirection(this.currentDirection());

  }

  get languages() {
    return this.allLanguages;
  }

  get currentLanguage() {
    return this.currentLang;
  }

  // get currentLanguage() {
  //   return this.currentLang();
  // }

  get direction() {
    return this.currentDirection();
  }

  setLanguage(lang: any) {

    const selectedLang =
      typeof lang === 'string' ? lang : lang.label;

    this.currentLang.set(selectedLang);

    this.setDirectionByLanguage(selectedLang);

    this.safeSetLocalStorage('app_lang', selectedLang);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir =
        this.isRTL(selectedLang) ? 'rtl' : 'ltr';
    }
  }

  isRTL(lang: any) {
    const code = typeof lang === 'string' ? this.allLanguages.find(l => l.label === lang)?.code : lang?.code;
    return code ? this.rtlLanguages.includes(code) : false;
  }

  private setDirectionByLanguage(lang: any) {
    const isRTL = this.isRTL(lang);
    const dir = isRTL ? 'rtl' : 'ltr';
    this.currentDirection.set(dir);
    this.safeSetLocalStorage('app_dir', dir);
    this.applyDirection(dir);
  }

  private applyDirection(dir: 'ltr' | 'rtl') {
    if (isPlatformBrowser(this.platformId)) {
      const htmlTag = document.documentElement;
      htmlTag.setAttribute('dir', dir);
      htmlTag.setAttribute('lang', this.currentLang());
      document.body.style.direction = dir;
    }
  }

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang]?.[key] ?? key;
  }

  private safeGetLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  }

  private safeSetLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch {
        console.warn('Unable to access localStorage');
      }
    }
  }
}