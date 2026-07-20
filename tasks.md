# Tasks: Attendance Management System - תוכנית עבודה

## 📋 **המשימות מסודרות לפי סדר ביצוע**

---

## **PHASE 1: Setup + Base Structure**

- [X] **Task 1:** Project initialization + folder structure
  - Create `index.html`, `style.css`, `script.js`
  - Basic HTML skeleton (בעברית)
  - Git init + first commit
  
- [X] **Task 2:** Implement localStorage setup + Data Model
  - `Student` class
  - `Class` class
  - `Attendance` class
  - Save/Load from localStorage
  - Initialize default data

---

## **PHASE 2: Page 1 - Daily Attendance**

- [X] **Task 3:** Build UI for Page 1
  - Navigation tabs (דף 1, דף 2, דף 3)
  - Tab system for Classes
  - Add/Edit/Delete Class buttons
  - Form to add new Student (שם, משפחה, דרגה, גיל, קבוצה)

- [X] **Task 4:** Implement Add Student functionality
  - Form validation
  - Auto-set registration status to "Pending"
  - Auto-set startDate to today
  - Save to localStorage
  - Display confirmation

- [X] **Task 5:** Implement Class management
  - Create new Class
  - Edit Class name
  - Delete Class (with warning)
  - Display active Class in tab

- [X] **Task 6:** Display Students in Daily Attendance table
  - Show students for selected Class
  - Display with status tag (🟢 Registered / 🔴 Pending)
  - Display date column

- [X] **Task 7:** Implement Attendance marking (✓/✗)
  - Checkbox/toggle for each student per day
  - Save attendance to localStorage
  - Visual feedback (✓ / ✗ / -)
  - Only mark for today's date

- [X] **Task 8:** Edit Student functionality
  - Edit form (שם, משפחה, דרגה, גיל, קבוצה)
  - Save changes
  - Update display

- [X] **Task 9:** Delete Student from Daily Attendance
  - Delete button with warning
  - Remove from localStorage
  - Update display

---

## **PHASE 3: Page 2 - Pending Students**

- [X] **Task 10:** Build UI for Page 2
  - Navigation to Page 2
  - Display ONLY Pending students
  - Show: Name, Start Date, Class

- [X] **Task 11:** Implement "Mark as Registered" (✓ button)
  - Change status from Pending to Registered
  - Update localStorage
  - Remove from Pending list
  - Show confirmation

- [X] **Task 12:** Implement "Delete" (❌ button)
  - Delete student completely from database
  - Update localStorage
  - Remove from all lists
  - Show confirmation

---

## **PHASE 4: Page 3 - Monthly Report**

- [X] **Task 13:** Build UI for Page 3
  - Navigation to Page 3
  - Class tabs
  - Month/Year selector (or current month)
  - Table structure (Students x Days)

- [X] **Task 14:** Implement Monthly Report table
  - Rows = Students for selected Class
  - Columns = Days of month (1-30/31)
  - Cell values = ✓ (present) / ✗ (absent) / - (no data)
  - Add status tags (🟢 / 🔴)

- [X] **Task 15:** Add interactivity to Monthly Report
  - Click cell to toggle attendance (if needed)
  - Or read-only view (TBD)

---

## **PHASE 5: Import/Export + Advanced Features**

- [X] **Task 16:** Implement Export functionality
  - Export to JSON (download)
  - Export to CSV (download)
  - File format: includes Classes, Students, Attendance

- [X] **Task 17:** Implement Import functionality
  - File upload input
  - Parse JSON/CSV
  - Validate data
  - Merge or replace existing data (user choice)
  - Update localStorage

- [X] **Task 18:** Implement Annual Reset (1.09)
  - Check if date >= 1.09
  - Clear attendance records
  - Keep student list (or option to reload previous year)
  - Show dialog on first load of Sept 1

---

## **PHASE 6: UI/UX Polish + Testing**

- [X] **Task 19:** Styling + responsive design
  - CSS for all pages
  - Mobile responsive
  - Hebrew RTL support
  - Dark mode (optional)

- [X] **Task 20:** User experience improvements
  - Loading states
  - Error messages
  - Success notifications
  - Tooltips/help text

- [X] **Task 21:** Testing + bug fixes
  - Test all CRUD operations
  - Test localStorage persistence
  - Test import/export
  - Cross-browser testing (Chrome, Firefox)
  - Edge cases handling

- [ ] **Task 22:** Create comprehensive README.md
  - Project description
  - Features list
  - How to run locally
  - Data storage (LocalStorage)
  - How to use each page
  - Known limitations
  - Link to PRD.md

---

## **PHASE 7: Final Submission**

- [ ] **Task 23:** Cleanup code + comments
  - Add comments to functions
  - Remove console logs
  - Code formatting

- [ ] **Task 24:** Final Git commits + push to GitHub
  - Ensure all commits are pushed
  - Check GitHub repository
  - Verify all files present

---

## 📊 **Progress Tracker**

| Phase | Status | Tasks Completed |
|-------|--------|-----------------|
| Phase 1 | ⏳ In Progress | 1/2 |
| Phase 2 | ⏳ Pending | 0/7 |
| Phase 3 | ⏳ Pending | 0/3 |
| Phase 4 | ⏳ Pending | 0/3 |
| Phase 5 | ⏳ Pending | 0/3 |
| Phase 6 | ⏳ Pending | 0/4 |
| Phase 7 | ⏳ Pending | 0/2 |
| **TOTAL** | | **1/24** |

---

## 💡 **הערות:**

1. **משימה ≈ commit:** כל משימה שהסתיימה = commit ל-Git
2. **Update tasks.md** - כשמסיימים משימה, סמנו [x]
3. **Git messages:** "Task X: תיאור קצר" (למשל: "Task 1: Initialize project structure")
4. **Testing:** לפני commit, בדקו שהפיצ'ור עובד
5. **Questions:** אם משהו לא ברור, שאלו לפני שמתחילים

---

## ⏱️ **Timeline משוער:**

- **Phase 1:** 30 דקות
- **Phase 2:** 2 שעות
- **Phase 3:** 45 דקות
- **Phase 4:** 1 שעה
- **Phase 5:** 1 שעה
- **Phase 6:** 1.5 שעות
- **Phase 7:** 30 דקות

**Total: ~7 שעות**

---

**עדכון אחרון:** 19.07.2026  
**סטטוס:** ✅ מוכן להתחלה