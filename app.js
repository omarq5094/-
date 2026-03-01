// ============================================================
// Coffee Recipe Calculator — Auth Version
// Supports user accounts, recipe saving, and Google Sheets integration
// ============================================================

// ── Configuration ────────────────────────────────────────────
const CONFIG = {
  defaultCupSizeMl: 240,
  waterDensity: 1,
  googleSheetWebAppUrl: "https://script.google.com/macros/s/AKfycbwqX952xaL9h4zC-KYKMb0pigLzcn_hSvLnCpgXY4gjL6KMhRPmrwcoSXcYqBf83ToI/exec", // سيتم ملؤه من قبل المستخدم
};

// ── Brewing Methods Data ─────────────────────────────────────
const BREWING_METHODS = {
  v60: {
    id: "v60",
    nameAr: "V60",
    nameEn: "V60 Pour Over",
    ratio: 15,
    brewTimeMin: 3,
    brewTimeMax: 4,
    grindSize: "ناعم-متوسط",
    waterTempC: 93,
    supportsIced: true,
    steps: {
      hot: [
        { time: "0:00", action: "ابدأ بـ Bloom: صب 32 جرام ماء ساخن (93°م)", detail: "تأكد من تبليل جميع البن — انتظر 30-45 ثانية" },
        { time: "0:45", action: "صب الماء تدريجياً حتى 120 جرام", detail: "صب بحركة دائرية من المركز للخارج" },
        { time: "1:30", action: "استمر في الصب حتى 180 جرام", detail: "حافظ على منسوب الماء ثابتاً" },
        { time: "2:15", action: "أكمل الصب حتى 240 جرام", detail: "صب ببطء وثبات" },
        { time: "3:30", action: "انتظر حتى ينتهي التصفية", detail: "يجب أن تنتهي التصفية بين 3-4 دقائق" },
      ],
      iced: [
        { time: "0:00", action: "ضع الثلج في الإبريق", detail: "استخدم ثلج عادي أو ثلج مجروش" },
        { time: "0:30", action: "ابدأ بـ Bloom: صب 32 جرام ماء ساخن", detail: "تأكد من تبليل جميع البن" },
        { time: "1:15", action: "صب الماء حتى 240 جرام", detail: "صب بسرعة معتدلة" },
        { time: "2:00", action: "انتظر التصفية", detail: "الثلج سيبرّد القهوة تدريجياً" },
      ],
    },
  },
  chemex: {
    id: "chemex",
    nameAr: "Chemex",
    nameEn: "Chemex",
    ratio: 16,
    brewTimeMin: 4,
    brewTimeMax: 5,
    grindSize: "خشن-متوسط",
    waterTempC: 94,
    supportsIced: true,
    steps: {
      hot: [
        { time: "0:00", action: "ابدأ بـ Bloom: صب 30 جرام ماء ساخن (94°م)", detail: "دع البن يمتص الماء لمدة 45 ثانية" },
        { time: "0:45", action: "صب الماء ببطء حتى 150 جرام", detail: "صب بحركة دائرية ناعمة" },
        { time: "1:45", action: "استمر في الصب حتى 240 جرام", detail: "اترك مسافة من الأعلى" },
        { time: "3:00", action: "انتظر التصفية النهائية", detail: "يجب أن تنتهي بين 4-5 دقائق" },
      ],
      iced: [
        { time: "0:00", action: "ضع الثلج في الإبريق", detail: "ملء الإبريق بالثلج" },
        { time: "0:30", action: "ابدأ بـ Bloom: صب 30 جرام ماء ساخن", detail: "دع البن يمتص الماء" },
        { time: "1:15", action: "صب الماء حتى 240 جرام", detail: "صب ببطء" },
      ],
    },
  },
  frenchPress: {
    id: "frenchPress",
    nameAr: "French Press",
    nameEn: "French Press",
    ratio: 14,
    brewTimeMin: 4,
    brewTimeMax: 5,
    grindSize: "خشن",
    waterTempC: 95,
    supportsIced: true,
    steps: {
      hot: [
        { time: "0:00", action: "أضف 17 جرام بن مطحون خشن", detail: "الطحن الخشن ضروري جداً" },
        { time: "0:30", action: "صب 240 جرام ماء ساخن (95°م)", detail: "صب الماء ببطء وحرّك برفق" },
        { time: "1:00", action: "ضع الغطاء دون ضغط المكبس", detail: "المكبس في الأعلى فقط" },
        { time: "4:00", action: "اضغط المكبس ببطء وثبات", detail: "يستغرق 20-30 ثانية للضغط" },
        { time: "4:30", action: "صب القهوة في الكوب", detail: "تجنب صب الرواسب من الأسفل" },
      ],
      iced: [
        { time: "0:00", action: "أضف البن المطحون والثلج", detail: "استخدم ثلج عادي" },
        { time: "0:30", action: "صب الماء الساخن", detail: "اترك مسافة من الأعلى" },
        { time: "4:00", action: "اضغط المكبس", detail: "ببطء وثبات" },
      ],
    },
  },
  espresso: {
    id: "espresso",
    nameAr: "Espresso",
    nameEn: "Espresso",
    ratio: 2,
    brewTimeMin: 0.5,
    brewTimeMax: 0.5,
    grindSize: "ناعم جداً",
    waterTempC: 93,
    supportsIced: true,
    steps: {
      hot: [
        { time: "0:00", action: "أضف 18 جرام بن مطحون ناعم جداً", detail: "الطحن الناعم حرج جداً" },
        { time: "0:10", action: "اضغط البن برفق (Tamp)", detail: "اضغط بقوة متساوية" },
        { time: "0:20", action: "ضع الفلتر في الماكينة", detail: "تأكد من الإحكام" },
        { time: "0:30", action: "استخرج الإسبريسو", detail: "يجب أن تحصل على 36 جرام في 25-30 ثانية" },
      ],
      iced: [
        { time: "0:00", action: "ضع الثلج في الكوب", detail: "ملء الكوب بالثلج" },
        { time: "0:30", action: "استخرج الإسبريسو فوق الثلج", detail: "الثلج سيبرّد القهوة فوراً" },
      ],
    },
  },
  aeropress: {
    id: "aeropress",
    nameAr: "AeroPress",
    nameEn: "AeroPress",
    ratio: 13,
    brewTimeMin: 1.5,
    brewTimeMax: 2,
    grindSize: "ناعم-متوسط",
    waterTempC: 85,
    supportsIced: true,
    steps: {
      hot: [
        { time: "0:00", action: "أضف 18 جرام بن مطحون", detail: "ضع الفلتر أولاً في الأسطوانة" },
        { time: "0:30", action: "صب 50 جرام ماء ساخن (85°م)", detail: "دع البن يمتص الماء" },
        { time: "1:00", action: "صب الماء المتبقي حتى 240 جرام", detail: "صب ببطء" },
        { time: "1:30", action: "ضع المكبس واضغط ببطء", detail: "يجب أن يستغرق 30-40 ثانية" },
      ],
      iced: [
        { time: "0:00", action: "ضع الثلج في الكوب", detail: "ملء الكوب بالثلج" },
        { time: "0:30", action: "أضف البن والماء في AeroPress", detail: "اتبع نفس خطوات الحار" },
        { time: "2:00", action: "اضغط واستخرج القهوة فوق الثلج", detail: "الثلج سيبرّد القهوة" },
      ],
    },
  },
  coldBrew: {
    id: "coldBrew",
    nameAr: "Cold Brew",
    nameEn: "Cold Brew",
    ratio: 8,
    brewTimeMin: 720,
    brewTimeMax: 1440,
    grindSize: "خشن جداً",
    waterTempC: 4,
    supportsIced: false,
    steps: {
      hot: [
        { time: "0:00", action: "أضف 30 جرام بن مطحون خشن جداً", detail: "في برطمان نظيف" },
        { time: "0:30", action: "صب 240 جرام ماء بارد", detail: "ماء من الثلاجة" },
        { time: "1:00", action: "حرّك برفق وأغلق البرطمان", detail: "ضع غطاء محكم" },
        { time: "12:00", action: "دع البن ينقع لمدة 12-24 ساعة", detail: "في الثلاجة" },
        { time: "24:00", action: "صفّ القهوة من خلال فلتر", detail: "استخدم قماش ناعم أو فلتر ورقي" },
      ],
    },
  },
};

