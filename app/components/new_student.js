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

        this.fields = {
            'name': "Nome completo",
            'birthDate': "Data de nascimento",
            'grade': "Série de ingresso",
            'zipCode': "CEP",
            'addressStreet': "Nome da rua",
            'addressNumber': "Número",
            'addressDetail': "Complemento",
            'district': "Bairro",
            'city': "Cidade",
            'state': "Estado",
            'motherName': "Nome da mãe",
            'motherReg': "CPF",
            'paymentDay': "Dia preferencial para pagamento"
        }

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
            this.validateCPF(this.state.motherReg) &&
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
            <View style={[styles.view]}>
                <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>

                    <Text style={[styles.introText]}>
                        Todos os campos são obrigatórios.
                    </Text>
                    <Text style={[styles.title]}>
                        Dados do estudante
                    </Text>

                    <View style={[styles.inputGroup]}>
                        <Text style={[styles.inputLabel]}>
                            Nome completo
                        </Text>
                        <TextInput onChangeText={(text) => this.setState({ name: text })} maxLength={100}
                            autoFocus={true} style={this.validateRequired(this.state.name) ? [styles.inputField] : [styles.inputError]}
                            value={this.state.name}
                        />
                    </View>
                    {/* <TextInput onChangeText={(text) => this.setState({ birthDate: text })}
                        placeholder={"Data de nascimento"} autoFocus={false} style={[styles.textField]}
                        value={this.state.birthDate}
                    /> */}
                    <View style={[styles.inputGroupFlex]}>

                        <View style={[styles.inputGroup]} width={"55%"}>
                            <Text style={[styles.inputLabel]}>
                                Data de nascimento
                            </Text>
                            <DatePicker
                                // style={{ width: 200 }}
                                date={this.state.birthDate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                //placeholder="Data de nascimento"
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
                                    dateInput: this.validateRequired(this.state.birthDate) ? [styles.inputField] : [styles.inputError]
                                }}
                                onDateChange={(date) => { this.setState({ birthDate: date }) }}
                            />
                        </View>

                        <View style={[styles.inputGroup]} width={"35%"}>

                            <Text style={[styles.inputLabel]}>
                                Série de ingresso
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ grade: text })} maxLength={2}
                                autoFocus={false} style={this.validateNumber(this.state.grade) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.grade}
                            />
                        </View>
                    </View>

                    <Text style={[styles.title]}>
                        Endereço
                    </Text>

                    <View style={[styles.inputGroup]} width={"40%"}>
                        <Text style={[styles.inputLabel]}>
                            CEP
                            </Text>
                        <TextInputMask
                            // refInput={ref => { this.input = ref }}
                            type={'zip-code'} maxLength={9}
                            onChangeText={(text) => this.setState({ zipCode: text })}
                            autoFocus={false} style={this.validateRequired(this.state.addressStreet) ? [styles.inputField] : [styles.inputError]}
                            value={this.state.zipCode}
                        />
                    </View>

                    <View style={[styles.inputGroup]}>
                        <Text style={[styles.inputLabel]}>
                            Nome da rua
                            </Text>
                        <TextInput onChangeText={(text) => this.setState({ addressStreet: text })} maxLength={120}
                            autoFocus={false} style={this.validateRequired(this.state.addressStreet) ? [styles.inputField] : [styles.inputError]}
                            value={this.state.addressStreet}
                        />
                    </View>

                    <View style={[styles.inputGroupFlex]}>

                        <View style={[styles.inputGroup]} width={"20%"}>

                            <Text style={[styles.inputLabel]}>
                                Número
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ addressNumber: text })}
                                autoFocus={false} style={this.validateNumber(this.state.addressNumber) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.addressNumber}
                            />
                        </View>
                        <View style={[styles.inputGroup]} width={"35%"}>
                            <Text style={[styles.inputLabel]}>
                                Complemento
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ addressDetail: text })} maxLength={50}
                                autoFocus={false} style={this.validateRequired(this.state.addressDetail) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.addressDetail}
                            />
                        </View>

                        <View style={[styles.inputGroup]} width={"35%"}>

                            <Text style={[styles.inputLabel]}>
                                Bairro
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ district: text })} maxLength={100}
                                autoFocus={false} style={this.validateRequired(this.state.district) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.district}
                            />

                        </View>
                    </View>

                    <View style={[styles.inputGroupFlex]}>

                        <View style={[styles.inputGroup]} width={"70%"}>

                            <Text style={[styles.inputLabel]}>
                                Cidade
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ city: text })}
                                autoFocus={false} style={this.validateRequired(this.state.city) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.city}
                            />
                        </View>

                        <View style={[styles.inputGroup]} width={"25%"}>

                            <Text style={[styles.inputLabel]}>
                                Estado
                            </Text>
                            <TextInput onChangeText={(text) => this.setState({ state: text })} maxLength={2}
                                autoFocus={false} style={this.validateRequired(this.state.state) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.state}
                            />
                        </View>
                    </View>

                    <Text style={[styles.title]}>
                        Dados do responsável
                    </Text>

                    <View style={[styles.inputGroup]}>
                        <Text style={[styles.inputLabel]}>
                            Nome da mãe
                            </Text>
                        <TextInput onChangeText={(text) => this.setState({ motherName: text })} maxLength={100}
                            style={this.validateRequired(this.state.motherName) ? [styles.inputField] : [styles.inputError]}
                            value={this.state.motherName}
                        />
                    </View>

                    <View style={[styles.inputGroupFlex]}>

                        <View style={[styles.inputGroup]} width={"50%"}>
                            <Text style={[styles.inputLabel]}>
                                CPF 
                                <Text style={[styles.errorLabel]}>
                                    {this.validateCPF(this.state.motherReg) ? "" : " (inválido)"}
                                </Text>
                            </Text>
                            <TextInputMask
                                // refInput={ref => { this.state.motherReg = ref }}
                                type={'cpf'} maxLength={14}
                                onChangeText={(text) => this.setState({ motherReg: text })}
                                style={this.validateCPF(this.state.motherReg) ? [styles.inputField] : [styles.inputError]}
                                value={this.state.motherReg} mask={"[000].[000].[000]-[00]"}
                            />
                        </View>

                        <View style={[styles.inputGroup]} width={"35%"}>
                            <Text style={[styles.inputLabel]}>
                                Dia para pagamento
                            </Text>
                            {/* <TextInput onChangeText={(text) => this.setState({ paymentDay: text })}
                            style={this.validateNumber(this.state.paymentDay) ? [styles.inputField] : [styles.inputError]}
                            value={this.state.paymentDay}
                        /> */}
                            <DatePicker
                                style={{ width: 110 }}
                                date={this.state.paymentDay} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                //placeholder="Data de nascimento"
                                format="D"
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: this.validateRequired(this.state.paymentDay) ? [styles.inputField] : [styles.inputError]
                                }}
                                onDateChange={(date) => { this.setState({ paymentDay: date }) }}
                            />
                        </View>
                    </View>
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
    view: {
        flex: 1,
        backgroundColor: '#eee'
    },

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
        color: "#333",
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

    introText: {
        marginTop: 20
    },

    inputGroupFlex: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputGroup: {
        marginBottom: 10
    },

    inputLabel: {
        lineHeight: 14,
        fontSize: 12,
        color: "#555"
    },

    errorLabel: {
        lineHeight: 14,
        fontSize: 12,
        color: "#f00"
    },

    inputField: {
        backgroundColor: "#fff",
        fontWeight: "400",
        lineHeight: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        height: 36,
        padding: 8,
    },

    inputError: {
        backgroundColor: "#fff",
        fontWeight: "400",
        lineHeight: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#f00",
        color: "#f00",
        height: 36,
        padding: 8,
        paddingLeft: 5
    },
});