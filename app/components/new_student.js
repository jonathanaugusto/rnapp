import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import { addStudent, updateStudent } from '../actions'
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class NewStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: (props.edit) ? props.student.name : "",
            birthDate: (props.edit) ? props.student.birthDate : new Date('2000-01-01T00:00:00'),
            grade: (props.edit) ? props.student.grade : "",
            zipCode: (props.edit) ? props.student.zipCode : "",
            addressStreet: (props.edit) ? props.student.addressStreet : "",
            addressNumber: (props.edit) ? props.student.addressNumber : "",
            addressDetail: (props.edit) ? props.student.addressDetail : "",
            district: (props.edit) ? props.student.district : "",
            city: (props.edit) ? props.student.city : "",
            state: (props.edit) ? props.student.state : "",
            motherName: (props.edit) ? props.student.motherName : "",
            motherReg: (props.edit) ? props.student.motherReg : "",
            paymentDay: (props.edit) ? props.student.paymentDay : ""

        };

        this.generateID = this.generateID.bind(this);
        this.addStudent = this.addStudent.bind(this);

    }

    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    }


    validateForm() {
        return this.state.name.length > 0 &&
            this.state.grade.length > 0
            ;
    };

    validateRequired(field) {
        return field.length > 0;
    }
    
    validateNumber(field) {
        return parseInt(field);
    }

    addStudent() {
        if (this.props.edit) {
            let student = this.props.student;

            student['name'] = this.state.name;
            student['birthDate'] = this.state.birthDate;
            student['grade'] = this.state.grade;
            student['zipCode'] = this.state.zipCode;
            student['addressStreet'] = this.state.addressStreet;
            student['addressNumber'] = this.state.addressNumber;
            student['addressDetail'] = this.state.addressDetail;
            student['district'] = this.state.district;
            student['city'] = this.state.city;
            student['state'] = this.state.state;
            student['motherName'] = this.state.motherName;
            student['motherReg'] = this.state.motherReg;
            student['paymentDay'] = this.state.paymentDay;

            this.props.updateStudent(student);
        } else {
            let id = this.generateID();

            let student = {

                'name': this.state.name,
                'birthDate': this.state.birthDate,
                'grade': this.state.grade,
                'zipCode': this.state.zipCode,
                'addressStreet': this.state.addressStreet,
                'addressNumber': this.state.addressNumber,
                'addressDetail': this.state.addressDetail,
                'district': this.state.district,
                'city': this.state.city,
                'state': this.state.state,
                'motherName': this.state.motherName,
                'motherReg': this.state.motherReg,
                'paymentDay': this.state.paymentDay
            };

            this.props.addStudent(student);
        }

        Actions.pop();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>

                    <Text>
                        Todos os campos são obrigatórios.
                    </Text>
                    <Text style={[styles.title]}>
                        Dados do estudante
                    </Text>
                    <TextInput onChangeText={(text) => this.setState({ name: text })}
                        placeholder={"Nome completo"} autoFocus={true} style={this.validateRequired(this.state.name) ? [styles.textField] : [styles.textError]}
                        value={this.state.name}
                    />

                    {/* <TextInput onChangeText={(text) => this.setState({ birthDate: text })}
                        placeholder={"Data de nascimento"} autoFocus={false} style={[styles.textField]}
                        value={this.state.birthDate}
                    /> */}

                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.birthDate} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="Data de nascimento"
                        format="DD/MM/YYYY"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: [styles.textField]
                        }}
                        onDateChange={(date) => { this.setState({ birthDate: date }) }}
                    />

                    <TextInput onChangeText={(text) => this.setState({ grade: text })}
                        placeholder={"Série de ingresso"} autoFocus={false} style={this.validateNumber(this.state.grade) ? [styles.textField] : [styles.textError]}
                        value={this.state.grade}
                    />
                    <Text style={[styles.title]}>
                        Endereço
                    </Text>
                    <TextInput onChangeText={(text) => this.setState({ zipCode: text })}
                        placeholder={"CEP"} autoFocus={false} style={[styles.textField]}
                        value={this.state.zipCode}
                    />

                    <TextInput onChangeText={(text) => this.setState({ addressStreet: text })}
                        placeholder={"Nome da rua"} autoFocus={false} style={this.validateRequired(this.state.addressStreet) ? [styles.textField] : [styles.textError]}
                        value={this.state.addressStreet}
                    />

                    <TextInput onChangeText={(text) => this.setState({ addressNumber: text })}
                        placeholder={"Número"} autoFocus={false} style={this.validateRequired(this.state.addressNumber) ? [styles.textField] : [styles.textError]}
                        value={this.state.addressNumber}
                    />

                    <TextInput onChangeText={(text) => this.setState({ addressDetail: text })}
                        placeholder={"Complemento"} autoFocus={false} style={this.validateRequired(this.state.addressDetail) ? [styles.textField] : [styles.textError]}
                        value={this.state.addressDetail}
                    />

                    <TextInput onChangeText={(text) => this.setState({ district: text })}
                        placeholder={"Bairro"} autoFocus={false} style={this.validateRequired(this.state.district) ? [styles.textField] : [styles.textError]}
                        value={this.state.district}
                    />

                    <TextInput onChangeText={(text) => this.setState({ city: text })}
                        placeholder={"Cidade"} autoFocus={false} style={this.validateRequired(this.state.city) ? [styles.textField] : [styles.textError]}
                        value={this.state.city}
                    />

                    <TextInput onChangeText={(text) => this.setState({ state: text })}
                        placeholder={"Estado"} autoFocus={false} style={this.validateRequired(this.state.state) ? [styles.textField] : [styles.textError]}
                        value={this.state.state}
                    />

                    <Text style={[styles.title]}>
                        Dados do responsável
                    </Text>

                    <TextInput onChangeText={(text) => this.setState({ motherName: text })}
                        placeholder={"Nome da mãe"} autoFocus={false} style={this.validateRequired(this.state.motherName) ? [styles.textField] : [styles.textError]}
                        value={this.state.motherName}
                    />

                    <TextInput onChangeText={(text) => this.setState({ motherReg: text })}
                        placeholder={"CPF"} autoFocus={false} style={[styles.textField]}
                        value={this.state.motherReg}
                    />

                    <TextInput onChangeText={(text) => this.setState({ paymentDay: text })}
                        placeholder={"Dia preferencial para pagamento"} autoFocus={false} style={[styles.textField]}
                        value={this.state.paymentDay}
                    />

                </ScrollView>
                <TouchableOpacity style={[styles.saveBtn]}
                    disabled={(this.validateForm()) ? false : true}
                    onPress={this.addStudent}>
                    <Text style={[styles.buttonText,
                    {
                        color: (this.validateForm()) ? "#FFF" : "rgba(255,255,255,.5)"
                    }]}>
                        Save
                    </Text>
                </TouchableOpacity>
                <KeyboardSpacer />

            </View>
        );
    }

}

//Connect everything
export default connect(null, { addStudent, updateStudent })(NewStudent);

var styles = StyleSheet.create({
    saveBtn: {
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },

    buttonText: {
        fontWeight: "500",
    },

    student: {
        fontSize: 17,
        lineHeight: 38,
        // fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingLeft: 0,
        flex: 1,
        height: 200,
        marginBottom: 50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'Helvetica Neue',
        height: 25 + 32,
        padding: 16,
        paddingLeft: 0
    },

    textField: {
        fontWeight: "400",
        lineHeight: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#dddddd",
        // fontFamily: 'Helvetica Neue',
        height: 36,
        padding: 8,
        paddingLeft: 5
    },

    textError: {
        fontWeight: "400",
        lineHeight: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#ff0000",
        // fontFamily: 'Helvetica Neue',
        height: 36,
        padding: 8,
        paddingLeft: 5
    },
});