// ── User State ───────────────────────────────────────────────
let currentUser = null;
let isLoggedIn = false;
let isGuestMode = false;

// ── Initialize ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadUserFromStorage();
  initializeApp();
});

// ── Auth Functions ───────────────────────────────────────────
function showRegisterForm() {
  document.getElementById("auth-screen").classList.remove("active");
  document.getElementById("register-form").style.display = "flex";
}

function showLoginForm() {
  document.getElementById("auth-screen").classList.remove("active");
  document.getElementById("login-form").style.display = "flex";
}

function backToAuthScreen() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("auth-screen").classList.add("active");
  document.getElementById("register-error").style.display = "none";
  document.getElementById("login-error").style.display = "none";
}

function guestMode() {
  isGuestMode = true;
  isLoggedIn = false;
  currentUser = null;
  showAppScreen();
  document.getElementById("save-recipe-section").style.display = "none";
  document.getElementById("temp-control").style.display = "none";
  document.getElementById("coffee-control").style.display = "none";
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const passwordConfirm = document.getElementById("reg-password-confirm").value;
  const errorDiv = document.getElementById("register-error");

  if (password !== passwordConfirm) {
    errorDiv.textContent = "كلمات المرور غير متطابقة";
    errorDiv.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    errorDiv.style.display = "block";
    return;
  }

  // حفظ المستخدم (في الواقع، سيتم إرساله إلى Google Sheets)
  currentUser = { name, email, password };
  isLoggedIn = true;
  saveUserToStorage();
  sendUserToGoogleSheet(name, email, "تسجيل جديد");
  showAppScreen();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  // في النسخة الحالية، سنقبل أي بيانات دخول
  // في المستقبل، يمكن التحقق من قاعدة البيانات
  if (!email || !password) {
    errorDiv.textContent = "يرجى ملء جميع الحقول";
    errorDiv.style.display = "block";
    return;
  }

  currentUser = { name: email.split("@")[0], email, password };
  isLoggedIn = true;
  saveUserToStorage();
  showAppScreen();
}

