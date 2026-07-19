/**
 * Attendance Management System - Main JavaScript File
 * System for managing attendance at a martial arts academy
 */

// ============================================
// DATA MODEL & STORAGE
// ============================================

class AttendanceSystem {
    constructor() {
        this.classes = [];
        this.students = [];
        this.attendance = [];
        this.currentClassId = null;
        this.loadData();
    }

    // Initialize or load data from localStorage
    loadData() {
        const saved = localStorage.getItem('attendanceData');
        if (saved) {
            const data = JSON.parse(saved);
            this.classes = data.classes || [];
            this.students = data.students || [];
            this.attendance = data.attendance || [];
            if (this.classes.length > 0) {
                this.currentClassId = this.classes[0].id;
            }
        } else {
            this.initializeDefaults();
        }
    }

    // Initialize with default data
    initializeDefaults() {
        const defaultClass = {
            id: this.generateId(),
            name: 'קבוצה א\'',
            createdAt: new Date().toISOString()
        };
        this.classes.push(defaultClass);
        this.currentClassId = defaultClass.id;
        this.saveData();
    }

    // Save all data to localStorage
    saveData() {
        const data = {
            classes: this.classes,
            students: this.students,
            attendance: this.attendance,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('attendanceData', JSON.stringify(data));
    }

    // Generate unique ID
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ============================================
    // CLASS MANAGEMENT
    // ============================================

    addClass(name) {
        const newClass = {
            id: this.generateId(),
            name: name,
            createdAt: new Date().toISOString()
        };
        this.classes.push(newClass);
        this.saveData();
        return newClass;
    }

    updateClass(classId, name) {
        const cls = this.classes.find(c => c.id === classId);
        if (cls) {
            cls.name = name;
            this.saveData();
            return true;
        }
        return false;
    }

    deleteClass(classId) {
        this.classes = this.classes.filter(c => c.id !== classId);
        this.students = this.students.filter(s => s.classId !== classId);
        this.attendance = this.attendance.filter(a => a.classId !== classId);
        
        if (this.currentClassId === classId && this.classes.length > 0) {
            this.currentClassId = this.classes[0].id;
        }
        this.saveData();
        return true;
    }

    getClasses() {
        return this.classes;
    }

    getClassById(classId) {
        return this.classes.find(c => c.id === classId);
    }

    // ============================================
    // STUDENT MANAGEMENT
    // ============================================

    addStudent(firstName, lastName, grade, age, classId, registered = false) {
        const newStudent = {
            id: this.generateId(),
            firstName: firstName,
            lastName: lastName,
            grade: grade,
            age: age,
            classId: classId,
            registrationStatus: registered ? 'Registered' : 'Pending',
            startDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        this.students.push(newStudent);
        this.saveData();
        return newStudent;
    }

    updateStudent(studentId, updates) {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            Object.assign(student, updates);
            this.saveData();
            return true;
        }
        return false;
    }

    deleteStudent(studentId) {
        this.students = this.students.filter(s => s.id !== studentId);
        this.attendance = this.attendance.filter(a => a.studentId !== studentId);
        this.saveData();
        return true;
    }

    getStudentsByClass(classId) {
        return this.students.filter(s => s.classId === classId);
    }

    getPendingStudents() {
        return this.students.filter(s => s.registrationStatus === 'Pending');
    }

    markStudentAsRegistered(studentId) {
        return this.updateStudent(studentId, { registrationStatus: 'Registered' });
    }

    getAllStudents() {
        return this.students;
    }

    // ============================================
    // ATTENDANCE MANAGEMENT
    // ============================================

    markAttendance(studentId, date, status) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return false;

        const existing = this.attendance.find(
            a => a.studentId === studentId && a.date === date
        );

        if (existing) {
            existing.status = status;
        } else {
            this.attendance.push({
                id: this.generateId(),
                studentId: studentId,
                date: date,
                status: status,
                classId: student.classId
            });
        }
        this.saveData();
        return true;
    }

