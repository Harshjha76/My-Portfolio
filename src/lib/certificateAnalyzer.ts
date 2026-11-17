export interface CertificateAnalysisResult {
  title: string;
  issuingOrganization: string;
  courseName?: string;
  issueDate: string;
  category: "Programming & Algorithms" | "Data Analytics & Internships" | "AI & Professional Development" | "Academic Credentials" | "Other";
  credentialId?: string;
  credentialUrl?: string;
  suggestedSkills: string[];
  description: string;
}

export function analyzeCertificateMetadata(
  filename: string,
  rawText?: string
): CertificateAnalysisResult {
  const lowerName = filename.toLowerCase();
  const lowerText = (rawText || "").toLowerCase();
  const combined = `${lowerName} ${lowerText}`;

  // 1. SJCEM / IT HUB Live C/C++ Course
  if (
    combined.includes("programming skills in c") ||
    combined.includes("c/c++") ||
    combined.includes("ithub") ||
    combined.includes("pl1064")
  ) {
    return {
      title: "Course Certificate in Programming Skills in C/C++",
      issuingOrganization: "St. John College of Engineering and Management (SJCEM) & IT HUB Live",
      courseName: "Programming Skills in C/C++",
      issueDate: "Dec 2025",
      category: "Programming & Algorithms",
      credentialId: "2025_26_PL1064",
      credentialUrl: "https://www.ithublive.com",
      suggestedSkills: ["C", "C++", "Object-Oriented Programming (OOP)", "Problem Solving", "Data Structures"],
      description: "Comprehensive coursework and laboratory evaluation in C and C++ programming with Grade A+ recognition under SJCEM and Aldel Education Trust.",
    };
  }

  // 2. InAmigos Foundation Internship
  if (
    combined.includes("inamigos") ||
    combined.includes("data analytics internship")
  ) {
    return {
      title: "Certificate of Data Analytics Internship",
      issuingOrganization: "InAmigos Foundation",
      courseName: "Data Analytics Internship",
      issueDate: "July 2026",
      category: "Data Analytics & Internships",
      credentialId: "U85300CT2020NPL010641",
      suggestedSkills: ["Data Analytics", "Google Sheets", "Dataset Research", "Data Organization"],
      description: "Completed remote data analytics internship compiling structured datasets on NGOs and non-profit organizations from public platforms.",
    };
  }

  // 3. Forage AI Job Simulation
  if (
    combined.includes("forage") ||
    combined.includes("resume writing with ai")
  ) {
    return {
      title: "Resume Writing with AI Support Job Simulation",
      issuingOrganization: "Forage Foundations",
      courseName: "Resume Writing with AI Support",
      issueDate: "April 2026",
      category: "AI & Professional Development",
      credentialId: "4zY4ZReRZSJbHaGqJ",
      credentialUrl: "https://www.theforage.com",
      suggestedSkills: ["AI Prompting", "ATS Analysis", "Technical Writing", "Career Strategy"],
      description: "Practical simulation on decoding job descriptions, prompt engineering for resume content, and identifying technical skill gaps.",
    };
  }

  // 4. Semester 1 Grade Card
  if (
    combined.includes("semester 1") ||
    combined.includes("semester i") ||
    combined.includes("25febs101")
  ) {
    return {
      title: "First Year B.Tech Semester I Grade Card",
      issuingOrganization: "St. John College of Engineering and Management (Mumbai University)",
      courseName: "B.Tech Artificial Intelligence and Machine Learning",
      issueDate: "Dec 2025",
      category: "Academic Credentials",
      credentialId: "PRN: MU0341120250241691",
      suggestedSkills: ["Engineering Mathematics", "Physics", "Mechanics", "C++ Basics"],
      description: "University grade card for Semester 1 scoring 9.15 SGPI across 20 credits with A+ / Outstanding grades.",
    };
  }

  // 5. Semester 2 Grade Card
  if (
    combined.includes("semester 2") ||
    combined.includes("semester ii") ||
    combined.includes("25febs201")
  ) {
    return {
      title: "First Year B.Tech Semester II Grade Card",
      issuingOrganization: "St. John College of Engineering and Management (Mumbai University)",
      courseName: "B.Tech Artificial Intelligence and Machine Learning",
      issueDate: "May 2026",
      category: "Academic Credentials",
      credentialId: "PRN: MU0341120250241691",
      suggestedSkills: ["Java", "Object-Oriented Programming", "Mathematics II", "Basic Electrical Engineering"],
      description: "University grade card for Semester 2 scoring 9.25 SGPI across 20 credits with Outstanding grades in Java and Mathematics.",
    };
  }

  // 6. Generic Smart Fallback
  const detectedSkills: string[] = [];
  if (combined.includes("python")) detectedSkills.push("Python");
  if (combined.includes("java")) detectedSkills.push("Java");
  if (combined.includes("sql") || combined.includes("mysql")) detectedSkills.push("MySQL");
  if (combined.includes("ai") || combined.includes("machine learning")) detectedSkills.push("Machine Learning");
  if (combined.includes("analytics")) detectedSkills.push("Data Analytics");
  if (combined.includes("react")) detectedSkills.push("React");

  return {
    title: filename.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, ""),
    issuingOrganization: "Verified Educational Institution / Platform",
    issueDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    category: detectedSkills.length > 0 ? "Programming & Algorithms" : "Other",
    suggestedSkills: detectedSkills,
    description: "Certificate credential successfully uploaded to portfolio repository.",
  };
}