function logout() {
  currentUser = null;
  isLoggedIn = false;
  isGuestMode = false;
  localStorage.removeItem("coffeeAppUser");
  location.reload();
}

function showAppScreen() {
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("app-screen").style.display = "block";

  if (isLoggedIn && currentUser) {
    document.getElementById("user-name-display").textContent = currentUser.name;
    document.getElementById("save-recipe-section").style.display = "block";
    document.getElementById("temp-control").style.display = "block";
    document.getElementById("coffee-control").style.display = "block";
  }

  initializeCalculator();
}

// ── Storage Functions ────────────────────────────────────────
function saveUserToStorage() {
  if (currentUser) {
    localStorage.setItem("coffeeAppUser", JSON.stringify(currentUser));
  }
}

function loadUserFromStorage() {
  const stored = localStorage.getItem("coffeeAppUser");
  if (stored) {
    try {
      currentUser = JSON.parse(stored);
      isLoggedIn = true;
    } catch (e) {
      console.error("Error loading user:", e);
    }
  }
}

// ── Google Sheets Integration ────────────────────────────────
function sendUserToGoogleSheet(name, email, action) {
  // هذا الدالة ستُرسل البيانات إلى Google Sheets عبر Apps Script
  // سيتم تفعيله بعد أن يضع المستخدم رابط السكريبت
  if (!CONFIG.googleSheetWebAppUrl) {
    console.log("Google Sheet URL not configured yet");
    return;
  }

  const data = {
    action: action,
    name: name,
    email: email,
    timestamp: new Date().toLocaleString("ar-SA"),
  };

  fetch(CONFIG.googleSheetWebAppUrl, {
    method: "POST",
    body: JSON.stringify(data),
  }).catch(err => console.error("Error sending to Google Sheet:", err));
}

