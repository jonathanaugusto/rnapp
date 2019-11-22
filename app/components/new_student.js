import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { addStudent, updateStudent } from '../actions';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class NewStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: (props.edit) ? props.student.name : "",
            birthDate: (props.edit) ? props.student.birthDate : "",
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
        return this.validateRequired(this.state.name) &&
            this.validateRequired(this.state.birthDate) &&
            this.validateRequired(this.state.zipCode) &&
            this.validateRequired(this.state.addressStreet) &&
            this.validateRequired(this.state.addressDetail) &&
            this.validateRequired(this.state.district) &&
            this.validateRequired(this.state.city) &&
            this.validateRequired(this.state.state) &&
            this.validateRequired(this.state.motherName) &&
            this.validateRequired(this.state.motherReg) &&
            this.validateRequired(this.state.motherReg) &&
            this.validateNumber(this.state.grade) &&
            this.validateNumber(this.state.addressNumber) &&
            this.validateNumber(this.state.paymentDay);
    };

    validateRequired(field) {
        return field.length > 0;
    }

    validateNumber(field) {
        return parseInt(field);
    }

    validateCPF(field) {
        cpf = field.replace(/[^\d]+/g, '');
        if (cpf == '') return false;

        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;

        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
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
                    <TextInputMask
                        // refInput={ref => { this.input = ref }}
                        type={'zip-code'}
                        onChangeText={(text) => this.setState({ zipCode: text })}
                        placeholder={"CEP"} autoFocus={false} style={this.validateRequired(this.state.addressStreet) ? [styles.textField] : [styles.textError]}
                        value={this.state.zipCode}
                    />

                    <TextInput onChangeText={(text) => this.setState({ addressStreet: text })}
                        placeholder={"Nome da rua"} autoFocus={false} style={this.validateRequired(this.state.addressStreet) ? [styles.textField] : [styles.textError]}
                        value={this.state.addressStreet}
                    />

                    <TextInput onChangeText={(text) => this.setState({ addressNumber: text })}
                        placeholder={"Número"} autoFocus={false} style={this.validateNumber(this.state.addressNumber) ? [styles.textField] : [styles.textError]}
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
                        placeholder={"Nome da mãe"} style={this.validateRequired(this.state.motherName) ? [styles.textField] : [styles.textError]}
                        value={this.state.motherName}
                    />

                    <TextInputMask
                        // refInput={ref => { this.state.motherReg = ref }}
                        type={'cpf'}
                        onChangeText={(text) => this.setState({ motherReg: text })}
                        placeholder={"CPF"} style={this.validateCPF(this.state.motherReg) ? [styles.textField] : [styles.textError]}
                        value={this.state.motherReg} mask={"[000].[000].[000]-[00]"}
                    />

                    <TextInput onChangeText={(text) => this.setState({ paymentDay: text })}
                        placeholder={"Dia preferencial para pagamento"} style={this.validateNumber(this.state.paymentDay) ? [styles.textField] : [styles.textError]}
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