    getAttendanceForDate(date, classId) {
        return this.attendance.filter(a => a.date === date && a.classId === classId);
    }

    getMonthlyAttendance(month, year, classId) {
        return this.attendance.filter(a => {
            const date = new Date(a.date);
            return date.getMonth() === month && 
                   date.getFullYear() === year && 
                   a.classId === classId;
        });
    }

    // ============================================
    // IMPORT / EXPORT
    // ============================================

    exportToJSON() {
        const data = {
            classes: this.classes,
            students: this.students,
            attendance: this.attendance,
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    }

    importFromJSON(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.classes = data.classes || [];
            this.students = data.students || [];
            this.attendance = data.attendance || [];
            if (this.classes.length > 0) {
                this.currentClassId = this.classes[0].id;
            }
            this.saveData();
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    // ============================================
    // ANNUAL RESET
    // ============================================

    checkAndResetIfNeeded() {
        const today = new Date();
        if (today.getMonth() === 8 && today.getDate() === 1) {
            this.attendance = [];
            this.saveData();
            console.log('Annual reset performed');
            return true;
        }
        return false;
    }

    resetAnnual() {
        this.attendance = [];
        this.saveData();
        return true;
    }
}

// ============================================
// GLOBAL INSTANCE
// ============================================

let system = new AttendanceSystem();

// ============================================
// UI UTILITIES
// ============================================

function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
}

function getHebrewDayName(date) {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return days[date.getDay()];
}

// ============================================
// PAGE NAVIGATION
// ============================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    if (pageId === 'page1') renderPage1();
    if (pageId === 'page2') renderPage2();
    if (pageId === 'page3') renderPage3();
    if (pageId === 'settings') renderSettings();
}

// ============================================
// PAGE 1: DAILY ATTENDANCE
// ============================================

function renderPage1() {
    renderClassTabs('classTabsContainer');
    updateStudentForm();
    renderAttendanceTable();
}

function renderClassTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    system.getClasses().forEach(cls => {
        const tab = document.createElement('button');
        tab.className = `class-tab ${cls.id === system.currentClassId ? 'active' : ''}`;
        tab.textContent = cls.name;
        tab.onclick = () => {
            system.currentClassId = cls.id;
            renderPage1();
        };
        container.appendChild(tab);
    });
}

function updateStudentForm() {
    const select = document.getElementById('classSelect');
    if (!select) return;

    select.innerHTML = '<option value="">בחר קבוצה</option>';
    system.getClasses().forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        select.appendChild(option);
    });

    if (system.currentClassId) {
        select.value = system.currentClassId;
    }
}

