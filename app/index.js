import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home'
import NewStudent from './components/new_student'

import Data from './students.json'

import {connect} from 'react-redux';
import { getStudents } from './actions'

class Main extends Component {

    componentDidMount() {
        var _this = this;
        //Check if any data exist
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data === null){
                AsyncStorage.setItem('data', JSON.stringify(Data.students));
                _this.props.getStudents();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Estudantes" initial/>
                    <Scene key="new_student" component={NewStudent} title="Novo cadastro"/>
                </Scene>
            </Router>
        );
    }
}

//Connect everything
export default connect(null, { getStudents })(Main);