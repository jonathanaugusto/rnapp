import { combineReducers } from 'redux';

import { STUDENTS_AVAILABLE, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { students: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_STUDENT:{
            let students =  cloneObject(state.students) //clone the current state
            students.unshift(action.student); //add the new student to the top
            state = Object.assign({}, state, { students: students});
            return state;
        }

        case STUDENTS_AVAILABLE:
            state = Object.assign({}, state, { students: action.students, loading:false });
            return state;

        case UPDATE_STUDENT:{
            let student = action.student;
            let students =  cloneObject(state.students) //clone the current state
            let index = getIndex(students, student.id); //find the index of the student with the student id passed
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
            state = Object.assign({}, state, { students: students});
            return state;
        }

        case DELETE_STUDENT:{
            let students =  cloneObject(state.students) //clone the current state
            
            console.log(action.id);
            
            console.log(students);
            let index = getIndex(students, action.id); //find the index of the student with the id passed
            
            console.log(index);
            if(index !== -1) students.splice(index, 1);//if yes, undo, remove the STUDENT
            state = Object.assign({}, state, { students: students});
            
            console.log(students);
            return state;
        }

        default:
            return state;
    }
};


function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => obj.id === id);
}

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;