function renderAttendanceTable() {
    const tbody = document.querySelector('#attendanceTable tbody');
    if (!tbody) return;

    const currentClass = system.getClassById(system.currentClassId);
    if (!currentClass) return;

    const students = system.getStudentsByClass(system.currentClassId);
    const today = getToday();

    const dateElement = document.getElementById('todayDate');
    if (dateElement) {
        const date = new Date(today);
        dateElement.textContent = `${formatDate(today)} (${getHebrewDayName(date)})`;
    }

    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">אין חניכים בקבוצה זו</td></tr>';
        return;
    }

    students.forEach(student => {
        const attendance = system.attendance.find(
            a => a.studentId === student.id && a.date === today
        );
        const isPresent = attendance && attendance.status === 'present';

        const statusTag = student.registrationStatus === 'Registered' 
            ? '<span class="status-tag status-registered">🟢 רשום</span>'
            : '<span class="status-tag status-pending">🔴 בהמתנה</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.grade}</td>
            <td>${statusTag}</td>
            <td>
                <input type="checkbox" ${isPresent ? 'checked' : ''} 
                       onchange="toggleAttendance('${student.id}', '${today}', this.checked)">
                ${isPresent ? '✓' : '✗'}
            </td>
            <td>
                <button class="btn btn-info" onclick="editStudent('${student.id}')">ערוך</button>
                <button class="btn btn-danger" onclick="deleteStudentConfirm('${student.id}')">מחק</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function toggleAttendance(studentId, date, isPresent) {
    system.markAttendance(studentId, date, isPresent ? 'present' : 'absent');
    renderPage1();
}

function editStudent(studentId) {
    const student = system.students.find(s => s.id === studentId);
    if (!student) return;

    // Set form values
    document.getElementById('editStudentId').value = studentId;
    document.getElementById('editFirstName').value = student.firstName;
    document.getElementById('editLastName').value = student.lastName;
    document.getElementById('editGrade').value = student.grade;
    document.getElementById('editAge').value = student.age;
    document.getElementById('editClassSelect').value = student.classId;
    document.getElementById('editRegisteredCheckbox').checked = student.registrationStatus === 'Registered';

    // Update class options
    const select = document.getElementById('editClassSelect');
    select.innerHTML = '';
    system.getClasses().forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        select.appendChild(option);
    });
    select.value = student.classId;

    // Show modal
    const modal = document.getElementById('editStudentModal');
    if (modal) modal.style.display = 'block';
}

function closeEditModal() {
    const modal = document.getElementById('editStudentModal');
    if (modal) modal.style.display = 'none';
}

function deleteStudentConfirm(studentId) {
    if (confirm('האם אתה בטוח שברצונך למחוק חניך זה?')) {
        system.deleteStudent(studentId);
        renderPage1();
    }
}

// ============================================
// PAGE 2: PENDING STUDENTS
// ============================================

