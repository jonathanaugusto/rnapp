import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator, TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import { Actions } from 'react-native-router-flux'

import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'


//Buttons for Action Sheet

const BUTTONS = [
    "Editar",
    'Apagar',
    'Cancelar'
];

const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderItem = this.renderItem.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }

    componentDidMount() {
        this.props.getStudents(); //call our action
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }

    studentActions = (buttonIndex, student) => {
        if (buttonIndex === 0) Actions.new_student({ student: student, edit: true, title: "Editar cadastro" })
        else if (buttonIndex === 1) this.props.deleteStudent(student.id)
    }

    showOptions(student) {
        ActionSheet.showActionSheetWithOptions({
            options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX
        },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.new_student({ student: student, edit: true, title: "Editar cadastro" })
                else if (buttonIndex === 1) this.props.deleteStudent(student.id)
            }
        );
    }

    render() {

        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.students}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index} />


                    <TouchableHighlight style={styles.addButton}
                        underlayColor='#ff7043' onPress={() => Actions.new_student()}>
                        <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
                    </TouchableHighlight>

                </View>
            );
        }
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight onPress={() => { this.showActionSheet() }} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Text style={styles.student}>
                        {item.name}
                    </Text>
                    <Text style={styles.birthDate}>
                        {item.birthDate}
                    </Text>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={BUTTONS}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={(index) => {
                            if (index === 0) Actions.new_student({ student: item, edit: true, title: "Editar cadastro" })
                            else if (index === 1) this.props.deleteStudent(item.id)
                        }}
                    />
                </View>
            </TouchableHighlight>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        students: state.dataReducer.students
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 8
    },

    birthDate: {
        fontSize: 14,
        marginTop: 5
    },

    student: {
        marginTop: 8,
        fontWeight: "600",
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});