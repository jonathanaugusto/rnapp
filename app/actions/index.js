export const STUDENTS_AVAILABLE = 'STUDENTS_AVAILABLE';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

import {AsyncStorage} from "react-native";


// Add Student - CREATE (C)
export function addStudent(student){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, students) => {
            if (students !== null){
                students = JSON.parse(students);
                students.unshift(student); //add the new student to the top
                students.sort(function(a, b) {
                    return a["name"].localeCompare(b["name"]);
                  });
                AsyncStorage.setItem('data', JSON.stringify(students), () => {
                    dispatch({type: ADD_STUDENT, student:student});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getStudents(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, students) => {
            if (students !== null){
                dispatch({type: STUDENTS_AVAILABLE, students:JSON.parse(students)});
            }
        });
    };
}

// Update Student - UPDATE (U)
export function updateStudent(student){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, students) => {
            if (students !== null){
                students = JSON.parse(students);
                var index = getIndex(students, student.id); //find the index of the student with the id passed
                if (index !== -1) {
					
                    students[index]['name'] = student.name;
                    students[index]['birthDate'] = student.birthDate;
                    students[index]['grade'] = student.grade;
                    students[index]['addressStreet'] = student.addressStreet;
                    students[index]['addressNumber'] = student.addressNumber;
                    students[index]['addressDetail'] = student.addressDetail;
                    students[index]['district'] = student.district;
                    students[index]['city'] = student.city;
                    students[index]['state'] = student.state;
                    students[index]['motherName'] = student.motherName;
                    students[index]['motherReg'] = student.motherReg;
                    students[index]['paymentDay'] = student.paymentDay;
                }
                AsyncStorage.setItem('data', JSON.stringify(students), () => {
                    dispatch({type: UPDATE_STUDENT, student:student});
                });
            }
        });
    };
}

// Delete Student - DELETE (D)
export function deleteStudent(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, students) => {
            if (students !== null){
                students = JSON.parse(students);

                var index = getIndex(students, id); //find the index of the student with the id passed
                if(index !== -1) students.splice(index, 1);//if yes, remove the STUDENT
                AsyncStorage.setItem('data', JSON.stringify(students), () => {
                    dispatch({type: DELETE_STUDENT, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => obj.id == id);
}