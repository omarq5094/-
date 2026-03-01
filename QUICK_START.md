# 🚀 البدء السريع — Quick Start

## 1️⃣ تشغيل الموقع محلياً (للاختبار)

```bash
# افتح المجلد
cd coffee-calculator

# افتح index.html في المتصفح
# (يمكنك فقط النقر المزدوج على الملف)
```

---

## 2️⃣ نشر على GitHub (الخطوات الأساسية)

### أ) إنشاء مستودع على GitHub:
1. اذهب إلى [github.com/new](https://github.com/new)
2. أسم المستودع: `coffee-calculator`
3. اختر **Public**
4. اضغط **Create Repository**

### ب) رفع الملفات من جهازك:

**على Windows:**
```bash
cd coffee-calculator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coffee-calculator.git
git push -u origin main
```

**على Mac/Linux:**
```bash
cd coffee-calculator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coffee-calculator.git
git push -u origin main
```

---

## 3️⃣ نشر الموقع على الإنترنت (اختر واحد)

### ✅ الخيار الأول: Netlify (الأسهل)

1. اذهب إلى [netlify.com](https://netlify.com)
2. اضغط **Sign up** وسجل دخول بـ GitHub
3. اضغط **New site from Git**
4. اختر GitHub وحدد `coffee-calculator`
5. اضغط **Deploy**
6. ✨ انتظر دقيقة واحدة — الموقع جاهز!

**الرابط سيكون مثل:** `coffee-calculator.netlify.app`

---

### ✅ الخيار الثاني: Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **Sign up** وسجل دخول بـ GitHub
3. اضغط **Import Project**
4. اختر GitHub وحدد `coffee-calculator`
5. اضغط **Deploy**
6. ✨ انتظر دقيقة واحدة — الموقع جاهز!

**الرابط سيكون مثل:** `coffee-calculator.vercel.app`

---

## 4️⃣ تعديل الوصفات

### الطريقة الأولى: تعديل ملف Excel

1. افتح `coffee_recipes.xlsx` بـ Excel أو Google Sheets
2. عدّل البيانات (النسب، الخطوات، إلخ)
3. احفظ الملف
4. رفعه إلى GitHub:
   ```bash
   git add coffee_recipes.xlsx
   git commit -m "تحديث الوصفات"
   git push
   ```
5. ✨ الموقع سيتحدث تلقائياً خلال ثوانٍ!

### الطريقة الثانية: تعديل مباشر في الموقع (إذا كان لديك معرفة بـ Git)

1. عدّل `app.js` أو `index.html` مباشرة
2. رفع التعديلات:
   ```bash
   git add .
   git commit -m "تحديث التصميم"
   git push
   ```

---

## 📝 ملاحظات مهمة

✅ **ملف Excel هو "لوحة التحكم"** — تعديلات الزوار لا تؤثر على البيانات  
✅ **التحديث تلقائي** — لا تحتاج لفعل شيء بعد الرفع  
✅ **آمن وخاص** — أنت الوحيد الذي يملك صلاحية التعديل  
✅ **مجاني** — Netlify و Vercel يقدمان استضافة مجانية  

---

## 🆘 إذا حدثت مشكلة

### الموقع لا يعرض البيانات:
- تأكد من وجود `coffee_recipes.xlsx` في نفس المجلد
- امسح ذاكرة التخزين المؤقت: `Ctrl+Shift+Delete`

### التعديلات لا تظهر:
- تأكد من أن `git push` نجح
- انتظر 30 ثانية حتى ينتهي Netlify من إعادة النشر
- امسح الـ Cache مرة أخرى

### لا تملك Git على جهازك:
- حمّل Git من [git-scm.com](https://git-scm.com)
- أو استخدم GitHub Desktop: [desktop.github.com](https://desktop.github.com)

---

## 📚 لمزيد من المعلومات

اقرأ ملف `README.md` الكامل للتفاصيل المتقدمة.

---

**استمتع بقهوتك! ☕✨**