function saveRecipe() {
  if (!isLoggedIn) {
    alert("يجب تسجيل الدخول أولاً");
    return;
  }

  const recipeName = document.getElementById("recipe-name").value.trim();
  if (!recipeName) {
    alert("يرجى إدخال اسم الوصفة");
    return;
  }

  const cups = parseInt(document.getElementById("cups").value, 10);
  const method = document.getElementById("method").value;
  const serving = document.getElementById("serving").value;
  const customTemp = parseInt(document.getElementById("custom-temp").value, 10) || 0;
  const customCoffee = parseFloat(document.getElementById("custom-coffee").value) || 0;

  const recipeData = {
    action: "save_recipe",
    userName: currentUser.name,
    userEmail: currentUser.email,
    recipeName: recipeName,
    cups: cups,
    method: method,
    serving: serving,
    customTemp: customTemp,
    customCoffee: customCoffee,
    timestamp: new Date().toLocaleString("ar-SA"),
  };

  const statusDiv = document.getElementById("save-status");
  statusDiv.textContent = "جاري الحفظ...";
  statusDiv.style.display = "block";
  statusDiv.style.color = "var(--clr-coffee)";

  if (CONFIG.googleSheetWebAppUrl) {
    fetch(CONFIG.googleSheetWebAppUrl, {
      method: "POST",
      body: JSON.stringify(recipeData),
    })
      .then(() => {
        statusDiv.textContent = "✅ تم حفظ الوصفة بنجاح!";
        statusDiv.style.color = "var(--clr-success, #34d399)";
        document.getElementById("recipe-name").value = "";
        setTimeout(() => {
          statusDiv.style.display = "none";
        }, 3000);
      })
      .catch(err => {
        statusDiv.textContent = "❌ حدث خطأ في الحفظ";
        statusDiv.style.color = "var(--clr-error)";
        console.error("Error saving recipe:", err);
      });
  } else {
    statusDiv.textContent = "⚠️ لم يتم ربط Google Sheet بعد";
    statusDiv.style.color = "var(--clr-warning, #f59e0b)";
  }
}

// ── Calculator Functions ─────────────────────────────────────
function initializeCalculator() {
  const methodSelect = document.getElementById("method");
  methodSelect.innerHTML = "";
  Object.values(BREWING_METHODS).forEach(method => {
    const option = document.createElement("option");
    option.value = method.id;
    option.textContent = `${method.nameAr} — ${method.nameEn}`;
    methodSelect.appendChild(option);
  });

  document.getElementById("cups").addEventListener("input", updateUI);
  document.getElementById("method").addEventListener("change", updateUI);
  document.getElementById("serving").addEventListener("change", updateUI);
  document.getElementById("custom-temp").addEventListener("input", updateUI);
  document.getElementById("custom-coffee").addEventListener("input", updateUI);

  document.querySelectorAll('input[name="serving"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document.getElementById("serving").value = radio.value;
      updateUI();
    });
  });

  updateUI();
}

