# 🥋 Attendance Management System - מערכת ניהול נוכחות

> מערכת ווב מודרנית לניהול נוכחות חניכים באומניות לחימה

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Data%20Persistence-blue)

---

## 📋 תוכן עניינים

- [תיאור הפרויקט](#תיאור-הפרויקט)
- [תכונות](#תכונות)
- [התקנה והרצה](#התקנה-והרצה)
- [איך להשתמש](#איך-להשתמש)
- [מבנה הנתונים](#מבנה-הנתונים)
- [טכנולוגיות](#טכנולוגיות)
- [הגבלות ידועות](#הגבלות-ידועות)

---

## תיאור הפרויקט

מערכת ניהול נוכחות לאומניות לחימה המאפשרת:
- ✅ סימון נוכחות יומי לפי קבוצות
- ✅ ניהול חניכים עם פרטים מלאים
- ✅ דוח נוכחות חודשי ושנתי
- ✅ ייבוא/ייצוא נתונים
- ✅ Reset אוטומטי בתחילת שנה חדשה (1.09)

---

## ✨ תכונות

### 📝 עמוד 1: סימון נוכחות יומי
- טאבים של קבוצות (ניתן להוסיף/ערוך/מחוק)
- הוספת חניך חדש עם פרטים:
  - שם + משפחה
  - דרגה
  - גיל
  - קבוצה
  - סטטוס הרשמה
- סימון נוכחות (✓ / ✗)
- עריכה ומחיקת חניכים

### ⏳ עמוד 2: ניהול חניכים חדשים (Pending)
- רשימת חניכים שלא נרשמו עדיין
- אפשרות להרשום (✅) או למחוק (❌)
- הוספת חניכים מהשנה הקודמת

### 📊 עמוד 3: דוח חודשי
- בחר שנה וחודש
- טבלה של כל החניכים בשנה
- סימני נוכחות (✓ / ✗ / -)
- סטטוס הרשמה של כל חניך

### ⚙️ עמוד 4: הגדרות
- 📤 ייצוא לקובץ JSON
- 📥 ייבוא מקובץ JSON
- 🔄 Reset שנתי (1.09)
- 🗑️ מחק את כל הנתונים

---

## 🚀 התקנה והרצה

### דרישות
- דפדפן מודרני (Chrome, Firefox, Safari, Edge)
- JavaScript מופעל
- אין צורך בשרת - כל הנתונים מקומיים!

### הורדה והרצה

```bash
# Clone את ה-Repository
git clone https://github.com/barit3031/attendance-management.git

# פתח את index.html בדפדפן
cd attendance-management
# פתח את index.html בעורך או דבל-קליק
```

---

## 📖 איך להשתמש

### הוספת קבוצה חדשה
1. לחץ על "➕ קבוצה חדשה"
2. כתוב את שם הקבוצה
3. לחץ "צור קבוצה"

### הוספת חניך
1. מלא את כל הפרטים בטופס
2. בחר קבוצה
3. לחץ "הוסף חניך"

### סימון נוכחות
1. לחץ על checkbox ליד חניך
2. סטטוס מתעדכן אוטומטי

### צפייה בדוח חודשי
1. לחץ על "📊 דוח חודשי"
2. בחר שנה וחודש
3. צפה בנוכחות של כל חניך

### ייצוא/ייבוא
1. לחץ על "⚙️ הגדרות"
2. לחץ "📤 ייצוא לJSON" להורדת קובץ
3. לחץ "📥 ייבוא מקובץ" להעלאה

---

## 📦 מבנה הנתונים

### LocalStorage Structure
```javascript
{
  classes: [
    {
      id: "unique_id",
      name: "קבוצה א'",
      createdAt: "ISO_DATE"
    }
  ],
  students: [
    {
      id: "unique_id",
      firstName: "דוד",
      lastName: "כהן",
      grade: "חגורה לבנה",
      age: 16,
      classId: "class_id",
      registrationStatus: "Registered" | "Pending",
      startDate: "YYYY-MM-DD",
      createdAt: "ISO_DATE"
    }
  ],
  attendance: [
    {
      id: "unique_id",
      studentId: "student_id",
      date: "YYYY-MM-DD",
      status: "present" | "absent",
      classId: "class_id"
    }
  ]
}
```

---

## 🛠️ טכנולוגיות

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** Browser LocalStorage
- **Data Format:** JSON
- **RTL Support:** עברית תמימה

---

## 🔄 Reset שנתי (1.09)

- **בכל 1 בספטמבר:** חניכים חוזרים ל-"Pending"
- **מחיקה:** רשומות נוכחות מתאפסות
- **שמירה:** חניכים נשמרים עם כל הפרטים שלהם

---

## 📱 Responsive Design

- ✅ עובד בנייד
- ✅ עובד בטאבלט
- ✅ עובד בדסקטופ
- ✅ RTL Support (עברית)

---

## ⚠️ הגבלות ידועות

- ❌ אין Multi-user (משתמש אחד בדפדפן)
- ❌ אין Cloud Sync (רק LocalStorage)
- ❌ אין Backend Server
- ❌ אין Mobile App Native

---

## 📝 הערות חשובות

### גיבוי הנתונים
כדי לא לאבד נתונים:
1. בדוק ב-Settings → ייצוא לJSON
2. שמור את הקובץ בחוץ

### ניקוי Cache
אם משהו לא עובד:
1. לחץ F12 (Developer Tools)
2. Storage → Clear All
3. Refresh (F5)

---

## 🤝 תרומה

פרויקט לימודי - אם יש רעיונות לשיפור, אתה מוזמן!

---

## 📄 לייסנס

Open Source - Free to use

---

## 👨‍💻 יוצר

פרויקט של מאמן אומניות לחימה 🥋

---

## 📞 תמיכה

בעיה? בדוק את:
1. Console (F12) - הודעות שגיאה
2. Storage - וודא שיש נתונים
3. Refresh את הדף

---

**Last Updated:** 2025-07-20  
**Version:** 1.0  
**Status:** ✅ Production Ready