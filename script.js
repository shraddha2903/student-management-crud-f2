const students = [
    {
      ID: 1,
      name: 'Alice',
      age: 21,
      grade: 'A',
      degree: 'Btech',
      email: 'alice@example.com'
    },
    {
      ID: 2,
      name: 'Bob',
      age: 22,
      grade: 'B',
      degree: 'MBA',
      email: 'bob@example.com'
    },
    {
      ID: 3,
      name: 'Charlie',
      age: 20,
      grade: 'C',
      degree:'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  const studentForm = document.getElementById('student-form');
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const gradeInput = document.getElementById('grade');
  const degreeInput = document.getElementById('degree');
  const emailInput = document.getElementById('email');
  const addBtn = document.getElementById('add-btn');
  const searchInput = document.getElementById('search');
  const studentList = document.getElementById('student-list');
  
  function renderStudents() {
    studentList.innerHTML = '';
  
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}
        <i class="delete-btn btn fa fa-trash" data-id="${student.ID}"></i>
        <i class="edit-btn btn fa fa-edit" data-id="${student.ID}"></i>
        
        </td>
        
      `;
      studentList.appendChild(row);
    });
  }
  
  // <td><i class="edit-btn fa fa-edit" data-id="${student.ID}"></i></td>
  // <td><i class="delete-btn fa fa-trash" data-id="${student.ID}"></i></td>
  function clearForm() {
    nameInput.value = '';
    ageInput.value = '';
    gradeInput.value = '';
    degreeInput.value = '';
    emailInput.value = '';
  }
  
  function addStudent(event) {
    event.preventDefault();
  
    const newStudent = {
      ID: students.length + 1,
      name: nameInput.value,
      age: parseInt(ageInput.value),
      grade: gradeInput.value,
      degree: degreeInput.value,
      email: emailInput.value
    };
  
    students.push(newStudent);
    renderStudents();
    clearForm();
  }
  
  function editStudent(id) {
    const student = students.find(s => s.ID === id);
    if (!student) return;
  
    nameInput.value = student.name;
    ageInput.value = student.age;
    gradeInput.value = student.grade;
    degreeInput.value = student.degree;
    emailInput.value = student.email;
  
    addBtn.innerHTML = 'Edit Student';
    addBtn.dataset.editId = id;
  }
  
  function updateStudent(id) {
    const student = students.find(s => s.ID === id);
    if (!student) return;
  
    student.name = nameInput.value;
    student.age = parseInt(ageInput.value);
    student.grade = gradeInput.value;
    student.degree = degreeInput.value;
    student.email = emailInput.value;
  
    renderStudents();
    clearForm();
    addBtn.innerHTML = 'Add Student';
    delete addBtn.dataset.editId;
  }
  
  function deleteStudent(id) {
    const studentIndex = students.findIndex(s => s.ID === id);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudents();
    }
  }
  
  function searchStudents(query) {
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase()) ||
      student.degree.toLowerCase().includes(query.toLowerCase())
    );
  
    studentList.innerHTML = '';
  
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}
        <i class="delete-btn btn fa fa-trash" data-id="${student.ID}"></i>
        <i class="edit-btn btn fa fa-edit" data-id="${student.ID}"></i>
        </td>
        
        // <td><i class="edit-btn btn fa fa-edit" data-id="${student.ID}"></i></td>
        // <td><i class="delete-btn btn fa fa-trash" data-id="${student.ID}"></i></td>
      `;
      studentList.appendChild(row);
    });
  }
  
  studentForm.addEventListener('submit', addStudent);
  
  studentList.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('edit-btn')) {
      const id = parseInt(target.dataset.id);
      editStudent(id);
    } else if (target.classList.contains('delete-btn')) {
      const id = parseInt(target.dataset.id);
      deleteStudent(id);
    }
  });
  
  addBtn.addEventListener('click', () => {
    if (addBtn.dataset.editId) {
      const editId = parseInt(addBtn.dataset.editId);
      updateStudent(editId);
    }
  });
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    searchStudents(query);
  });
  
  renderStudents();
  