// ============================================================
// Google Apps Script for Coffee Calculator
// Paste this code into Google Sheets > Extensions > Apps Script
// ============================================================

// ── Configuration ────────────────────────────────────────────
const SHEET_NAME = "Users"; // اسم الورقة الأولى (المستخدمين)
const RECIPES_SHEET_NAME = "Recipes"; // اسم الورقة الثانية (الوصفات)

// ── Do Not Edit Below ────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.action === "save_recipe") {
      return saveRecipe(data, ss);
    } else {
      return registerUser(data, ss);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function registerUser(data, ss) {
  try {
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // إذا لم تكن الورقة موجودة، أنشئها
    if (!sheet) {
      ss.insertSheet(SHEET_NAME);
      const newSheet = ss.getSheetByName(SHEET_NAME);
      newSheet.appendRow(["الاسم", "البريد الإلكتروني", "الإجراء", "التاريخ"]);
      sheet = newSheet;
    }
    
    // أضف صف جديد
    sheet.appendRow([
      data.name,
      data.email,
      data.action,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم تسجيل المستخدم بنجاح"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveRecipe(data, ss) {
  try {
    let sheet = ss.getSheetByName(RECIPES_SHEET_NAME);
    
    // إذا لم تكن الورقة موجودة، أنشئها
    if (!sheet) {
      ss.insertSheet(RECIPES_SHEET_NAME);
      sheet = ss.getSheetByName(RECIPES_SHEET_NAME);
      sheet.appendRow([
        "اسم المستخدم",
        "البريد الإلكتروني",
        "اسم الوصفة",
        "عدد الأكواب",
        "طريقة التحضير",
        "نوع التقديم",
        "درجة الحرارة المخصصة",
        "كمية البن المخصصة",
        "التاريخ"
      ]);
    }
    
    // أضف صف جديد
    sheet.appendRow([
      data.userName,
      data.userEmail,
      data.recipeName,
      data.cups,
      data.method,
      data.serving,
      data.customTemp,
      data.customCoffee,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم حفظ الوصفة بنجاح"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Helper: Deploy as Web App ────────────────────────────────
// 1. في محرر Apps Script، اضغط على "Deploy" (نشر)
// 2. اختر "New Deployment"
// 3. اختر "Web app"
// 4. في "Execute as"، اختر حسابك
// 5. في "Who has access"، اختر "Anyone"
// 6. اضغط "Deploy"
// 7. انسخ الرابط (URL) الذي يظهر
// 8. ضع هذا الرابط في ملف app-auth.js في السطر:
//    CONFIG.googleSheetWebAppUrl = "YOUR_DEPLOYMENT_URL";