function renderPage2() {
    const container = document.getElementById('pendingStudentsContainer');
    if (!container) return;

    const pending = system.getPendingStudents();
    container.innerHTML = '';

    if (pending.length === 0) {
        container.innerHTML = '<p class="text-center">אין חניכים בהמתנה להרשמה</p>';
        return;
    }

    pending.forEach(student => {
        const cls = system.getClassById(student.classId);
        const card = document.createElement('div');
        card.className = 'pending-card';
        card.innerHTML = `
            <h4>${student.firstName} ${student.lastName}</h4>
            <p><strong>תאריך התחלה:</strong> ${formatDate(student.startDate)}</p>
            <p><strong>קבוצה:</strong> ${cls ? cls.name : 'לא ידוע'}</p>
            <p><strong>דרגה:</strong> ${student.grade}</p>
            <div class="buttons">
                <button class="btn btn-success" onclick="registerStudent('${student.id}')">✅ רשום</button>
                <button class="btn btn-danger" onclick="deleteStudentConfirm('${student.id}')">❌ מחק</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function registerStudent(studentId) {
    system.markStudentAsRegistered(studentId);
    renderPage2();
}

// ============================================
// PAGE 3: MONTHLY REPORT
// ============================================

function renderPage3() {
    renderClassTabs('reportClassTabsContainer');
    updateMonthSelector();
    renderMonthlyReport();
}

function updateMonthSelector() {
    const select = document.getElementById('monthSelect');
    if (!select) return;

    const today = new Date();
    select.innerHTML = '';

    for (let i = 11; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const option = document.createElement('option');
        option.value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        option.textContent = date.toLocaleDateString('he-IL', { year: 'numeric', month: 'long' });
        select.appendChild(option);
    }

    select.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
}

function renderMonthlyReport() {
    const monthSelect = document.getElementById('monthSelect');
    if (!monthSelect) return;

    const [year, month] = monthSelect.value.split('-');
    const monthIndex = parseInt(month) - 1;

    const students = system.getStudentsByClass(system.currentClassId);
    const table = document.getElementById('monthlyReportTable');
    if (!table) return;

    table.innerHTML = '';

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    let headerHTML = '<thead><tr><th>שם חניך</th>';
    for (let i = 1; i <= daysInMonth; i++) {
        headerHTML += `<th>${i}</th>`;
    }
    headerHTML += '</tr></thead>';
    table.innerHTML = headerHTML;

    const tbody = document.createElement('tbody');
    students.forEach(student => {
        let rowHTML = `<tr><td>${student.firstName} ${student.lastName} <span class="status-tag ${student.registrationStatus === 'Registered' ? 'status-registered' : 'status-pending'}">🟢</span></td>`;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const attendance = system.attendance.find(
                a => a.studentId === student.id && a.date === dateStr
            );
            const status = attendance ? (attendance.status === 'present' ? '✓' : '✗') : '-';
            rowHTML += `<td>${status}</td>`;
        }
        rowHTML += '</tr>';
        tbody.innerHTML += rowHTML;
    });

    table.appendChild(tbody);
}

// ============================================
// SETTINGS PAGE
// ============================================

function renderSettings() {
    // This will be filled when we implement settings functionality
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            showPage(e.target.dataset.page);
        });
    });

    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const grade = document.getElementById('grade').value;
            const age = document.getElementById('age').value;
            const classId = document.getElementById('classSelect').value;
            const registered = document.getElementById('registeredCheckbox').checked;

            if (classId) {
                system.addStudent(firstName, lastName, grade, age, classId, registered);
                addStudentForm.reset();
                renderPage1();
            } else {
                alert('בחר קבוצה');
            }
        });
    }

    const addClassBtn = document.getElementById('addClassBtn');
    if (addClassBtn) {
        addClassBtn.addEventListener('click', () => {
            const modal = document.getElementById('addClassModal');
            if (modal) modal.style.display = 'block';
        });
    }

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('addClassModal');
            if (modal) modal.style.display = 'none';
        });
    }

    const addClassForm = document.getElementById('addClassForm');
    if (addClassForm) {
        addClassForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const className = document.getElementById('className').value;
            system.addClass(className);
            addClassForm.reset();
            
            const modal = document.getElementById('addClassModal');
            if (modal) modal.style.display = 'none';
            
            renderPage1();
        });
    }

    // Edit Student Form
    const editStudentForm = document.getElementById('editStudentForm');
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const studentId = document.getElementById('editStudentId').value;
            const firstName = document.getElementById('editFirstName').value;
            const lastName = document.getElementById('editLastName').value;
            const grade = document.getElementById('editGrade').value;
            const age = document.getElementById('editAge').value;
            const classId = document.getElementById('editClassSelect').value;
            const registered = document.getElementById('editRegisteredCheckbox').checked;

            system.updateStudent(studentId, {
                firstName: firstName,
                lastName: lastName,
                grade: grade,
                age: parseInt(age),
                classId: classId,
                registrationStatus: registered ? 'Registered' : 'Pending'
            });

            closeEditModal();
            renderPage1();
            alert('החניך עודכן בהצלחה!');
        });
    }

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = system.exportToJSON();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `attendance_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        });
    }

    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => {
            importFile.click();
        });

        importFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (system.importFromJSON(event.target.result)) {
                        alert('ייבוא הצליח!');
                        renderPage1();
                    } else {
                        alert('שגיאה בייבוא');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('האם אתה בטוח? זה ימחק את כל רשומות הנוכחות!')) {
                system.resetAnnual();
                alert('Reset הצליח!');
            }
        });
    }

    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm('זה ימחק הכל! האם אתה בטוח?')) {
                localStorage.removeItem('attendanceData');
                location.reload();
            }
        });
    }

    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
        footerDate.textContent = formatDate(getToday());
    }

    showPage('page1');
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('addClassModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('change', (e) => {
    if (e.target.id === 'monthSelect') {
        renderMonthlyReport();
    }
});

// Close edit modal when clicking outside
window.addEventListener('click', (e) => {
    const editModal = document.getElementById('editStudentModal');
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});