function calculateRecipe(cups, methodId, servingType, customTemp = 0, customCoffee = 0) {
  const method = BREWING_METHODS[methodId];
  if (!method) return null;

  const cupSizeG = CONFIG.defaultCupSizeMl * CONFIG.waterDensity;
  let totalWater = Math.round(cups * cupSizeG);
  let coffeeGrams = customCoffee > 0 ? customCoffee : Math.round(totalWater / method.ratio);

  let brewTimeDisplay;
  if (methodId === "coldBrew") {
    brewTimeDisplay = "12-24 ساعة";
  } else if (method.brewTimeMin === method.brewTimeMax) {
    brewTimeDisplay = `~${method.brewTimeMin * 60} ثانية`;
  } else {
    brewTimeDisplay = `${method.brewTimeMin}-${method.brewTimeMax} دقائق`;
  }

  const stepsKey = servingType === "iced" ? "iced" : "hot";
  const steps = method.steps[stepsKey] || [];

  const waterTemp = customTemp > 0 ? `${customTemp}°م` : (methodId === "coldBrew" ? "بارد / درجة الغرفة" : `${method.waterTempC}°م`);

  return {
    coffeeGrams,
    waterGrams: totalWater,
    ratio: `1:${method.ratio}`,
    totalVolumeMl: totalWater,
    brewTime: brewTimeDisplay,
    grindSize: method.grindSize,
    waterTemp: waterTemp,
    steps,
    methodName: method.nameAr,
    servingType,
  };
}

function updateUI() {
  const cupsInput = document.getElementById("cups");
  const methodSelect = document.getElementById("method");
  const servingSelect = document.getElementById("serving");
  const errorMsg = document.getElementById("error-msg");
  const resultsSection = document.getElementById("results-section");
  const customTemp = parseInt(document.getElementById("custom-temp").value, 10) || 0;
  const customCoffee = parseFloat(document.getElementById("custom-coffee").value) || 0;

  const cups = parseInt(cupsInput.value, 10);
  const methodId = methodSelect.value;
  const servingType = servingSelect.value;

  if (!cupsInput.value || isNaN(cups) || cups < 1) {
    errorMsg.textContent = cups <= 0 ? "⚠️ عدد الأكواب يجب أن يكون 1 على الأقل" : "⚠️ يرجى إدخال عدد الأكواب";
    errorMsg.style.display = "block";
    resultsSection.style.display = "none";
    return;
  }

  errorMsg.style.display = "none";

  const result = calculateRecipe(cups, methodId, servingType, customTemp, customCoffee);
  if (!result) return;

  document.getElementById("res-coffee").textContent = `${result.coffeeGrams} جرام`;
  document.getElementById("res-water").textContent = `${result.waterGrams} جرام`;
  document.getElementById("res-ratio").textContent = result.ratio;
  document.getElementById("res-volume").textContent = `${result.totalVolumeMl} مل`;
  document.getElementById("res-time").textContent = result.brewTime;
  document.getElementById("res-grind").textContent = result.grindSize;
  document.getElementById("res-temp").textContent = result.waterTemp;

  const stepsContainer = document.getElementById("steps-container");
  stepsContainer.innerHTML = "";

  result.steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    stepEl.className = "step-item";
    stepEl.style.animationDelay = `${index * 0.08}s`;
    stepEl.innerHTML = `
      <div class="step-number">${index + 1}</div>
      <div class="step-content">
        <div class="step-time">${step.time}</div>
        <div class="step-action">${step.action}</div>
        <div class="step-detail">${step.detail}</div>
      </div>
    `;
    stepsContainer.appendChild(stepEl);
  });

  document.getElementById("method-badge").textContent = result.methodName;
  document.getElementById("serving-badge").textContent = servingType === "iced" ? "❄️ بارد" : "☕ حار";

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function adjustCups(delta) {
  const input = document.getElementById("cups");
  const current = parseInt(input.value, 10) || 0;
  const next = Math.max(1, current + delta);
  input.value = next;
  updateUI();
}

function initializeApp() {
  if (isLoggedIn && currentUser) {
    showAppScreen();
  }
}
